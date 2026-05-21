import { profitOnCostPct } from '../../math/construction';
import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

const TARGET_POC = [0.08, 0.10, 0.12, 0.15, 0.18, 0.20, 0.25] as const;

function buildSolution(
  stabilizedNoi: number,
  exitCap: number,
  totalCost: number,
  poc: number,
): Solution {
  const exitValue = stabilizedNoi / exitCap;
  return {
    formula: 'Profit on Cost = (Exit Value − Total Cost) / Total Cost',
    steps: [
      {
        label: 'Exit (stabilized) value',
        expression: `${formatUsd(stabilizedNoi)} / ${formatPct(exitCap)}`,
        result: formatUsd(exitValue),
      },
      {
        label: 'Profit',
        expression: `${formatUsd(exitValue)} − ${formatUsd(totalCost)}`,
        result: formatUsd(exitValue - totalCost),
      },
      {
        label: 'Profit on cost',
        expression: `${formatUsd(exitValue - totalCost)} / ${formatUsd(totalCost)}`,
        result: formatPct(poc),
      },
    ],
    answerDisplay: formatPct(poc),
  };
}

export const profitOnCostTemplate: QuestionTemplate<'profitOnCost'> = {
  kind: 'profitOnCost',
  label: 'Profit on Cost',
  description: 'Development return metric: (exit value − total cost) / total cost.',
  category: 'returns',
  roles: ['development', 'acquisitions'],
  pattern: '(NOI / exit cap − total cost) / total cost',
  tips: [
    'Profit on cost (POC) is the primary developer return check before underwriting IRR. Target is typically 15–25% for ground-up; value-add can be lower (8–15%).',
    'POC ignores time — a 20% POC over 5 years is very different from 20% over 2 years. Pair with IRR to get the full picture.',
    'Quick test: if exit cap = yield on cost, POC = 0%. Every basis point of positive dev spread adds to POC.',
    'POC threshold gates lender approval on mezz / preferred equity — common covenant is "project must achieve X% POC before GP promote."',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const targetPoc = rng.pickFromSet(TARGET_POC);
    const exitCap = pickBand(rng, bands.exitCapRate, difficulty);
    const stabilizedNoi = pickBand(rng, bands.noi, difficulty);
    const exitValue = stabilizedNoi / exitCap;
    const roundStep = difficulty === 'beginner' ? 1_000_000 : difficulty === 'advanced' ? 100_000 : 500_000;
    const totalCost = Math.round(exitValue / (1 + targetPoc) / roundStep) * roundStep;
    const poc = profitOnCostPct(stabilizedNoi, exitCap, totalCost);

    return {
      id: nextId('poc'),
      kind: 'profitOnCost',
      prompt: `Total development costs are ${formatUsd(totalCost)}. Stabilized NOI is ${formatUsd(stabilizedNoi)} at a ${formatPct(exitCap)} exit cap rate. What is the profit on cost?`,
      context: { totalProjectCost: totalCost, stabilizedNoi, exitCap },
      expected: poc,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.005 },
      solution: buildSolution(stabilizedNoi, exitCap, totalCost, poc),
    };
  },
};
