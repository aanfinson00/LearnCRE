import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  baseRent: number;
  tenantSales: number;
}

export function OccupancyCostRatioViz({ baseRent, tenantSales }: Props) {
  const ratio = baseRent / tenantSales;
  const max = tenantSales;
  const rentPct = (baseRent / max) * 100;
  // Healthy retail: 8-12% depending on segment.
  const tight = ratio > 0.12;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Tenant sales"
          width={100}
          value={formatUsd(tenantSales)}
          tone="muted"
          labelWidthPx={110}
        />
        <BarRow
          label="Base rent / yr"
          width={rentPct}
          value={formatUsd(baseRent)}
          tone={tight ? 'bad' : 'good'}
          labelWidthPx={110}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Occupancy cost ratio</span>
          <span
            className={`font-medium ${tight ? 'text-signal-bad-ink' : 'text-copper-deep'}`}
          >
            {formatPct(ratio)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Rent as % of sales. Healthy retail typically 8-12%; tight above 12%
          (tenant has little margin and may push back at renewal).
        </div>
      </div>
    </div>
  );
}
