import type { SituationalCase } from '../../types/situational';

export const absorptionMultifamilySeasonality: SituationalCase = {
  id: 'absorption-multifamily-seasonality',
  title: 'Is this lease-up velocity real or just seasonal?',
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    'A 250-unit Class-A multifamily property delivered in April. The developer reports strong lease-up: 80 units signed in the first 3 months (April–June), an annualized pace of 320 units/year. They project full stabilization at 95% leased by Q4 of the same year. A capital partner reviewing the deal notes that April–June is the peak leasing season in this Sun Belt market, and that historically Q3 and Q4 leasing velocity drops 40–50% from Q2 peaks.',
  data: [
    { label: 'Unit count', value: '250 units' },
    { label: 'Delivery date', value: 'April (Q2)' },
    { label: 'Units leased (Apr–Jun)', value: '80 units' },
    { label: 'Q2 annualized pace', value: '320 units/yr (27/mo)' },
    { label: 'Historical Q3/Q4 slowdown vs Q2', value: '40–50%' },
    { label: 'Target occupancy', value: '95% (238 units)' },
  ],
  question: 'How should the capital partner evaluate the stabilization timeline?',
  options: [
    {
      label:
        'Apply the seasonal slowdown: at 50% of Q2 pace, Q3/Q4 absorbs roughly 13–14 units/month. With 158 units remaining, stabilization is 11–12 months away — mid-next-year, not Q4 this year.',
      isBest: true,
      explanation:
        'The developer used Q2 (peak season) velocity to project a Q4 completion. The math under realistic seasonality: 238 target − 80 leased = 158 units remaining. At Q3/Q4 pace of 13–14 units/month, that\'s 11–12 months. Stabilization lands in Q2 of the following year, not Q4 of delivery year. The interest reserve, construction loan maturity, and carry costs all need to be sized to the realistic timeline, not the peak-season extrapolation. The capital partner is right to push back.',
    },
    {
      label:
        'Trust the 3-month track record — 80 units in 3 months shows the property resonates with tenants, so the velocity should hold.',
      isBest: false,
      explanation:
        'Confuses product quality (why units lease) with market seasonality (when people move). Multifamily demand peaks in spring: college graduations, job starts, lease expirations. Even the best-positioned property leases slower in October than in May. A Q2-delivered building has structural timing risk regardless of how strong the product is.',
    },
    {
      label:
        'The developer\'s projection is reasonable — 238 units at 80 per quarter is about 3 quarters, so Q4 is correct.',
      isBest: false,
      explanation:
        '80 units per quarter is the Q2 rate, not a flat ongoing rate. The model implicitly assumes every quarter performs identically to peak season. Lease-up projections built on first-quarter (peak) velocity and applied flat to subsequent quarters are a systematic underwriting error.',
    },
    {
      label:
        'The seasonal slowdown is market-level data and won\'t necessarily apply to this Class-A property.',
      isBest: false,
      explanation:
        'Seasonal leasing patterns are behavioral — driven by when people move — not by property quality. Class A may show slightly less variance than C, but a 40–50% Q3/Q4 slowdown is a market-wide structural pattern. Unless the sponsor has same-property multi-year seasonality data showing otherwise, the market pattern applies.',
    },
  ],
  takeaway:
    'Lease-up projections must account for the season of delivery. A Q2 delivery benefits from peak demand in its first quarter; the tail quarters face structural slowdowns. Always stress-test stabilization timelines by applying seasonal adjustment factors rather than extending first-quarter velocity. The cost of underestimating lease-up time is a longer carry period and potential interest reserve shortfall.',
  tips: [
    'Sun Belt multifamily: Q2 = peak; Q3/Q4 ≈ 50–60% of Q2 velocity.',
    'Interest reserve is priced to the projected lease-up — a 6-month extension burns carry directly.',
    'Stress cases: flat-velocity case, 40% seasonal slowdown, 60% slowdown.',
  ],
};
