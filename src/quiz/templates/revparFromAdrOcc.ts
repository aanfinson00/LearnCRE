import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(adr: number, occ: number, expected: number): Solution {
  return {
    formula: 'RevPAR = ADR × Occupancy',
    steps: [
      {
        label: 'RevPAR',
        expression: `${formatUsd(adr)} × ${formatPct(occ, 1)}`,
        result: formatUsd(expected),
      },
    ],
    answerDisplay: formatUsd(expected),
  };
}

export const revparFromAdrOccTemplate: QuestionTemplate<'revparFromAdrOcc'> = {
  kind: 'revparFromAdrOcc',
  label: 'Hotel: RevPAR from ADR + Occupancy',
  description: 'Average daily rate + occupancy → revenue per available room.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement'],
  pattern: 'ADR × Occupancy',
  tips: [
    'RevPAR is the headline hotel-performance metric — it combines pricing and demand.',
    'High ADR + low occupancy ≠ high RevPAR. The product matters; either lever alone is insufficient.',
    'Comp benchmarks come via STR (Smith Travel) reports — your RevPAR vs comp set is the operating-quality signal.',
    'Mental math: $200 ADR × 70% occ = $140 RevPAR. Run it backward: $150 RevPAR ÷ 80% occ ≈ $188 ADR.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const adrStep = difficulty === 'beginner' ? 25 : difficulty === 'advanced' ? 1 : 5;
    const adr = Math.round(rng.pickRange(120, 360) / adrStep) * adrStep;
    const occ = rng.pickFromSet([0.55, 0.6, 0.65, 0.7, 0.72, 0.75, 0.78, 0.82, 0.85, 0.88] as const);
    const expected = adr * occ;

    return {
      id: nextId('revpar'),
      kind: 'revparFromAdrOcc',
      prompt: `A 240-room limited-service hotel runs at ${formatUsd(adr)} ADR and ${formatPct(occ, 0)} occupancy. What\'s the property\'s RevPAR?`,
      context: { adr, roomsAvailable: 240 },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(adr, occ, expected),
    };
  },
};
