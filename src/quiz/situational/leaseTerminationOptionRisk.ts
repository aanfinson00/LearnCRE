import type { SituationalCase } from '../../types/situational';

export const leaseTerminationOptionRisk: SituationalCase = {
  id: 'lease-termination-option-risk',
  title: 'Termination option — are you economically whole if they leave?',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A tech company is signing a 10-year office lease for 22,000 SF at $52/SF NNN. They require a termination option exercisable at the end of Year 6, with a fee equal to: 12 months\' rent + unamortized TI/LC (straight-line over 10 years). TI allowance: $85/SF. Leasing commission: $12/SF. You must decide whether to accept this term and how to model the risk.',
  data: [
    { label: 'Lease term', value: '10 years, NNN @ $52/SF' },
    { label: 'Leased area', value: '22,000 SF' },
    { label: 'Annual base rent', value: '$1,144,000' },
    { label: 'TI allowance', value: '$85/SF × 22,000 = $1,870,000' },
    { label: 'Leasing commission', value: '$12/SF × 22,000 = $264,000' },
    { label: 'Termination option', value: 'End of Year 6; fee = 12 months rent + unamortized TI/LC' },
    { label: 'TI/LC amortized (SL over 10 yrs)', value: '$213,400/yr → $2,134,000 total' },
  ],
  question: 'If the tenant exercises at Year 6, are you economically whole after collecting the termination fee?',
  options: [
    {
      label: 'No — the fee recovers TI/LC cost basis but not re-leasing costs. Full vacancy would cost ~$1.1M more than the fee covers, before counting downtime.',
      isBest: true,
      explanation:
        'Termination fee at Year 6: 12 months rent ($1.144M) + unamortized TI/LC (4 years remaining ÷ 10 years × $2.134M = $854K) = ~$2.0M. Re-leasing the vacant space: new TI ($85/SF × 22,000 = $1.87M), new LC ($12/SF × 22,000 = $264K), plus 6–12 months downtime ($572K–$1.144M of lost rent) = ~$2.7–3.3M of total re-leasing cost. After netting the $2.0M fee, the landlord is $700K–$1.3M in the hole before factoring in the risk that market rent may have declined below $52/SF. "Economically whole on TI/LC basis" is not the same as "whole on deal economics."',
    },
    {
      label: 'Yes — the fee covers the unamortized TI/LC investment, so you\'re recovered on the lease cost basis.',
      isBest: false,
      explanation:
        'The fee recovers the unamortized portion of what you spent to get the tenant in — but not what you\'ll spend to get the next tenant in. Re-leasing a 22,000 SF office vacancy involves fresh TI ($85/SF+), a new LC ($12/SF+), and 6–12 months of downtime. These future costs are not covered by the existing fee structure. "Whole on TI/LC basis" is a narrow accounting frame, not an economic analysis.',
    },
    {
      label: 'Reject the term outright — termination options are deal-breakers in office leasing.',
      isBest: false,
      explanation:
        'Too absolutist. Termination options are standard in office leasing, especially for credit tenants committing to 10-year terms. Blanket rejection loses deals. The better approach: accept the option but price it properly — either by sizing the fee to fully cover re-leasing costs, shortening the option window, or adjusting rent upward to compensate for the embedded optionality.',
    },
    {
      label: 'It\'s fine — a tech company on a 10-year lease is unlikely to exercise at Year 6.',
      isBest: false,
      explanation:
        'Post-2020, tech companies\' space utilization has been highly volatile. The tenant requested this option for a reason — they believe they may need it. Assuming low exercise probability without probing WFH policy, headcount trajectory, and lease-vs-own strategy is naïve. "Unlikely to exercise" must be supported by specific intelligence about the tenant, not optimism.',
    },
  ],
  takeaway:
    'Termination fees typically recover TI/LC cost basis — but rarely cover re-leasing costs (new TI, new LC, downtime). The true economic test: does the fee plus any rent collected cover the full round-trip cost of getting the next tenant in? If not, the option transfers NOI risk to the landlord. Model both scenarios (full 10-year term vs. Year-6 exit) and probability-weight the IRR.',
  tips: [
    'Termination fee sufficiency test: fee > unamortized TI/LC + new TI + new LC + 6–9 months\' downtime.',
    'Tech and co-working tenants show the highest historical exercise rates on termination options.',
    'If you accept the option, build a "Year-6 exit" scenario in your proforma and price the rent accordingly.',
  ],
};
