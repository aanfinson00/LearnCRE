import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  freeMonths: number,
  leaseTermMonths: number,
  monthlyRent: number,
  expected: number,
): Solution {
  const concessionValue = freeMonths * monthlyRent;
  const grossPotential = leaseTermMonths * monthlyRent;
  return {
    formula: 'Concession % = Free Months / Total Lease Months',
    steps: [
      {
        label: 'Total lease months',
        expression: `${leaseTermMonths} months`,
        result: `${leaseTermMonths} months`,
      },
      {
        label: 'Concession value',
        expression: `${freeMonths} free months × ${formatUsd(monthlyRent)}/mo`,
        result: formatUsd(concessionValue),
      },
      {
        label: 'Concession as % of gross potential rent',
        expression: `${formatUsd(concessionValue)} / ${formatUsd(grossPotential)}`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const concessionEffectiveRentTemplate: QuestionTemplate<'concessionEffectiveRent'> = {
  kind: 'concessionEffectiveRent',
  label: 'MF: Concession as % of Gross Rent',
  description: 'Free-rent concession expressed as a percentage of gross potential rent over the lease term.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement'],
  pattern: 'Free Months / Total Lease Months',
  tips: [
    '1 month free on a 12-month lease = 8.3% concession. On a 14-month lease it drops to 7.1%.',
    'Concessions are a leading indicator of market softness — rising free months signal oversupply or weak demand.',
    'Net effective rent = gross rent × (1 − concession %). A $2,000 asking rent with 1-month free = $1,833 NER on a 12-month lease.',
    'When underwriting acquisitions, always re-underwrite to market concession levels — not the in-place (often lower) concession stack.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const leaseTermMonths = rng.pickFromSet([12, 13, 14, 15, 18] as const);
    const freeMonths = rng.pickFromSet([0.5, 1, 1.5, 2] as const);
    const monthlyRent =
      Math.round(rng.pickRange(1_200, 3_500) / 50) * 50;
    const expected = freeMonths / leaseTermMonths;

    return {
      id: nextId('cer'),
      kind: 'concessionEffectiveRent',
      prompt: `A multifamily lease is signed at ${formatUsd(monthlyRent)}/month for ${leaseTermMonths} months with ${freeMonths} month${freeMonths !== 1 ? 's' : ''} of free rent as a concession. What's the concession as a percentage of gross potential rent over the lease term?`,
      context: {
        freeMonths,
        leaseTermYears: leaseTermMonths / 12,
        rentPerUnitValue: monthlyRent,
      },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(freeMonths, leaseTermMonths, monthlyRent, expected),
    };
  },
};
