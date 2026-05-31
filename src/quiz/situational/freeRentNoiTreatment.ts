import type { SituationalCase } from '../../types/situational';

export const freeRentNoiTreatment: SituationalCase = {
  id: 'free-rent-noi-treatment',
  title: 'Six months of free rent — how does that hit Year 1 NOI?',
  category: 'lease-econ',
  difficulty: 'beginner',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You are modeling a new 10,000 SF office lease at $45/SF face rent for 5 years. The landlord granted 6 months of free rent at lease commencement in exchange for the tenant signing at full asking rent. The tenant occupies on January 1. You need to correctly represent Year 1 cash NOI in the underwriting, and separately understand how it differs from GAAP income.',
  data: [
    { label: 'Lease SF', value: '10,000 SF' },
    { label: 'Face rent', value: '$45/SF/yr gross' },
    { label: 'Lease term', value: '5 years' },
    { label: 'Free rent period', value: '6 months at commencement' },
    { label: 'Annual face rent revenue', value: '$450,000' },
  ],
  question: 'How do you model the free rent period in Year 1 underwriting?',
  options: [
    {
      label:
        'Year 1 cash NOI reflects $225,000 from this tenant (6 months at full rent, 6 months free). GAAP straight-lines rent over the full 5-year term, producing a higher annual GAAP income figure than actual cash in Year 1.',
      isBest: true,
      explanation:
        'Cash collected: tenant pays nothing for 6 months, then $450k/yr for 6 months → $225k cash in Year 1. Under GAAP, rent must be straight-lined over the full lease term: total cash rent = $450k × 4.5 paid years = $2.025M ÷ 5 years = $405k/yr GAAP. So GAAP income exceeds cash income in Years 1–2 and falls below cash income in Years 3–5 as the deferred rent is amortized. Lenders underwrite to cash NOI for DSCR purposes — presenting GAAP NOI as the basis for debt sizing overstates income in the free-rent period.',
    },
    {
      label:
        'Free rent is a timing difference that nets out over the lease — it has no impact on underwriting.',
      isBest: false,
      explanation:
        'True at the lease-term level, but Year 1 cash NOI is materially lower than the stabilized run rate. If the property is closing in a DSCR-tested environment or must hit occupancy covenants, Year 1 cash income is the relevant number. "Nets out over time" is not a useful answer in a deal underwriting context.',
    },
    {
      label:
        'Model zero revenue from this tenant in Year 1 — free rent means no income.',
      isBest: false,
      explanation:
        'Free rent covers only the first 6 months; the tenant pays full rent for the remaining 6 months of the year. Year 1 cash revenue from this tenant is $225k. Modeling $0 overstates the vacancy impact by $225k and misrepresents the lease economics.',
    },
    {
      label:
        'Treat the free rent as a TI equivalent — a one-time capital expense at lease commencement.',
      isBest: false,
      explanation:
        'TIs are capital costs for build-out; free rent is a revenue concession. Conflating them misrepresents both the operating income statement and the capital budget. In the model they appear separately: TIs in the capex schedule, free rent as a revenue reduction in the operating cash flow.',
    },
  ],
  takeaway:
    'Free rent creates a cash/GAAP divergence: cash income is zero during the free period; GAAP straight-lines rent over the full lease term. Always underwrite to cash for IRR and DSCR. When comparing leases, use net effective rent (face rent minus amortized concessions) to normalize across different concession structures.',
  tips: [
    'Cash NOI excludes the free rent period; GAAP straight-lines total rent over the full lease term.',
    'Net effective rent = (total cash rent − total concessions) ÷ lease term.',
    'Lenders underwrite DSCR to cash NOI — confirm which basis is being presented in the loan package.',
  ],
};
