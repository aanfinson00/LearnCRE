import type { SituationalCase } from '../../types/situational';

export const overWeightOffice: SituationalCase = {
  id: 'over-weight-office',
  title: 'Fund is 40% office vs 25% target — which assets sell first?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['portfolioMgmt'],
  assetClass: 'mixed',
  scenario:
    'You manage a $2B value-add fund. Sector allocation has drifted: office is now 40% of NAV vs the 25% IC mandate. You need to bring it down by selling ~$300M of office. The portfolio has 12 office assets ranging from a Class-A trophy with 9 years of WALT (priced tightly) to a half-vacant 1980s suburban park (likely a sale at a meaningful discount to basis). Which assets do you sell first?',
  data: [
    { label: 'Fund NAV', value: '$2.0B' },
    { label: 'Office allocation', value: '40% (target 25%)' },
    { label: 'Sale needed', value: '~$300M' },
    { label: 'Office portfolio', value: '12 assets, A-trophy to suburban-1980s' },
  ],
  question: 'Which assets do you sell to right-size the allocation?',
  options: [
    {
      label:
        'Sell the assets with the *worst forward IRR vs alternative deployment* — usually that means the trophy A-class assets (priced for perfection, low forward returns) and the bottom-quartile assets where the basis is permanently impaired. Hold the middle: assets with execution upside still ahead.',
      isBest: true,
      explanation:
        'Allocation rebalancing isn\'t about disposing of "bad" assets — it\'s about freeing up capital for higher-return uses. Trophy assets sell cleanly at full pricing but have low forward IRRs (they\'re already priced for the certainty you\'re trying to monetize). Bottom-quartile assets that are structurally impaired (vacant, deferred maintenance, broken submarket) won\'t produce returns by holding longer; selling them at a loss frees capital for value-add deals at better forward returns. The middle bucket — assets where you\'re still executing — is where the IRR is highest and shouldn\'t be sold reactively.',
    },
    {
      label: 'Sell the worst-performing assets first — clean up the portfolio and report better numbers.',
      isBest: false,
      explanation:
        'Emotionally satisfying but value-destroying. Selling at a loss to "clean up the report" crystallizes the loss without any forward benefit. If the bottom assets have any upside left, holding is correct. Only sell impaired assets where the *forward* IRR is below your fund\'s required return — not because they sit ugly on the report.',
    },
    {
      label: 'Sell the best-performing assets first — they\'ll sell quickly and at strong pricing.',
      isBest: false,
      explanation:
        'Half-right. The trophies sell cleanly, but selling *only* trophies leaves you with a portfolio of impaired or middle-bucket assets — concentrating the risk you\'re trying to manage. Mixed sales that include some trophies AND some impaired assets balance proceeds with portfolio quality.',
    },
    {
      label: 'Don\'t sell — wait for the office market to recover.',
      isBest: false,
      explanation:
        'Allocation drift isn\'t self-correcting. The IC mandate exists to manage sector risk; ignoring it means accepting more office exposure than the fund\'s investors signed up for. "Wait for recovery" is a thesis, not a discipline — and the longer you delay, the harder the rebalance becomes if office continues to underperform.',
    },
  ],
  takeaway:
    'Portfolio rebalancing is a *forward-IRR* exercise, not a *backward-PnL* one. Sell the assets with the lowest forward IRR vs your fund\'s alternative uses of capital — that\'s usually the *fully-priced* trophies + the *structurally-impaired* bottom-quartile, in some mix. Selling the middle (still-executing) assets is the most common rebalancing mistake.',
  tips: [
    'Forward IRR > backward PnL when deciding what to sell.',
    'Trophies sell at clean prices but have low forward IRRs — they\'re a natural rebalance source.',
    'Bottom-quartile holds keep the loss off the report but block the capital that could compound elsewhere.',
  ],
};
