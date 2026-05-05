import { formatPct, formatUsdPerSf } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  marketRent: number;
  inPlaceRent: number;
}

export function LossToLeaseViz({ marketRent, inPlaceRent }: Props) {
  const gap = marketRent - inPlaceRent;
  const lossPct = gap / marketRent;
  const max = marketRent;
  const inPlacePct = (inPlaceRent / max) * 100;
  const negativeLoss = gap < 0;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Market rent"
          width={100}
          value={formatUsdPerSf(marketRent)}
          tone="good"
          labelWidthPx={100}
        />
        <BarRow
          label="In-place rent"
          width={inPlacePct}
          value={formatUsdPerSf(inPlaceRent)}
          tone={negativeLoss ? 'copper-soft' : 'bad'}
          labelWidthPx={100}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Loss to lease</span>
          <span
            className={`font-medium ${negativeLoss ? 'text-copper-deep' : 'text-signal-bad-ink'}`}
          >
            {formatPct(lossPct)}
            {negativeLoss ? ' (gain to lease)' : ''}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Gap between in-place and market rent — the upside (or
          {negativeLoss ? '' : ' downside'}) the new buyer captures on rollover.
        </div>
      </div>
    </div>
  );
}
