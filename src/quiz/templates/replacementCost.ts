import { replacementCost } from '../../math/basis';
import { formatSf, formatUsd, formatUsdPerSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(perSf: number, sf: number): Solution {
  const total = replacementCost(perSf, sf);
  return {
    formula: 'Replacement Cost = Cost/SF × Building SF',
    steps: [
      {
        label: 'Total',
        expression: `${formatUsdPerSf(perSf)} × ${formatSf(sf)}`,
        result: formatUsd(total),
      },
    ],
    answerDisplay: formatUsd(total),
  };
}

export const replacementCostTemplate: QuestionTemplate<'replacementCost'> = {
  kind: 'replacementCost',
  label: 'Replacement Cost',
  description: 'Cost/SF × SF — the value sanity floor.',
  category: 'valuation',
  pattern: 'A × B   where A = $/SF, B = SF',
  tips: [
    'Typical replacement costs: multifamily $200–325/SF, office $300–500/SF, industrial $125–225/SF, retail $200–400/SF.',
    'If acquisition basis is well below replacement cost, new supply can\'t undercut you on rent.',
    'If basis is above replacement cost, you need real rent growth or a story to make the math work.',
    'Quick math: at $250/SF × 200k SF = $50M. At $300/SF × 200k SF = $60M.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const perSf = pickBand(rng, bands.replacementCostPerSf, difficulty);
    const sf = pickBand(rng, classBand('sf', assetClass), difficulty);
    const expected = replacementCost(perSf, sf);

    return {
      id: nextId('repl'),
      kind: 'replacementCost',
      prompt: `A ${formatSf(sf)} building costs ${formatUsdPerSf(perSf)} to build from scratch. What's the total replacement cost?`,
      context: { replacementCostPerSf: perSf, buildingSf: sf },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(perSf, sf),
    };
  },
};
