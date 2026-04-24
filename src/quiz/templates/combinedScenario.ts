import { egi, noi, value } from '../../math/core';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, discreteMoves, pickBand } from '../bands';
import { classBand,classOpexRatios,classNoun } from '../assetClasses';
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
  pattern: '((A + B)(1 − C) − D) / E   [gross × (1−vac) − opex, /cap]',
  tips: [
    'Order of operations: (GPR + Other) × (1 − vacancy) = EGI. EGI − OpEx = NOI. NOI / cap = Value.',
    'Back-of-envelope: if OpEx is ~40% of EGI and vacancy is ~5%, NOI ≈ gross × 0.95 × 0.6 ≈ gross × 0.57.',
    'Then × (1/cap). At 6% cap: gross × 0.57 × 16.67 ≈ gross × 9.5. Ballparks a full proforma in one step.',
    'Sandwich: compute value at the two nearest clean caps (e.g. 5% and 6%) and interpolate to your actual cap. Handles ugly caps without a calculator.',
    'Sanity check: compare implied value-per-SF or $/unit to market comps before trusting the number.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const gpr = pickBand(rng, bands.gpr, difficulty);
    const other = pickBand(rng, bands.otherIncome, difficulty);
    const vac = rng.pickFromSet(discreteMoves.vacancySetNonZero);
    const opexRatio = rng.pickFromSet(classOpexRatios(assetClass));
    const opexRound = difficulty === 'beginner' ? 100_000 : difficulty === 'advanced' ? 1_000 : 10_000;
    const opex = Math.round(((gpr + other) * opexRatio * (1 - vac)) / opexRound) * opexRound;
    const cap = pickBand(rng, classBand('capRate', assetClass), difficulty);
    const v = value(noi({ gpr, otherIncome: other, vacancyRate: vac, opex }), cap);

    return {
      id: nextId('combo'),
      kind: 'combinedScenario',
      prompt: `A ${classNoun(assetClass)} has GPR ${formatUsd(gpr)}, other income ${formatUsd(other)}, vacancy ${formatPct(vac)}, OpEx ${formatUsd(opex)}, cap ${formatPct(cap)}. What's the implied value?`,
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
