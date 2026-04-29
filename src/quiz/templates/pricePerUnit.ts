import { perUnit } from '../../math/growth';
import { formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(price: number, units: number): Solution {
  const perU = perUnit(price, units);
  return {
    formula: 'Price/Unit = Purchase Price / Units',
    steps: [
      {
        label: 'Price per unit',
        expression: `${formatUsd(price)} / ${units} units`,
        result: formatUsd(perU),
      },
    ],
    answerDisplay: formatUsd(perU),
  };
}

export const pricePerUnitTemplate: QuestionTemplate<'pricePerUnit'> = {
  kind: 'pricePerUnit',
  label: 'Price per Unit ($/door)',
  description: 'Purchase price per unit (for multifamily, hotels).',
  category: 'valuation',
  roles: ['acquisitions'],
  pattern: 'A / B   where A = price, B = units',
  tips: [
    'Primary multifamily benchmark metric alongside cap rate. Typical B-class ranges $150k–$350k/unit.',
    'Coastal gateway markets push $400k+/unit; tertiary Sun Belt can be $100k–$180k.',
    'Compare to replacement cost/unit to gauge if you\'re buying below new-build economics.',
    'Shortcut: round both to 2 sig figs. $45M / 180 units → $45M / $180 → $250k/unit.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const units = pickBand(rng, classBand('units', assetClass), difficulty);
    const target = pickBand(rng, classBand('pricePerUnitValue', assetClass), difficulty);
    const priceStep = difficulty === 'beginner' ? 500_000 : difficulty === 'advanced' ? 25_000 : 100_000;
    const price = Math.round((units * target) / priceStep) * priceStep;
    const expected = perUnit(price, units);

    return {
      id: nextId('ppu'),
      kind: 'pricePerUnit',
      prompt: `A ${units}-unit property is under contract for ${formatUsd(price)}. What's the price per unit?`,
      context: { purchasePrice: price, units },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(price, units),
    };
  },
};
