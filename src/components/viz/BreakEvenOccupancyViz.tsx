import { formatPct, formatUsd } from '../../math/rounding';

interface Props {
  pgi: number;
  opex: number;
  debtServiceAnnual: number;
}

export function BreakEvenOccupancyViz({
  pgi,
  opex,
  debtServiceAnnual,
}: Props) {
  const required = (opex + debtServiceAnnual) / pgi;
  const clamped = Math.max(0, Math.min(1, required));
  const tight = required > 0.85;
  const offTheChart = required > 1;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <div className="grid items-center gap-3" style={{ gridTemplateColumns: '120px 1fr 110px' }}>
          <span className="text-warm-stone text-right">Break-even occ</span>
          <div className="relative h-5 rounded bg-warm-paper/60 overflow-hidden">
            <div
              className={`h-full rounded transition-all duration-aa-slow ease-aa ${
                offTheChart ? 'bg-signal-bad/80' : tight ? 'bg-signal-bad/70' : 'bg-copper'
              }`}
              style={{ width: `${clamped * 100}%` }}
            />
            {/* 100% reference line */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 border-l border-warm-stone/60" aria-hidden />
          </div>
          <span className={`text-right ${offTheChart || tight ? 'text-signal-bad-ink font-medium' : 'text-warm-black'}`}>
            {formatPct(required)}
          </span>
        </div>
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">PGI / yr</span>
          <span className="text-warm-black">{formatUsd(pgi)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">OpEx + debt service</span>
          <span className="text-warm-black">{formatUsd(opex + debtServiceAnnual)}</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Occupancy required for rent income to cover OpEx + DS exactly.
          {offTheChart
            ? ' Above 100% — deal cannot break even at any occupancy.'
            : tight
              ? ' Tight — little vacancy headroom before negative cash flow.'
              : ' Healthy cushion below 85%.'}
        </div>
      </div>
    </div>
  );
}
