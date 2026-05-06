import { formatPct } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  irrBeforePromote: number;
  promotePctOfProfit: number;
  holdYears: number;
  irrAfterPromote: number;
}

export function IrrAfterPromoteViz({
  irrBeforePromote,
  promotePctOfProfit,
  holdYears,
  irrAfterPromote,
}: Props) {
  const dragBps = Math.round((irrBeforePromote - irrAfterPromote) * 10000);
  const max = Math.max(irrBeforePromote, irrAfterPromote) * 1.05;
  const beforePct = (irrBeforePromote / max) * 100;
  const afterPct = (irrAfterPromote / max) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="LP gross IRR"
          width={beforePct}
          value={formatPct(irrBeforePromote)}
          tone="muted"
          labelWidthPx={120}
        />
        <BarRow
          label="LP net of promote"
          width={afterPct}
          value={formatPct(irrAfterPromote)}
          tone="copper-soft"
          labelWidthPx={120}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Promote tier</span>
          <span className="text-warm-black">
            {formatPct(promotePctOfProfit, 0)} of profit · {holdYears} yr hold
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">IRR drag</span>
          <span className="font-medium text-signal-bad-ink">−{dragBps} bps</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          GP's promote redirects {formatPct(promotePctOfProfit, 0)} of LP
          profit. Net IRR is what the LP actually clears after the sponsor's
          take — the headline interview answer.
        </div>
      </div>
    </div>
  );
}
