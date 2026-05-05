import type { VocabTerm } from '../../types/vocab';

/** Debt + financing vocabulary — the lender side of every deal. */
export const DEBT_TERMS: VocabTerm[] = [
  {
    id: 'ltv',
    term: 'LTV',
    category: 'debt',
    difficulty: 'beginner',
    shortDef:
      'Loan-to-Value — loan amount ÷ property value. The most common debt-sizing constraint.',
    longDef:
      'LTV = Loan / Stabilized Value. Senior debt typically 60-75% LTV depending on asset class + market. Higher LTV = thinner equity cushion = higher risk. Loans often have an LTV maintenance covenant tested at refinance / sale.',
    distractors: [
      'Lifetime value — total return over hold.',
      'Levered total value — after-tax exit proceeds.',
      'Loan-to-vacancy ratio at lease-up.',
    ],
    reverseDistractorIds: ['ltc', 'dscr', 'debt-yield'],
  },
  {
    id: 'ltc',
    term: 'LTC',
    category: 'debt',
    difficulty: 'intermediate',
    shortDef:
      'Loan-to-Cost — loan amount ÷ total project cost. Used in construction lending.',
    longDef:
      'LTC = Loan / All-In Cost. For development deals where there is no "value" yet, LTC is the size constraint. Typical 60-70%. LTV applies post-stabilization. LTC + LTV are tested at different stages of the project.',
    distractors: [
      'Long-term commitment — extension option on a maturing loan.',
      'Lender total commitment, including unfunded amounts.',
      'Levered total cost — equity contributed only.',
    ],
    reverseDistractorIds: ['ltv', 'debt-yield', 'dscr'],
  },
  {
    id: 'dscr',
    term: 'DSCR',
    category: 'debt',
    difficulty: 'beginner',
    shortDef:
      'Debt Service Coverage Ratio — NOI ÷ annual debt service. Lender measure of cushion.',
    longDef:
      'DSCR = NOI / DS. A 1.25× DSCR means NOI covers DS by 25%. Lenders typically require 1.20-1.30× minimum. Below the covenant: cure (cash collateral pledge) or EOD. Tested quarterly on T-12 NOI in most modern loans.',
    distractors: [
      'Debt service capital reserve — cash held for upcoming payments.',
      'Debt structuring credit rating from S&P.',
      'Debt sweep coverage ratio — fraction of cash flow swept.',
    ],
    reverseDistractorIds: ['debt-yield', 'ltv', 'loan-constant'],
  },
  {
    id: 'debt-yield',
    term: 'Debt Yield',
    category: 'debt',
    difficulty: 'intermediate',
    shortDef:
      'NOI ÷ loan amount — the lender\'s unlevered return on the loan if they had to take the asset.',
    longDef:
      'Debt Yield = NOI / Loan. Independent of interest rate (unlike DSCR). A 10% debt yield means the lender earns 10% on its loan if it foreclosed at par. Modern lenders typically require 8-10% minimum, more on risk assets.',
    distractors: [
      'Yield on debt securities held by the lender.',
      'Coupon rate net of admin costs.',
      'Yield-to-maturity on the loan, including prepay penalty.',
    ],
    reverseDistractorIds: ['dscr', 'ltv', 'cap-rate'],
  },
  {
    id: 'loan-constant',
    term: 'Loan Constant',
    category: 'debt',
    difficulty: 'intermediate',
    shortDef:
      'Annual debt service ÷ loan amount. The "rate" you actually pay including amortization.',
    longDef:
      'Loan Constant = (Monthly Payment × 12) / Loan Balance. For a 30-year amort loan at 6% rate, the constant is ~7.2% (rate + amort). For an IO loan, constant = rate exactly. Used to compute max loan from NOI: Max Loan = NOI / DSCR / Loan Constant.',
    distractors: [
      'Fixed coupon rate stated in loan documents.',
      'Default rate applied during covenant breach.',
      'Loan-to-cost ratio held constant throughout draw period.',
    ],
    reverseDistractorIds: ['dscr', 'amort', 'coupon'],
  },
  {
    id: 'defeasance',
    term: 'Defeasance',
    category: 'debt',
    difficulty: 'advanced',
    shortDef:
      'Prepay alternative: borrower buys government bonds that produce identical cash flows to the loan.',
    longDef:
      'Common in CMBS loans. Instead of paying cash + a prepay penalty, borrower deposits Treasury securities that generate the exact remaining payment stream. Cost varies with rate environment: in falling-rate environments, defeasance is *more* expensive than the original loan balance.',
    distractors: [
      'Default-prevention reserve held by lender.',
      'Prepay penalty waived for refinance into same lender.',
      'Loan amendment that changes maturity date.',
    ],
    reverseDistractorIds: ['yield-maintenance', 'lockout', 'prepay-penalty'],
  },
  {
    id: 'yield-maintenance',
    term: 'Yield Maintenance',
    category: 'debt',
    difficulty: 'advanced',
    shortDef:
      'Prepay penalty equal to the lender\'s lost interest, discounted to present value at Treasury rate.',
    longDef:
      'YM = present value of remaining interest stream, using current Treasury rate as discount. In rising-rate environments, YM is small (lender can re-deploy at higher rate). In falling-rate environments, YM is punitive (lender can\'t re-deploy at original rate).',
    distractors: [
      'Lender\'s right to maintain stated yield via covenant testing.',
      'Yield floor in a floating-rate loan.',
      'Prepay penalty equal to a fixed % of unpaid balance.',
    ],
    reverseDistractorIds: ['defeasance', 'lockout', 'prepay-penalty'],
  },
  {
    id: 'io',
    term: 'IO (Interest-Only)',
    category: 'debt',
    difficulty: 'beginner',
    shortDef:
      'Period of the loan where borrower pays only interest, no principal amortization.',
    longDef:
      'IO loans (or IO periods within amortizing loans) reduce debt service early in the hold, boosting cash-on-cash. Common: 3-5 years of IO + then 25-year amort. Trade-off: higher balloon balance at maturity = higher refinance risk.',
    distractors: [
      'Initial Offering — first tranche of bonds issued.',
      'Index-Only — variable rate tied to single index.',
      'Indemnity-Only — non-recourse with carve-outs.',
    ],
    reverseDistractorIds: ['amort', 'coupon', 'spread'],
  },
  {
    id: 'amort',
    term: 'Amortization',
    category: 'debt',
    difficulty: 'beginner',
    shortDef:
      'Schedule of principal repayment over the loan term — typically 25-30 years for CRE.',
    longDef:
      'Amortization translates a fixed monthly payment into a mix of interest + principal that pays off the loan over the amort period. CRE loans often have shorter *terms* (5-10 years) than amort (25-30 years), creating a balloon balance at maturity.',
    distractors: [
      'Reduction of asset value over time per GAAP.',
      'Period during which loan is locked from prepay.',
      'Schedule of fee payments to loan servicer.',
    ],
    reverseDistractorIds: ['io', 'loan-constant', 'coupon'],
  },
  {
    id: 'coupon',
    term: 'Coupon',
    category: 'debt',
    difficulty: 'beginner',
    shortDef:
      'The interest rate stated on the loan — what you pay per dollar of principal annually.',
    longDef:
      'Coupon ≠ yield-to-maturity. Coupon is the headline rate; YTM accounts for fees + prepay assumptions. In a 7% IO loan, coupon = 7% = loan constant. In a 7% / 30y amort loan, coupon = 7% but loan constant ≈ 8%.',
    distractors: [
      'Loan-extension fee paid at closing.',
      'Discount applied to face value at origination.',
      'Mortgage rate net of points and fees.',
    ],
    reverseDistractorIds: ['spread', 'amort', 'loan-constant'],
  },
  {
    id: 'spread',
    term: 'Spread',
    category: 'debt',
    difficulty: 'intermediate',
    shortDef:
      'Loan rate above an index (Treasury, SOFR) — the lender\'s premium for risk.',
    longDef:
      'Quoted as bps over index: e.g. "T+250 bps" = 2.5% over the matched-tenor Treasury. Spread reflects: asset risk, sponsor strength, market liquidity. Tighter market = tighter spreads. Crisis = wider spreads.',
    distractors: [
      'Bid-ask difference on a loan in secondary market.',
      'Cap-rate spread between submarkets.',
      'Default spread implied by loan covenants.',
    ],
    reverseDistractorIds: ['coupon', 'cap-rate', 'loan-constant'],
  },
  {
    id: 'lockbox',
    term: 'Lockbox',
    category: 'debt',
    difficulty: 'intermediate',
    shortDef:
      'Lender-controlled cash account where all property revenues deposit during a trigger event.',
    longDef:
      'Activates on cash-trap triggers (typically DSCR < 1.10× or EOD). Property revenues flow to lockbox; lender controls disbursements via the cash management waterfall. Sponsor loses cash control until the trap clears.',
    distractors: [
      'Sponsor\'s reserve account for capex.',
      'Bank account holding earnest money in escrow.',
      'Custodial account for tenant security deposits.',
    ],
    reverseDistractorIds: ['cash-sweep', 'springing-recourse', 'lockout'],
  },
  {
    id: 'cash-sweep',
    term: 'Cash Sweep',
    category: 'debt',
    difficulty: 'intermediate',
    shortDef:
      'During a trigger event, excess cash is "swept" to a lender-controlled reserve, blocking distributions.',
    longDef:
      'Cash sweep + lockbox typically work together: lockbox captures revenue; the cash management waterfall pays operating + DS + reserves; anything left "sweeps" to a lender reserve until trigger cures (typically multi-quarter consistent performance).',
    distractors: [
      'Annual review of operating expenses.',
      'Quarterly distribution of reserve overage to LP.',
      'Year-end reconciliation of capex spending.',
    ],
    reverseDistractorIds: ['lockbox', 'springing-recourse', 'lockout'],
  },
  {
    id: 'springing-recourse',
    term: 'Springing Recourse',
    category: 'debt',
    difficulty: 'advanced',
    shortDef:
      'Non-recourse loan that converts to full personal recourse on listed "bad-boy" carve-outs.',
    longDef:
      'Standard carve-outs: voluntary BK, unauthorized transfer of controlling interests, waste / fraud / misappropriation, lockbox circumvention, environmental violations. The loan is "non-recourse" until sponsor misbehaves, then it springs to full personal recourse against guarantor.',
    distractors: [
      'Recourse that activates only at maturity.',
      'Recourse that decreases over the loan term.',
      'Personal guaranty for the first 12 months only.',
    ],
    reverseDistractorIds: ['bad-boy', 'lockbox', 'cash-sweep'],
  },
  {
    id: 'bad-boy',
    term: 'Bad-Boy Carve-Out',
    category: 'debt',
    difficulty: 'advanced',
    shortDef:
      'List of borrower acts that trip springing recourse — fraud, BK, unauthorized transfer, etc.',
    longDef:
      'Synonym for the events that activate springing recourse. Sponsor "bad behavior" — voluntary BK, fraud, waste, lockbox cheating, environmental violations. Designed to penalize bad actors while leaving the loan otherwise non-recourse.',
    distractors: [
      'Indemnity provisions for borrower\'s officers.',
      'Lender protections against credit-rating downgrades.',
      'Loan covenants triggered by sponsor turnover.',
    ],
    reverseDistractorIds: ['springing-recourse', 'lockbox', 'cash-sweep'],
  },
  {
    id: 'lockout',
    term: 'Lockout',
    category: 'debt',
    difficulty: 'advanced',
    shortDef:
      'Period at the start of a loan when prepayment is not allowed at any price.',
    longDef:
      'Common in CMBS: typically 1-3 years of lockout, then defeasance or yield maintenance. Locks borrower into the loan during the early high-coupon period. Important for buyers: an asset coming with a locked-out CMBS loan limits refinance optionality.',
    distractors: [
      'Period when lender cannot accelerate the loan.',
      'Period when loan rate is locked at origination.',
      'Period when borrower cannot exercise extension option.',
    ],
    reverseDistractorIds: ['defeasance', 'yield-maintenance', 'prepay-penalty'],
  },
  {
    id: 'prepay-penalty',
    term: 'Prepay Penalty',
    category: 'debt',
    difficulty: 'intermediate',
    shortDef:
      'Fee for paying off a loan before maturity — protects lender\'s expected yield.',
    longDef:
      'Common forms: defeasance, yield maintenance, declining-bps schedule (e.g. 5/4/3/2/1), or flat percent. Sponsor underwriting must factor prepay cost into refinance / sale calculations.',
    distractors: [
      'Late-payment fee for missed monthly debt service.',
      'Fee for extending a loan past maturity.',
      'Fee for missing loan covenant milestones.',
    ],
    reverseDistractorIds: ['defeasance', 'yield-maintenance', 'lockout'],
  },
  {
    id: 'cmbs',
    term: 'CMBS',
    category: 'debt',
    difficulty: 'advanced',
    shortDef:
      'Commercial Mortgage-Backed Securities — pool of CRE loans securitized into bond tranches.',
    longDef:
      'CMBS lenders originate loans intending to pool + sell as bonds. Typical features: 10-year term / 30-year amort / fixed-rate / non-recourse / lockout + defeasance prepay structure. Servicing is bifurcated: master servicer for performing loans, special servicer for distressed.',
    distractors: [
      'Construction Mortgage-Backed Securities — only construction loans.',
      'Commercial Mid-Bond Securities — public bond tranche.',
      'Convertible MBS — bonds that convert to equity at maturity.',
    ],
    reverseDistractorIds: ['mezz', 'bridge', 'defeasance'],
  },
  {
    id: 'bridge',
    term: 'Bridge Loan',
    category: 'debt',
    difficulty: 'intermediate',
    shortDef:
      'Short-term loan (1-3 years) used to acquire or stabilize an asset before permanent financing.',
    longDef:
      'Higher coupon than perm debt (typically L+300-500 bps) but more flexible: less covenant testing, more leverage, often interest-only. Used during lease-up, value-add, or pre-stabilization. Refinanced into perm debt at stabilization.',
    distractors: [
      'Loan to bridge acquisition deposit and final close.',
      'Long-tenor loan with 30-year amortization.',
      'Loan secured by both first-lien mortgage and equity pledge.',
    ],
    reverseDistractorIds: ['cmbs', 'mezz', 'lockout'],
  },
];
