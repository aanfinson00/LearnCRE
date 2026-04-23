import { equityMultiple } from '../../math/returns';
import { formatMultiple, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(equityIn: number, equityOut: number): Solution {
  const em = equityMultiple(equityIn, equityOut);
  return {
    formula: 'Equity Multiple = Equity Out / Equity In',
    steps: [
      {
        label: 'Multiple',
        expression: `${formatUsd(equityOut)} / ${formatUsd(equityIn)}`,
        result: formatMultiple(em),
      },
    ],
    answerDisplay: formatMultiple(em),
  };
}

export const equityMultipleTemplate: QuestionTemplate<'equityMultiple'> = {
  kind: 'equityMultiple',
  label: 'Equity Multiple',
  description: 'Equity in + equity out → EM.',
  category: 'returns',
  generate(rng) {
    const equityIn = rng.pickRange(2_000_000, 25_000_000, { step: 500_000 });
    const mult = rng.pickRange(1.2, 3.0, { step: 0.1 });
    const equityOut = Math.round((equityIn * mult) / 100_000) * 100_000;
    const expected = equityMultiple(equityIn, equityOut);

    return {
      id: nextId('em'),
      kind: 'equityMultiple',
      prompt: `You invested ${formatUsd(equityIn)} and received ${formatUsd(equityOut)} at sale. What's the equity multiple?`,
      context: { equityIn, equityOut },
      expected,
      unit: 'multiple',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(equityIn, equityOut),
    };
  },
};
