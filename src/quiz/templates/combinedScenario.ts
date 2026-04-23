import { egi, noi, value } from '../../math/core';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  gpr: number,
  other: number,
  vac: number,
  opex: number,
  cap: number,
): Solution {
  const egiValue = egi({ gpr, otherIncome: other, vacancyRate: vac });
  const noiValue = noi({ gpr, otherIncome: other, vacancyRate: vac, opex });
  const v = value(noiValue, cap);
  return {
    formula: 'Value = ((GPR + Other) × (1 − Vacancy) − OpEx) / Cap',
    steps: [
      {
        label: 'EGI',
        expression: `(${formatUsd(gpr)} + ${formatUsd(other)}) × (1 − ${formatPct(vac)})`,
        result: formatUsd(egiValue),
      },
      {
        label: 'NOI',
        expression: `${formatUsd(egiValue)} − ${formatUsd(opex)}`,
        result: formatUsd(noiValue),
      },
      {
        label: 'Value',
        expression: `${formatUsd(noiValue)} / ${formatPct(cap)}`,
        result: formatUsd(v),
      },
    ],
    answerDisplay: formatUsd(v),
  };
}

export const combinedScenarioTemplate: QuestionTemplate<'combinedScenario'> = {
  kind: 'combinedScenario',
  label: 'Combined Scenario',
  description: 'Full proforma → implied value.',
  category: 'valuation',
  generate(rng) {
    const gpr = rng.pickRange(1_000_000, 6_000_000, { step: 100_000 });
    const other = rng.pickRange(0, 400_000, { step: 25_000 });
    const vac = rng.pickFromSet([0.03, 0.05, 0.07] as const);
    const opexRatio = rng.pickFromSet([0.35, 0.4, 0.45] as const);
    const opex = Math.round((gpr + other) * opexRatio * (1 - vac) / 10_000) * 10_000;
    const cap = rng.pickRange(0.05, 0.075, { step: 0.0025 });
    const v = value(noi({ gpr, otherIncome: other, vacancyRate: vac, opex }), cap);

    return {
      id: nextId('combo'),
      kind: 'combinedScenario',
      prompt: `GPR ${formatUsd(gpr)}, other income ${formatUsd(other)}, vacancy ${formatPct(vac)}, OpEx ${formatUsd(opex)}, cap ${formatPct(cap)}. What's the implied value?`,
      context: {
        gpr,
        otherIncome: other,
        vacancyRate: vac,
        opex,
        capRate: cap,
      },
      expected: v,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.03 },
      solution: buildSolution(gpr, other, vac, opex, cap),
    };
  },
};
