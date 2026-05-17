import type { SituationalCase } from '../../types/situational';

export const portfolioVsSingleAssetComp: SituationalCase = {
  id: 'portfolio-vs-single-asset-comp',
  title: 'Can you use a portfolio trade to price a single asset?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You are bidding on a single 180-unit multifamily property. The broker\'s comp set includes a portfolio trade: a 12-property, 2,200-unit multifamily portfolio that sold 5 months ago at a 5.1% blended cap rate. Individual property trades in the same submarket are clustering at 5.5–5.75%. The broker argues the portfolio trade "proves demand at sub-5.5%."',
  data: [
    { label: 'Subject', value: '180-unit single asset, same submarket' },
    { label: 'Comp 1', value: 'Single-asset trade, same submarket, 4 mos ago — 5.5% cap' },
    { label: 'Comp 2', value: 'Single-asset trade, same submarket, 6 mos ago — 5.6% cap' },
    { label: 'Comp 3', value: 'Single-asset trade, same submarket, 7 mos ago — 5.75% cap' },
    { label: 'Portfolio Comp', value: '12-property / 2,200-unit portfolio, 5 mos ago — 5.1% blended cap' },
    { label: 'Broker argument', value: 'Portfolio proves sub-5.5% demand' },
  ],
  question: 'How should you treat the portfolio comp?',
  options: [
    {
      label: 'Discard or heavily discount the portfolio comp. Portfolio trades carry a liquidity premium (buyers pay up for scale) and reflect a blended cap across diverse assets. For a single 180-unit asset, the relevant evidence is the 5.5–5.75% single-asset cluster.',
      isBest: true,
      explanation:
        'Portfolio premiums are real and well-documented: large institutional buyers pay up for scale (guaranteed deployment, lower per-unit due diligence cost, single closing). The 5.1% blended cap reflects: (a) a portfolio premium of 30–60 bps vs. single-asset trades, (b) a blended rate across 12 assets of varying quality that may not reflect any individual property. Your 180-unit single asset will be sold to a single-asset buyer pool (private equity, family office, regional operator) — not the institutional portfolio buyer who paid 5.1%. The relevant evidence is 5.5–5.75%.',
    },
    {
      label: 'Use the portfolio comp at 5.1% — it is more recent and represents a larger, more credible data set.',
      isBest: false,
      explanation:
        'Recency and scale do not fix the apples-to-oranges problem. A 12-property institutional portfolio trades in a separate market segment from a single 180-unit asset. The 5.1% cap reflects an institutional clearing price for scale — your buyer pool will not replicate that. Using 5.1% would support an over-bid by ~30–60 bps relative to the true single-asset market.',
    },
    {
      label: 'Apply a +40 bps portfolio adjustment to the 5.1% and use 5.5% as the comp.',
      isBest: false,
      explanation:
        'The single-asset comps already give you 5.5–5.75% directly, without needing to adjust a structurally different comp. Why estimate an adjustment to a portfolio trade when you have clean single-asset evidence? Using the direct evidence is more defensible and does not introduce estimation error.',
    },
    {
      label: 'Average all four comps — the portfolio trade is arms-length and deserves equal weight.',
      isBest: false,
      explanation:
        'Arms-length is necessary but not sufficient. The portfolio trade is arms-length but from a different buyer pool. Averaging 5.1%, 5.5%, 5.6%, 5.75% gives 5.49% — 11 bps tighter than the single-asset cluster alone. On a $30M deal that is ~$600k of artificial pricing support driven entirely by a structurally incomparable comp.',
    },
  ],
  takeaway:
    'Portfolio trades carry a liquidity / scale premium of 30–60 bps vs. single-asset trades in the same submarket. They also reflect blended pricing across diverse assets, not a point estimate for any one property. When pricing a single asset, use single-asset comps from the same buyer pool — the portfolio trade is context, not pricing.',
  tips: [
    'Portfolio premium rule of thumb: 30–60 bps tighter cap vs. single-asset in same submarket.',
    'Buyer pool test: would the portfolio buyer (large institution) bid on your 180-unit single asset? Likely not — different mandate, different sizing.',
    'The portfolio blended cap rate hides per-asset variation; the weakest properties in the portfolio may have traded at 6%+ on their own.',
  ],
};
