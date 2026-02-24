import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import FireBackgroundCanvas from '@/components/effects/FireBackgroundCanvas';
import AppShell from '@/components/AppShell';

export default function HomePage() {
  return (
    <AppShell>
      <section className="relative mb-8 h-[360px] overflow-hidden rounded-2xl fire-border">
        <FireBackgroundCanvas />
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center">
          <h1 className="display-font animate-flicker text-4xl font-extrabold md:text-6xl">8 Nhiệm Vụ Năng Lượng Rực Lửa</h1>
          <p className="max-w-2xl text-lg">Học sinh lớp 5 đăng nhập để chơi game, nhận điểm và huy hiệu sống xanh mỗi ngày.</p>
          <Link href="/auth/login"><Button className="animate-pulseGlow">Bắt đầu</Button></Link>
        </div>
      </section>
    </AppShell>
  );
}
