import type { SituationalCase } from '../../types/situational';

export const industrialSaleLeasebackUw: SituationalCase = {
  id: 'industrial-sale-leaseback-uw',
  title: 'Industrial: underwriting a sale-leaseback — how much does investment-grade credit compress the cap rate?',
  category: 'investment-thesis',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're buying a 500,000 SF industrial sale-leaseback. The seller/tenant is a national logistics company rated BBB/Baa2 (investment-grade, publicly traded). Terms: 15-year NNN lease, 2% annual rent bumps, no termination options. In-place rent is $3.85/SF ($1.925M NOI). Multi-tenant industrial in this submarket trades at 5.5% going-in caps. The broker is asking 4.8%. Building replacement cost is $90/SF; asking price is $105/SF.",
  data: [
    { label: 'Building', value: '500,000 SF Class A logistics' },
    { label: 'Tenant credit', value: 'BBB/Baa2 investment-grade' },
    { label: 'Lease term', value: '15-year NNN, no termination' },
    { label: 'Annual rent bumps', value: '2% fixed' },
    { label: 'In-place NOI', value: '$1.925M ($3.85/SF)' },
    { label: 'Asking cap rate', value: '4.8%' },
    { label: 'Multi-tenant comp cap rate', value: '5.5%' },
    { label: 'Replacement cost vs. ask', value: '$90/SF vs. $105/SF (+17%)' },
  ],
  question: "Is the 70bps premium over multi-tenant comps justified, and what are the real underwriting risks on a 15-year sale-leaseback?",
  options: [
    {
      label:
        "The 70bps premium is at the upper limit of defensibility. Decompose it: credit quality (BBB vs. anonymous multi-tenant) = 20-40bps premium; lease duration (15-year NNN vs. 5-7yr multi-tenant avg) = 20-30bps premium; single-tenant concentration (one name, one building) = 10-20bps discount. Net: 30-50bps is the institutional middle ground. The deeper risk is residual value at year 16 — you're paying 17% above replacement cost for a building that must re-lease at market rents in 15 years. Stress-test: if the tenant doesn't renew, what does re-leasing to a generic tenant cost, at what rent, and does the exit value justify today's basis?",
      isBest: true,
      explanation:
        "Right decomposition. Investment-grade sale-leaseback pricing has three components moving in different directions: credit premium (+), lease duration premium (+), single-tenant concentration discount (-). The net of 30-50bps premium over multi-tenant is defensible; 70bps is aggressive without additional justification. The dominant risk is not income risk (the lease handles that for 15 years) but residual value risk: paying 17% above replacement cost means the investment thesis requires either tenant renewal or strong market rent growth to justify the basis at year 16. That's a long-duration bet that deserves explicit stress testing.",
    },
    {
      label:
        "Investment-grade credit makes this equivalent to a corporate bond with a building attached — there's no re-leasing risk for 15 years, so pay up.",
      isBest: false,
      explanation:
        "Understates the real risks. The bond analogy breaks at three points: (1) credit migration — BBB can become BB, widening the implied cap 50-100bps and hitting mark-to-market value; (2) dark risk — the tenant can pay rent but cease operations, impairing the building's next-use profile; (3) residual value — you own the building at year 16 and need market rents and cap rates to support the basis. 'No re-leasing risk for 15 years' is not the same as 'no risk.'",
    },
    {
      label:
        "Walk — industrial assets should never be acquired above replacement cost regardless of credit or lease term.",
      isBest: false,
      explanation:
        "Too rigid. Sale-leasebacks routinely price above replacement cost when the combination of credit quality and lease duration provides bond-like income certainty the market values at a premium. The question is whether the premium is sized correctly — 70bps over multi-tenant comps is at the high end but not automatically unjustifiable. The discipline is decomposing and stress-testing the premium, not blanket rejection.",
    },
    {
      label:
        "The 2% annual bumps make the higher price irrelevant — NOI will grow to justify the basis over the hold.",
      isBest: false,
      explanation:
        "Misses the compounding context. 2% annual bumps on $1.925M NOI grow to $2.60M in year 15 — meaningful, but only if market rents grow at least as fast. If market rents grow at 3%+ annually while the lease is locked at 2%, the in-place rent falls progressively below market, creating a mark-to-market problem at renewal. The rent bump rate vs. expected rent growth rate is the key sensitivity, not the existence of bumps alone.",
    },
  ],
  takeaway:
    "Sale-leaseback cap rate compression vs. multi-tenant comps reflects three forces: credit quality premium, lease duration premium, and single-tenant concentration discount. The net premium for investment-grade 15-year NNN is typically 30-50bps — 70bps requires explicit justification. The dominant risk is not income certainty (the lease handles that) but residual value: paying above replacement cost means the exit thesis depends on tenant renewal or rent growth, not just lease income. Model year-16 residual value at market rents before bidding.",
  tips: [
    "Credit migration watch: BBB is two notches above high-yield. A two-notch downgrade typically widens the implied cap 50-100bps — monitor quarterly and understand what a downgrade does to mark-to-market value at each re-test.",
    "Dark risk is real: NNN leases require rent payment, not physical operation. A tenant who pays rent but stops using the building impairs the next tenant's view of the space and may create functional obsolescence.",
    "Residual value stress test: underwrite year-16 stabilized value at market rent (not in-place rent) and a market exit cap rate. If that value is materially below your adjusted basis, you're depending on lease income alone — understand that math before signing.",
  ],
};
