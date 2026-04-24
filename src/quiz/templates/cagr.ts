import { cagr, compoundGrowth } from '../../math/growth';
import { formatPct, formatUsd, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { bands, pickBand } from '../bands';
import { nextId } from '../random';

function buildSolution(start: number, end: number, years: number): Solution {
  const g = cagr(start, end, years);
  return {
    formula: 'CAGR = (end / start)^(1/years) − 1',
    steps: [
      {
        label: 'Ratio',
        expression: `${formatUsd(end)} / ${formatUsd(start)}`,
        result: (end / start).toFixed(3),
      },
      {
        label: 'CAGR',
        expression: `(${(end / start).toFixed(3)})^(1/${years}) − 1`,
        result: formatPct(g, 2),
      },
    ],
    answerDisplay: formatPct(g, 2),
  };
}

export const cagrTemplate: QuestionTemplate<'cagr'> = {
  kind: 'cagr',
  label: 'CAGR',
  description: 'Growth rate from start, end, and periods.',
  category: 'returns',
  pattern: '(A / B)^(1/n) − 1   [nth root of a ratio]',
  tips: [
    'Same math as IRR from an equity multiple — just generic for any starting/ending value.',
    'Rule of 72: if end/start ≈ 2, CAGR ≈ 72/n. If ≈ 3, use rule of 114 → 114/n.',
    'Anchor: 1.5× over 5y ≈ 8.45%; 2× over 10y ≈ 7.18%; 1.3× over 5y ≈ 5.39%.',
    'Shortcut for small ratios: ln(end/start) / n gives the continuously compounded rate — close to discrete CAGR for short horizons.',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    const start = pickBand(rng, bands.noi, difficulty);
    const rate = pickBand(rng, bands.growthRate, difficulty);
    const years = rng.pickInt(bands.projectionYears.min, bands.projectionYears.max);
    const endStep = difficulty === 'beginner' ? 100_000 : difficulty === 'advanced' ? 5_000 : 25_000;
    const end = Math.round(compoundGrowth(start, rate, years) / endStep) * endStep;
    const expected = cagr(start, end, years);

    return {
      id: nextId('cagr'),
      kind: 'cagr',
      prompt: `A value grew from ${formatUsd(start)} to ${formatUsd(end)} over ${formatYears(years)}. What's the CAGR?`,
      context: { startValue: start, endValue: end, projectionYears: years },
      expected,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.005 },
      solution: buildSolution(start, end, years),
    };
  },
};
