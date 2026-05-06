import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  opexDelta: number;
  capRate: number;
}

export function OpexChangeViz({ opexDelta, capRate }: Props) {
  const noiDelta = -opexDelta;
  const valueDelta = noiDelta / capRate;
  const isCut = opexDelta < 0;
  const noiTone = isCut ? 'good' : 'bad';

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="OpEx Δ"
          width={100}
          value={`${opexDelta >= 0 ? '+' : ''}${formatUsd(opexDelta)}`}
          tone={isCut ? 'stone' : 'bad'}
          labelWidthPx={120}
        />
        <BarRow
          label="NOI Δ (= −OpEx Δ)"
          width={100}
          value={`${noiDelta >= 0 ? '+' : ''}${formatUsd(noiDelta)}`}
          tone={noiTone}
          labelWidthPx={120}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">÷ cap rate ({formatPct(capRate)})</span>
          <span
            className={`font-medium ${isCut ? 'text-copper-deep' : 'text-signal-bad-ink'}`}
          >
            {valueDelta >= 0 ? '+' : ''}
            {formatUsd(valueDelta)} value
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Every dollar of recurring OpEx capitalizes at the cap rate — a $50k
          annual savings at a 5% cap is $1M of value. Persistent OpEx changes
          (taxes, insurance, payroll) move the needle far more than one-off
          repairs.
        </div>
      </div>
    </div>
  );
}
