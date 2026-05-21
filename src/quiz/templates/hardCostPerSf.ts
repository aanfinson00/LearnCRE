import { formatUsd, formatUsdPerSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

const COST_PER_SF_SEEDS = [150, 175, 200, 225, 250, 275, 300, 325, 350] as const;

function buildSolution(hardCosts: number, buildingSf: number, costPerSf: number): Solution {
  return {
    formula: 'Hard Cost / SF = Total Hard Costs ÷ Rentable SF',
    steps: [
      {
        label: 'Hard cost / SF',
        expression: `${formatUsd(hardCosts)} ÷ ${buildingSf.toLocaleString()} SF`,
        result: formatUsdPerSf(costPerSf),
      },
    ],
    answerDisplay: formatUsdPerSf(costPerSf),
  };
}

export const hardCostPerSfTemplate: QuestionTemplate<'hardCostPerSf'> = {
  kind: 'hardCostPerSf',
  label: 'Hard Cost per SF',
  description: 'Total hard construction costs divided by rentable square footage.',
  category: 'valuation',
  roles: ['development', 'acquisitions'],
  pattern: 'hard costs / rentable SF',
  tips: [
    'Hard costs cover physical construction: structure, MEP, finishes. Soft costs (permits, design, financing) add another 20–35% on top.',
    'Class A multifamily: $200–$350/SF. Class A office/lab: $300–$600/SF. Industrial shell: $80–$140/SF. These benchmarks shift with supply chain and geography.',
    'Hard cost/SF is the first red flag for budget credibility: if a sponsor\'s number is 20% below market comps, dig into the assumptions.',
    'Replacement cost ≈ hard cost + soft cost + developer profit. Hard cost is usually ~60–70% of total replacement cost.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const buildingSf = pickBand(rng, bands.devSf, difficulty);
    const seedCostPerSf = rng.pickFromSet(COST_PER_SF_SEEDS);
    const rawHardCosts = buildingSf * seedCostPerSf;
    const roundStep = difficulty === 'beginner' ? 1_000_000 : difficulty === 'advanced' ? 100_000 : 500_000;
    const hardCosts = Math.round(rawHardCosts / roundStep) * roundStep;
    const costPerSf = hardCosts / buildingSf;

    return {
      id: nextId('hc_sf'),
      kind: 'hardCostPerSf',
      prompt: `A development project has total hard costs of ${formatUsd(hardCosts)} for a ${buildingSf.toLocaleString()} SF building. What is the hard cost per square foot?`,
      context: { hardCostBudget: hardCosts, buildingSf },
      expected: costPerSf,
      unit: 'usdPerSf',
      tolerance: { type: 'abs', band: 2 },
      solution: buildSolution(hardCosts, buildingSf, costPerSf),
    };
  },
};
