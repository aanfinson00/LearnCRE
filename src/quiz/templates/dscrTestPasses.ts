import { annualDebtService, dscr } from '../../math/debt';
import { formatMultiple, formatPct, formatUsd, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(
  noi: number,
  loan: number,
  rate: number,
  years: number,
  threshold: number,
): Solution {
  const ds = annualDebtService(loan, rate, years);
  const ratio = dscr(noi, ds);
  const passes = ratio >= threshold;
  const headroom = ds * (ratio / threshold - 1);
  return {
    formula: 'DSCR = NOI / DS;  pass when DSCR ≥ threshold',
    steps: [
      {
        label: 'Annual debt service',
        expression: `${formatUsd(loan)} @ ${formatPct(rate)} / ${formatYears(years)}`,
        result: formatUsd(ds),
      },
      {
        label: 'DSCR',
        expression: `${formatUsd(noi)} / ${formatUsd(ds)}`,
        result: formatMultiple(ratio),
      },
      {
        label: passes ? 'Headroom (NOI cushion)' : 'Shortfall',
        expression: passes
          ? `(${formatMultiple(ratio)} − ${formatMultiple(threshold)}) × DS`
          : `(${formatMultiple(threshold)} − ${formatMultiple(ratio)}) × DS`,
        result: formatUsd(Math.abs(headroom)),
      },
    ],
    answerDisplay: passes
      ? `Pass — ${formatUsd(headroom)} headroom`
      : `Fail — ${formatUsd(Math.abs(headroom))} short`,
  };
}

export const dscrTestPassesTemplate: QuestionTemplate<'dscrTestPasses'> = {
  kind: 'dscrTestPasses',
  label: 'DSCR Test — Headroom or Shortfall',
  description:
    'Given NOI, loan terms, and a DSCR threshold, how much NOI cushion (or shortfall) does the loan have?',
  category: 'returns',
  roles: ['mortgageUw', 'acquisitions'],
  pattern: '(DSCR / threshold − 1) × DS   = NOI headroom',
  tips: [
    'Headroom = (actual DSCR / threshold − 1) × DS. Negative headroom = NOI shortfall.',
    'Lender comfort: 10–20% headroom is healthy; <5% is a tight test that won\'t survive a small NOI miss.',
    'Quick math: 1.30x actual vs 1.20x threshold = 8.3% cushion. On $1M DS that\'s $83k of NOI room.',
    'When the answer is negative, the deal needs a smaller loan, longer amort, or a paydown to clear.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const noi = pickBand(rng, bands.noi, difficulty);
    const loan = pickBand(rng, bands.loanAmount, difficulty);
    const years = rng.pickFromSet([25, 30] as const);
    const rate = pickBand(rng, bands.interestRate, difficulty);
    const threshold = rng.pickFromSet([1.2, 1.25, 1.3] as const);

    const ds = annualDebtService(loan, rate, years);
    const ratio = dscr(noi, ds);
    const headroom = ds * (ratio / threshold - 1);

    return {
      id: nextId('dscr_test'),
      kind: 'dscrTestPasses',
      prompt: `NOI ${formatUsd(noi)}; loan ${formatUsd(loan)} at ${formatPct(rate)} amortizing over ${formatYears(years)}; lender DSCR threshold is ${formatMultiple(threshold)}. What's the NOI headroom (positive) or shortfall (negative)?`,
      context: {
        noi,
        loanAmount: loan,
        interestRate: rate,
        amortYears: years,
        dscrTarget: threshold,
        debtServiceAnnual: ds,
      },
      expected: headroom,
      unit: 'usdChange',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(noi, loan, rate, years, threshold),
    };
  },
};
