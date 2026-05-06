import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  prefPaid: number;
  catchUpTargetGpPct: number;
}

export function GpCatchUpViz({ prefPaid, catchUpTargetGpPct }: Props) {
  const target = catchUpTargetGpPct;
  const multiplier = target / (1 - target);
  const catchUp = prefPaid * multiplier;
  const total = prefPaid + catchUp;
  const gpShareOfTotal = catchUp / total;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Pref paid (LP)"
          width={(prefPaid / total) * 100}
          value={formatUsd(prefPaid)}
          tone="muted"
          labelWidthPx={130}
        />
        <BarRow
          label="Catch-up (GP)"
          width={(catchUp / total) * 100}
          value={formatUsd(catchUp)}
          tone="good"
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Catch-up multiplier</span>
          <span className="text-warm-black">
            {formatPct(target, 0)} / (1 − {formatPct(target, 0)}) ={' '}
            {multiplier.toFixed(3)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">GP share post-catch-up</span>
          <span className="font-medium text-copper-deep">
            {formatPct(gpShareOfTotal, 0)} of (pref + catch-up)
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          100% of cash flows to GP at this tier until they reach the target
          share of (pref + catch-up). Sponsor-friendly mechanic — gives the GP
          an effective {formatPct(target, 0)} promote on the pref dollars.
        </div>
      </div>
    </div>
  );
}
