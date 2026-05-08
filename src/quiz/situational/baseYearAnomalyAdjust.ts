import type { SituationalCase } from '../../types/situational';

export const baseYearAnomalyAdjust: SituationalCase = {
  id: 'base-year-anomaly-adjust',
  title: "Is this expense escalation dispute legitimate?",
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "An office tenant signed a gross lease in March 2020. The base year expense stop was set at actual 2020 operating expenses: $8.50/SF. Five years later, operating expenses have risen to $14.00/SF. The landlord is billing the tenant for $5.50/SF of expense overages. The tenant is pushing back, arguing that 2020 was an 'anomaly year' — the building ran at 40% occupancy during COVID, suppressing cleaning, utilities, and management fees. The tenant claims a normalized base year should have been ~$11.00/SF.",
  data: [
    { label: 'Lease signed', value: 'March 2020' },
    { label: 'Base year expenses (actual 2020)', value: '$8.50/SF' },
    { label: 'Current year expenses', value: '$14.00/SF' },
    { label: 'Landlord billing tenant', value: '$5.50/SF overage' },
    { label: "Tenant's claimed normalized base", value: '~$11.00/SF' },
    { label: 'Building occupancy (2020)', value: '~40%' },
  ],
  question:
    "How should the landlord assess the tenant's push-back on the base year?",
  options: [
    {
      label:
        "The tenant has a legitimate economic argument — a 2020 base year is structurally low because occupancy-driven expenses (cleaning, utilities, janitorial) were suppressed. A well-drafted lease would have included a 'gross-up' clause normalizing base year expenses to full occupancy. If the lease lacks a gross-up, the tenant is legally wrong but economically right, and the relationship should drive how hard the landlord pushes.",
      isBest: true,
      explanation:
        "Base year expense stops are supposed to represent a 'normal' year. In 2020, actual building expenses were depressed by the pandemic — roughly analogous to underwriting base rent from a free-rent year. A gross-up provision (standard in well-drafted leases) normalizes base year expenses to what they would have been at full occupancy, typically 90–95%. If the lease has a gross-up, the tenant's argument has legal merit. Without it, the landlord is technically right but the tenant's economic grievance is valid. AM professionals should know whether the lease includes this clause before hardening their position.",
    },
    {
      label:
        "The landlord has no obligation to adjust the base year — the lease specifies actual 2020 expenses, and that's the contract.",
      isBest: false,
      explanation:
        "Legally correct if the lease lacks a gross-up clause, but commercially incomplete. Enforcing a technically-correct-but-economically-unfair position risks tenant relations, lease renewal odds, and litigation exposure. The best AM answer acknowledges both the legal position and the commercial reality, then recommends a relationship-based decision.",
    },
    {
      label:
        "Negotiate a one-time concession — offer to reduce the billing by 50% to settle and preserve the tenant relationship.",
      isBest: false,
      explanation:
        "Jumping to 50% without first reading the lease for a gross-up clause is premature. If the lease has a gross-up, the tenant is right and the adjustment should be calculated properly. If it doesn't, a 50% concession is arbitrary. Start with the lease language, then size any concession on principled grounds.",
    },
    {
      label:
        "The tenant signed the lease with eyes open in 2020 — any risk of a low base year was theirs to manage.",
      isBest: false,
      explanation:
        "This framing ignores that gross-up clauses exist precisely to protect both parties from anomaly base years — it's not purely a tenant protection. The clause protects landlords from tenants who use a 'low expense year' as a permanent shield against normal escalation. Treating it as a purely tenant-side risk misreads the purpose of the provision.",
    },
  ],
  takeaway:
    "Gross-up clauses normalize base year operating expenses to full occupancy, preventing artificially low base years (like 2020) from permanently suppressing tenant expense contributions. Every AM professional acquiring or managing an office asset should check whether leases signed in 2020–2021 contain gross-up provisions — and if not, be prepared for this dispute.",
  tips: [
    "Gross-up clause: normalizes base year expenses to what they'd be at 90–95% occupancy.",
    "2020 base years without gross-up created a structural landlord expense problem that is now surfacing.",
    "Before any expense dispute, read the lease: find the expense stop, the gross-up language, and the audit rights.",
  ],
};
