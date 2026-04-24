import { effectiveRentCostPerSf, tiVsRentDelta } from '../../math/lease';
import { formatUsdPerSf, formatUsdSigned, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(params: {
  rentA: number;
  tiA: number;
  rentB: number;
  tiB: number;
  years: number;
}): Solution {
  const a = effectiveRentCostPerSf({ rentPerSf: params.rentA, tiPerSf: params.tiA, leaseTermYears: params.years });
  const b = effectiveRentCostPerSf({ rentPerSf: params.rentB, tiPerSf: params.tiB, leaseTermYears: params.years });
  const delta = tiVsRentDelta({ ...params, leaseTermYears: params.years });
  return {
    formula: 'Effective cost / yr = rent − TI / term;  ΔCost = A − B',
    steps: [
      {
        label: 'Option A effective',
        expression: `${formatUsdPerSf(params.rentA)} − ${formatUsdPerSf(params.tiA)}/${params.years}`,
        result: formatUsdPerSf(a),
      },
      {
        label: 'Option B effective',
        expression: `${formatUsdPerSf(params.rentB)} − ${formatUsdPerSf(params.tiB)}/${params.years}`,
        result: formatUsdPerSf(b),
      },
      {
        label: 'A − B',
        expression: `${formatUsdPerSf(a)} − ${formatUsdPerSf(b)}`,
        result: `${formatUsdSigned(delta)}/SF/yr`,
      },
    ],
    answerDisplay: formatUsdPerSf(delta),
  };
}

export const tiVsRentTemplate: QuestionTemplate<'tiVsRent'> = {
  kind: 'tiVsRent',
  label: 'TI vs Rent Tradeoff',
  description: 'Compare two lease offers in $/SF/yr effective cost.',
  category: 'valuation',
  tips: [
    'Annualize the TI, subtract from face rent → effective rent. Compare side-by-side.',
    '$30 TI over a 5-yr lease = $6/SF/yr. So $20 face + $30 TI ≈ $14 effective. $18 face + $0 TI = $18 effective. Option A wins by $4.',
    'Positive answer = Option A is more expensive per SF/yr; negative = Option B is more expensive.',
    'Shortcut in negotiation: offer $1/SF more rent in exchange for $n × lease years of TI — tenant neutral.',
  ],
  generate(rng, difficulty = 'intermediate') {
    const years = rng.pickInt(bands.leaseTermYears.min, bands.leaseTermYears.max);
    const rentA = pickBand(rng, bands.rentPerSf, difficulty);
    const rentB =
      rentA -
      pickBand(rng, { min: 1, max: Math.min(5, rentA * 0.3), step: 0.25 }, difficulty);
    const tiA = 0;
    const tiB = Math.round(pickBand(rng, { min: 10, max: 40, step: 1 }, difficulty));
    const expected = tiVsRentDelta({ rentA, tiA, rentB, tiB, leaseTermYears: years });

    return {
      id: nextId('tivr'),
      kind: 'tiVsRent',
      prompt: `Option A: ${formatUsdPerSf(rentA)} face rent, no TI. Option B: ${formatUsdPerSf(rentB)} face rent with ${formatUsdPerSf(tiB)} TI. Both are ${formatYears(years)} leases. What's A − B on an effective $/SF/yr basis? (positive = A costs more)`,
      context: {
        altRentPerSf: rentA,
        altTiPerSf: tiA,
        rentPerSf: rentB,
        tiPerSf: tiB,
        leaseTermYears: years,
      },
      expected,
      unit: 'usdPerSf',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution({ rentA, tiA, rentB, tiB, years }),
    };
  },
};
