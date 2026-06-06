import type { SituationalCase } from '../../types/situational';

export const modifiedGrossLeaseExpenseStop: SituationalCase = {
  id: 'modified-gross-lease-expense-stop',
  title: 'Does this expense stop actually protect the landlord?',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "You've acquired an office building in year 1. The existing 10-year lease is structured as a modified gross with an expense stop at the base-year OpEx of $8.50/SF — the actual operating expense in the first year of the lease. The tenant pays any OpEx above $8.50/SF. Historical OpEx growth has been approximately 4%/yr. You're evaluating how this structure protects your NOI through a 10-year hold.",
  data: [
    { label: 'Lease structure', value: 'Modified gross with base-year expense stop' },
    { label: 'Expense stop', value: '$8.50/SF (year-1 OpEx)' },
    { label: 'Historical OpEx growth', value: '~4%/yr' },
    { label: 'Lease term', value: '10 years' },
    { label: 'Base rent', value: '$30/SF (fixed escalation schedule)' },
    { label: 'Lease year 5 OpEx (4%/yr)', value: '≈ $10.34/SF' },
    { label: 'Lease year 10 OpEx (4%/yr)', value: '≈ $12.60/SF' },
  ],
  question: 'How well does the expense stop protect the landlord over the 10-year term?',
  options: [
    {
      label: "Well — and increasingly so over time. All OpEx growth above $8.50/SF is passed through to the tenant. By year 10, the tenant absorbs roughly $4.10/SF, keeping the landlord's effective OpEx burden fixed at the base-year amount. The structure works as designed.",
      isBest: true,
      explanation:
        "An expense stop at base-year OpEx functions as a fully-indexed pass-through on all cost increases above the initial level. Year-by-year tenant reimbursements: Y1 = $0 (OpEx = $8.50 = stop); Y5 = $10.34 − $8.50 = $1.84/SF; Y10 = $12.60 − $8.50 = $4.10/SF. The landlord's effective OpEx burden stays at $8.50/SF throughout — a meaningful and durable protection. This is why base-year expense stops are landlord-favorable vs. a full gross lease (where the landlord absorbs all growth). Key risks to watch: (1) if OpEx spiked in year 0 before the stop was measured, the stop starts at a high-water mark that may never be exceeded; (2) some leases exclude specific OpEx items from the stop calculation — read the definition carefully; (3) if OpEx falls (e.g., a tax appeal succeeds), some leases don't pass the reduction back to the tenant, so the landlord benefits from downward moves too.",
    },
    {
      label: "Only for the first few years — by year 7–10, OpEx has compounded so far above the stop that the tenant stops paying and the landlord absorbs the excess.",
      isBest: false,
      explanation:
        "This fundamentally misunderstands expense stop mechanics. The stop is a floor, not a cap. The tenant pays everything ABOVE $8.50/SF in EVERY year — there's no point at which 'the tenant stops paying.' If anything, the protection grows in dollar terms as OpEx compounds further above the stop. The confusion may come from 'expense caps,' a different structure where the tenant's annual reimbursement growth is capped at a percentage — which does erode landlord protection over time. An expense stop and an expense cap are opposite protections.",
    },
    {
      label: "The expense stop is irrelevant — on an office lease you should have insisted on NNN to eliminate all OpEx risk.",
      isBest: false,
      explanation:
        "NNN is cleaner but not always achievable. In most office markets, gross or modified gross leasing is the convention, and tenants resist full NNN structures. A well-structured base-year expense stop provides substantial protection (as the correct analysis shows). 'I should have gotten NNN' is an academic observation; the question is whether the structure you have works — and it does, for the specific risk it's designed to address.",
    },
    {
      label: "The expense stop protects against cost spikes but not routine annual growth, which is the biggest long-term risk.",
      isBest: false,
      explanation:
        "Inverts the mechanics. The expense stop passes through all cost growth — routine and spike alike — to the tenant once costs exceed the base. The landlord is exposed only to the base-year cost ($8.50/SF), not to any growth above it. 'Routine cost growth' is precisely what the expense stop protects against: any routine 4%/yr increase compounds entirely to the tenant's account.",
    },
  ],
  takeaway:
    "A base-year expense stop converts a modified gross lease into a structure where the landlord's OpEx exposure is permanently fixed at the initial OpEx level. All subsequent cost growth — routine inflation or one-time spikes — passes through to the tenant. The protection is durable and grows in dollar-per-SF terms as OpEx compounds. Key risks: base year measured at a cyclical high; specific OpEx items excluded from the stop definition; and lease language on whether downward OpEx adjustments benefit the landlord.",
  tips: [
    'Tenant reimbursement = max(0, current OpEx − stop amount) × SF, calculated annually.',
    "Modified gross + base-year stop ≈ landlord's OpEx exposure permanently capped at Y1 OpEx/SF.",
    "Read the stop definition for exclusions — capital items, management fees, and insurance are sometimes carved out.",
  ],
};
