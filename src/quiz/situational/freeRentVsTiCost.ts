import type { SituationalCase } from '../../types/situational';

export const freeRentVsTiCost: SituationalCase = {
  id: 'free-rent-vs-ti-cost',
  title: 'Free rent or TI allowance — which costs the landlord more?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re negotiating a 7-year lease at $30/SF face rent on a 5,000 SF office suite. The tenant requests one of two concession packages: (A) 6 months of free rent at lease commencement, or (B) a $25/SF TI allowance. Both options carry the same $30/SF face rent. You use a 7% discount rate to evaluate each.',
  data: [
    { label: 'Face rent', value: '$30/SF (same under both options)' },
    { label: 'Lease term', value: '7 years' },
    { label: 'Suite size', value: '5,000 SF' },
    { label: 'Option A', value: '6 months free rent' },
    { label: 'Option B', value: '$25/SF TI allowance' },
    { label: 'Discount rate', value: '7%' },
  ],
  question: 'Which concession package has a higher present-value cost to the landlord?',
  options: [
    {
      label: 'Option B ($25/SF TI) costs more in NPV terms. The TI is a day-1 cash outlay of $125,000 (5,000 SF × $25). The 6 months of free rent costs roughly $72,500 in PV terms (6 months of $150K annual rent, discounted). The TI is approximately 1.7× the NPV cost of the free rent.',
      isBest: true,
      explanation:
        'NPV of Option A (6 months free rent): annual face rent = $30 × 5,000 = $150,000. 6 months gross face value = $75,000. Discounted at 7%, rent foregone in months 1–6 has a PV of approximately $72,500. NPV of Option B (TI): $25 × 5,000 = $125,000 paid at lease commencement — a day-1 cash outflow, so PV = $125,000. Option B costs $125K vs Option A\'s ~$72.5K — nearly 1.7× more expensive on a PV basis. Many landlords default to free rent because it feels like deferred income rather than cash out, but when the TI is large relative to monthly rent, it is the costlier concession by a significant margin.',
    },
    {
      label: 'Option A (6 months free rent) costs more because it directly reduces rental income during the occupancy period.',
      isBest: false,
      explanation:
        'Confuses gross face value of forgone rent with NPV cost. 6 months at $30/SF on 5,000 SF = $75,000 gross face value. The TI = $25 × 5,000 = $125,000. Even before discounting, the TI face value is 67% higher. Free rent "feels" more expensive because you\'re forgoing cash you expected — but the dollar comparison favors Option A.',
    },
    {
      label: 'They\'re equivalent — both reduce the economic lease value by the same amount.',
      isBest: false,
      explanation:
        'They would be equivalent only if the concession face values matched. $75,000 of forgone rent ≠ $125,000 of TI dollars. To make them equivalent you would need roughly 10 months of free rent (10 × $12,500/month ≈ $125,000). Equivalence is a math exercise, not an assumption.',
    },
    {
      label: 'It depends on accounting treatment — TIs are capitalized, so they hit the income statement differently than free rent.',
      isBest: false,
      explanation:
        'Accounting treatment is irrelevant to economic cost. TI is a cash outflow regardless of how it\'s amortized on the books. The economic decision compares cash flows on a PV basis; the accounting entry follows from the economics, not the other way around.',
    },
  ],
  takeaway:
    'Always compare concession packages on a PV-equivalent basis. Free rent and TI allowances feel interchangeable but have different face values and timing. The higher the TI ask relative to monthly rent, the more likely the TI is the more expensive concession. Run the math before agreeing — the result often surprises.',
  tips: [
    'Quick check: TI cost ($/SF) vs. monthly rent ($/SF) × free rent months. If TI > that product, TI costs more.',
    'Free rent defers income; TI depletes capital — your cost of capital affects which is costlier on a PV basis.',
    'Always reduce both to NER before agreeing to either form of concession.',
  ],
};
