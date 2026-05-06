import { formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  equityCommitted: number;
  equityDrawnSoFar: number;
  drawAmount: number;
}

export function DrawAllocationViz({
  equityCommitted,
  equityDrawnSoFar,
  drawAmount,
}: Props) {
  const equityRemaining = Math.max(0, equityCommitted - equityDrawnSoFar);
  const fromEquity = Math.min(drawAmount, equityRemaining);
  const fromLender = drawAmount - fromEquity;
  const lenderTakesOver = fromLender > 0;

  const fromEquityPct = (fromEquity / drawAmount) * 100;
  const fromLenderPct = (fromLender / drawAmount) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between font-mono text-[11px] num">
          <span className="text-warm-stone">This draw</span>
          <span className="text-warm-black">{formatUsd(drawAmount)}</span>
        </div>
        <div className="flex h-6 w-full overflow-hidden rounded border border-warm-line">
          {fromEquity > 0 && (
            <div
              className="flex items-center justify-center bg-warm-mute/40 text-[10px] font-mono text-warm-stone"
              style={{ width: `${fromEquityPct}%` }}
            >
              Equity
            </div>
          )}
          {fromLender > 0 && (
            <div
              className="flex items-center justify-center bg-copper text-[10px] font-mono text-warm-paper"
              style={{ width: `${fromLenderPct}%` }}
            >
              Lender
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Equity remaining"
          width={(equityRemaining / equityCommitted) * 100}
          value={formatUsd(equityRemaining)}
          tone="stone"
          labelWidthPx={140}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">From equity</span>
          <span className="text-warm-black">{formatUsd(fromEquity)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">From lender</span>
          <span className="font-medium text-copper-deep">
            {formatUsd(fromLender)}
          </span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          {lenderTakesOver
            ? 'Equity is exhausted (or about to be) — lender funds the balance under the equity-first / pari-passu schedule.'
            : 'Equity-first phase — sponsor funds the full draw until commitments are met, then the construction loan kicks in.'}
        </div>
      </div>
    </div>
  );
}
