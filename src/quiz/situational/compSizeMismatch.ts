import type { SituationalCase } from '../../types/situational';

export const compSizeMismatch: SituationalCase = {
  id: 'comp-size-mismatch',
  title: 'Big-box comp for a small-bay building',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'industrial',
  scenario:
    'You are valuing a 60,000 SF multi-tenant small-bay industrial building. The broker\'s comp sheet leads with an 800,000 SF single-tenant distribution center that traded at a 4.9% cap rate. Two closer matches (50,000–80,000 SF multi-tenant) traded at 5.8% and 6.0%.',
  data: [
    { label: 'Subject', value: '60,000 SF, multi-tenant small-bay' },
    { label: 'Broker headline comp', value: '800,000 SF distribution, 4.9% cap' },
    { label: 'Closer comp 1', value: '55,000 SF multi-tenant, 5.8% cap' },
    { label: 'Closer comp 2', value: '78,000 SF multi-tenant, 6.0% cap' },
  ],
  question: 'How should you treat the 4.9% comp?',
  options: [
    {
      label: 'Show it as context only; anchor on the two small-bay comps (5.8–6.0%).',
      isBest: true,
      explanation:
        'Institutional big-box distribution draws deeper capital pools and trades at tighter caps. Small-bay multi-tenant has more rollover and a thinner buyer pool. Size, tenancy, and buyer type matter more than property type alone.',
    },
    {
      label: 'Average all three comps for a 5.57% cap.',
      isBest: false,
      explanation:
        'Averaging dissimilar comps blends different risk and buyer pools. Three data points are not better than two good ones if one is the wrong asset.',
    },
    {
      label: 'Use the 4.9% as the primary comp because it is the most recent.',
      isBest: false,
      explanation:
        'Recency does not fix a mismatch. A recent comp for a different product type tells you about a different market.',
    },
    {
      label: 'Discard all comps and use replacement cost.',
      isBest: false,
      explanation:
        'Replacement cost is a floor check, not a substitute for market pricing, and you do have two usable comps.',
    },
  ],
  takeaway:
    'A good comp matches on size, tenancy structure, location, and buyer pool, not just asset class. When a comp doesn\'t match, show it as context and explain why it isn\'t the anchor.',
  tips: [
    'Rank comps by similarity before looking at their cap rates.',
    'Large single-tenant deals price off credit and term; small multi-tenant off rollover and mark-to-market.',
    'Document the adjustment logic so IC can follow it.',
  ],
};
