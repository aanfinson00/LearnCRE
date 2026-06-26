import type { SituationalCase } from '../../types/situational';

export const absorptionSubleaseOverhang: SituationalCase = {
  id: 'absorption-sublease-overhang',
  title: 'Does sublease space count against your absorption math?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A CBD office submarket has 8M SF of total inventory. Direct vacancy is 14% (1.12M SF available), but an additional 800k SF is available as sublease space — tenants marketing their own space while remaining on lease. Quarterly gross absorption has been 200k SF, but net absorption (new leases minus move-outs) has been essentially flat at +10k SF per quarter. You\'re evaluating an acquisition in this submarket.',
  data: [
    { label: 'Total inventory', value: '8M SF' },
    { label: 'Direct vacancy', value: '14% (1.12M SF)' },
    { label: 'Sublease availability', value: '800k SF' },
    { label: 'Gross absorption', value: '200k SF/quarter' },
    { label: 'Net absorption', value: '+10k SF/quarter' },
  ],
  question: 'How should you interpret the gross vs. net absorption divergence?',
  options: [
    {
      label: 'Use net absorption — the market is effectively flat because new demand is being backfilled by tenants giving space back. Direct vacancy will be slow to clear even with leasing activity.',
      isBest: true,
      explanation:
        'Gross absorption counts every new lease signed, including tenants who move within the submarket. Net absorption — gross minus move-outs and lease expirations — measures true demand growth. When sublease space is large and tenants are contracting, a high gross number can mask stagnation. At +10k SF/quarter net, the 1.12M SF of direct vacancy takes ~28 years to clear at current pace. The 800k SF sublease overhang competes directly with direct space and suppresses rent growth until it clears.',
    },
    {
      label: 'Gross absorption at 200k SF/quarter is the relevant metric — that\'s actual leasing velocity.',
      isBest: false,
      explanation:
        'Gross absorption measures tenant activity, not market tightening. When tenants move within the submarket, gross rises but net stays flat. In an oversupplied market with sublease competition, gross absorption can be strong while vacancy barely moves. Use net absorption to forecast when supply will clear.',
    },
    {
      label: 'The sublease space doesn\'t matter — landlords only compete with each other, not with sublessors.',
      isBest: false,
      explanation:
        'Sublease space competes directly for tenants. Sublessors often offer below-market rents, furnished space, and short-term flexibility that direct landlords can\'t match. During cyclical downturns (post-GFC, post-COVID), sublease overhang has historically suppressed asking rents by 10–20% in affected submarkets until clearance.',
    },
    {
      label: 'Ignore both metrics and rely on the sponsor\'s rent growth forecast.',
      isBest: false,
      explanation:
        'A sponsor\'s rent growth forecast that doesn\'t address net absorption and sublease overhang should not be accepted at face value. The underwriting must explain how rent grows in a market where net absorption is essentially zero and 800k SF of competing space is on the market.',
    },
  ],
  takeaway:
    'In office markets, always distinguish gross from net absorption. Gross measures leasing activity; net measures whether the market is actually tightening. Sublease space is a shadow supply that suppresses rents and competes with direct listings — it belongs in your vacancy and rent-growth assumptions.',
  tips: [
    'Net absorption = gross absorption − space returned (move-outs, expirations, sublet additions).',
    'Large sublease overhang → expect below-market rents and slower direct-vacancy clearance.',
    'Submarket at flat net absorption with rising sublease: don\'t underwrite rent growth without a specific catalyst.',
  ],
};
