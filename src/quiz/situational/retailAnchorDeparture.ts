import type { SituationalCase } from '../../types/situational';

export const retailAnchorDeparture: SituationalCase = {
  id: 'retail-anchor-departure',
  title: 'Anchor vacates: co-tenancy trigger and income at risk',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'retail',
  scenario:
    "You asset-manage a 250,000 SF grocery-anchored neighborhood center. The 45,000 SF anchor — a regional grocer paying $8/SF NNN ($360K/yr) — vacates at lease expiration, citing operational consolidation. Six inline tenants (24,000 SF combined) each have co-tenancy clauses: if the grocery anchor is dark for more than 90 consecutive days, they may convert their rent to the greater of (a) 3% of gross sales or (b) 50% of their in-place base rent. Average in-place base rent for these six tenants: $25.83/SF. Reported average gross sales from percentage-rent filings: $330/SF. No replacement anchor is yet identified.",
  data: [
    { label: 'Center size', value: '250,000 SF' },
    { label: 'Anchor (vacating)', value: '45,000 SF at $8/SF NNN = $360K/yr' },
    { label: 'Co-tenancy-affected inline tenants', value: '6 tenants, 24,000 SF combined' },
    { label: 'Inline base rent (at-risk)', value: '$25.83/SF avg = ~$620K/yr' },
    { label: 'Co-tenancy trigger', value: 'Anchor dark > 90 consecutive days' },
    { label: 'Fallback rent', value: 'Greater of 3% of sales or 50% of base rent' },
    { label: 'Average gross sales (reported)', value: '~$330/SF' },
    { label: '3% of sales per SF', value: '$330 × 3% = $9.90/SF' },
    { label: '50% of base rent per SF', value: '$25.83 × 50% = $12.92/SF' },
  ],
  question:
    'What is the annual income at risk if co-tenancy triggers, and what is your first operational priority in the next 60 days?',
  options: [
    {
      label:
        "Annual income at risk: up to $788K ($360K anchor loss + up to $428K inline rent reduction). The co-tenancy fallback is the greater of 3% of sales ($9.90/SF) or 50% of base ($12.92/SF) — so the fallback is $12.92/SF. Inline income drops from $620K to ~$310K ($12.92 × 24,000 SF), a $310K reduction. Combined with the $360K anchor loss, total income at risk is ~$670K. First priority: execute an LOI with a replacement anchor or junior anchor within 60 days — most co-tenancy clauses contain a cure provision that resets the trigger if a qualified replacement occupies at least 50% of the anchor space before day 90.",
      isBest: true,
      explanation:
        "Right analysis. The co-tenancy fallback defaults to the GREATER of 3% of sales vs. 50% of base — here $12.92/SF > $9.90/SF, so the 50% floor controls. Total annual income at risk: $360K (anchor) + $310K (inline rent reduction) = $670K. Note that 'at risk' is the maximum — you retain the 50% base floor. The 90-day cure window is the critical race: co-tenancy clauses typically provide a landlord cure right if a replacement anchor (or a combination of tenants occupying anchor space) opens before the trigger fires. Executing an LOI and beginning buildout within 60 days is typically sufficient to demonstrate active cure effort and prevent trigger. Lenders will need to be notified immediately as the income decline affects DSCR.",
    },
    {
      label:
        "Income at risk: only $360K — the inline tenants' co-tenancy clauses are standard boilerplate that are unenforceable in most jurisdictions unless specifically tested in court.",
      isBest: false,
      explanation:
        "Incorrect and dangerous. Co-tenancy clauses are enforceable in the large majority of U.S. jurisdictions when the lease language is unambiguous. Courts regularly uphold them as material lease terms. Dismissing them as boilerplate without legal review is how landlords get blindsided by cascading rent reductions. Always have legal counsel review all co-tenancy provisions in the rent roll during due diligence and immediately upon any anchor-departure notice.",
    },
    {
      label:
        "Income at risk: $620K — if co-tenancy triggers, inline tenants pay nothing (full rent abatement) for 90 days then terminate their leases.",
      isBest: false,
      explanation:
        "Overstates the risk. Co-tenancy clauses typically reduce rent to a percentage-rent or base-floor structure — not full abatement — unless the clause specifically grants a termination right after a cure period. A termination right is a distinct and more severe provision; the scenario describes a rent-reduction fallback, not a termination right. Always read the specific clause language: rent reduction, termination right, and early termination option are three different mechanics with very different financial consequences.",
    },
    {
      label:
        "Income at risk: $360K. Co-tenancy clauses only apply if total center occupancy falls below 80% — since the anchor vacancy is 18% of the center (45,000/250,000), the trigger likely doesn't fire.",
      isBest: false,
      explanation:
        "Wrong trigger logic. Some co-tenancy clauses are keyed to overall center occupancy, but many — including the one described here — are anchor-specific: the trigger is whether a named anchor (or category of anchor) is dark. Read the clause. Anchor-specific co-tenancy is extremely common in grocery-anchored centers precisely because the grocer's presence is the primary draw for the inline tenants; a 'portfolio-wide occupancy' trigger would provide much weaker protection to the inline tenants.",
    },
  ],
  takeaway:
    "Anchor co-tenancy clauses in grocery-anchored retail are a material income risk — not boilerplate. Know the trigger condition, the fallback rent formula, and the cure provision for every co-tenancy clause in the rent roll before acquiring a retail property. The 90-day cure window is your operational runway: execute an LOI with a replacement anchor immediately. Quantify the full income-at-risk (anchor rent + inline rent reduction) and notify lenders proactively — DSCR is likely impacted.",
  tips: [
    'Three types of co-tenancy clauses: (1) named anchor, (2) anchor category (any grocery ≥X,000 SF), (3) portfolio occupancy floor. Know which type is in each lease.',
    'Co-tenancy cure provisions typically require: (a) landlord notifies tenant of replacement within X days, and (b) replacement anchor opens within Y days. Read both conditions.',
    'When modeling retail acquisitions, stress-test the NOI for co-tenancy trigger scenarios — even if the anchor is healthy today, underwrite the what-if.',
  ],
};
