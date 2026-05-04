import type { LongformCase } from '../../types/longform';

export const walkMeThroughBid: LongformCase = {
  id: 'walk-me-through-bid',
  title: 'Walk me through your bid',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re the lead analyst on a $42M acquisition of a 200-unit Class-B garden-style multifamily asset, built 1998, in a top-50 MSA. The OM presents: T-3 annualized NOI of $2.45M (5.83% going-in cap), 5% Year-1 NOI growth tapering to 3% by Year 5, a $300/unit/yr capex reserve, and a 6.0% exit cap (just 17 bps wider than going-in). Submarket vacancy is 6%; the asset is at 94%. Recent comps in the submarket trade 5.50–6.25%, including one trophy 2018-built asset at 5.50%. Your IRR target is 14% on a 5-year hold; the deal pencils to 13.8% at the OM\'s assumptions.',
  data: [
    { label: 'Purchase price', value: '$42M' },
    { label: 'OM going-in cap (T-3 ann.)', value: '5.83%' },
    { label: 'Year-1 NOI growth assumed', value: '5%' },
    { label: 'Capex reserve', value: '$300/unit/yr' },
    { label: 'Exit cap', value: '6.0% (17 bps spread)' },
    { label: 'IRR at OM assumptions', value: '13.8%' },
    { label: 'Subject vintage', value: '1998 (Class B)' },
    { label: 'Comp range', value: '5.50–6.25%' },
  ],
  question:
    'In 4-6 sentences: how do you re-cut this OM, what bid do you recommend, and why? Be specific about which assumptions you change and how each one moves the price.',
  modelAnswer: `The OM stacks aggressive assumptions across multiple lines; each one needs to be re-cut. First, replace the T-3 annualized NOI with T-12 actuals — T-3 misses seasonal vacancy and likely understates real expense run-rate by 5-10%. Second, NOI growth at 5% Year 1 has no value-add story behind it; the asset is stabilized, leased to market, and the submarket is at 6% vacancy. Re-cut to 3% to match historical submarket rent growth. Third, $300/unit/yr capex on a 1998-vintage Class-B asset is light; institutional norms are $400-500/unit/yr for 25-yr-old MF. Fourth, 17 bps of cap expansion over 5 years is aggressively tight in any rate environment; widen to 75-100 bps. Each of these cuts the implied value by ~3-7%. Combined, the deal should pencil at $36-38M, not $42M. Recommend bidding $37M with a clear narrative on which assumptions changed; if seller refuses, walk — there will be other 1998-vintage MF deals at fair pricing.`,
  rubric: [
    {
      id: 'flags-trended-noi',
      dimension: 'Calls out T-3 annualized as wrong methodology — demands T-12 actuals',
      weight: 1.5,
    },
    {
      id: 'pushes-back-noi-growth',
      dimension: 'Pushes back on 5% Year-1 NOI growth without a value-add story',
      weight: 1.5,
    },
    {
      id: 'capex-reserve',
      dimension: 'Identifies $300/unit/yr as light for 1998-vintage Class-B; cites institutional norm',
    },
    {
      id: 'exit-cap-spread',
      dimension: 'Calls 17 bps of cap expansion as too tight; widens to 75-100 bps',
    },
    {
      id: 'numeric-bid-range',
      dimension: 'Recommends a specific bid number tied to the re-cut math (not just "lower")',
      weight: 1.5,
    },
    {
      id: 'walk-away-discipline',
      dimension: 'Frames walk-away if seller refuses, rather than chasing the OM\'s number',
    },
  ],
  takeaway:
    'A "walk me through your bid" answer demonstrates that you can read an OM critically, identify each aggressive assumption, quantify the impact, and arrive at YOUR number rather than the seller\'s. Senior partners listen for whether you push back on multiple lines (not just one) and whether you can defend a specific bid range with the math behind it.',
  tips: [
    'Always re-cut to T-12 actuals; T-3 + annualizing hides seasonality.',
    'NOI growth without a named lever is wishful thinking — flag every time.',
    'Walking is a feature, not a bug. The cleanest signal of underwriting discipline.',
  ],
};
