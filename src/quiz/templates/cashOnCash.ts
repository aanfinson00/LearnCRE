import { annualDebtService, cashOnCash } from '../../math/debt';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(params: {
  noi: number;
  price: number;
  ltv: number;
  rate: number;
  years: number;
}): Solution {
  const loan = params.price * params.ltv;
  const equity = params.price - loan;
  const ds = annualDebtService(loan, params.rate, params.years);
  const cf = params.noi - ds;
  const coc = cashOnCash({ noi: params.noi, debtServiceAnnual: ds, equity });
  return {
    formula: 'CoC = (NOI − Annual Debt Service) / Equity Invested',
    steps: [
      {
        label: 'Loan',
        expression: `${formatUsd(params.price)} × ${formatPct(params.ltv)}`,
        result: formatUsd(loan),
      },
      {
        label: 'Equity',
        expression: `${formatUsd(params.price)} − ${formatUsd(loan)}`,
        result: formatUsd(equity),
      },
      {
        label: 'Annual debt service',
        expression: `${formatUsd(loan)} × constant(${params.years}yr @ ${formatPct(params.rate)})`,
        result: formatUsd(ds),
      },
      {
        label: 'Cash flow to equity',
        expression: `${formatUsd(params.noi)} − ${formatUsd(ds)}`,
        result: formatUsd(cf),
      },
      {
        label: 'Cash-on-cash',
        expression: `${formatUsd(cf)} / ${formatUsd(equity)}`,
        result: formatPct(coc, 2),
      },
    ],
    answerDisplay: formatPct(coc, 2),
  };
}

export const cashOnCashTemplate: QuestionTemplate<'cashOnCash'> = {
  kind: 'cashOnCash',
  label: 'Cash-on-Cash Return',
  description: 'Year-1 cash yield on equity invested.',
  category: 'returns',
  pattern: '(A − B) / C   where A = NOI, B = debt service, C = equity',
  tips: [
    'CoC = (NOI − Debt Service) / Equity. Unlevered = cap rate; levered adds or subtracts the spread on debt.',
    'IO shortcut: CoC = (cap − rate × LTV) / (1 − LTV). At 6% cap, 60% LTV, 5% rate → (6 − 3) / 40 = 7.5%.',
    'When cap > borrow rate, leverage lifts CoC. When cap < borrow, leverage drags it down (even negative).',
    'Quick check: at 1.25× DSCR, Year-1 CoC is usually 200–400 bps above cap rate for value-add.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const cap = pickBand(rng, classBand('capRate', assetClass), difficulty);
    const noi = pickBand(rng, bands.noi, difficulty);
    const priceStep = difficulty === 'beginner' ? 1_000_000 : difficulty === 'advanced' ? 50_000 : 250_000;
    const price = Math.round(noi / cap / priceStep) * priceStep;
    const ltv =
      difficulty === 'beginner'
        ? rng.pickFromSet([0.5, 0.6, 0.7] as const)
        : pickBand(rng, bands.ltv, difficulty);
    const rate = pickBand(rng, bands.interestRate, difficulty);
    const years = difficulty === 'beginner' ? 30 : rng.pickInt(bands.amortYears.min, bands.amortYears.max);
    const loan = price * ltv;
    const ds = annualDebtService(loan, rate, years);
    const equity = price - loan;
    const expected = cashOnCash({ noi, debtServiceAnnual: ds, equity });

    return {
      id: nextId('coc'),
      kind: 'cashOnCash',
      prompt: `${formatUsd(price)} property, ${formatUsd(noi)} NOI, ${formatPct(ltv)} LTV, ${formatPct(rate)} interest, ${years}-yr amort. What's the year-1 cash-on-cash return?`,
      context: {
        purchasePrice: price,
        noi,
        capRate: cap,
        ltv,
        interestRate: rate,
        amortYears: years,
        loanAmount: loan,
        debtServiceAnnual: ds,
        equityIn: equity,
      },
      expected,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.005 },
      solution: buildSolution({ noi, price, ltv, rate, years }),
    };
  },
};
