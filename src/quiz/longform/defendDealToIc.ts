import type { LongformCase } from '../../types/longform';

export const defendDealToIc: LongformCase = {
  id: 'defend-deal-to-ic',
  title: 'Defend this deal to a skeptical IC',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'industrial',
  scenario:
    'You\'ve underwritten a $65M industrial acquisition. Going-in cap is 5.2% (modeled at $3.4M NOI), exit cap 6.0% (80 bps spread), levered IRR 16.5% on a 5-year hold at 60% LTV. The submarket is tight (3% vacancy), the building is a 2015-vintage Class-A distribution facility leased to a single investment-grade tenant on 9 years of remaining term with 2.5% annual escalations. The IC chairman opens by saying "industrial caps have compressed too far; we\'re late in the cycle. Why are we buying at 5.2% when the historical avg is 6.5%?"',
  data: [
    { label: 'Purchase price', value: '$65M' },
    { label: 'Going-in cap', value: '5.2%' },
    { label: 'Exit cap modeled', value: '6.0% (+80 bps)' },
    { label: 'Levered IRR', value: '16.5%' },
    { label: 'Tenant', value: 'IG, 9 yrs remaining, 2.5% escalations' },
    { label: 'Submarket vacancy', value: '3%' },
    { label: 'Vintage', value: '2015 (Class A)' },
    { label: '20-yr submarket cap avg', value: '~6.5%' },
  ],
  question:
    'Defend the buy thesis to the IC in 6-8 sentences. Don\'t pretend the chairman\'s concern doesn\'t exist; address it directly with specific reasons this asset earns the tight cap.',
  modelAnswer: `The chairman\'s concern is fair on a market basis but misses three asset-specific reasons this deal warrants tighter pricing than the 20-year average. First, the income stream is bond-like: an IG tenant with 9 years of remaining term plus 2.5% contractual escalations gives us a contractual NOI growth rate of ~17.5% over the hold without market-rent assumption, plus near-zero rollover risk. That earns 50-100 bps of cap compression vs. spec-grade or short-term-leased product, which is exactly what the market is pricing today. Second, on exit underwriting we\'re modeling 80 bps of cap expansion (5.2% → 6.0%), which absorbs a meaningful normalization scenario; the model isn\'t assuming the cap stays tight at exit. Third, even at a stress-case 6.5% exit cap (matching the 20-yr historical average), the levered IRR still pencils to ~13%, above our 12% required return. So the buy thesis is: we\'re paying for income certainty (IG tenant + long lease + escalations), our exit assumes meaningful normalization, and the deal still clears the hurdle in a stress case. The risk we ARE taking is timing — if cap rates move >150 bps in 5 years and rates stay elevated, the IRR drops below 10%. We size the bid accordingly and walk if the seller insists on a tighter exit cap than 6.0%.`,
  rubric: [
    {
      id: 'acknowledges-concern',
      dimension: 'Acknowledges the chairman\'s concern as legitimate (not dismissive)',
      weight: 1.5,
    },
    {
      id: 'tenant-credit-thesis',
      dimension: 'Explains why IG tenant + long lease + escalations earn the tight cap',
      weight: 2,
    },
    {
      id: 'exit-cap-defense',
      dimension: 'Defends the 80 bps exit-cap spread as conservative-not-aggressive',
      weight: 1.5,
    },
    {
      id: 'stress-test',
      dimension: 'Runs a stress-case (e.g. 6.5% exit cap) and quantifies the IRR there',
      weight: 1.5,
    },
    {
      id: 'names-the-risk',
      dimension: 'Names the residual risk explicitly (not "we\'ll be fine")',
      weight: 1.5,
    },
    {
      id: 'walk-discipline',
      dimension: 'Frames a walk threshold — what would change the buy thesis',
    },
  ],
  takeaway:
    'Defending a tight-cap deal to a skeptical IC requires (1) acknowledging the concern is fair, (2) naming specific asset-level reasons it earns the pricing, (3) showing the model already absorbs a meaningful stress case, (4) being explicit about the residual risk you\'re taking. The worst defense is "the comps support it" — that\'s circular. The best is "here\'s what the buyer is paying for, here\'s the floor on returns if we\'re wrong, here\'s when we walk."',
  tips: [
    'Acknowledge the concern in plain language; don\'t fight the framing.',
    'Always run a stress case in your IC defense. "What if you\'re wrong about exit cap?" is the next question.',
    'Naming the residual risk explicitly is what separates senior thinking from junior.',
  ],
};
