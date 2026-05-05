import type { Cert } from '../../types/cert';

/**
 * Acquisitions Analyst Certified — depth on the deal-screening + bid side.
 * Prereq: CRE Fundamentals.
 */
export const acqAnalyst: Cert = {
  id: 'acq-analyst',
  title: 'Acquisitions Analyst Certified',
  description:
    'Depth on deal screening, comp-set vetting, mark-to-market, and disciplined bidding. Built for analysts on the buy-side underwriting team.',
  prerequisiteCertId: 'cre-fundamentals',
  role: 'acquisitions',
  modules: [
    {
      id: 'acq-m1-comps',
      title: 'Comp set + pricing',
      description:
        'Pick comps, adjust for vintage and submarket, and translate the comp range into a defensible price.',
      benchmarks: [
        {
          id: 'acq-m1-quiz',
          kind: 'quizAccuracy',
          label: 'Pricing-math quiz',
          kindSet: ['pricePerSf', 'pricePerUnit', 'allInBasis', 'replacementCost'],
          minAccuracyPct: 0.8,
          minAttempts: 25,
          minDifficulty: 'intermediate',
        },
        {
          id: 'acq-m1-situational',
          kind: 'situationalCorrect',
          label: 'Comp + pricing situational reasoning',
          caseIds: [
            'comp-set-vetting',
            'comp-vintage-adjustment',
            'tenant-credit-pricing',
          ],
          minBestAnswerPct: 0.7,
          minAttempts: 6,
        },
      ],
    },
    {
      id: 'acq-m2-mtm',
      title: 'Mark-to-market + rent roll',
      description:
        'Read a rent roll, identify embedded mark-to-market upside, and convert it into a value lift.',
      benchmarks: [
        {
          id: 'acq-m2-quiz',
          kind: 'quizAccuracy',
          label: 'Lease-economics quiz',
          kindSet: ['netEffectiveRent', 'rentRollChange', 'rentChange', 'tiVsRent'],
          minAccuracyPct: 0.75,
          minAttempts: 20,
          minDifficulty: 'intermediate',
        },
        {
          id: 'acq-m2-situational',
          kind: 'situationalCorrect',
          label: 'Mark-to-market situational reasoning',
          caseIds: [
            'mark-to-market-upside',
            'rent-roll-undervalued',
            'trended-vs-inplace-leaseup',
          ],
          minBestAnswerPct: 0.7,
          minAttempts: 6,
        },
        {
          id: 'acq-m2-excel',
          kind: 'excelTemplate',
          label: 'Mark-to-market lift in Excel',
          templateIds: ['mark-to-market-lift'],
          minPassRatePct: 1.0,
        },
      ],
    },
    {
      id: 'acq-m3-discipline',
      title: 'Underwriting discipline + sponsor pro forma re-cuts',
      description:
        'Push back on aggressive sponsor assumptions. Identify which line items move the price and by how much.',
      benchmarks: [
        {
          id: 'acq-m3-situational',
          kind: 'situationalCorrect',
          label: 'OM + PSA reasoning',
          caseIds: [
            'sponsor-proforma-aggressive',
            'om-red-flags',
            'noi-growth-smell-test',
            'exit-cap-conservatism',
            'psa-earnest-money-default',
          ],
          minBestAnswerPct: 0.75,
          minAttempts: 8,
        },
        {
          id: 'acq-m3-longform',
          kind: 'longformScore',
          label: '"Walk me through your bid" long-form',
          caseIds: ['walk-me-through-bid'],
          minAvgScorePct: 0.7,
        },
      ],
    },
    {
      id: 'acq-m4-mock',
      title: 'Mock acquisition + JV terms',
      description:
        'Run an acquisition end-to-end: chained underwrite, IRR target, IC-style defense, and JV-structure negotiation.',
      benchmarks: [
        {
          id: 'acq-m4-walk',
          kind: 'walkthroughComplete',
          label: 'Mock acquisition walkthrough',
          walkId: 'walk-acq-mock-1',
          minStepAccuracyPct: 0.8,
        },
        {
          id: 'acq-m4-longform',
          kind: 'longformScore',
          label: '"Defend the deal to IC" long-form',
          caseIds: ['defend-deal-to-ic'],
          minAvgScorePct: 0.7,
        },
        {
          id: 'acq-m4-waterfall-longform',
          kind: 'longformScore',
          label: '"Defend the waterfall terms" long-form',
          caseIds: ['defend-waterfall-terms'],
          minAvgScorePct: 0.7,
        },
      ],
    },
  ],
  finalExam: {
    totalQuestions: 20,
    composition: [
      { mode: 'quiz', count: 10 },
      { mode: 'situational', count: 6 },
      { mode: 'excel', count: 2 },
      { mode: 'walkthrough', count: 1 },
      { mode: 'longform', count: 1 },
    ],
    passThresholdPct: 0.75,
    contentScopes: {
      quizKinds: [
        'pricePerSf',
        'pricePerUnit',
        'allInBasis',
        'netEffectiveRent',
        'rentRollChange',
        'rentChange',
        'tiVsRent',
        'goingInCap',
        'combinedScenario',
        'capCompression',
        'revparFromAdrOcc',
        'gopMargin',
        'walt',
        'lossToLease',
        'salesPerSf',
        'clearHeightPremium',
      ],
      situationalIds: [
        'comp-set-vetting',
        'comp-vintage-adjustment',
        'mark-to-market-upside',
        'rent-roll-undervalued',
        'sponsor-proforma-aggressive',
        'om-red-flags',
        'exit-cap-conservatism',
        'tenant-credit-pricing',
        'psa-earnest-money-default',
      ],
      excelIds: ['mark-to-market-lift', 'cap-rate-from-comps'],
      walkIds: ['walk-acq-mock-1', 'walk-hotel-revpar-1', 'walk-office-walt-1'],
      longformIds: ['walk-me-through-bid', 'defend-deal-to-ic', 'defend-waterfall-terms'],
    },
  },
};
