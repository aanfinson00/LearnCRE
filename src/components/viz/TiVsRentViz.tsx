import { effectiveRentCostPerSf } from '../../math/lease';
import { formatUsdPerSf, formatUsdSigned, formatYears } from '../../math/rounding';

interface Props {
  altRentPerSf: number;
  altTiPerSf: number;
  rentPerSf: number;
  tiPerSf: number;
  leaseTermYears: number;
}

export function TiVsRentViz({
  altRentPerSf,
  altTiPerSf,
  rentPerSf,
  tiPerSf,
  leaseTermYears,
}: Props) {
  const nerA = effectiveRentCostPerSf({
    rentPerSf: altRentPerSf,
    tiPerSf: altTiPerSf,
    leaseTermYears,
  });
  const nerB = effectiveRentCostPerSf({
    rentPerSf,
    tiPerSf,
    leaseTermYears,
  });
  const tiAYr = altTiPerSf / leaseTermYears;
  const tiBYr = tiPerSf / leaseTermYears;
  const delta = nerA - nerB;
  const max = Math.max(altRentPerSf, rentPerSf);

  return (
    <div className="rounded-lg border border-warm-line bg-warm-paper/30 p-4 space-y-3">
      <div className="text-xs font-medium uppercase tracking-widest text-warm-mute">
        Visualization
      </div>

      <div className="space-y-3">
        <Scenario
          label="Option A"
          face={altRentPerSf}
          ti={altTiPerSf}
          tiPerYear={tiAYr}
          ner={nerA}
          maxFace={max}
          term={leaseTermYears}
        />
        <Scenario
          label="Option B"
          face={rentPerSf}
          ti={tiPerSf}
          tiPerYear={tiBYr}
          ner={nerB}
          maxFace={max}
          term={leaseTermYears}
        />
      </div>

      <div className="space-y-1 border-t border-warm-line pt-2 font-mono text-[11px] num">
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">Lease term</span>
          <span className="text-warm-black">{formatYears(leaseTermYears)}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-warm-stone">A NER − B NER</span>
          <span
            className={`font-medium ${
              delta < 0 ? 'text-signal-bad-ink' : 'text-copper-deep'
            }`}
          >
            {formatUsdSigned(delta)}/SF/yr
          </span>
        </div>
      </div>
    </div>
  );
}

function Scenario({
  label,
  face,
  ti,
  tiPerYear,
  ner,
  maxFace,
  term,
}: {
  label: string;
  face: number;
  ti: number;
  tiPerYear: number;
  ner: number;
  maxFace: number;
  term: number;
}) {
  const facePct = (face / maxFace) * 100;
  // Within a face-rent-wide bar, NER occupies (ner/face) and TI/yr occupies (1 - ner/face).
  const nerWithin = face > 0 ? (ner / face) * 100 : 100;
  const tiWithin = 100 - nerWithin;
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between text-[10px] uppercase tracking-wider text-warm-mute">
        <span>{label}</span>
        <span className="font-mono num text-warm-stone">
          {formatUsdPerSf(face)} face · {formatUsdPerSf(ti)} TI
        </span>
      </div>
      <div
        className="flex h-8 overflow-hidden rounded border border-warm-line"
        style={{ width: `${facePct}%` }}
      >
        <div
          className="flex h-full items-center justify-end pr-2 bg-copper text-warm-white transition-all duration-aa-slow ease-aa font-mono text-[10px] num"
          style={{ width: `${nerWithin}%` }}
        >
          {nerWithin > 35 ? `NER ${formatUsdPerSf(ner)}` : ''}
        </div>
        <div
          className="flex h-full items-center justify-start pl-2 bg-warm-mute/40 text-warm-ink transition-all duration-aa-slow ease-aa font-mono text-[10px] num"
          style={{ width: `${tiWithin}%` }}
        >
          {tiWithin > 22 ? `TI/yr ${formatUsdPerSf(tiPerYear)}` : ''}
        </div>
      </div>
      <div className="text-[10px] font-mono num text-warm-mute">
        Effective rent /yr = face − TI / {term} yr
      </div>
    </div>
  );
}
