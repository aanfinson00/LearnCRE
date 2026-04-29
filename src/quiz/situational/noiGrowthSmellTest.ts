import type { SituationalCase } from '../../types/situational';

export const noiGrowthSmellTest: SituationalCase = {
  id: 'noi-growth-smell-test',
  title: 'Does this NOI growth assumption hold up?',
  category: 'diagnostic',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'A broker\'s offering memorandum on a stabilized garden-style multifamily asset shows 8.0% annual NOI growth in years 1–5 of the proforma. The submarket has averaged 2.5–3.0% rent growth historically, with a recent peak of ~5% during the 2021 spike. Property is 95% occupied, leased to market, no value-add story, no upcoming reassessment.',
  data: [
    { label: 'Proforma NOI growth', value: '8%/yr' },
    { label: 'Historical rent growth', value: '2.5–3.0%' },
    { label: 'Recent peak (2021)', value: '~5%' },
    { label: 'Occupancy', value: '95% (stabilized)' },
    { label: 'Value-add component', value: 'None disclosed' },
  ],
  question: 'How should you respond to this NOI growth assumption?',
  options: [
    {
      label: 'Reject it and re-underwrite at 3–4%/yr — 8% on a stabilized asset with no value-add lever is roughly 2× any defensible long-run pace.',
      isBest: true,
      explanation:
        'NOI growth on a stabilized rent-roll equals roughly (rent growth × leased %) − opex growth. At 3% rent growth and 3–4% opex growth, real NOI growth is closer to 2–3%. 8% requires either rent growth at 2× historical norms, opex contraction (not a thing), or a value-add story the OM didn\'t disclose. Anchor at 3–4% and ask the broker what they\'re seeing that you\'re not.',
    },
    {
      label: 'Accept it but discount the exit cap to compensate.',
      isBest: false,
      explanation:
        'Two wrongs don\'t cancel — using an inflated NOI ramp with a wider exit cap obscures the underwriting. The correct move is to fix the inputs, not to mask aggressive growth with a punitive cap. You\'ll lose to bidders who underwrite cleanly and price-in a tighter exit cap on real growth.',
    },
    {
      label: 'Trust the broker — they have submarket data you don\'t.',
      isBest: false,
      explanation:
        'Brokers are advocates for the seller. Their job is to support the highest defensible price; "trust" is not an underwriting input. Verify with public REIS / CoStar / submarket reports and the property\'s own historical financials. If they have a real story, they\'ll show you the data.',
    },
    {
      label: 'It\'s within range — 8% is achievable in inflationary environments.',
      isBest: false,
      explanation:
        'Historical multifamily NOI growth has rarely sustained at 8% even in inflationary environments — and the 2021 spike was unique to severe supply imbalance. Treating it as a reasonable base case for a 5-year hold puts the proforma well outside historical experience.',
    },
  ],
  takeaway:
    'NOI growth assumptions on stabilized assets should anchor to long-run rent growth minus opex growth. Anything 2×+ historical norms requires a *specific*, *named*, *quantifiable* lever — value-add, mark-to-market, expense recovery — or it\'s aspirational. Your job is to find that lever or push back.',
  tips: [
    'Real-NOI-growth ≈ rent-growth × leased% − opex-growth.',
    'Multifamily long-run NOI growth: 2–3% in typical markets.',
    'If the OM\'s growth ramp doesn\'t name the lever, ask. If they can\'t name it, fix the input.',
  ],
};
