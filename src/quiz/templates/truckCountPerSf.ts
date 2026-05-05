import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(trucks: number, sf: number, expected: number): Solution {
  return {
    formula: 'Trucks per 10k SF = (Trucks / SF) × 10,000',
    steps: [
      {
        label: 'Density',
        expression: `${trucks} trucks / ${sf.toLocaleString()} SF × 10,000`,
        result: expected.toFixed(2),
      },
    ],
    answerDisplay: expected.toFixed(2),
  };
}

export const truckCountPerSfTemplate: QuestionTemplate<'truckCountPerSf'> = {
  kind: 'truckCountPerSf',
  label: 'Industrial: Truck Density',
  description: 'Truck count ÷ SF (per 10k) → loading density signal: distribution vs last-mile.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement', 'development'],
  pattern: '(Trucks / SF) × 10,000',
  tips: [
    'Distribution centers: 1-2 truck doors per 10k SF (large dock-high counts).',
    'Last-mile fulfillment: 4-8 truck doors per 10k SF — much higher density for fast delivery cycles.',
    'Cross-dock: trucks come in one side, leave the other. Highest truck-density use; 8+ doors per 10k SF.',
    'Higher truck density = higher rent premium. Last-mile rents trade at 25-50% premium to general distribution.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    // Pick SF and an independent truck count, so density takes on many values.
    const sf = rng.pickFromSet([
      80_000, 100_000, 120_000, 160_000, 200_000, 250_000, 300_000, 400_000,
      500_000, 600_000, 750_000, 900_000, 1_100_000,
    ] as const);
    const trucks = rng.pickInt(8, 480);
    const expected = (trucks / sf) * 10_000;

    return {
      id: nextId('trk'),
      kind: 'truckCountPerSf',
      prompt: `An industrial building has ${sf.toLocaleString()} SF and ${trucks} truck doors. What\'s the truck-door density per 10,000 SF?`,
      context: { buildingSf: sf, truckCount: trucks },
      expected,
      unit: 'multiple',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(trucks, sf, expected),
    };
  },
};
