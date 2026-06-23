import type { SituationalCase } from '../../types/situational';

export const sensitivityRentDeclineDscr: SituationalCase = {
  id: 'sensitivity-rent-decline-dscr',
  title: 'How much rent decline trips the DSCR covenant?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['mortgageUw', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "A 200-unit multifamily loan has a 1.25× DSCR covenant tested annually. Current NOI is $2.5M on gross revenue of $3.7M. Annual debt service is $1.5M (IO period). Operating expenses are contracted at $1.2M for two years — all revenue variability runs through rents.",
  data: [
    { label: 'Current gross revenue', value: '$3.7M' },
    { label: 'Operating expenses (fixed)', value: '$1.2M' },
    { label: 'Current NOI', value: '$2.5M' },
    { label: 'Annual debt service (IO)', value: '$1.5M' },
    { label: 'Current DSCR', value: '1.67×' },
    { label: 'DSCR covenant', value: '1.25×' },
  ],
  question: 'How much revenue decline trips the 1.25× DSCR covenant?',
  options: [
    {
      label: "A ~$625K revenue decline (~17%) trips the covenant. Minimum NOI = 1.25 × $1.5M = $1.875M. Minimum revenue = $1.875M + $1.2M OpEx = $3.075M. Headroom = $3.7M − $3.075M = $625K.",
      isBest: true,
      explanation:
        "Step through it: (1) Min NOI to satisfy covenant = 1.25 × $1.5M DS = $1.875M. (2) Since OpEx is fixed at $1.2M, minimum revenue = $1.875M + $1.2M = $3.075M. (3) Revenue headroom = $3.7M − $3.075M = $625K, or 16.9%. In occupancy terms: $625K ÷ ($3.7M / 95% occupied) ≈ equivalent to occupancy falling from 95% to ~79%, all else equal. This is the single most useful sensitivity for a lender monitoring covenant compliance — quantify the revenue floor, then translate it to occupancy or rent terms.",
    },
    {
      label: "A 25% revenue decline — the gap between current DSCR (1.67×) and covenant (1.25×) is 0.42×, which is ~25% of current DSCR.",
      isBest: false,
      explanation:
        "The DSCR gap (0.42×) doesn't translate to a revenue percentage because OpEx is fixed. If expenses were zero, the ratio gap would equal the NOI gap which would equal the revenue gap. With $1.2M of fixed OpEx, the revenue floor is higher than the NOI floor suggests. The fixed-cost structure means revenue sensitivity is higher than a simple DSCR arithmetic would imply.",
    },
    {
      label: "Any meaningful revenue decline is a problem — 1.67× is already thin coverage.",
      isBest: false,
      explanation:
        "1.67× DSCR is well above a 1.25× covenant — nearly 35% of cushion relative to covenant. 'Already thin' mischaracterizes the headroom. The analysis should quantify the break-even precisely ($625K or 17%), which tells you whether normal market volatility (e.g., 5% rent decline) is a covenant risk at all. It isn't here — 5% of $3.7M is $185K, well inside the $625K headroom.",
    },
    {
      label: "The break-even changes when the IO period ends, so this analysis is premature.",
      isBest: false,
      explanation:
        "The IO period is the current window — the break-even analysis is entirely valid for it. When amortization begins, debt service rises and the break-even tightens. A good lender or underwriter calculates both: the IO-period break-even (current) and the amortizing break-even (future), and monitors which is binding. Deferring the analysis isn't discipline — it's a gap.",
    },
  ],
  takeaway:
    "DSCR covenant sensitivity traces through minimum NOI (covenant × debt service) → minimum revenue (min NOI + fixed OpEx). Fixed expenses create a revenue floor that's higher than the NOI math alone suggests — this is why covenant stress-tests must be done in revenue space, not just DSCR ratio space. Always translate the dollar break-even to occupancy or rent terms to make it actionable.",
  tips: [
    "Min NOI = covenant ratio × annual debt service.",
    "Min revenue = min NOI + fixed OpEx (when expenses can't flex down).",
    "Revenue headroom ÷ revenue = break-even revenue decline percent — translate to occupancy equiv.",
  ],
};
