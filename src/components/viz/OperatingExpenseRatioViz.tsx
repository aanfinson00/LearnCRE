import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  egi: number;
  opex: number;
}

export function OperatingExpenseRatioViz({ egi, opex }: Props) {
  const oer = opex / egi;
  const noi = egi - opex;
  const opexPct = (opex / egi) * 100;
  const noiPct = (noi / egi) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="EGI"
          width={100}
          value={formatUsd(egi)}
          tone="muted"
          labelWidthPx={90}
        />
        <BarRow
          label="OpEx"
          width={opexPct}
          value={formatUsd(opex)}
          tone="bad"
          labelWidthPx={90}
        />
        <BarRow
          label="NOI"
          width={noiPct}
          value={formatUsd(noi)}
          tone="good"
          labelWidthPx={90}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">OER (OpEx ÷ EGI)</span>
          <span className="font-medium text-copper-deep">{formatPct(oer)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-mute">NOI margin</span>
          <span className="text-warm-stone">{formatPct(1 - oer)}</span>
        </div>
      </div>
    </div>
  );
}
