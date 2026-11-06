import type { SituationalCase } from '../../types/situational';

export const gmpVsCostPlusDesign: SituationalCase = {
  id: 'gmp-vs-cost-plus-design',
  title: 'GMP contract at 60% drawings?',
  category: 'risk',
  scenario: 'A developer wants a Guaranteed Maximum Price contract signed now to lock cost for the lender. Construction drawings are about 60% complete, with several allowances and an unresolved structural scheme. The GC is pushing for a high contingency and broad exclusions to take the GMP.',
  data: [
    {
      label: 'Drawings complete',
      value: '~60%'
    },
    {
      label: 'Allowances',
      value: 'Several, large'
    },
    {
      label: 'Structural scheme',
      value: 'Unresolved'
    },
    {
      label: 'GC posture',
      value: 'High contingency, broad exclusions'
    }
  ],
  question: 'What is the most sensible path?',
  options: [
    {
      label: 'Use preconstruction services with a cost-plus or NTE structure; convert to GMP once design is ~90% complete.',
      isBest: true,
      explanation: 'A GMP is only as firm as the documents behind it. On immature drawings the GC prices the unknowns into the contingency and exclusions, and change orders follow anyway. Progressing design first yields a tighter, more honest GMP.'
    },
    {
      label: 'Sign the GMP now; the lender will be satisfied.',
      isBest: false,
      explanation: 'A GMP with big allowances and exclusions is a number with holes. It looks like certainty but leaves the owner exposed to change orders.'
    },
    {
      label: 'Go lump-sum fixed price to eliminate all risk.',
      isBest: false,
      explanation: 'Fixed price on incomplete drawings is priced at a heavy premium, and scope gaps still become change orders.'
    },
    {
      label: 'Wait for 100% drawings before engaging a GC.',
      isBest: false,
      explanation: 'Early GC involvement helps constructability and pricing; the issue is the timing of the price commitment, not engagement.'
    }
  ],
  takeaway: 'Lock price when scope is defined. Engage the GC early, but convert to GMP once drawings are mature.',
  tips: [
    'Check allowances and exclusions before trusting a GMP.',
    'Target ~90% drawings before GMP.',
    'Keep an owner contingency separate from the GC\'s.'
  ],
  difficulty: 'intermediate',
  assetClass: 'mixed',
  roles: [
    'development',
    'assetManagement'
  ]
};
