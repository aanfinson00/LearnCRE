import type { SituationalCase } from '../../types/situational';

export const bankAccountStructure: SituationalCase = {
  id: 'bank-account-structure',
  title: 'What are all these different bank accounts for?',
  category: 'deal-process',
  difficulty: 'beginner',
  roles: ['assetManagement', 'portfolioMgmt'],
  scenario:
    'You\'ve just stepped into asset management on a stabilized MF property. The financials show four different bank accounts: an operating account, a security deposit account, a replacement reserve, and a tax & insurance escrow. The lender requires monthly reporting from each.',
  data: [
    { label: 'Operating account', value: 'Day-to-day in/out' },
    { label: 'Security deposit account', value: 'Tenant deposits' },
    { label: 'Replacement reserve', value: 'Lender-required capex reserve' },
    { label: 'Tax & insurance escrow', value: 'Lender-controlled' },
  ],
  question: 'How does money flow between these four accounts on a normal month?',
  options: [
    {
      label:
        'Rent revenue lands in operating; OpEx and debt service paid from operating; lender sweeps a fixed monthly amount from operating into the T&I escrow (to fund the next tax/insurance bill); a separate monthly amount sweeps into the replacement reserve. Security deposits stay in their own account (statutorily required separation in most states) — never commingled with operating.',
      isBest: true,
      explanation:
        'Operating is the hub: rent comes in, OpEx + debt service go out. Two automatic monthly sweeps fund the lender-controlled escrows: (1) T&I escrow accumulates the property tax + insurance premiums so the lender knows those obligations get paid (typically at $X/mo such that there\'s enough by the bill due date); (2) replacement reserve accumulates capex contribution at $Y/unit/yr / 12 per month. Security deposits are statutorily separate in most states (commingling is illegal) and tracked tenant-by-tenant. The T&I and reserve accounts may be controlled by the lender (they hold the keys) or borrower-controlled with monthly statements provided to the lender.',
    },
    {
      label: 'All four accounts are functionally the same — money moves freely between them based on whatever\'s needed that month.',
      isBest: false,
      explanation:
        'Each account has a specific purpose enforced by either statute (security deposits) or the loan documents (reserves, escrows). Treating them as fungible is both a covenant breach and a legal risk. The whole point of segregation is that each pool of money is *purpose-restricted*.',
    },
    {
      label: 'Security deposits go into operating; T&I + replacement are the only two separate accounts.',
      isBest: false,
      explanation:
        'Most US states *require* security deposits to be held in a separate account, often interest-bearing, often with annual interest payments to tenants. Commingling security deposits with operating is illegal in CA, NY, MA, NJ, and many other states.',
    },
    {
      label: 'Money flows from reserves into operating monthly to smooth NOI; reserves are just a pre-paid expense pool.',
      isBest: false,
      explanation:
        'Reserves don\'t flow back into operating monthly; they\'re drawn down only when the qualifying expense occurs (replace a roof = draw from replacement reserve; pay tax bill = draw from T&I escrow). They\'re the *funding source* for those specific costs, not an income smoother.',
    },
  ],
  takeaway:
    'A typical CRE asset has 3-5 bank accounts, each with a specific purpose: operating (day-to-day), security deposits (statutorily separate), T&I escrow (lender-controlled funding for next tax/insurance bill), replacement reserve (lender-controlled funding for capex). Some deals add capex draw account (during reno), construction draw account (during build), debt service reserve (lender holds N months of DS in a sub-trust). Each account\'s flow is rule-governed; commingling violates either statute or covenants.',
  tips: [
    'Operating: rent in, OpEx + DS out. Hub of activity.',
    'Reserves: in via monthly sweep; out only on qualifying expense + lender consent.',
    'Security deposits: statutorily separate in most states. Track tenant-by-tenant.',
  ],
};
