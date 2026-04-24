import { operatingExpenseRatio } from '../../math/growth';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { classOpexRatios } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(opex: number, egi: number): Solution {
  const r = operatingExpenseRatio(opex, egi);
  return {
    formula: 'OpEx Ratio = OpEx / EGI',
    steps: [
      {
        label: 'Ratio',
        expression: `${formatUsd(opex)} / ${formatUsd(egi)}`,
        result: formatPct(r, 1),
      },
    ],
    answerDisplay: formatPct(r, 1),
  };
}

export const operatingExpenseRatioTemplate: QuestionTemplate<'operatingExpenseRatio'> = {
  kind: 'operatingExpenseRatio',
  label: 'OpEx Ratio',
  description: 'OpEx / EGI — what % of income goes to operating expenses.',
  category: 'valuation',
  pattern: 'A / B   where A = opex, B = EGI',
  tips: [
    'Typical ranges — multifamily 30–40%, office 35–45%, retail 25–35%, industrial 15–25%, hotels 60%+.',
    'A rising OpEx ratio with flat income is a red flag — margin compression.',
    'Inverse: NOI margin = 1 − OpEx ratio. A 60% OpEx ratio means 40% of EGI drops to NOI.',
    'Shortcut: divide both to 2 sig figs first. $425k / $1.12M ≈ $430 / $1,120 ≈ 38%.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const egi = pickBand(rng, bands.egi, difficulty);
    const targetRatio = rng.pickFromSet(classOpexRatios(assetClass));
    const opexStep = difficulty === 'beginner' ? 50_000 : difficulty === 'advanced' ? 5_000 : 25_000;
    const opex = Math.round((egi * targetRatio) / opexStep) * opexStep;
    const expected = operatingExpenseRatio(opex, egi);

    return {
      id: nextId('oer'),
      kind: 'operatingExpenseRatio',
      prompt: `EGI is ${formatUsd(egi)} and operating expenses are ${formatUsd(opex)}. What's the OpEx ratio?`,
      context: { egi, opex },
      expected,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.015 },
      solution: buildSolution(opex, egi),
    };
  },
};
