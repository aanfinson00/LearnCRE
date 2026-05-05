import type { Cert } from '../../types/cert';

/**
 * CRE Fundamentals — the foundational cert. Prerequisite for the role-
 * specific certs. Covers: cap rates, NOI/proforma, returns, debt basics.
 *
 * Module benchmarks lean on existing content; no new content authoring is
 * required to ship this cert. Thresholds are intentionally tight enough
 * to mean "real proficiency" but not so tight that a single bad day blocks
 * progress (the minAttempts smoothing handles volatility).
 */

export const creFundamentals: Cert = {
  id: 'cre-fundamentals',
  title: 'CRE Fundamentals',
  description:
    'The foundation any CRE analyst needs: cap rates, NOI math, returns, and debt basics. Prerequisite for the role-specific certs.',
  modules: [
    {
      id: 'fundamentals-m1-caps',
      title: 'Cap rates + value',
      description:
        'Going-in cap, cap compression, combined-scenario value mechanics. Master the income → value bridge.',
      benchmarks: [
        {
          id: 'fundamentals-m1-quiz',
          kind: 'quizAccuracy',
          label: 'Cap-rate quiz accuracy',
          kindSet: ['capCompression', 'goingInCap', 'combinedScenario'],
          minAccuracyPct: 0.8,
          minAttempts: 30,
          minDifficulty: 'intermediate',
        },
        {
          id: 'fundamentals-m1-situational',
          kind: 'situationalCorrect',
          label: 'Cap-rate situational reasoning',
          caseIds: ['cap-rate-divergence', 'going-in-vs-exit-cap-spread'],
          minBestAnswerPct: 0.7,
          minAttempts: 4,
        },
      ],
    },
    {
      id: 'fundamentals-m2-noi',
      title: 'NOI + proforma',
      description:
        'Build a full proforma from gross income to value, and diagnose NOI assumptions.',
      benchmarks: [
        {
          id: 'fundamentals-m2-walk',
          kind: 'walkthroughComplete',
          label: 'Combined-scenario walkthrough',
          walkId: 'walk-combined-1',
          minStepAccuracyPct: 0.8,
        },
        {
          id: 'fundamentals-m2-situational',
          kind: 'situationalCorrect',
          label: 'NOI diagnostic reasoning',
          caseIds: ['noi-growth-smell-test', 'noi-growth-missing'],
          minBestAnswerPct: 0.7,
          minAttempts: 4,
        },
        {
          id: 'fundamentals-m2-excel',
          kind: 'excelTemplate',
          label: 'NOI roll-forward in Excel',
          templateIds: ['noi-roll-forward'],
          minPassRatePct: 1.0,
        },
      ],
    },
    {
      id: 'fundamentals-m3-returns',
      title: 'Returns: IRR + EM',
      description:
        'Equity multiple, single-period IRR, target multiple — the three numbers every analyst quotes.',
      benchmarks: [
        {
          id: 'fundamentals-m3-quiz',
          kind: 'quizAccuracy',
          label: 'Returns quiz accuracy',
          kindSet: ['irrSimple', 'equityMultiple', 'targetMultiple'],
          minAccuracyPct: 0.8,
          minAttempts: 30,
          minDifficulty: 'intermediate',
        },
        {
          id: 'fundamentals-m3-excel',
          kind: 'excelTemplate',
          label: 'Equity multiple + IRR in Excel',
          templateIds: ['equity-multiple', 'irr-from-cashflows'],
          minPassRatePct: 1.0,
        },
      ],
    },
    {
      id: 'fundamentals-m4-debt',
      title: 'Debt basics',
      description:
        'Debt yield, DSCR, and the loan-sizing math that constrains every levered deal.',
      benchmarks: [
        {
          id: 'fundamentals-m4-quiz',
          kind: 'quizAccuracy',
          label: 'Debt-side quiz accuracy',
          kindSet: ['debtYield', 'dscrLoanSizing', 'dscrFromNoiAndDs'],
          minAccuracyPct: 0.8,
          minAttempts: 30,
          minDifficulty: 'intermediate',
        },
        {
          id: 'fundamentals-m4-walk',
          kind: 'walkthroughComplete',
          label: 'DSCR loan-sizing walkthrough',
          walkId: 'walk-dscr-1',
          minStepAccuracyPct: 0.8,
        },
      ],
    },
  ],
  finalExam: {
    totalQuestions: 20,
    composition: [
      { mode: 'quiz', count: 12 },
      { mode: 'situational', count: 5 },
      { mode: 'excel', count: 2 },
      { mode: 'walkthrough', count: 1 },
    ],
    passThresholdPct: 0.75,
    contentScopes: {
      quizKinds: [
        'capCompression',
        'goingInCap',
        'combinedScenario',
        'irrSimple',
        'equityMultiple',
        'targetMultiple',
        'debtYield',
        'dscrLoanSizing',
        'dscrFromNoiAndDs',
      ],
      situationalIds: [
        'cap-rate-divergence',
        'going-in-vs-exit-cap-spread',
        'noi-growth-smell-test',
        'noi-growth-missing',
        'mark-to-market-upside',
      ],
      excelIds: ['noi-roll-forward', 'equity-multiple', 'irr-from-cashflows'],
      walkIds: ['walk-combined-1', 'walk-dscr-1'],
    },
  },
};
