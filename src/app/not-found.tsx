import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <AppShell>
      <div className="rounded-xl fire-border p-8 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mb-4">Trang này đã bay mất như tia lửa rồi!</p>
        <Link href="/"><Button>Quay về trang chủ</Button></Link>
      </div>
    </AppShell>
  );
}
