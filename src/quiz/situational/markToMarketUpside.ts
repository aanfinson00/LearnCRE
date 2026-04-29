import type { SituationalCase } from '../../types/situational';

export const markToMarketUpside: SituationalCase = {
  id: 'mark-to-market-upside',
  title: 'How much upside is in the rent roll?',
  category: 'pricing',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'You\'re underwriting an office acquisition. In-place rent is $24/SF on the major tenant; recent leasing in the building and submarket is signing at $32/SF. The major tenant\'s lease expires in 12 months and is widely expected to vacate (the broker has already begun marketing the space).',
  data: [
    { label: 'In-place rent', value: '$24/SF' },
    { label: 'Market rent', value: '$32/SF' },
    { label: 'Lease expiry', value: '12 months' },
    { label: 'Tenant retention probability', value: 'Low' },
  ],
  question: 'What\'s the right way to price the upside?',
  options: [
    {
      label: 'Roughly 33% rent uplift on rollover — but price the deal to trended NOI net of downtime, TIs, and concessions, not to the market-rent figure directly.',
      isBest: true,
      explanation:
        '($32 − $24) / $24 = 33% uplift. That\'s the gross arithmetic. The economic answer reduces it: 6–9 months downtime, $50–75/SF in TIs, several months of free rent — call it $25–40/SF in re-leasing costs against the uplift. Sophisticated underwriting trends to a stabilized NOI that captures the uplift *and* the cost of getting there.',
    },
    {
      label: 'Price at $32/SF rent immediately on Day 1 — the lease is rolling and the market clears at $32.',
      isBest: false,
      explanation:
        'Ignores downtime, TIs, and free rent. Even in a hot market, vacancy between leases plus ~6 months of free rent plus $50+/SF in TIs can erase 1–2 years of the uplift. "$32 from Day 1" overstates the value.',
    },
    {
      label: 'There\'s no real upside — rent rollovers usually trade at a premium that the seller has already priced in.',
      isBest: false,
      explanation:
        'This conflates pricing efficiency with the existence of upside. The upside exists; the question is who captures it. If the seller has priced perfectly, the buyer\'s IRR equals required return — but the underwriting still needs to model the rollover, not skip it.',
    },
    {
      label: 'Price at the in-place rent of $24/SF and treat the market rent as conservative downside.',
      isBest: false,
      explanation:
        'Inverts the upside/downside framework. In-place rent is what the asset earns *today*; market rent is what it will earn after rollover. Pricing at in-place ignores the rollover entirely and would systematically overpay relative to other buyers who underwrite trended NOI.',
    },
  ],
  takeaway:
    'Mark-to-market upside is real but never "free". Always net out re-leasing costs (downtime + TI + free rent) before treating the rent uplift as cash flow. The right anchor is trended stabilized NOI, not in-place and not market-rent-from-day-one.',
  tips: [
    'Rule of thumb: re-leasing costs are 6–18 months of the new gross rent.',
    'Mark-to-market % = (market − in-place) / in-place.',
    'Apply uplift only to the SF actually rolling — most rent rolls have staggered expirations.',
  ],
};
