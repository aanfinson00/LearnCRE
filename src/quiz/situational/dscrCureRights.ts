import type { SituationalCase } from '../../types/situational';

export const dscrCureRights: SituationalCase = {
  id: 'dscr-cure-rights',
  title: 'DSCR cure rights — how much cash does the sponsor actually need?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['mortgageUw', 'assetManagement'],
  documentExcerpt: {
    docType: 'loan',
    label: 'Section 6.04(b) — DSCR Cure Mechanics',
    text: `Borrower may cure any failure of the DSCR covenant by depositing
cash with Lender (the "Cure Cash") to be held in the DSCR Cure
Reserve. For purposes of recalculating the DSCR, the outstanding
principal balance shall be deemed reduced by the amount of Cure
Cash on deposit, and Debt Service shall be recalculated using such
notionally reduced principal balance, the contract interest rate,
and the original amortization schedule. Cure Cash shall be released
to Borrower at the earlier to occur of (i) the DSCR (calculated
without giving effect to the Cure Cash) exceeding 1.25:1.00 for two
consecutive Test Dates, or (ii) repayment in full of the Loan.

Maximum Cures. Borrower may not exercise the cure right more than
four (4) times in the aggregate during the term of the Loan, and
no more than two (2) times in any rolling four-quarter period.`,
  },
  scenario:
    'NOI is running $2.4M annualized; debt service is $2.2M ($25M loan @ 7%, 30-year amort). Required DSCR is 1.20×. The sponsor has $1M of cash available. The next Test Date is in 3 weeks.',
  data: [
    { label: 'Annualized NOI', value: '$2.4M' },
    { label: 'Annual debt service', value: '$2.2M' },
    { label: 'Current DSCR', value: '~1.09×' },
    { label: 'Required DSCR', value: '1.20×' },
    { label: 'Cure cap', value: '4 total / 2 per rolling 4Q' },
    { label: 'Cash on hand', value: '$1M' },
  ],
  question:
    'How much cure cash does the sponsor need to clear the test, and is the $1M they have enough?',
  options: [
    {
      label:
        'They need ~$3.6M of cure cash. NOI of $2.4M ÷ 1.20 target = $2.0M of allowable debt service. They\'re running $2.2M, so they need to notionally cut DS by ~$0.2M. At a 7% / 30y constant of ~7.98%, that requires reducing principal by $0.2M / 0.0798 ≈ $2.5M. But the cure also needs to leave the DSCR *just at* the threshold, so practical cure includes a buffer (~$3.6M). The $1M is not enough; sponsor needs to find the rest or face EOD.',
      isBest: true,
      explanation:
        'Cure math step-by-step: (1) target debt service = NOI / DSCR target = $2.4M / 1.20 = $2.0M. (2) need to cut current DS of $2.2M by $0.2M. (3) reducing principal by X cuts DS by X × loan-constant. At 7% / 30y, constant ≈ 7.98%. So X = $0.2M / 0.0798 ≈ $2.5M of notional principal reduction = $2.5M of cure cash. In practice, lenders calculate to the *exact* DSCR threshold, and prudent sponsors over-collateralize by 15-20% to buffer next quarter — call it ~$3.0-3.6M. The $1M is well short. Sponsor either finds another $2-3M (capital call to LP, refi, equity raise) or accepts EOD with all its consequences (cross-default, accelerated maturity, control loss).',
    },
    {
      label:
        'They need $200k of cure cash — exactly the NOI shortfall.',
      isBest: false,
      explanation:
        'Confuses NOI shortfall with cure cash. Cure cash is *principal reduction* (loan-balance proxy), not NOI substitute. To cut $200k of DS via principal reduction at 7.98% loan constant, sponsor needs $200k / 7.98% ≈ $2.5M of cure cash, not $200k.',
    },
    {
      label:
        'Cure cash is a 1:1 substitution for debt service; sponsor needs the full $2.2M.',
      isBest: false,
      explanation:
        'Misreads the mechanic. Cure cash *notionally reduces principal*, which reduces calculated DS via the loan constant — not a direct DS substitute. Direct DS substitution would require ~$2.2M; principal-proxy substitution requires ~$2.5M for full cover, which is close but not by coincidence.',
    },
    {
      label:
        'They can simply keep curing repeatedly until NOI recovers — there\'s no limit.',
      isBest: false,
      explanation:
        'The clause specifies a 4-cure aggregate cap and 2-per-rolling-4Q cap. Sponsor cannot cure indefinitely; if NOI doesn\'t recover, eventually they hit the cap and Lender can declare EOD.',
    },
  ],
  takeaway:
    'DSCR cure cash isn\'t a 1:1 NOI substitute — it\'s a *principal-reduction proxy*. The math: Cure $ = (current DS − target DS) / loan constant. At ~8% loan constants, $1 of NOI shortfall typically requires ~$12-13 of cure cash. Most sponsors are surprised by how much capital a "small" DSCR miss requires. Plan ahead or you\'ll be capital-calling LPs at the worst possible moment.',
  tips: [
    'Cure cash math: (current DS − target DS) / loan constant ≈ $X. Memorize the inverse of common loan constants.',
    'Always include a buffer (~15-20%) so the next quarter doesn\'t need a fresh cure.',
    'Cure caps are real. 4 total + 2 per rolling 4Q is standard; some lenders are tighter.',
    'EOD consequences cross all loans (cross-default), so missing a small DSCR test on one asset can blow up the whole portfolio. Cure aggressively when the math is feasible.',
  ],
};
