import type { SituationalCase } from '../../types/situational';

export const freeRentVsTiTradeoff: SituationalCase = {
  id: 'free-rent-vs-ti-tradeoff',
  title: 'Free rent or TI — which concession is cheaper to the landlord?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "A 5,000 SF tenant proposes to lease Class-B office space for 5 years at $36/SF/yr (NNN). They request one of two concession packages: Option A — 6 months of free rent at the start of the lease. Option B — $30/SF TI allowance ($150,000). Assume a 7% discount rate and that the tenant will build out the space regardless (the TI either goes through you or the tenant pays out of pocket).",
  data: [
    { label: 'Space', value: '5,000 SF' },
    { label: 'Lease term', value: '5 years' },
    { label: 'Face rent', value: '$36/SF/yr ($180,000/yr)' },
    { label: 'Option A', value: '6 months free rent' },
    { label: 'Option B', value: '$30/SF TI ($150,000)' },
    { label: 'Discount rate', value: '7%' },
  ],
  question:
    "Which concession is more expensive to the landlord in present-value terms — and which do you prefer to offer if you're the landlord?",
  options: [
    {
      label:
        'Option A (free rent) is slightly more expensive in nominal terms ($90,000 in foregone rent vs. $150,000 TI), but in PV terms the TI is paid immediately at signing while the free rent is deferred. The TI at $150,000 today costs more in PV than $90,000 of deferred rent. Prefer Option A as the landlord: it costs less in PV and keeps you out-of-pocket less cash at signing.',
      isBest: true,
      explanation:
        'PV of free rent: 6 months = $90,000 nominal. Deferred over 6 months at 7%: PV ≈ $90,000 ÷ 1.035 ≈ $86,954. PV of TI: $150,000 paid at signing. $150,000 > $86,954 — TI is more expensive in PV. As landlord you also prefer Option A because: (1) it costs less, (2) no cash outlay at signing, (3) TI creates balance sheet/cash pressure at the start of a new lease when you haven\'t been paid rent yet, and (4) free rent shows a higher face rent on the rent roll (useful for comp purposes and future financing). From a NER perspective: NER under Option A = ($900k − $90k)/5 yr = $162k/yr = $32.4/SF. NER under Option B = ($900k − $150k)/5 yr = $150k/yr = $30/SF. Option A produces a higher NER.',
    },
    {
      label:
        'Option B (TI) is always preferable to offer — tenants prefer cash and it builds goodwill for the relationship.',
      isBest: false,
      explanation:
        "Tenant preference is irrelevant to the landlord's cost analysis. The question is which concession is cheaper for the landlord. Option B costs $150k at signing vs. ~$87k PV for Option A. Offering Option B to build goodwill costs the landlord an additional ~$63k in PV — that's a premium for 'goodwill' that isn't justified by the economics.",
    },
    {
      label:
        'They are economically equivalent; use whichever the tenant prefers to close the deal faster.',
      isBest: false,
      explanation:
        '$90,000 nominally ≠ $150,000 nominally. Even accounting for the time value of money (which favors Option A since the rent waiver is deferred), the two concessions are not equivalent. Option A costs the landlord roughly $87k in PV vs. $150k in PV for Option B — a $63k difference.',
    },
    {
      label:
        'Option A is worse for the landlord because it lowers the effective rent roll and makes financing harder.',
      isBest: false,
      explanation:
        'Free rent lowers NER, not face rent. The rent roll (face rent) stays at $36/SF under Option A. Lenders typically underwrite to in-place face rent with standard vacancy assumptions; free rent at the start of a lease term doesn\'t impair the rent roll the way a TI burn-through would impair cash flow at signing. The financing concern is actually stronger for a TI: lenders see a $150k immediate outlay that must be covered by reserves or operations.',
    },
  ],
  takeaway:
    'Free rent vs. TI is a present-value comparison. Free rent is deferred cost; TI is immediate cost. At typical discount rates, the crossover occurs when free rent nominally exceeds TI — and even then, the timing advantage of deferred payment often makes free rent cheaper in PV. Landlords prefer free rent because it (a) costs less in PV, (b) preserves face rent on the roll, and (c) avoids upfront cash outlay. Calculate NER to compare lease packages on an apples-to-apples basis.',
  tips: [
    'NER = (total rent − concessions) ÷ lease term. Normalize all packages to NER/SF/yr.',
    'PV of free rent ≈ nominal free rent ÷ (1 + r)^(0.5 × free-rent months/12).',
    'Landlords prefer high face rent + free rent over low face rent + cash TI — same NER, better comp.',
  ],
};
