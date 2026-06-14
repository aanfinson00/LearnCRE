import type { SituationalCase } from '../../types/situational';

export const absorptionSeasonality: SituationalCase = {
  id: 'absorption-seasonality',
  title: 'Q4 absorption is half the annual pace — which number do you use?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    'You\'re underwriting a 200-unit multifamily development with a lease-up starting in October (Q4). Quarterly absorption in the submarket over the trailing year: Q1 = 60 units, Q2 = 140 units, Q3 = 130 units, Q4 = 70 units (TTM average = 100/quarter). Your pro forma currently assumes 100 units/quarter for lease-up. Stabilization target is 94% occupancy (188 units). The construction loan terms require lease-up to complete within 3 quarters to service debt.',
  data: [
    { label: 'Q1 absorption', value: '60 units' },
    { label: 'Q2 absorption', value: '140 units' },
    { label: 'Q3 absorption', value: '130 units' },
    { label: 'Q4 absorption', value: '70 units' },
    { label: 'TTM average', value: '100 units/quarter' },
    { label: 'Lease-up start', value: 'October (Q4)' },
    { label: 'Stabilization target', value: '188 units (94%)' },
    { label: 'Required timeline', value: '3 quarters' },
  ],
  question: 'Which absorption assumption is defensible for your pro forma?',
  options: [
    {
      label: 'Model seasonally: Q4 at 70 units, Q1 at 60 units, Q2 at 140 units. Total over 3 quarters is 270 — enough — but Q2 is load-bearing. If Q2 underperforms, you miss stabilization. Disclose this path to the construction lender.',
      isBest: true,
      explanation:
        'Seasonal absorption in multifamily is real and predictable — Q4/Q1 leasing consistently runs 40-60% of Q2/Q3 velocity in most markets. Using the TTM average for a Q4 start puts 100 units/quarter into the slowest leasing months, understating the early pace. The seasonal path (70, 60, 140) technically reaches 270 units in 3 quarters, but the concentration of leasing in Q2 is a risk the construction lender needs to understand. Your pro forma should reflect the seasonal path, not the flat average.',
    },
    {
      label: 'Use the TTM average of 100/quarter — one quarter of seasonality doesn\'t distort the full-year picture.',
      isBest: false,
      explanation:
        'When the lease-up starts in Q4, the first two quarters (Q4 and Q1) are by definition below-average. Using 100/quarter assumes peak-season velocity in winter months, which is historically wrong for multifamily. This is the mechanism behind development pro formas that look reasonable in aggregate but miss budget quarter-by-quarter.',
    },
    {
      label: 'Use the Q2 pace (140/quarter) — that\'s the peak market velocity and shows the opportunity.',
      isBest: false,
      explanation:
        'Upside cases are not pro-forma cases. The construction lender will stress-test against realistic assumptions; a Q2-peak pace starting in October will fail any credit review. Present an upside scenario separately if needed.',
    },
    {
      label: 'Time the construction delivery to begin in Q2 to avoid the seasonality issue entirely.',
      isBest: false,
      explanation:
        'Construction timelines slip; you cannot underwrite a Q4 start as though it will be Q2 by counting on perfect timing. If the capital structure requires a Q4 start, the underwriting must model that scenario.',
    },
  ],
  takeaway:
    'Multifamily absorption is reliably seasonal — Q2/Q3 velocity runs 1.5–2x Q4/Q1 in most temperate markets. When a lease-up starts in the fall, the pro forma must reflect seasonal pacing quarter-by-quarter, not the annual average. A "3-quarter" timeline that works in aggregate can still stress the construction lender if the early quarters are slow and Q2 becomes load-bearing. Model the path, not just the total.',
  tips: [
    'Rule of thumb: MF Q4/Q1 absorption ≈ 50–65% of Q2/Q3 pace in temperate markets.',
    'If Q2 is load-bearing, run a stress case where Q2 comes in at the TTM average — that\'s the real risk.',
    'Construction lenders care about the path; model month-by-month absorption if you can.',
  ],
};
