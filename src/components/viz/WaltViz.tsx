interface Lease {
  rent: number;
  remainingTerm: number;
}

interface Props {
  leases: Lease[];
}

const TONE_FILLS = [
  '#d4895a', // copper
  '#e3a982', // copper-soft
  '#b87040', // copper-deep
  '#7d7470', // warm-mute
  '#4a4340', // warm-stone
];

export function WaltViz({ leases }: Props) {
  if (leases.length === 0) return null;
  const totalRent = leases.reduce((a, l) => a + l.rent, 0);
  const walt =
    leases.reduce((a, l) => a + l.rent * l.remainingTerm, 0) / totalRent;
  const maxTerm = Math.max(...leases.map((l) => l.remainingTerm), walt) * 1.05;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-2 num font-mono text-xs">
        {leases.map((l, i) => {
          const widthPct = (l.remainingTerm / maxTerm) * 100;
          const rentSharePct = ((l.rent / totalRent) * 100).toFixed(0);
          const fill = TONE_FILLS[i % TONE_FILLS.length];
          return (
            <div
              key={i}
              className="grid items-center gap-3"
              style={{ gridTemplateColumns: '90px 1fr 90px' }}
            >
              <span className="text-right text-warm-stone">
                T{i + 1} · {rentSharePct}%
              </span>
              <div className="relative h-5 rounded bg-warm-paper/60 overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-aa-slow ease-aa"
                  style={{ width: `${widthPct}%`, background: fill, opacity: 0.78 }}
                />
              </div>
              <span className="text-right text-warm-black">
                {l.remainingTerm.toFixed(1)} yrs
              </span>
            </div>
          );
        })}
        {/* WALT marker line + label across the full bar area */}
        <div
          className="grid items-center gap-3 pt-1"
          style={{ gridTemplateColumns: '90px 1fr 90px' }}
        >
          <span className="text-right text-copper-deep font-medium">WALT</span>
          <div className="relative h-3">
            <div
              className="absolute top-0 bottom-0 border-l-2 border-copper"
              style={{ left: `${(walt / maxTerm) * 100}%` }}
              aria-hidden
            />
          </div>
          <span className="text-right font-medium text-copper-deep">
            {walt.toFixed(2)} yrs
          </span>
        </div>
      </div>

      <div className="text-[10px] leading-snug text-warm-mute border-t border-warm-line pt-2">
        Rent-weighted average lease term across {leases.length} tenant
        {leases.length === 1 ? '' : 's'}. Each tenant contributes proportional
        to its share of total rent, not equally.
      </div>
    </div>
  );
}
