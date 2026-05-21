import { maxLoanByLtv } from '../../math/debt';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(appraisedValue: number, ltv: number, maxLoan: number): Solution {
  return {
    formula: 'Max Loan = Appraised Value × LTV',
    steps: [
      {
        label: 'Max loan',
        expression: `${formatUsd(appraisedValue)} × ${formatPct(ltv, 1)}`,
        result: formatUsd(maxLoan),
      },
    ],
    answerDisplay: formatUsd(maxLoan),
  };
}

export const ltvLoanSizingTemplate: QuestionTemplate<'ltvLoanSizing'> = {
  kind: 'ltvLoanSizing',
  label: 'LTV Loan Sizing',
  description: 'Max loan from an LTV cap applied to the appraised value.',
  category: 'returns',
  roles: ['mortgageUw', 'acquisitions'],
  pattern: 'max loan = appraised value × LTV',
  tips: [
    'LTV is the simplest lender guardrail: loan never exceeds X% of what the property is worth today.',
    'CMBS typically caps at 65–75% LTV; agency (Freddie/Fannie) goes to 80%; bridge lenders push 75–80% on transitional. Construction lenders use LTC, not LTV.',
    'Binding constraint test: always size against DSCR *and* LTV; the smaller loan wins. In low-cap environments, DSCR often binds before LTV.',
    'Appraised value vs. purchase price: most lenders use the lower of the two ("as-is" appraisal) to prevent inflated LTV.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const appraisedValue = pickBand(rng, bands.purchasePrice, difficulty);
    const ltv = pickBand(rng, bands.ltv, difficulty);
    const maxLoan = maxLoanByLtv(appraisedValue, ltv);

    return {
      id: nextId('ltv'),
      kind: 'ltvLoanSizing',
      prompt: `Lender caps at ${formatPct(ltv, 1)} LTV. The property appraises at ${formatUsd(appraisedValue)}. What is the maximum loan?`,
      context: { purchasePrice: appraisedValue, ltv },
      expected: maxLoan,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.01 },
      solution: buildSolution(appraisedValue, ltv, maxLoan),
    };
  },
};
