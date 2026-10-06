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
    'Bulk distribution: ~1-1.5 dock doors per 10k SF (roughly 1 door per 7-10k SF).',
    'Cross-dock: doors on both long walls, ~2-2.5 per 10k SF (1 per 4-5k SF).',
    'Below ~0.8 per 10k SF reads as storage / manufacturing; well above 3 is a truck terminal, a different asset type.',
    'Higher door density supports faster throughput, which logistics tenants pay for. Check it against how the tenant uses the space.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    // Pick SF, then a realistic door density (storage-light through cross-dock).
    const sf = rng.pickFromSet([
      80_000, 100_000, 120_000, 160_000, 200_000, 250_000, 300_000, 400_000,
      500_000, 600_000, 750_000, 900_000, 1_100_000,
    ] as const);
    const density = rng.pickRange(0.6, 2.8, { step: 0.05 });
    const trucks = Math.max(4, Math.round((density * sf) / 10_000));
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
