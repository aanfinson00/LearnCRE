import { formatPct, formatUsdPerSf } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  inPlaceRent: number;
  marketRent: number;
  renewalProbability: number;
}

export function RenewalProbabilityWeightedRentViz({
  inPlaceRent,
  marketRent,
  renewalProbability,
}: Props) {
  const weighted =
    renewalProbability * inPlaceRent +
    (1 - renewalProbability) * marketRent;
  const max = Math.max(inPlaceRent, marketRent);
  const inPlacePct = (inPlaceRent / max) * 100;
  const marketPct = (marketRent / max) * 100;
  const weightedPct = (weighted / max) * 100;
  const downside = marketRent < inPlaceRent;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label={`Renewal × ${formatPct(renewalProbability, 0)}`}
          width={inPlacePct}
          value={formatUsdPerSf(inPlaceRent)}
          tone="muted"
          labelWidthPx={150}
        />
        <BarRow
          label={`Re-let × ${formatPct(1 - renewalProbability, 0)}`}
          width={marketPct}
          value={formatUsdPerSf(marketRent)}
          tone={downside ? 'bad' : 'copper-soft'}
          labelWidthPx={150}
        />
        <BarRow
          label="= Expected rent"
          width={weightedPct}
          value={formatUsdPerSf(weighted)}
          tone="good"
          labelWidthPx={150}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Probability-weighted rent</span>
          <span className="font-medium text-copper-deep">
            {formatUsdPerSf(weighted)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Underwriting credit for the renewal scenario at one rate and the
          re-let scenario (downtime + market rent) at another. Avoids
          assuming 100% renewal certainty at either in-place or market.
        </div>
      </div>
    </div>
  );
}
