import { formatMultiple, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  noi: number;
  debtServiceAnnual: number;
  dscrTarget: number;
}

export function DscrTestPassesViz({ noi, debtServiceAnnual, dscrTarget }: Props) {
  const actualDscr = noi / debtServiceAnnual;
  const passes = actualDscr >= dscrTarget;
  // Scale: 0..2x DSCR is the readable range; clamp.
  const scaleMax = Math.max(2, actualDscr * 1.1, dscrTarget * 1.2);
  const actualPct = (actualDscr / scaleMax) * 100;
  const targetPct = (dscrTarget / scaleMax) * 100;
  const headroomBps = Math.round((actualDscr - dscrTarget) * 100);

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <div className="relative">
          <BarRow
            label="Actual DSCR"
            width={actualPct}
            value={formatMultiple(actualDscr)}
            tone={passes ? 'good' : 'bad'}
            labelWidthPx={100}
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 border-l-2 border-warm-stone/70"
            style={{
              left: `calc(100px + 0.75rem + (100% - 220px - 0.75rem) * ${targetPct / 100})`,
            }}
            aria-hidden
          />
        </div>
        <div className="flex items-baseline justify-between text-[11px]">
          <span className="text-warm-stone">Lender threshold</span>
          <span className="font-mono num text-warm-black">
            {formatMultiple(dscrTarget)}
          </span>
        </div>
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">NOI · DS</span>
          <span className="text-warm-black">
            {formatUsd(noi)} · {formatUsd(debtServiceAnnual)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Test result</span>
          <span
            className={`font-medium ${passes ? 'text-copper-deep' : 'text-signal-bad-ink'}`}
          >
            {passes ? 'Pass' : 'Fail'} ({headroomBps >= 0 ? '+' : ''}
            {headroomBps} bps headroom)
          </span>
        </div>
      </div>
    </div>
  );
}
