import type { SituationalCase } from '../../types/situational';

export const nnnVsGrossLeaseBeginner: SituationalCase = {
  id: 'nnn-vs-gross-lease-beginner',
  title: 'Why does the NNN lease look cheaper than the gross lease?',
  category: 'lease-econ',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You're comparing two retail leases side by side. Tenant A is paying $18/SF on a gross lease — the landlord pays property taxes, insurance, and maintenance. Tenant B is paying $12/SF on a triple-net (NNN) lease — the tenant pays property taxes, insurance, and maintenance directly, with a typical NNN burden of $7/SF/yr for this property type. A colleague says Tenant B 'has the better deal' because their rent is $6/SF lower.",
  data: [
    { label: 'Tenant A (gross)', value: '$18/SF — landlord pays tax, ins, maint' },
    { label: 'Tenant B (NNN)', value: '$12/SF — tenant pays tax, ins, maint' },
    { label: 'Estimated NNN burden', value: '$7/SF/yr' },
    { label: "Colleague's claim", value: "Tenant B pays $6/SF less — 'better deal'" },
  ],
  question: "Who is actually paying more in total occupancy cost, and why does your colleague's comparison miss the point?",
  options: [
    {
      label:
        'Tenant B pays more: $12/SF (rent) + $7/SF (NNN expenses) = $19/SF total occupancy cost vs. Tenant A at $18/SF. Your colleague is comparing face rents without accounting for the pass-through costs that shift to the tenant under NNN. The correct comparison is always total occupancy cost (rent + pass-throughs), not face rent alone.',
      isBest: true,
      explanation:
        "Gross leases bundle operating expenses into the quoted rent — the landlord absorbs taxes, insurance, and maintenance and prices them into the rate. NNN leases strip those costs out of the rent quote, but the tenant pays them directly. $12/SF NNN + $7/SF in pass-throughs = $19/SF all-in, which is $1/SF more than the $18/SF gross lease. The colleague's error is comparing face rent (what the lease says) rather than total occupancy cost (what the tenant actually pays to be in the space). This is one of the most common misunderstandings when comparing different lease structures.",
    },
    {
      label:
        "Tenant A pays more — the gross lease is $18/SF while Tenant B pays only $12/SF in rent. Gross leases are always more expensive for tenants.",
      isBest: false,
      explanation:
        "This is the error your colleague is making. Gross leases include the landlord's recovery of operating expenses in the rent. NNN leases exclude those costs from rent but require tenants to pay them separately. Always add the NNN burden to the stated NNN rent before comparing to a gross lease. The gross lease at $18/SF is less expensive here than the NNN at $12/SF + $7/SF = $19/SF.",
    },
    {
      label:
        "They pay the same — $18/SF vs. $12/SF + $6/SF NNN = $18/SF. The NNN burden must equal the landlord's operating costs, which are just passed through.",
      isBest: false,
      explanation:
        "Close but wrong on the NNN burden amount. The scenario states the NNN burden is $7/SF, not $6/SF. Total for Tenant B = $12 + $7 = $19/SF, which exceeds the $18/SF gross lease. In reality, gross leases may be priced at a slight premium (landlord adds a margin for uncertainty) while NNN pass-throughs reflect actual costs — so gross and NNN don't always net to exactly the same number.",
    },
    {
      label:
        "You can't compare them — gross and NNN leases are structured differently and don't reflect the same obligations.",
      isBest: false,
      explanation:
        "The comparison is absolutely valid and is a core skill in retail and commercial leasing analysis. The tool for comparing different lease structures is total occupancy cost: face rent + all pass-through or direct expenses the tenant pays. Once you reduce both to total occupancy cost per SF, you can compare them directly. Refusing to compare different lease structures is the analysis gap, not an inherent limitation.",
    },
  ],
  takeaway:
    "Gross and NNN rents cannot be compared at face value. Always convert to total occupancy cost: face rent + all pass-through expenses the tenant pays directly. For NNN leases, total occupancy cost = base rent + property taxes + insurance + common area maintenance (CAM) + any other tenant-borne expenses. The landlord's net income (NOI contribution) is also different: on a gross lease, the landlord keeps the margin between rent received and actual expenses; on a NNN lease, expenses pass through dollar-for-dollar.",
  tips: [
    'Total occupancy cost = face rent + NNN expenses (for NNN leases) OR face rent (for full gross leases).',
    'Double net (NN) leases: tenant pays taxes + insurance but not maintenance. Triple net (NNN): tenant pays all three.',
    'NNN burden varies widely: industrial $0.50–1.50/SF, retail $4–10/SF, office (modified gross) $5–15/SF.',
  ],
};
