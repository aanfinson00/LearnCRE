import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  purchasePrice: number;
  noi: number;
}

export function GoingInCapViz({ purchasePrice, noi }: Props) {
  const capRate = noi / purchasePrice;
  const max = purchasePrice;
  const noiPct = (noi / max) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Purchase price"
          width={100}
          value={formatUsd(purchasePrice)}
          tone="muted"
          labelWidthPx={110}
        />
        <BarRow
          label="Year-1 NOI"
          width={noiPct}
          value={formatUsd(noi)}
          tone="good"
          labelWidthPx={110}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Going-in cap (NOI ÷ Price)</span>
          <span className="font-medium text-copper-deep">{formatPct(capRate)}</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          The headline cap an interviewer asks about — the unlevered yield you
          buy the asset at.
        </div>
      </div>
    </div>
  );
}
