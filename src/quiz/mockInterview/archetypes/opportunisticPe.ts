import type { MockArchetypeSpec } from '../../../types/mockInterview';

/**
 * Opportunistic PE — Brookfield / Apollo / Carlyle-style mock. Heavy
 * waterfall + capital-stack focus, value-add deep-cut underwriting,
 * deal-defense + market-view weighting. ~30 minutes / 8 prompts.
 *
 * Differs from Mega-Fund Acq in two ways: (1) more advanced waterfall +
 * promote math (where Mega-Fund leans more on cap-rate + returns); (2)
 * heavier market-view ratio — this style of fund expects you to have
 * a thesis on the market, not just on the deal.
 */
export const OPPORTUNISTIC_PE: MockArchetypeSpec = {
  id: 'opportunistic-pe',
  title: 'Opportunistic PE',
  description:
    'Brookfield / Apollo / Carlyle-style mock — heavy waterfall + promote math, deep value-add cuts, two market views. ~30 minutes.',
  durationMin: 30,
  roles: ['acquisitions', 'portfolioMgmt'],
  composition: [
    { kind: 'fit', sectionLabel: 'Opening · Fit' },
    { kind: 'technical', difficulty: 'advanced', sectionLabel: 'Quant · Pref + cat-up' },
    { kind: 'technical', difficulty: 'advanced', sectionLabel: 'Quant · Promote economics' },
    { kind: 'situational', sectionLabel: 'Case · OM aggressive recut' },
    { kind: 'situational', sectionLabel: 'Case · Waterfall structure' },
    { kind: 'longform', sectionLabel: 'Defend the waterfall' },
    { kind: 'marketView', sectionLabel: 'Market view · Cycle' },
    { kind: 'marketView', sectionLabel: 'Market view · Sector' },
  ],
  contentScopes: {
    technicalKindPool: [
      'prefAccrual',
      'gpCatchUp',
      'gpEffectivePromote',
      'irrAfterPromote',
      'waterfallSimpleSplit',
      'targetMultiple',
      'leveredIrr',
      'capCompression',
    ],
    situationalIdPool: [
      'sponsor-proforma-aggressive',
      'om-red-flags',
      'exit-cap-conservatism',
      'noi-growth-smell-test',
      'waterfall-european-vs-american',
      'waterfall-catchup-mechanics',
      'waterfall-irr-vs-moic-hurdle',
      'waterfall-clawback-mechanics',
      'waterfall-pref-compound-vs-simple',
      'lpa-capital-call-default',
      'lpa-cost-overrun-sharing',
    ],
    longformIdPool: ['defend-waterfall-terms', 'defend-deal-to-ic', 'walk-me-through-bid'],
    fitIdPool: ['fit-tell-me-about-yourself', 'fit-why-cre', 'fit-why-this-firm'],
    behavioralIdPool: [
      'beh-disagree-with-vp',
      'beh-failed-deal',
      'beh-data-vs-instinct',
    ],
    marketViewIdPool: [
      'mv-cap-rate-direction',
      'mv-sector-overweight',
      'mv-debt-equity-mix',
    ],
  },
};
