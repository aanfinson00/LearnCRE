import type { Cert } from '../../types/cert';

/**
 * Developer Certified — depth on ground-up + value-add: yield on cost,
 * construction debt, draw mechanics, and feasibility.
 * Prereq: CRE Fundamentals.
 */
export const developer: Cert = {
  id: 'developer',
  title: 'Developer Certified',
  description:
    'Depth on ground-up and value-add development: yield on cost, construction debt sizing, cost-overrun discipline, and feasibility analysis.',
  prerequisiteCertId: 'cre-fundamentals',
  role: 'development',
  modules: [
    {
      id: 'dev-m1-yoc',
      title: 'Yield on cost + dev spread',
      description:
        'YoC, the dev-spread vs market cap, and how the spread sets the bid for land + cost.',
      benchmarks: [
        {
          id: 'dev-m1-quiz',
          kind: 'quizAccuracy',
          label: 'Yield-on-cost + dev-spread quiz',
          kindSet: ['yieldOnCost', 'devSpread', 'allInBasis', 'replacementCost'],
          minAccuracyPct: 0.8,
          minAttempts: 25,
          minDifficulty: 'intermediate',
        },
        {
          id: 'dev-m1-situational',
          kind: 'situationalCorrect',
          label: 'Dev-spread reasoning',
          caseIds: ['dev-ltc-vs-ltv'],
          minBestAnswerPct: 0.7,
          minAttempts: 2,
        },
      ],
    },
    {
      id: 'dev-m2-debt',
      title: 'Construction debt sizing',
      description:
        'LTC vs LTV, debt-yield-on-stabilized, and construction loan structure.',
      benchmarks: [
        {
          id: 'dev-m2-quiz',
          kind: 'quizAccuracy',
          label: 'Construction-debt math quiz',
          kindSet: ['debtYield', 'dscrLoanSizing', 'loanConstant'],
          minAccuracyPct: 0.75,
          minAttempts: 20,
          minDifficulty: 'intermediate',
        },
        {
          id: 'dev-m2-situational',
          kind: 'situationalCorrect',
          label: 'LTC vs LTV reasoning',
          caseIds: ['dev-ltc-vs-ltv', 'sponsor-recourse-vs-covenants'],
          minBestAnswerPct: 0.7,
          minAttempts: 4,
        },
      ],
    },
    {
      id: 'dev-m3-cost-draws',
      title: 'Cost overruns + draw mechanics',
      description:
        'Cost overruns, the draw process, retainage mechanics, and how lender draws + sponsor equity interact.',
      benchmarks: [
        {
          id: 'dev-m3-quiz',
          kind: 'quizAccuracy',
          label: 'Draw + cost-overrun math',
          kindSet: [
            'costToComplete',
            'drawAllocation',
            'retainageRunning',
            'contingencyDrawDown',
          ],
          minAccuracyPct: 0.8,
          minAttempts: 25,
          minDifficulty: 'intermediate',
        },
        {
          id: 'dev-m3-walk',
          kind: 'walkthroughComplete',
          label: 'Construction draw cycle walkthrough',
          walkId: 'walk-construction-draw-1',
          minStepAccuracyPct: 0.8,
        },
        {
          id: 'dev-m3-excel',
          kind: 'excelTemplate',
          label: 'Cost-to-complete + draw schedule in Excel',
          templateIds: ['cost-to-complete', 'draw-schedule-12mo'],
          minPassRatePct: 1.0,
        },
        {
          id: 'dev-m3-situational',
          kind: 'situationalCorrect',
          label: 'Construction process + contract reasoning',
          caseIds: [
            'construction-cost-overrun',
            'lender-draw-mechanics',
            'capital-call-mechanics',
            'bank-account-structure',
            'construction-liquidated-damages',
            'construction-equity-first-vs-paripassu',
            'construction-change-order-pricing',
            'construction-retainage-release-trigger',
          ],
          minBestAnswerPct: 0.7,
          minAttempts: 10,
        },
      ],
    },
    {
      id: 'dev-m4-feasibility',
      title: 'Development feasibility',
      description:
        'Run a full feasibility — land + hard + soft + financing → stabilized value vs all-in cost.',
      benchmarks: [
        {
          id: 'dev-m4-walk',
          kind: 'walkthroughComplete',
          label: 'Development feasibility walkthrough',
          walkId: 'walk-dev-feasibility-1',
          minStepAccuracyPct: 0.8,
        },
        {
          id: 'dev-m4-walk-valueadd',
          kind: 'walkthroughComplete',
          label: 'Value-add walkthrough',
          walkId: 'walk-am-valueadd-1',
          minStepAccuracyPct: 0.8,
        },
      ],
    },
  ],
  finalExam: {
    totalQuestions: 22,
    composition: [
      { mode: 'quiz', count: 12 },
      { mode: 'situational', count: 6 },
      { mode: 'walkthrough', count: 2 },
      { mode: 'excel', count: 2 },
    ],
    passThresholdPct: 0.75,
    contentScopes: {
      quizKinds: [
        'yieldOnCost',
        'devSpread',
        'allInBasis',
        'replacementCost',
        'debtYield',
        'dscrLoanSizing',
        'loanConstant',
        'cashOnCash',
        'goingInCap',
        'combinedScenario',
        'costToComplete',
        'drawAllocation',
        'retainageRunning',
        'contingencyDrawDown',
      ],
      situationalIds: [
        'dev-ltc-vs-ltv',
        'sponsor-recourse-vs-covenants',
        'construction-cost-overrun',
        'lender-draw-mechanics',
        'capital-call-mechanics',
        'bank-account-structure',
        'om-red-flags',
        'construction-liquidated-damages',
        'lpa-cost-overrun-sharing',
        'construction-equity-first-vs-paripassu',
        'construction-change-order-pricing',
        'construction-retainage-release-trigger',
      ],
      walkIds: [
        'walk-dev-feasibility-1',
        'walk-am-valueadd-1',
        'walk-construction-draw-1',
      ],
      excelIds: [
        'per-unit-normalization',
        'reversion-value',
        'cost-to-complete',
        'draw-schedule-12mo',
      ],
    },
  },
};
