import type { SituationalCase } from '../../types/situational';

export const compDistressedSale: SituationalCase = {
  id: 'comp-distressed-sale',
  title: 'Is this comp really a comp?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'retail',
  scenario:
    'In your retail comp set, four strip-center trades cleared at 6.0–6.3% cap rates. A fifth traded at 7.6% last month. On review, the fifth was a lender-controlled sale after a loan default, marketed for 45 days with a single bidder pool and no seller marketing materials.',
  data: [
    { label: 'Arm\'s-length comps', value: '6.0–6.3% (4 trades)' },
    { label: 'Outlier trade', value: '7.6%' },
    { label: 'Sale type', value: 'Lender-controlled, post-default' },
    { label: 'Marketing period', value: '45 days' },
  ],
  question: 'How should the 7.6% trade be treated?',
  options: [
    {
      label: 'Footnote it and exclude it from the pricing range — distressed trades are not arm\'s-length, but note it as a signal of downside.',
      isBest: true,
      explanation:
        'Appraisal and underwriting standards generally call for arm\'s-length, market-exposed transactions. A forced sale with compressed marketing reflects seller constraints. It can inform downside scenarios, not the central estimate.',
    },
    {
      label: 'Include it — every trade is market evidence.',
      isBest: false,
      explanation:
        'A forced sale is evidence of a forced sale. Including it pulls the median toward a price a willing seller would not take.',
    },
    {
      label: 'Replace the other four with it since it is the most recent.',
      isBest: false,
      explanation:
        'Recency does not trump comparability.',
    },
    {
      label: 'Average it in at half weight to be conservative.',
      isBest: false,
      explanation:
        'Arbitrary weighting is hard to defend; the better answer is a clear inclusion rule, applied consistently.',
    },
  ],
  takeaway:
    'Screen comps for arm\'s-length conditions: adequate exposure, motivated-but-not-forced parties, and normal terms. Disclose and set aside the exceptions rather than quietly blending them.',
  tips: [
    'Ask how long the asset was marketed and how many bids came in.',
    'Related-party and portfolio trades often need adjustment too.',
    'Keep a short excluded-comps list with reasons.',
  ],
};
