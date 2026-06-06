import type { SituationalCase } from '../../types/situational';

export const saleLeasbackCompAdjustment: SituationalCase = {
  id: 'sale-leaseback-comp-adjustment',
  title: 'Should you use this sale-leaseback comp?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    "You're pricing a 300,000 SF industrial asset leased to a regional 3PL operator at market-rate rent with 5 years of remaining term. The broker's comp set includes a recent sale-leaseback of a comparable 250,000 SF industrial building at a 4.75% cap — 75 bps tighter than the two multi-tenant arms-length comps in the set (both at 5.5%). The SLB tenant was an investment-grade corporate occupant with a 20-year NNN lease. The broker argues the SLB supports tighter pricing on your subject.",
  data: [
    { label: 'Subject asset', value: '300K SF, regional 3PL, 5-yr term, market rent' },
    { label: 'SLB comp cap rate', value: '4.75%' },
    { label: 'Multi-tenant arms-length comps', value: '5.5% (2 comps, same submarket)' },
    { label: 'SLB tenant', value: 'IG corporate occupant, 20-yr NNN' },
    { label: 'Premium of SLB to other comps', value: '75 bps tighter' },
  ],
  question: 'How should you treat the SLB comp in your pricing analysis?',
  options: [
    {
      label: "Discard or heavily discount the SLB comp — it's pricing embedded IG credit and a 20-year lease, not a conventional industrial building. Your subject has a regional 3PL with 5 years of term. The two arms-length multi-tenant comps at 5.5% are the relevant benchmark.",
      isBest: true,
      explanation:
        "Sale-leasebacks price two things simultaneously: the real estate AND the credit quality of the corporate tenant. An investment-grade corporate on a 20-year NNN SLB is effectively a bond-like investment — buyers price it on the tenant's credit spread, not just industrial real estate fundamentals. The 4.75% cap reflects: (1) zero re-leasing risk for 20 years, (2) investment-grade credit covenant (minimal default risk), (3) an owner-occupant who is highly motivated to maintain their own building. Your subject has 5 years of remaining term on a regional 3PL (likely BB-rated or unrated), which means re-leasing risk is a genuine underwriting risk within the hold period. The 75 bps spread between the SLB and the arms-length comps is precisely the credit-and-term premium — and your asset doesn't have it. Use the 5.5% arms-length comps.",
    },
    {
      label: "Use the SLB comp but apply a 25 bps adjustment for shorter term — pricing at ~5.0% is a reasonable midpoint.",
      isBest: false,
      explanation:
        "25 bps is an unsupported guess. The SLB premium has two independent components: (1) term premium — 20 years vs. 5 years of duration — and (2) credit premium — IG corporate vs. regional 3PL. Decomposing and quantifying each would require additional comps for each component. Without that data, splitting the difference produces false precision. Use the arms-length comps where you don't need to adjust at all.",
    },
    {
      label: "Average all three comps — the SLB's tight cap is offset by the multi-tenant comps, producing a fair market midpoint.",
      isBest: false,
      explanation:
        "Averaging apples and oranges doesn't produce a defensible midpoint — it produces noise. The SLB prices a fundamentally different investment (credit + real estate duration); averaging it with conventional arms-length comps produces a blended cap (~5.25%) that doesn't reflect either asset type accurately. No appraiser or IC presentation can defend an average that includes structurally incomparable transactions.",
    },
    {
      label: "Trust the broker — they would have screened out incomparable comps before presenting the set.",
      isBest: false,
      explanation:
        "The broker's incentive is to support the highest defensible price. Including a tight SLB cap in a conventional leased-asset comp set is exactly how that happens — the tighter comp pulls the implied price upward. Vetting comp comparability yourself is a core diligence step, not a redundancy check on the broker's work.",
    },
  ],
  takeaway:
    "Sale-leaseback cap rates price corporate credit, not just real estate. An IG SLB cap is typically 50–150 bps tighter than equivalent conventionally-leased product because buyers are effectively purchasing a bond with industrial collateral. Never include an SLB in a conventional leased-asset comp set without documenting a specific, quantified adjustment for credit quality and lease duration — or discard it and use the arms-length comps.",
  tips: [
    'SLB premium = tenant credit spread + term premium + owner-occupant skin-in-the-game. All three compress the cap.',
    'If you must use an SLB comp: add 50–100+ bps for unrated/sub-IG tenants and 25–50 bps per 5 years of shorter term.',
    "IG SLBs with 15+ yr terms trade like long corporate bonds — the cap-to-BBB-spread relationship is the sanity check.",
  ],
};
