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
  beginner: 'bg-signal-good/15 text-signal-good-ink',
  intermediate: 'bg-copper-soft/30 text-copper-deep',
  advanced: 'bg-signal-bad/15 text-signal-bad-ink',
};

export function StatsBar({ stats, currentIndex, plannedCount, level }: Props) {
  const counterLabel = plannedCount === null ? `${currentIndex + 1}` : `${currentIndex + 1}/${plannedCount}`;
  const accuracy = stats.total === 0 ? '—' : `${Math.round(stats.accuracyPct * 100)}%`;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm text-warm-stone num">
      <span>
        <span className="text-warm-mute">Q </span>
        {counterLabel}
      </span>
      <span>
        <span className="text-warm-mute">streak </span>
        {stats.currentStreak}
      </span>
      <span>
        <span className="text-warm-mute">acc </span>
        {accuracy}
      </span>
      <span>
        <span className="text-warm-mute">avg </span>
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
