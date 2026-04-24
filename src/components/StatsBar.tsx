import type { SessionStats } from '../types/session';

interface Props {
  stats: SessionStats;
  currentIndex: number;
  plannedCount: number | null;
}

function formatMs(ms: number): string {
  if (ms === 0) return '—';
  return `${(ms / 1000).toFixed(1)}s`;
}

export function StatsBar({ stats, currentIndex, plannedCount }: Props) {
  const counterLabel = plannedCount === null ? `${currentIndex + 1}` : `${currentIndex + 1}/${plannedCount}`;
  const accuracy = stats.total === 0 ? '—' : `${Math.round(stats.accuracyPct * 100)}%`;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm text-slate-600 num">
      <span>
        <span className="text-slate-400">Q </span>
        {counterLabel}
      </span>
      <span>
        <span className="text-slate-400">streak </span>
        {stats.currentStreak}
      </span>
      <span>
        <span className="text-slate-400">acc </span>
        {accuracy}
      </span>
      <span>
        <span className="text-slate-400">avg </span>
        {formatMs(stats.avgResponseMs)}
      </span>
    </div>
  );
}
