import type { SituationalCase } from '../../types/situational';

export const compSizeMismatch: SituationalCase = {
  id: 'comp-size-mismatch',
  title: 'Can big-deal comps price a small deal?',
  category: 'comp-selection',
  difficulty: 'beginner',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'You are underwriting a 36-unit apartment building. The most recent institutional trades in the market are 250–400-unit communities at 5.0–5.3% cap rates. The only small-building trades are older, and they closed in the 5.8–6.4% range.',
  data: [
    { label: 'Subject size', value: '36 units' },
    { label: 'Institutional comps', value: '250–400 units, 5.0–5.3%' },
    { label: 'Small-building comps', value: 'Older, 5.8–6.4%' },
    { label: 'Buyer pool for subject', value: 'Local / private' },
  ],
  question: 'What is the best approach?',
  options: [
    {
      label: 'Start with small-building trades, adjust for the time gap, and treat the institutional trades as a lower bound, not the target.',
      isBest: true,
      explanation:
        'Small assets trade to a different buyer pool, with less liquidity and more expensive financing and management per unit, so they generally price at a premium cap rate to institutional product. Adjust older small comps for market movement since then.',
    },
    {
      label: 'Use the institutional comps; they are more recent and the sample is larger.',
      isBest: false,
      explanation:
        'Recency and size of sample matter less than whether the buyer pool and capital stack match.',
    },
    {
      label: 'Average the two sets.',
      isBest: false,
      explanation:
        'Blending two different buyer pools gives a number nobody actually pays.',
    },
    {
      label: 'Size is irrelevant to cap rates — it is all about location.',
      isBest: false,
      explanation:
        'Location matters a great deal, but size and buyer pool also move cap rates.',
    },
  ],
  takeaway:
    'Comparability includes buyer pool and scale, not just location and vintage. Small assets usually carry a size/liquidity premium to institutional-sized comps.',
  tips: [
    'Match the buyer pool first, then adjust for time.',
    'Treat large-deal comps as a floor on cap rate when pricing a small asset.',
    'Check financing availability by deal size.',
  ],
};
