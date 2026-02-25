'use client';

import { use } from 'react';
import AppShell from '@/components/AppShell';
import ModulePlayground from '@/components/modules/ModulePlayground';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { loading, user } = useProtectedRoute();
  if (loading) return <AppShell><p>Đang xác thực...</p></AppShell>;
  if (!user) return null;

  return (
    <AppShell>
      <ModulePlayground id={id} />
    </AppShell>
  );
}
