import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  totalBudget: number;
  incurred: number;
}

export function CostToCompleteViz({ totalBudget, incurred }: Props) {
  const remaining = totalBudget - incurred;
  const pctComplete = incurred / totalBudget;
  const incurredPct = pctComplete * 100;
  const remainingPct = (remaining / totalBudget) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Total budget"
          width={100}
          value={formatUsd(totalBudget)}
          tone="muted"
          labelWidthPx={130}
        />
        <BarRow
          label="Incurred"
          width={incurredPct}
          value={formatUsd(incurred)}
          tone="copper-soft"
          labelWidthPx={130}
        />
        <BarRow
          label="Cost to complete"
          width={remainingPct}
          value={formatUsd(remaining)}
          tone="good"
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">% complete</span>
          <span className="font-medium text-copper-deep">
            {formatPct(pctComplete, 1)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Lender draws fund cost-to-complete only — once incurred catches up
          to budget, no more draws unless a budget revision is signed.
        </div>
      </div>
    </div>
  );
}
