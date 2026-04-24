import { loanConstant, maxLoanByDscr } from '../../math/debt';
import { formatPct, formatUsd, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function formatMultiple2(x: number) {
  return `${x.toFixed(2)}x`;
}

function buildSolution(noi: number, dscrTarget: number, rate: number, years: number): Solution {
  const constant = loanConstant(rate, years);
  const annualDs = noi / dscrTarget;
  const loan = maxLoanByDscr({ noi, dscrTarget, annualRate: rate, years });
  return {
    formula: 'Max Loan = NOI / (DSCR × Loan Constant)',
    steps: [
      {
        label: 'Loan constant',
        expression: `${formatYears(years)} amort @ ${formatPct(rate)}`,
        result: formatPct(constant, 2),
      },
      {
        label: 'Max annual debt service',
        expression: `${formatUsd(noi)} / ${formatMultiple2(dscrTarget)}`,
        result: formatUsd(annualDs),
      },
      {
        label: 'Max loan',
        expression: `${formatUsd(annualDs)} / ${formatPct(constant, 2)}`,
        result: formatUsd(loan),
      },
    ],
    answerDisplay: formatUsd(loan),
  };
}

export const dscrLoanSizingTemplate: QuestionTemplate<'dscrLoanSizing'> = {
  kind: 'dscrLoanSizing',
  label: 'DSCR Loan Sizing',
  description: 'Max loan given NOI, DSCR target, rate, and amort.',
  category: 'returns',
  pattern: 'A / (B × C)   where A = NOI, B = DSCR, C = loan constant',
  tips: [
    'Loan constants to memorize — 30yr @ 6% ≈ 0.072; 25yr @ 6% ≈ 0.077; 30yr @ 5% ≈ 0.0644; 30yr @ 7% ≈ 0.0799.',
    'Formula: Max Loan = NOI / (DSCR × Loan Constant). DSCR × constant is the "effective rate" the loan must support.',
    'At 1.25x DSCR, every $1 of NOI supports $0.80 of debt service. Then divide by constant to get loan amount.',
    'IO shortcut: for interest-only loans, constant = rate. $500k NOI / (1.25 × 0.06) = $6.67M.',
  ],
  generate(rng, difficulty = 'intermediate') {
    const noi = pickBand(rng, bands.noi, difficulty);
    const dscrTarget =
      difficulty === 'beginner'
        ? rng.pickFromSet([1.2, 1.25, 1.3] as const)
        : pickBand(rng, bands.dscrTarget, difficulty);
    const rate = pickBand(rng, bands.interestRate, difficulty);
    const years = difficulty === 'beginner' ? 30 : rng.pickInt(bands.amortYears.min, bands.amortYears.max);
    const expected = maxLoanByDscr({ noi, dscrTarget, annualRate: rate, years });

    return {
      id: nextId('dscr'),
      kind: 'dscrLoanSizing',
      prompt: `NOI of ${formatUsd(noi)} needs to cover a ${formatMultiple2(dscrTarget)} DSCR on a ${formatYears(years)} amortizing loan at ${formatPct(rate)}. What's the max loan?`,
      context: { noi, dscrTarget, interestRate: rate, amortYears: years },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(noi, dscrTarget, rate, years),
    };
  },
};
