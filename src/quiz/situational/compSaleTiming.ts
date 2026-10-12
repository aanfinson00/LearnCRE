import type { SituationalCase } from '../../types/situational';

export const compSaleTiming: SituationalCase = {
  id: 'comp-sale-timing',
  title: 'Which comps still count?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'You are pricing a stabilized apartment community. The comp set has five trades: two closed 20 months ago at 4.9–5.1% cap rates, and three closed in the last 4 months at 5.9–6.2%. Over the intervening period the 10-year Treasury rose about 150 bps and lender spreads widened.',
  data: [
    { label: 'Older comps (20 mo ago)', value: '4.9–5.1%' },
    { label: 'Recent comps (≤4 mo)', value: '5.9–6.2%' },
    { label: 'Rate environment', value: '10-yr +150 bps' },
    { label: 'Subject quality', value: 'Comparable to all five' },
  ],
  question: 'How should you use the comp set?',
  options: [
    {
      label: 'Anchor on the three recent trades and treat the older two as a ceiling on pricing, not as support for a lower cap rate.',
      isBest: true,
      explanation:
        'When capital markets have repriced, stale trades reflect a market that no longer exists. Recent trades show where buyers clear today; older ones are useful only to show direction and how far the market has moved.',
    },
    {
      label: 'Average all five — more data points means a better estimate.',
      isBest: false,
      explanation:
        'Averaging blends two different regimes (about 5.5% overall) and understates today\'s cap rate by roughly 50 bps.',
    },
    {
      label: 'Use only the older comps; they have lower cap rates and support a higher price.',
      isBest: false,
      explanation:
        'That is anchoring on the answer you want. A lender or IC will reject it.',
    },
    {
      label: 'Discard the comp set and use the replacement-cost approach only.',
      isBest: false,
      explanation:
        'Replacement cost is a cross-check, not a substitute for market evidence.',
    },
  ],
  takeaway:
    'Comps are only as good as the market they came from. After a rate or spread regime shift, weight recent trades heavily and use older trades to show direction.',
  tips: [
    'Date-stamp every comp and note what changed since.',
    'Thin recent data: widen geography before reaching back in time.',
    'Ask brokers who bought, how financed, and what the debt cost.',
  ],
};
