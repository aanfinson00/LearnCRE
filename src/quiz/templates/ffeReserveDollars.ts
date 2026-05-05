import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(revenue: number, rate: number, expected: number): Solution {
  return {
    formula: 'FF&E Reserve = Total Revenue × Reserve Rate',
    steps: [
      {
        label: 'Reserve $',
        expression: `${formatUsd(revenue)} × ${formatPct(rate, 1)}`,
        result: formatUsd(expected),
      },
    ],
    answerDisplay: formatUsd(expected),
  };
}

export const ffeReserveDollarsTemplate: QuestionTemplate<'ffeReserveDollars'> = {
  kind: 'ffeReserveDollars',
  label: 'Hotel: FF&E Reserve',
  description: 'Total revenue × FF&E reserve rate → annual reserve dollars.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement', 'mortgageUw'],
  pattern: 'Revenue × FF&E rate',
  tips: [
    'FF&E reserve funds furniture / fixtures / equipment replacement on the rolling cycle (typically 7-10 years).',
    'Industry standard: 4% of total revenue for established hotels; 3% for limited-service; up to 5% for boutique / luxury.',
    'Lender-required: FF&E reserve is a covenant in most CMBS hotel loans. Skipping it = covenant breach.',
    'NOI in hotel underwriting is *after* FF&E reserve. Sponsor pro-formas that show "NOI before FF&E" are dressing up the number.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const round = difficulty === 'advanced' ? 10_000 : 50_000;
    const revenue = Math.round(rng.pickRange(8_000_000, 60_000_000) / round) * round;
    const rate = rng.pickFromSet([0.03, 0.035, 0.04, 0.045, 0.05] as const);
    const expected = revenue * rate;

    return {
      id: nextId('ffe'),
      kind: 'ffeReserveDollars',
      prompt: `A hotel reports ${formatUsd(revenue)} of total revenue. The lender requires a ${formatPct(rate, 1)} FF&E reserve. What\'s the annual reserve amount?`,
      context: { totalRevenue: revenue, ffeReserveRate: rate },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(revenue, rate, expected),
    };
  },
};
