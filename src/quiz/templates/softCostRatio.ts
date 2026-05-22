import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  softCosts: number,
  hardCosts: number,
  landCost: number,
  expected: number,
): Solution {
  const tpc = hardCosts + softCosts + landCost;
  return {
    formula: 'Soft Cost % = Soft Costs ÷ (Hard + Soft + Land)',
    steps: [
      {
        label: 'Total project cost',
        expression: `${formatUsd(hardCosts)} + ${formatUsd(softCosts)} + ${formatUsd(landCost)}`,
        result: formatUsd(tpc),
      },
      {
        label: 'Soft cost ratio',
        expression: `${formatUsd(softCosts)} / ${formatUsd(tpc)}`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const softCostRatioTemplate: QuestionTemplate<'softCostRatio'> = {
  kind: 'softCostRatio',
  label: 'Dev: Soft Cost Ratio',
  description: 'Soft costs (arch, permits, legal, financing fees) as a % of total project cost.',
  category: 'valuation',
  roles: ['development', 'mortgageUw'],
  pattern: 'Soft Costs / (Hard + Soft + Land)',
  tips: [
    'Soft costs typically run 10–18% of TPC for ground-up residential; entitlement-heavy or complex sites skew higher.',
    'Soft costs include: architecture/engineering, permits, legal, development fees, financing fees/carry, insurance, G&A.',
    'Construction period interest is often bucketed as a soft cost — confirm whether it\'s included in the sponsor\'s number.',
    'Lenders scrutinize soft costs for reasonableness; inflated line items can flag a budget as aggressive.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const hardCosts =
      Math.round(rng.pickRange(8_000_000, 60_000_000) / 500_000) * 500_000;
    // Soft cost as % of hard: typically 15–30%
    const softPctOfHard = rng.pickFromSet([0.15, 0.18, 0.20, 0.22, 0.25, 0.28, 0.30] as const);
    const softCosts = Math.round((hardCosts * softPctOfHard) / 100_000) * 100_000;
    // Land: 10–25% of hard costs
    const landPctOfHard = rng.pickFromSet([0.10, 0.12, 0.15, 0.18, 0.20, 0.25] as const);
    const landCost = Math.round((hardCosts * landPctOfHard) / 100_000) * 100_000;
    const tpc = hardCosts + softCosts + landCost;
    const expected = softCosts / tpc;

    return {
      id: nextId('scr'),
      kind: 'softCostRatio',
      prompt: `Ground-up development: ${formatUsd(hardCosts)} hard costs, ${formatUsd(softCosts)} soft costs (architecture, permits, carry, legal), and ${formatUsd(landCost)} land. What percentage of total project cost are soft costs?`,
      context: {
        hardCosts,
        softCosts,
        landCost,
        totalProjectCost: tpc,
      },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(softCosts, hardCosts, landCost, expected),
    };
  },
};
