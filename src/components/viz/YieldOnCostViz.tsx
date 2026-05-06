import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  totalProjectCost: number;
  stabilizedNoi: number;
}

export function YieldOnCostViz({ totalProjectCost, stabilizedNoi }: Props) {
  const yoc = stabilizedNoi / totalProjectCost;
  const max = totalProjectCost;
  const noiPct = (stabilizedNoi / max) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Total project cost"
          width={100}
          value={formatUsd(totalProjectCost)}
          tone="muted"
          labelWidthPx={130}
        />
        <BarRow
          label="Stabilized NOI"
          width={noiPct}
          value={formatUsd(stabilizedNoi)}
          tone="good"
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Yield on cost</span>
          <span className="font-medium text-copper-deep">{formatPct(yoc)}</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Unlevered yield you build the project to. Compare to market cap rate
          to gauge development spread (gross margin for taking dev risk).
        </div>
      </div>
    </div>
  );
}
