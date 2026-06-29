import type { SituationalCase } from '../../types/situational';

export const saleLeasebackCapCompSelection: SituationalCase = {
  id: 'sale-leaseback-cap-comp-selection',
  title: 'Why traditional office comps don\'t apply to a sale-leaseback',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'debtUnderwriting'],
  assetClass: 'office',
  scenario:
    'A national retailer is selling its 150,000 SF headquarters office in a 20-year absolute-NNN sale-leaseback at $32/SF base rent with 2% annual bumps. Comparable office investment sales in the submarket trade at 7.00–7.50% caps. Your broker argues the sale-leaseback should price at 5.25% because of the tenant\'s investment-grade credit (BBB rated), 20-year lease term, and absolute-NNN structure.',
  data: [
    { label: 'Lease structure', value: '20-year absolute NNN, 2% annual bumps' },
    { label: 'Tenant credit', value: 'BBB investment-grade' },
    { label: 'Office market cap range', value: '7.00–7.50%' },
    { label: 'Broker\'s suggested cap', value: '5.25%' },
    { label: 'Base rent', value: '$32/SF' },
  ],
  question: 'Are traditional office investment comps the right benchmark for this sale-leaseback?',
  options: [
    {
      label: 'No — sale-leasebacks of investment-grade credits on long absolute-NNN leases trade in a different market than traditional office sales. The comp set is other sale-leasebacks (bond-equivalent real estate), not office building sales. The 5.25% cap reflects credit quality and lease structure, not real estate market fundamentals.',
      isBest: true,
      explanation:
        'Sale-leasebacks of investment-grade absolute-NNN long-term leases are priced like bond instruments, not real estate operating investments. Relevant comps are: (a) other sale-leasebacks of similar credit quality and remaining term, and (b) the spread-to-investment-grade corporate bonds for the same credit. A BBB-rated 20-year absolute NNN leaseback pricing at 5.25% in a 7.00% office market makes sense because the risk profiles are completely different: the office comps carry real estate risk (vacancy, renewal, capex, market rent); the leaseback carries none of those risks for 20 years — cash flows are contractual. Traditional office comps are relevant only for modeling the residual value at lease expiration.',
    },
    {
      label: 'Yes — use office comps. The building is office real estate regardless of lease structure.',
      isBest: false,
      explanation:
        'Ignores economic substance. The cash flow of a 20-year absolute-NNN investment-grade leaseback is structurally different from a traditional office building: no capex, no lease-up risk, no re-tenanting risk, no real estate operating exposure for 20 years. Buyers are purchasing a credit instrument wrapped in real estate and price it accordingly. Office comps apply at lease expiration, not at acquisition.',
    },
    {
      label: 'Average the office cap range and the leaseback cap — 6.25% represents the blended risk.',
      isBest: false,
      explanation:
        'Arbitrary blending has no analytical basis. The 7%+ office cap reflects real estate operating risk; the 5.25% leaseback cap reflects credit risk on a contractual cash flow stream. These are different risk sets that cannot be meaningfully averaged.',
    },
    {
      label: 'Reject the 5.25% cap — no office asset should trade at a sub-6% cap in a 7% market.',
      isBest: false,
      explanation:
        'Makes sense only if the asset trades as traditional office — which it doesn\'t for 20 years. The cap compression (7% market → 5.25%) is entirely explained by the credit and structure premium. Sale-leasebacks routinely price 150–250 bps inside traditional property sales for the same asset class because they eliminate operating risk. Rejecting the pricing without understanding the comp set would cause you to mis-price or miss a legitimate transaction.',
    },
  ],
  takeaway:
    'Comp set selection depends on what you\'re buying. A sale-leaseback with a long-term investment-grade NNN lease is a credit investment for the duration of the lease, not a real estate operating investment. The right comps are other sale-leasebacks of similar credit and term. Traditional property comps become relevant when you model the residual/terminal value at lease expiration.',
  tips: [
    'Sale-leaseback comps: sort by tenant credit rating, lease term, and NNN structure — not by market or asset class.',
    'Cap compression vs. traditional same-class assets: typically 100–250 bps for investment-grade, long-term absolute NNN.',
    'Key hidden risk: residual value after lease expiration — model that as traditional real estate and underwrite it separately.',
  ],
};
