import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  cumulativeDraws: number;
  retainagePct: number;
}

export function RetainageRunningViz({
  cumulativeDraws,
  retainagePct,
}: Props) {
  const retainage = cumulativeDraws * retainagePct;
  const released = cumulativeDraws - retainage;
  const releasedPct = (released / cumulativeDraws) * 100;
  const retainedPct = (retainage / cumulativeDraws) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between font-mono text-[11px] num">
          <span className="text-warm-stone">Cumulative draws</span>
          <span className="text-warm-black">{formatUsd(cumulativeDraws)}</span>
        </div>
        <div className="flex h-6 w-full overflow-hidden rounded border border-warm-line">
          <div
            className="flex items-center justify-center bg-warm-mute/40 text-[10px] font-mono text-warm-stone"
            style={{ width: `${releasedPct}%` }}
          >
            Released to GC
          </div>
          <div
            className="flex items-center justify-center bg-copper text-[10px] font-mono text-warm-paper"
            style={{ width: `${retainedPct}%` }}
          >
            Held back
          </div>
        </div>
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label={`Retainage @ ${formatPct(retainagePct, 0)}`}
          width={100}
          value={formatUsd(retainage)}
          tone="copper-soft"
          labelWidthPx={140}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Released to GC</span>
          <span className="text-warm-black">{formatUsd(released)}</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Standard retainage (typically 5-10%) is held until punch-list
          completion + lien-waiver delivery. Owner's leverage to enforce
          quality at substantial completion.
        </div>
      </div>
    </div>
  );
}
