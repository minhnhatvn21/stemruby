'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import AppShell from '@/components/AppShell';
import { Card } from '@/components/ui/Card';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { db } from '@/lib/firebase';

type StudentProfile = {
  account?: string;
  displayName?: string;
  className?: string;
  school?: string;
  province?: string;
  totalPoints?: number;
};

export default function ProfilePage() {
  const { loading, user } = useProtectedRoute();
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, 'users', user.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        setProfile(snapshot.data() as StudentProfile);
      }
    });
  }, [user]);

  if (loading) return <AppShell><p>Đang xác thực...</p></AppShell>;
  if (!user) return null;

  return (
    <AppShell>
      <Card>
        <h1 className="text-2xl font-bold">Hồ sơ học sinh</h1>
        <p>Tài khoản: {profile?.account || 'Chưa cập nhật'}</p>
        <p>Họ tên: {profile?.displayName || user.displayName || 'Chưa cập nhật'}</p>
        <p>Lớp: {profile?.className || 'Chưa cập nhật'}</p>
        <p>Trường: {profile?.school || 'Chưa cập nhật'}</p>
        <p>Tỉnh/Thành: {profile?.province || 'Chưa cập nhật'}</p>
        <p className="text-fireYellow">Tổng điểm: {profile?.totalPoints ?? 0}</p>
      </Card>
    </AppShell>
  );
}
