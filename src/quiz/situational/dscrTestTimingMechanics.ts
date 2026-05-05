import type { SituationalCase } from '../../types/situational';

export const dscrTestTimingMechanics: SituationalCase = {
  id: 'dscr-test-timing-mechanics',
  title: 'DSCR test timing — when does the lender actually measure?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['mortgageUw', 'assetManagement'],
  documentExcerpt: {
    docType: 'loan',
    label: 'Section 6.04 — Financial Covenants',
    text: `(a) Minimum Debt Service Coverage Ratio. As of the last day of each
    fiscal quarter (each, a "Test Date"), Borrower shall maintain a
    Debt Service Coverage Ratio of not less than 1.20:1.00, calculated
    on a trailing-twelve-month basis using Net Operating Income as
    defined in Section 1.01.

(b) Cure Rights. If the DSCR as of any Test Date is below the required
    level, Borrower may, within thirty (30) days following Lender's
    written notice of such failure, deposit cash with Lender as
    additional collateral in an amount sufficient, when treated as a
    notional reduction of the outstanding principal balance, to cause
    the DSCR (recalculated giving effect to such notional reduction)
    to equal or exceed the required level.

(c) Failure to Cure. If Borrower fails to deliver such cure within
    thirty (30) days, an Event of Default shall be deemed to have
    occurred, and Lender may exercise all rights under Section 8.`,
  },
  scenario:
    'You\'re reviewing a loan agreement\'s DSCR covenant for a mid-size MF refi. The lender\'s clause is above. The asset is currently running 1.15× DSCR on T-12 NOI; the next quarterly Test Date is 45 days away. Your sponsor is debating whether to hold cash for a possible cure or pay it out as a Q3 distribution.',
  question:
    'Given the timing mechanics in the clause above, what\'s the most accurate read of the sponsor\'s exposure window?',
  options: [
    {
      label:
        'The sponsor has at least 45 days until measurement, then 30 more days from Lender\'s notice to cure with cash collateral. Total exposure window before EOD ≈ 75 days. The cure isn\'t a permanent fix — the cash is held as additional collateral and the underlying NOI problem still needs to be solved before the next Test Date.',
      isBest: true,
      explanation:
        'Read it tier by tier: (a) the test happens at quarter-end; (b) cure period runs 30 days from *Lender\'s written notice* of the failure (notice typically follows the quarter close by 1-2 weeks once Lender receives the operating reports); (c) failure to cure within that 30-day window crystallizes the EOD. So the practical timeline is: ~45 days to Test Date, ~10-14 days for Lender to issue notice, then 30 days to cure — ~75-90 days of total runway. The cure itself is a *cash-collateral pledge*, not a permanent waiver — sponsor has to keep curing every quarter unless NOI recovers. Holding cash for the cure is far safer than distributing it.',
    },
    {
      label:
        'The sponsor has 30 days to cure from the Test Date itself; missing the Test Date by even a day triggers an immediate EOD.',
      isBest: false,
      explanation:
        'Misreads the trigger language. Cure runs from "Lender\'s written notice" of failure, not from the Test Date itself. There\'s typically a 7-14 day gap between quarter-end and Lender\'s receipt of operating reports + issuance of notice.',
    },
    {
      label:
        'The cash deposit cures the covenant permanently — once posted, the DSCR test no longer applies until refinancing.',
      isBest: false,
      explanation:
        'A cash deposit cures *the failed Test Date*, not future ones. The sponsor must re-test next quarter; if NOI hasn\'t recovered, they\'ll need additional cure cash at the next Test Date too. Many loans cap how many cures Sponsor can deliver in a row before the lender can declare EOD regardless.',
    },
    {
      label:
        'The 1.20× test is measured on spot NOI at Test Date, so seasonal fluctuations alone could trigger it.',
      isBest: false,
      explanation:
        'Misreads the calculation method. Clause specifies "trailing-twelve-month basis," which smooths out seasonality. Spot-quarter measurement would be far more punitive.',
    },
  ],
  takeaway:
    'DSCR covenants have three time gates: Test Date (when measured), Notice Date (when Lender flags the failure), and Cure Deadline (typically 30 days from Notice). The compounding window is usually 60-90 days from quarter-end, not 30. Cures are typically cash-collateral pledges that fix one Test Date at a time — the underlying NOI problem still needs to be solved.',
  tips: [
    'T-12 vs spot NOI: most institutional loans use T-12 to smooth seasonality. Spot measurement is rare and far more punitive.',
    'Cure cash is held as additional collateral — it doesn\'t reduce the loan balance, just notionally for DSCR math.',
    'Some loans cap consecutive cures (e.g. 4 cures over the loan term). After the cap, lender can EOD regardless of cure.',
    'Always model the cure cost: at 1.20× DSCR target on $5M of debt service, ~$1M of NOI shortfall = ~$8.3M of cure-cash needed (cure cash × required-DSCR / DSCR achieved).',
  ],
};
