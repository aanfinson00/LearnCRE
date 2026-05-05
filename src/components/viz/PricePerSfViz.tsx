import { formatUsd, formatUsdPerSf } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  purchasePrice: number;
  buildingSf: number;
}

export function PricePerSfViz({ purchasePrice, buildingSf }: Props) {
  const perSf = purchasePrice / buildingSf;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Price"
          width={100}
          value={formatUsd(purchasePrice)}
          tone="muted"
          labelWidthPx={90}
        />
        <BarRow
          label="Building SF"
          width={100}
          value={buildingSf.toLocaleString()}
          tone="stone"
          labelWidthPx={90}
        />
      </div>

      <div className="flex items-baseline justify-between border-t border-warm-line pt-2 text-xs">
        <span className="text-warm-stone">Price per SF</span>
        <span className="font-mono num font-medium text-copper-deep">
          {formatUsdPerSf(perSf)}
        </span>
      </div>
    </div>
  );
}
