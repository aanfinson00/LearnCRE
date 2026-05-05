import type { Cert } from '../types/cert';

interface Props {
  cert: Cert;
  earnedAt: number;
  scorePct?: number | null;
  /** Compact one-liner variant, e.g. for ProfileScreen. */
  compact?: boolean;
}

function formatDate(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function CertBadge({ cert, earnedAt, scorePct, compact }: Props) {
  if (compact) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-md border border-signal-good/30 bg-signal-good/5 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-base">★</span>
          <div className="text-sm font-medium text-warm-black">{cert.title}</div>
        </div>
        <div className="font-mono text-[11px] text-warm-mute num">
          {formatDate(earnedAt)}
          {scorePct != null && ` · ${Math.round(scorePct * 100)}%`}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-signal-good/40 bg-signal-good/5 p-5 shadow-aa">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-signal-good-ink">
        <span>★</span> Earned
      </div>
      <div className="display text-2xl text-warm-black">{cert.title}</div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-warm-mute">Date</div>
          <div className="font-mono text-warm-ink num">{formatDate(earnedAt)}</div>
        </div>
        <div>
          <div className="text-warm-mute">Final-exam score</div>
          <div className="font-mono text-warm-ink num">
            {scorePct != null ? `${Math.round(scorePct * 100)}%` : '—'}
          </div>
        </div>
      </div>
    </div>
  );
}
