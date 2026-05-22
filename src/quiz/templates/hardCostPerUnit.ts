import { formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(hardCosts: number, units: number, expected: number): Solution {
  return {
    formula: 'Hard Cost / Unit = Hard Costs ÷ Unit Count',
    steps: [
      {
        label: 'Hard cost / unit',
        expression: `${formatUsd(hardCosts)} ÷ ${units} units`,
        result: formatUsd(expected),
      },
    ],
    answerDisplay: `${formatUsd(expected)}/unit`,
  };
}

export const hardCostPerUnitTemplate: QuestionTemplate<'hardCostPerUnit'> = {
  kind: 'hardCostPerUnit',
  label: 'Dev: Hard Cost per Unit',
  description: 'Benchmark hard construction costs on a per-unit basis for residential development.',
  category: 'valuation',
  roles: ['development', 'acquisitions'],
  pattern: 'Hard Costs ÷ Unit Count',
  tips: [
    'Hard cost / unit benchmarks vary widely by product type: $100–150k/unit for surface-parking garden-style MF, $250–350k/unit for podium, $400k+ for high-rise.',
    'Hard costs typically represent 55–65% of TPC (excluding land). Soft costs + land make up the rest.',
    'Sponsors sometimes quote hard costs ex-GC overhead/profit — always confirm whether the GC contract is included.',
    'Rising material and labor costs since 2021 have pushed many markets 20–30% above pre-pandemic benchmarks.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const units = rng.pickFromSet([48, 60, 80, 96, 120, 150, 200, 250, 300] as const);
    const hardCostPerUnit =
      rng.pickFromSet([105_000, 120_000, 140_000, 160_000, 180_000, 220_000, 280_000, 320_000] as const);
    const hardCosts = hardCostPerUnit * units;
    const expected = hardCosts / units;

    return {
      id: nextId('hcpu'),
      kind: 'hardCostPerUnit',
      prompt: `A ground-up multifamily development delivers ${units} units with ${formatUsd(hardCosts)} in hard construction costs. What's the hard cost per unit?`,
      context: {
        hardCosts,
        units,
      },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(hardCosts, units, expected),
    };
  },
};
