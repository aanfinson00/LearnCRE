import { formatUsd, formatUsdPerSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(sales: number, sf: number, expected: number): Solution {
  return {
    formula: 'Sales/SF = Tenant Sales / Leased SF',
    steps: [
      {
        label: 'Sales/SF',
        expression: `${formatUsd(sales)} / ${sf.toLocaleString()} SF`,
        result: formatUsdPerSf(expected, 0),
      },
    ],
    answerDisplay: formatUsdPerSf(expected, 0),
  };
}

export const salesPerSfTemplate: QuestionTemplate<'salesPerSf'> = {
  kind: 'salesPerSf',
  label: 'Retail: Sales / SF',
  description: 'Tenant\'s annual sales ÷ leased SF — the headline retail-tenant-health metric.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement'],
  pattern: 'Sales / SF',
  tips: [
    'Sales/SF is the tenant\'s "productivity." A grocery doing $800/SF is healthy; under $500 is a watch-list item.',
    'Industry benchmarks vary wildly by category — apparel ~$300-500/SF; quick-serve restaurants $700-1500; trophy malls $700+/SF avg.',
    'Pair with occupancy cost ratio (rent + CAM + tax ÷ sales): a tenant doing $500/SF with $65/SF all-in occupancy cost is at 13% (stretched); the same sales at $35/SF is 7% (comfortable).',
    'Sales/SF lets landlords compare tenants across asset types. Best-in-class CRE pros track this as a leading indicator of tenant default risk.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const sf = rng.pickFromSet([
      2_500, 3_200, 4_000, 5_000, 6_500, 8_000, 10_000, 12_000, 15_000, 18_000,
      22_000, 25_000, 32_000, 40_000,
    ] as const);
    // Draw a realistic productivity level, then back into total sales.
    const psf = rng.pickRange(200, 1_200, { step: 5 });
    const round = 5_000;
    const sales = Math.max(round, Math.round((psf * sf) / round) * round);
    const expected = sales / sf;

    return {
      id: nextId('spsf'),
      kind: 'salesPerSf',
      prompt: `A retail tenant occupies ${sf.toLocaleString()} SF and reported ${formatUsd(sales)} in annual sales. What\'s the tenant\'s sales per SF?`,
      context: { tenantSales: sales, buildingSf: sf },
      expected,
      unit: 'usdPerSf',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(sales, sf, expected),
    };
  },
};
