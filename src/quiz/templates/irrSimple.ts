import { equityMultiple, irrSingle } from '../../math/returns';
import { formatMultiple, formatPct, formatUsd, formatYears } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
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
  generate(rng) {
    const equityIn = rng.pickRange(5_000_000, 20_000_000, { step: 1_000_000 });
    const mult = rng.pickRange(1.3, 2.8, { step: 0.1 });
    const equityOut = Math.round((equityIn * mult) / 500_000) * 500_000;
    const years = rng.pickInt(3, 8);
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
