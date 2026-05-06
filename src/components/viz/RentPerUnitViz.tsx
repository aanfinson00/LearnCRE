import { formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  gpr: number;
  units: number;
}

export function RentPerUnitViz({ gpr, units }: Props) {
  const perUnit = gpr / units;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="GPR / yr"
          width={100}
          value={formatUsd(gpr)}
          tone="muted"
          labelWidthPx={90}
        />
        <BarRow
          label="Units"
          width={100}
          value={units.toLocaleString()}
          tone="stone"
          labelWidthPx={90}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Rent per unit / yr</span>
          <span className="font-medium text-copper-deep">{formatUsd(perUnit)}</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Pair with market rent comps to size the mark-to-market upside on
          rollover — the headline lever in most multifamily underwrites.
        </div>
      </div>
    </div>
  );
}
