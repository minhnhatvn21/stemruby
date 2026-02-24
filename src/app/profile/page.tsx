'use client';

import AppShell from '@/components/AppShell';
import { Card } from '@/components/ui/Card';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function ProfilePage() {
  const { loading, user } = useProtectedRoute();
  if (loading) return <AppShell><p>Đang xác thực...</p></AppShell>;
  if (!user) return null;

  return (
    <AppShell>
      <Card>
        <h1 className="text-2xl font-bold">Hồ sơ học sinh</h1>
        <p>Tên: {user.displayName || 'Chưa cập nhật'}</p>
        <p>Email: {user.email}</p>
        <p className="text-fireYellow">Thống kê sẽ cập nhật theo Firestore sau khi hoàn thành module.</p>
      </Card>
    </AppShell>
  );
}
