import { formatPct } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  unleveredIrr: number;
  borrowRate: number;
  ltv: number;
}

export function LeveredIrrViz({ unleveredIrr, borrowRate, ltv }: Props) {
  const spread = unleveredIrr - borrowRate;
  const leverageMult = ltv / (1 - ltv);
  const lift = spread * leverageMult;
  const leveredIrr = unleveredIrr + lift;
  const accretive = spread > 0;

  // Bar widths share a scale capped at the levered IRR
  const max = Math.max(leveredIrr, unleveredIrr) * 1.05;
  const unlevPct = (unleveredIrr / max) * 100;
  const liftPct = (lift / max) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Unlevered IRR"
          width={unlevPct}
          value={formatPct(unleveredIrr)}
          tone="muted"
          labelWidthPx={120}
        />
        <BarRow
          label={accretive ? '+ Leverage lift' : '− Leverage drag'}
          width={Math.abs(liftPct)}
          value={`${accretive ? '+' : ''}${formatPct(lift)}`}
          tone={accretive ? 'good' : 'bad'}
          labelWidthPx={120}
        />
        <BarRow
          label="= Levered IRR"
          width={(leveredIrr / max) * 100}
          value={formatPct(leveredIrr)}
          tone="copper-soft"
          labelWidthPx={120}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Spread (unlev − borrow)</span>
          <span className="text-warm-black">{formatPct(spread)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Leverage multiplier</span>
          <span className="text-warm-black">
            {formatPct(ltv, 0)} / (1 − {formatPct(ltv, 0)}) ={' '}
            {leverageMult.toFixed(2)}x
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          {accretive
            ? 'Unlevered IRR exceeds borrow rate — leverage is accretive.'
            : 'Borrow rate exceeds unlevered IRR — leverage destroys returns.'}{' '}
          Approximation assumes parallel cash flows; actual levered IRR
          typically lands within 100 bps of the formula.
        </div>
      </div>
    </div>
  );
}
