import type { SituationalCase } from '../../types/situational';

export const floatingRateDebtShock: SituationalCase = {
  id: 'floating-rate-debt-shock',
  title: 'Rate cap expiring — renew or accept the workout?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement', 'mortgageUw'],
  assetClass: 'mixed',
  scenario:
    'A bridge loan was originated 2 years ago: $19.5M floating at SOFR + 300 bps, 3-year term, 1-year extension option. The sponsor bought an interest rate cap at SOFR = 3.5% for $250K. SOFR today is 5.75%, so the cap is in-the-money (all-in rate = 6.5% capped vs. 8.75% uncapped). The cap expires in 4 months. To exercise the extension, the lender requires a new cap at SOFR = 4.5% — current cost: $600K. Without the extension, the loan matures in 4 months. Property NOI: $1.4M. Estimated value: ~$22M (6.4% cap). LTV: ~88.6%.',
  data: [
    { label: 'Loan balance', value: '$19.5M' },
    { label: 'Current all-in rate (capped)', value: '6.5% (SOFR cap = 3.5%)' },
    { label: 'Annual debt service (capped)', value: '$19.5M × 6.5% = $1.27M' },
    { label: 'NOI', value: '$1.4M → DSCR ~1.10x (capped)' },
    { label: 'LTV', value: '~88.6% ($19.5M ÷ $22M)' },
    { label: 'New cap cost (SOFR = 4.5% strike)', value: '$600K' },
    { label: 'Extension option', value: '1 year' },
  ],
  question: 'What is the most important factor in deciding whether to pay $600K for the new cap and take the extension?',
  options: [
    {
      label: 'Whether there is a realistic exit or refinance path within the 12-month extension — LTV at 88.6% forecloses most refi options, so the cap cost is secondary to whether the extension creates time for a viable solution.',
      isBest: true,
      explanation:
        'At 88.6% LTV, a permanent refi is impossible in most environments (max agency/CMBS LTV = 65–70%, implying max proceeds of ~$14–15M vs. $19.5M balance). The realistic exits are (1) sell at a likely equity loss, or (2) recapitalize with fresh equity injected to pay down to a refinanceable LTV. The $600K cap cost is meaningful but secondary: if there\'s no credible exit plan, paying $600K extends a problem rather than solving it. The key question is: does the 12-month window create a path, or just buy time while reserves are consumed?',
    },
    {
      label: 'Whether the $600K cap cost can be justified by the interest savings from capping the rate.',
      isBest: false,
      explanation:
        'The cap cost analysis compares $600K to the interest delta between capped and uncapped rate for 1 year. At SOFR = 5.75%, uncapped rate = 8.75%, capped rate = 7.5% (new cap at SOFR = 4.5%) — interest delta = 1.25% × $19.5M = $244K/year. The cap costs more than the interest savings in the first year. But even if the math worked, it doesn\'t matter if there\'s no exit — you\'re just saving $244K on a deal heading toward default.',
    },
    {
      label: 'Whether DSCR recovers above 1.25x if SOFR drops to the new cap strike.',
      isBest: false,
      explanation:
        'At the new cap strike (SOFR = 4.5% → all-in 7.5% → debt service = $19.5M × 7.5% = $1.46M vs. NOI $1.4M → DSCR = 0.96x). Even at the new cap strike, DSCR is below 1.0x. DSCR analysis confirms the asset doesn\'t cover debt service in any rate scenario — the core problem is over-leverage (88.6% LTV), not the interest rate level.',
    },
    {
      label: 'Extend automatically — the lender won\'t foreclose if you\'re making payments and the cap renews.',
      isBest: false,
      explanation:
        'Lenders don\'t always accept extension even with a new cap — at 88.6% LTV, the lender may prefer a workout, modification, or new borrower recapitalization over a simple time extension. "Paying and extending" without a credible business plan often results in the sponsor spending capital (cap cost, reserves) on a deal that ultimately requires the same exit discussion, just later and with fewer resources.',
    },
  ],
  takeaway:
    'Rate cap economics can\'t be evaluated without first assessing LTV and exit path. When LTV exceeds 80–85%, the maturity default risk dominates: the question shifts from "can we afford the cap?" to "does this extension create a realistic exit, or just delay the inevitable?" High-LTV bridge loans heading toward maturity require a recapitalization plan, not just a rate-management decision.',
  tips: [
    'Extension viability test: model the exit under a sale or refi within the extension period, net of payoff.',
    'LTV > 85% + NOI < debt service = structural problem; a cap extension addresses neither.',
    'Compare cap renewal cost vs. equity injection needed to hit a refinanceable LTV — often equity wins.',
  ],
};
