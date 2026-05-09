import type { SituationalCase } from '../../types/situational';

export const leaseFreeRentAnalysis: SituationalCase = {
  id: 'lease-free-rent-analysis',
  title: "Free rent vs. face rent reduction — what's the real cost?",
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "A tenant is comparing two proposals for a 5-year, 5,000 SF office lease. Option A is $35/SF face rent with 4 months of free rent. Option B is $32/SF face rent with no free rent concession. You're evaluating which structure is better from the landlord's perspective — considering total economics, NOI impact, and future comp value.",
  data: [
    { label: 'Space', value: '5,000 SF' },
    { label: 'Option A', value: '$35/SF face rent · 4 months free rent' },
    { label: 'Option B', value: '$32/SF face rent · no free rent' },
    { label: 'Term', value: '5 years (60 months)' },
    { label: 'Discount rate', value: '7%' },
  ],
  question: "Which option is better for the landlord, and why?",
  options: [
    {
      label: "Option A is marginally better economically and clearly better for comp value. NER for A = $35 × (56/60) ≈ $32.67/SF vs. B at $32.00/SF. Option A also preserves a $35 face rent in the rent roll, which sets a higher comp for future leases.",
      isBest: true,
      explanation:
        "Option A NER (simple): $35 × (paid months ÷ total months) = $35 × (56 ÷ 60) = $32.67/SF. Option B NER: $32.00/SF. Option A wins on two dimensions: (1) it produces $0.67/SF more in effective economic rent over the term — on 5,000 SF over 5 years, that's $16,750 in additional total rent; and (2) the $35 face rent becomes the comp for future negotiations with other tenants, while $32 anchors the market lower. Landlords systematically prefer free rent over face rent cuts because the face rent comp value compounds across the entire tenant roster.",
    },
    {
      label: "Option B is better — no free rent means cash from day one, eliminating the carry cost during the vacancy period.",
      isBest: false,
      explanation:
        "Option B does produce immediate cash, but the total economic value (NER) is lower: $32.00/SF vs. $32.67/SF for Option A. The 4 months of forgone cash = $35 × (4/12) × 5,000 = $58,333 — but Option A earns $0.67/SF more over the remaining 56 months = $187,600 incremental. Net advantage to Option A: ~$129,000 before discounting. The carry argument overstates the cost of free rent.",
    },
    {
      label: "Option B is better — a lower face rent reduces the tenant's occupancy cost, lowering credit risk.",
      isBest: false,
      explanation:
        "Tenant credit quality is assessed through occupancy cost ratio (rent ÷ revenues) and financial statement underwriting — not by offering below-market face rent proactively. Reducing face rent to manage credit risk is an unusual approach that benefits the tenant economically at the landlord's expense. If credit is genuinely a concern, address it through lease guarantees or security deposit sizing.",
    },
    {
      label: "They're identical — NER is the same so the landlord should be indifferent.",
      isBest: false,
      explanation:
        "The NERs are NOT identical: Option A ≈ $32.67/SF, Option B = $32.00/SF. Even if they were equal on NER, Option A's $35 face rent has superior comp value for future lease negotiations — making Option A dominant in either scenario. Always compute NER before declaring indifference.",
    },
  ],
  takeaway:
    "Free rent and face rent reductions are economically related but not equivalent. Free rent is a front-loaded concession; face rent reduction is a permanent per-period reduction. Because NER slightly favors higher face rent + free rent in most scenarios, AND because high face rent preserves the comp for future negotiations, landlords should structurally prefer Option A when the economics are comparable. Always convert both proposals to NER before comparing.",
  tips: [
    "NER (simple) = face rent × (paid months ÷ total months) − TIs per SF amortized annually.",
    "High face + free rent is the standard landlord preference in soft markets — preserves the future comp.",
    "Comp tables typically report face rent, so $35 face sets a higher anchor for your next negotiation than $32.",
  ],
};
