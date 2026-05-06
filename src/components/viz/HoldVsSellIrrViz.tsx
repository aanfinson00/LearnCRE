import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  noi: number;
  capRate: number;
  holdYears: number;
  extensionIrr: number;
}

export function HoldVsSellIrrViz({
  noi,
  capRate,
  holdYears,
  extensionIrr,
}: Props) {
  const todayValue = noi / capRate;
  const accretive = extensionIrr > capRate;
  // Reference is the cap rate — selling now and reinvesting at cap nets
  // exactly the cap rate as the running yield.
  const max = Math.max(extensionIrr, capRate) * 1.1;
  const sellNowPct = (capRate / max) * 100;
  const holdPct = (extensionIrr / max) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Sell now (≈ cap)"
          width={sellNowPct}
          value={formatPct(capRate)}
          tone="muted"
          labelWidthPx={130}
        />
        <BarRow
          label={`Hold ${holdYears}y more`}
          width={holdPct}
          value={formatPct(extensionIrr)}
          tone={accretive ? 'good' : 'bad'}
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Today's value (NOI ÷ cap)</span>
          <span className="text-warm-black">{formatUsd(todayValue)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Extension IRR vs cap</span>
          <span
            className={`font-medium ${accretive ? 'text-copper-deep' : 'text-signal-bad-ink'}`}
          >
            {accretive ? '+' : ''}
            {((extensionIrr - capRate) * 100).toFixed(0)} bps
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          {accretive
            ? 'Holding earns more than the running cap-rate yield — extension creates value over selling now.'
            : 'Holding earns less than the cap-rate yield — selling now and redeploying at the same cap is the better trade.'}
        </div>
      </div>
    </div>
  );
}
