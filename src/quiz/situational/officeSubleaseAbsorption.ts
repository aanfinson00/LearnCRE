import type { SituationalCase } from '../../types/situational';

export const officeSubleaseAbsorption: SituationalCase = {
  id: 'office-sublease-absorption',
  title: 'Does sublease space belong in your absorption model?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'An office submarket has 2.0M SF of direct vacant space and an additional 800K SF available for sublease — tenants who are still paying rent but marketing their space to subtenants. Net absorption (direct only) has averaged 120K SF per quarter over the past 8 quarters. You own a 200K SF directly vacant building you need to lease. The tenant pool in this market considers sublease space a close substitute for direct space.',
  data: [
    { label: 'Direct vacancy', value: '2.0M SF' },
    { label: 'Sublease availability', value: '800K SF' },
    { label: 'Combined availability', value: '2.8M SF' },
    { label: 'Net absorption (direct)', value: '120K SF/qtr' },
    { label: 'Your vacant space', value: '200K SF direct' },
  ],
  question: 'How does sublease availability affect your lease-up timeline underwriting?',
  options: [
    {
      label: 'Treat sublease as shadow supply — it competes for the same tenant demand, so effective absorption is slower than direct-only stats show. Re-underwrite lease-up against 2.8M SF of combined availability at the direct absorption pace, which lengthens your timeline materially.',
      isBest: true,
      explanation:
        'Sublease availability is competing supply. Tenants shopping 20K SF of contiguous space don\'t distinguish "direct from landlord" from "sublease from tenant" — they compare economics and quality. When 800K SF of sublease is on the market, demand that would otherwise absorb direct space gets redirected. Quoting 120K SF/qtr absorption against only 2.0M SF of direct vacancy is misleading; the effective pipeline is 2.8M SF. Adjusted implied supply months against combined availability: 2.8M ÷ 120K = 23 quarters vs 2.0M ÷ 120K = 17 quarters on a direct-only basis — a materially different picture.',
    },
    {
      label: 'Ignore sublease space — it doesn\'t count because someone is still paying rent on it.',
      isBest: false,
      explanation:
        'Subleases directly compete with direct vacancy for tenant occupancy. Whether the prime tenant continues paying rent is irrelevant to your leasing competition. A 5,000 SF sublease at $28/SF competes with your direct offering at $30/SF regardless of who writes the check above them.',
    },
    {
      label: 'Track sublease separately and use it only as a leading indicator — rising sublease signals future softening but doesn\'t affect current absorption.',
      isBest: false,
      explanation:
        'Partly right: sublease availability is a leading indicator of demand softening, since tenants sublease when they expect to not use the space. But framing it only as a signal and not as competing supply misses the direct effect on your lease-up timeline. The best answer incorporates both effects.',
    },
    {
      label: 'Discount sublease by 50% — subleases are shorter-term and tenants accept a quality discount, so they\'re half as competitive as direct space.',
      isBest: false,
      explanation:
        'The 50% haircut is an unsupported round number. Sublease discounts vary by space quality, term remaining, and tenant credit. Some subleases clear 10–15% below direct rents; some trade at near-parity for large-block tenants wanting quick occupancy. Apply a specific adjustment only if you can document it from market data, not as a default rule of thumb.',
    },
  ],
  takeaway:
    'Sublease availability is competing supply. Any absorption underwriting that ignores it systematically overstates demand relative to available space. Always check: what is total availability (direct + sublease) vs. what is total demand (net absorption)? The resulting supply-months figure tells you the real supply/demand balance.',
  tips: [
    'Availability rate = (direct vacancy + sublease) ÷ total inventory — this is what brokers quote to prospective tenants.',
    'Rising sublease availability signals future NOI pressure even before vacancy formally spikes.',
    'Deep-discount subleases drag achievable direct rents — include them in your competitive set analysis.',
  ],
};
