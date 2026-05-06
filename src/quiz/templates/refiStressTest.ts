import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(
  loan: number,
  noi: number,
  ltv: number,
  capStress: number,
): Solution {
  const newValue = noi / capStress;
  const maxLoan = ltv * newValue;
  return {
    formula: 'cap_stress = LTV × NOI / existing_loan',
    steps: [
      {
        label: 'Refi constraint',
        expression: `${formatPct(ltv, 0)} × NOI ÷ cap_stress = existing loan`,
        result: 'solve for cap_stress',
      },
      {
        label: 'Rearrange',
        expression: `${formatPct(ltv, 0)} × ${formatUsd(noi)} / ${formatUsd(loan)}`,
        result: formatPct(capStress, 2),
      },
      {
        label: 'Sanity check',
        expression: `value @ stress = NOI / ${formatPct(capStress, 2)}`,
        result: `${formatUsd(newValue)}; max loan @ LTV = ${formatUsd(maxLoan)}`,
      },
    ],
    answerDisplay: formatPct(capStress, 2),
  };
}

export const refiStressTestTemplate: QuestionTemplate<'refiStressTest'> = {
  kind: 'refiStressTest',
  label: 'Refi Stress Cap',
  description:
    'What stressed cap rate at maturity just defends a no-cash-in refi at the lender LTV?',
  category: 'returns',
  roles: ['mortgageUw', 'portfolioMgmt'],
  pattern: 'cap_stress = LTV × NOI / existing_loan',
  tips: [
    'The stressed cap is the cap that *just* makes the refi work — anything higher (lower value) and the sponsor must pay down or recapitalize.',
    'Life cos and debt funds run this on every senior loan in their book quarterly. The wider the gap between today\'s cap and your stressed cap, the more refi-resilient the loan.',
    'A 5% stressed cap rate = a 60–100 bps cushion above today\'s 4-4.5% caps in most majors. Tight stack = tight cushion.',
    'When the stressed cap forces a paydown, the levers are: equity check, mezz, or extension with a paydown waterfall.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const noi = pickBand(rng, bands.noi, difficulty);
    const ltv = pickBand(rng, bands.ltv, difficulty);
    // Existing loan ranges around 8-12x NOI (so cap_stress lands in 5-9% band).
    const loanMultiple =
      difficulty === 'beginner'
        ? rng.pickRange(10, 14, { step: 0.5 })
        : difficulty === 'intermediate'
          ? rng.pickRange(8, 13, { step: 0.5 })
          : rng.pickRange(6, 12, { step: 0.5 });
    const loan = Math.round((noi * loanMultiple) / 250_000) * 250_000;
    const capStress = (ltv * noi) / loan;

    return {
      id: nextId('refi_stress'),
      kind: 'refiStressTest',
      prompt: `Loan matures with ${formatUsd(loan)} balance and ${formatUsd(noi)} of NOI. Refi lender will go to ${formatPct(ltv, 0)} LTV. What's the stressed cap rate that just defends a no-cash-in refi?`,
      context: {
        loanAmount: loan,
        noi,
        ltv,
      },
      expected: capStress,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.0025 },
      solution: buildSolution(loan, noi, ltv, capStress),
    };
  },
};
