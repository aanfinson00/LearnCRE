import { perUnit } from '../../math/growth';
import { formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(gpr: number, units: number): Solution {
  const perU = perUnit(gpr, units);
  return {
    formula: 'Rent/Unit = GPR / Units',
    steps: [
      {
        label: 'Annual rent/unit',
        expression: `${formatUsd(gpr)} / ${units} units`,
        result: `${formatUsd(perU)}/yr`,
      },
      {
        label: 'Monthly rent/unit',
        expression: `${formatUsd(perU)} / 12`,
        result: `${formatUsd(perU / 12)}/mo`,
      },
    ],
    answerDisplay: `${formatUsd(perU)}/yr`,
  };
}

export const rentPerUnitTemplate: QuestionTemplate<'rentPerUnit'> = {
  kind: 'rentPerUnit',
  label: 'Rent per Unit (annual)',
  description: 'Gross potential rent per unit per year.',
  category: 'valuation',
  pattern: 'A / B   where A = GPR, B = units',
  tips: [
    'Divide by 12 for monthly. $24k/yr = $2,000/mo. $18k/yr = $1,500/mo.',
    'Market benchmark: compare to local comps — $1,500–$2,500/mo typical for B-class multifamily.',
    'If rent/unit looks way below comps, there\'s mark-to-market upside. Above comps, risk of tenant loss.',
    'Shortcut: round units to nearest 10 and GPR to nearest $100k first.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const units = pickBand(rng, classBand('units', assetClass), difficulty);
    const targetAnnual = pickBand(rng, classBand('rentPerUnitYear', assetClass), difficulty);
    const gprStep = difficulty === 'beginner' ? 100_000 : difficulty === 'advanced' ? 5_000 : 25_000;
    const gpr = Math.round((units * targetAnnual) / gprStep) * gprStep;
    const expected = perUnit(gpr, units);

    return {
      id: nextId('rpu'),
      kind: 'rentPerUnit',
      prompt: `A ${units}-unit property has ${formatUsd(gpr)} in annual gross potential rent. What's the rent per unit per year?`,
      context: { gpr, units },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(gpr, units),
    };
  },
};
