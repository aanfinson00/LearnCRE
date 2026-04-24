import { breakEvenOccupancy } from '../../math/debt';
import { formatPct, formatSf, formatUsd, formatUsdPerSf } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { pickBand } from '../bands';
import { classBand } from '../assetClasses';
import { nextId } from '../random';

function buildSolution(params: {
  sf: number;
  pgiPerSf: number;
  opexRatio: number;
  debtService: number;
}): Solution {
  const pgi = params.sf * params.pgiPerSf;
  const opex = pgi * params.opexRatio;
  const beo = breakEvenOccupancy({ opex, debtServiceAnnual: params.debtService, pgi });
  return {
    formula: 'BEO = (OpEx + Debt Service) / PGI',
    steps: [
      {
        label: 'PGI',
        expression: `${formatSf(params.sf)} × ${formatUsdPerSf(params.pgiPerSf)}`,
        result: formatUsd(pgi),
      },
      {
        label: 'OpEx',
        expression: `${formatUsd(pgi)} × ${formatPct(params.opexRatio)}`,
        result: formatUsd(opex),
      },
      {
        label: 'Break-even occupancy',
        expression: `(${formatUsd(opex)} + ${formatUsd(params.debtService)}) / ${formatUsd(pgi)}`,
        result: formatPct(beo, 1),
      },
    ],
    answerDisplay: formatPct(beo, 1),
  };
}

export const breakEvenOccupancyTemplate: QuestionTemplate<'breakEvenOccupancy'> = {
  kind: 'breakEvenOccupancy',
  label: 'Break-Even Occupancy',
  description: 'Minimum occupancy to cover OpEx + debt service.',
  category: 'returns',
  pattern: '(A + B) / C   where A = opex, B = debt service, C = PGI',
  tips: [
    'BEO = (OpEx + Debt Service) / PGI. Lender stress test: how low can occupancy drop before cash flow goes negative?',
    'Unlevered BEO just equals the OpEx ratio. Adding debt stacks debt service / PGI on top.',
    'Typical healthy range: 65–75%. Over 85% and the deal has thin margin of safety.',
    'Shortcut: if OpEx is 40% of PGI and debt service is 25% of PGI, BEO = 65%.',
  ],
  generate(rng, difficulty = 'intermediate', assetClass = 'mixed') {
    const sf = pickBand(rng, classBand('sf', assetClass), difficulty);
    const pgiPerSf = pickBand(rng, classBand('pgiPerSf', assetClass), difficulty);
    const opexRatio = rng.pickFromSet([0.3, 0.35, 0.4, 0.45] as const);
    const pgi = sf * pgiPerSf;
    const dsRatio = rng.pickFromSet([0.15, 0.2, 0.25, 0.3] as const);
    const debtStep = difficulty === 'beginner' ? 50_000 : difficulty === 'advanced' ? 5_000 : 25_000;
    const debtService = Math.round((pgi * dsRatio) / debtStep) * debtStep;
    const opex = pgi * opexRatio;
    const expected = breakEvenOccupancy({ opex, debtServiceAnnual: debtService, pgi });

    return {
      id: nextId('beo'),
      kind: 'breakEvenOccupancy',
      prompt: `${formatSf(sf)} building with ${formatUsdPerSf(pgiPerSf)} PGI, ${formatPct(opexRatio)} OpEx ratio, and ${formatUsd(debtService)} annual debt service. What's the break-even occupancy?`,
      context: {
        buildingSf: sf,
        pgiPerSf,
        pgi,
        opexRatio,
        opex,
        debtServiceAnnual: debtService,
      },
      expected,
      unit: 'pct',
      tolerance: { type: 'abs', band: 0.03 },
      solution: buildSolution({ sf, pgiPerSf, opexRatio, debtService }),
    };
  },
};
