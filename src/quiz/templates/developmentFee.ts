import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

const DEV_FEE_RATES = [0.02, 0.025, 0.03, 0.035, 0.04, 0.05] as const;

function buildSolution(hardCosts: number, softCosts: number, rate: number, fee: number): Solution {
  const combined = hardCosts + softCosts;
  return {
    formula: 'Development Fee = (Hard Costs + Soft Costs) × Fee Rate',
    steps: [
      {
        label: 'Combined hard + soft costs',
        expression: `${formatUsd(hardCosts)} + ${formatUsd(softCosts)}`,
        result: formatUsd(combined),
      },
      {
        label: 'Development fee',
        expression: `${formatUsd(combined)} × ${formatPct(rate, 1)}`,
        result: formatUsd(fee),
      },
    ],
    answerDisplay: formatUsd(fee),
  };
}

export const developmentFeeTemplate: QuestionTemplate<'developmentFee'> = {
  kind: 'developmentFee',
  label: 'Development Fee',
  description: 'Dollar fee a developer charges on combined hard and soft costs.',
  category: 'valuation',
  roles: ['development', 'acquisitions'],
  pattern: '(hard costs + soft costs) × fee rate',
  tips: [
    'Development fee (typically 2–5% of hard+soft costs, excluding land) is the developer\'s compensation for managing the project.',
    'LPs and lenders often push back on fees above 4% unless the developer brings unique expertise or significant capital.',
    'Fee is paid from the construction loan draws — it\'s a real cash outflow that reduces equity returns.',
    'Watch for stacked fees: development fee + asset management fee + acquisition fee can add 6–10% of cost to the GP\'s total take.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const round = difficulty === 'beginner' ? 1_000_000 : difficulty === 'advanced' ? 250_000 : 500_000;
    const hardCosts = Math.round(pickBand(rng, bands.projectCost, difficulty) * 0.65 / round) * round;
    const softCosts = Math.round(hardCosts * rng.pickRange(0.20, 0.35) / round) * round;
    const rate = rng.pickFromSet(DEV_FEE_RATES);
    const fee = (hardCosts + softCosts) * rate;

    return {
      id: nextId('dev_fee'),
      kind: 'developmentFee',
      prompt: `Hard costs are ${formatUsd(hardCosts)} and soft costs are ${formatUsd(softCosts)}. Developer charges a ${formatPct(rate, 1)} fee on combined hard and soft costs. What is the development fee?`,
      context: { hardCostBudget: hardCosts, totalBudget: hardCosts + softCosts, feeRate: rate },
      expected: fee,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.01 },
      solution: buildSolution(hardCosts, softCosts, rate, fee),
    };
  },
};
