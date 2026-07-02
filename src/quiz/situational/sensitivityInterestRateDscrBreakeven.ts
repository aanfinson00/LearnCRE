import type { SituationalCase } from '../../types/situational';

export const sensitivityInterestRateDscrBreakeven: SituationalCase = {
  id: 'sensitivity-interest-rate-dscr-breakeven',
  title: 'How much can rates rise before this loan breaks covenant?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['mortgageUw', 'acquisitions'],
  assetClass: 'mixed',
  scenario:
    'You\'re underwriting a floating-rate acquisition loan. In-place NOI is $2,000,000. The loan is $24,000,000, interest-only, at SOFR + 250 bps, currently pricing at an all-in rate of 6.75% (SOFR at 4.25%). The loan covenant requires a minimum 1.20x DSCR, tested quarterly on trailing NOI. You need to know how much SOFR can rise before the deal breaches covenant, holding NOI flat.',
  data: [
    { label: 'In-place NOI', value: '$2,000,000' },
    { label: 'Loan amount', value: '$24,000,000' },
    { label: 'Current all-in rate', value: '6.75% (SOFR 4.25% + 250 bps spread), interest-only' },
    { label: 'DSCR covenant', value: '1.20x minimum' },
    { label: 'Current debt service (I/O)', value: '$1,620,000/year' },
    { label: 'Current DSCR', value: '$2,000,000 ÷ $1,620,000 ≈ 1.23x' },
  ],
  question: 'Roughly how much can SOFR rise before the loan breaches the 1.20x DSCR covenant, holding NOI flat?',
  options: [
    {
      label:
        'About 20 bps — the maximum debt service the covenant allows is NOI ÷ 1.20 = $1,666,667, only about $46,667 above current debt service of $1,620,000; on a $24M I/O balance that\'s roughly 19-20 bps of all-in rate, meaning SOFR has very little room to move before breaching.',
      isBest: true,
      explanation:
        'Max allowable debt service at the covenant floor: $2,000,000 ÷ 1.20 = $1,666,667/year. Current debt service is $1,620,000, leaving only $46,667/year of headroom. On a $24,000,000 I/O balance, $46,667 ÷ $24,000,000 ≈ 0.19%, or about 19-20 bps of all-in rate increase — SOFR can only rise about 19-20 bps before the deal breaches covenant, holding NOI flat. That\'s a thin cushion for a floating-rate loan in a market where 25 bps moves happen in a single Fed meeting.',
    },
    {
      label: 'About 250 bps — the loan has a 250 bps spread, so rates would need to double the spread to cause a problem.',
      isBest: false,
      explanation:
        'Confuses the loan\'s spread over SOFR (a pricing input, fixed for the life of the loan) with the covenant cushion (a function of current DSCR versus the 1.20x floor). The spread has nothing to do with how much room exists before the covenant breaks — that\'s purely a function of the $46,667/year gap between current and maximum allowable debt service.',
    },
    {
      label: 'About 100 bps — a full percentage point is the standard stress-test increment used in most rate-shock underwriting.',
      isBest: false,
      explanation:
        'Applies a generic stress-test convention instead of solving for this specific deal\'s actual covenant math. 100 bps of rate increase on a $24M I/O balance would add $240,000/year of debt service, pushing DSCR to $2,000,000 ÷ ($1,620,000 + $240,000) ≈ 1.08x — well below the 1.20x floor. A 100 bps stress test is a useful sensitivity to run, but the answer to "how much room before breach" is the specific breakeven, not a round stress-test number.',
    },
    {
      label: 'The DSCR covenant is tested on trailing NOI, not forward rates, so rate moves don\'t affect covenant compliance until NOI itself changes.',
      isBest: false,
      explanation:
        'Misreads the mechanism. DSCR = NOI ÷ debt service; on a floating-rate loan, debt service moves immediately with SOFR even if NOI (the numerator) is untested and unchanged. The covenant can be breached purely by a rate increase with NOI completely flat — that\'s exactly the risk floating-rate borrowers face and the reason this sensitivity matters.',
    },
  ],
  takeaway:
    'On a floating-rate loan, solve for the covenant breakeven directly: max debt service = NOI ÷ covenant DSCR, compare to current debt service, and convert the gap to a rate move on the loan balance. Thin cushions (under ~50 bps) mean the deal needs a rate cap or hedge, not just a "stress test and hope" approach.',
  tips: [
    'Max allowable debt service = NOI ÷ covenant DSCR minimum — solve backward from there to find the rate cushion.',
    'On floating-rate debt, a covenant breach can happen purely from rate moves with NOI completely flat.',
    'A cushion under ~50 bps on a rate-sensitive loan is a flag for a rate cap requirement, not just a monitoring note.',
  ],
};
