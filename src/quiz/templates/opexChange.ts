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
  generate(rng) {
    const magnitude = rng.pickFromSet(discreteMoves.opexMoves);
    const direction = rng.pickFromSet([-1, 1] as const);
    const signed = magnitude * direction;
    const cap = pickBand(rng, bands.capRate);
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
