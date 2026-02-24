import AppShell from '@/components/AppShell';
import { Card } from '@/components/ui/Card';

export default function LeaderboardPage() {
  return (
    <AppShell>
      <Card>
        <h1 className="text-2xl font-bold">Bảng xếp hạng</h1>
        <p>Gợi ý: Dùng query Firestore users orderBy totalPoints desc để hiển thị top 10.</p>
      </Card>
    </AppShell>
  );
}
