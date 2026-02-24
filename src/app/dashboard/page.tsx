'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { modules } from '@/data/modules';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function DashboardPage() {
  const { loading, user } = useProtectedRoute();

  if (loading) return <AppShell><p>Đang xác thực...</p></AppShell>;
  if (!user) return null;

  return (
    <AppShell>
      <h1 className="mb-5 text-3xl font-bold">Chào {user.displayName || 'chiến binh xanh'}!</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.id} className="space-y-2">
            <h2 className="text-xl font-bold">{module.title}</h2>
            <p className="text-sm text-white/80">{module.shortDescription}</p>
            <p className="text-sm">Trạng thái: Chưa làm</p>
            <p className="text-sm text-fireYellow">Điểm tối đa: {module.maxPoints}</p>
            <Link href={`/modules/${module.id}`}><Button>Vào nhiệm vụ</Button></Link>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
