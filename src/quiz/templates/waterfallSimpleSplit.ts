import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

const SPLITS = [
  { lp: 0.7, gp: 0.3 },
  { lp: 0.75, gp: 0.25 },
  { lp: 0.8, gp: 0.2 },
  { lp: 0.85, gp: 0.15 },
  { lp: 0.9, gp: 0.1 },
] as const;

function buildSolution(residual: number, gpShare: number, gpDollars: number): Solution {
  return {
    formula: 'GP at this tier = residual × GP split %',
    steps: [
      {
        label: 'GP take',
        expression: `${formatUsd(residual)} × ${formatPct(gpShare, 0)}`,
        result: formatUsd(gpDollars),
      },
    ],
    answerDisplay: formatUsd(gpDollars),
  };
}

export const waterfallSimpleSplitTemplate: QuestionTemplate<'waterfallSimpleSplit'> = {
  kind: 'waterfallSimpleSplit',
  label: 'Waterfall Above-Split',
  description: 'Residual cash + LP/GP split → GP take at this tier.',
  category: 'returns',
  roles: ['portfolioMgmt', 'acquisitions'],
  pattern: 'residual × GP%',
  tips: [
    'Above-pref splits are commonly 80/20, 75/25, 70/30. The lower the LP share, the more sponsor-friendly.',
    'This is the "promote" tier — every dollar of residual that goes to GP beyond their pro-rata share is incentive.',
    'Bigger funds with lots of LP leverage often push GPs to 90/10 splits at the first tier.',
    'Always do the math at this tier even if you trust the split — small input errors compound across multiple tiers.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const split = rng.pickFromSet(SPLITS);
    // Residual lives between $1M and $50M; rougher rounding at advanced.
    const round = difficulty === 'beginner' ? 1_000_000 : difficulty === 'advanced' ? 50_000 : 250_000;
    const residual = Math.round(rng.pickRange(1_000_000, 50_000_000) / round) * round;
    const expected = residual * split.gp;

    return {
      id: nextId('wsplit'),
      kind: 'waterfallSimpleSplit',
      prompt: `After paying pref and returning capital, the residual cash is ${formatUsd(residual)}. The above-pref split is ${formatPct(split.lp, 0)}/${formatPct(split.gp, 0)} (LP/GP). What does the GP get at this tier?`,
      context: { residual, lpSplitPct: split.lp, gpSplitPct: split.gp },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.02 },
      solution: buildSolution(residual, split.gp, expected),
    };
  },
};
