'use client';

import AppShell from '@/components/AppShell';
import ModulePlayground from '@/components/modules/ModulePlayground';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function ModulePage({ params }: { params: { id: string } }) {
  const { loading, user } = useProtectedRoute();
  if (loading) return <AppShell><p>Đang xác thực...</p></AppShell>;
  if (!user) return null;

  return (
    <AppShell>
      <ModulePlayground id={params.id} />
    </AppShell>
  );
}
