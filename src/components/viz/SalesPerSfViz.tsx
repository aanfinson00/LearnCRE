import { formatUsd, formatUsdPerSf } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  tenantSales: number;
  buildingSf: number;
}

export function SalesPerSfViz({ tenantSales, buildingSf }: Props) {
  const perSf = tenantSales / buildingSf;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Tenant sales / yr"
          width={100}
          value={formatUsd(tenantSales)}
          tone="muted"
          labelWidthPx={120}
        />
        <BarRow
          label="Building SF"
          width={100}
          value={buildingSf.toLocaleString()}
          tone="stone"
          labelWidthPx={120}
        />
      </div>

      <div className="flex items-baseline justify-between border-t border-warm-line pt-2 text-xs">
        <span className="text-warm-stone">Sales per SF</span>
        <span className="font-mono num font-medium text-copper-deep">
          {formatUsdPerSf(perSf)}
        </span>
      </div>
    </div>
  );
}
