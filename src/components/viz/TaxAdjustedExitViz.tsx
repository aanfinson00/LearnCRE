import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  purchasePrice: number;
  saleProceeds: number;
  accumulatedDep: number;
  saleCostRate: number;
  recaptureRate: number;
  capGainsRate: number;
}

export function TaxAdjustedExitViz({
  purchasePrice,
  saleProceeds,
  accumulatedDep,
  saleCostRate,
  recaptureRate,
  capGainsRate,
}: Props) {
  const saleCosts = saleProceeds * saleCostRate;
  const netSale = saleProceeds - saleCosts;
  const adjustedBasis = purchasePrice - accumulatedDep;
  const totalGain = saleProceeds - adjustedBasis;
  const recaptureGain = Math.max(0, Math.min(accumulatedDep, totalGain));
  const capitalGain = Math.max(0, totalGain - recaptureGain);
  const recaptureTax = recaptureGain * recaptureRate;
  const capGainsTax = capitalGain * capGainsRate;
  const afterTax = netSale - recaptureTax - capGainsTax;
  const totalTakeRate = (saleProceeds - afterTax) / saleProceeds;

  // Scale all bars against gross sale.
  const pct = (n: number) => Math.max(0, (n / saleProceeds) * 100);

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Sale proceeds"
          width={100}
          value={formatUsd(saleProceeds)}
          tone="muted"
          labelWidthPx={150}
        />
        <BarRow
          label={`− Sale costs ${formatPct(saleCostRate)}`}
          width={pct(saleCosts)}
          value={`−${formatUsd(saleCosts)}`}
          tone="bad"
          labelWidthPx={150}
        />
        <BarRow
          label="= Net sale"
          width={pct(netSale)}
          value={formatUsd(netSale)}
          tone="copper-soft"
          labelWidthPx={150}
        />
        <BarRow
          label={`− Recapture ${formatPct(recaptureRate, 0)}`}
          width={pct(recaptureTax)}
          value={`−${formatUsd(recaptureTax)}`}
          tone="bad"
          labelWidthPx={150}
        />
        <BarRow
          label={`− Cap gains ${formatPct(capGainsRate, 0)}`}
          width={pct(capGainsTax)}
          value={`−${formatUsd(capGainsTax)}`}
          tone="bad"
          labelWidthPx={150}
        />
        <BarRow
          label="= After-tax cash"
          width={pct(afterTax)}
          value={formatUsd(afterTax)}
          tone="good"
          labelWidthPx={150}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Total gain</span>
          <span className="text-warm-black">{formatUsd(totalGain)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">… recapture portion (≤ accum dep)</span>
          <span className="text-warm-black">{formatUsd(recaptureGain)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">… cap-gains portion</span>
          <span className="text-warm-black">{formatUsd(capitalGain)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Total drag (sale → after-tax)</span>
          <span className="font-medium text-signal-bad-ink">
            {formatPct(totalTakeRate, 1)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Recapture (typically 25%) hits first, capped at accumulated
          depreciation. Cap gains (typically 20%) on the residual. Land is
          non-depreciable — depreciable basis is usually 75-85% of purchase.
          The full sale-to-after-tax drag commonly runs 4-8%.
        </div>
      </div>
    </div>
  );
}
