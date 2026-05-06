import { formatPct } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

const FEE_RATES = [0.01, 0.0125, 0.015, 0.0175, 0.02] as const;

function buildSolution(
  irrDeal: number,
  feeRate: number,
  years: number,
  lpIrr: number,
): Solution {
  const grossEm = Math.pow(1 + irrDeal, years);
  const cumulativeFees = feeRate * years;
  const netEm = grossEm - cumulativeFees;
  return {
    formula:
      'Net EM = (1 + IRR_deal)^N − fee × N;  LP IRR = Net EM^(1/N) − 1',
    steps: [
      {
        label: 'Gross EM at hold',
        expression: `(1 + ${formatPct(irrDeal)})^${years}`,
        result: grossEm.toFixed(3),
      },
      {
        label: 'Cumulative fees / committed',
        expression: `${formatPct(feeRate, 2)} × ${years}`,
        result: cumulativeFees.toFixed(3),
      },
      {
        label: 'Net EM (deal EM − fees)',
        expression: `${grossEm.toFixed(3)} − ${cumulativeFees.toFixed(3)}`,
        result: netEm.toFixed(3),
      },
      {
        label: 'LP IRR',
        expression: `${netEm.toFixed(3)}^(1/${years}) − 1`,
        result: formatPct(lpIrr, 2),
      },
    ],
    answerDisplay: `${formatPct(lpIrr, 2)} (drag ${((irrDeal - lpIrr) * 10_000).toFixed(0)} bps)`,
  };
}

export const feeDragOnIrrTemplate: QuestionTemplate<'feeDragOnIrr'> = {
  kind: 'feeDragOnIrr',
  label: 'LP Fee Drag on IRR',
  description:
    'Closed-end fund management fee converts deal-level IRR into LP-net IRR — what does the LP actually clear?',
  category: 'returns',
  roles: ['portfolioMgmt', 'acquisitions'],
  pattern: 'LP IRR = ((1+IRR_deal)^N − fee × N)^(1/N) − 1',
  tips: [
    'Fee drag is the most-asked "fund-level vs deal-level IRR" reconciliation in interviews. Common drag: 100-200 bps over a 5-7 yr hold.',
    'A 1.5% mgmt fee on committed capital over 7 years pulls ~10 EM points out of gross — at a 1.6x deal EM, LP nets ~1.5x. IRR drops ~150-200 bps.',
    'Watch the base — fees on committed (full life) drag more than fees on invested (only when deployed).',
    'Carry comes off the top of profits separately — this template models fees only. Add carry when the deal hurdle clears and the GP starts taking promote.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const irrDeal = pickBand(rng, bands.unleveredIrr, difficulty);
    const feeRate = rng.pickFromSet(FEE_RATES);
    const years = pickBand(rng, bands.holdYears, difficulty);
    const grossEm = Math.pow(1 + irrDeal, years);
    const netEm = grossEm - feeRate * years;
    const lpIrr = Math.pow(Math.max(netEm, 0.01), 1 / years) - 1;

    return {
      id: nextId('fee_drag'),
      kind: 'feeDragOnIrr',
      prompt: `Closed-end fund. Deal-level IRR is ${formatPct(irrDeal)} over a ${years}-yr hold; mgmt fee is ${formatPct(feeRate, 2)}/yr on committed capital. What's the LP-net IRR after fees?`,
      context: {
        unleveredIrr: irrDeal,
        feeRate,
        holdYears: years,
      },
      expected: lpIrr,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.005 },
      solution: buildSolution(irrDeal, feeRate, years, lpIrr),
    };
  },
};
