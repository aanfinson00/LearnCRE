import type { SituationalCase } from '../../types/situational';

export const sensitivityOccupancyHaircut: SituationalCase = {
  id: 'sensitivity-occupancy-haircut',
  title: "What does 90% vs 95% occupancy do to your NOI?",
  category: 'sensitivity',
  difficulty: 'beginner',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    "You're underwriting a 200-unit multifamily property at an average in-place rent of $1,800/month. Your base case uses 95% economic occupancy. A lender asks you to show the deal at 90% occupancy as a stress scenario. The property has fixed operating expenses of $1.2M/year and variable expenses that scale with occupied units.",
  data: [
    { label: 'Units', value: '200' },
    { label: 'Average rent', value: '$1,800/month' },
    { label: 'Gross potential rent (GPR)', value: '$4,320,000/yr' },
    { label: 'Base case economic occupancy', value: '95%' },
    { label: 'Fixed OpEx', value: '$1,200,000/yr' },
  ],
  question: "How do you calculate and frame the NOI impact of dropping from 95% to 90% occupancy?",
  options: [
    {
      label: "A 5% occupancy drop on $4.32M GPR = $216,000 of lost revenue. OpEx stays largely fixed, so the full $216K flows through to NOI — roughly a 10%+ NOI reduction if base case NOI is around $1.9M. That's a material swing that directly impacts DSCR and supportable leverage.",
      isBest: true,
      explanation:
        "GPR = 200 units × $1,800 × 12 = $4,320,000. At 95% occupancy: effective gross income (EGI) = $4,104,000. At 90%: EGI = $3,888,000. Revenue delta = $216,000. If fixed OpEx is $1,200,000 and variable OpEx is minimal (multifamily typically has low variable costs), NOI at 95% ≈ $4,104,000 − $1,200,000 = $2,904,000 and at 90% ≈ $2,688,000 — a $216K or ~7.4% NOI reduction. The lender's DSCR test will fail if NOI drops below debt service at the stress case. Always show the DSCR at both occupancy levels in lender presentations.",
    },
    {
      label: "A 5% occupancy change has minimal NOI impact because expenses also scale down with fewer occupied units.",
      isBest: false,
      explanation:
        "Most multifamily operating expenses (management fees, insurance, taxes, maintenance reserves) are largely fixed or based on total units, not occupied units. Variable costs like unit-turn expenses do scale, but they're a small fraction of total OpEx. Assuming expenses scale proportionally overstates the offset and understates the NOI sensitivity.",
    },
    {
      label: "Drop gross revenue by 5% and also drop expenses by 5% — that's the right parallel shift.",
      isBest: false,
      explanation:
        "Operating expenses don't track occupancy linearly. Taxes, insurance, management fees (often based on GPR or a flat fee), and reserves are fixed or semi-fixed. Parallel-shifting both revenue and expenses by 5% is mechanically wrong; it makes NOI look more stable than it is under occupancy stress.",
    },
    {
      label: "Show the occupancy sensitivity but tell the lender it's unlikely to hit 90% in this submarket.",
      isBest: false,
      explanation:
        "Lenders require the stress case math regardless of your views on the probability. 'Unlikely' is not a debt underwriting answer — the lender needs to know the DSCR at the stress occupancy to determine if the loan has adequate coverage under downside. Present the numbers, then add market context if appropriate.",
    },
  ],
  takeaway:
    "Occupancy sensitivity is asymmetric: revenue falls directly with vacancy, but most operating expenses are fixed, so NOI drops more than proportionally. A 5-percentage-point occupancy reduction on a stabilized deal can cut NOI by 7–10%. Always show the DSCR and debt yield at the stress occupancy — those are the lender's constraints, not the buyer's.",
  tips: [
    'NOI sensitivity to occupancy = revenue loss (GPR × occ delta) with minimal expense offset for most property types.',
    'Show the DSCR stress case whenever a lender asks for occupancy sensitivity — that\'s usually why they\'re asking.',
    'For retail and office, variable expenses (CAM, leasing costs) scale more with occupancy than multifamily or industrial.',
  ],
};
