import { reversionValue } from '../../math/growth';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(noi: number, cap: number): Solution {
  const v = reversionValue(noi, cap);
  return {
    formula: 'Exit Value = Year-N NOI / Exit Cap',
    steps: [
      {
        label: 'Exit value',
        expression: `${formatUsd(noi)} / ${formatPct(cap)}`,
        result: formatUsd(v),
      },
    ],
    answerDisplay: formatUsd(v),
  };
}

export const reversionValueTemplate: QuestionTemplate<'reversionValue'> = {
  kind: 'reversionValue',
  label: 'Reversion / Exit Value',
  description: 'Sale price at exit given year-N NOI and exit cap.',
  category: 'valuation',
  roles: ['acquisitions'],
  pattern: 'A / B   where A = exit NOI, B = exit cap',
  tips: [
    'Same math as going-in cap, just for the exit. Use the cap → multiple table.',
    'Exit cap usually expands 25–75 bps vs going-in to reflect aging/obsolescence.',
    'If your buy cap is 5% and exit cap is 5.5%, you lose (5/5.5 − 1) = −9.1% of value on that alone.',
    'Shortcut: $1M NOI at 6% exit cap = $16.67M. Scale linearly with NOI.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const noi = pickBand(rng, bands.noi, difficulty);
    const cap = pickBand(rng, classBand('exitCapRate', assetClass), difficulty);
    const years = rng.pickInt(5, 10);
    const expected = reversionValue(noi, cap);

    return {
      id: nextId('rev'),
      kind: 'reversionValue',
      prompt: `Year-${years} NOI is ${formatUsd(noi)} and you're underwriting a ${formatPct(cap)} exit cap. What's the exit sale price?`,
      context: { stabilizedNoi: noi, noi, exitCap: cap, holdYears: years },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(noi, cap),
    };
  },
};
