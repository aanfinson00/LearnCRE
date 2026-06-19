import type { SituationalCase } from '../../types/situational';

export const tiAmortizationRentBump: SituationalCase = {
  id: 'ti-amortization-rent-bump',
  title: 'Tenant wants to self-fund TIs — how does the amortized rent bump compare?',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  scenario:
    "You're negotiating a 7-year, 12,000 SF office lease. The tenant is asking for $60/SF in TI allowance. You've proposed two deal structures. Structure A: Landlord funds the full $60/SF TI at lease commencement, base rent is $36/SF/yr NNN. Structure B: Tenant self-funds all TIs; landlord amortizes $60/SF as additional rent over the 7-year term at a 9% interest rate, adding to a lower base rent of $33/SF/yr NNN. Your cost of capital is 7%. The tenant's credit is strong (investment-grade).",
  data: [
    { label: 'Space', value: '12,000 SF' },
    { label: 'Lease term', value: '7 years' },
    { label: 'Structure A: base rent', value: '$36/SF/yr NNN' },
    { label: 'Structure A: TI allowance', value: '$60/SF (landlord funded)' },
    { label: 'Structure B: base rent', value: '$33/SF/yr NNN' },
    { label: 'Structure B: TI self-funded', value: 'Tenant funds; landlord amortizes $60/SF at 9% into rent' },
    { label: 'Landlord cost of capital', value: '7%' },
    { label: 'Amortization rate to tenant', value: '9%' },
  ],
  question:
    'Which structure is better for the landlord from an NPV perspective, and what is the economic significance of the 9% amortization rate vs. the 7% landlord cost of capital?',
  options: [
    {
      label:
        "Structure B is better for the landlord: the landlord earns a 9% return on the $60/SF TI amortized into rent, while their cost of capital is 7%. The 200 bps spread on $720,000 of TI capital ($60 × 12,000 SF) generates meaningful NPV over 7 years. The $3/SF/yr base rent reduction in Structure B is more than offset by the amortized TI recovery with the positive carry spread.",
      isBest: true,
      explanation:
        "Correct. The amortized TI payment in Structure B is calculated as: $60/SF × 12,000 SF = $720,000 funded, amortized at 9% over 84 months. Monthly payment = $720,000 × [0.09/12 / (1 − (1+0.09/12)^−84)] ≈ $11,500/month = $138,000/year ≈ $11.50/SF/year. Total rent in Structure B: $33 + $11.50 = $44.50/SF vs Structure A's $36/SF. Even after discounting both at 7%, Structure B produces a higher PV of net rent income. The 200 bps positive carry (9% earned vs. 7% cost) is the key: landlord charges the tenant above their own cost for the TI capital. This is essentially a landlord financing the TI at a spread.",
    },
    {
      label:
        "Structure A is better — the landlord funds TIs at commencement and locks in $36/SF immediately. Structure B's lower $33/SF base rent makes the landlord worse off if the tenant defaults mid-lease.",
      isBest: false,
      explanation:
        "This mixes credit risk with economic analysis. From a pure NPV standpoint, the 9% amortization rate exceeding the 7% cost of capital means Structure B creates more landlord value on the TI capital. The credit risk point is valid — if the tenant defaults, landlord loses the unamortized balance — but the question states the tenant is investment-grade (strong credit). For an investment-grade tenant, the default risk on a 7-year lease is minimal and doesn't overcome the 200 bps positive carry.",
    },
    {
      label:
        "Both structures are economically equivalent — the higher amortized rent in Structure B exactly offsets the lower base rent.",
      isBest: false,
      explanation:
        "Not equivalent. In Structure A, the landlord funds $60/SF upfront at a 7% cost. In Structure B, the landlord amortizes the same $60/SF but charges 9% — earning 200 bps of positive spread. If the rates were equal (landlord amortizes at 7% = their cost), the structures would be closer to equivalent (still not identical due to timing). With a 9% charge vs 7% cost, Structure B earns landlord more. Run the discounted cash flows: Structure B produces a higher PV of landlord net income.",
    },
    {
      label:
        "The amortization rate doesn't matter — what matters is the total cash received from the tenant over the lease term.",
      isBest: false,
      explanation:
        "Total undiscounted cash matters, but NPV matters more — earlier cash is more valuable. Structure A: $36/SF × 12,000 × 7 years = $3.02M total cash, minus $720,000 TI upfront = $2.30M net undiscounted. Structure B: $44.50/SF effective × 12,000 × 7 years = $3.74M total, minus nothing upfront = $3.74M net undiscounted. But Structure B also defers the TI spend, which is cash saved at the start. The amortization rate absolutely matters for the NPV and for the interest-spread analysis.",
    },
  ],
  takeaway:
    'TI amortization structures create a landlord financing vehicle: the landlord provides capital (TIs) and charges a rate above their own cost of capital, earning a positive spread. Structure B is better for the landlord when the amortization rate exceeds the landlord cost of capital — here 200 bps of spread on $720,000 over 7 years. For strong-credit tenants, amortized TI structures are increasingly common in office leasing as landlords seek to reduce upfront cash outlays and earn a spread. Always compare: (1) upfront TI cost, (2) amortization rate earned, (3) landlord cost of capital, and (4) credit quality of the tenant.',
  tips: [
    'Amortized TI payment formula: P × [r/n / (1 − (1+r/n)^−nt)] where P = TI amount, r = annual rate, n = 12 (monthly), t = term in years.',
    'Positive carry (amortization rate > cost of capital) makes TI amortization accretive to landlord NPV — at scale, this is a meaningful competitive advantage.',
    'Tenant\'s perspective: they prefer amortized TIs when their own cost of capital > 9% (i.e., they\'d pay more to borrow elsewhere). For investment-grade tenants, corporate debt is cheaper — they may prefer landlord TIs over self-funding.',
    'If tenant defaults, landlord loses the unamortized TI balance. Include a TI repayment clause for early termination — standard in office leases.',
  ],
};
