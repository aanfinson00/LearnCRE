import { leveredIrrApprox } from '../../math/debt';
import { formatPct } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(unlev: number, borrow: number, ltv: number): Solution {
  const spread = unlev - borrow;
  const lev = leveredIrrApprox({ unleveredIrr: unlev, borrowRate: borrow, ltv });
  return {
    formula: 'Levered IRR ≈ Unlevered + (LTV × (Unlev − Borrow)) / (1 − LTV)',
    steps: [
      {
        label: 'Spread',
        expression: `${formatPct(unlev)} − ${formatPct(borrow)}`,
        result: formatPct(spread, 2),
      },
      {
        label: 'Leverage multiplier',
        expression: `${formatPct(ltv)} / (1 − ${formatPct(ltv)})`,
        result: (ltv / (1 - ltv)).toFixed(2),
      },
      {
        label: 'Levered IRR (approx)',
        expression: `${formatPct(unlev)} + ${formatPct(spread)} × ${(ltv / (1 - ltv)).toFixed(2)}`,
        result: formatPct(lev, 2),
      },
    ],
    answerDisplay: formatPct(lev, 2),
  };
}

export const leveredIrrTemplate: QuestionTemplate<'leveredIrr'> = {
  kind: 'leveredIrr',
  label: 'Levered IRR (Approx)',
  description: 'Approximate levered IRR from unlevered IRR, LTV, and borrow rate.',
  category: 'returns',
  tips: [
    'Formula: Levered IRR ≈ Unlevered + LTV × (Unlev − Borrow) / (1 − LTV). Assumes parallel cash flows.',
    'Leverage multiplier: LTV / (1 − LTV). At 60% LTV = 1.5x; at 70% = 2.33x; at 75% = 3x.',
    'If unlevered IRR > borrow rate, leverage is accretive. If unlevered < borrow, leverage destroys returns.',
    'Example: unlev 8%, borrow 5%, 60% LTV → 8% + 3% × 1.5 = 12.5%. Actual levered is usually within 100 bps of this estimate.',
  ],
  generate(rng, difficulty = 'intermediate') {
    const unlev = pickBand(rng, bands.unleveredIrr, difficulty);
    const borrow = pickBand(rng, bands.interestRate, difficulty);
    const ltv = pickBand(rng, bands.ltv, difficulty);
    const expected = leveredIrrApprox({ unleveredIrr: unlev, borrowRate: borrow, ltv });

    return {
      id: nextId('levIrr'),
      kind: 'leveredIrr',
      prompt: `Unlevered IRR is ${formatPct(unlev)} and you can borrow at ${formatPct(borrow)} with ${formatPct(ltv)} LTV. Approximately what's the levered IRR?`,
      context: { unleveredIrr: unlev, borrowRate: borrow, ltv },
      expected,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.01 },
      solution: buildSolution(unlev, borrow, ltv),
    };
  },
};
