import type { SituationalCase } from '../../types/situational';

export const compPortfolioVsSingleAsset: SituationalCase = {
  id: 'comp-portfolio-vs-single-asset',
  title: 'Can you use a portfolio trade as a single-asset comp?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re bidding on a single 180-unit Class-B multifamily property. The most recent transaction evidence in the submarket consists almost entirely of portfolio trades — two transactions in the past 6 months involved packages of 8–12 properties each, blended cap rates of 5.40% and 5.55%. There are no single-asset trades in the past 12 months. The broker is using the portfolio blended caps to push you toward a 5.5% going-in cap.',
  data: [
    { label: 'Subject asset', value: '180 units, single asset, Class B' },
    { label: 'Portfolio comp 1', value: '12 properties, 1,800 units blended — 5.40% cap' },
    { label: 'Portfolio comp 2', value: '8 properties, 950 units blended — 5.55% cap' },
    { label: 'Single-asset comps', value: 'None in past 12 months' },
  ],
  question: 'How should you adjust the portfolio comps for single-asset pricing?',
  options: [
    {
      label: 'Apply a portfolio premium adjustment of 25–50 bps — portfolio trades command tighter caps than single-asset trades because they offer scale, diversification, and reduced execution risk to large institutional buyers.',
      isBest: true,
      explanation:
        'Portfolio deals typically trade at a premium to single-asset values for several reasons: (1) they attract a deeper buyer pool of institutional capital that prefers scale; (2) they provide geographic and management diversification; (3) a single closing generates $1B+ in deployment vs. doing 12 individual closings. That premium manifests as a tighter cap rate vs. what any individual asset in the portfolio would trade for in isolation. The standard adjustment is 25–50 bps wider cap for the single asset vs. the portfolio blended rate. At a 5.5% portfolio average, the single-asset price anchor is closer to 5.75–6.0% — a 4–9% discount to the portfolio comp implied value.',
    },
    {
      label: 'Use the portfolio blended caps directly — they\'re the best available evidence.',
      isBest: false,
      explanation:
        'Portfolio blended caps are better than nothing, but they systematically overstate the value of any individual asset in the package. Without adjustment, you\'re using institutional portfolio pricing to bid on a single property, likely overpricing it against any buyer who accounts for the premium. The broker knows this — their job is to use portfolio comps to tighten your single-asset cap.',
    },
    {
      label: 'Discard portfolio comps entirely and wait for single-asset evidence.',
      isBest: false,
      explanation:
        'When single-asset evidence is unavailable, portfolio comps — adjusted — are the only evidence you have. Discarding them entirely means bidding blind. The right answer is to apply the adjustment, document the rationale, and acknowledge the wider confidence interval. Walking away from pricing because the comp set requires adjustment is over-reaction.',
    },
    {
      label: 'Use a weighted average of the two portfolio blended caps — more data points reduce the estimation error.',
      isBest: false,
      explanation:
        'Averaging two unadjusted portfolio comps doesn\'t solve the comparability problem — it just averages two data points that both systematically overstate single-asset value. You must adjust before averaging. Two biased inputs averaged produce a biased output.',
    },
  ],
  takeaway:
    'Portfolio trades command tighter caps than single-asset trades due to scale, diversification, and buyer competition. When using portfolio comps for single-asset pricing, apply a 25–50 bps cap widening to estimate the single-asset equivalent. Document the adjustment clearly — it\'s a legitimate, well-understood analytical step.',
  tips: [
    'Portfolio premium: 25–50 bps tighter cap vs. equivalent single-asset pricing.',
    'Larger portfolio premium when the buyer pool for individual assets is thinner or local.',
    'When all comps are portfolio trades, widen your confidence interval and present a range, not a point estimate.',
  ],
};
