import type { Difficulty, SessionStats } from '../types/session';

interface Props {
  stats: SessionStats;
  currentIndex: number;
  plannedCount: number | null;
  level?: Difficulty;
}

function formatMs(ms: number): string {
  if (ms === 0) return '—';
  return `${(ms / 1000).toFixed(1)}s`;
}

const LEVEL_TONE: Record<Difficulty, string> = {
  beginner: 'bg-emerald-100 text-emerald-800',
  intermediate: 'bg-sky-100 text-sky-800',
  advanced: 'bg-rose-100 text-rose-800',
};

export function StatsBar({ stats, currentIndex, plannedCount, level }: Props) {
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
      {level && (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${LEVEL_TONE[level]}`}
        >
          {level}
        </span>
      )}
    </div>
  );
}
