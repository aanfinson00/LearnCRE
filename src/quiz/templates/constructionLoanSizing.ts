import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

const LTC_OPTIONS = [0.55, 0.6, 0.625, 0.65, 0.675, 0.7, 0.725, 0.75] as const;

function buildSolution(
  totalProjectCost: number,
  ltc: number,
  loan: number,
  equityCheck: number,
): Solution {
  return {
    formula: 'Loan = LTC × TPC;  Equity check = TPC − loan = TPC × (1 − LTC)',
    steps: [
      {
        label: 'Max construction loan',
        expression: `${formatUsd(totalProjectCost)} × ${formatPct(ltc, 1)}`,
        result: formatUsd(loan),
      },
      {
        label: 'Equity check (sponsor + LP fund)',
        expression: `${formatUsd(totalProjectCost)} − ${formatUsd(loan)}`,
        result: formatUsd(equityCheck),
      },
      {
        label: 'Equity-to-cost (sanity check)',
        expression: `1 − ${formatPct(ltc, 1)}`,
        result: formatPct(1 - ltc, 1),
      },
    ],
    answerDisplay: formatUsd(equityCheck),
  };
}

export const constructionLoanSizingTemplate: QuestionTemplate<'constructionLoanSizing'> = {
  kind: 'constructionLoanSizing',
  label: 'Construction Loan Sizing',
  description:
    'Equity check on a ground-up dev given total project cost and the lender LTC.',
  category: 'returns',
  roles: ['development', 'mortgageUw'],
  pattern: 'equity = TPC × (1 − LTC)',
  tips: [
    'Construction loans are sized off LTC (loan-to-cost), not LTV — there is no value yet at draw start.',
    'Typical construction LTC: 60-70%. Higher LTC means lower equity but tighter draw constraints + recourse.',
    'Equity check is the sponsor + LP commitment together; the construction loan funds in draws over the build.',
    'At certificate of occupancy, the construction loan converts to (or is taken out by) a permanent loan sized off LTV-on-stabilized-value, which can be more or less than the LTC limit.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const totalProjectCost = pickBand(rng, bands.projectCost, difficulty);
    const ltc = rng.pickFromSet(LTC_OPTIONS);
    const loan = totalProjectCost * ltc;
    const equityCheck = totalProjectCost - loan;

    return {
      id: nextId('cl_size'),
      kind: 'constructionLoanSizing',
      prompt: `Ground-up dev: total project cost ${formatUsd(totalProjectCost)}, lender quotes ${formatPct(ltc, 1)} LTC. What's the equity check?`,
      context: {
        totalProjectCost,
        ltc,
      },
      expected: equityCheck,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(totalProjectCost, ltc, loan, equityCheck),
    };
  },
};
