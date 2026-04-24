import { maxLoanByDebtYield } from '../../math/debt';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(noi: number, target: number): Solution {
  const loan = maxLoanByDebtYield(noi, target);
  return {
    formula: 'Max Loan = NOI / Debt Yield',
    steps: [
      {
        label: 'Max loan',
        expression: `${formatUsd(noi)} / ${formatPct(target)}`,
        result: formatUsd(loan),
      },
    ],
    answerDisplay: formatUsd(loan),
  };
}

export const debtYieldTemplate: QuestionTemplate<'debtYield'> = {
  kind: 'debtYield',
  label: 'Debt Yield Loan Sizing',
  description: 'Max loan given NOI and required debt yield.',
  category: 'returns',
  tips: [
    'Debt yield is the lender-side cap rate: NOI / Loan. 9% DY = 11.1x NOI max loan; 10% DY = 10x NOI.',
    'Inverse: Max Loan = NOI / required DY.',
    'Lender check: if debt yield < 8%, most CMBS lenders pass — so 8% is a hard floor for stabilized deals.',
    'Quick math: $800k NOI / 9% → think $800k × 11.11 = $8.89M. Or: $800 / 0.09 = ~$8,890 (shift decimals).',
  ],
  generate(rng, difficulty = 'intermediate') {
    const noi = pickBand(rng, bands.noi, difficulty);
    const target = pickBand(rng, bands.debtYieldTarget, difficulty);
    const expected = maxLoanByDebtYield(noi, target);

    return {
      id: nextId('dy'),
      kind: 'debtYield',
      prompt: `NOI is ${formatUsd(noi)}. Lender requires a ${formatPct(target)} debt yield. What's the max loan?`,
      context: { noi, debtYieldTarget: target },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(noi, target),
    };
  },
};
