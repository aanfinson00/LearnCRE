import { value } from '../../math/core';
import { capCompressionPctChange } from '../../math/sensitivity';
import { formatPct, formatPctChange, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { applyMove, bands, discreteMoves, pickBand } from '../bands';
import { classBand } from '../assetClasses';
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
  pattern: '(A / B) − 1   where A = old cap, B = new cap',
  tips: [
    'Cap → value multiple: 4% = 25x, 4.5% = 22.2x, 5% = 20x, 5.5% = 18.2x, 6% = 16.7x, 6.5% = 15.4x, 7% = 14.3x, 8% = 12.5x, 10% = 10x.',
    'Small moves: %Δ value ≈ Δbps / new cap (bps). 25 bps compression from 5.00% → 4.75%: 25 / 475 ≈ 5.3% uplift. True = 5.26%.',
    'Rule of thumb: every 25 bps of compression is ~5% of value at a 5% cap, ~4% at a 6% cap, ~3.5% at a 7% cap.',
    'Sandwich technique: if the cap is ugly (e.g. 5.35%), compute the answer at the two nearest clean caps (5.25% and 5.5%), then split the difference. Great for mental math.',
    'Expansion uses the same formula, just negative. Cap widening hurts a bit less than compression helps (convexity).',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const noi = pickBand(rng, bands.noi, difficulty);
    const oldCap = pickBand(rng, classBand('capRate', assetClass), difficulty);
    const capMove = rng.pickFromSet(discreteMoves.capMoves);
    const newCap = applyMove(oldCap, capMove, classBand('capRate', assetClass), difficulty);
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
