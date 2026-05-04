import type { SituationalCase } from '../../types/situational';

export const capexReserveDiscipline: SituationalCase = {
  id: 'capex-reserve-discipline',
  title: 'How do you size the capex reserve on a stabilized asset?',
  category: 'diagnostic',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re underwriting a 200-unit Class-B multifamily acquisition built in 2005. The OM models a $250/unit/yr capex reserve. The roof is 18 years old (40-yr life), boilers are due in 2 years, and you\'ve identified ~$400k of deferred maintenance from the property tour.',
  data: [
    { label: 'Units', value: '200' },
    { label: 'Year built', value: '2005 (20 yrs)' },
    { label: 'OM capex reserve', value: '$250/unit/yr ($50k/yr)' },
    { label: 'Roof age', value: '18 yr (40-yr life)' },
    { label: 'Boiler replacement', value: 'Due in 2 yrs' },
    { label: 'Deferred maint identified', value: '~$400k' },
  ],
  question: 'How should you re-size the capex reserve in your underwriting?',
  options: [
    {
      label:
        'Bump the recurring reserve to $400–500/unit/yr ($80–100k/yr) AND budget the boiler + roof + deferred maint as one-time line items in the equity check at closing — recurring reserves don\'t cover known near-term capital events.',
      isBest: true,
      explanation:
        'Recurring capex reserves cover the *steady-state* cost of keeping a building leasable: appliance turnover, paint, carpet, HVAC service. For a 20-year-old MF asset, $400-500/unit/yr is the institutional norm. Known near-term capital events (roof, boiler, deferred maint) are *not* recurring — they hit at specific moments and are funded from equity at closing or from a reserve drawn down on an explicit schedule. Stacking them into the recurring reserve under-states both the equity check and the capex line in the proforma.',
    },
    {
      label: 'Trust the OM\'s $250/unit/yr — that\'s a typical Class-B MF figure and the broker has institutional clients who use it.',
      isBest: false,
      explanation:
        '$250/unit/yr is on the low end even for a young Class-A asset; for a 20-year-old building with identified deferred maintenance and known near-term replacements, it\'s materially under-funded. Brokers default to low capex assumptions because higher reserves reduce the price the seller can get. Verify, don\'t accept.',
    },
    {
      label: 'Add the deferred maintenance ($400k) to the OM\'s reserve as a one-time event but keep the recurring at $250/unit/yr.',
      isBest: false,
      explanation:
        'Half-right but ignores the boiler + roof. Both will need replacement during the underwriting horizon (5-yr hold), and neither is a "deferred maintenance" item — they\'re *known scheduled replacements* coming in years 2 and 5. Treat them as planned capital events with their own line items, not lumped into recurring or deferred.',
    },
    {
      label: 'Set the recurring reserve high enough ($800/unit/yr) to absorb everything — roof, boiler, deferred — over the 5-year hold.',
      isBest: false,
      explanation:
        'Inflates the recurring line beyond the steady-state cost, which makes the asset look like it has a chronic capex problem on the proforma. Year-3 cash flow projections will show artificially low NOI growth. The cleaner approach is to keep recurring at the right steady-state level and call out one-time events separately so each line item tells the truth about what it represents.',
    },
  ],
  takeaway:
    'Capex has two layers: recurring (steady-state, sized per unit per year) and one-time (specific known replacements, sized as scheduled events). Conflating them produces under- or over-funded reserves and misleading NOI lines. Class-B MF recurring norms run $300-500/unit/yr; pad it for older / heavier-capex product. One-time events live as their own line items in the equity check or a draw schedule.',
  tips: [
    'Recurring capex norms by asset class: Class-A MF $250-350/unit · Class-B/C MF $400-600/unit · office $1.50-3.00/SF · industrial $0.50-1.00/SF · retail $1-2/SF.',
    'Roof, HVAC, parking lots, boilers — schedule them. They\'re not recurring.',
    'Deferred maintenance from the tour goes into Day-1 capex, not into year-1 recurring.',
  ],
};
