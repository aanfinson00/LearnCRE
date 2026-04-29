import type { SituationalCase } from '../../types/situational';

export const trendedVsInplaceLeaseup: SituationalCase = {
  id: 'trended-vs-inplace-leaseup',
  title: 'Which NOI denominator do you use for the exit cap?',
  category: 'pricing',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re acquiring a brand-new multifamily lease-up. The property is 80% leased today; stabilization (95%+) is expected in Year 2. You\'re modeling a 5-year hold and need to choose what NOI to apply the exit cap to. The seller\'s pro forma shows a stabilized $2.1M NOI; current trailing NOI is $1.4M.',
  data: [
    { label: 'Current occupancy', value: '80%' },
    { label: 'Trailing NOI', value: '$1.4M' },
    { label: 'Stabilized NOI (Year 2)', value: '$2.1M' },
    { label: 'Modeled hold', value: '5 years' },
  ],
  question: 'What\'s the right NOI to use as the exit-cap denominator?',
  options: [
    {
      label:
        'Year-5 trended NOI — start from stabilized $2.1M, then apply your forward rent growth, expense inflation, and any rollover assumptions to get to a true Year-5 figure.',
      isBest: true,
      explanation:
        'The exit cap is applied to the income at the moment of sale, not today\'s income or the stabilized number frozen at Year 2. Walk it forward: Year 2 stabilized $2.1M → Year 5 trended NOI reflecting market rent growth (offset by expense growth) over 3 additional years. Selling on the as-stabilized number under-states the exit value if rent growth is positive; selling on trailing $1.4M misses 100% of the lease-up.',
    },
    {
      label: 'Trailing $1.4M NOI — most conservative; matches what a buyer would underwrite as in-place.',
      isBest: false,
      explanation:
        'Confuses going-in-cap math with exit-cap math. At Year 5 the lease-up is long-since complete; the buyer underwrites whatever is in-place at that moment, which is far above today\'s $1.4M. Using trailing produces an artificially low exit value and an over-conservative IRR.',
    },
    {
      label: 'Stabilized Year-2 $2.1M — that\'s the income the asset is ultimately designed to generate.',
      isBest: false,
      explanation:
        'Better than trailing but still wrong. Year 2 stabilized NOI is *not* Year 5 NOI. Three years of rent growth (and expense growth) compound between them. Using a frozen Year-2 number under-states exit value by ~10% in a normal-growth market.',
    },
    {
      label: 'Average of trailing and stabilized — splits the lease-up risk.',
      isBest: false,
      explanation:
        'Doesn\'t correspond to any actual cash flow. The exit value is what the *buyer at Year 5* will pay, based on what *they* see as in-place income. Averaging two numbers from different points in the holding period produces a misleading exit value.',
    },
  ],
  takeaway:
    'The exit cap goes on Year-N trended NOI — the buyer at exit underwrites in-place income at *their* Year 0. For a lease-up, that means you walk stabilized NOI forward to the exit year with rent growth and expense inflation, then apply the exit cap to *that* figure.',
  tips: [
    'Going-in cap on Year-1 NOI; exit cap on Year-N trended NOI. Different denominators, same building.',
    'In a lease-up, "stabilized NOI" is a milestone, not an exit number — keep walking it forward.',
    'For a 5-yr hold with Year-2 stabilization: 3 years of trending separates stabilization from exit.',
  ],
};
