import type { SituationalCase } from '../../types/situational';

export const fixedVsCpiRentBumps: SituationalCase = {
  id: 'fixed-vs-cpi-rent-bumps',
  title: 'CPI bumps or fixed 3% — which do you take?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You are negotiating a 10-year industrial lease for 200,000 SF at $8.00/SF base rent. The tenant proposes CPI-linked annual rent bumps rather than your standard 3% fixed escalations. Current CPI is running at 4.5%, but your long-run inflation assumption is 2.5%. Your construction lender underwrites the property assuming fixed 3% bumps.',
  data: [
    { label: 'Lease SF', value: '200,000 SF' },
    { label: 'Base rent', value: '$8.00/SF NNN' },
    { label: 'Lease term', value: '10 years' },
    { label: 'Proposed escalation', value: 'Annual CPI, uncapped' },
    { label: 'Standard escalation', value: 'Fixed 3%/yr' },
    { label: 'Current CPI', value: '4.5%' },
    { label: 'Long-run CPI assumption', value: '2.5%' },
  ],
  question:
    'Should you accept uncapped CPI bumps, and what structural protection would make them acceptable?',
  options: [
    {
      label:
        'Uncapped CPI bumps are risky — favorable when inflation is high, but damaging in low-inflation periods when CPI prints below 3%. Accept only with a CPI collar (e.g., floor of 2%, cap of 5%) that protects downside while preserving inflation linkage.',
      isBest: true,
      explanation:
        'CPI bumps introduce rent variability: in high-inflation years landlords outperform fixed escalations; in low-inflation years they underperform. Your long-run assumption of 2.5% CPI means that over the 10-year term, CPI-linked bumps would on average trail the 3% fixed alternative. The protective structure is a CPI collar — a floor ensures the landlord always receives at least minimum escalation (e.g., 2%); a cap limits the tenant\'s exposure and keeps the deal closeable. Without a floor, accepting CPI bumps is an uncollared inflation bet. The other issue: your lender models fixed 3% bumps — a variable CPI structure requires lender sign-off or may cause a model mismatch at underwriting.',
    },
    {
      label:
        'Accept CPI bumps without restriction — current CPI at 4.5% beats the 3% fixed alternative.',
      isBest: false,
      explanation:
        'Anchors on today\'s CPI, not the 10-year outlook. Your long-run CPI assumption is 2.5% — meaning CPI bumps would, on average, trail the 3% fixed alternative for most of the lease term. Taking a 10-year CPI exposure based on a single year\'s data is asymmetric risk.',
    },
    {
      label:
        'Reject CPI bumps entirely — fixed escalations are the industrial standard and any deviation creates modeling and lender complications.',
      isBest: false,
      explanation:
        'CPI-linked bumps are increasingly common in long-term industrial leases, particularly with credit tenants seeking inflation protection. Rejecting them outright may cost the deal. The right approach is to negotiate terms (a collar) that protect the base case underwriting.',
    },
    {
      label:
        'Accept CPI bumps and update the lender\'s underwriting model to match.',
      isBest: false,
      explanation:
        'Lenders underwrite to standardized assumptions; a CPI-variable bump structure requires them to underwrite a range of scenarios, not a single number. Changing the lender\'s model without confirming they will accept the variable structure may affect loan sizing and covenant calculations.',
    },
  ],
  takeaway:
    'CPI bumps favor landlords in high-inflation environments and create downside risk in low-inflation periods. The protective structure is a CPI collar: a floor (e.g., 2%) protects against sub-target inflation; a cap (e.g., 5%) limits tenant exposure. Without a floor, CPI bumps are an uncollared inflation bet against a 3% fixed alternative.',
  tips: [
    'CPI floor of 2% = downside protection if inflation runs below target.',
    'CPI cap of 4–5% keeps the deal economically feasible for the tenant.',
    'Always check lender underwriting assumptions — a CPI structure may require explicit lender sign-off.',
  ],
};
