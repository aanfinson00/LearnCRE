import type { SituationalCase } from '../../types/situational';

export const compVintageAdjustment: SituationalCase = {
  id: 'comp-vintage-adjustment',
  title: 'Why does the comp set support a tighter cap?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re bidding on a Class-B 1985-vintage multifamily asset. Three recent comps in the same submarket support a 5.50–5.75% cap. The subject\'s broker is pushing for a 5.25% going-in cap, citing those exact comps. You need to pick the right adjustment.',
  data: [
    { label: 'Subject vintage', value: '1985 (Class B)' },
    { label: 'Comp 1', value: '2018-built · 5.50% cap' },
    { label: 'Comp 2', value: '2015-built · 5.65% cap' },
    { label: 'Comp 3', value: '1998-built · 5.75% cap' },
    { label: 'Broker ask', value: '5.25% subject cap' },
  ],
  question: 'How should you adjust the comp set for the subject\'s vintage?',
  options: [
    {
      label:
        'Apply a vintage adjustment of +25–50 bps to the comp average — older product carries higher capex burden and shorter remaining economic life, so the right anchor is closer to 6.00%, not 5.25%.',
      isBest: true,
      explanation:
        'Vintage matters for two reasons: (1) older buildings need more capex over the hold (roof, HVAC, systems) which the buyer prices in via a wider cap; (2) older product faces obsolescence risk that newer comps don\'t. A 1985 asset compared to 2015–2018 comps deserves a 25–50 bps cap widening to compensate. Bidding at 5.25% on a 1985 vintage when comps are 2015+ at 5.50% is overpaying twice.',
    },
    {
      label: 'Use the comp average (5.63%) directly — vintage adjustments are subjective and hard to defend.',
      isBest: false,
      explanation:
        'Treats comps as homogeneous when they aren\'t. The seller\'s broker will always push you toward the unadjusted average; the buyer\'s job is to filter for relevance. Documented vintage spreads are well-understood by appraisers and lenders — defend the adjustment with capex reserves and remaining-life math.',
    },
    {
      label: 'Discard Comp 1 and Comp 2 (newer than the subject) and use only Comp 3 (1998).',
      isBest: false,
      explanation:
        'Sample size of 1 is too thin to support pricing. The right move is to *adjust* the newer comps for vintage rather than discard them — keeps a defensible 3-comp set with a transparent adjustment.',
    },
    {
      label: 'Ask the broker for older comps; if none exist, drop the bid and move on.',
      isBest: false,
      explanation:
        'Walking away over comp set composition is over-reaction. Vintage-adjusted pricing is core acquisition diligence. If the comps are otherwise relevant on submarket and size, bid at the adjusted cap with a written rationale.',
    },
  ],
  takeaway:
    'Comps are never apples-to-apples. The first questions you ask of any comp set are: (1) same submarket? (2) same vintage / quality tier? (3) similar size / unit count? (4) recent enough? Each "no" requires a documented adjustment, not a quiet pass-through.',
  tips: [
    'Vintage spread rule of thumb: 20–50 bps per generation gap (Class A vs B vs C).',
    'Newer assets justify tighter caps because residual capex burden is lower.',
    'Always run a "what\'s the implied capex reserve?" sanity check on age-adjusted bids.',
  ],
};
