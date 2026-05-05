import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(rent: number, sales: number, expected: number): Solution {
  return {
    formula: 'OCR = Total Rent (incl. CAM) / Tenant Sales',
    steps: [
      {
        label: 'OCR',
        expression: `${formatUsd(rent)} / ${formatUsd(sales)}`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const occupancyCostRatioTemplate: QuestionTemplate<'occupancyCostRatio'> = {
  kind: 'occupancyCostRatio',
  label: 'Retail: Occupancy Cost Ratio',
  description: 'Total rent (incl. CAM) ÷ tenant sales → the % of sales eaten by rent.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement', 'mortgageUw'],
  pattern: 'Rent / Sales',
  tips: [
    'OCR is the single best stress signal for a retail tenant. Below 8% = healthy; 10-12% = stressed; 15%+ = pre-default.',
    'Total rent must include base rent + CAM + percentage rent. Excluding CAM understates the true cost-burden.',
    'Industry stress thresholds: grocery 1-3%; QSR 6-8%; specialty apparel 10-15%; jewelry / luxury 4-7%.',
    'Spike in OCR (sales drop while rent stays flat) precedes most retail tenant defaults by 6-12 months.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const sales = rng.pickFromSet([
      1_200_000, 1_800_000, 2_500_000, 3_500_000, 4_800_000, 6_500_000,
      8_500_000, 12_000_000, 18_000_000, 24_000_000,
    ] as const);
    // Independently sample rent so OCR spans a continuous range, not a fixed
    // discrete target list.
    const round = 5_000;
    const rentPctOfSales = rng.pickRange(0.03, 0.20);
    const rent = Math.round((sales * rentPctOfSales) / round) * round;
    const expected = rent / sales;

    return {
      id: nextId('ocr'),
      kind: 'occupancyCostRatio',
      prompt: `Retail tenant pays ${formatUsd(rent)} in total annual rent (base + CAM) and reported ${formatUsd(sales)} of sales. What\'s the occupancy cost ratio?`,
      context: { baseRent: rent, tenantSales: sales },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(rent, sales, expected),
    };
  },
};
