import { formatSf, formatUsd, formatUsdPerSf } from '../../math/rounding';

interface Props {
  replacementCostPerSf: number;
  buildingSf: number;
}

// Typical CRE replacement cost band — matches src/quiz/bands.ts replacementCostPerSf.
const BAND_MIN = 150;
const BAND_MAX = 500;

export function ReplacementCostViz({ replacementCostPerSf, buildingSf }: Props) {
  const total = replacementCostPerSf * buildingSf;
  const clampedRate = Math.max(BAND_MIN, Math.min(BAND_MAX, replacementCostPerSf));
  const positionPct = ((clampedRate - BAND_MIN) / (BAND_MAX - BAND_MIN)) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between text-[10px] uppercase tracking-wider text-warm-mute">
          <span>Where this rate sits in the typical CRE band</span>
          <span className="font-mono num text-warm-stone">
            ${BAND_MIN}–${BAND_MAX}/SF
          </span>
        </div>
        <div className="relative h-6 rounded-full bg-warm-paper border border-warm-line">
          {/* gradient fill from min to subject */}
          <div
            className="h-full rounded-full bg-copper-soft/50 transition-all duration-aa-slow ease-aa"
            style={{ width: `${positionPct}%` }}
          />
          {/* marker tick at subject */}
          <div
            className="absolute top-0 h-full w-0.5 bg-copper"
            style={{ left: `calc(${positionPct}% - 1px)` }}
          />
          {/* label above marker */}
          <div
            className="absolute -top-5 -translate-x-1/2 font-mono text-[10px] font-medium text-copper-deep num"
            style={{ left: `${positionPct}%` }}
          >
            {formatUsdPerSf(replacementCostPerSf)}
          </div>
        </div>
        <div className="flex justify-between font-mono text-[10px] num text-warm-mute">
          <span>${BAND_MIN}/SF</span>
          <span>${BAND_MAX}/SF</span>
        </div>
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Building size</span>
          <span className="text-warm-black">{formatSf(buildingSf)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">× cost per SF</span>
          <span className="text-warm-black">{formatUsdPerSf(replacementCostPerSf)}</span>
        </div>
        <div className="flex items-baseline justify-between border-t border-dotted border-warm-line pt-1">
          <span className="text-warm-stone">Total replacement cost</span>
          <span className="font-medium text-copper-deep">{formatUsd(total)}</span>
        </div>
      </div>
    </div>
  );
}
