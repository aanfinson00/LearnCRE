import { formatMultiple, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  equityIn: number;
  equityOut: number;
}

export function EquityMultipleViz({ equityIn, equityOut }: Props) {
  const em = equityOut / equityIn;
  const max = Math.max(equityIn, equityOut);
  const inPct = (equityIn / max) * 100;
  const outPct = (equityOut / max) * 100;
  const profitable = em >= 1;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Equity in"
          width={inPct}
          value={formatUsd(equityIn)}
          tone="muted"
        />
        <BarRow
          label="Equity out"
          width={outPct}
          value={formatUsd(equityOut)}
          tone={profitable ? 'good' : 'bad'}
        />
      </div>

      <div className="flex items-baseline justify-between border-t border-warm-line pt-2 text-xs">
        <span className="text-warm-stone">Equity multiple</span>
        <span
          className={`font-mono num font-medium ${profitable ? 'text-copper-deep' : 'text-signal-bad-ink'}`}
        >
          {formatMultiple(em)}
        </span>
      </div>
    </div>
  );
}
