import type { SituationalCase } from '../../types/situational';

export const leaseExpiryCliff: SituationalCase = {
  id: 'lease-expiry-cliff',
  title: 'Three big leases expire the same year — what\'s the right risk framework?',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement', 'portfolioManager'],
  assetClass: 'office',
  scenario:
    'You are underwriting a 350,000 SF Class-A office tower. The building is 92% leased today at market rents. Three tenants — representing 18%, 15%, and 12% of total GLA — all have leases expiring within an 8-month window in Year 4. The submarket has 2.5M SF of new Class-A supply delivering in Years 3–4. The going-in NOI is $8.5M.',
  data: [
    { label: 'Current occupancy', value: '92% (321k SF occupied)' },
    { label: 'Cliff expiry exposure', value: '45% of GLA in one 8-month window (Year 4)' },
    { label: 'Tenant 1', value: '63k SF (18% of GLA) — law firm, above-market rent' },
    { label: 'Tenant 2', value: '52.5k SF (15% of GLA) — tech firm, in-place = market' },
    { label: 'Tenant 3', value: '42k SF (12% of GLA) — financial services, below-market rent' },
    { label: 'New Class-A supply (Yrs 3–4)', value: '2.5M SF delivering into submarket' },
  ],
  question: 'How do you size and risk-adjust the lease expiry cliff?',
  options: [
    {
      label:
        'Model a base case where 70% of the cliff space renews (Tenants 2 and 3 likely, Tenant 1 at risk due to above-market rent), a downside where only Tenant 3 renews (30% renewal), and price a 12–18 month average downtime plus $80–100/SF TI for all non-renewals. Widen exit cap 50 bps vs going-in to price re-leasing risk at exit.',
      isBest: true,
      explanation:
        'The 45% cliff creates binary occupancy exposure in Year 4 — the single biggest risk in this deal. Tenant 1 (above-market rent) is the highest flight risk when competing with concession-rich new supply. Tenants 2 and 3 are more likely to renew (at- or below-market). But 2.5M SF of new supply directly increases tenant leverage for all three. Downtime of 12–18 months × 157.5k SF of non-renewal = significant NOI gap. The exit cap widener accounts for the fact that at exit, leases will be mid-term rather than long-dated.',
    },
    {
      label:
        'Model 100% renewal at market rent — Class-A tenants rarely move because of disruption cost and build-out depreciation.',
      isBest: false,
      explanation:
        'Disruption cost is a retention factor, but 2.5M SF of new supply means landlords of new Class-A are offering full-floor builds and rent-free periods to overcome disruption. At 45% of GLA, a 100% renewal assumption is not conservative — it\'s optimistic and will not survive IC scrutiny.',
    },
    {
      label:
        'Structure the bid with a Year-4 vacancy reserve equal to 3 months of income on the expiring space — standard deal reserve.',
      isBest: false,
      explanation:
        'A 3-month vacancy reserve on 45% of GLA = 1.125 months of total building income. For a 157,500 SF cliff in a competitive supply environment, actual downtime could be 12–24 months per tenant. A generic reserve materially under-reserves; model the downtime scenario explicitly rather than using a formula.',
    },
    {
      label:
        'Re-trade the sellers on price using the expiry cliff as leverage — any buyer who\'s done this analysis will discount by 20%.',
      isBest: false,
      explanation:
        'Re-trading based on a known risk is fair, but the magnitude depends on the actual downtime model, not a flat percentage. A 20% blanket discount may be too much or too little. Better to model the scenarios, derive a risk-adjusted IRR, and price to your required return — then negotiate from that number.',
    },
  ],
  takeaway:
    'Lease expiry cliffs are among the most dangerous structural risks in commercial real estate. When multiple large leases expire in the same window, the owner loses negotiating leverage simultaneously with all of them — and every tenant knows it. Price the downtime, TI, and leasing commission costs explicitly for each scenario, then decide if the going-in IRR adequately compensates for that risk.',
  tips: [
    'Expiry concentration rule: flag any single year where >30% of GLA rolls as a cliff event.',
    'Above-market leases are highest flight risk when competing supply arrives with aggressive concessions.',
    'New supply + cliff expiry = double leverage for tenants. Model as compounding, not independent risks.',
    'Staggered lease terms are a portfolio-construction principle — avoid buying concentrations you can\'t fix at re-leasing.',
  ],
};
