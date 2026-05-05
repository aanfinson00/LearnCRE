import { gpEffectivePromote } from '../../math/waterfall';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(args: {
  gpTake: number;
  gpCapital: number;
  totalCap: number;
  totalProfit: number;
  proRata: number;
  expected: number;
}): Solution {
  const { gpTake, gpCapital, totalCap, totalProfit, proRata, expected } = args;
  return {
    formula: 'GP promote = GP profit dollars − pro-rata share of total profit',
    steps: [
      {
        label: 'GP profit dollars',
        expression: `${formatUsd(gpTake)} − ${formatUsd(gpCapital)}`,
        result: formatUsd(gpTake - gpCapital),
      },
      {
        label: 'GP pro-rata share',
        expression: `(${formatUsd(gpCapital)} / ${formatUsd(totalCap)}) × ${formatUsd(totalProfit)}`,
        result: formatUsd(proRata),
      },
      {
        label: 'Promote',
        expression: `${formatUsd(gpTake - gpCapital)} − ${formatUsd(proRata)}`,
        result: formatUsd(expected),
      },
    ],
    answerDisplay: formatUsd(expected),
  };
}

export const gpEffectivePromoteTemplate: QuestionTemplate<'gpEffectivePromote'> = {
  kind: 'gpEffectivePromote',
  label: 'GP Effective Promote',
  description: 'GP take + capital % + total profit → promote dollars beyond pro-rata.',
  category: 'returns',
  roles: ['portfolioMgmt', 'acquisitions', 'mortgageUw'],
  pattern: '(GP take − cap) − GP cap% × total profit',
  tips: [
    'Promote = the dollars GP earns beyond their fair share of capital.',
    'A GP with 10% co-invest taking 30% of total profit has earned 20% as "promote" — that\'s the carry.',
    'Use this to sanity-check the waterfall: if promote is < 5% of total profit, the deal didn\'t clear the pref.',
    'Promote on a deal that just barely clears pref can still be small in dollars even with steep splits.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const lpCapital = rng.pickFromSet([
      10_000_000, 15_000_000, 20_000_000, 25_000_000, 40_000_000,
    ]);
    const gpCapPct = rng.pickFromSet([0.05, 0.075, 0.10, 0.125, 0.15]);
    const gpCapital = Math.round((lpCapital * gpCapPct) / (1 - gpCapPct));
    const totalCap = lpCapital + gpCapital;
    // Multiple of capital returned (1.5×–2.5×)
    const mult = rng.pickFromSet([1.5, 1.75, 2.0, 2.25, 2.5]);
    const totalDistributable = Math.round(totalCap * mult);
    const totalProfit = totalDistributable - totalCap;
    // GP take = capital + a profit share (15-30% of profit, sponsor-friendly)
    const gpProfitShare = rng.pickFromSet([0.15, 0.20, 0.225, 0.25, 0.30]);
    const round = difficulty === 'advanced' ? 25_000 : 100_000;
    const gpTake =
      Math.round((gpCapital + totalProfit * gpProfitShare) / round) * round;
    const proRata = (gpCapital / totalCap) * totalProfit;
    const expected = gpEffectivePromote({
      gpTake,
      gpCapital,
      lpCapital,
      totalDistributable,
    });

    return {
      id: nextId('promote'),
      kind: 'gpEffectivePromote',
      prompt: `LP put in ${formatUsd(lpCapital)} (${formatPct(1 - gpCapPct, 0)}); GP put in ${formatUsd(gpCapital)} (${formatPct(gpCapPct, 0)}). Total distributed: ${formatUsd(totalDistributable)}. GP took ${formatUsd(gpTake)}. What's the GP's promote (dollars beyond pro-rata)?`,
      context: {
        lpCapital,
        gpCapital,
        totalDistributable,
        gpTake,
      },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution({
        gpTake,
        gpCapital,
        totalCap,
        totalProfit,
        proRata,
        expected,
      }),
    };
  },
};
