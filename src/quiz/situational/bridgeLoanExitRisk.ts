import type { SituationalCase } from '../../types/situational';

export const bridgeLoanExitRisk: SituationalCase = {
  id: 'bridge-loan-exit-risk',
  title: 'Debt: your bridge loan matures in 6 months and you\'re short of the extension test',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['assetManagement', 'mortgageUw'],
  scenario:
    "You're the asset manager on a value-add multifamily deal funded with a $28M bridge loan (3-year term with two 1-year extension options). The loan is 24 months in; the first extension requires a minimum 1.20x DSCR and 88% physical occupancy. Current occupancy is 84% (renovation program is 65% complete — 20 units mid-turnover). Trailing 3-month DSCR is 1.12x. The lender's extension window opens in 60 days. Renovation cost remaining: $900k. Market rents for renovated units are tracking $175/month above unrenovated.",
  data: [
    { label: 'Bridge loan balance', value: '$28M' },
    { label: 'Loan maturity (from today)', value: '6 months' },
    { label: 'Extension test: DSCR', value: '1.20x minimum' },
    { label: 'Extension test: Occupancy', value: '88% physical occupancy' },
    { label: 'Current DSCR (T-3)', value: '1.12x' },
    { label: 'Current occupancy', value: '84% (20 units mid-turnover)' },
    { label: 'Renovation remaining', value: '$900k across 15 units' },
    { label: 'Renovated unit rent premium', value: '$175/mo above unrenovated' },
  ],
  question:
    "You have 60 days until the extension window opens. What are your levers to meet both tests, and what's your fallback if you can't?",
  options: [
    {
      label:
        "Two tests, two levers. For occupancy: the 20 mid-turnover units are the main drag (84% with 20 off-market = ~87% if those were leased). Accelerate completions on the units closest to done — prioritize the 5-8 units with <2 weeks remaining to get them leased before the test date; consider holding 12 remaining renovations until post-extension to stabilize occupancy above 88%. For DSCR: at 1.12x trailing, you need ~7% NOI improvement to reach 1.20x. Completing and leasing the near-done units at $175 premium directly lifts NOI. If both tests can't be met organically, engage the lender proactively now — lenders generally prefer a pre-maturity workout conversation over a default; options include a modification (waiving the occupancy test for one extension), a short-term principal paydown to improve coverage, or a 90-day maturity extension to allow occupancy to season.",
      isBest: true,
      explanation:
        "Right framework. The 20 mid-turnover units are the source of both test failures — they're simultaneously suppressing occupancy and NOI. Triaging which units to complete now vs. defer is the key lever. Completing 5-8 near-done units before the test date can potentially clear both thresholds. Proactive lender outreach before the window opens is critical: lenders who first hear about a covenant miss at the window are less flexible than lenders who've been managing the situation for 60 days. Bridge lenders in value-add deals often have modification protocols for execution delays — but only if raised early.",
    },
    {
      label:
        "Proceed to the extension window normally — bridge lenders almost always grant extensions because the alternative (foreclosure) is worse for them.",
      isBest: false,
      explanation:
        "Legally wrong. Extension tests are conditions precedent, not negotiating leverage — if the borrower doesn't meet them, the lender has the option to accelerate maturity, charge extension fees, or refuse the extension entirely. 'They won't foreclose' is not a plan; it's wishful thinking. Bridge lenders underwriting value-add deals price in execution risk and reserve rights specifically for situations where the business plan isn't tracking. Proactive management (raise it early, propose a solution) is consistently better than hoping the lender defaults to leniency.",
    },
    {
      label:
        "Accept all available units to lease as fast as possible regardless of renovation status — occupancy is the binding test.",
      isBest: false,
      explanation:
        "Getting to 88% occupancy by leasing mid-renovation or unrenovated units at below-market rates might clear the occupancy test but will suppress NOI and likely fail the 1.20x DSCR test simultaneously. The two tests are linked: the DSCR test is the harder one to meet on below-market rents. Strategic triage (finish the closest units to maximize both occupancy and rent premium) is better than a land-rush for occupancy at the expense of NOI.",
    },
    {
      label:
        "Sell the property before the extension window — a 64% renovation completion with 84% occupancy is a viable value-add sale story for another buyer.",
      isBest: false,
      explanation:
        "Not necessarily wrong as a strategic option, but premature as the first response. A 24-month-in value-add asset at 64% completion hasn't captured most of its value creation potential — selling now means crystallizing below-target returns. The right sequence is to exhaust the modification/extension options first. A sale should be on the table if: the extension can't be achieved even with lender accommodation, a permanent loan refi at maturity is unavailable, and the equity partners would net more from a sale-at-current-value than from a distressed recap. It's a fallback, not a first response.",
    },
  ],
  takeaway:
    "Bridge loan extension tests are simultaneous conditions precedent — meeting one doesn't waive the other. The right management response is to triage the unit completion schedule to maximize progress on both tests before the window, not to treat them independently. Proactive lender engagement 60+ days before the window is consistently better than presenting a covenant shortfall at the moment it's tested — lenders have more flexibility earlier and are less likely to characterize the miss as a management failure.",
  tips: [
    "Bridge extension tests are typically tied to T-3 or T-6 trailing averages for DSCR — the test date looks backward, so leasing activity today improves the test reading weeks from now.",
    "Lender modification options for covenant misses: waiver (one-time relief), amendment (changes the test threshold), principal paydown in exchange for relief, or extended maturity with increased reserve holdback.",
    "Bridge lender default rights: upon test failure, the lender can refuse the extension, accelerate the loan, or invoke a cash management agreement — all of which are much more expensive than a pre-negotiated modification.",
  ],
};
