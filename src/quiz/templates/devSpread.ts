import { developmentSpread, yieldOnCost } from '../../math/basis';
import { formatBps, formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(noi: number, cost: number, marketCap: number): Solution {
  const yoc = yieldOnCost(noi, cost);
  const spread = developmentSpread(yoc, marketCap);
  return {
    formula: 'Development Spread = YoC − Market Cap Rate',
    steps: [
      {
        label: 'YoC',
        expression: `${formatUsd(noi)} / ${formatUsd(cost)}`,
        result: formatPct(yoc),
      },
      {
        label: 'Spread',
        expression: `${formatPct(yoc)} − ${formatPct(marketCap)}`,
        result: `${formatBps(spread)}`,
      },
    ],
    answerDisplay: formatBps(spread),
  };
}

export const devSpreadTemplate: QuestionTemplate<'devSpread'> = {
  kind: 'devSpread',
  label: 'Development Spread',
  description: 'YoC minus market cap — the risk premium for developing vs buying.',
  category: 'valuation',
  pattern: '(A / B) − C   [YoC minus market cap]',
  tips: [
    '100–150 bps is thin, 200–300 bps is typical, 500+ bps is a "layup" development.',
    'If YoC ≈ market cap, you\'re taking development risk for no extra return — walk away.',
    'Spread compensates for construction risk, lease-up risk, and time value of capital tied up during build.',
    'Mental math: compute YoC first, then subtract market cap. Answer in bps.',
  ],
  generate(rng, difficulty = 'intermediate') {
    const marketCap = pickBand(rng, bands.capRate, difficulty);
    const spreadTarget = pickBand(rng, bands.yocDelta, difficulty);
    const yocTarget = marketCap + spreadTarget;
    const cost = pickBand(rng, bands.projectCost, difficulty);
    const noiStep = difficulty === 'beginner' ? 250_000 : difficulty === 'advanced' ? 25_000 : 100_000;
    const noi = Math.round((cost * yocTarget) / noiStep) * noiStep;
    const actualSpread = developmentSpread(yieldOnCost(noi, cost), marketCap);
    const expectedBps = Math.round(actualSpread * 10_000);

    return {
      id: nextId('devSp'),
      kind: 'devSpread',
      prompt: `Developing to ${formatUsd(cost)} in total cost with stabilized NOI of ${formatUsd(noi)}. Market comps trade at a ${formatPct(marketCap)} cap. What's the development spread (in bps)?`,
      context: { totalProjectCost: cost, stabilizedNoi: noi, noi, marketCapRate: marketCap },
      expected: expectedBps,
      unit: 'bps',
      tolerance: { type: 'abs', band: 25 },
      solution: buildSolution(noi, cost, marketCap),
    };
  },
};
