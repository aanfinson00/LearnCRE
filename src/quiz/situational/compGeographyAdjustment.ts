import type { SituationalCase } from '../../types/situational';

export const compGeographyAdjustment: SituationalCase = {
  id: 'comp-geography-adjustment',
  title: 'Can you use a comp from a different submarket?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    'You\'re pricing a 75,000 SF Class-A office building in a suburban campus submarket with limited recent sales activity — only one comp traded in the past 18 months. Your broker supplies three additional comps from adjacent submarkets to fill out the set. You need to decide which, if any, to use and how to document any adjustment.',
  data: [
    { label: 'Subject', value: 'Suburban campus, 75,000 SF, Class A, 92% leased — 5.75% cap implied' },
    { label: 'Submarket comp (18 mos ago)', value: 'Same campus, 80,000 SF, Class A, 88% leased — 5.50% cap' },
    { label: 'Adjacent Comp A', value: 'CBD fringe, 70,000 SF, Class A, 95% leased — 5.25% cap' },
    { label: 'Adjacent Comp B', value: 'Suburban campus (10 mi away), 85,000 SF, Class A, 90% leased — 5.80% cap' },
    { label: 'Adjacent Comp C', value: 'CBD core, 120,000 SF, Class A, 97% leased — 4.75% cap' },
  ],
  question: 'Which adjacent comps are usable, and what adjustments do they require?',
  options: [
    {
      label: 'Use Adjacent Comp B with a minimal adjustment — same suburban campus product type, similar size and occupancy. Discard Comp A (CBD fringe demand profile differs) and Comp C (CBD core, wrong product, too large, too tight a cap).',
      isBest: true,
      explanation:
        'The key test for cross-submarket comps is whether the tenant demand profile and investor buyer pool are similar. Suburban campus to suburban campus (even 10 miles away) is a much stronger bridge than suburban campus to CBD fringe or CBD core. CBD assets attract a different buyer type (institutional core, credit tenants) and CBD rents/caps reflect transit access and density premiums your subject doesn\'t have. Comp B at 5.80% is also close to your 5.75% implied cap — a well-supported bridge. Comp A at 5.25% and Comp C at 4.75% would drag the average artificially tight.',
    },
    {
      label: 'Use all three adjacent comps with adjustments — more data points are always better.',
      isBest: false,
      explanation:
        'Adjustable comps have to share the same fundamental demand drivers. CBD core and CBD fringe office cater to different tenants, command different amenity premiums, and attract different capital. Using them alongside a suburban campus comp without a defensible bridge inflates your comp set with noise rather than signal. A smaller set of relevant comps beats a larger set of irrelevant ones.',
    },
    {
      label: 'Use only the same-submarket comp from 18 months ago — cross-submarket comps are never appropriate.',
      isBest: false,
      explanation:
        'An absolute ban on cross-submarket comps is too rigid. When a submarket is thin, a documented cross-submarket comp from a similar product type is better than a single stale data point. The key is transparency: document the submarket adjustment and why the buyer pool and demand drivers are comparable.',
    },
    {
      label: 'Average all four comps and apply a single 25 bps adjustment for submarket differences.',
      isBest: false,
      explanation:
        'A flat 25 bps adjustment ignores the material difference between suburban campus and CBD core demand dynamics. Comp C at 4.75% is 100+ bps tighter than the suburban campus set — no flat adjustment produces a defensible result. Each comp needs its own bridge if it\'s being used, not a pooled average with an arbitrary haircut.',
    },
  ],
  takeaway:
    'Cross-submarket comps are usable when the tenant demand profile and investor buyer pool are genuinely comparable — usually same product type and suburban/CBD tier. Document the bridge explicitly. When cross-submarket comps diverge by >75 bps from same-market data, weight them lightly or discard.',
  tips: [
    'CBD core vs. suburban campus are different product types; don\'t comp them without a documented premium.',
    'Same-submarket thin data + one good cross-submarket comp beats one stale in-market comp alone.',
    'Document your submarket bridge in one sentence: "Similar suburban demand profile, comparable tenant base."',
  ],
};
