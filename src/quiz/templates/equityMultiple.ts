import { equityMultiple } from '../../math/returns';
import { formatMultiple, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
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
  pattern: 'A / B   where A = out, B = in',
  tips: [
    'EM = Out / In. Doesn\'t care about time — 2x in 1 year and 2x in 10 years both = 2.0x.',
    'Divide by hundreds: $23M / $10M → 23/10 = 2.3x. $17.5M / $8M → 17.5/8 ≈ 2.19x.',
    'Rule of thumb: institutional value-add deals target 1.7x–2.0x; opportunistic 2.0x+; core ~1.4x–1.6x.',
    'Complement to IRR: EM shows absolute dollars back, IRR shows time-adjusted. Always look at both.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const equityIn = pickBand(rng, bands.equityIn, difficulty);
    const mult = pickBand(rng, bands.irrExitMultiple, difficulty);
    const outRound = difficulty === 'beginner' ? 1_000_000 : difficulty === 'advanced' ? 25_000 : 100_000;
    const equityOut = Math.round((equityIn * mult) / outRound) * outRound;
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
