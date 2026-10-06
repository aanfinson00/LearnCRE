/**
 * Content guardrails for the question generators. Sweeps every template
 * across all difficulties and asset classes and fails on:
 *  - broken output (throws, NaN/Infinity, "undefined" in text, missing steps)
 *  - float noise leaking into text ("8.200000000000001-yr hold")
 *  - "a 5 years hold" phrasing (use formatYearsAdj for compound adjectives)
 *  - multiple-choice sets that lack the answer, aren't 4 options, or offer an
 *    impossible non-positive level next to a positive answer
 *  - answers outside the realism band for that kind (BOUNDS below)
 *
 * When a new template is added, add its kind to BOUNDS. If a deliberate
 * change moves a range, widen the band here in the same commit and say why.
 */
import { templates, allKinds } from '../../quiz/templates';
import { createRng } from '../../quiz/random';
import { buildChoices } from '../../quiz/distractors';
import { assetClassOrder } from '../../quiz/assetClasses';
import type { Question, QuestionKind } from '../../types/question';

const SEEDS_PER_COMBO = 40;
const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;

/** [min, max] for `expected`, in the template's own units. */
const BOUNDS: Record<QuestionKind, [number, number]> = {
  capCompression: [-0.333, 0.429],
  goingInCap: [250, 1_200], // realism
  vacancySensitivity: [-28.26e6, 23.895e6],
  otherIncomeImpact: [115_400, 16.665e6],
  rentChange: [-3.8565e6, 10.3935e6],
  opexChange: [-8.823e6, 9.615e6],
  combinedScenario: [1.0815e6, 378.15e6],
  equityMultiple: [1, 5], // realism
  irrSimple: [0, 0.35], // realism
  targetMultiple: [1, 10], // realism
  pricePerSf: [58.4, 700],
  allInBasis: [78, 1_620],
  yieldOnCost: [300, 1_300], // realism
  devSpread: [66.5, 900],
  replacementCost: [800_000, 1044e6],
  debtYield: [1.316e6, 264.6e6],
  dscrLoanSizing: [1.394e6, 292.5e6],
  cashOnCash: [-0.2, 0.3], // realism
  breakEvenOccupancy: [0.3, 1], // realism
  leveredIrr: [-0.1, 0.4], // realism
  netEffectiveRent: [1.91, 109],
  tiVsRent: [1.27, 25.2],
  tiPayback: [1, 36.8],
  rentRollChange: [16_855, 94.455e6],
  taxReassessment: [-168e6, 32.4e6],
  grossRentMultiplier: [4, 20], // realism
  loanConstant: [286, 1_548],
  cagr: [0, 0.15], // realism
  compoundGrowth: [138_200, 35.46e6],
  reversionValue: [1.5625e6, 484.95e6],
  operatingExpenseRatio: [0.05, 0.85], // realism
  noiFromOer: [75_000, 19.71e6],
  rentPerUnit: [5_940, 60_000],
  opexPerUnit: [1_875, 21_255],
  pricePerUnit: [75_000, 900_000],
  dscrFromNoiAndDs: [0.75, 2.5], // realism
  dscrSensitivityRate: [0.75, 3], // realism
  dscrTestPasses: [-2.4435e6, 3.156e6],
  holdVsSellIrr: [0, 0.3], // realism
  taxAdjustedExit: [962_000, 200.25e6],
  extensionDrag: [0, 0.06], // realism
  prefAccrual: [112_500, 135.195e6],
  waterfallSimpleSplit: [50_000, 22.5e6],
  gpCatchUp: [88_250, 7.4565e6],
  gpEffectivePromote: [0, 15.765e6],
  irrAfterPromote: [0, 0.35], // realism
  costToComplete: [0.0833, 1.24],
  drawAllocation: [0, 12e6],
  retainageRunning: [125_000, 8.7e6],
  contingencyDrawDown: [0.125, 1.29],
  revparFromAdrOcc: [34.4, 463],
  gopMargin: [0.15, 0.6], // realism
  ffeReserveDollars: [140_900, 4.3515e6],
  revporVsRevpar: [70, 570],
  walt: [0.5, 15], // realism
  tiPerSfPerYearOfTerm: [1.25, 55],
  renewalProbabilityWeightedRent: [12.3, 101],
  salesPerSf: [100, 2_000], // realism
  occupancyCostRatio: [0.01, 0.3], // realism
  percentageRentBreakpoint: [500_000, 30e6],
  clearHeightPremium: [3.4, 20.7],
  truckCountPerSf: [0.3, 4], // realism
  lossToLease: [-0.0815, 0.183],
  refiStressTest: [0, 0.2], // realism
  feeDragOnIrr: [0, 0.2], // realism
  leaseUpReserve: [93_750, 32.52e6],
  constructionLoanSizing: [1.65e6, 197.1e6],
  capexReserveSizing: [2_500, 9.585e6],
};

function* sweep(kind: QuestionKind): Generator<[Question, string]> {
  for (const d of DIFFICULTIES)
    for (const ac of assetClassOrder)
      for (let s = 1; s <= SEEDS_PER_COMBO; s++) {
        const seed = s * 7919 + 13;
        yield [templates[kind].generate(createRng(seed), d, ac), `${d}/${ac}/seed ${seed}`];
      }
}

function textOf(q: Question): string {
  return [
    q.prompt,
    ...q.solution.steps.flatMap((s) => [s.label, s.expression, s.result]),
    q.solution.answerDisplay,
  ].join(' \n ');
}

describe('question generators', () => {
  it('every kind has a realism band', () => {
    expect(allKinds.filter((k) => !(k in BOUNDS))).toEqual([]);
  });

  describe.each(allKinds as QuestionKind[])('%s', (kind) => {
    it('produces well-formed, realistic questions', () => {
      const [lo, hi] = BOUNDS[kind];
      const problems: string[] = [];
      const fail = (where: string, msg: string) => {
        if (problems.length < 5) problems.push(`${where}: ${msg}`);
      };
      for (const [q, where] of sweep(kind)) {
        if (!Number.isFinite(q.expected)) {
          fail(where, `non-finite answer ${q.expected}`);
          continue;
        }
        if (q.expected < lo || q.expected > hi)
          fail(where, `answer ${q.expected} outside [${lo}, ${hi}] — "${q.prompt.slice(0, 100)}"`);
        if (q.solution.steps.length === 0) fail(where, 'no solution steps');
        if (!(q.tolerance.band > 0)) fail(where, 'non-positive tolerance');

        const text = textOf(q);
        const bad = text.match(/\bundefined\b|\bNaN\b|Infinity|\[object Object\]/);
        if (bad) fail(where, `"${bad[0]}" in text: ${q.prompt.slice(0, 100)}`);
        const noise = text.match(/\S*\d\.\d{5,}\S*/);
        if (noise) fail(where, `float noise "${noise[0]}"`);
        const adj = q.prompt.match(/\b\d+(\.\d+)? years (hold|lease|loan|amortiz\w*)/i);
        if (adj) fail(where, `"${adj[0]}" should be hyphenated (formatYearsAdj)`);

        const choices = buildChoices(q, createRng(1));
        if (choices.length !== 4) fail(where, `${choices.length} MC choices`);
        if (!choices.some((c) => Math.abs(c - q.expected) < 1e-9)) fail(where, 'MC choices missing the answer');
        const isChange = q.unit === 'usdChange' || q.unit === 'pctChange';
        if (!isChange && q.expected > 0 && choices.some((c) => c <= 0))
          fail(where, `non-positive MC option for a positive level: ${choices.join(', ')}`);
      }
      expect(problems).toEqual([]);
    });
  });
});
