import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  stabilizedNoi: number,
  exitCap: number,
  tpc: number,
  expected: number,
): Solution {
  const exitValue = stabilizedNoi / exitCap;
  return {
    formula: 'Profit on Cost = (Exit Value − TPC) / TPC',
    steps: [
      {
        label: 'Exit value',
        expression: `${formatUsd(stabilizedNoi)} / ${formatPct(exitCap, 2)}`,
        result: formatUsd(exitValue),
      },
      {
        label: 'Profit on cost',
        expression: `(${formatUsd(exitValue)} − ${formatUsd(tpc)}) / ${formatUsd(tpc)}`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const profitOnCostTemplate: QuestionTemplate<'profitOnCost'> = {
  kind: 'profitOnCost',
  label: 'Dev: Profit on Cost',
  description: 'Stabilized exit value vs total project cost → development profit margin.',
  category: 'returns',
  roles: ['development', 'acquisitions'],
  pattern: '(NOI / Exit Cap − TPC) / TPC',
  tips: [
    'Profit on cost (PoC) is the primary development feasibility metric. Minimum hurdle is typically 15–20% for market-rate deals.',
    'PoC of 20% means for every $1 spent, you\'re creating $1.20 of value — the 20¢ gap is your development premium.',
    'Compare PoC to your equity return hurdle: a 20% PoC doesn\'t guarantee a 20% IRR once you account for timing, leverage, and fees.',
    'If PoC < 15%, the project likely doesn\'t pencil without subsidies, cheap land, or extremely favorable debt terms.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const tpc =
      Math.round(rng.pickRange(15_000_000, 80_000_000) / 500_000) * 500_000;
    const exitCap = rng.pickFromSet([0.045, 0.05, 0.055, 0.06, 0.065] as const);
    // Back into stabilized NOI to hit a PoC in the 10–30% range
    const targetPoc = rng.pickFromSet([0.10, 0.12, 0.15, 0.18, 0.20, 0.25, 0.28] as const);
    const exitValue = tpc * (1 + targetPoc);
    const stabilizedNoi = Math.round((exitValue * exitCap) / 10_000) * 10_000;
    const actualExitValue = stabilizedNoi / exitCap;
    const expected = (actualExitValue - tpc) / tpc;

    return {
      id: nextId('poc'),
      kind: 'profitOnCost',
      prompt: `A development project reaches stabilization with ${formatUsd(stabilizedNoi)} NOI. Comparable assets trade at a ${formatPct(exitCap, 2)} cap rate. Total project cost is ${formatUsd(tpc)}. What's the profit on cost?`,
      context: {
        stabilizedNoi,
        exitCap,
        totalProjectCost: tpc,
      },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(stabilizedNoi, exitCap, tpc, expected),
    };
  },
};
