import type { SituationalCase } from '../../types/situational';

export const sensitivityRentGrowthVsOccupancy: SituationalCase = {
  id: 'sensitivity-rent-growth-vs-occupancy',
  title: 'Rent growth vs. occupancy — which NOI assumption carries more risk?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    "A 300-unit multifamily acquisition underwrites to $3.6M stabilized NOI. The pro forma assumes: (A) 95% occupancy (15 units vacant) and (B) $1,200/unit/month average rent, with 3%/yr rent growth for years 2–5. Your lender is stress-testing to confirm DSCR coverage at a 1.25x covenant and has asked which assumption is more sensitive to NOI in Year 1 vs. over the 5-year hold.",
  data: [
    { label: 'Units', value: '300' },
    { label: 'Assumed occupancy', value: '95% (285 units occupied)' },
    { label: 'Average rent', value: '$1,200/unit/month' },
    { label: 'Year 1 NOI', value: '$3.6M' },
    { label: 'Rent growth assumption', value: '3%/yr years 2–5' },
    { label: 'DSCR covenant', value: '1.25x' },
  ],
  question:
    'Which assumption poses more risk to NOI: occupancy dropping 5% or rent growth coming in 2% below forecast in Year 1?',
  options: [
    {
      label:
        "Occupancy is the more acute Year 1 risk: a 5% occupancy miss (from 95% to 90%) = 15 units × $1,200/mo × 12 = $216K of lost revenue in Year 1 alone, an immediate 6% hit to NOI. A 2% rent growth miss only costs in Year 2+ and compounds slowly. For lender stress-testing Year 1 DSCR, occupancy is the dominant variable — the worst-case is lower-than-underwritten lease-up velocity, not slower rent growth.",
      isBest: true,
      explanation:
        "Year 1 NOI is driven entirely by in-place occupancy × in-place rent. Rent growth doesn't hit Year 1 (you underwrite current rents). So a 5% occupancy shortfall in Year 1 = $216K of gross revenue loss immediately; a 2% rent growth miss is irrelevant to Year 1 (growth only materializes in Year 2+). For lender DSCR covenant testing in Year 1, occupancy is the only lever. Over the 5-year hold, however, rent growth compounds — a 2% miss starting Year 2 erodes cumulative NOI by $300K+ over the hold period. Each matters most in its own timeframe.",
    },
    {
      label:
        "Rent growth matters more because it compounds — a 2% annual shortfall destroys significantly more NOI over 5 years than a one-time 5% occupancy dip.",
      isBest: false,
      explanation:
        "True for cumulative NOI over 5 years, but the question is Year 1 vs. 5-year — you need to distinguish the two. A 2% rent growth miss has ZERO impact on Year 1 NOI (growth only appears in Year 2). Over the 5-year hold, rent growth compounding matters more than a sustained occupancy shortfall — but the lender's covenant stress tests Year 1 DSCR first, where occupancy is the only variable. The answer is occupancy for Year 1; rent growth for cumulative 5-year impact.",
    },
    {
      label:
        "Both assumptions carry exactly equal risk because they result in the same NOI impact over a 5-year hold.",
      isBest: false,
      explanation:
        "They don't compound the same way. A 5% occupancy miss is a loss on the physical units (15 units × $1,200 × 12 × 5 years = $1.08M gross over 5 yrs assuming it's sustained). A 2% rent growth miss starting Year 2 compounding to Year 5: Year 2 loss = 3% vs 5% for 300 × 95% × $1,200 × 12 = ~$123K, growing each year. The math doesn't equalize to the same NOI impact over 5 years, so 'equally risky' is not accurate.",
    },
    {
      label:
        "Neither — the lender should stress-test OpEx increases, which are harder to control than revenue.",
      isBest: false,
      explanation:
        "OpEx sensitivity is a real stress dimension (insurance, property tax, maintenance), but the question specifically asks about occupancy vs. rent growth — two revenue assumptions already in the underwriting. Redirecting to OpEx doesn't answer the question posed and isn't the more important Year 1 lender concern for a multifamily asset with contractual expense caps in place.",
    },
  ],
  takeaway:
    "Occupancy and rent growth operate on different timescales: occupancy affects Year 1 NOI immediately and is the dominant Year 1 risk; rent growth compounds over time and is the dominant cumulative risk. For lender stress tests focused on Year 1 DSCR (covenant year), always stress occupancy first. For IRR and 5-year equity return analysis, both matter but rent growth compounds into the exit value in a way that Year 1 occupancy does not. Know which timeframe your audience is underwriting to before claiming one sensitivity is 'more important.'",
  tips: [
    'Year 1 NOI sensitivity check: 1% occupancy miss = 1% × total units × monthly rent × 12. Fast math.',
    'Rent growth miss only shows in Year 2+; a DSCR covenant tested in Year 1 doesn\'t care about growth.',
    "Sustained occupancy underperformance is more dangerous than a one-time lease-up delay — it compounds on a low base.",
  ],
};
