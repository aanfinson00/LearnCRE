import type { SituationalCase } from '../../types/situational';

export const breakEvenOccupancyCalc: SituationalCase = {
  id: 'break-even-occupancy-calc',
  title: 'At what occupancy does this deal stop covering its debt service?',
  category: 'sensitivity',
  difficulty: 'beginner',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'A 100-unit multifamily property has gross potential rent (GPR) of $1,500,000 per year at 100% occupancy. Annual operating expenses (fixed: property management, taxes, insurance, repairs) total $400,000 — treated as fixed for this analysis. Annual debt service is $800,000.',
  data: [
    { label: 'Units', value: '100' },
    { label: 'Gross potential rent (GPR)', value: '$1,500,000/yr (at 100% occ)' },
    { label: 'Annual operating expenses', value: '$400,000/yr (treated as fixed)' },
    { label: 'Annual debt service', value: '$800,000/yr' },
    { label: 'Current occupancy', value: '95%' },
    { label: 'Current NOI', value: '$1,025,000 ($1.5M × 95% − $400K)' },
    { label: 'Current DSCR', value: '1.28x ($1,025K / $800K)' },
  ],
  question: 'At what occupancy rate does NOI exactly equal debt service (DSCR = 1.0x)?',
  options: [
    {
      label:
        'Break-even occupancy = (Operating Expenses + Debt Service) / GPR = ($400K + $800K) / $1,500K = 80%. The property needs at least 80% occupancy to cover all expenses and debt service from collected rent alone.',
      isBest: true,
      explanation:
        'At DSCR = 1.0x, NOI = debt service = $800K. Working backward: Effective Gross Revenue − OpEx = $800K → Revenue = $1.2M. Revenue = GPR × occupancy → $1,500,000 × occ% = $1,200,000 → occ% = 80%. The formula is clean: Break-even Occ% = (OpEx + Debt Service) / GPR. This tells you the occupancy cushion: the property currently sits at 95% vs. an 80% break-even — a 15-point buffer. That buffer is the lender\'s safety margin. When occupancy approaches the break-even level, debt service shortfalls begin.',
    },
    {
      label:
        '60% — operating expenses are large enough that you only need to cover debt service, not OpEx, from occupancy income.',
      isBest: false,
      explanation:
        "Break-even occupancy must cover both operating expenses AND debt service from collected rent, not just one of the two. At 60% occupancy, effective gross revenue = $1.5M × 0.60 = $900K. After $400K of OpEx, NOI = $500K — well below $800K of debt service. This calculation confuses 'what percent of income goes to debt service' with the full coverage equation.",
    },
    {
      label:
        '90% — high-quality multifamily assets require near-full occupancy to maintain debt coverage because of high fixed costs.',
      isBest: false,
      explanation:
        "This overstates the occupancy requirement. At 90%: Revenue = $1.35M − $400K OpEx = $950K NOI, vs. $800K debt service → DSCR = 1.19x, still in coverage. The break-even is 80%, not 90%. A 90% floor is a lender's operating covenant — more conservative than the mathematical break-even — not the break-even itself.",
    },
    {
      label:
        'It depends on whether the loan is interest-only or amortizing — break-even is structurally different for each.',
      isBest: false,
      explanation:
        "The loan structure affects the dollar amount of debt service, which is already provided ($800K/yr). With the debt service figure given, the break-even calculation is straightforward regardless of whether the $800K includes amortization. If you needed to derive debt service from scratch, then yes, IO vs. amortizing would change the answer — but here it's given, so compute directly.",
    },
  ],
  takeaway:
    "Break-even occupancy = (Operating Expenses + Debt Service) / Gross Potential Revenue. It's one of the most practical sensitivity metrics in multifamily underwriting: it tells you how far occupancy can fall before the deal can't pay its bills. Know your asset's break-even before underwriting, and confirm it comfortably clears historical trough occupancy in that market.",
  tips: [
    'Break-even Occ% = (OpEx + Debt Service) / GPR. Memorize this formula.',
    'Typical stabilized multifamily break-even: 70–85% depending on leverage and expense load.',
    'Market trough occupancy (2008–2010 in most markets: ~88–91% for Class B) should comfortably clear your break-even — if it doesn\'t, you\'re over-leveraged.',
  ],
};
