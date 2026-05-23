import type { SituationalCase } from '../../types/situational';

export const sensitivityRefiProceeds: SituationalCase = {
  id: 'sensitivity-refi-proceeds',
  title: 'NOI comes in short at maturity — what happens to the refi?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'You are modeling a 5-year multifamily hold. The base case projects Year-5 NOI of $3.0M. At a 5.75% exit cap and 70% LTV, the refi produces a $52.2M value and a $36.5M new loan, comfortably covering the $32.0M maturing balance. The LP investment thesis depends on a clean refi with no equity injection. At maturity, actual NOI is $2.6M — 13% below base case.',
  data: [
    { label: 'Base-case Year-5 NOI', value: '$3.0M' },
    { label: 'Exit cap rate', value: '5.75%' },
    { label: 'Refi LTV assumption', value: '70%' },
    { label: 'Maturing loan balance', value: '$32.0M' },
    { label: 'Actual Year-5 NOI', value: '$2.6M (13% below plan)' },
  ],
  question: 'What happens to the refi when NOI misses by 13%, and what options does the sponsor have?',
  options: [
    {
      label: 'Value drops to $45.2M ($2.6M / 5.75%), and the 70% LTV loan is $31.6M — $400k short of covering the $32.0M maturing balance. The sponsor must either inject equity, negotiate a loan extension, or accept a partial paydown at maturity.',
      isBest: true,
      explanation:
        '$2.6M / 0.0575 = $45.2M stressed value. $45.2M × 70% = $31.6M maximum loan proceeds under 70% LTV. Shortfall: $31.6M − $32.0M = −$400k. That $400k must come from somewhere: a GP equity injection, LP capital call (if the LPA permits), or a loan modification request. Additionally, if the lender applies a DSCR test (say 1.25× at an 8% interest rate), $2.6M NOI / (8% × $32M) = $2.6M / $2.56M = 1.02× — well below the threshold, forcing a smaller loan. In practice, the binding constraint may reduce proceeds far below $31.6M, creating a much larger shortfall. Stress the DSCR test alongside LTV.',
    },
    {
      label: 'The refi works — 13% below plan is within the normal variance band, and permanent lenders tolerate modest NOI shortfalls.',
      isBest: false,
      explanation:
        'Permanent lenders apply maximum LTV and minimum DSCR constraints that are mechanical, not judgmental. A 13% NOI miss on this deal produces a $45.2M value, a $31.6M maximum LTV-constrained loan, and a potential DSCR failure — there is no "tolerance band" that absorbs a $400k shortfall against the maturing balance. The refi shortfall must be quantified and addressed.',
    },
    {
      label: 'Sell instead of refi — if NOI is short, selling at the stressed cap generates more equity than a constrained refinance.',
      isBest: false,
      explanation:
        'Possibly correct as a strategic decision, but it does not answer the sensitivity question. Selling at $45.2M with a $32.0M maturing balance and closing costs leaves roughly $12.5M for equity — which may or may not clear the LP preferred return. The question asks specifically what happens to the refi, and the answer is that it does not cleanly cover the maturity without an equity injection or loan modification. The sell-vs-refi analysis is a separate decision that comes after understanding the constraint.',
    },
    {
      label: 'Test only the debt yield constraint — if debt yield clears, the full loan amount is available regardless of LTV.',
      isBest: false,
      explanation:
        'Both LTV and debt yield (or DSCR) are binding constraints, and either can size the loan lower. Debt yield on $31.6M loan: $2.6M / $31.6M = 8.2% — may clear. But LTV is independently constraining the loan to $31.6M, which is already $400k short of the maturity. You must test both constraints; the binding one governs. Running only one leaves the analysis incomplete.',
    },
  ],
  takeaway:
    'A 13% NOI shortfall at refi can convert a clean refinance into a maturity trap. Always stress-test the refi alongside your base case: apply both LTV and DSCR constraints to size the available loan at stressed NOI. If the proceeds do not cover the maturing balance under the stress scenario, model the equity injection or extension option before signing the LP commitment.',
  tips: [
    'Refi shortfall = maturing loan balance − min(LTV-constrained, DSCR-constrained) loan amount at stressed NOI and stressed value.',
    'Test both constraints simultaneously — LTV and DSCR can both bind on the same stressed scenario, and the tighter one governs.',
    'A GP equity injection to cure a refi shortfall may require LP consent or trigger GP/LP waterfall conversations.',
  ],
};
