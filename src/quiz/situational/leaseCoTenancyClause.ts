import type { SituationalCase } from '../../types/situational';

export const leaseCoTenancyClause: SituationalCase = {
  id: 'lease-co-tenancy-clause',
  title: 'Co-tenancy clause triggers — how much is the anchor worth?',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You're acquiring a 180,000 SF community retail center anchored by a 60,000 SF grocery tenant. Five in-line tenants (totaling 30,000 SF, paying average $28/SF) have co-tenancy clauses in their leases: if the grocery anchor goes dark, those tenants have the right to reduce their rent to $14/SF until a replacement anchor of equal or greater size opens. The grocery anchor has 8 years remaining on its lease but is rumored to be closing 3 stores regionally in a cost-cutting move.",
  data: [
    { label: 'Anchor space', value: '60,000 SF grocery' },
    { label: 'Anchor remaining term', value: '8 years' },
    { label: 'Co-tenancy tenants', value: '5 in-line tenants, 30,000 SF total' },
    { label: 'In-line rent (in-place)', value: '$28/SF avg = $840K/yr' },
    { label: 'Co-tenancy reduced rent', value: '$14/SF = $420K/yr' },
    { label: 'Anchor closure risk', value: 'Active regional cost-cutting' },
    { label: 'Replacement anchor timeline', value: '12–18 months typical' },
  ],
  question:
    'How do you underwrite the co-tenancy risk, and what does it do to your pricing?',
  options: [
    {
      label:
        "Model a co-tenancy scenario with 25–50% probability: if the anchor goes dark, the co-tenancy NOI drops ~$420K/yr (from $840K to $420K on in-line tenants) for 12–18 months until a replacement anchor opens, PLUS anchor base rent is likely lost. Stress-test your cap rate at a blended probability-weighted NOI and widen your exit cap by 50–75 bps to reflect the structural retail risk.",
      isBest: true,
      explanation:
        "Co-tenancy clauses are a hidden liability that most sellers don't disclose prominently — they show up in the fine print of individual leases. If the anchor closes, you face a two-layer NOI hit: (1) anchor rent goes to zero for the dark period, (2) in-line tenants immediately exercise the co-tenancy reduction, cutting their rent from $840K to $420K — a $420K/yr swing. If the anchor closure takes 18 months to resolve, that's $630K of foregone in-line NOI on top of the anchor shortfall. Model this as a probability-weighted scenario: if 30% probability of closure, apply 30% weight to the stressed NOI for a blended underwriting NOI, then widen the exit cap for the structural grocery dependency risk.",
    },
    {
      label:
        "Ignore co-tenancy clauses in the underwriting — the grocery anchor has 8 years of lease term left, so the risk is remote.",
      isBest: false,
      explanation:
        "Lease term remaining ≠ anchor certainty. The anchor is actively cutting stores regionally — that's an event that could trigger a lease buyout or dark-store scenario even with 8 years remaining. Co-tenancy clauses activate on the anchor going 'dark' (not operating), not on lease expiration — so an anchor that keeps its lease but stops operating still triggers co-tenancy. Ignoring this given the active closure risk in the scenario is undisciplined underwriting.",
    },
    {
      label:
        "Price the deal off in-place NOI without co-tenancy adjustment — if the clause triggers, you'll deal with it then.",
      isBest: false,
      explanation:
        "This is price-it-and-figure-it-out-later, which is a disciplined way to get burned. If the clause triggers after you close, you own the NOI impact — there's no legal recourse because the leases are disclosed in due diligence. The time to price the risk is before close, not after. Sophisticated sellers know this; unsophisticated buyers who skip it lose the arbitrage.",
    },
    {
      label:
        "Negotiate a price reduction tied to the anchor lease term — if the anchor has 8 years remaining, the risk decays each year, so price in a per-year discount.",
      isBest: false,
      explanation:
        "Co-tenancy risk doesn't decay linearly with remaining anchor lease term — it's a binary event that can happen any year if the anchor decides to close. The risk is highest NOW given the regional closure news, not in year 7. Tying the discount to remaining term misprices the actual probability distribution of the risk event.",
    },
  ],
  takeaway:
    "Co-tenancy clauses in retail leases are triggered by anchor darkness, not lease expiration — read every in-line lease carefully during due diligence. In grocery-anchored retail, co-tenancy can affect 15–25% of the total rent roll simultaneously, making the anchor's credit and operational health a first-order underwriting question. Model the stressed NOI scenario (anchor goes dark for 12–18 months) as a probability-weighted scenario, widen the exit cap for structural anchor dependency, and either price the risk into your bid or require an anchor credit reserve / price reduction at closing.",
  tips: [
    'Co-tenancy = anchor goes dark (not just expires) → immediate in-line rent step-down, typically 40–60% of face.',
    'Track anchor health: same-store sales trends, lease modification requests, and regional closure announcements.',
    'Time to replace a grocery anchor = 12–24 months minimum — that\'s the NOI exposure window once the clause triggers.',
  ],
};
