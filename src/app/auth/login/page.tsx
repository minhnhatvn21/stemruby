'use client';

import { FormEvent, useState } from 'react';
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function createVirtualEmail(account: string) {
  return `${account.toLowerCase()}@stemruby.local`;
}

function getLoginErrorMessage(code: string) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.';
    case 'auth/too-many-requests':
      return 'Bạn thử quá nhiều lần. Vui lòng chờ ít phút rồi thử lại.';
    default:
      return 'Không thể đăng nhập lúc này. Vui lòng thử lại.';
  }
}

export default function LoginPage() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const normalizedAccount = account.trim().toLowerCase();
      const email = createVirtualEmail(normalizedAccount);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Đăng nhập thành công!');
      router.push('/dashboard');
    } catch (error) {
      const code = (error as Partial<AuthError> & { code?: string }).code ?? 'unknown';
      toast.error(getLoginErrorMessage(code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <Card className="mx-auto mt-12 max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Đăng nhập</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="w-full rounded bg-black/40 p-2" placeholder="Tài khoản" value={account} onChange={(e) => setAccount(e.target.value)} />
          <input type="password" className="w-full rounded bg-black/40 p-2" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button disabled={loading} className="w-full">{loading ? 'Đang xử lý...' : 'Vào dashboard'}</Button>
        </form>
        <p className="mt-3 text-sm">Chưa có tài khoản? <Link className="text-fireYellow" href="/auth/register">Đăng ký ngay</Link></p>
      </Card>
    </AppShell>
  );
}
