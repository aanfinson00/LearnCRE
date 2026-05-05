import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(gop: number, revenue: number, expected: number): Solution {
  return {
    formula: 'GOP Margin = GOP / Total Revenue',
    steps: [
      {
        label: 'Margin',
        expression: `${formatUsd(gop)} / ${formatUsd(revenue)}`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const gopMarginTemplate: QuestionTemplate<'gopMargin'> = {
  kind: 'gopMargin',
  label: 'Hotel: GOP Margin',
  description: 'Gross Operating Profit ÷ Total Revenue — the hotel-level operating margin.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement'],
  pattern: 'GOP / Revenue',
  tips: [
    'GOP is hotel-level profit after departmental + undistributed expenses, before fixed costs.',
    'Industry benchmarks: limited-service ~40-45% GOP margin; full-service ~30-35%; luxury ~25-30%.',
    'GOP margin compresses with: low occupancy (fixed-cost drag), high labor cost markets, F&B-heavy operations.',
    'NOI = GOP − fixed costs (taxes, insurance, FF&E reserve). Subtract those carefully when bridging.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const round = difficulty === 'advanced' ? 25_000 : 100_000;
    const revenue = Math.round(rng.pickRange(10_000_000, 80_000_000) / round) * round;
    const margin = rng.pickFromSet([0.25, 0.28, 0.30, 0.32, 0.35, 0.38, 0.40, 0.42, 0.45] as const);
    const gop = Math.round((revenue * margin) / round) * round;
    const expected = gop / revenue;

    return {
      id: nextId('gop'),
      kind: 'gopMargin',
      prompt: `A full-service hotel reports ${formatUsd(revenue)} of total revenue and ${formatUsd(gop)} of GOP for the trailing year. What\'s the GOP margin?`,
      context: { totalRevenue: revenue },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(gop, revenue, expected),
    };
  },
};
