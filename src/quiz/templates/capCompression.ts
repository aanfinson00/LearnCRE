import { value } from '../../math/core';
import { capCompressionPctChange } from '../../math/sensitivity';
import { formatPct, formatPctChange, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(noi: number, oldCap: number, newCap: number): Solution {
  const oldValue = value(noi, oldCap);
  const newValue = value(noi, newCap);
  const pct = capCompressionPctChange(oldCap, newCap);
  return {
    formula: 'Value = NOI / Cap Rate  →  %Δ Value = (OldCap / NewCap) − 1',
    steps: [
      {
        label: 'Old value',
        expression: `${formatUsd(noi)} / ${formatPct(oldCap)}`,
        result: formatUsd(oldValue),
      },
      {
        label: 'New value',
        expression: `${formatUsd(noi)} / ${formatPct(newCap)}`,
        result: formatUsd(newValue),
      },
      {
        label: '% change',
        expression: `${formatUsd(newValue)} / ${formatUsd(oldValue)} − 1`,
        result: formatPctChange(pct),
      },
    ],
    answerDisplay: formatPctChange(pct),
  };
}

export const capCompressionTemplate: QuestionTemplate<'capCompression'> = {
  kind: 'capCompression',
  label: 'Cap Rate Compression',
  description: 'How does value change when cap rate tightens or widens?',
  category: 'valuation',
  generate(rng) {
    const noi = rng.pickRange(500_000, 10_000_000, { step: 50_000 });
    const oldCap = rng.pickRange(0.045, 0.075, { step: 0.0005 });
    const capMove = rng.pickFromSet([-0.0075, -0.005, -0.0025, 0.0025, 0.005, 0.0075] as const);
    let newCap = oldCap + capMove;
    newCap = Math.round(newCap * 10_000) / 10_000;
    const expected = capCompressionPctChange(oldCap, newCap);

    return {
      id: nextId('cap'),
      kind: 'capCompression',
      prompt: `NOI is ${formatUsd(noi)}. Cap rate moves from ${formatPct(oldCap)} to ${formatPct(newCap)}. What % change in value?`,
      context: { noi, capRate: oldCap, newCapRate: newCap },
      expected,
      unit: 'pctChange',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(noi, oldCap, newCap),
    };
  },
};
