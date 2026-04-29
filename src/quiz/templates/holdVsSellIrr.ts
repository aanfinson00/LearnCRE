import { irrMulti } from '../../math/returns';
import { formatPct, formatUsd, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(params: {
  todayValue: number;
  noiToday: number;
  noiGrowth: number;
  exitCap: number;
  extensionYears: number;
  irrApprox: number;
}): Solution {
  const { todayValue, noiToday, noiGrowth, exitCap, extensionYears, irrApprox } = params;
  const yearNNoi = noiToday * Math.pow(1 + noiGrowth, extensionYears);
  const exitValue = yearNNoi / exitCap;
  return {
    formula: 'IRR over extension = NPV([-V₀, NOI₁, … NOI_{N-1}, NOI_N + V_N]) = 0',
    steps: [
      {
        label: 'Year-N NOI',
        expression: `${formatUsd(noiToday)} × (1 + ${formatPct(noiGrowth)})^${extensionYears}`,
        result: formatUsd(yearNNoi),
      },
      {
        label: 'Year-N exit value',
        expression: `${formatUsd(yearNNoi)} / ${formatPct(exitCap)}`,
        result: formatUsd(exitValue),
      },
      {
        label: 'Extension IRR',
        expression: `IRR([-${formatUsd(todayValue)}, NOI₁..N, NOI_N + ${formatUsd(exitValue)}])`,
        result: formatPct(irrApprox),
      },
    ],
    answerDisplay: formatPct(irrApprox),
  };
}

export const holdVsSellIrrTemplate: QuestionTemplate<'holdVsSellIrr'> = {
  kind: 'holdVsSellIrr',
  label: 'Hold-vs-sell extension IRR',
  description: 'Marginal IRR of holding N more years vs. selling today.',
  category: 'returns',
  roles: ['acquisitions', 'assetManagement', 'portfolioMgmt'],
  pattern: 'IRR over the extension cash flows: -V₀, NOI₁, …, NOI_N + V_N',
  tips: [
    'Extension IRR is the IRR of the *extra* hold, treating today\'s value as the entry.',
    'If extension IRR < your alt-deployment hurdle, sell now; if higher, hold has positive optionality.',
    'Quick mental: extension IRR ≈ income yield (NOI/V) + growth − cap-expansion drag.',
    'Cap stays roughly flat → extension IRR ≈ in-place yield + NOI growth (most common simplification).',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const noi = pickBand(rng, bands.noi, difficulty);
    const exitCap = pickBand(rng, bands.capRate, difficulty);
    const todayValue = noi / exitCap;
    const noiGrowth =
      difficulty === 'beginner'
        ? rng.pickFromSet([0.02, 0.025, 0.03] as const)
        : difficulty === 'intermediate'
          ? rng.pickFromSet([0.015, 0.025, 0.035, 0.04] as const)
          : rng.pickFromSet([0.01, 0.02, 0.035, 0.045, 0.05] as const);
    const extensionYears = rng.pickFromSet([2, 3, 5] as const);

    // Build cash flows: t=0 entry at todayValue, NOI distributions t=1..N-1, then NOI + exit at t=N
    const cashflows: number[] = [-todayValue];
    for (let y = 1; y <= extensionYears; y++) {
      const noiYear = noi * Math.pow(1 + noiGrowth, y);
      if (y === extensionYears) {
        const exitValue = noiYear / exitCap;
        cashflows.push(noiYear + exitValue);
      } else {
        cashflows.push(noiYear);
      }
    }
    const expected = irrMulti(cashflows);

    return {
      id: nextId('hold_sell'),
      kind: 'holdVsSellIrr',
      prompt: `Today's value ${formatUsd(todayValue)} on ${formatUsd(noi)} NOI (${formatPct(exitCap)} cap). NOI grows ${formatPct(noiGrowth)}/yr; exit cap stays at ${formatPct(exitCap)}. If you hold ${formatYears(extensionYears)} more, what's the IRR over the extension?`,
      context: {
        noi,
        capRate: exitCap,
        exitCap,
        holdYears: extensionYears,
      },
      expected,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.005 },
      solution: buildSolution({
        todayValue,
        noiToday: noi,
        noiGrowth,
        exitCap,
        extensionYears,
        irrApprox: expected,
      }),
    };
  },
};
