import { opexValueDelta } from '../../math/sensitivity';
import { formatPct, formatUsd, formatUsdSigned } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, discreteMoves, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(opexDelta: number, cap: number, valueDelta: number): Solution {
  return {
    formula: 'ΔNOI = −ΔOpEx;  ΔValue = ΔNOI / Cap',
    steps: [
      {
        label: 'NOI change',
        expression: `−${formatUsd(Math.abs(opexDelta))}`,
        result: formatUsdSigned(-opexDelta),
      },
      {
        label: 'Value change',
        expression: `${formatUsdSigned(-opexDelta)} / ${formatPct(cap)}`,
        result: formatUsdSigned(valueDelta),
      },
    ],
    answerDisplay: formatUsdSigned(valueDelta),
  };
}

export const opexChangeTemplate: QuestionTemplate<'opexChange'> = {
  kind: 'opexChange',
  label: 'OpEx Change Impact',
  description: 'OpEx $ change → NOI and value impact at given cap.',
  category: 'valuation',
  pattern: '− A / B   where A = opex change, B = cap',
  tips: [
    'OpEx moves NOI 1-for-1 (with a flipped sign): $50k more OpEx = $50k less NOI.',
    'ΔValue = −ΔOpEx / cap. $50k OpEx lift @ 6% cap = −$50k × 16.67 ≈ −$833k value.',
    'Sandwich at ugly caps: at 5.75% cap, the $1 of OpEx is worth between 16.7x (6%) and 18.2x (5.5%) — pick the midpoint for a fast gut estimate.',
    'An OpEx cut is the cheapest "yield play" in a deal — a $1 cut is worth 1/cap dollars of value.',
    'Be careful with "one-time" OpEx: if it\'s truly one-off it shouldn\'t get capped at all.',
  ],
  generate(rng, difficulty = 'intermediate') {
    const magnitude = rng.pickFromSet(discreteMoves.opexMoves);
    const direction = rng.pickFromSet([-1, 1] as const);
    const signed = magnitude * direction;
    const cap = pickBand(rng, bands.capRate, difficulty);
    const valueDelta = opexValueDelta({ opexDelta: signed, capRate: cap });

    const verb = direction > 0 ? 'increases' : 'decreases';
    return {
      id: nextId('opex'),
      kind: 'opexChange',
      prompt: `OpEx ${verb} by ${formatUsd(magnitude)} at a ${formatPct(cap)} cap. What's the $ change in value?`,
      context: { opex: signed, capRate: cap },
      expected: valueDelta,
      unit: 'usdChange',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(signed, cap, valueDelta),
    };
  },
};
