import type { SituationalCase } from '../../types/situational';

export const floatingRateBridgeStress: SituationalCase = {
  id: 'floating-rate-bridge-stress',
  title: 'SOFR moves +100 bps — what breaks in your bridge deal?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'You acquired a value-add multifamily asset for $30M on a 3-year floating-rate bridge: $21M at SOFR + 275 bps. At close, SOFR was 4.75%, making the all-in rate 7.50%. Year 1 NOI (88% occupancy, partial lease-up) is $1.78M. DSCR at close was 1.13×. Six months later, SOFR has risen to 5.75%.',
  data: [
    { label: 'Loan balance', value: '$21M (70% of $30M)' },
    { label: 'Rate at close', value: 'SOFR 4.75% + 275 bps = 7.50%' },
    { label: 'New SOFR', value: '5.75% (+100 bps)' },
    { label: 'New all-in rate', value: '8.50%' },
    { label: 'Year 1 NOI', value: '$1.78M (partial lease-up)' },
    { label: 'DSCR at close', value: '1.13×' },
  ],
  question: 'What is the primary risk the +100 bps move creates, and how do you size it?',
  options: [
    {
      label: 'The deal crosses below 1.0× DSCR — at 8.50%, annual interest is $1.785M, which nearly equals the $1.78M NOI. The $210K annual interest increase ($21M × 1%) consumed the entire debt coverage cushion.',
      isBest: true,
      explanation:
        'At 7.50%: $21M × 7.5% = $1.575M interest. DSCR = $1.78M / $1.575M = 1.13×. At 8.50% (+100 bps): $21M × 8.5% = $1.785M interest. DSCR = $1.78M / $1.785M = 0.997× — below 1.0×. The $210K annual increase ($21M × 1%) was exactly equal to the existing $205K coverage cushion ($1.78M − $1.575M). The deal is now cash-flow-negative: the borrower must contribute equity to fund debt service each month. Most bridge loan agreements include a cash trap trigger at 1.0–1.05× DSCR; below that, excess cash is swept to a reserve rather than distributed. Below 1.0×, the lender may declare an event of default or require a principal paydown. This is why rate caps (bought at origination) are essential on floating-rate bridge deals.',
    },
    {
      label: 'The +100 bps move reduces IRR by about 1% — manageable over a 3-year hold.',
      isBest: false,
      explanation:
        'The IRR impact depends on whether the deal goes cash-flow-negative. At 70% LTV, $21M × 1% = $210K of additional annual interest cost. On $9M of equity, that\'s $210K / $9M = 2.3% of equity every year — roughly 200–300 bps of IRR drag across a 3-year hold. More critically, when debt service exceeds NOI, you face capital calls, not just a smaller IRR. "About 1%" materially understates the risk.',
    },
    {
      label: 'Buy a rate cap retroactively — that\'s the product that hedges this risk.',
      isBest: false,
      explanation:
        'Rate caps should be purchased at origination, not after a 100 bps rate move. Buying a cap after the move means it\'s priced to reflect current rates — dramatically more expensive. The answer to "what risk does the rate move create" is not "buy a cap now"; it\'s "the deal is now cash-flow-negative and you need to describe the coverage shortfall and your remediation options."',
    },
    {
      label: 'The main risk is exit cap expansion — higher rates widen caps and reduce the exit value.',
      isBest: false,
      explanation:
        'True, but secondary. Exit cap expansion is a Year 3 problem. The DSCR breach is an immediate problem (this month). In a leveraged deal, current cash flow coverage takes priority over terminal value analysis. Address the breach first; model the exit sensitivity as a separate overlay.',
    },
  ],
  takeaway:
    'On floating-rate bridge debt, every 100 bps of rate movement = loan balance × 1% of additional annual interest — a dollar-for-dollar hit to equity cash flow. At $21M, that\'s $210K/year. When that $210K exceeds the debt service cushion, the deal turns cash-flow-negative and covenant violations become immediate. The prevention: (1) buy a rate cap at origination sized to maintain 1.05× DSCR at the cap strike; (2) size the interest reserve to fund 18–24 months of cash-flow-negative periods; (3) stress-test DSCR at +100 and +200 bps before closing.',
  tips: [
    '+100 bps on $21M = $210K/yr additional interest — know this number before you close.',
    'Rate cap sizing: choose a strike that keeps DSCR ≥ 1.05× even at the cap.',
    'Bridge deals cash-flow-negative in lease-up; rate moves on top make it worse, fast.',
  ],
};
