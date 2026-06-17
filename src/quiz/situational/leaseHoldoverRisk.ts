import type { SituationalCase } from '../../types/situational';

export const leaseHoldoverRisk: SituationalCase = {
  id: 'lease-holdover-risk',
  title: 'Tenant going holdover — how do you underwrite the risk?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'A 25,000 SF office tenant (20% of your building) has a lease expiring in 6 months. They\'ve told you they\'re "likely renewing" but haven\'t executed a new lease. Your lease has a holdover provision at 150% of the last month\'s base rent. You\'re also in contract to sell the building with a closing scheduled 4 months after lease expiration. The buyer\'s LOI assumes the tenant is in-place and renewing.',
  data: [
    { label: 'Tenant space', value: '25,000 SF (20% of building)' },
    { label: 'Current rent', value: '$28/SF/yr = $700K/yr = $58.3K/month' },
    { label: 'Holdover rent', value: '150% of last month = $87.5K/month' },
    { label: 'Lease expiration', value: '6 months out' },
    { label: 'Closing date', value: '10 months out (4 mos post-expiration)' },
    { label: 'Tenant status', value: '"Likely renewing" — no executed lease' },
  ],
  question:
    'How should you manage this holdover risk in the context of your pending sale?',
  options: [
    {
      label:
        "Push hard to execute the renewal before closing — even a short extension eliminates the holdover uncertainty. If renewal isn't executed by closing, require the buyer to take a price reduction or an earnout that pays you the holdover premium if the tenant stays vs. reflects the vacancy risk if they leave.",
      isBest: true,
      explanation:
        "An unexecuted 'likely renewal' is not a lease — it's a verbal option with no commitment. In a sale context, the buyer is pricing off executed leases; a holdover tenant introduces three risks simultaneously: (1) the tenant may leave, triggering vacancy — 20% of a building going dark is a significant valuation hit; (2) the tenant may stay in holdover at 150% but then leave after 1–2 months, creating instability; (3) the renewal economics might be at reduced rent, below what the buyer underwrote. The correct move is to reduce the closing dependency on an unexecuted 'intent' by executing the lease or structuring the sale to share this specific risk via price adjustment or earnout.",
    },
    {
      label:
        "Disclose the holdover situation to the buyer but reassure them — 150% holdover rent actually benefits you during any gap, so the economics are fine.",
      isBest: false,
      explanation:
        "Holdover rent is premium-priced specifically because holdover is a bad situation for everyone — it signals the tenancy is uncertain, not locked in. A buyer underwriting a building with a 20% holdover tenant will price in the re-leasing risk (months of vacancy, TI, leasing commission) on top of the premium rent — and will likely widen the cap rate or reduce the price significantly. '150% holdover = good news' is a seller's rationalization that doesn't survive underwriting scrutiny.",
    },
    {
      label:
        "Let the lease expire into holdover and renegotiate from a position of strength — the tenant is paying 150%, which gives you leverage.",
      isBest: false,
      explanation:
        "The idea that holdover gives you leverage misreads the dynamic. A tenant in holdover can leave on 30 days notice (depending on the lease), which they'll exercise the moment they find alternative space or get frustrated with negotiations. You have no enforcement mechanism to make them sign at elevated rent. The leverage flows to whoever is less dependent on the relationship — often the tenant, who can relocate, while you have a 25K SF vacancy to fill.",
    },
    {
      label:
        "Don't worry about it — most tenants who say they're 'likely renewing' do renew. Price the building assuming in-place tenancy.",
      isBest: false,
      explanation:
        "'Likely renewing' is not a contractual commitment. Pricing a sale on unexecuted verbal intent exposes you to a significant price renegotiation (or deal break) if the tenant leaves during the 4-month gap. The closing attorney will flag this; a sophisticated buyer will discount the price or require a rent holdback/escrow. You cannot price a 20% tenant as 'assumed in-place' without documentation — and if you try, you'll likely face it as a condition to close.",
    },
  ],
  takeaway:
    "Holdover provisions are a protection mechanism, not a substitute for executed leases. In an acquisition or disposition context, any lease expiring within 12 months of closing without an executed renewal is a pricing risk — whether it triggers vacancy, reduced renewal rent, or holdover uncertainty. Sellers should prioritize executing renewals before marketing, or structure the price/earnout to reflect the contingency. Buyers should require lease estoppels and verify that 'likely renewing' tenants have signed.",
  tips: [
    'Holdover rent (150%) sounds like upside but signals tenancy uncertainty — underwriters discount, not uplift, for holdover tenants.',
    'Rule of thumb: any lease expiring within 12 months of closing should be flagged as rollover risk in the underwriting.',
    "A signed LOI to renew with a term sheet is worth something; 'likely renewing' verbally is worth nothing in a pricing model.",
  ],
};
