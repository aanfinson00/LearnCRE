import type { MockArchetypeSpec } from '../../../types/mockInterview';

/**
 * Mega-Fund Acquisitions — KKR / Blackstone / Brookfield-style mock.
 * Heavy quant orientation, deal-defense format. ~30 minutes / 8 prompts.
 *
 * Slot mix:
 *   1 fit (opening)
 *   1 behavioral (mid-round)
 *   3 technical (math drills, intermediate-advanced difficulty)
 *   1 situational (case-style judgment)
 *   1 longform (defend-a-bid prose)
 *   1 market view (closing)
 */
export const MEGA_FUND_ACQ: MockArchetypeSpec = {
  id: 'mega-fund-acq',
  title: 'Mega-Fund Acquisitions',
  description:
    'Quant-heavy mock interview, KKR / Blackstone / Brookfield style. Expect tight math drills, a deal-defense longform, and one market-view question. ~30 minutes.',
  durationMin: 30,
  roles: ['acquisitions', 'portfolioMgmt'],
  composition: [
    { kind: 'fit', sectionLabel: 'Opening · Fit' },
    { kind: 'technical', difficulty: 'intermediate', sectionLabel: 'Quant warm-up' },
    { kind: 'technical', difficulty: 'intermediate', sectionLabel: 'Quant · Returns' },
    { kind: 'technical', difficulty: 'advanced', sectionLabel: 'Quant · Waterfall' },
    { kind: 'situational', sectionLabel: 'Case · OM red-flags' },
    { kind: 'behavioral', sectionLabel: 'Behavioral' },
    { kind: 'longform', sectionLabel: 'Deal defense' },
    { kind: 'marketView', sectionLabel: 'Closing · Market view' },
  ],
  contentScopes: {
    technicalKindPool: [
      // Core valuation
      'capCompression',
      'goingInCap',
      'combinedScenario',
      // Returns
      'irrSimple',
      'equityMultiple',
      'targetMultiple',
      'leveredIrr',
      // Waterfall (advanced slot)
      'prefAccrual',
      'gpCatchUp',
      'gpEffectivePromote',
      'irrAfterPromote',
      // Pricing
      'pricePerSf',
      'pricePerUnit',
      'allInBasis',
    ],
    situationalIdPool: [
      'om-red-flags',
      'sponsor-proforma-aggressive',
      'comp-set-vetting',
      'exit-cap-conservatism',
      'mark-to-market-upside',
      'noi-growth-smell-test',
      'tenant-credit-pricing',
    ],
    longformIdPool: ['walk-me-through-bid', 'defend-deal-to-ic', 'defend-waterfall-terms'],
    fitIdPool: ['fit-tell-me-about-yourself', 'fit-why-cre', 'fit-why-this-firm'],
    behavioralIdPool: [
      'beh-disagree-with-vp',
      'beh-failed-deal',
      'beh-data-vs-instinct',
      'beh-mentor-feedback',
      'beh-time-pressure',
    ],
    marketViewIdPool: [
      'mv-cap-rate-direction',
      'mv-sector-overweight',
      'mv-debt-equity-mix',
    ],
  },
};
