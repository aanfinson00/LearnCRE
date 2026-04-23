import { requiredMultiple } from '../../math/returns';
import { formatMultiple, formatPct, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(irr: number, years: number): Solution {
  const em = requiredMultiple(irr, years);
  return {
    formula: 'Required Multiple = (1 + IRR)^years',
    steps: [
      {
        label: 'Required EM',
        expression: `(1 + ${formatPct(irr)})^${years}`,
        result: formatMultiple(em),
      },
    ],
    answerDisplay: formatMultiple(em),
  };
}

export const targetMultipleTemplate: QuestionTemplate<'targetMultiple'> = {
  kind: 'targetMultiple',
  label: 'Target Equity Multiple',
  description: 'Target IRR + years → required EM.',
  category: 'returns',
  generate(rng) {
    const irr = rng.pickFromSet([
      0.1, 0.12, 0.125, 0.14, 0.15, 0.17, 0.18, 0.2, 0.22, 0.25,
    ] as const);
    const years = rng.pickInt(3, 8);
    const expected = requiredMultiple(irr, years);

    return {
      id: nextId('tgtMult'),
      kind: 'targetMultiple',
      prompt: `What equity multiple do you need to hit a ${formatPct(irr, 1)} IRR over ${formatYears(years)}?`,
      context: { targetIrr: irr, holdYears: years },
      expected,
      unit: 'multiple',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(irr, years),
    };
  },
};
