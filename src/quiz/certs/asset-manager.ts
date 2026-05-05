import type { Cert } from '../../types/cert';

/**
 * Asset Manager Certified — depth on running an asset post-close: NOI growth,
 * lease management, hold/refi/sell, and capex discipline.
 * Prereq: CRE Fundamentals.
 */
export const assetManager: Cert = {
  id: 'asset-manager',
  title: 'Asset Manager Certified',
  description:
    'Depth on running a stabilized asset: NOI growth and variance, lease economics, hold/refi/sell decisions, and capex discipline.',
  prerequisiteCertId: 'cre-fundamentals',
  role: 'assetManagement',
  modules: [
    {
      id: 'am-m1-noi-growth',
      title: 'NOI growth + variance',
      description:
        'Diagnose why actuals diverge from budget; trace the variance to the line items that matter.',
      benchmarks: [
        {
          id: 'am-m1-quiz',
          kind: 'quizAccuracy',
          label: 'NOI + OpEx quiz',
          kindSet: [
            'rentChange',
            'opexChange',
            'noiFromOer',
            'operatingExpenseRatio',
          ],
          minAccuracyPct: 0.8,
          minAttempts: 25,
          minDifficulty: 'intermediate',
        },
        {
          id: 'am-m1-situational',
          kind: 'situationalCorrect',
          label: 'NOI variance reasoning',
          caseIds: [
            'noi-growth-smell-test',
            'noi-growth-missing',
            'budget-vs-actual-variance',
          ],
          minBestAnswerPct: 0.7,
          minAttempts: 6,
        },
        {
          id: 'am-m1-longform',
          kind: 'longformScore',
          label: '"Diagnose the NOI miss" long-form',
          caseIds: ['diagnose-noi-miss'],
          minAvgScorePct: 0.7,
        },
      ],
    },
    {
      id: 'am-m2-leases',
      title: 'Lease management',
      description:
        'Net effective rent, TI economics, and rollover concentration risk.',
      benchmarks: [
        {
          id: 'am-m2-quiz',
          kind: 'quizAccuracy',
          label: 'Lease-economics quiz',
          kindSet: ['netEffectiveRent', 'tiVsRent', 'tiPayback', 'rentRollChange'],
          minAccuracyPct: 0.75,
          minAttempts: 25,
          minDifficulty: 'intermediate',
        },
        {
          id: 'am-m2-situational',
          kind: 'situationalCorrect',
          label: 'Lease + rollover reasoning',
          caseIds: [
            'ti-vs-rent-giveback',
            'rollover-concentration',
            'lease-structure-nnn-vs-gross',
            'tenant-improvement-approval',
          ],
          minBestAnswerPct: 0.7,
          minAttempts: 8,
        },
      ],
    },
    {
      id: 'am-m3-holdsell',
      title: 'Hold / refi / sell',
      description:
        'Frame the hold-vs-sell decision quantitatively; understand when a refi unlocks more value than a sale.',
      benchmarks: [
        {
          id: 'am-m3-quiz',
          kind: 'quizAccuracy',
          label: 'Hold/sell + return-extension quiz',
          kindSet: ['holdVsSellIrr', 'extensionDrag', 'taxAdjustedExit'],
          minAccuracyPct: 0.75,
          minAttempts: 20,
          minDifficulty: 'intermediate',
        },
        {
          id: 'am-m3-walk',
          kind: 'walkthroughComplete',
          label: 'Hold-vs-sell walkthrough',
          walkId: 'walk-am-holdsell-1',
          minStepAccuracyPct: 0.8,
        },
        {
          id: 'am-m3-situational',
          kind: 'situationalCorrect',
          label: 'Hold/refi/sell reasoning',
          caseIds: [
            'refi-vs-sell',
            'hold-extension-discipline',
            'tax-vs-irr-tradeoff',
          ],
          minBestAnswerPct: 0.7,
          minAttempts: 6,
        },
        {
          id: 'am-m3-longform',
          kind: 'longformScore',
          label: '"Refi or sell" memo long-form',
          caseIds: ['refi-or-sell-memo'],
          minAvgScorePct: 0.7,
        },
      ],
    },
    {
      id: 'am-m4-capex',
      title: 'Capex + reserves',
      description:
        'Size capex reserves correctly; defend value-add capex on yield grounds.',
      benchmarks: [
        {
          id: 'am-m4-walk',
          kind: 'walkthroughComplete',
          label: 'Value-add capex walkthrough',
          walkId: 'walk-am-valueadd-1',
          minStepAccuracyPct: 0.8,
        },
        {
          id: 'am-m4-situational',
          kind: 'situationalCorrect',
          label: 'Capex reserve discipline',
          caseIds: ['capex-reserve-discipline', 'tax-reassessment-surprise'],
          minBestAnswerPct: 0.7,
          minAttempts: 4,
        },
      ],
    },
  ],
  finalExam: {
    totalQuestions: 20,
    composition: [
      { mode: 'quiz', count: 10 },
      { mode: 'situational', count: 6 },
      { mode: 'walkthrough', count: 2 },
      { mode: 'longform', count: 2 },
    ],
    passThresholdPct: 0.75,
    contentScopes: {
      quizKinds: [
        'rentChange',
        'opexChange',
        'noiFromOer',
        'operatingExpenseRatio',
        'netEffectiveRent',
        'tiVsRent',
        'tiPayback',
        'holdVsSellIrr',
        'extensionDrag',
        'taxAdjustedExit',
      ],
      situationalIds: [
        'noi-growth-smell-test',
        'noi-growth-missing',
        'budget-vs-actual-variance',
        'ti-vs-rent-giveback',
        'rollover-concentration',
        'refi-vs-sell',
        'hold-extension-discipline',
        'capex-reserve-discipline',
      ],
      walkIds: ['walk-am-holdsell-1', 'walk-am-valueadd-1'],
      longformIds: ['diagnose-noi-miss', 'refi-or-sell-memo'],
    },
  },
};
