import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  egi: number;
  opexRatioValue: number;
}

export function NoiFromOerViz({ egi, opexRatioValue }: Props) {
  const opex = egi * opexRatioValue;
  const noi = egi - opex;
  const opexPct = opexRatioValue * 100;
  const noiPct = (1 - opexRatioValue) * 100;

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
          label={`× OER ${formatPct(opexRatioValue, 1)}`}
          width={opexPct}
          value={formatUsd(opex)}
          tone="bad"
          labelWidthPx={90}
        />
        <BarRow
          label="= NOI"
          width={noiPct}
          value={formatUsd(noi)}
          tone="good"
          labelWidthPx={90}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">NOI margin (1 − OER)</span>
          <span className="font-medium text-copper-deep">
            {formatPct(1 - opexRatioValue, 1)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          When you have an OER but not the OpEx line, NOI = EGI × (1 − OER).
          Quick path to the cap-able number when the trailing financials are
          summarized at a margin level.
        </div>
      </div>
    </div>
  );
}
