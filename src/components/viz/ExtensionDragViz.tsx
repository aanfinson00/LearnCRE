import { formatPct, formatUsd } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  equityIn: number;
  equityOut: number;
  holdYears: number;
  drag: number;
}

export function ExtensionDragViz({
  equityIn,
  equityOut,
  holdYears,
  drag,
}: Props) {
  const irrExtended = Math.pow(equityOut / equityIn, 1 / holdYears) - 1;
  const irrOriginal = irrExtended + drag;
  const max = Math.max(irrOriginal, irrExtended) * 1.05;
  const origPct = (irrOriginal / max) * 100;
  const extPct = (irrExtended / max) * 100;
  const dragBps = Math.round(drag * 10000);

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="IRR if sold early"
          width={origPct}
          value={formatPct(irrOriginal)}
          tone="good"
          labelWidthPx={140}
        />
        <BarRow
          label={`IRR after extending ${holdYears}y`}
          width={extPct}
          value={formatPct(irrExtended)}
          tone="bad"
          labelWidthPx={140}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Equity in · out</span>
          <span className="text-warm-black">
            {formatUsd(equityIn)} · {formatUsd(equityOut)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">IRR drag</span>
          <span className="font-medium text-signal-bad-ink">−{dragBps} bps</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Same exit value spread over more years dilutes IRR. Extending only
          helps if incremental years generate incremental cash — otherwise
          you'd rather sell now and redeploy.
        </div>
      </div>
    </div>
  );
}
