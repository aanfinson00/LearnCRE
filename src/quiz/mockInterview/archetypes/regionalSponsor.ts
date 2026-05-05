import type { MockArchetypeSpec } from '../../../types/mockInterview';

/**
 * Regional Sponsor — judgment / pragmatism / tenant-relations mock.
 * Pragmatic CRE shop in a secondary market, smaller deal sizes, more
 * tenant + relationship-driven thinking. ~30 minutes / 8 prompts.
 *
 * Differs from institutional archetypes in slot mix: more behavioral,
 * fewer technical drills, more situational case judgment. The hire
 * profile is "good operator + judgment," not "pure quant."
 */
export const REGIONAL_SPONSOR: MockArchetypeSpec = {
  id: 'regional-sponsor',
  title: 'Regional Sponsor',
  description:
    'Smaller pragmatic shop, secondary markets, tenant-relations heavy. Lower technical density; more behavioral + situational. ~30 minutes.',
  durationMin: 30,
  roles: ['acquisitions', 'assetManagement'],
  composition: [
    { kind: 'fit', sectionLabel: 'Opening · Fit' },
    { kind: 'behavioral', sectionLabel: 'Behavioral · Tenant work' },
    { kind: 'behavioral', sectionLabel: 'Behavioral · Pressure' },
    { kind: 'technical', difficulty: 'intermediate', sectionLabel: 'Quant warm-up' },
    { kind: 'situational', sectionLabel: 'Case · Comp set + pricing' },
    { kind: 'situational', sectionLabel: 'Case · Mark-to-market' },
    { kind: 'situational', sectionLabel: 'Case · Rollover / capex' },
    { kind: 'longform', sectionLabel: 'Walk me through your bid' },
  ],
  contentScopes: {
    technicalKindPool: [
      // Foundational only — no advanced waterfall
      'goingInCap',
      'capCompression',
      'combinedScenario',
      'irrSimple',
      'equityMultiple',
      'pricePerSf',
      'pricePerUnit',
      'allInBasis',
      'rentChange',
    ],
    situationalIdPool: [
      'comp-set-vetting',
      'comp-vintage-adjustment',
      'mark-to-market-upside',
      'rent-roll-undervalued',
      'tenant-credit-pricing',
      'capex-reserve-discipline',
      'rollover-concentration',
      'ti-vs-rent-giveback',
      'noi-growth-smell-test',
      'om-red-flags',
    ],
    longformIdPool: ['walk-me-through-bid', 'defend-deal-to-ic'],
    fitIdPool: ['fit-tell-me-about-yourself', 'fit-why-cre', 'fit-why-this-firm'],
    behavioralIdPool: [
      'beh-tenant-negotiation',
      'beh-disagree-with-vp',
      'beh-failed-deal',
      'beh-data-vs-instinct',
      'beh-time-pressure',
      'beh-mentor-feedback',
    ],
    marketViewIdPool: ['mv-sector-overweight'],
  },
};
