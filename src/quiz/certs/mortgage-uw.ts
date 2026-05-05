import type { Cert } from '../../types/cert';

/**
 * Mortgage Underwriter Certified — depth on the lender's perspective: DSCR,
 * debt yield, loan sizing, sponsor analysis, and refi-stress.
 * Prereq: CRE Fundamentals.
 */
export const mortgageUw: Cert = {
  id: 'mortgage-uw',
  title: 'Mortgage UW Certified',
  description:
    'Depth on the lender side: DSCR and debt-yield discipline, loan sizing under multiple constraints, covenant structures, and refi-stress scenarios.',
  prerequisiteCertId: 'cre-fundamentals',
  role: 'mortgageUw',
  modules: [
    {
      id: 'uw-m1-coverage',
      title: 'DSCR + debt yield',
      description:
        'The two coverage metrics every lender quotes; how they constrain proceeds.',
      benchmarks: [
        {
          id: 'uw-m1-quiz',
          kind: 'quizAccuracy',
          label: 'Coverage quiz',
          kindSet: [
            'debtYield',
            'dscrFromNoiAndDs',
            'dscrTestPasses',
            'dscrSensitivityRate',
          ],
          minAccuracyPct: 0.85,
          minAttempts: 30,
          minDifficulty: 'intermediate',
        },
        {
          id: 'uw-m1-situational',
          kind: 'situationalCorrect',
          label: 'Coverage reasoning',
          caseIds: ['debt-yield-vs-dscr', 'dscr-refi-failing'],
          minBestAnswerPct: 0.75,
          minAttempts: 4,
        },
      ],
    },
    {
      id: 'uw-m2-sizing',
      title: 'Loan sizing + covenants',
      description:
        'Size the loan against DSCR / LTV / debt-yield in parallel; pick the binding constraint and explain the covenant package.',
      benchmarks: [
        {
          id: 'uw-m2-quiz',
          kind: 'quizAccuracy',
          label: 'Loan-sizing math quiz',
          kindSet: ['dscrLoanSizing', 'loanConstant', 'breakEvenOccupancy'],
          minAccuracyPct: 0.8,
          minAttempts: 25,
          minDifficulty: 'intermediate',
        },
        {
          id: 'uw-m2-walk',
          kind: 'walkthroughComplete',
          label: 'DSCR loan-sizing walkthrough',
          walkId: 'walk-dscr-1',
          minStepAccuracyPct: 0.85,
        },
        {
          id: 'uw-m2-excel',
          kind: 'excelTemplate',
          label: 'Loan sizing in Excel',
          templateIds: ['loan-sizing-dscr', 'amortization-principal'],
          minPassRatePct: 1.0,
        },
      ],
    },
    {
      id: 'uw-m3-sponsor',
      title: 'Sponsor analysis + recourse',
      description:
        'Read sponsor strength signals; choose between recourse, financial covenants, and reserve structures.',
      benchmarks: [
        {
          id: 'uw-m3-situational',
          kind: 'situationalCorrect',
          label: 'Sponsor + structure reasoning',
          caseIds: [
            'sponsor-recourse-vs-covenants',
            'sponsor-proforma-aggressive',
            'covenant-testing-cadence',
            'tenant-credit-pricing',
            'waterfall-clawback-mechanics',
            'waterfall-key-person-event',
          ],
          minBestAnswerPct: 0.75,
          minAttempts: 10,
        },
      ],
    },
    {
      id: 'uw-m4-refi-stress',
      title: 'Refi stress + risk',
      description:
        'Stress the deal at exit: cap-rate widening, rate moves, distressed workouts.',
      benchmarks: [
        {
          id: 'uw-m4-situational',
          kind: 'situationalCorrect',
          label: 'Refi-stress reasoning',
          caseIds: [
            'refi-cap-stress',
            'distressed-loan-workout',
            'dscr-refi-failing',
          ],
          minBestAnswerPct: 0.75,
          minAttempts: 6,
        },
        {
          id: 'uw-m4-walk',
          kind: 'walkthroughComplete',
          label: 'Distressed-loan walkthrough',
          walkId: 'walk-distressed-1',
          minStepAccuracyPct: 0.8,
        },
      ],
    },
    {
      id: 'uw-m5-loan-docs',
      title: 'Loan-document literacy',
      description:
        'Read DSCR / cash-trap / springing-recourse / cure-rights language as it actually appears in loan docs.',
      benchmarks: [
        {
          id: 'uw-m5-situational',
          kind: 'situationalCorrect',
          label: 'DSCR + remedies doc-literacy',
          caseIds: [
            'dscr-test-timing-mechanics',
            'dscr-cash-trap-trigger',
            'dscr-cure-rights',
            'dscr-springing-recourse',
          ],
          minBestAnswerPct: 0.75,
          minAttempts: 6,
        },
      ],
    },
  ],
  finalExam: {
    totalQuestions: 20,
    composition: [
      { mode: 'quiz', count: 10 },
      { mode: 'situational', count: 5 },
      { mode: 'excel', count: 2 },
      { mode: 'walkthrough', count: 3 },
    ],
    passThresholdPct: 0.78,
    contentScopes: {
      quizKinds: [
        'debtYield',
        'dscrFromNoiAndDs',
        'dscrTestPasses',
        'dscrSensitivityRate',
        'dscrLoanSizing',
        'loanConstant',
        'breakEvenOccupancy',
        'cashOnCash',
        'leveredIrr',
        'extensionDrag',
      ],
      situationalIds: [
        'debt-yield-vs-dscr',
        'dscr-refi-failing',
        'sponsor-recourse-vs-covenants',
        'sponsor-proforma-aggressive',
        'covenant-testing-cadence',
        'refi-cap-stress',
        'distressed-loan-workout',
        'waterfall-clawback-mechanics',
        'waterfall-key-person-event',
        'dscr-test-timing-mechanics',
        'dscr-cash-trap-trigger',
        'dscr-cure-rights',
        'dscr-springing-recourse',
      ],
      excelIds: ['loan-sizing-dscr', 'amortization-principal'],
      walkIds: ['walk-dscr-1', 'walk-distressed-1', 'walk-combined-1'],
    },
  },
};
