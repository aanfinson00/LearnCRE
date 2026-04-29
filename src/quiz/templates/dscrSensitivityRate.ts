import { annualDebtService, dscr } from '../../math/debt';
import { formatMultiple, formatPct, formatUsd, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(
  noi: number,
  loan: number,
  oldRate: number,
  newRate: number,
  amortYears: number,
): Solution {
  const oldDs = annualDebtService(loan, oldRate, amortYears);
  const newDs = annualDebtService(loan, newRate, amortYears);
  const oldDscr = dscr(noi, oldDs);
  const newDscr = dscr(noi, newDs);
  const delta = newDscr - oldDscr;
  return {
    formula: 'DS at rate r = loan × loanConstant(r, n);  DSCR = NOI / DS',
    steps: [
      {
        label: 'DS @ old rate',
        expression: `${formatUsd(loan)} @ ${formatPct(oldRate)} / ${formatYears(amortYears)}`,
        result: formatUsd(oldDs),
      },
      {
        label: 'DSCR @ old rate',
        expression: `${formatUsd(noi)} / ${formatUsd(oldDs)}`,
        result: formatMultiple(oldDscr),
      },
      {
        label: 'DS @ new rate',
        expression: `${formatUsd(loan)} @ ${formatPct(newRate)} / ${formatYears(amortYears)}`,
        result: formatUsd(newDs),
      },
      {
        label: 'New DSCR',
        expression: `${formatUsd(noi)} / ${formatUsd(newDs)}`,
        result: formatMultiple(newDscr),
      },
    ],
    answerDisplay: `${formatMultiple(newDscr)} (Δ ${delta >= 0 ? '+' : ''}${delta.toFixed(2)}x)`,
  };
}

export const dscrSensitivityRateTemplate: QuestionTemplate<'dscrSensitivityRate'> = {
  kind: 'dscrSensitivityRate',
  label: 'DSCR at New Rate',
  description: 'How does DSCR change when the rate moves on a fixed loan + NOI?',
  category: 'returns',
  roles: ['mortgageUw'],
  pattern: 'A / (B × loanConstant(rate, n))   compute the new DSCR',
  tips: [
    'A 100 bps rate move on a 30-yr loan changes the loan constant by ~70–90 bps. DSCR moves accordingly.',
    'Refi sensitivity is the #1 lender concern in a rising-rate environment — DSCR can flip from passing to failing on the same NOI.',
    'Quick mental: 6% → 7% on 30yr increases the constant from ~7.2% to ~8.0%. DS goes up ~11%; DSCR drops ~10%.',
    'When DSCR fails on rate-sensitivity, the levers are: lower LTV, longer amort, partial paydown, or sponsor recourse.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const noi = pickBand(rng, bands.noi, difficulty);
    const loan = pickBand(rng, bands.loanAmount, difficulty);
    const amortYears = rng.pickFromSet([25, 30] as const);
    const oldRate = pickBand(rng, bands.interestRate, difficulty);
    const direction = rng.pickFromSet([-1, 1] as const);
    const moveBps =
      difficulty === 'beginner'
        ? 100
        : difficulty === 'intermediate'
          ? rng.pickFromSet([50, 100, 150] as const)
          : rng.pickFromSet([25, 75, 125, 200] as const);
    const newRate = Math.max(0.02, Math.min(0.12, oldRate + (direction * moveBps) / 10_000));

    const newDs = annualDebtService(loan, newRate, amortYears);
    const expected = dscr(noi, newDs);

    return {
      id: nextId('dscr_sens'),
      kind: 'dscrSensitivityRate',
      prompt: `Loan of ${formatUsd(loan)} amortizing over ${formatYears(amortYears)} at ${formatPct(oldRate)}. NOI is ${formatUsd(noi)}. If the rate resets to ${formatPct(newRate)} (no change to loan or NOI), what's the new DSCR?`,
      context: {
        noi,
        loanAmount: loan,
        interestRate: newRate,
        amortYears,
      },
      expected,
      unit: 'multiple',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(noi, loan, oldRate, newRate, amortYears),
    };
  },
};
