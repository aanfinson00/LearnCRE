import { formatUsd, formatUsdPerSf } from '../../math/rounding';

interface Props {
  purchasePrice: number;
  capex: number;
  closingCostRate: number;
  buildingSf: number;
}

export function AllInBasisViz({
  purchasePrice,
  capex,
  closingCostRate,
  buildingSf,
}: Props) {
  const closing = purchasePrice * closingCostRate;
  const total = purchasePrice + closing + capex;
  const purchasePct = (purchasePrice / total) * 100;
  const closingPct = (closing / total) * 100;
  const capexPct = (capex / total) * 100;

  const perSfPurchase = purchasePrice / buildingSf;
  const perSfClosing = closing / buildingSf;
  const perSfCapex = capex / buildingSf;
  const perSfTotal = total / buildingSf;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-1.5">
        <div className="flex h-10 overflow-hidden rounded border border-warm-line">
          <Segment
            widthPct={purchasePct}
            tone="bg-copper-soft/70 text-copper-ink"
            label={purchasePct > 18 ? formatUsd(purchasePrice) : ''}
            anchor="end"
          />
          <Segment
            widthPct={closingPct}
            tone="bg-warm-stone/40 text-warm-ink"
            label={closingPct > 12 ? formatUsd(closing) : ''}
            anchor="center"
          />
          <Segment
            widthPct={capexPct}
            tone="bg-copper text-warm-white"
            label={capexPct > 12 ? formatUsd(capex) : ''}
            anchor="start"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-[10px] uppercase tracking-wider text-warm-mute">
          <span>Purchase</span>
          <span className="text-center">Closing</span>
          <span className="text-right">Capex</span>
        </div>
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <Row label="Purchase / SF" value={formatUsdPerSf(perSfPurchase)} />
        <Row label={`Closing (${(closingCostRate * 100).toFixed(1)}%)`} value={formatUsdPerSf(perSfClosing)} />
        <Row label="Capex / SF" value={formatUsdPerSf(perSfCapex)} />
        <Row label="All-in / SF" value={formatUsdPerSf(perSfTotal)} highlight />
      </div>
    </div>
  );
}

function Segment({
  widthPct,
  tone,
  label,
  anchor,
}: {
  widthPct: number;
  tone: string;
  label: string;
  anchor: 'start' | 'center' | 'end';
}) {
  const justify =
    anchor === 'start'
      ? 'justify-start pl-2'
      : anchor === 'end'
        ? 'justify-end pr-2'
        : 'justify-center';
  return (
    <div
      className={`flex h-full items-center transition-all duration-aa-slow ease-aa font-mono text-[10px] num ${tone} ${justify}`}
      style={{ width: `${widthPct}%` }}
    >
      {label}
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-warm-stone">{label}</span>
      <span className={highlight ? 'font-medium text-copper-deep' : 'text-warm-black'}>
        {value}
      </span>
    </div>
  );
}
