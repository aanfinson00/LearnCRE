import { BarRow } from './_BarRow';

interface Props {
  buildingSf: number;
  truckCount: number;
}

export function TruckCountPerSfViz({ buildingSf, truckCount }: Props) {
  // Industry rule: 1 dock door per 10,000 SF is "standard."
  const ratio = truckCount / (buildingSf / 10_000);
  const benchmark = 1.0;
  const dense = ratio > 1.25;
  const sparse = ratio < 0.75;

  const max = Math.max(ratio, benchmark) * 1.1;
  const ratioPct = (ratio / max) * 100;
  const benchmarkPct = (benchmark / max) * 100;
  const tone = dense ? 'good' : sparse ? 'bad' : 'copper-soft';

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Doors / 10k SF"
          width={ratioPct}
          value={`${ratio.toFixed(2)}x`}
          tone={tone}
          labelWidthPx={140}
        />
        <BarRow
          label="Industry standard"
          width={benchmarkPct}
          value="1.00x (benchmark)"
          tone="muted"
          labelWidthPx={140}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Building SF</span>
          <span className="text-warm-black">{buildingSf.toLocaleString()}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Truck doors</span>
          <span className="text-warm-black">{truckCount}</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          {dense
            ? 'Above-standard door density — fits high-throughput cross-dock or last-mile distribution.'
            : sparse
              ? 'Below-standard density — likely bulk warehouse or older asset; flags lease-up risk to modern tenants.'
              : 'Standard density — broadly leasable to general industrial users.'}
        </div>
      </div>
    </div>
  );
}
