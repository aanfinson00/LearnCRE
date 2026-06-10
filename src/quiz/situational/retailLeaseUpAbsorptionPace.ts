import type { SituationalCase } from '../../types/situational';

export const retailLeaseUpAbsorptionPace: SituationalCase = {
  id: 'retail-lease-up-absorption-pace',
  title: 'Neighborhood center lease-up: is the inline timeline realistic?',
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['acquisitions', 'development'],
  assetClass: 'retail',
  scenario:
    "A developer is building a 90,000 SF neighborhood center. The grocery anchor (40,000 SF) is signed and will open at delivery. The remaining 50,000 SF of inline space (junior anchors and shops) needs to be leased. Comparable neighborhood centers in the submarket have averaged 8,000 SF of inline absorption per month when anchored by a grocery store. The developer is projecting full lease-up in 6 months. Construction delivers in 4 months.",
  data: [
    { label: 'Total GLA', value: '90,000 SF' },
    { label: 'Anchor', value: 'Grocery (40,000 SF) — signed' },
    { label: 'Inline to lease', value: '50,000 SF' },
    { label: 'Submarket inline absorption (grocery-anchored)', value: '8,000 SF/month' },
    { label: 'Developer projected lease-up', value: '6 months' },
  ],
  question:
    'Is the 6-month inline lease-up projection realistic — and what is the likely stabilization timeline?',
  options: [
    {
      label:
        '6 months implies absorbing 8,300 SF/month — essentially full submarket capacity for grocery-anchored centers going into a single project. 9–12 months is more realistic; underwrite a 12-month stabilization period with a lease-up reserve.',
      isBest: true,
      explanation:
        "50,000 SF ÷ 6 months = 8,333 SF/month, which matches the submarket average precisely. That assumption presumes this single project captures 100% of the submarket's typical inline demand — essentially crowding out all other leasing activity in the area. In practice: (a) other competing centers are also leasing, so the market demand isn't exclusively yours; (b) the first tenants open faster but the tail of shops takes longer; (c) tenant build-out and permit delays routinely push occupancy 2–4 months past lease execution. A 9–12 month underwrite with a lease-up reserve is the more defensible base case.",
    },
    {
      label:
        'Perfectly reasonable — 8,000 SF/month is the market rate, and the grocery anchor will attract tenants quickly.',
      isBest: false,
      explanation:
        "This ignores that 8,000 SF/month is the MARKET rate across all grocery-anchored product, not the rate at a single new project. Your project is competing for tenants with existing centers. Capturing all 8k SF/month into one lease-up is the best-case scenario, not the base case. Also, the grocery anchor helps with long-term tenant demand but doesn't eliminate shop-space leasing timelines.",
    },
    {
      label:
        '3 months — the grocery anchor creates a ready tenant demand queue; all 50k SF will fill fast.',
      isBest: false,
      explanation:
        "3 months implies 16,667 SF/month — twice the submarket absorption pace. No evidence supports this. Grocery anchors accelerate inline demand but don't double it. Tenant permitting, build-out timelines, and franchise approvals alone can extend execution 2–4 months from LOI to opened store.",
    },
    {
      label:
        '18–24 months — inline retail is structurally declining and no project leases up in under 2 years.',
      isBest: false,
      explanation:
        "Overly pessimistic for a grocery-anchored format with confirmed market absorption of 8k SF/month. Grocery-anchored centers have been a resilient retail format. 18–24 months is a risk scenario (market softening, recession), not a base case. Underwrite 9–12 months, stress to 18, reserve accordingly.",
    },
  ],
  takeaway:
    "Lease-up timeline = inline SF ÷ projected monthly absorption. The trap is assuming your single project captures all of the submarket's typical demand. The market absorption rate is shared across all competing properties. Add 2–4 months for tenant build-out and permitting delays. Always fund a lease-up reserve that covers operating costs and debt service through the stress scenario.",
  tips: [
    'Market absorption rate ÷ number of competing projects = your realistic share.',
    'Grocery-anchored centers attract national shop tenants faster than unanchored; still underwrite 9–12 months.',
    'Lease-up reserves should cover interest carry + OpEx through the P90 stabilization timeline.',
  ],
};
