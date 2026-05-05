import type { SituationalCase } from '../../types/situational';

export const waterfallEuropeanVsAmerican: SituationalCase = {
  id: 'waterfall-european-vs-american',
  title: 'European vs American waterfall — which one favors LPs?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    'You\'re reviewing two fund LPAs side by side. Fund A uses a deal-by-deal (American) waterfall: GP earns promote on each individual deal as it pays out, with no fund-level lookback. Fund B uses a fund-level (European) waterfall: GP gets no promote until LPs have been returned all contributed capital + pref across the entire fund. Both funds target a 7-year vehicle life and 8% pref / 80-20 above. The early-vintage deals are most likely to outperform; later deals may underperform.',
  question:
    'Which structure favors the LP, and why is the difference material?',
  options: [
    {
      label:
        'European favors LP — GP can\'t earn promote until LP is whole on capital + pref *across the full fund*. If early deals over-perform but later deals under-perform, GP earns nothing on the early wins until the whole fund clears the hurdle.',
      isBest: true,
      explanation:
        'European waterfalls aggregate hurdle-clearing across the entire fund, so GP\'s promote is held back until LPs have been returned all capital + pref. American waterfalls let GP take promote deal-by-deal, meaning the GP can be paid handsomely on early winners even if the fund as a whole later underperforms — clawback provisions try to recover this but never perfectly. Sophisticated institutional LPs (pension funds, sovereign wealth) almost always require European; family offices and HNW often accept American because the GP can show partner-paid distributions sooner.',
    },
    {
      label:
        'American favors LP — getting promote distributed earlier means LPs get their pro-rata share of cash flow sooner.',
      isBest: false,
      explanation:
        'Inverts the relationship. American doesn\'t accelerate LP pref payments — pref still flows tier 1 — it accelerates GP\'s promote, which is the part LPs are paying. The earlier-cash argument is real for LP\'s capital + pref, but those are paid first in either structure.',
    },
    {
      label:
        'They\'re economically equivalent over a full fund cycle, just with different timing.',
      isBest: false,
      explanation:
        'True only in a steady-state where all deals over-perform identically. Real funds have deal-level dispersion, and the dispersion is the whole point of European: in funds where some deals win and others lose, American + clawback may leave residual GP overpayment that can\'t be recovered (e.g. GP paid out funds on deal 1 that went into the GP\'s own pocket and is no longer recoverable when deal 5 underperforms).',
    },
    {
      label:
        'European favors GP — they get the certainty of seeing fund-level performance before promote crystallizes.',
      isBest: false,
      explanation:
        'GPs prefer American because they get paid sooner and clawback is messy to enforce in practice. Saying European favors GP because they "see fund-level performance first" misreads the incentive — GPs want money in hand, not certainty.',
    },
  ],
  takeaway:
    'European waterfalls (fund-level lookback) protect LPs from GP over-distribution on early winners; American waterfalls (deal-by-deal) accelerate GP\'s economics but require clawback to keep things fair. Most institutional vehicles require European; American with clawback is more common in smaller / sponsor-led funds where the LPs trust the GP and want faster cash on early wins.',
  tips: [
    'European = fund-level. American = deal-by-deal. The slang refers to the lookback structure.',
    'Clawback fixes only the LPs\' rights, not the recoverability of GP cash that\'s been spent. Pay attention to clawback security (escrow, GP guarantee).',
    'The bigger the dispersion expected across deals, the more European matters.',
  ],
};
