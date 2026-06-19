import type { SituationalCase } from '../../types/situational';

export const submarketBoundaryExpansion: SituationalCase = {
  id: 'submarket-boundary-expansion',
  title: "Broker expanded the comp submarket — are these comps actually valid?",
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  scenario:
    "You're reviewing a CBRE OM for a 180,000 SF suburban Class B office park in the North Loop submarket of a Midwest metro. The OM's comp set includes six sales and 10 lease comps. Four of the six sales comps are in the North Loop; the other two are 8 miles away in the Midtown submarket — a higher-density, transit-served area with meaningfully different tenant profiles and higher rent growth. The broker's argument: 'We expanded the boundary slightly to capture more data given limited North Loop transaction volume.' The Midtown comps suggest a cap rate 50 bps tighter and rents $4–6/SF higher than true North Loop trades.",
  data: [
    { label: 'Subject', value: '180,000 SF suburban Class B office, North Loop' },
    { label: 'North Loop sale comps', value: '4 trades (in submarket)' },
    { label: 'Midtown sale comps (expanded)', value: '2 trades (8 miles away, transit)' },
    { label: 'Midtown vs North Loop: cap rate', value: 'Midtown ~50 bps tighter' },
    { label: 'Midtown vs North Loop: rent', value: 'Midtown ~$4–6/SF higher' },
    { label: 'Broker justification', value: 'Limited North Loop transaction volume' },
  ],
  question:
    "How should you handle the Midtown comps, and what does this tell you about the seller's pricing thesis?",
  options: [
    {
      label:
        "Strip the Midtown comps from your analysis — they're a different product for a different user in a different location, and including them inflates cap-rate and rent expectations. Use only the four North Loop trades as your primary calibration, even if it leaves you with limited data. Call a local broker to source off-market or non-OM comparable trades if the four sales are insufficient.",
      isBest: true,
      explanation:
        "Right call. Comp validity depends on functional equivalence: same submarket, similar asset class and vintage, similar tenant pool, similar access/infrastructure. Transit-served urban Midtown office competes for different users than suburban North Loop — different rents, different cap rates, different hold periods, different exit buyers. Including them inflates the implied value by ~50 bps on cap rate and $4-6/SF on rent, which on a 180,000 SF building at a 7.5% cap rate translates to a multi-million-dollar overstatement. Four in-submarket comps is limited but more reliable than six comps where 33% are geographically and functionally different.",
    },
    {
      label:
        "Accept the Midtown comps with a 25 bps adjustment to account for the suburban location premium — expanding submarket boundaries is standard when transaction volume is limited.",
      isBest: false,
      explanation:
        "25 bps is insufficient. The observable spread is 50 bps (cap rates) and $4-6/SF (rents) — and these gaps reflect structural differences in tenant demand, not just suburban location. A 25 bps 'adjustment' would still leave you using a Midtown-skewed baseline for a suburban asset. When the functional difference between locations is this large, adjusted comps don't resolve the problem; only true in-submarket comps do.",
    },
    {
      label:
        "Use all six sales comps but weight the Midtown comps at 50% of the North Loop comps to blend the data while acknowledging the geographic difference.",
      isBest: false,
      explanation:
        "Weighting problematic comps rather than excluding them is a common but flawed practice. The issue isn't how much weight to give Midtown trades — it's that they measure a different asset type in a different market. Averaging them at any weight produces a biased baseline. Better to have four reliable data points than six where two are systematically biased upward.",
    },
    {
      label:
        "It's too early to dismiss the Midtown comps — wait until you have a broker's opinion of value and a third-party appraisal before deciding which comps to use.",
      isBest: false,
      explanation:
        "Waiting for an appraisal before forming a comp view is the wrong sequencing. Acquisitions due diligence requires an independent preliminary valuation before you get to appraisal — that's how you know whether to proceed to exclusivity and what to pay. By the time you have an appraisal, you've already spent significant time and money. Forming a view on comp validity is a Day 1 diligence task.",
    },
  ],
  takeaway:
    'Submarket boundary expansion is a common broker tactic to import more favorable data when true in-submarket comps are scarce or weak. The test for comp inclusion is functional equivalence: same submarket, same product type, same tenant demand pool, and comparable physical characteristics. A 50-bps cap rate spread and $4–6/SF rent differential between two locations signals a structural difference, not a geographic proximity issue. Always source additional in-submarket trades through broker relationships rather than accepting a geographically expanded comp set from the sell-side.',
  tips: [
    'Rule of thumb for comp geography: <2 miles for dense urban; <5 miles for suburban; <10 miles for industrial/logistics. Anything beyond requires explicit justification.',
    'Transit access, parking ratios, and tenant profile are the key factors that create comp discontinuities — check each one when evaluating geographic expansion.',
    'When sell-side has expanded the boundary, call a local tenant rep broker: they know which companies are actually comparing North Loop vs Midtown. If no tenant is cross-shopping, the markets aren\'t fungible.',
    'Four solid in-submarket comps give more pricing signal than six comps where two are systematically biased. Prioritize relevance over sample size.',
  ],
};
