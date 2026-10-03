import type { SituationalCase } from '../../types/situational';

export const compDistressedSale: SituationalCase = {
  id: 'comp-distressed-sale',
  title: 'A receivership sale prints a wide cap',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    'A comparable office building sold last month out of receivership at a 9.5% cap rate. The market has otherwise traded at 7.0–7.5% over the past year. Your subject is stabilized and 88% leased, and you are asked to value it for a refinance.',
  data: [
    { label: 'Receivership comp', value: '9.5% cap, court-supervised sale' },
    { label: 'Market range (12 mo.)', value: '7.0–7.5%' },
    { label: 'Subject occupancy', value: '88%' },
  ],
  question: 'How should the 9.5% cap rate factor into your valuation?',
  options: [
    {
      label: 'Treat it as an outlier unless it is repeated, but watch it: it may be the first signal of where forced sellers will clear.',
      isBest: true,
      explanation:
        'A court-supervised sale involves limited marketing, time pressure, and often a poorly maintained asset, so it doesn\'t represent a normal arm\'s-length market. But a lender will ask about it, so you should know what\'s different about the subject and be prepared to explain it.',
    },
    {
      label: 'Use it because it is the most recent trade in the submarket.',
      isBest: false,
      explanation:
        'Recency doesn\'t override motivation. A forced sale reflects a seller with no leverage, not the clearing price for a typical well-marketed sale.',
    },
    {
      label: 'Ignore it completely; distressed sales never matter.',
      isBest: false,
      explanation:
        'If distressed trades start to cluster, they become the market. A single data point is an outlier; a trend is not.',
    },
    {
      label: 'Raise your cap to 8.5% as the midpoint between the two.',
      isBest: false,
      explanation:
        'Blending a distressed print with the normal range has no analytical basis and reduces the value for a reason that doesn\'t apply to the subject.',
    },
  ],
  takeaway:
    'Separate arm\'s-length from forced sales when selecting comps. But track distressed trades: when they become frequent they signal where the market is heading.',
  tips: [
    'Check seller motivation, marketing period, and condition.',
    'One outlier is noise; three in a quarter is a trend.',
    'Be ready with a reason your asset differs from the distressed one.',
  ],
};
