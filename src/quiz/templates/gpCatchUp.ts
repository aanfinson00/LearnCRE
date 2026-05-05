import { gpCatchUp } from '../../math/waterfall';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

const TARGET_GP_PCTS = [0.15, 0.20, 0.25, 0.30] as const;

function buildSolution(prefPaid: number, target: number, expected: number): Solution {
  return {
    formula: 'Catch-up = pref × target / (1 − target)',
    steps: [
      {
        label: 'Catch-up multiplier',
        expression: `${formatPct(target, 0)} / (1 − ${formatPct(target, 0)})`,
        result: (target / (1 - target)).toFixed(4),
      },
      {
        label: 'Catch-up dollars',
        expression: `${formatUsd(prefPaid)} × ${(target / (1 - target)).toFixed(4)}`,
        result: formatUsd(expected),
      },
    ],
    answerDisplay: formatUsd(expected),
  };
}

export const gpCatchUpTemplate: QuestionTemplate<'gpCatchUp'> = {
  kind: 'gpCatchUp',
  label: 'GP Catch-Up',
  description: 'Pref paid + target promote tier → GP catch-up dollars.',
  category: 'returns',
  roles: ['portfolioMgmt', 'acquisitions'],
  pattern: 'pref × target / (1 − target)',
  tips: [
    'Catch-up is a sponsor-friendly tier: 100% of cash goes to GP until they have target% of (pref + cat-up).',
    'A 20% promote tier with full catch-up means GP earns 20% of every dollar the LP earned in pref.',
    'Quick check: with a 20% target, catch-up ≈ 25% of pref paid (since 0.20/0.80 = 0.25).',
    'Half-catchup (50/50 to GP until target) is more LP-friendly — the cat-up dollars take twice as long to flow.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    // Round pref-paid to clean steps so the math stays mental.
    const round = difficulty === 'beginner' ? 500_000 : difficulty === 'advanced' ? 25_000 : 100_000;
    const prefPaid = Math.round(rng.pickRange(1_000_000, 12_000_000) / round) * round;
    const target = rng.pickFromSet(TARGET_GP_PCTS);
    const expected = gpCatchUp(prefPaid, target);

    return {
      id: nextId('catup'),
      kind: 'gpCatchUp',
      prompt: `LP has been paid ${formatUsd(prefPaid)} of preferred return. The waterfall has a 100% catch-up tier targeting a ${formatPct(target, 0)} GP promote. What's the catch-up amount due to GP?`,
      context: { prefPaid, catchUpTargetGpPct: target },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(prefPaid, target, expected),
    };
  },
};
