import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  baseRent: number;
  percentageRate: number;
}

export function PercentageRentBreakpointViz({
  baseRent,
  percentageRate,
}: Props) {
  const breakpoint = baseRent / percentageRate;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Base rent / yr"
          width={(baseRent / breakpoint) * 100}
          value={formatUsd(baseRent)}
          tone="muted"
          labelWidthPx={130}
        />
        <BarRow
          label="Natural breakpoint"
          width={100}
          value={formatUsd(breakpoint)}
          tone="good"
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Percentage rate</span>
          <span className="text-warm-black">{formatPct(percentageRate, 1)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Breakpoint = base ÷ rate</span>
          <span className="font-medium text-copper-deep">
            {formatUsd(breakpoint)} of sales
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Above the natural breakpoint the tenant pays {formatPct(percentageRate, 1)}{' '}
          of every incremental sales dollar to the landlord. Below it, only
          base rent is owed. Aligns landlord upside with tenant performance.
        </div>
      </div>
    </div>
  );
}
