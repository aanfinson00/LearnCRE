import type { SituationalCase } from '../../types/situational';

export const compSizeAdjustment: SituationalCase = {
  id: 'comp-size-adjustment',
  title: 'The comps are all bigger — does size matter for cap rates?',
  category: 'comp-selection',
  difficulty: 'beginner',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You are underwriting a 48-unit Class-B suburban multifamily asset. The only available comps in the submarket are three trades of 200–300 unit communities that closed in the past 8 months. All three are similar vintage and submarket, and transacted at cap rates of 5.25–5.50%. The subject property is well-run, with in-place rents at market and no deferred maintenance.',
  data: [
    { label: 'Subject', value: '48 units, Class B, stabilized' },
    { label: 'Comp 1', value: '210 units · 5.25% cap' },
    { label: 'Comp 2', value: '275 units · 5.40% cap' },
    { label: 'Comp 3', value: '300 units · 5.50% cap' },
    { label: 'Size differential', value: 'Comps are 4–6× larger than subject' },
  ],
  question:
    'How should you handle the size difference when anchoring the subject cap rate?',
  options: [
    {
      label:
        'Apply a size premium of +25–50 bps to the comp average. Smaller properties trade at wider caps because the buyer pool is thinner — individuals and small funds can bid, but most institutional mandates have unit minimums above 100. Fewer bidders equals a wider required cap.',
      isBest: true,
      explanation:
        'Liquidity is the key driver of size premiums. For a 48-unit asset, the buyer universe is dominated by private buyers, 1031 exchangers, and small operators — institutional capital largely sits out below 75–100 units. Fewer bidders translates directly to a higher required return (wider cap). A +25–50 bps adjustment on the comp average (5.38%) gives a subject anchor of 5.63–5.88%. Bidding at 5.25% on a 48-unit asset using 200–300 unit comps without adjustment overpays for a liquidity premium that does not exist on a sub-institutional asset.',
    },
    {
      label:
        'Use the comp average directly — the submarket and vintage are the same, so size doesn\'t matter.',
      isBest: false,
      explanation:
        'Submarket and vintage are necessary conditions for comp relevance, but not sufficient. Liquidity risk is a structural difference between institutional-grade assets and private-market assets. Cap rates reflect who can buy an asset and at what financing cost, not just the property\'s operating profile.',
    },
    {
      label:
        'Use replacement cost as the primary valuation method — if the comps are not size-equivalent, they can\'t be used.',
      isBest: false,
      explanation:
        'Replacement cost is a useful cross-check but not a substitute for adjusted comps. The right approach is to adjust the available comps, not discard the comp set. Replacement cost breaks down when land costs diverge from economic value, when the property is older with significant basis below replacement, or when construction costs exceed market value.',
    },
    {
      label:
        'Discard the comps and model on a price-per-unit basis from the broker\'s listing.',
      isBest: false,
      explanation:
        'Price per unit is a useful sanity check but is driven by the same supply-demand forces as the cap rate. Accepting the broker\'s implied per-unit pricing without vetting against transaction data is circular. Adjusted comps are the correct anchor; per unit is the check on reasonableness.',
    },
  ],
  takeaway:
    'Size is a structural comp adjustment, not a footnote. Smaller assets command wider caps than larger assets in the same submarket because they attract a shallower buyer pool. Rule of thumb: +25–50 bps per size tier (institutional vs sub-institutional). Document the adjustment, name the driver (buyer pool liquidity), and include it in every comp analysis with a meaningful scale difference.',
  tips: [
    'Sub-100-unit assets: buyer pool is primarily private, 1031, and small-fund — add 25–50 bps vs 200+ unit comps.',
    'Sub-50-unit assets may also trade on GRM; note when both methods apply.',
    'Always list comp unit counts in the comp table — it makes the size adjustment transparent and defensible.',
  ],
};
