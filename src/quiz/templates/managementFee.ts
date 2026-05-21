import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

const MGMT_FEE_RATES = [0.005, 0.0075, 0.01, 0.0125, 0.015, 0.02] as const;

function buildSolution(aum: number, feeRate: number, fee: number): Solution {
  return {
    formula: 'Management Fee = AUM × Annual Fee Rate',
    steps: [
      {
        label: 'Annual fee',
        expression: `${formatUsd(aum)} × ${formatPct(feeRate, 2)}`,
        result: formatUsd(fee),
      },
    ],
    answerDisplay: formatUsd(fee),
  };
}

export const managementFeeTemplate: QuestionTemplate<'managementFee'> = {
  kind: 'managementFee',
  label: 'Management Fee (AUM)',
  description: 'Annual asset management fee: AUM × annual fee rate.',
  category: 'returns',
  roles: ['portfolioMgmt', 'assetManagement'],
  pattern: 'fee = AUM × fee rate',
  tips: [
    'Typical REIT / open-end fund management fee: 0.50–1.00% of GAV (gross asset value). Closed-end PE funds charge 1.25–2.00% on committed capital during the investment period.',
    'Fee basis matters: committed capital vs. invested capital vs. GAV. Committed-capital fees in early years are higher since the fund hasn\'t yet deployed.',
    'Management fee is a fund-level expense that reduces LP net returns — it\'s not asset-level NOI. Track it separately when modeling fund-level vs. deal-level IRR.',
    'Fee step-downs are common: 1.5% during deployment, 1.0% during harvest. Always model the full fee schedule, not just the headline rate.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const aum = pickBand(rng, bands.aum, difficulty);
    const feeRate = rng.pickFromSet(MGMT_FEE_RATES);
    const fee = aum * feeRate;

    return {
      id: nextId('mgmt_fee'),
      kind: 'managementFee',
      prompt: `A real estate fund has ${formatUsd(aum)} in assets under management. The annual management fee is ${formatPct(feeRate, 2)}. What is the annual fee in dollars?`,
      context: { aum, feeRate },
      expected: fee,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.01 },
      solution: buildSolution(aum, feeRate, fee),
    };
  },
};
