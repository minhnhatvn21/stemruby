'use client';

export default function EmbersParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 animate-pulse rounded-full bg-fireYellow"
          style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 100}%`, opacity: 0.5 }}
        />
      ))}
    </div>
  );
}
