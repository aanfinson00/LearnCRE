import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

const LP_OWNERSHIP_PCT = [0.70, 0.75, 0.80, 0.85, 0.90, 0.95] as const;

function buildSolution(totalCall: number, lpPct: number, lpShare: number): Solution {
  return {
    formula: "LP Share = Total Capital Call × LP Ownership %",
    steps: [
      {
        label: "LP dollar obligation",
        expression: `${formatUsd(totalCall)} × ${formatPct(lpPct, 0)}`,
        result: formatUsd(lpShare),
      },
    ],
    answerDisplay: formatUsd(lpShare),
  };
}

export const capitalCallProrataTemplate: QuestionTemplate<'capitalCallProrata'> = {
  kind: 'capitalCallProrata',
  label: 'Capital Call — LP Pro-Rata Share',
  description: "LP's dollar obligation on a capital call: total call × LP ownership percentage.",
  category: 'returns',
  roles: ['portfolioMgmt', 'acquisitions'],
  pattern: 'LP share = total call × LP ownership %',
  tips: [
    "LP ownership % is fixed at fund close in the LPA. Capital calls are always funded pro-rata unless there's a default or catch-up provision.",
    "GP typically owns 1–10% of the fund; LP owns the rest. A 90% LP stake on a $5M call means $4.5M from LP in one wire — know the mechanics before IC.",
    "Default on a capital call triggers punitive dilution or forced transfer of interest. LPs who can't fund a call lose significant value.",
    "In a JV, LP's pro-rata obligation is the same math — total shortfall × LP ownership % — regardless of which tier of the waterfall the call is funding.",
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const roundStep = difficulty === 'beginner' ? 500_000 : difficulty === 'advanced' ? 100_000 : 250_000;
    const totalCapitalCall = Math.round(pickBand(rng, bands.equityIn, difficulty) * 0.15 / roundStep) * roundStep;
    const lpOwnershipPct = rng.pickFromSet(LP_OWNERSHIP_PCT);
    const lpShare = totalCapitalCall * lpOwnershipPct;

    return {
      id: nextId('cap_call'),
      kind: 'capitalCallProrata',
      prompt: `The fund issues a ${formatUsd(totalCapitalCall)} capital call to fund a leasing reserve. LP owns ${formatPct(lpOwnershipPct, 0)} of the partnership. What is LP's dollar obligation?`,
      context: { totalCapitalCall, lpOwnershipPct },
      expected: lpShare,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.01 },
      solution: buildSolution(totalCapitalCall, lpOwnershipPct, lpShare),
    };
  },
};
