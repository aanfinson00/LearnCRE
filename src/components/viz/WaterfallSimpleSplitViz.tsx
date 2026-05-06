import { formatPct, formatUsd } from '../../math/rounding';

interface Props {
  residual: number;
  lpSplitPct: number;
  gpSplitPct: number;
}

export function WaterfallSimpleSplitViz({
  residual,
  lpSplitPct,
  gpSplitPct,
}: Props) {
  const lpDollars = residual * lpSplitPct;
  const gpDollars = residual * gpSplitPct;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between font-mono text-[11px] num">
          <span className="text-warm-stone">Residual to split</span>
          <span className="text-warm-black">{formatUsd(residual)}</span>
        </div>
        <div className="flex h-6 w-full overflow-hidden rounded border border-warm-line">
          <div
            className="flex items-center justify-center bg-warm-mute/40 text-[10px] font-mono text-warm-stone"
            style={{ width: `${lpSplitPct * 100}%` }}
          >
            LP {formatPct(lpSplitPct, 0)}
          </div>
          <div
            className="flex items-center justify-center bg-copper text-[10px] font-mono text-warm-paper"
            style={{ width: `${gpSplitPct * 100}%` }}
          >
            GP {formatPct(gpSplitPct, 0)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 font-mono text-xs num">
          <div className="space-y-0.5">
            <div className="text-[10px] uppercase tracking-wider text-warm-mute">
              LP take
            </div>
            <div className="text-warm-black">{formatUsd(lpDollars)}</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[10px] uppercase tracking-wider text-warm-mute">
              GP take
            </div>
            <div className="text-copper-deep font-medium">
              {formatUsd(gpDollars)}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-warm-line pt-2 text-[10px] leading-snug text-warm-mute">
        Above pref + catch-up, residual splits at the promote tier. {formatPct(gpSplitPct, 0)}{' '}
        promote means GP earns {formatPct(gpSplitPct, 0)} of every dollar past
        the hurdle while putting in only their pro-rata co-invest.
      </div>
    </div>
  );
}
