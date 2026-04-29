import { formatBps, formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  stabilizedNoi: number;
  totalProjectCost: number;
  marketCapRate: number;
}

export function DevSpreadViz({
  stabilizedNoi,
  totalProjectCost,
  marketCapRate,
}: Props) {
  const yieldOnCost = stabilizedNoi / totalProjectCost;
  const spread = yieldOnCost - marketCapRate;
  const max = Math.max(yieldOnCost, marketCapRate);
  const yocPct = (yieldOnCost / max) * 100;
  const mktPct = (marketCapRate / max) * 100;
  const positive = spread > 0;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Yield on cost"
          width={yocPct}
          value={formatPct(yieldOnCost)}
          tone={positive ? 'good' : 'bad'}
          labelWidthPx={110}
        />
        <BarRow
          label="Market cap"
          width={mktPct}
          value={formatPct(marketCapRate)}
          tone="muted"
          labelWidthPx={110}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Stabilized NOI</span>
          <span className="text-warm-black">{formatUsd(stabilizedNoi)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Total project cost</span>
          <span className="text-warm-black">{formatUsd(totalProjectCost)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Development spread</span>
          <span
            className={`font-medium ${
              positive ? 'text-copper-deep' : 'text-signal-bad-ink'
            }`}
          >
            {positive ? '+' : ''}
            {formatBps(spread)}
          </span>
        </div>
      </div>
    </div>
  );
}
