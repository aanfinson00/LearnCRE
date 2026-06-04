import type { SituationalCase } from '../../types/situational';

export const compGeographicExpansion: SituationalCase = {
  id: 'comp-geographic-expansion',
  title: 'No local comps — when to expand the radius',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You\'re pricing a 180,000 SF Class-A bulk distribution building in Market A, a secondary inland industrial market. No arm\'s-length industrial sales have occurred in Market A over the past 18 months. The nearest comparable trades are 35 miles away in Market B — a primary logistics hub adjacent to a major port — where 4 buildings traded at 5.25–5.50% caps over the past 12 months. Market A vacancy is 4.5%; Market B vacancy is 2.8%.',
  data: [
    { label: 'Subject', value: '180,000 SF Class-A bulk, Market A (secondary inland)' },
    { label: 'Recent sales in Market A', value: '0 in past 18 months' },
    { label: 'Nearest comparable', value: 'Market B, 35 miles away (primary port hub)' },
    { label: 'Market B cap range', value: '5.25–5.50%, 4 trades in past 12 months' },
    { label: 'Market A vacancy', value: '4.5%' },
    { label: 'Market B vacancy', value: '2.8%' },
  ],
  question: 'How should you use Market B trades to price the subject in Market A?',
  options: [
    {
      label: 'Use Market B as a directional anchor and apply a 25–50 bps secondary market premium, arriving at 5.50–6.00% for Market A — documenting each adjustment for lower liquidity, higher vacancy, and distance from port infrastructure.',
      isBest: true,
      explanation:
        'When the home submarket has no trades, expanding the radius is appropriate — but cross-submarket comps require explicit adjustments. Market B commands tighter caps because: (1) port proximity drives stronger tenant demand, (2) 2.8% vacancy vs. 4.5% = lower re-leasing risk, and (3) primary markets have more buyers, deeper liquidity. A 25–50 bps secondary premium is standard and defensible. Document each factor. Presenting 5.50–6.00% with a clear adjustment bridge is more credible than refusing to price or using 5.25% without adjustment.',
    },
    {
      label: 'Use Market B caps directly at 5.25–5.50% — industrial is now a national market with consistent pricing across submarkets.',
      isBest: false,
      explanation:
        'Industrial has become more institutionalized, but pricing still varies by local vacancy, access to logistics infrastructure, and tenant demand quality. A 1.7% vacancy differential (2.8% vs 4.5%) is meaningful: the market with higher vacancy carries more re-leasing risk and a thinner buyer pool. Applying primary-port-hub pricing to a secondary inland market without adjustment overstates the asset\'s value.',
    },
    {
      label: 'Refuse to price without in-submarket comps — advise waiting for a local sale before underwriting.',
      isBest: false,
      explanation:
        'Thin comp markets are a practical reality in secondary markets. Refusing to price with cross-submarket comps is unhelpful and not professionally standard — appraisers routinely price assets in thin markets using regional comps with documented adjustments. The goal is a defensible range with clearly stated limitations, not false precision.',
    },
    {
      label: 'Expand to 100+ miles to find more trades before pricing.',
      isBest: false,
      explanation:
        'A 35-mile comparable in a directly adjacent market is better than a 100-mile comparable from a different regional economy. Adding more volume by widening to 100+ miles increases the risk of capturing supply-demand dynamics that don\'t translate to Market A at all. Adjust for the 35-mile differences; don\'t abandon a close comp for a higher-volume but less-relevant one.',
    },
  ],
  takeaway:
    'Expanding the comp radius is sometimes necessary — but cross-submarket trades require documented adjustments for vacancy differentials, liquidity, and market access. State the comp limitations transparently, present a range rather than a point estimate, and weight closer comps more heavily. The goal is a defensible range, not false precision.',
  tips: [
    'Secondary market premium over primary industrial: typically 25–75 bps, depending on vacancy and logistics access.',
    'When expanding the radius, document why each comp is the closest available and what adjustment bridge you applied.',
    'Vacancy differential of 100+ bps between two submarkets usually justifies a 15–25 bps cap adjustment.',
  ],
};
