import { formatUsdPerSf } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  baselineRent: number;
  clearHeight: number;
  premiumPerFt: number;
  finalRent: number;
}

export function ClearHeightPremiumViz({
  baselineRent,
  clearHeight,
  premiumPerFt,
  finalRent,
}: Props) {
  const totalPremium = finalRent - baselineRent;
  const heightDelta = totalPremium / premiumPerFt;
  const baselineHeight = clearHeight - heightDelta;
  const baselinePct = (baselineRent / finalRent) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label={`Baseline @ ${baselineHeight.toFixed(0)}'`}
          width={baselinePct}
          value={formatUsdPerSf(baselineRent)}
          tone="muted"
          labelWidthPx={140}
        />
        <BarRow
          label={`+ ${heightDelta.toFixed(0)}' uplift`}
          width={100}
          value={formatUsdPerSf(finalRent)}
          tone="good"
          labelWidthPx={140}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Premium per foot</span>
          <span className="text-warm-black">
            {formatUsdPerSf(premiumPerFt)} / ft
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Total premium</span>
          <span className="font-medium text-copper-deep">
            +{formatUsdPerSf(totalPremium)} ({heightDelta.toFixed(0)} ft × {formatUsdPerSf(premiumPerFt)})
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Modern logistics tenants pay up for clear height — racking density
          scales with vertical cube. Standard step is ~$0.05-0.10/SF/yr per
          foot above 32'. Above 40' starts to attract specialized e-commerce.
        </div>
      </div>
    </div>
  );
}
