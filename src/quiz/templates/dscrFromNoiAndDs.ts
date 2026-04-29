import { dscr } from '../../math/debt';
import { formatMultiple, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(noi: number, ds: number): Solution {
  const result = dscr(noi, ds);
  return {
    formula: 'DSCR = NOI / Annual Debt Service',
    steps: [
      {
        label: 'DSCR',
        expression: `${formatUsd(noi)} / ${formatUsd(ds)}`,
        result: formatMultiple(result),
      },
    ],
    answerDisplay: formatMultiple(result),
  };
}

export const dscrFromNoiAndDsTemplate: QuestionTemplate<'dscrFromNoiAndDs'> = {
  kind: 'dscrFromNoiAndDs',
  label: 'DSCR from NOI & Debt Service',
  description: 'Compute DSCR given NOI and annual debt service.',
  category: 'returns',
  roles: ['acquisitions', 'mortgageUw'],
  pattern: 'A / B   where A = NOI, B = annual debt service',
  tips: [
    'DSCR = NOI / DS. The most-frequently-asked debt-side question — know it cold.',
    'Lender minimums: typical permanent debt 1.20–1.30x; bridge / value-add 1.10–1.15x; agency MF 1.25x.',
    'A 1.25x DSCR means $0.80 of every NOI dollar can service debt. The remaining $0.20 is the safety margin.',
    'Sub-1.0x means NOI doesn\'t cover DS — the deal is "underwater" on a cash-flow basis.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const noi = pickBand(rng, bands.noi, difficulty);
    // Pick a plausible DS that produces a DSCR roughly in 0.95–2.0 range
    const targetDscr =
      difficulty === 'beginner'
        ? rng.pickFromSet([1.2, 1.25, 1.3, 1.4, 1.5] as const)
        : difficulty === 'intermediate'
          ? rng.pickFromSet([1.05, 1.15, 1.25, 1.35, 1.45] as const)
          : rng.pickFromSet([0.95, 1.08, 1.18, 1.28, 1.42, 1.55] as const);
    const ds = noi / targetDscr;
    const expected = dscr(noi, ds);

    return {
      id: nextId('dscr_from'),
      kind: 'dscrFromNoiAndDs',
      prompt: `NOI of ${formatUsd(noi)}, annual debt service of ${formatUsd(ds)}. What's the DSCR?`,
      context: { noi, debtServiceAnnual: ds },
      expected,
      unit: 'multiple',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(noi, ds),
    };
  },
};
