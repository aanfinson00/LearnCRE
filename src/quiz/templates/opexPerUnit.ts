import { perUnit } from '../../math/growth';
import { formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(opex: number, units: number): Solution {
  const perU = perUnit(opex, units);
  return {
    formula: 'OpEx/Unit = Total OpEx / Units',
    steps: [
      {
        label: 'OpEx per unit',
        expression: `${formatUsd(opex)} / ${units} units`,
        result: `${formatUsd(perU)}/yr`,
      },
    ],
    answerDisplay: `${formatUsd(perU)}/yr`,
  };
}

export const opexPerUnitTemplate: QuestionTemplate<'opexPerUnit'> = {
  kind: 'opexPerUnit',
  label: 'OpEx per Unit (annual)',
  description: 'Operating expense per unit per year.',
  category: 'valuation',
  roles: ['acquisitions'],
  pattern: 'A / B   where A = opex, B = units',
  tips: [
    'Typical multifamily range: $4,500–$8,500/unit/yr. Hotels 3–5× higher.',
    'Outliers point to market deviation — high-tax states, sub-metered utilities, age of plant.',
    'Fixed + variable split: ~60% fixed (taxes, insurance, admin) / ~40% variable (utilities, repairs).',
    'Shortcut: $600k opex / 100 units = $6,000/unit. Scale linearly.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const units = pickBand(rng, classBand('units', assetClass), difficulty);
    const targetAnnual = pickBand(rng, classBand('opexPerUnitYear', assetClass), difficulty);
    const opexStep = difficulty === 'beginner' ? 50_000 : difficulty === 'advanced' ? 2_500 : 10_000;
    const opex = Math.round((units * targetAnnual) / opexStep) * opexStep;
    const expected = perUnit(opex, units);

    return {
      id: nextId('opu'),
      kind: 'opexPerUnit',
      prompt: `A ${units}-unit property has ${formatUsd(opex)} in annual operating expenses. What's the OpEx per unit per year?`,
      context: { opex, units },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(opex, units),
    };
  },
};
