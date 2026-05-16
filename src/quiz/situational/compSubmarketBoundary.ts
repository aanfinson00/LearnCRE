import type { SituationalCase } from '../../types/situational';

export const compSubmarketBoundary: SituationalCase = {
  id: 'comp-submarket-boundary',
  title: 'Where does the submarket end for comp purposes?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You\'re pricing a 150,000 SF last-mile distribution facility adjacent to a major urban core. The broker defines the subject\'s submarket as "Inner Metro Industrial" and provides 3 trades — all supporting a 4.8% going-in cap. However, a competing buyer is referencing 2 trades from the "Outer Metro Industrial" submarket (15-25 miles from the urban core), which traded at 5.6–5.8% caps. The broker argues those outer trades are irrelevant; the competing buyer argues they represent the same asset class.',
  data: [
    { label: 'Subject', value: '150K SF last-mile, adjacent to urban core' },
    { label: 'Inner Metro comps (broker)', value: '3 trades — 4.7-5.0%, avg 4.8%' },
    { label: 'Outer Metro comps (competitor)', value: '2 trades — 5.6-5.8%, avg 5.7%' },
    { label: 'Distance differential', value: 'Inner: 0-5 mi from core; Outer: 15-25 mi' },
    { label: 'Use case', value: 'Inner = last-mile; Outer = regional distribution' },
  ],
  question: 'How do you resolve the submarket boundary dispute for comp purposes?',
  options: [
    {
      label:
        'The Inner Metro comps are correct for the subject. Last-mile industrial adjacent to dense population serves a fundamentally different demand profile (delivery density, carrier routing economics, urban infill land scarcity) than regional distribution 15-25 miles out. The 90 bps cap differential reflects a real economic difference, not a submarket technicality.',
      isBest: true,
      explanation:
        'The key comp-selection principle is functional comparability — same demand drivers, same tenant base, same supply constraints. Last-mile distribution value is driven by proximity to population density and the cost savings from reduced "last mile" delivery routes. Regional distribution assets 15-25 miles out serve a different logistics function: longer-haul, larger footprint, different rent profile. The 90 bps cap spread between inner and outer exists because buyers recognize a differentiated product. Using the outer comps would artificially widen the subject\'s cap rate by ignoring its location premium.',
    },
    {
      label:
        'Average all 5 comps — the more data points the better, and industrial is fungible.',
      isBest: false,
      explanation:
        '"Industrial is fungible" is the kind of broad generalization that leads to mispriced assets. Last-mile vs. bulk/regional distribution are distinct product types with different tenant bases (couriers and urban delivery hubs vs. long-haul distributors), different land cost profiles, and different cap rate benchmarks. Averaging across categories produces noise, not a signal.',
    },
    {
      label:
        'The competing buyer is right — include the outer comps to be conservative on price.',
      isBest: false,
      explanation:
        '"Conservative" is not the same as "inaccurate." Using outer-metro comps to underwrite inner-metro last-mile product would mean systematically undervaluing urban infill industrial. If you apply 5.7% to a 4.8% market asset, you will lose every bid in that market. Accurate underwriting is not the same as aggressive underwriting; conservative underwriting means being honest about where the market clears, then applying an appropriate risk margin.',
    },
    {
      label:
        'Request a mixed-use/last-mile industrial study from a third-party consultant before committing to a comp set.',
      isBest: false,
      explanation:
        'Third-party studies take weeks and are not practical for real-time competitive bid processes. The submarket boundary question is an analyst-level judgment call, not one that requires external validation. The broker-provided Inner Metro comps should be evaluated on their own merits (location, vintage, size, use) against the subject. If they hold up, they\'re the right set.',
    },
  ],
  takeaway:
    'Submarket boundaries for comp selection are defined by demand drivers and tenant base, not by name or geography alone. Same "industrial" label does not mean same product. Last-mile (urban core adjacency, delivery density focus) and regional distribution (large footprint, low land cost, highway access) are two distinct product types that command different cap rates. When a broker and a competing buyer cite different submarket comps, the analytical question is: which comps share the same demand-side economics as the subject?',
  tips: [
    'Define submarket by demand driver, not by broker label — ask "who rents this and why?"',
    'Cap rate differentials of 75+ bps between claimed "comparable" markets almost always reflect a real economic difference.',
    'Same asset class ≠ same submarket. Industrial spans last-mile, cold storage, manufacturing, and bulk distribution — each priced differently.',
    'If the comp set debate is unresolvable, present both sets with explicit assumptions and let the IC choose.',
  ],
};
