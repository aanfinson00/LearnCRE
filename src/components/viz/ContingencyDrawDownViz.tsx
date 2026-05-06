import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  hardCostBudget: number;
  contingency: number;
  overrunsToDate: number;
}

export function ContingencyDrawDownViz({
  hardCostBudget,
  contingency,
  overrunsToDate,
}: Props) {
  const remaining = Math.max(0, contingency - overrunsToDate);
  const remainingPct = remaining / contingency;
  const usedPct = (overrunsToDate / contingency) * 100;
  const exhausted = remainingPct <= 0;
  const tight = remainingPct < 0.25;
  const healthy = remainingPct >= 0.5;

  const tone = exhausted || tight ? 'bad' : healthy ? 'good' : 'copper-soft';

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Contingency"
          width={100}
          value={formatUsd(contingency)}
          tone="muted"
          labelWidthPx={130}
        />
        <BarRow
          label="Used by overruns"
          width={Math.min(100, usedPct)}
          value={formatUsd(overrunsToDate)}
          tone="bad"
          labelWidthPx={130}
        />
        <BarRow
          label="Remaining"
          width={remainingPct * 100}
          value={formatUsd(remaining)}
          tone={tone}
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Contingency remaining</span>
          <span
            className={`font-medium ${exhausted || tight ? 'text-signal-bad-ink' : 'text-copper-deep'}`}
          >
            {formatPct(remainingPct, 1)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Contingency / hard cost</span>
          <span className="text-warm-black">
            {formatPct(contingency / hardCostBudget, 1)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          {exhausted
            ? 'Contingency exhausted — any further overruns must be funded by sponsor equity or a budget revision.'
            : tight
              ? 'Tight (<25% remaining). Lenders watch this closely once it crosses the 25% threshold.'
              : healthy
                ? 'Healthy cushion above 50% — typical at early stages of a vertical build.'
                : 'Mid-range remaining — monitor draw trends.'}
        </div>
      </div>
    </div>
  );
}
