import type { Cert } from '../../types/cert';

/**
 * Portfolio Manager Certified — depth on multi-asset thinking: weighting,
 * fund-level math, hold/sell across assets, and tax-aware decisions.
 * Prereq: CRE Fundamentals.
 */
export const portfolioManager: Cert = {
  id: 'portfolio-manager',
  title: 'Portfolio Manager Certified',
  description:
    'Depth on multi-asset and fund-level thinking: diversification math, J-curve and fee drag, tax-aware hold/sell, and waterfall mechanics.',
  prerequisiteCertId: 'cre-fundamentals',
  role: 'portfolioMgmt',
  modules: [
    {
      id: 'pm-m1-weighting',
      title: 'Weighting + diversification',
      description:
        'Weighted-average return math; sector/geography concentration risk.',
      benchmarks: [
        {
          id: 'pm-m1-quiz',
          kind: 'quizAccuracy',
          label: 'Weighted-return + growth quiz',
          kindSet: [
            'cagr',
            'compoundGrowth',
            'targetMultiple',
            'equityMultiple',
            'irrSimple',
          ],
          minAccuracyPct: 0.8,
          minAttempts: 25,
          minDifficulty: 'intermediate',
        },
        {
          id: 'pm-m1-situational',
          kind: 'situationalCorrect',
          label: 'Concentration + diversification reasoning',
          caseIds: ['over-weight-office', 'rollover-concentration'],
          minBestAnswerPct: 0.7,
          minAttempts: 4,
        },
      ],
    },
    {
      id: 'pm-m2-fund',
      title: 'Fund-level math',
      description:
        'Distribution waterfalls, fund vs deal IRR gap (fees + J-curve), and pacing.',
      benchmarks: [
        {
          id: 'pm-m2-situational',
          kind: 'situationalCorrect',
          label: 'Fund-level reasoning',
          caseIds: [
            'distribution-waterfall-1tier',
            'fund-vs-deal-irr-gap',
            'capital-call-mechanics',
          ],
          minBestAnswerPct: 0.7,
          minAttempts: 6,
        },
      ],
    },
    {
      id: 'pm-m3-holdsell',
      title: 'Hold / sell across the portfolio',
      description:
        'Frame portfolio-level hold/sell decisions, not just single-asset.',
      benchmarks: [
        {
          id: 'pm-m3-quiz',
          kind: 'quizAccuracy',
          label: 'Returns + extension quiz',
          kindSet: ['holdVsSellIrr', 'extensionDrag', 'reversionValue'],
          minAccuracyPct: 0.75,
          minAttempts: 20,
          minDifficulty: 'intermediate',
        },
        {
          id: 'pm-m3-situational',
          kind: 'situationalCorrect',
          label: 'Portfolio hold/sell reasoning',
          caseIds: [
            'refi-vs-sell',
            'hold-extension-discipline',
            'tax-vs-irr-tradeoff',
          ],
          minBestAnswerPct: 0.7,
          minAttempts: 6,
        },
        {
          id: 'pm-m3-longform',
          kind: 'longformScore',
          label: '"Refi or sell" memo long-form',
          caseIds: ['refi-or-sell-memo'],
          minAvgScorePct: 0.7,
        },
      ],
    },
    {
      id: 'pm-m4-tax',
      title: 'Tax-aware decisions',
      description:
        'Cost segregation, after-tax exit math, ground leases vs fee, and how tax basis changes outcomes.',
      benchmarks: [
        {
          id: 'pm-m4-quiz',
          kind: 'quizAccuracy',
          label: 'After-tax + reversion math quiz',
          kindSet: ['taxAdjustedExit', 'taxReassessment', 'reversionValue'],
          minAccuracyPct: 0.75,
          minAttempts: 18,
          minDifficulty: 'intermediate',
        },
        {
          id: 'pm-m4-situational',
          kind: 'situationalCorrect',
          label: 'Tax + structure reasoning',
          caseIds: [
            'cost-segregation-basics',
            'ground-lease-vs-fee',
            'tax-vs-irr-tradeoff',
          ],
          minBestAnswerPct: 0.7,
          minAttempts: 6,
        },
      ],
    },
  ],
  finalExam: {
    totalQuestions: 20,
    composition: [
      { mode: 'quiz', count: 11 },
      { mode: 'situational', count: 7 },
      { mode: 'excel', count: 1 },
      { mode: 'longform', count: 1 },
    ],
    passThresholdPct: 0.75,
    contentScopes: {
      quizKinds: [
        'cagr',
        'compoundGrowth',
        'targetMultiple',
        'equityMultiple',
        'irrSimple',
        'holdVsSellIrr',
        'extensionDrag',
        'reversionValue',
        'taxAdjustedExit',
        'taxReassessment',
      ],
      situationalIds: [
        'over-weight-office',
        'rollover-concentration',
        'distribution-waterfall-1tier',
        'fund-vs-deal-irr-gap',
        'capital-call-mechanics',
        'refi-vs-sell',
        'hold-extension-discipline',
        'tax-vs-irr-tradeoff',
        'cost-segregation-basics',
        'ground-lease-vs-fee',
      ],
      excelIds: ['equity-multiple', 'irr-from-cashflows'],
      longformIds: ['refi-or-sell-memo'],
    },
  },
};
