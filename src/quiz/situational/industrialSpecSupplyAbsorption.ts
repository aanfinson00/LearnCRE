import type { SituationalCase } from '../../types/situational';

export const industrialSpecSupplyAbsorption: SituationalCase = {
  id: 'industrial-spec-supply-absorption',
  title: 'Industrial: is the spec pipeline a problem?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    "You're underwriting a 250,000 SF bulk distribution building in a 60M SF submarket. Vacancy is 5.5% and trailing 12-month net absorption was 2.4M SF. Another 3.6M SF is under construction and 40% of it is pre-leased. Your business plan assumes you can lease a rolling 60,000 SF vacancy in 12 months at today's rent.",
  data: [
    { label: 'Submarket inventory', value: '60M SF' },
    { label: 'Current vacancy', value: '5.5% (3.3M SF)' },
    { label: 'Trailing net absorption', value: '2.4M SF / year' },
    { label: 'Under construction', value: '3.6M SF' },
    { label: 'Pre-leased share of pipeline', value: '40% (1.44M SF)' },
    { label: 'Your assumed lease-up', value: '60,000 SF in 12 months' },
  ],
  question: 'How should you size the supply risk to your lease-up assumption?',
  options: [
    {
      label:
        "Net out the pre-leased space, then compare the unleased pipeline to demand: 2.16M SF of spec against 200,000 SF/month of absorption is about 11 months of supply at the current pace, and about 22 months if absorption halves. Underwrite the lease-up with that range and some rent give-up.",
      isBest: true,
      explanation:
        "Pre-leased space is already spoken for, so only the 2.16M SF of speculative space competes with your vacancy (3.6M × 60%). Dividing by monthly absorption (2.4M ÷ 12 = 200,000 SF) gives about 11 months of supply, which is digestible but not trivial. Halving absorption doubles it to about 22 months, which is longer than your 12-month plan. Stress-testing the denominator is the point: supply is only a risk relative to demand.",
    },
    {
      label:
        "Treat the full 3.6M SF as new vacancy: 3.3M + 3.6M on a 63.6M SF base is about 10.8% vacancy, so the submarket is oversupplied and the plan fails.",
      isBest: false,
      explanation:
        "This ignores both pre-leasing and the demand that keeps absorbing space while the buildings are built. Deliveries are staggered over 12–24 months, and 2.4M SF a year of absorption removes a large share of that supply before the last building opens. Treating the pipeline as a one-day shock overstates the risk.",
    },
    {
      label:
        "Ignore the pipeline because 5.5% vacancy is tight and absorption is strong. Underwrite the 12 months as planned.",
      isBest: false,
      explanation:
        "Backward-looking vacancy and absorption describe the market before the new supply arrives. A 3.6M SF pipeline is 6% of inventory and 1.5 years of absorption, so it is large enough to change leasing velocity and concessions. A tight market today does not protect a lease-up that finishes after the deliveries.",
    },
    {
      label:
        "Assume the new buildings are higher quality and won't compete with your older 250,000 SF building, so supply is irrelevant to your tenants.",
      isBest: false,
      explanation:
        "Bulk distribution tenants shop across vintages on rent, clear height and location. New spec space at a similar size will compete directly, and older buildings usually respond with lower rent or more concession. Product differences can shift your pricing, but they rarely remove the competition.",
    },
  ],
  takeaway:
    "Supply is only a risk relative to demand. Net out pre-leasing, divide the unleased pipeline by monthly absorption, and run it again with absorption cut in half.",
  tips: [
    "Pre-leased pipeline is not spec risk; unleased pipeline is.",
    "Months of supply = unleased pipeline ÷ monthly net absorption.",
    "Stress absorption, not just supply; demand is the more volatile input.",
  ],
};
