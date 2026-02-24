'use client';

import { FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { bootstrapUser } from '@/lib/firestore';
import AppShell from '@/components/AppShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      await bootstrapUser(credential.user.uid, email, name);
      toast.success('Tạo tài khoản thành công!');
      router.push('/dashboard');
    } catch {
      toast.error('Không thể đăng ký. Có thể email đã tồn tại hoặc mật khẩu quá yếu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <Card className="mx-auto mt-12 max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Đăng ký</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="w-full rounded bg-black/40 p-2" placeholder="Tên học sinh" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full rounded bg-black/40 p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-full rounded bg-black/40 p-2" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button disabled={loading} className="w-full">{loading ? 'Đang xử lý...' : 'Tạo tài khoản'}</Button>
        </form>
      </Card>
    </AppShell>
  );
}
