import { value as noiValue } from '../../math/core';
import { formatPct, formatPctChange, formatUsd } from '../../math/rounding';

interface Props {
  noi: number;
  oldCap: number;
  newCap: number;
}

export function CapCompressionViz({ noi, oldCap, newCap }: Props) {
  const oldValue = noiValue(noi, oldCap);
  const newValue = noiValue(noi, newCap);
  const max = Math.max(oldValue, newValue);
  const oldPct = (oldValue / max) * 100;
  const newPct = (newValue / max) * 100;
  const change = newValue / oldValue - 1;
  const grew = newValue > oldValue;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label={`@ ${formatPct(oldCap)}`}
          width={oldPct}
          value={formatUsd(oldValue)}
          tone="muted"
        />
        <BarRow
          label={`@ ${formatPct(newCap)}`}
          width={newPct}
          value={formatUsd(newValue)}
          tone={grew ? 'good' : 'bad'}
        />
      </div>

      <div className="flex items-baseline justify-between border-t border-warm-line pt-2 text-xs">
        <span className="text-warm-stone">% change in value</span>
        <span
          className={`font-mono num font-medium ${grew ? 'text-signal-good-ink' : 'text-signal-bad-ink'}`}
        >
          {formatPctChange(change, 1)}
        </span>
      </div>
    </div>
  );
}

function BarRow({
  label,
  width,
  value,
  tone,
}: {
  label: string;
  width: number;
  value: string;
  tone: 'muted' | 'good' | 'bad';
}) {
  const bg =
    tone === 'good' ? 'bg-copper' : tone === 'bad' ? 'bg-signal-bad/70' : 'bg-warm-mute/40';
  return (
    <div className="grid grid-cols-[80px_1fr_120px] items-center gap-3">
      <span className="text-warm-stone text-right">{label}</span>
      <div className="h-5 rounded bg-warm-paper/60 overflow-hidden">
        <div
          className={`h-full rounded transition-all duration-aa-slow ease-aa ${bg}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="text-warm-black text-right">{value}</span>
    </div>
  );
}
