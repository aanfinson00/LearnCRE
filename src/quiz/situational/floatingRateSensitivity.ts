import type { SituationalCase } from '../../types/situational';

export const floatingRateSensitivity: SituationalCase = {
  id: 'floating-rate-sensitivity',
  title: 'How much does a 150 bps SOFR move cost on your bridge loan?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    "You've acquired a 200-unit value-add multifamily at a $30M purchase price with a $20M floating-rate bridge loan (SOFR + 275 bps). At close, 1-month SOFR is 4.50%, so the all-in rate is 7.25%. The loan is interest-only for 3 years. You bought an interest-rate cap at 6.50% SOFR (all-in cap of 9.25%) for $120k. SOFR has since moved to 5.75% — a 125 bps move from close.",
  data: [
    { label: 'Loan amount', value: '$20M' },
    { label: 'Spread', value: 'SOFR + 275 bps' },
    { label: 'SOFR at close', value: '4.50% → all-in 7.25%' },
    { label: 'Current SOFR', value: '5.75% → all-in 8.50%' },
    { label: 'Interest-rate cap strike', value: '6.50% SOFR (9.25% all-in)' },
    { label: 'Cap premium paid', value: '$120k' },
    { label: 'Loan term', value: '3 years I/O' },
  ],
  question:
    'How much additional annual interest expense are you carrying vs. your underwriting, and what would the cost be if SOFR hit your cap strike?',
  options: [
    {
      label:
        "Additional interest vs. underwriting: (8.50% − 7.25%) × $20M = $250k/yr. If SOFR hits the cap strike at 6.50%, your all-in rate locks at 9.25% — annual interest = $1.85M vs. the underwrote $1.45M, a $400k/yr overage. That's the maximum exposure from rate: $400k/yr or $33k/month, for which you paid $120k in cap premium. The cap is effectively paying for itself if SOFR stays above the strike for more than 4 months.",
      isBest: true,
      explanation:
        "The sensitivity math: (current rate − underwriting rate) × loan balance = annual variance. At 8.50% all-in (1.25% above underwriting's 7.25%): 1.25% × $20M = $250k/yr overage. At the cap strike (9.25% all-in): 2.00% × $20M = $400k/yr overage — this is the ceiling. The cap cost breakeven is $120k / ($400k/yr × 1/12 months) ≈ 3.6 months of at-strike exposure. Floating-rate sensitivity analysis has three outputs: (1) the current overage vs. underwriting, (2) the capped maximum overage, and (3) the cap breakeven period. Running all three tells you whether the cap was appropriately sized relative to the rate risk.",
    },
    {
      label:
        "The interest-rate cap eliminates rate risk — the cap was purchased to hedge this exact scenario, so you have no additional exposure.",
      isBest: false,
      explanation:
        "The cap doesn't eliminate risk; it caps it. You're still paying $250k/yr in additional interest vs. underwriting at current rates. The cap only activates when SOFR exceeds 6.50%; below that, you absorb the rate move fully. And the cap premium is a sunk cost (already paid). Rate risk exists between underwriting rates and the cap strike — only above the strike is the lender-covered.",
    },
    {
      label:
        "The 125 bps SOFR move is immaterial on a value-add deal where rent growth is the return driver — don't model interest-rate scenarios independently.",
      isBest: false,
      explanation:
        "Interest cost is a direct cash flow line, not a background assumption. At $250k/yr of additional interest on a 200-unit value-add, you need approximately $1,250/unit/yr of additional NOI growth just to offset the rate move — before your normal return targets. Rate sensitivity and rent growth sensitivity are separate variables that should each be modeled. Dismissing one because the other is the 'primary driver' understates downside.",
    },
    {
      label:
        "You're paying $20M × 8.50% = $1.7M/yr; vs. underwriting at $20M × 7.25% = $1.45M/yr — a $250k annual overage, which at 3 years compounds to about $750k of incremental total interest before any rate change.",
      isBest: false,
      explanation:
        "The calculation is correct for annual and total overage, but the question also asks about the cap-strike scenario — and this answer doesn't address the maximum exposure ceiling. It also doesn't connect the rate sensitivity to whether the cap was worth purchasing. The complete answer includes: current overage, maximum capped overage, and cap breakeven.",
    },
  ],
  takeaway:
    "Floating-rate sensitivity on a bridge loan has three numbers every sponsor should know: (1) current all-in rate vs. underwriting rate, (2) the annual dollar impact of the rate delta, and (3) the all-in exposure at the cap strike. These three points define the rate-risk range your deal is operating in. The cap premium is the insurance cost against the worst case — evaluate it against (a) the probability of hitting the strike and (b) the monthly cash flow cost at the strike.",
  tips: [
    'Annual rate sensitivity = basis point move × loan balance. 100 bps on $20M = $200k/yr.',
    'Cap breakeven = cap premium / (monthly additional interest at cap strike). If breakeven < 6 months, the cap is usually worth it.',
    'Rate caps on bridge loans are now typically required by lenders — know the strike, premium, and expiration before close.',
  ],
};
