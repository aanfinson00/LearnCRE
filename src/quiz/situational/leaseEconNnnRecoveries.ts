import type { SituationalCase } from '../../types/situational';

export const leaseEconNnnRecoveries: SituationalCase = {
  id: 'lease-econ-nnn-recoveries',
  title: "NNN at $7.50/SF — what is the landlord actually netting?",
  category: 'lease-econ',
  difficulty: 'beginner',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're reviewing a 150,000 SF single-tenant industrial warehouse on a 7-year NNN lease. The lease shows $7.50/SF/yr in base rent. The tenant is responsible for all property taxes ($0.60/SF/yr), CAM ($0.25/SF/yr), utilities, and interior maintenance. The landlord is responsible for: roof and structural reserves ($0.15/SF/yr), property insurance ($0.10/SF/yr), and property management fees (3% of base rent).",
  data: [
    { label: 'Building size', value: '150,000 SF' },
    { label: 'Base rent', value: '$7.50/SF/yr' },
    { label: 'Tenant pays', value: 'Property taxes $0.60/SF, CAM $0.25/SF, utilities, interior maintenance' },
    { label: 'Landlord pays', value: 'Roof/structure reserve $0.15/SF, insurance $0.10/SF, mgmt fee 3% of base rent' },
    { label: 'Lease term', value: '7 years, NNN' },
  ],
  question:
    "What is the landlord's annual NOI and effective net income per SF?",
  options: [
    {
      label:
        "Landlord NOI = $1,181,250 (~$7.88/SF). Total annual collections = $1,252,500 (base $1,125,000 + tax reimbursements $90,000 + CAM reimbursements $37,500). Landlord expenses = $71,250 (roof/structure $22,500 + insurance $15,000 + mgmt fee $33,750). NOI = $1,252,500 − $71,250 = $1,181,250. The tenant-paid recoveries flow through as gross-up to both revenue and expense — netting to zero — but the reimbursements are real income the landlord collects and remits.",
      isBest: true,
      explanation:
        "Step through each line: Base rent = 150,000 × $7.50 = $1,125,000. Tax reimbursement = 150,000 × $0.60 = $90,000. CAM reimbursement = 150,000 × $0.25 = $37,500. Total gross collections = $1,252,500. Landlord costs: Roof reserve = 150,000 × $0.15 = $22,500; Insurance = 150,000 × $0.10 = $15,000; Mgmt fee = $1,125,000 × 3% = $33,750. Total expenses = $71,250. NOI = $1,252,500 − $71,250 = $1,181,250 = $7.875/SF. NNN leases have ~92–95% NOI margins on total collections because the tenant bears almost all operating costs.",
    },
    {
      label:
        "Landlord NOI = $1,125,000 — in a NNN lease, only the base rent counts as income because the tenant pays all operating expenses.",
      isBest: false,
      explanation:
        "In most NNN leases, the landlord collects the tax and CAM reimbursements from the tenant and remits them to the taxing authority and vendors. Those flows pass through the landlord's books as income and expense, and the management fee is assessed on collections. More importantly, this answer ignores the landlord's own expenses (roof reserve, insurance, management fee), which reduce the net even in a NNN lease.",
    },
    {
      label:
        "Landlord NOI = $1,252,500 — the landlord collects all payments and NNN means the tenant has no expense obligations to the landlord.",
      isBest: false,
      explanation:
        "NNN ('triple net') means the tenant pays taxes, insurance, and maintenance — but the landlord still has some residual obligations: structural reserves, property insurance on the structure, and management. This answer ignores the landlord's $71,250 of expenses. NOI must deduct all landlord-borne costs before arriving at net operating income.",
    },
    {
      label:
        "You need the tenant's credit rating to calculate NOI, because default risk adjusts the effective yield on a NNN lease.",
      isBest: false,
      explanation:
        "Credit quality affects cap rate (how the market prices the lease risk) and therefore asset value — but not NOI. NOI is a contract cash-flow calculation based on in-place rents and landlord costs. Credit risk is priced into the cap rate at disposition, not by adjusting NOI upward or downward. Conflating the two is a category error.",
    },
  ],
  takeaway:
    "NNN lease economics: the landlord's NOI is not simply the base rent. Total collections include base rent plus tenant reimbursements (taxes, CAM) that pass through. The landlord still incurs structural-level costs (roof reserves, building insurance, management fee) that must be deducted to arrive at true NOI. The resulting margin is typically 92–95% of total collections — far higher than multifamily or office — which is why NNN product trades at tighter caps.",
  tips: [
    "NNN pass-through items (taxes, CAM) flow as both income and expense on the P&L — they net to zero but matter for gross revenue reporting.",
    "The landlord's irreducible costs in NNN: roof and structural reserves, building insurance, and property management. Know them before you underwrite.",
    "NNN cap rates are tighter than gross-lease assets partly because of this high NOI margin and low management burden.",
  ],
};
