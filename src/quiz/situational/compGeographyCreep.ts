import type { SituationalCase } from '../../types/situational';

export const compGeographyCreep: SituationalCase = {
  id: 'comp-geography-creep',
  title: 'The broker is pulling comps from a stronger submarket — do you push back?',
  category: 'comp-selection',
  difficulty: 'beginner',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You are pricing a 250,000 SF Class-B industrial asset in a secondary submarket (Submarket A). The broker provides a comp set with five trades — three from Submarket A and two from Submarket B, a primary logistics corridor 15 miles away with lower vacancy, higher rents, and stronger institutional investor demand. All five comps are recent (within 6 months). The Submarket A comps cluster at 6.25–6.50%; the Submarket B comps cluster at 5.50–5.75%. The broker recommends pricing at 5.90% by averaging all five.',
  data: [
    { label: 'Subject location', value: 'Submarket A (secondary)' },
    { label: 'Submarket A comps (3)', value: '6.25–6.50% cap range' },
    { label: 'Submarket B comps (2)', value: '5.50–5.75% cap range (primary corridor, 15 mi away)' },
    { label: 'Broker recommendation', value: '5.90% (blended average of all 5)' },
    { label: 'Submarket B vacancy vs A', value: 'B: 3.5% vs A: 8.2%' },
  ],
  question: 'How do you handle the Submarket B comps?',
  options: [
    {
      label:
        'Exclude or heavily discount the Submarket B comps. Different submarket = different supply/demand profile. Submarket B\'s lower vacancy and institutional demand justify tighter cap rates there; including them pulls the pricing anchor 35–40 bps tighter than the market signal from Submarket A alone. Defend 6.25–6.50% based on the three directly relevant comps.',
      isBest: true,
      explanation:
        'Cap rates are submarket-specific because they reflect local supply/demand, tenant access, transportation infrastructure, and investor demand. Submarket B trading at 5.50–5.75% doesn\'t imply Submarket A should trade there — the 4.7 percentage-point vacancy gap (3.5% vs 8.2%) is a clear signal that the two markets have different fundamentals. Blending them gives a 5.90% recommendation that Submarket A buyers won\'t underwrite — they\'ll use comps from their own submarket. The broker is doing geography creep to support a higher price. Push back with the three Submarket A comps and a documented rationale.',
    },
    {
      label: 'Use all five but weight the Submarket A comps at 60% and Submarket B at 40% — a partial adjustment.',
      isBest: false,
      explanation: 'Arbitrary weighting without a documented crossover rationale. If the two submarkets have different fundamental drivers (vacancy, rent levels, tenant access), a 60/40 blend doesn\'t represent either market. The right approach is to use Submarket A comps as the primary set and document any cross-submarket adjustment with supporting logic (e.g., a known demand crossover, a planned infrastructure improvement).',
    },
    {
      label: 'Include all five since they are recent and the 15-mile distance isn\'t material for industrial.',
      isBest: false,
      explanation: 'Distance alone doesn\'t determine comparability — submarket fundamentals do. Industrial demand is driven by access to logistics networks, labor pools, and specific transportation corridors. A 4.7 ppt vacancy gap between the two submarkets indicates fundamentally different demand profiles. 15 miles in an industrial context can represent a completely different tenant universe and investor pool.',
    },
    {
      label: 'Let the broker determine the comp set — they know the market better than the buyer.',
      isBest: false,
      explanation: 'Brokers know the market, but their incentive is to support the highest defensible price. Comp selection is a direct lever on pricing; sellers\' brokers routinely add stronger-submarket comps to pull the average tighter. Buyers must vet comps independently. "Trust the broker" is never the right answer in a pricing analysis.',
    },
  ],
  takeaway:
    'Comp geography is the first filter, not the last. Assets from a different submarket — even a nearby one — require explicit adjustments for vacancy differential, rent premium, and investor demand. When a broker blends primary and secondary submarket comps, the average is systematically biased toward the stronger market. Build your comp set from the subject\'s own submarket first; cross-submarket trades are support, not anchors.',
  tips: [
    'Always note the submarket for each comp before running any average or range analysis.',
    'Vacancy differential is the clearest signal of submarket comparability — >300 bps gap usually means different market.',
    'Cross-submarket comps can support a range but should not define the anchor cap rate for a different submarket.',
  ],
};
