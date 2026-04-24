import { equityMultiple, irrSingle } from '../../math/returns';
import { formatMultiple, formatPct, formatUsd, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(equityIn: number, equityOut: number, years: number): Solution {
  const em = equityMultiple(equityIn, equityOut);
  const irr = irrSingle(equityIn, equityOut, years);
  return {
    formula: 'IRR = (Out / In)^(1 / years) − 1',
    steps: [
      {
        label: 'Equity multiple',
        expression: `${formatUsd(equityOut)} / ${formatUsd(equityIn)}`,
        result: formatMultiple(em),
      },
      {
        label: 'IRR',
        expression: `${formatMultiple(em)}^(1/${years}) − 1`,
        result: formatPct(irr),
      },
    ],
    answerDisplay: formatPct(irr),
  };
}

export const irrSimpleTemplate: QuestionTemplate<'irrSimple'> = {
  kind: 'irrSimple',
  label: 'IRR — Simple',
  description: 'Single-period IRR: equity in, equity out, hold years.',
  category: 'returns',
  pattern: '(A / B)^(1/n) − 1   [nth root of multiple]',
  tips: [
    'Rule of 72: years-to-double ≈ 72 / IRR%. 2x in 7 yrs ≈ 10.3% IRR. 2x in 5 yrs ≈ 14.4%. 2x in 10 yrs ≈ 7.2%.',
    'Key anchors: 2.0x over 5y ≈ 14.9%; 2.0x over 7y ≈ 10.4%; 2.0x over 10y ≈ 7.2%; 2.5x over 5y ≈ 20.1%.',
    'Anchor for 10y holds: IRR% × 10 years → EM roughly: 10% → 2.59x, 12% → 3.11x, 15% → 4.05x, 8% → 2.16x.',
    'Sandwich: if EM is 2.2x over 6 years, bracket it — 2.0x over 6y is ~12.2%, 2.5x over 6y is ~16.5%. Interpolate → ~13.6% (actual 14.0%).',
    'Floor approximation: EM ≥ 1 + (IRR × years). 10% × 10y → floor 2.0x; actual 2.59x. Gap is the compounding.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const equityIn = pickBand(rng, bands.equityIn, difficulty);
    const mult = pickBand(rng, bands.irrExitMultiple, difficulty);
    const outRound = difficulty === 'beginner' ? 1_000_000 : difficulty === 'advanced' ? 100_000 : 500_000;
    const equityOut = Math.round((equityIn * mult) / outRound) * outRound;
    const years =
      difficulty === 'beginner'
        ? rng.pickFromSet([5, 7, 10] as const)
        : rng.pickInt(bands.holdYears.min, bands.holdYears.max);
    const expected = irrSingle(equityIn, equityOut, years);

    return {
      id: nextId('irr'),
      kind: 'irrSimple',
      prompt: `You invest ${formatUsd(equityIn)} and get ${formatUsd(equityOut)} back after ${formatYears(years)}. What's the IRR (as a %)?`,
      context: { equityIn, equityOut, holdYears: years },
      expected,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.005 },
      solution: buildSolution(equityIn, equityOut, years),
    };
  },
};
