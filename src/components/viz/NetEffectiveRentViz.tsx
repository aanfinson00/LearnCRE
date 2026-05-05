import { formatUsdPerSf } from '../../math/rounding';
import { BarRow } from './_BarRow';

interface Props {
  rentPerSf: number;
  leaseTermYears: number;
  tiPerSf: number;
  freeMonths: number;
}

export function NetEffectiveRentViz({
  rentPerSf,
  leaseTermYears,
  tiPerSf,
  freeMonths,
}: Props) {
  const tiAnnualized = tiPerSf / leaseTermYears;
  const freeAnnualized = (rentPerSf * freeMonths) / 12 / leaseTermYears;
  const ner = rentPerSf - tiAnnualized - freeAnnualized;

  const tiPct = (tiAnnualized / rentPerSf) * 100;
  const freePct = (freeAnnualized / rentPerSf) * 100;
  const nerPct = (ner / rentPerSf) * 100;

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3 num font-mono text-xs">
        <BarRow
          label="Face rent"
          width={100}
          value={formatUsdPerSf(rentPerSf)}
          tone="muted"
          labelWidthPx={130}
        />
        <BarRow
          label="− Free rent (amort.)"
          width={freePct}
          value={`−${formatUsdPerSf(freeAnnualized)}`}
          tone="bad"
          labelWidthPx={130}
        />
        <BarRow
          label="− TI (amort.)"
          width={tiPct}
          value={`−${formatUsdPerSf(tiAnnualized)}`}
          tone="bad"
          labelWidthPx={130}
        />
        <BarRow
          label="= NER"
          width={nerPct}
          value={formatUsdPerSf(ner)}
          tone="good"
          labelWidthPx={130}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Term</span>
          <span className="text-warm-black">{leaseTermYears} yrs</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Free rent</span>
          <span className="text-warm-black">{freeMonths} mo</span>
        </div>
        <div className="text-[10px] leading-snug text-warm-mute">
          Concessions amortized over the term, subtracted from face rent. NER
          is what the landlord actually earns per SF/yr after giveaways.
        </div>
      </div>
    </div>
  );
}
