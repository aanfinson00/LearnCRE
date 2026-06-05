import type { SituationalCase } from '../../types/situational';

export const leaseFreeRentNPV: SituationalCase = {
  id: 'lease-free-rent-npv',
  title: 'Free rent vs. base rent reduction — which costs the landlord less at refi?',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "You're closing a 10-year, 15,000 SF office lease at $50/SF. The tenant asks for 6 months free rent at the start. Your counter-proposal offers no free rent but reduces base rent to $47/SF for years 1-3, stepping back to $50/SF for years 4-10. Both structures produce the same net effective rent. However, your loan matures in year 3 and the lender will underwrite to in-place contractual rent at the refi date.",
  data: [
    { label: 'Space', value: '15,000 SF' },
    { label: 'Face rent', value: '$50/SF' },
    { label: 'Lease term', value: '10 years' },
    { label: "Tenant's ask", value: '6 months free rent at lease start' },
    { label: 'Counter-proposal', value: '$47/SF years 1-3, $50/SF years 4-10' },
    { label: 'Lender metric', value: 'In-place contractual rent (refi in year 3)' },
  ],
  question: 'Which concession structure is better for the landlord, and why?',
  options: [
    {
      label:
        "The tenant's ask (6 months free + $50/SF face) is better for the landlord's year-3 refi. The free-rent period burns off in months 1-6; the lender underwrites the refi to $50/SF in-place contractual rent. The $47/SF counter leaves the contractual rent below market at the refi date, reducing the lender's underwritten NOI and compressing loan proceeds.",
      isBest: true,
      explanation:
        "Lenders underwrite debt sizing to in-place contractual rent (or scheduled contractual rent per the lease), not NER. At year 3: (a) 6-month free structure → free rent has burned off; in-place rent = $50/SF → lender underwrites to $50/SF. (b) $47/SF counter → tenant is paying $47/SF at the refi date → lender underwrites to $47/SF. The $3/SF difference on 15,000 SF = $45,000/yr lower underwritten NOI. At a 5.0% cap rate, that's $900,000 of lost loan proceeds. Free rent is a timing concession (landlord forgoes revenue in months 1-6 but preserves the contractual rent for debt sizing); a below-market in-place rent is a permanent constraint until the lease steps up in year 4 — which is after the refi.",
    },
    {
      label:
        "The $47/SF counter is better — avoid the cash flow loss from 6 months of zero rent at the start.",
      isBest: false,
      explanation:
        "NER is equal between both structures, so neither 'gives away more real cash.' The difference is timing: 6 months free = forgone revenue in months 1-6; $47 base = reduced revenue over 36 months. For the landlord with a year-3 refi, the relevant question is 'which structure maximizes loan proceeds?' — not 'which generates more early cash flow?' Free rent is a front-loaded timing concession; a reduced contractual rent permanently constrains debt sizing until the step-up.",
    },
    {
      label:
        "Both structures affect the lender the same way — lenders normalize for free rent and below-market rent equally in their underwriting.",
      isBest: false,
      explanation:
        "Lenders treat free rent and below-market contractual rent very differently. Free-rent burn-off is a known, documented event: the lender underwrites to the post-free-rent scheduled rate because the lease itself states the rent will be $50/SF after month 6. A $47/SF contractual rent in a step-up lease is taken at face value for the in-place period — the lender won't underwrite to year-4's $50/SF because that rent isn't contractual yet. Free rent burns off; in-place below-market rent doesn't, until the step-up occurs.",
    },
    {
      label:
        "Tenant credit quality is the determining factor — for strong credit, take more free rent; for weak credit, take the rent reduction.",
      isBest: false,
      explanation:
        "Credit quality affects how much concession generosity is warranted, not which structure to use. Both options have the same NER regardless of credit quality. The structure choice is driven by the landlord's capital stack (refi timing) and debt-sizing implications — two variables entirely independent of tenant credit. Strong and weak tenants alike create the same lender problem with a $47/SF in-place rent at year 3.",
    },
  ],
  takeaway:
    "Free rent and below-market rent may have similar NPVs, but they have materially different impacts on in-place contractual rent at the time of refinancing. When a refi is on the horizon, structure concessions as front-loaded free rent rather than base rent reductions — free rent burns off before the refi and preserves the contractual rent that the lender underwrites for debt sizing.",
  tips: [
    'Free rent burns off before the refi; below-market in-place rent constrains debt sizing until the lease steps up.',
    'NER parity ≠ lender impact parity. Always evaluate lease concession structure against refi timing.',
    "Key lender metric: in-place contractual rent (or 'scheduled rent') as of the refi date — not NER.",
  ],
};
