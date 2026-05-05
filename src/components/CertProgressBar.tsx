interface Props {
  /** 0-1. Values outside this range are clamped. */
  progress: number;
  /** Optional label rendered above the bar. */
  label?: string;
  /** Optional right-aligned status text on the same row as the label. */
  status?: string;
  /** Tailwind size shortcut. */
  size?: 'sm' | 'md';
  /** Force the "passed" green tint regardless of progress. */
  passed?: boolean;
}

export function CertProgressBar({
  progress,
  label,
  status,
  size = 'md',
  passed,
}: Props) {
  const pct = Math.max(0, Math.min(1, progress));
  const isPassed = passed ?? pct >= 1;
  const heightClass = size === 'sm' ? 'h-1.5' : 'h-2';
  const barColor = isPassed
    ? 'bg-signal-good'
    : pct > 0
      ? 'bg-copper'
      : 'bg-warm-line';
  return (
    <div className="space-y-1">
      {(label || status) && (
        <div className="flex items-baseline justify-between gap-3">
          {label ? (
            <div className="text-xs font-medium text-warm-ink">{label}</div>
          ) : (
            <span />
          )}
          {status && (
            <div className="font-mono text-[11px] text-warm-mute num">
              {status}
            </div>
          )}
        </div>
      )}
      <div
        className={`overflow-hidden rounded-full bg-warm-line/60 ${heightClass}`}
        role="progressbar"
        aria-valuenow={Math.round(pct * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-aa ease-aa ${barColor}`}
          style={{ width: `${(pct * 100).toFixed(1)}%` }}
        />
      </div>
    </div>
  );
}
