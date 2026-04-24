import { noiFromOer } from '../../math/growth';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { classOpexRatios } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(egi: number, ratio: number): Solution {
  const opex = egi * ratio;
  const noi = noiFromOer(egi, ratio);
  return {
    formula: 'NOI = EGI × (1 − OpEx Ratio)',
    steps: [
      {
        label: 'OpEx',
        expression: `${formatUsd(egi)} × ${formatPct(ratio)}`,
        result: formatUsd(opex),
      },
      {
        label: 'NOI',
        expression: `${formatUsd(egi)} − ${formatUsd(opex)}`,
        result: formatUsd(noi),
      },
    ],
    answerDisplay: formatUsd(noi),
  };
}

export const noiFromOerTemplate: QuestionTemplate<'noiFromOer'> = {
  kind: 'noiFromOer',
  label: 'NOI from OpEx Ratio',
  description: 'Solve NOI given EGI and an OpEx ratio.',
  category: 'valuation',
  pattern: 'A × (1 − B)   where A = EGI, B = opex ratio',
  tips: [
    'NOI = EGI × (1 − opex ratio). 40% opex ratio → NOI = 60% of EGI.',
    'Shortcut: skip the subtraction — just multiply by the margin. $1M EGI × 60% margin = $600k NOI.',
    'Combine with cap math: Value = EGI × (1 − opex) / cap. $1M × 60% / 6% = $10M in one shot.',
    'Back out: if comps show $10M at 6% cap, implied NOI is $600k, implied EGI is $1M at 40% opex.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const egi = pickBand(rng, bands.egi, difficulty);
    const ratio = rng.pickFromSet(classOpexRatios(assetClass));
    const expected = noiFromOer(egi, ratio);

    return {
      id: nextId('noiFromOer'),
      kind: 'noiFromOer',
      prompt: `EGI is ${formatUsd(egi)} with an OpEx ratio of ${formatPct(ratio)}. What's the NOI?`,
      context: { egi, opexRatioValue: ratio },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(egi, ratio),
    };
  },
};
