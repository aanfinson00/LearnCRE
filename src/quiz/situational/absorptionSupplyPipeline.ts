import type { SituationalCase } from '../../types/situational';

export const absorptionSupplyPipeline: SituationalCase = {
  id: 'absorption-supply-pipeline',
  title: 'Will occupancy hold with the new supply?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    'A submarket has 12,000 existing units at 94% occupancy. 900 new units are under construction and will all deliver within 12 months. Trailing-12-month net absorption was 480 units, and you expect that pace to continue.',
  data: [
    { label: 'Existing inventory', value: '12,000 units' },
    { label: 'Current occupancy', value: '94%' },
    { label: 'Deliveries, next 12 months', value: '+900 units' },
    { label: 'Net absorption (assumed)', value: '480 units/year' },
  ],
  question: 'Where does submarket occupancy land in 12 months?',
  options: [
    {
      label: 'About 91% — occupied units rise from 11,280 to 11,760 on a base of 12,900 units.',
      isBest: true,
      explanation:
        'Occupied today: 12,000 × 94% = 11,280. After absorbing 480: 11,760. New base: 12,900. 11,760 ÷ 12,900 ≈ 91.2%. Roughly 280 bps of occupancy compression, which usually shows up as concessions and flat or negative effective rent growth.',
    },
    {
      label: 'Stays at 94% — absorption is healthy and positive.',
      isBest: false,
      explanation:
        'Positive absorption does not mean stable occupancy. Occupancy is occupied ÷ inventory, and inventory is growing faster than demand (900 vs 480).',
    },
    {
      label: 'About 98% — 480 units of absorption fills most of the 720 vacant units.',
      isBest: false,
      explanation:
        'Ignores the new deliveries entirely; the vacant pool is not 720 units at the end of the period, it is the old vacancy plus 900 new units.',
    },
    {
      label: 'It cannot be estimated without a rent forecast.',
      isBest: false,
      explanation:
        'Occupancy is a simple supply/demand identity once you assume a pace of absorption. Rents are an output of that balance, not an input to the arithmetic.',
    },
  ],
  takeaway:
    'Occupancy changes when demand outruns or lags supply: new occupancy = (occupied + net absorption) ÷ (inventory + deliveries). Healthy absorption can still mean falling occupancy.',
  tips: [
    'Always add deliveries to the denominator before computing future occupancy.',
    'Compare absorption to deliveries, not to zero.',
    'Expect concessions before you see rent cuts.',
  ],
};
