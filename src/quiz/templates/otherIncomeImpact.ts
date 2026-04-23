import { otherIncomeValueDelta } from '../../math/sensitivity';
import { formatPct, formatUsd, formatUsdSigned } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(delta: number, vac: number, cap: number, valueDelta: number): Solution {
  const noiDelta = delta * (1 - vac);
  return {
    formula: 'ΔValue = (ΔOther × (1 − Vacancy)) / Cap',
    steps: [
      {
        label: 'NOI uplift',
        expression: `${formatUsd(delta)} × (1 − ${formatPct(vac)})`,
        result: formatUsdSigned(noiDelta),
      },
      {
        label: 'Value uplift',
        expression: `${formatUsdSigned(noiDelta)} / ${formatPct(cap)}`,
        result: formatUsdSigned(valueDelta),
      },
    ],
    answerDisplay: formatUsdSigned(valueDelta),
  };
}

export const otherIncomeImpactTemplate: QuestionTemplate<'otherIncomeImpact'> = {
  kind: 'otherIncomeImpact',
  label: 'Other Income Impact',
  description: 'Adding other income → value uplift at given cap.',
  category: 'valuation',
  generate(rng) {
    const delta = rng.pickRange(25_000, 500_000, { step: 25_000 });
    const vac = rng.pickFromSet([0, 0.03, 0.05, 0.07] as const);
    const cap = rng.pickRange(0.045, 0.075, { step: 0.0025 });
    const valueDelta = otherIncomeValueDelta({
      otherIncomeDelta: delta,
      vacancyRate: vac,
      capRate: cap,
    });

    const vacText = vac === 0 ? 'no vacancy' : `${formatPct(vac)} vacancy`;
    return {
      id: nextId('otherInc'),
      kind: 'otherIncomeImpact',
      prompt: `Underwriting ${formatUsd(delta)} of new other income at a ${formatPct(cap)} cap (${vacText}). What's the $ change in value?`,
      context: { otherIncome: delta, vacancyRate: vac, capRate: cap },
      expected: valueDelta,
      unit: 'usdChange',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(delta, vac, cap, valueDelta),
    };
  },
};
