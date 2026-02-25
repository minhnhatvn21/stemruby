'use client';

import { FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, type AuthError } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { bootstrapUser } from '@/lib/firestore';
import AppShell from '@/components/AppShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function createVirtualEmail(account: string) {
  return `${account.toLowerCase()}@stemruby.local`;
}

function getRegisterErrorMessage(code: string) {
  const normalized = code.toLowerCase();

  if (normalized.includes('auth/email-already-in-use')) {
    return 'Tài khoản đã tồn tại. Vui lòng chọn tài khoản khác.';
  }
  if (normalized.includes('auth/weak-password')) {
    return 'Mật khẩu còn yếu. Hãy dùng ít nhất 6 ký tự, có chữ và số.';
  }
  if (normalized.includes('auth/invalid-email')) {
    return 'Tên tài khoản chưa hợp lệ. Chỉ dùng chữ, số, dấu gạch dưới.';
  }
  if (normalized.includes('permission-denied')) {
    return 'Đã tạo Auth nhưng chưa lưu được hồ sơ. Hãy kiểm tra Firestore Rules.';
  }
  if (normalized.includes('network-request-failed')) {
    return 'Lỗi mạng khi đăng ký. Vui lòng kiểm tra kết nối internet.';
  }

  return `Không thể đăng ký lúc này (${code}).`;
}

export default function RegisterPage() {
  const [account, setAccount] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [className, setClassName] = useState('');
  const [school, setSchool] = useState('');
  const [province, setProvince] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!account || !displayName || !className || !school || !province) {
      toast.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (!/^[a-z0-9_]{4,30}$/i.test(account.trim())) {
      toast.error('Tài khoản chỉ gồm chữ, số, gạch dưới và dài 4-30 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu xác nhận chưa khớp.');
      return;
    }

    try {
      setLoading(true);
      const normalizedAccount = account.trim().toLowerCase();
      const email = createVirtualEmail(normalizedAccount);
      const credential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(credential.user, { displayName });

      await bootstrapUser(credential.user.uid, {
        account: normalizedAccount,
        displayName,
        className,
        school,
        province,
        email
      });

      toast.success('Tạo tài khoản thành công!');
      router.push('/dashboard');
    } catch (error) {
      const code = (error as Partial<AuthError> & { code?: string }).code ?? 'unknown';
      toast.error(getRegisterErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <Card className="mx-auto mt-12 max-w-xl">
        <h1 className="mb-4 text-2xl font-bold">Đăng ký</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="w-full rounded bg-black/40 p-2" placeholder="Tài khoản (vd: nguyenvana)" value={account} onChange={(e) => setAccount(e.target.value)} />
          <input className="w-full rounded bg-black/40 p-2" placeholder="Họ và tên" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          <input className="w-full rounded bg-black/40 p-2" placeholder="Lớp" value={className} onChange={(e) => setClassName(e.target.value)} />
          <input className="w-full rounded bg-black/40 p-2" placeholder="Trường" value={school} onChange={(e) => setSchool(e.target.value)} />
          <input className="w-full rounded bg-black/40 p-2" placeholder="Tỉnh/Thành" value={province} onChange={(e) => setProvince(e.target.value)} />
          <input type="password" className="w-full rounded bg-black/40 p-2" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" className="w-full rounded bg-black/40 p-2" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button disabled={loading} className="w-full">{loading ? 'Đang xử lý...' : 'Tạo tài khoản'}</Button>
        </form>
      </Card>
    </AppShell>
  );
}
