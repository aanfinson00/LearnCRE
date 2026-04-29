import { yieldOnCost } from '../../math/basis';
import { formatBps, formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(noi: number, cost: number): Solution {
  const yoc = yieldOnCost(noi, cost);
  return {
    formula: 'YoC = Stabilized NOI / Total Project Cost',
    steps: [
      {
        label: 'Yield on cost',
        expression: `${formatUsd(noi)} / ${formatUsd(cost)}`,
        result: `${formatPct(yoc)}  (${formatBps(yoc)})`,
      },
    ],
    answerDisplay: formatBps(yoc),
  };
}

export const yieldOnCostTemplate: QuestionTemplate<'yieldOnCost'> = {
  kind: 'yieldOnCost',
  label: 'Yield on Cost',
  description: 'Stabilized NOI over total project cost.',
  category: 'valuation',
  roles: ['acquisitions', 'development'],
  pattern: 'A / B   where A = NOI, B = total cost',
  tips: [
    'YoC is the going-in cap rate replacement for development or value-add deals — it uses all-in cost, not price.',
    'Compare YoC to market cap to see development spread. 200–300 bps of spread is a typical target.',
    'Quick inversion: at 7.5% YoC, total cost is 13.3× stabilized NOI.',
    'Sandwich: round cost to nearest $10M, NOI to nearest $500k, bracket the ratio against clean caps.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const cost = pickBand(rng, bands.projectCost, difficulty);
    const targetYoc = pickBand(rng, { min: 0.055, max: 0.095, step: 0.0025 }, difficulty);
    const noiStep = difficulty === 'beginner' ? 250_000 : difficulty === 'advanced' ? 25_000 : 100_000;
    const noi = Math.round((cost * targetYoc) / noiStep) * noiStep;
    const actualYoc = yieldOnCost(noi, cost);
    const expectedBps = Math.round(actualYoc * 10_000);

    return {
      id: nextId('yoc'),
      kind: 'yieldOnCost',
      prompt: `Total project cost is ${formatUsd(cost)} and stabilized NOI is ${formatUsd(noi)}. What's the yield on cost (in bps)?`,
      context: { totalProjectCost: cost, stabilizedNoi: noi, noi },
      expected: expectedBps,
      unit: 'bps',
      tolerance: { type: 'abs', band: 15 },
      solution: buildSolution(noi, cost),
    };
  },
};
