import type { SituationalCase } from '../../types/situational';

export const multifamilyCompSelection: SituationalCase = {
  id: 'multifamily-comp-selection',
  title: 'Which comps belong in your multifamily pricing set?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You are pricing a 175-unit, 1992-vintage garden-style apartment community in a Sun Belt suburb. The property is 93% occupied at average in-place rents of $1,450/unit/month. A broker provides six sale comparables from the past 24 months. You need to build a defensible comp set to anchor your cap rate.',
  data: [
    { label: 'Comp A', value: '160 units, 1989 vintage, same submarket, traded 5 months ago — 5.2% cap' },
    { label: 'Comp B', value: '220 units, 2019 vintage Class-A, same submarket, traded 7 months ago — 4.1% cap' },
    { label: 'Comp C', value: '180 units, 1995 vintage, adjacent submarket (15 mi), traded 4 months ago — 5.4% cap' },
    { label: 'Comp D', value: '140 units, 1991 vintage, same submarket, traded 22 months ago — 4.8% cap' },
    { label: 'Comp E', value: '310 units, 1988 vintage, same submarket, traded 6 months ago — 5.5% cap' },
    { label: 'Comp F', value: '175 units, 1993 vintage, same submarket, traded 3 months ago — 5.3% cap' },
  ],
  question: 'Which comps belong in the pricing set, and what cap rate range do they support?',
  options: [
    {
      label: 'Use Comps A, F, and E (same submarket, similar vintage, recent); reference Comp C with a submarket adjustment. Exclude Comp B (Class-A premium) and discount Comp D (22 months stale). Supported range: ~5.2–5.5%, anchor near 5.3%.',
      isBest: true,
      explanation:
        'Comp B is a Class-A asset; its 4.1% cap reflects a materially different buyer pool and rent profile — including it would artificially compress your cap. Comp D is 22 months old; in a market where rates moved 200+ bps over the past two years, it is unreliable without a detailed adjustment. Comp C is the right vintage and size but a different submarket — usable with a noted adjustment. Comps A, E, and F are the core set: same submarket, recent, vintage-comparable. Average: (5.2 + 5.5 + 5.3) ÷ 3 = 5.33%. Comp E is slightly larger (310 units = more institutional, may trade tighter); minor downward adjustment. Defensible anchor: 5.3%.',
    },
    {
      label: 'Average all six caps — that is the market consensus: (5.2 + 4.1 + 5.4 + 4.8 + 5.5 + 5.3) ÷ 6 = 5.05%.',
      isBest: false,
      explanation:
        'Averaging unfiltered comps drags the cap tighter via Comp B\'s Class-A pricing and Comp D\'s stale environment. A 5.05% cap on this 1992 garden asset would likely represent overpaying. Filtering is the job — not averaging.',
    },
    {
      label: 'Use only Comp F — it is the closest match on size, vintage, and submarket, and it is the most recent.',
      isBest: false,
      explanation:
        'A single comp is too thin unless it is uniquely perfect. Comps A and E are also defensible and provide range context. Three comps are better than one, even if the additional two require minor adjustments.',
    },
    {
      label: 'Include Comp B to represent the aspirational mark if you plan a value-add renovation to Class-A quality.',
      isBest: false,
      explanation:
        'Comps reflect what the asset is today, not a future renovation scenario. If you are underwriting a value-add business plan, model the renovation costs and the post-renovation stabilized NOI at a Class-A cap rate in a separate exit scenario — do not use Comp B as a going-in pricing anchor.',
    },
  ],
  takeaway:
    'Multifamily comp selection prioritizes: (1) same submarket over adjacent, (2) similar vintage within ~10 years, (3) trades within 12 months in a moving rate environment, (4) similar unit count (scale affects buyer pool). Class-A comps are a different product — exclude or document heavily.',
  tips: [
    'Vintage matters more in multifamily than industrial: 1990s garden assets trade differently from 2010s podium assets even in the same zip code.',
    'Unit count drives buyer pool: sub-100 attracts private buyers (wider caps); 200+ attracts institutions (tighter).',
    'If a comp is stale but same submarket, apply a spread adjustment vs. a Treasury-based index move rather than discarding it entirely.',
  ],
};
