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

      <div className="flex items-baseline justify-between border-t border-warm-line pt-2 text-xs">
        <span className="text-warm-stone">Rent per unit / yr</span>
        <span className="font-mono num font-medium text-copper-deep">
          {formatUsd(perUnit)}
        </span>
      </div>
    </div>
  );
}
