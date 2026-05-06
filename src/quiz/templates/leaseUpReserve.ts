import { formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

// Linear ramp 0 → 100% means average occupancy during ramp is 50% of stabilized.
// Reserve sizes the NOI shortfall = stabilized × (1 − 0.5) × (months/12).
const ACHIEVED_OCC_DURING_RAMP = 0.5;

const LEASE_UP_MONTHS = [12, 18, 24, 30, 36] as const;

function buildSolution(
  stabilizedNoi: number,
  leaseUpMonths: number,
  reserve: number,
): Solution {
  const yearsFraction = leaseUpMonths / 12;
  const shortfallFraction = 1 - ACHIEVED_OCC_DURING_RAMP;
  return {
    formula:
      'Reserve = stabilized NOI × (lease-up months / 12) × (1 − avg ramp occupancy)',
    steps: [
      {
        label: 'Lease-up duration',
        expression: `${leaseUpMonths} mo / 12`,
        result: yearsFraction.toFixed(2) + ' yr',
      },
      {
        label: 'Avg occupancy during ramp',
        expression: 'Linear 0 → 100%',
        result: '50% of stabilized',
      },
      {
        label: 'NOI shortfall fraction',
        expression: '1 − 0.5',
        result: shortfallFraction.toFixed(2),
      },
      {
        label: 'Reserve sized',
        expression: `${formatUsd(stabilizedNoi)} × ${yearsFraction.toFixed(2)} × ${shortfallFraction.toFixed(2)}`,
        result: formatUsd(reserve),
      },
    ],
    answerDisplay: formatUsd(reserve),
  };
}

export const leaseUpReserveTemplate: QuestionTemplate<'leaseUpReserve'> = {
  kind: 'leaseUpReserve',
  label: 'Lease-Up Reserve',
  description:
    'Size the lease-up reserve for a ground-up build that stabilizes over N months under a linear-ramp assumption.',
  category: 'returns',
  roles: ['development', 'acquisitions'],
  pattern: 'reserve = stabilized NOI × (months / 12) × (1 − avg ramp occ)',
  tips: [
    'Linear ramp = average 50% of stabilized NOI during the lease-up window. Many shops use a curve (J-curve, hockey-stick) but linear is the interview-standard simplification.',
    'Reserve covers the NOI shortfall vs stabilized — separate from interest carry on construction debt during lease-up.',
    'A 24-mo lease-up at $4M stabilized NOI sizes a $4M reserve (4M × 2 × 0.5).',
    'Aggressive sponsors front-load occupancy assumptions to shrink the reserve. Watch this — it\'s the easiest place to find proforma cheats.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const stabilizedNoi = pickBand(rng, bands.noi, difficulty);
    const leaseUpMonths = rng.pickFromSet(LEASE_UP_MONTHS);
    const reserve =
      stabilizedNoi * (leaseUpMonths / 12) * (1 - ACHIEVED_OCC_DURING_RAMP);

    return {
      id: nextId('lease_up_reserve'),
      kind: 'leaseUpReserve',
      prompt: `Ground-up MF stabilizes over ${leaseUpMonths} months on a linear ramp from 0 → 100%; stabilized NOI is ${formatUsd(stabilizedNoi)}. Size the lease-up reserve to cover NOI shortfall during ramp.`,
      context: {
        stabilizedNoi,
        leaseUpMonths,
      },
      expected: reserve,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(stabilizedNoi, leaseUpMonths, reserve),
    };
  },
};
