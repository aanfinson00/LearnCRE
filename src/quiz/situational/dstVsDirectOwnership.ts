import type { SituationalCase } from '../../types/situational';

export const dstVsDirectOwnership: SituationalCase = {
  id: 'dst-vs-direct-ownership',
  title: 'DST vs. direct co-investment: what are you actually giving up?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  scenario:
    'A high-net-worth client completing a $8M 1031 exchange has two options: (A) a direct 20% co-investment in a $40M Class B multifamily deal syndicated by a sponsor they know well, or (B) an $8M DST interest in an institutional MF portfolio managed by a REIT-level operator at a 5.2% going-in cap. The client is 68 years old, retired, wants predictable monthly income, and has no interest in capital calls or re-leasing decisions.',
  data: [
    { label: 'Exchange proceeds', value: '$8M' },
    { label: 'Option A', value: '20% co-invest, $40M direct MF deal, boutique sponsor' },
    { label: 'Option B', value: 'DST interest, institutional MF portfolio, 5.2% cap' },
    { label: 'Client profile', value: '68 years old, retired, income-focused' },
    { label: 'Capital call risk', value: 'Possible under Option A; zero under DST by structure' },
  ],
  question: 'What is the most important structural tradeoff between the DST and the direct co-investment?',
  options: [
    {
      label:
        'The DST eliminates control and future flexibility — no refinancing, no asset decisions, no partial transfers — in exchange for institutional quality, passive cash flow, and zero capital calls. For a 68-year-old income investor with estate-planning intent, that loss of control is a feature, not a bug.',
      isBest: true,
      explanation:
        'DSTs are structured so the trustee controls all major decisions; beneficiaries have zero management rights. IRS rules prohibit DST investors from exercising control after contribution — no future capital calls, no future debt modifications, no partial interest transfers. For a retired individual with no tolerance for capital calls and an estate-step-up planning horizon (DST interest gets step-up in basis at death, potentially eliminating the deferred gain entirely), this "no control" constraint maps perfectly to the client\'s stated preferences. The direct co-invest gives control and potential for higher returns but brings capital-call risk (if the sponsor needs a rescue injection) and operational complexity the client doesn\'t want.',
    },
    {
      label:
        'The DST will produce better returns because institutional operators outperform boutique sponsors on MF.',
      isBest: false,
      explanation:
        'Not reliably true — and raw returns are not the primary frame here. DSTs typically layer in fees (sponsorship, asset management, origination) that compress net-to-investor returns versus a direct deal. Institutional quality improves operational predictability but does not guarantee return superiority. The decision axis is control, liquidity, and income stability — not which structure optimizes IRR.',
    },
    {
      label:
        'Take the direct deal — the client retains legal ownership and can 1031 exchange again at exit, which the DST forecloses.',
      isBest: false,
      explanation:
        'Incomplete. A DST interest can be 1031-exchanged again when the sponsor sells the underlying portfolio — IRS Rev Rul 2004-86 is clear that DST beneficial interests qualify as like-kind real property. The "no future exchange" concern doesn\'t hold. For a 68-year-old with estate-step-up intent, the question of a future exchange may be moot — heirs can receive a stepped-up basis at death regardless of structure.',
    },
    {
      label:
        'Both are pass-through vehicles and functionally identical for tax purposes — choose the one with better yield.',
      isBest: false,
      explanation:
        'Structurally wrong. DSTs and direct LP co-investments differ significantly in control rights, capital-call exposure, IRS-mandated operational restrictions, liquidity, and fee drag. The tax deferral benefit (1031) is common to both, but calling them equivalent ignores the entire analysis the client needs.',
    },
  ],
  takeaway:
    'DSTs trade control for simplicity — they are not better or worse than direct ownership, they are different in ways that matter by investor profile. For a retired, income-focused investor with no capital-call tolerance and an estate-planning horizon, the DST\'s structural constraints are a fit, not a limitation. For an active investor who wants asset-level influence and flexibility to 1031 again in 5 years, the direct route wins. Match structure to LP profile first, returns second.',
  tips: [
    'IRS DST restrictions: no capital calls, no new financing after closing, no material improvements beyond lease-up. Control is gone structurally.',
    'DST step-up: if the investor holds to death, heirs receive a step-up in basis to FMV — the deferred 1031 gain may disappear entirely.',
    'Ask first: does the LP want to be in real estate, or does the LP want real-estate-like income without the headaches? That answer determines the vehicle.',
  ],
};
