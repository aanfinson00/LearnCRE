import { formatUsdPerSf } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  tiPerSf: number;
  paybackYears: number;
}

export function TiPaybackViz({ tiPerSf, paybackYears }: Props) {
  const requiredUplift = tiPerSf / paybackYears;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="TI / SF"
          width={100}
          value={formatUsdPerSf(tiPerSf)}
          tone="muted"
          labelWidthPx={150}
        />
        <BarRow
          label={`÷ ${paybackYears}y payback`}
          width={(1 / paybackYears) * 100}
          value={formatUsdPerSf(requiredUplift)}
          tone="good"
          labelWidthPx={150}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Required rent uplift</span>
          <span className="font-medium text-copper-deep">
            {formatUsdPerSf(requiredUplift)} / SF / yr
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Required mark-to-market on the renewing tenant for the TI bucks to
          earn back over the payback window. If the comp set won't support
          this uplift, the deal needs more term, less TI, or a different
          tenant.
        </div>
      </div>
    </div>
  );
}
