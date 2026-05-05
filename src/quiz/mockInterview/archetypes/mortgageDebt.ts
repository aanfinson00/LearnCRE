import type { MockArchetypeSpec } from '../../../types/mockInterview';

/**
 * Mortgage / Debt Fund — credit-side underwriting mock. DSCR / debt
 * yield / loan-doc literacy heavy. Downside-stress thinking. ~30
 * minutes / 8 prompts.
 *
 * Lender mocks differ from equity-side mocks: less interest in upside
 * IRR scenarios, more in downside breakage points and structural
 * protections (covenants, recourse carve-outs, cash sweeps, cure rights).
 */
export const MORTGAGE_DEBT: MockArchetypeSpec = {
  id: 'mortgage-debt',
  title: 'Mortgage / Debt Fund',
  description:
    'Credit-side mock — DSCR + debt yield, loan-doc mechanics, downside-stress focus. ~30 minutes.',
  durationMin: 30,
  roles: ['mortgageUw'],
  composition: [
    { kind: 'fit', sectionLabel: 'Opening · Fit' },
    { kind: 'technical', difficulty: 'intermediate', sectionLabel: 'Quant · Coverage' },
    { kind: 'technical', difficulty: 'intermediate', sectionLabel: 'Quant · Loan sizing' },
    { kind: 'technical', difficulty: 'advanced', sectionLabel: 'Quant · DSCR stress' },
    { kind: 'situational', sectionLabel: 'Case · Loan-doc mechanics' },
    { kind: 'situational', sectionLabel: 'Case · Sponsor / structure' },
    { kind: 'longform', sectionLabel: 'Defend the credit decision' },
    { kind: 'marketView', sectionLabel: 'Market view · Lender spreads' },
  ],
  contentScopes: {
    technicalKindPool: [
      // Coverage
      'debtYield',
      'dscrFromNoiAndDs',
      'dscrTestPasses',
      'dscrSensitivityRate',
      // Loan sizing
      'dscrLoanSizing',
      'loanConstant',
      'breakEvenOccupancy',
      // Stress / sensitivities
      'extensionDrag',
      'cashOnCash',
      // Construction (for debt funds doing construction)
      'costToComplete',
      'drawAllocation',
      'retainageRunning',
    ],
    situationalIdPool: [
      'debt-yield-vs-dscr',
      'dscr-refi-failing',
      'sponsor-recourse-vs-covenants',
      'sponsor-proforma-aggressive',
      'covenant-testing-cadence',
      'refi-cap-stress',
      'distressed-loan-workout',
      'dscr-test-timing-mechanics',
      'dscr-cash-trap-trigger',
      'dscr-cure-rights',
      'dscr-springing-recourse',
      'waterfall-clawback-mechanics',
      'waterfall-key-person-event',
    ],
    longformIdPool: ['defend-deal-to-ic', 'refi-or-sell-memo'],
    fitIdPool: ['fit-tell-me-about-yourself', 'fit-why-cre', 'fit-why-this-firm'],
    behavioralIdPool: [
      'beh-credit-decision',
      'beh-data-vs-instinct',
      'beh-disagree-with-vp',
    ],
    marketViewIdPool: ['mv-lender-spread-direction', 'mv-debt-equity-mix'],
  },
};
