import { formatPct } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(
  totalUnits: number,
  vacantUnits: number,
  nonPayingUnits: number,
  expected: number,
): Solution {
  return {
    formula: 'Economic Vacancy = (Vacant Units + Non-Paying Units) / Total Units',
    steps: [
      {
        label: 'Total economic loss units',
        expression: `${vacantUnits} vacant + ${nonPayingUnits} non-paying`,
        result: `${vacantUnits + nonPayingUnits} units`,
      },
      {
        label: 'Economic vacancy rate',
        expression: `${vacantUnits + nonPayingUnits} / ${totalUnits}`,
        result: formatPct(expected, 1),
      },
    ],
    answerDisplay: formatPct(expected, 1),
  };
}

export const economicVacancyRateTemplate: QuestionTemplate<'economicVacancyRate'> = {
  kind: 'economicVacancyRate',
  label: 'MF: Economic Vacancy Rate',
  description: 'Physical vacancy plus non-paying occupied units → true revenue loss rate.',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement'],
  pattern: '(Vacant + Non-Paying) / Total Units',
  tips: [
    'Physical vacancy counts empty units. Economic vacancy also includes occupied-but-not-paying (delinquent) and concession units.',
    'Economic vacancy > physical vacancy is a red flag — it means collections problems or aggressive concession use.',
    'Lenders underwrite to economic vacancy; a seller marketing "95% occupied" may have 8% economic vacancy hidden in concessions.',
    'In value-add underwriting, distinguish between vacancy that will burn off (lease-up) vs. structural vacancy (bad product, bad location).',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const totalUnits = rng.pickFromSet([80, 100, 120, 150, 180, 200, 240, 300] as const);
    const vacantUnits = rng.pickInt(3, Math.floor(totalUnits * 0.10));
    const nonPayingUnits = rng.pickInt(1, Math.floor(totalUnits * 0.05));
    const expected = (vacantUnits + nonPayingUnits) / totalUnits;

    return {
      id: nextId('evr'),
      kind: 'economicVacancyRate',
      prompt: `A ${totalUnits}-unit multifamily property has ${vacantUnits} physically vacant units and ${nonPayingUnits} occupied units that are delinquent or on active concession. What is the economic vacancy rate?`,
      context: {
        units: totalUnits,
        vacantUnits,
        nonPayingUnits,
      },
      expected,
      unit: 'pct',
      tolerance: { type: 'pct', band: 0.05 },
      solution: buildSolution(totalUnits, vacantUnits, nonPayingUnits, expected),
    };
  },
};
