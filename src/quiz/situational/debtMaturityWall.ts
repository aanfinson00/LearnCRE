import type { SituationalCase } from '../../types/situational';

export const debtMaturityWall: SituationalCase = {
  id: 'debt-maturity-wall',
  title: 'Loan matures in 90 days and the lender will not extend — what do you do?',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement', 'portfolioMgmt'],
  scenario:
    'You are the GP managing a $35M office-anchored mixed-use asset in a secondary market. Your $22M bridge loan matures in 90 days. The original lender declined to extend because in-place DSCR of 1.05x fails their 1.20x extension threshold. Asset occupancy is 83%; stressed market value is approximately $30M (cap rates widened ~100bps since origination). Remaining callable LP capital: $2M. No leases are rolling in the next 12 months.',
  data: [
    { label: 'Loan balance', value: '$22M (matures in 90 days)' },
    { label: 'Stressed asset value', value: '~$30M (cap rate +100bps vs. origination)' },
    { label: 'LTV (stressed)', value: '~73%' },
    { label: 'In-place DSCR', value: '1.05x' },
    { label: 'Lender extension threshold', value: '1.20x DSCR' },
    { label: 'Callable LP capital', value: '$2M' },
    { label: 'Occupancy', value: '83%' },
  ],
  question: 'What are your primary options, and what determines which path you pursue?',
  options: [
    {
      label:
        'Three paths in order of preference: (1) new bridge or mezz lender at higher cost to buy 12–24 months; (2) partial LP paydown + lender negotiation to cure the DSCR threshold; (3) controlled sale before maturity. Default is the fourth option and the worst — it transfers control to the lender and destroys equity recovery.',
      isBest: true,
      explanation:
        'Defaulting at maturity is not a negotiating tactic — it is a binary bad outcome. Once you are past maturity, the lender has acceleration rights, may appoint a receiver, and can force a sale on their timeline at their price. GP fiduciary duty requires exhausting equity-preservation options first. Path 1: a new bridge or mezz lender at 9–10% is painful but buys time for NOI recovery. Path 2: the math on LP capital — $2M paydown gets the loan to $20M; at the same NOI, that moves DSCR from 1.05x to approximately 1.15x — still below 1.20x, but now you have leverage in the lender negotiation (partial cure + 6-month extension may be achievable). Path 3: a controlled sale at $30M returns ~$8M to LP equity and preserves GP reputation; a lender-forced sale likely returns less. The choice between paths hinges on: probability of NOI recovery, LP willingness to fund the capital call, and whether a new lender will touch a 73% LTV office credit.',
    },
    {
      label:
        'Let the loan default and negotiate from a position of strength — lenders never want the headache of taking an asset back.',
      isBest: false,
      explanation:
        '"Negotiate from strength post-default" is a myth. Once you are in default, the lender has contractual rights to accelerate, appoint a receiver, and control the disposition. Some lenders will negotiate a forbearance, but that is at their discretion and comes with onerous conditions. More importantly, the GP fiduciary duty to LPs requires acting before default, not waiting to see if the lender blinks.',
    },
    {
      label:
        'Call all $2M of LP capital and use it to retire enough of the loan to clear the 1.20x DSCR threshold — this is clearly the cheapest path.',
      isBest: false,
      explanation:
        'The math does not fully work. To move DSCR from 1.05x to 1.20x: required debt service at 1.20x = NOI / 1.20x. If in-place NOI is ~$2.1M and loan rate is ~7%, current DS ≈ $1.97M. Required DS at 1.20x = $2.1M / 1.20 = $1.75M. Loan balance needed to produce $1.75M DS at 7% / 30yr ≈ $18.5M — a required paydown of $3.5M, not $2M. LP capital alone does not close the gap. You would need the lender to also accept a lower DSCR threshold or agree to a partial-cure extension.',
    },
    {
      label:
        'List the asset for sale immediately at $30M — recovering $8M in LP equity is better than losing it in a forced sale.',
      isBest: false,
      explanation:
        'A controlled sale is Path 3 — not wrong, but calling it the immediate first move forecloses cheaper alternatives. If NOI is recoverable within 12–24 months (new lease, operating improvement), the equity recovery could be materially higher than $8M. The controlled sale is the correct backstop if refi and extension fail; it should be run in parallel as an option, not as the first decisive action.',
    },
  ],
  takeaway:
    'A maturity wall is a negotiation problem with three ranked paths: buy time with new debt, cure the DSCR with LP capital, or execute a controlled sale. Default hands control to the lender and should be avoided at almost any cost. The analytical framework: (1) can NOI recover in 12–24 months? (2) is LP capital available and willing? (3) what does the sale market offer today vs. in 18 months? Most GPs wait too long to start this analysis — the time to run it is at origination, not at T-90.',
  tips: [
    'DSCR cure math: know exactly how much NOI growth or paydown is required to hit the extension threshold — not just that you are failing.',
    'Mezz and bridge capital is expensive in a distress scenario but a 9% cost of capital is often better than a forced-sale haircut.',
    'Run a parallel sale marketing process the moment you see a maturity problem forming — even if you do not intend to sell, the option has value.',
  ],
};
