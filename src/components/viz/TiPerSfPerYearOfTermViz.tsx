import { formatUsdPerSf } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  tiPerSf: number;
  leaseTermYears: number;
}

export function TiPerSfPerYearOfTermViz({ tiPerSf, leaseTermYears }: Props) {
  const annualized = tiPerSf / leaseTermYears;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Total TI / SF"
          width={100}
          value={formatUsdPerSf(tiPerSf)}
          tone="muted"
          labelWidthPx={170}
        />
        <BarRow
          label={`÷ ${leaseTermYears}y term`}
          width={(1 / leaseTermYears) * 100}
          value={formatUsdPerSf(annualized)}
          tone="good"
          labelWidthPx={170}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">TI / SF / yr of term</span>
          <span className="font-medium text-copper-deep">
            {formatUsdPerSf(annualized)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          The apples-to-apples comparison metric for TI packages — a $50/SF
          5-yr deal is much richer than a $60/SF 10-yr deal once you
          annualize. Brokers and asset managers track this to compare
          competing tenant proposals.
        </div>
      </div>
    </div>
  );
}
