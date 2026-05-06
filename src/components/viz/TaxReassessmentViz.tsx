import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  purchasePrice: number;
  oldAnnualTax: number;
  newTaxRate: number;
  capRate: number;
}

export function TaxReassessmentViz({
  purchasePrice,
  oldAnnualTax,
  newTaxRate,
  capRate,
}: Props) {
  const newTax = purchasePrice * newTaxRate;
  const taxBump = newTax - oldAnnualTax;
  const valueHit = -taxBump / capRate;
  const max = newTax;
  const oldPct = (oldAnnualTax / max) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Old annual tax"
          width={oldPct}
          value={formatUsd(oldAnnualTax)}
          tone="muted"
          labelWidthPx={130}
        />
        <BarRow
          label={`New tax @ ${formatPct(newTaxRate, 2)}`}
          width={100}
          value={formatUsd(newTax)}
          tone="bad"
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Tax bump (NOI hit)</span>
          <span className="text-warm-black">−{formatUsd(taxBump)} / yr</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">÷ cap rate ({formatPct(capRate)})</span>
          <span className="font-medium text-signal-bad-ink">
            {formatUsd(valueHit)} value
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Post-sale reassessment is a hidden underwriting hit — the new owner
          gets taxed at purchase price, not the seller's lower assessed
          value. Capitalize the annual delta to see the day-1 valuation cost.
        </div>
      </div>
    </div>
  );
}
