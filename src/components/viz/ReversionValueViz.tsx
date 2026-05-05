import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  stabilizedNoi: number;
  exitCap: number;
  holdYears?: number;
}

export function ReversionValueViz({
  stabilizedNoi,
  exitCap,
  holdYears,
}: Props) {
  const reversion = stabilizedNoi / exitCap;
  const max = reversion;
  const noiPct = (stabilizedNoi / max) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Exit-yr NOI"
          width={noiPct}
          value={formatUsd(stabilizedNoi)}
          tone="muted"
          labelWidthPx={110}
        />
        <BarRow
          label="Reversion value"
          width={100}
          value={formatUsd(reversion)}
          tone="good"
          labelWidthPx={110}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Exit cap</span>
          <span className="text-warm-black">{formatPct(exitCap)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Reversion = NOI ÷ exit cap</span>
          <span className="font-medium text-copper-deep">
            {formatUsd(reversion)}
          </span>
        </div>
        {holdYears !== undefined && (
          <div className="text-[10px] leading-snug text-warm-mute">
            Year-{holdYears} exit using trailing-NOI convention.
          </div>
        )}
      </div>
    </div>
  );
}
