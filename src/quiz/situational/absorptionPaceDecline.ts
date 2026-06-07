import type { SituationalCase } from '../../types/situational';

export const absorptionPaceDecline: SituationalCase = {
  id: 'absorption-pace-decline',
  title: 'Absorption is slowing every quarter — which number do you use?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    'A multifamily submarket has posted declining quarterly absorption for three consecutive quarters: 300 units (Q1), 220 units (Q2), 140 units (Q3). Current submarket occupancy is 91% across 8,000 units. You\'re underwriting a 500-unit ground-up development and need a forward absorption assumption.',
  data: [
    { label: 'Submarket inventory', value: '8,000 units, 91% occupied' },
    { label: 'Q1 absorption', value: '300 units' },
    { label: 'Q2 absorption', value: '220 units' },
    { label: 'Q3 absorption', value: '140 units' },
    { label: 'Subject development', value: '500 units, ground-up' },
  ],
  question: 'What is the most defensible forward absorption assumption for your underwriting?',
  options: [
    {
      label: 'Extrapolate the declining trend — model ~60–80 units/quarter as the base case, use flat-at-140 as upside, and size the lease-up timeline accordingly. Don\'t assume the trend reverses without a specific catalyst.',
      isBest: true,
      explanation:
        'The absorption decline of ~80 units per quarter is a trend, not noise. Extending it conservatively gives roughly 60–80 units in Q4 as the base. At 80 units/quarter, absorbing 500 units takes 6+ quarters — just for lease-up, before reaching 91% occupancy of the full submarket. Averaging the three quarters (220/quarter) or anchoring to Q1\'s peak (300/quarter) overstates future demand and understates lease-up time. The conservative underwriting principle: extrapolate the trend as base case; model stabilization as upside; document the catalyst required to justify the upside. Flag the declining trend prominently in any IC memo.',
    },
    {
      label: 'Use the 3-quarter average (220 units/quarter) — it smooths out quarter-to-quarter noise.',
      isBest: false,
      explanation:
        'Averaging is appropriate for random fluctuation around a stable level; it\'s incorrect for a directional trend. Averaging 300, 220, and 140 produces 220, which implies the future will look like the middle — a nonsensical conclusion when the data shows consistent deterioration. Using the average will systematically underestimate your lease-up period.',
    },
    {
      label: 'Use Q1\'s 300 units/quarter — that was the recent peak and markets mean-revert.',
      isBest: false,
      explanation:
        'Mean reversion is a theoretical tendency, not a near-term certainty, and certainly not one you should build a 500-unit development underwriting around. Q1\'s peak occurred under more favorable conditions; using it as a forward assumption ignores three consecutive quarters of contradictory data. If the deal only pencils at Q1 absorption, the deal is already in trouble.',
    },
    {
      label: 'Use Q3\'s 140 units/quarter — it\'s the most recent data and therefore the most relevant.',
      isBest: false,
      explanation:
        'Better than using the average or peak, but still misses the direction. If absorption has been declining 80 units per quarter consistently, Q4 is likely below 140. Using Q3 as a flat assumption ignores the momentum visible in the data. Extrapolating the trend is more conservative and more defensible than anchoring to the trailing quarter.',
    },
  ],
  takeaway:
    'Declining absorption is a trend signal, not noise. Averaging it or anchoring to the peak systematically underestimates lease-up time and overstates stabilized NOI timing. The conservative model: extrapolate the trend as the base case; build the "market stabilizes" scenario as upside only when you can name the specific catalyst. Lenders and IC members will ask directly about the declining trend — having a thoughtful answer ready is required.',
  tips: [
    'Declining absorption: base case = extrapolate the trend; upside = stabilization with named catalyst.',
    'At 80 units/quarter, 500 units take 6+ quarters to absorb — roughly 18 months just for lease-up.',
    'Flag declining absorption in the IC memo on page 1 — it\'s the most common lender question on new development.',
  ],
};
