import { interestOnlyPayment } from '../../math/debt';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(loanAmount: number, rate: number, payment: number): Solution {
  return {
    formula: 'Annual IO Payment = Loan Amount × Interest Rate',
    steps: [
      {
        label: 'Annual debt service (IO)',
        expression: `${formatUsd(loanAmount)} × ${formatPct(rate)}`,
        result: formatUsd(payment),
      },
    ],
    answerDisplay: formatUsd(payment),
  };
}

export const ioAnnualPaymentTemplate: QuestionTemplate<'ioAnnualPayment'> = {
  kind: 'ioAnnualPayment',
  label: 'Interest-Only Annual Payment',
  description: 'Annual debt service on an interest-only loan: loan × rate.',
  category: 'returns',
  roles: ['mortgageUw', 'acquisitions', 'development'],
  pattern: 'annual IO = loan × rate',
  tips: [
    'IO loans have no principal paydown, so annual debt service = loan × rate only. This maximizes near-term cash flow but creates refinance / sale risk at maturity.',
    'Quick mental check: $10M at 6% IO = $600k/year ($50k/month). Scale linearly.',
    'DSCR on IO is higher than on amortizing at the same rate — lenders sometimes grant IO period only if DSCR at the amortizing test still passes.',
    'Construction loans are always IO (no amortization during build). Bridge loans are commonly IO; agency loans often require full amortization by year 1.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const loanAmount = pickBand(rng, bands.loanAmount, difficulty);
    const rate = pickBand(rng, bands.interestRate, difficulty);
    const payment = interestOnlyPayment(loanAmount, rate);

    return {
      id: nextId('io_pmt'),
      kind: 'ioAnnualPayment',
      prompt: `A ${formatUsd(loanAmount)} loan is structured as interest-only at ${formatPct(rate)} annual rate. What is the annual debt service?`,
      context: { loanAmount, interestRate: rate },
      expected: payment,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.01 },
      solution: buildSolution(loanAmount, rate, payment),
    };
  },
};
