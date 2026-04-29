import { egi, noi as computeNoi, value as computeValue } from '../math/core';
import { loanConstant, maxLoanByDscr } from '../math/debt';
import { formatPct, formatUsd, formatYears } from '../math/rounding';
import type { WalkthroughDef } from '../types/walkthrough';

function combinedScenarioWalk(): WalkthroughDef {
  // Hand-tuned realistic scenario
  const gpr = 4_500_000;
  const otherIncome = 250_000;
  const vacancy = 0.05;
  const opex = 1_900_000;
  const cap = 0.06;

  const gross = gpr + otherIncome;
  const egiVal = egi({ gpr, otherIncome, vacancyRate: vacancy });
  const noiVal = computeNoi({ gpr, otherIncome, vacancyRate: vacancy, opex });
  const value = computeValue(noiVal, cap);

  return {
    id: 'walk-combined-1',
    kind: 'combinedScenarioWalk',
    label: 'Combined Proforma — chained',
    description: 'Walk a full proforma from gross income to value, one step at a time.',
    context: {
      gpr,
      otherIncome,
      vacancyRate: vacancy,
      opex,
      capRate: cap,
    },
    setupNarrative: `You're underwriting an apartment building. GPR is ${formatUsd(gpr)}, other income is ${formatUsd(otherIncome)}, vacancy is ${formatPct(vacancy)}, OpEx is ${formatUsd(opex)}, and you're using a ${formatPct(cap)} cap rate. Walk it step by step.`,
    steps: [
      {
        id: 'gross',
        label: 'Step 1 — Gross income',
        prompt: 'What\'s the gross income (GPR + other income, before vacancy)?',
        expected: gross,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Just GPR + Other.',
        resultDescription: `${formatUsd(gpr)} + ${formatUsd(otherIncome)} = ${formatUsd(gross)}.`,
      },
      {
        id: 'egi',
        label: 'Step 2 — Effective gross income',
        prompt: `Apply ${formatPct(vacancy)} vacancy. What's EGI?`,
        expected: egiVal,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'Gross × (1 − vacancy).',
        resultDescription: `${formatUsd(gross)} × (1 − ${formatPct(vacancy)}) = ${formatUsd(egiVal)}.`,
      },
      {
        id: 'noi',
        label: 'Step 3 — Net operating income',
        prompt: 'Subtract OpEx. What\'s NOI?',
        expected: noiVal,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'EGI − OpEx.',
        resultDescription: `${formatUsd(egiVal)} − ${formatUsd(opex)} = ${formatUsd(noiVal)}.`,
      },
      {
        id: 'value',
        label: 'Step 4 — Implied value',
        prompt: `At a ${formatPct(cap)} cap, what's the implied value?`,
        expected: value,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI / cap.',
        resultDescription: `${formatUsd(noiVal)} / ${formatPct(cap)} = ${formatUsd(value)}.`,
      },
    ],
    takeaway:
      'Each line of a proforma is a single arithmetic step. Chaining them is the whole valuation. Master each step in isolation and the full proforma collapses to one expression: ((GPR + Other) × (1 − vac) − OpEx) / cap.',
    roles: ['acquisitions'],
  };
}

function dscrLoanSizingWalk(): WalkthroughDef {
  // Realistic deal
  const noi = 750_000;
  const dscr = 1.25;
  const rate = 0.06;
  const years = 30;

  const constant = loanConstant(rate, years);
  const annualDsAllowance = noi / dscr;
  const maxLoan = maxLoanByDscr({ noi, dscrTarget: dscr, annualRate: rate, years });

  return {
    id: 'walk-dscr-1',
    kind: 'dscrLoanSizingWalk',
    label: 'DSCR Loan Sizing — chained',
    description: 'Decompose lender sizing into the constant, the DS allowance, and the loan.',
    context: {
      noi,
      dscrTarget: dscr,
      interestRate: rate,
      amortYears: years,
    },
    setupNarrative: `Your stabilized NOI is ${formatUsd(noi)}. Your lender requires a ${dscr.toFixed(2)}× DSCR on a ${formatYears(years)} amortizing loan at ${formatPct(rate)}. Size the loan in three steps.`,
    steps: [
      {
        id: 'constant',
        label: 'Step 1 — Loan constant',
        prompt: `What's the loan constant for a ${formatYears(years)} amortizing loan at ${formatPct(rate)}? (answer in bps)`,
        expected: Math.round(constant * 10_000),
        unit: 'bps',
        tolerance: { type: 'abs', band: 15 },
        hint: '30yr @ 6% ≈ 720 bps. Memorize a few — it\'s the bridge from rate to debt service.',
        resultDescription: `${formatYears(years)} amort @ ${formatPct(rate)} → loan constant ≈ ${(constant * 10_000).toFixed(0)} bps.`,
      },
      {
        id: 'allowance',
        label: 'Step 2 — Max annual debt service',
        prompt: `At ${dscr.toFixed(2)}× DSCR, what's the max annual debt service NOI can cover?`,
        expected: annualDsAllowance,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.02 },
        hint: 'NOI / DSCR. Every $1 of NOI supports $1/DSCR of debt service.',
        resultDescription: `${formatUsd(noi)} / ${dscr.toFixed(2)} = ${formatUsd(annualDsAllowance)} max DS.`,
      },
      {
        id: 'loan',
        label: 'Step 3 — Max loan amount',
        prompt: 'Convert that DS allowance into a loan amount. What\'s the max loan?',
        expected: maxLoan,
        unit: 'usd',
        tolerance: { type: 'pct', band: 0.03 },
        hint: 'Max DS / loan constant.',
        resultDescription: `${formatUsd(annualDsAllowance)} / ${(constant * 100).toFixed(2)}% ≈ ${formatUsd(maxLoan)}.`,
      },
    ],
    takeaway:
      'DSCR sizing is just three divisions. NOI / DSCR gives you the DS allowance; DS / constant gives you the loan. Memorize the loan constants for 4–8% / 25–30y and you can size any deal in your head.',
    roles: ['mortgageUw', 'acquisitions'],
  };
}

export const walkthroughs: WalkthroughDef[] = [
  combinedScenarioWalk(),
  dscrLoanSizingWalk(),
];

export function getWalkthroughById(id: string): WalkthroughDef | undefined {
  return walkthroughs.find((w) => w.id === id);
}
