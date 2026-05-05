import { formatPct } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

/**
 * Approximation: when GP takes promotePctOfProfit of the *profit* above
 * 1.0× capital, LP IRR shrinks roughly proportionally. The exact relationship
 * depends on cash-flow timing, but for a single-bullet sale at year N:
 *   LP EM = 1 + (1 − promotePct) × (deal EM − 1)
 *   LP IRR = LP EM^(1/N) − 1
 * This template uses that approximation so the math stays mental.
 */
function lpIrrAfterPromote(
  irrBeforePromote: number,
  promotePct: number,
  years: number,
): number {
  const dealEm = Math.pow(1 + irrBeforePromote, years);
  const lpEm = 1 + (1 - promotePct) * (dealEm - 1);
  return Math.pow(lpEm, 1 / years) - 1;
}

const PROMOTE_PCTS = [0.10, 0.15, 0.20, 0.25, 0.30] as const;
const IRR_PRE = [0.12, 0.14, 0.16, 0.18, 0.20, 0.22, 0.25] as const;

function buildSolution(
  irrBefore: number,
  promote: number,
  years: number,
  expected: number,
): Solution {
  const dealEm = Math.pow(1 + irrBefore, years);
  const lpEm = 1 + (1 - promote) * (dealEm - 1);
  return {
    formula: 'LP EM = 1 + (1 − promote%) × (deal EM − 1); LP IRR = LP EM^(1/n) − 1',
    steps: [
      {
        label: 'Deal EM',
        expression: `(1 + ${formatPct(irrBefore, 0)})^${years}`,
        result: dealEm.toFixed(3),
      },
      {
        label: 'LP EM after promote',
        expression: `1 + (1 − ${formatPct(promote, 0)}) × (${dealEm.toFixed(3)} − 1)`,
        result: lpEm.toFixed(3),
      },
      {
        label: 'LP IRR',
        expression: `${lpEm.toFixed(3)}^(1/${years}) − 1`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const irrAfterPromoteTemplate: QuestionTemplate<'irrAfterPromote'> = {
  kind: 'irrAfterPromote',
  label: 'LP IRR After Promote',
  description: 'Deal IRR + GP promote share + hold years → LP IRR.',
  category: 'returns',
  roles: ['portfolioMgmt', 'acquisitions'],
  pattern: 'LP EM = 1 + (1−promote)×(EM−1); LP IRR = LP EM^(1/n)−1',
  tips: [
    'Promote drag is non-linear — 20% of profit at deal IRR 18% over 5y costs LP ~150 bps; at IRR 25% it costs ~300 bps.',
    'Use the EM bridge: take deal IRR to deal EM, scale profit by (1 − promote%), back to IRR.',
    'If you only have IRRs and no EM, this approximation is within ~50 bps of the actual cash-flow-weighted answer.',
    'A 25% promote on a 20% deal → LP IRR ≈ 16%. Memorize a couple of these as anchor points.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const irrBefore = rng.pickFromSet(IRR_PRE);
    const promote = rng.pickFromSet(PROMOTE_PCTS);
    const years = rng.pickInt(3, 7);
    const expected = lpIrrAfterPromote(irrBefore, promote, years);
    void difficulty;

    return {
      id: nextId('irrap'),
      kind: 'irrAfterPromote',
      prompt: `Deal IRR before promote is ${formatPct(irrBefore, 0)} over a ${years}-year hold. The GP takes ${formatPct(promote, 0)} of the profit (above 1.0× capital). Approximate the LP's IRR after promote.`,
      context: {
        irrBeforePromote: irrBefore,
        promotePctOfProfit: promote,
        holdYears: years,
      },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(irrBefore, promote, years, expected),
    };
  },
};
