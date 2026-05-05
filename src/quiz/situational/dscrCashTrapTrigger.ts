import type { SituationalCase } from '../../types/situational';

export const dscrCashTrapTrigger: SituationalCase = {
  id: 'dscr-cash-trap-trigger',
  title: 'Cash trap activation — what does this lender clause actually do?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['mortgageUw', 'assetManagement', 'portfolioMgmt'],
  documentExcerpt: {
    docType: 'loan',
    label: 'Section 4.03 — Cash Management',
    text: `(a) Lockbox Activation Event. Upon the earlier to occur of (i) any
    Event of Default, or (ii) the DSCR being less than 1.10:1.00 as
    of any Test Date (a "Trigger Event"), all Operating Revenues
    shall be deposited directly into the Lockbox Account, and Lender
    shall control all disbursements therefrom in accordance with the
    Cash Management Waterfall set forth in subsection (c).

(b) Springing Recourse. The occurrence of a Trigger Event shall not,
    in and of itself, render the Loan recourse to the Guarantor, but
    any failure to deposit Operating Revenues into the Lockbox
    following a Trigger Event shall constitute a "Bad Boy Event,"
    rendering the Loan fully recourse to the Guarantor.

(c) Cash Management Waterfall. So long as a Trigger Event is
    continuing, available funds in the Lockbox Account shall be
    applied in the following order: (1) Taxes and Insurance reserves;
    (2) Debt Service; (3) Operating Expense Reserve (capped at 110%
    of T-3 monthly OpEx); (4) Capital Reserve (in accordance with
    Approved Budget); (5) Excess Cash Sweep to a Lender-controlled
    reserve until DSCR exceeds 1.20:1.00 for two consecutive Test
    Dates ("Trigger Cure").`,
  },
  scenario:
    'Your borrower\'s DSCR just printed at 1.08× on the most recent Test Date — below the 1.10× cash-trap trigger but still above the EOD-triggering 1.20× covenant minimum. The lender just sent activation notice. Sponsor is asking: "What does this actually mean for distributions?"',
  question:
    'What\'s the practical impact on the sponsor over the next 2-4 quarters?',
  options: [
    {
      label:
        'All operating cash flows go to the lockbox; sponsor gets nothing distributable until DSCR clears 1.20× for *two consecutive* Test Dates. Approved budget OpEx + capex still gets paid, but excess cash gets swept to a lender-controlled reserve. Until cure, sponsor has zero distributions but no recourse exposure — *unless* sponsor diverts operating cash to a non-lockbox account, which would trigger full springing recourse.',
      isBest: true,
      explanation:
        'Cash-trap mechanics in detail: (a) once trigger fires, all revenue goes through lockbox — sponsor loses cash control; (b) springing recourse is *not* automatic, but sponsor failure to comply (e.g. depositing rents to a non-lockbox account) is a "bad boy" carve-out that activates full personal recourse; (c) the waterfall pays operating necessities (taxes, insurance, debt service, operating + capex reserves) but sweeps the rest to a lender-controlled cash reserve; (d) cure requires *two consecutive* Test Dates above 1.20× — so even if next quarter prints 1.25×, sponsor is still locked. The two-quarter lookback is asymmetric: easy to enter, hard to exit. Sponsor should plan for at least 6 months of zero distributions and prepare a cure-cash reserve for the EOD-trigger covenant of 1.20×.',
    },
    {
      label:
        'Cash trap cures automatically as soon as one Test Date prints back above 1.10×.',
      isBest: false,
      explanation:
        'Misreads the cure trigger. Trap activates at <1.10× but cures at >1.20× for *two consecutive* Test Dates. The asymmetric thresholds + multi-quarter cure are deliberate — they make it easy for the lender to lock cash and hard for the borrower to unlock it.',
    },
    {
      label:
        'The lockbox fires immediately into full recourse to the guarantor — sponsor\'s personal assets are now at risk.',
      isBest: false,
      explanation:
        'Trigger Event alone does NOT trigger springing recourse. The springing-recourse carve-out only fires if sponsor *misbehaves* (e.g. diverts rents from the lockbox). A clean trigger event = sponsor loses cash control but keeps non-recourse status.',
    },
    {
      label:
        'Sponsor can negotiate to keep distributions during the trap period — these clauses are typically waivable.',
      isBest: false,
      explanation:
        'Cash-trap clauses are very rarely waived during the trap period — that\'s the whole point of the structure for the lender. Sponsor may negotiate for a one-time waiver pre-emptively (in exchange for a fee or rate bump), but post-trigger, the trap typically just runs.',
    },
  ],
  takeaway:
    'Cash-trap (lockbox) clauses are an asymmetric squeeze: they activate at one DSCR level but cure at a higher level, often requiring multi-quarter consistency. Sponsor exposure isn\'t recourse — it\'s cash-flow starvation. Springing recourse only fires on bad-actor behavior (diverting cash, fraud, voluntary bankruptcy). Always model the trap window into base-case underwriting on near-the-line deals.',
  tips: [
    'Activation < cure threshold. Read both numbers, not just the first one.',
    'Cure is usually multi-quarter: one good quarter doesn\'t escape; need consistency.',
    'Springing recourse ≠ trigger event. Recourse fires on *misbehavior during* the trigger, not on the trigger itself.',
    'Operating + capex reserves typically stay funded during a trap; only true excess cash gets swept.',
  ],
};
