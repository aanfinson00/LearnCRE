import type { SituationalCase } from '../../types/situational';

export const multifamilyAbsorptionSeasonality: SituationalCase = {
  id: 'multifamily-absorption-seasonality',
  title: 'Multifamily lease-up: closing in Q4 on a property that needs spring to stabilize',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    "You're acquiring a newly-built 120-unit Class-A multifamily asset in a Midwestern market. The deal closes in December. The property is currently 45% leased. The developer's pro forma projects stabilization (93% occupancy) by April — 5 months away — assuming historical absorption pace of 20 units/month. You've pulled submarket data and find that leasing velocity in this market drops 60–70% in Q1 (January–March) due to weather and lease seasonality, then rebounds sharply in Q2.",
  data: [
    { label: 'Total units', value: '120' },
    { label: 'Occupancy at close (Dec)', value: '45% (54 units leased)' },
    { label: 'Stabilization target', value: '93% (112 units)' },
    { label: "Developer's absorption assumption", value: '20 units/month (flat)' },
    { label: "Developer's stabilization timeline", value: '5 months (April)' },
    { label: 'Seasonal velocity drop (Q1)', value: '60–70% below trailing pace' },
  ],
  question:
    "How should you re-model the lease-up timeline given Q1 seasonality, and what does this mean for your lender's stabilization covenant?",
  options: [
    {
      label:
        "Apply seasonal discounting: Q1 absorption = 20 units/mo × 35% = 7 units/mo. You need 58 more units (112 − 54). Q1 (Jan–Mar): 7 units/mo × 3 = 21 units → 75 units leased at March 31. Q2 rebound: need 37 more units; at full 20 units/mo it takes ~2 months → stabilize in ~June. That's a 9-month timeline vs. the developer's 5-month assumption, a 4-month slip. This directly affects any construction/bridge loan with a stabilization deadline for the float-down rate or extension option.",
      isBest: true,
      explanation:
        "Seasonal lease-up modeling is one of the most commonly missed items in new construction acquisition underwriting. The math: 35% of trailing pace (100% − 65% seasonal drop) × 3 months = 21 net new units in Q1. You're at 75 units (62.5%) — still far from the 93% stabilized threshold. In Q2, assuming the normal 20 units/mo rebound, you need 37 more units = ~2 more months. Stabilization ≈ June, not April. The practical impact: any bridge or construction loan with a 5-month stabilization covenant is going to breach. Know the extension options, the fee, and whether the lender's 'stabilized' definition includes a minimum DSCR in addition to occupancy.",
    },
    {
      label:
        "Accept the developer's timeline — 20 units/month is the trailing pace and developers know their market.",
      isBest: false,
      explanation:
        "Trailing pace is a trailing metric. Applying it flat through Q1 ignores seasonal demand patterns that are well-documented and consistent in Midwestern markets. A developer's pro forma uses flat absorption because it's the simplest model and it's in the developer's interest to show a short stabilization timeline. As the buyer, your job is to adjust for what the data actually shows.",
    },
    {
      label:
        "The seasonality problem doesn't matter — you can accelerate absorption through rent concessions (1 month free) to fill the units faster in Q1.",
      isBest: false,
      explanation:
        "Rent concessions can pull demand forward, but their marginal effect is limited in a slow-season market: the constraint is the pool of qualified renters looking to move in January in the Midwest, not just willingness to pay. Free rent or pricing adjustments help at the margin — maybe 30–40% more units than pure seasonality — but they don't eliminate the Q1 demand destruction. Model the concession cost explicitly: 1 month free on 37 units = $37 × average rent, which reduces effective NOI in Year 1.",
    },
    {
      label:
        "Run two sensitivity scenarios (on-time April stabilization and June slip) and let the lender decide which to use for underwriting.",
      isBest: false,
      explanation:
        "The buyer's job is to determine which scenario is the most likely base case, not to delegate that question to the lender. The lender will use the more conservative one anyway — and if your base case can't support the loan terms at June stabilization, you need to know that before you close, not after.",
    },
  ],
  takeaway:
    "Multifamily lease-up absorption must be seasonal-adjusted when the project bridges a Q1 period in cold-weather markets. The common mistake is using annual trailing pace as a flat monthly assumption through slow-season months. The correction: research submarket lease-up velocity by quarter, apply the seasonal multiplier to Q1–Q2, and solve for actual stabilization timing. Then check every loan covenant that references 'stabilization' — occupancy thresholds, extension fees, rate triggers — against your revised timeline.",
  tips: [
    'Typical Midwestern/Northeastern Q1 multifamily velocity: 35–45% of trailing annual pace.',
    'Sun Belt Q1 seasonality is milder (65–75% of trailing pace) but still real — Southern CA and Florida are the exceptions.',
    "Most construction/bridge loan stabilization covenants define stabilization as occupancy ≥ 93% (or 90%) for 90 days — the 90-day hold requirement extends your timeline further than the point when you first hit the threshold.",
  ],
};
