import type { SituationalCase } from '../../types/situational';

export const leaseFreeRentEconomics: SituationalCase = {
  id: 'lease-free-rent-economics',
  title: 'Free rent or TI — which concession hits harder?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re comparing two lease proposals for 10,000 SF of vacant office space. Both have a 7-year term and $40/SF/yr face rent. Proposal A offers 6 months of free rent with no TI. Proposal B offers no free rent but $30/SF of TI. Your discount rate for concession analysis is 8%. You want to determine which deal has a higher net effective rent (NER) and which is better for your cashflow in year 1.',
  data: [
    { label: 'Space', value: '10,000 SF' },
    { label: 'Face rent', value: '$40/SF/yr (7-year term)' },
    { label: 'Proposal A', value: '6 months free rent, $0 TI' },
    { label: 'Proposal B', value: '0 free rent, $30/SF TI' },
    { label: 'Discount rate', value: '8%' },
  ],
  question:
    'Which proposal has a higher NER, and which is better for your cashflow in the first 12 months?',
  options: [
    {
      label:
        'NER is nearly equal: Proposal A NER ≈ $40 − ($40 × 6/12) ÷ 7 = $36.57/SF; Proposal B NER ≈ $40 − ($30 ÷ 7) = $35.71/SF. A wins slightly on NER. But cashflow in Year 1: Proposal A = $0 (all free rent period, no cash received); Proposal B = $400,000 cash rent received minus $300,000 TI outlay = −$100K net but with positive rent from Month 1. The choice depends on your capital position vs. income needs.',
      isBest: true,
      explanation:
        'The key insight is that TI and free rent have the same aggregate economic cost but different timing profiles. Free rent = revenue foregone upfront. TI = capital outlay at lease commencement. For NER calculation: Proposal A loses 6 months of $40/SF rent = $20/SF of concession, amortized over 7 years = $2.86/SF/yr drag. NER = $40 − $2.86 = $37.14. Proposal B spends $30/SF of TI, amortized over 7 years = $4.29/SF/yr. NER = $40 − $4.29 = $35.71. Proposal A wins on NER by ~$1.43/SF. But Proposal B generates Year 1 cash rent immediately (offset by TI payment). If you have capital but need income (e.g., approaching a DSCR test), B is operationally better despite worse economics.',
    },
    {
      label:
        'Proposal B is clearly better — TI is a capital investment, not a loss, so it doesn\'t reduce NER.',
      isBest: false,
      explanation:
        'TI absolutely reduces NER — it\'s a cost to the landlord that reduces the effective yield of the lease. Whether categorized as capital or operating expense, money spent to attract or retain a tenant reduces the economic return of the lease. NER strips all concessions to a comparable basis: face rent minus total amortized cost of concessions (TI, free rent, leasing commissions).',
    },
    {
      label:
        'They\'re equivalent — free rent and TI have the same NPV if properly discounted.',
      isBest: false,
      explanation:
        'They\'re close but not equivalent due to timing. Free rent occurs at the start (months 1-6 cash flow is $0); TI is a lump-sum outlay at commencement but generates full rent immediately. Discounted properly, 6 months of forgone $40/SF rent (front-loaded) and a $30/SF lump sum TI have slightly different NPV profiles depending on the discount rate. At 8%, they are not exactly equal — Proposal A is slightly better.',
    },
    {
      label:
        'Take whichever the tenant prefers — tenant satisfaction extends lease term probability.',
      isBest: false,
      explanation:
        'Tenant preference is a soft factor in lease negotiations, but it does not override the financial analysis. Landlords should understand the economic comparison before entering negotiation. If the tenant prefers TI (Proposal B) but the economic difference is $1.43/SF/yr over 7 years = $10/SF total NER gap, that\'s a decision the landlord can make knowingly — not by defaulting to tenant preference.',
    },
  ],
  takeaway:
    'Free rent and TI are both concession forms that reduce the effective yield of a lease, but they have different timing and cashflow profiles. NER reduces both to a comparable per-SF-per-year basis. Free rent = foregone revenue (no cash in); TI = cash out. On a 7-year lease, $30/SF TI costs slightly more per year than 6 months of free rent on $40/SF face. Capital-constrained landlords prefer free rent (no outlay); income-constrained landlords prefer TI (immediate rent cash flow despite upfront outlay).',
  tips: [
    'NER = face rent − (TI ÷ term) − (free rent months × monthly rent ÷ term).',
    'Free rent is front-loaded; TI is a lump sum. Both reduce yield but at different cash-flow timings.',
    'For DSCR-sensitive loans, note that free rent periods cause temporary NOI shortfalls — model this.',
    'Leasing commission should be included in the full concession package for true NER.',
  ],
};
