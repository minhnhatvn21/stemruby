'use client';

import Link from 'next/link';
import { Flame } from 'lucide-react';
import EmbersParticles from './effects/EmbersParticles';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <header className="sticky top-0 z-20 border-b border-fireRed/50 bg-coal/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href="/" className="display-font flex items-center gap-2 text-xl text-fireYellow">
            <Flame /> STEM RUBY NĂNG LƯỢNG
          </Link>
          <nav className="flex gap-3 text-sm">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Hồ sơ</Link>
            <Link href="/leaderboard">BXH</Link>
          </nav>
        </div>
      </header>
      <EmbersParticles />
      <main className="relative z-10 mx-auto max-w-6xl p-4">{children}</main>
    </div>
  );
}
