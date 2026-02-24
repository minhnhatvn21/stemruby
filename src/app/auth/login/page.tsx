'use client';

import { FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Đăng nhập thành công!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Sai email hoặc mật khẩu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <Card className="mx-auto mt-12 max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Đăng nhập</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="w-full rounded bg-black/40 p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="w-full rounded bg-black/40 p-2" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button disabled={loading} className="w-full">{loading ? 'Đang xử lý...' : 'Vào dashboard'}</Button>
        </form>
        <p className="mt-3 text-sm">Chưa có tài khoản? <Link className="text-fireYellow" href="/auth/register">Đăng ký ngay</Link></p>
      </Card>
    </AppShell>
  );
}
