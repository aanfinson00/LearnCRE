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

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Sales per SF</span>
          <span className="font-medium text-copper-deep">
            {formatUsdPerSf(perSf)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Healthy in-line: ~$400-600/SF; anchor grocery: $700-1k+. Pair with
          rent/SF to size the occupancy cost ratio (rent ÷ sales).
        </div>
      </div>
    </div>
  );
}
