import type { SituationalCase } from '../../types/situational';

export const retailCoTenancyGoDark: SituationalCase = {
  id: 'retail-cotenancy-go-dark',
  title: 'Retail: what does the anchor going dark really cost?',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You're buying a grocery-anchored center. The anchor lease has 3 years remaining, includes a go-dark right, and the anchor has said nothing about renewing. 22,000 SF of in-line shop space pays $28/SF NNN and carries a co-tenancy clause: if the anchor is dark for more than 6 months, those tenants pay 50% of base rent until an approved replacement opens. The broker says to ignore it because the anchor pays rent through expiry.",
  data: [
    { label: 'Co-tenancy shop space', value: '22,000 SF' },
    { label: 'Shop base rent', value: '$28/SF NNN ($616,000/yr)' },
    { label: 'Co-tenancy remedy', value: '50% of base rent after 6 months dark' },
    { label: 'Anchor lease', value: '3 years left, go-dark right' },
    { label: 'Cap rate', value: '6.5%' },
  ],
  question: 'How should you treat the co-tenancy exposure in underwriting?',
  options: [
    {
      label:
        "Model it as a timed downside: anchor leaves at expiry, 6 months at full rent, then 50% rent until a backfill opens. A 12-month backfill costs about $154,000 and an 18-month backfill about $308,000, on top of the anchor's own downtime and TI. Check the cure and termination rights, and price the risk into your bid.",
      isBest: true,
      explanation:
        "The reduction is $616,000 × 50% = $308,000 a year, or $25,667 a month, but it only applies after the 6-month grace period and only until the replacement opens. A 12-month dark period costs 6 months of reduction (about $154,000), and an 18-month dark period costs 12 months (about $308,000). That is a real, bounded cost you can price, and it sits alongside the anchor's own lost rent, TI and leasing commissions.",
    },
    {
      label:
        "Capitalize it as a permanent cut: $308,000 ÷ 6.5% is about $4.7M of value, so reduce the price by that amount today.",
      isBest: false,
      explanation:
        "The remedy ends when an approved replacement opens, so it is a temporary rent reduction, not a permanent loss of NOI. Capitalizing a temporary reduction overstates the hit by a wide margin. It also double-counts if the anchor renews, in which case the clause is never triggered.",
    },
    {
      label:
        "Ignore it, because the anchor pays through expiry and a grocery box is easy to backfill.",
      isBest: false,
      explanation:
        "The clause costs money only after the anchor is dark, which can begin at any time because of the go-dark right, not just at expiry. The anchor can stop operating while still paying rent, which starts the 6-month clock. Easy to backfill is an assumption, not a lease term.",
    },
    {
      label:
        "Ask the seller for a rep that the anchor will renew and rely on it.",
      isBest: false,
      explanation:
        "A seller cannot warrant a third party's future decision, and a rep survives for a limited period at a limited cap. Diligence should confirm the clause mechanics and the anchor's intentions, and the price should reflect the risk. A rep is not a substitute for either.",
    },
  ],
  takeaway:
    "A co-tenancy clause is a bounded contingent liability. Model the trigger date, the grace period and the backfill time, and price that scenario instead of ignoring it or capitalizing it forever.",
  tips: [
    "Read the trigger, the grace period and the end condition before putting a number on it.",
    "A go-dark right can start the clock before the anchor lease expires.",
    "Temporary rent reductions belong in the cash flow, not in a perpetual cap.",
  ],
};
