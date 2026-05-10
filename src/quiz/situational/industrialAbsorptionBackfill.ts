import type { SituationalCase } from '../../types/situational';

export const industrialAbsorptionBackfill: SituationalCase = {
  id: 'industrial-absorption-backfill',
  title: 'A 500k SF big-box just went dark — how long to backfill?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'industrial',
  scenario:
    'A major e-commerce tenant vacated a 500,000 SF distribution center in your target submarket. Total submarket inventory is 18M SF; available space was 2.2M SF before the vacancy (12.2%). Historical net absorption has averaged 350,000 SF per quarter over the past two years. You are evaluating whether to acquire the dark building at a discount.',
  data: [
    { label: 'Submarket inventory', value: '18,000,000 SF' },
    { label: 'Available SF before vacancy', value: '2,200,000 SF' },
    { label: 'New vacancy (dark building)', value: '500,000 SF' },
    { label: 'Post-vacancy availability', value: '2,700,000 SF (15%)' },
    { label: 'Historical net absorption', value: '350,000 SF/quarter' },
    { label: 'Target availability for stabilized underwriting', value: '<8%' },
  ],
  question:
    'Roughly how long will it take the submarket to absorb back to sub-8% availability, and what does that imply for your underwriting?',
  options: [
    {
      label: 'About 6–7 quarters — absorbing from 2.7M to sub-8% (1.44M SF) requires clearing ~1.26M SF at 350k/quarter; underwrite a 2-year lease-up horizon with wide exits.',
      isBest: true,
      explanation:
        'Target availability at sub-8%: 18M × 0.08 = 1.44M SF. Current available: 2.7M SF. Need to absorb: 2.7M − 1.44M = 1.26M SF. At 350k SF/quarter: 1.26M ÷ 350k ≈ 3.6 quarters — but that is the submarket, not just this building. If the building itself is 500k SF, it could absorb faster or slower than the market depending on its configuration, location, and asking rent. Underwriting the asset requires adding a contingency buffer, making 6–7 quarters the conservative professional answer.',
    },
    {
      label: 'About 1.5 quarters — the building is 500k SF and quarterly absorption is 350k SF, so it clears in about a quarter and a half.',
      isBest: false,
      explanation:
        'This treats the building in isolation as if it were the only available space competing for absorption. It ignores the 2.2M SF of existing availability competing for the same tenants. Industrial absorption is a market-level metric; a single asset is a fraction of competing supply.',
    },
    {
      label: 'It cannot be estimated — industrial absorption is too volatile to model.',
      isBest: false,
      explanation:
        'Absorption does fluctuate, but trailing two-year averages are a standard underwriting input. Refusing to estimate is not a professional response in an acquisition context; you build a base case, sensitize it, and size your return cushion accordingly.',
    },
    {
      label: 'About 2 quarters — the existing availability of 2.2M SF is manageable and the dark building adds only marginal pressure.',
      isBest: false,
      explanation:
        'This underestimates the impact. The 500k SF addition is a 23% jump in available space. More critically, a single large dark building can reset market perception and pull rents down as landlords compete for a shallow pool of large-block tenants. Two quarters to clear 1.26M SF at 350k/quarter math does not work (3.6 quarters at best, before contingency).',
    },
  ],
  takeaway:
    'Backfill math starts at the submarket, not the building. Compute how much availability needs to be absorbed to hit your target vacancy rate, then divide by the trailing absorption pace. Add a buffer for the dark building\'s effect on perception and competing landlords\' pricing behavior. A 2-year lease-up horizon is a defensible base case for a large dark industrial asset.',
  tips: [
    'Convert SF absorbed/quarter to a % of inventory: 350k ÷ 18M = 1.9%/quarter — a useful sanity check.',
    'Large-block industrial tenants (200k+ SF) are rare; a 500k SF box competes for a different tenant pool than the broader market.',
    'Model absorption with and without the dark building — the counterfactual shows how much the vacancy shifts your timeline.',
  ],
};
