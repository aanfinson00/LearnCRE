import type { SituationalCase } from '../../types/situational';

export const sensitivityOccupancyBreakeven: SituationalCase = {
  id: 'sensitivity-occupancy-breakeven',
  title: "What's the minimum occupancy to cover debt service?",
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'You are acquiring a multi-tenant office building for $30M. The loan is $21M at 6.5% fixed, 25-year amortization (annual debt service ≈ $1,770,000). In-place rents average $28/SF on 75,000 SF of total rentable area. The building is currently 88% occupied. Operating expenses are approximately $800,000/yr and are largely fixed regardless of occupancy. Full-occupancy effective gross income would be $2,100,000/yr.',
  data: [
    { label: 'Purchase price', value: '$30,000,000' },
    { label: 'Loan amount', value: '$21,000,000' },
    { label: 'Rate / amortization', value: '6.5%, 25-yr' },
    { label: 'Annual debt service', value: '~$1,770,000' },
    { label: 'Total rentable area', value: '75,000 SF' },
    { label: 'Average rent', value: '$28/SF/yr' },
    { label: 'Full-occupancy EGI', value: '$2,100,000' },
    { label: 'Fixed operating expenses', value: '$800,000/yr' },
    { label: 'Current occupancy', value: '88%' },
  ],
  question:
    'What is the minimum occupancy at which the property covers debt service?',
  options: [
    {
      label:
        'The property cannot cover debt service even at 100% occupancy. Required NOI = $1.77M; required EGI = $1.77M + $800K = $2.57M. Full-occupancy EGI is only $2.1M, producing NOI of $1.3M and DSCR of 0.73×. This is a structural leverage problem, not an occupancy problem.',
      isBest: true,
      explanation:
        'Working the math: minimum NOI for DSCR 1.0× = $1,770,000. Required EGI = $1,770,000 + $800,000 = $2,570,000. At $28/SF, required occupied SF = $2,570,000 ÷ $28 = 91,786 SF — 22% more than the building contains (75,000 SF). At 100% occupancy, DSCR = $1,300,000 ÷ $1,770,000 = 0.73×. The property is over-leveraged at current rents. No occupancy improvement fixes this; the solution is debt reduction, rent growth, or a different loan structure.',
    },
    {
      label:
        'Breakeven occupancy is approximately 75–80% — you need to cover fixed expenses plus interest-only debt service.',
      isBest: false,
      explanation:
        'At 80% occupancy: EGI = 75,000 × 0.80 × $28 = $1,680,000. NOI = $1,680,000 − $800,000 = $880,000. DSCR = $880,000 ÷ $1,770,000 = 0.50×. This is not even close to covering debt service. The 75–80% estimate is dangerously wrong and would lead to a significant underwriting error.',
    },
    {
      label:
        'Current occupancy of 88% already provides solid coverage — focus on leasing to 95%.',
      isBest: false,
      explanation:
        'At 88% occupancy: EGI = 75,000 × 0.88 × $28 = $1,848,000. NOI = $1,848,000 − $800,000 = $1,048,000. DSCR = $1,048,000 ÷ $1,770,000 = 0.59×. The property is already in cash flow deficit at current occupancy. Moving to 95% (DSCR ≈ 0.68×) is still deeply under-covered. There is no occupancy level within the building\'s capacity that clears 1.0× DSCR.',
    },
    {
      label:
        'Calculate required SF: ($1.77M DS + $800K OpEx) ÷ $28 = 91,786 SF. That is 122% occupancy — flag this as over-leveraged.',
      isBest: false,
      explanation:
        'The math is correct, but "122% occupancy" is a less actionable framing than "full-occupancy DSCR = 0.73×." Presenting it as a DSCR number communicates the severity more clearly and aligns with how lenders and investment committees evaluate deals. Both framings reach the same conclusion — the deal is over-leveraged — but DSCR language is the standard vocabulary.',
    },
  ],
  takeaway:
    'Always compute the occupancy breakeven as a DSCR stress test early in underwriting. Formula: required NOI = annual debt service; required EGI = required NOI + operating expenses; required occupancy = required EGI ÷ (rent/SF × total SF). If required occupancy exceeds 100%, the asset is structurally over-leveraged at current rents — no leasing effort can fix it. This test takes two minutes and catches deals that look viable but are not.',
  tips: [
    'DSCR breakeven occupancy = (debt service + OpEx) ÷ (rent/SF × total SF).',
    'DSCR < 1.0× at current occupancy means the deal is in cash flow deficit today.',
    'If breakeven occupancy exceeds 95%, the deal has almost no margin for leasing volatility.',
  ],
};
