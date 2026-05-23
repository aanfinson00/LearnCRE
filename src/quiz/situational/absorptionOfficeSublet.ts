import type { SituationalCase } from '../../types/situational';

export const absorptionOfficeSublet: SituationalCase = {
  id: 'absorption-office-sublet',
  title: 'Sublease overhang — does it count against absorption?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'An urban office submarket has 8M SF of total inventory. Direct occupancy is 82%, implying 1.44M SF of direct vacancy. In addition, 600,000 SF of sublease space is currently on the market. Sublet availability has grown for three consecutive quarters as tenants right-size post-pandemic. Historical net absorption was +200,000 SF/year before the sublease wave began. You are evaluating an office acquisition in this submarket.',
  data: [
    { label: 'Total inventory', value: '8M SF' },
    { label: 'Direct occupancy', value: '82%' },
    { label: 'Direct vacancy', value: '1.44M SF' },
    { label: 'Sublease available', value: '600,000 SF' },
    { label: 'Historical net absorption', value: '+200,000 SF/yr' },
  ],
  question: 'How does the sublease overhang affect your absorption underwriting?',
  options: [
    {
      label: 'Sublease supply competes directly with direct vacancy — total available space is 2.04M SF. Sublease tenants fill space that would otherwise go to direct landlords, depressing effective absorption. Extend your stabilization timeline materially and reduce the absorption assumption.',
      isBest: true,
      explanation:
        'Sublease space is often priced below direct space (landlords pass on their remaining obligation) and absorbs tenants who would otherwise take direct vacancies. Net absorption tracks new occupancy gained minus space given back — sublease puts additional SF into the available pool and competes for the same tenant demand. With 2.04M SF effectively available against ~200k/yr of historical demand (now likely lower due to the same softness driving subleasing), stabilization stretches dramatically. Three straight quarters of sublease growth signals a structural trend — hybrid work, headcount reductions — not a seasonal blip. Extend the stabilization assumption by 2–3 years and stress-test at elevated availability.',
    },
    {
      label: 'Sublease space is excluded from net absorption calculations — only direct leases count. Underwrite to direct vacancy only.',
      isBest: false,
      explanation:
        'Incorrect. Net absorption tracks all occupied space changes, direct and sublease. When a tenant takes sublease space, that space becomes occupied in the absorption metric even though the direct landlord sees no new rent. Tracking only direct vacancy misses the competitive supply that limits your ability to lease up. Tenants with sublease options in your submarket will use that leverage to negotiate better terms or choose the sublease over your direct space.',
    },
    {
      label: 'The sublease overhang will clear quickly once companies return to the office — use historical absorption of 200k/yr.',
      isBest: false,
      explanation:
        'Three consecutive quarters of sublease growth is a trend, not a blip. Post-pandemic hybrid work adoption has been sticky in most urban office markets. Assuming immediate mean-reversion to historical absorption is optimistic. The prudent approach is to project a slower absorption environment for the first 2–3 years of the hold and stress-test at continued sublease growth.',
    },
    {
      label: 'Ask the broker for sublease-adjusted vacancy — they track availability and it is not something you need to compute.',
      isBest: false,
      explanation:
        'Some brokers report total availability (direct + sublease), others report only direct vacancy. Relying on a broker to flag the distinction leaves the analysis incomplete and potentially biased — brokers have incentive to frame the market favorably. Calculating effective availability yourself (direct + sublease) and comparing it to historical absorption is basic acquisition due diligence.',
    },
  ],
  takeaway:
    'Sublease supply competes directly with direct vacancy for the same tenant demand. When evaluating absorption in an office market, size the total available pool (direct + sublease), not just direct vacancy. A sublease overhang that has grown for three or more consecutive quarters is structural — reversion assumptions should be conservative and stabilization timelines extended accordingly.',
  tips: [
    'Total availability = direct vacancy + sublease available; use this figure, not just direct vacancy, when sizing the absorption gap.',
    'Sublease tenants often price below direct market, dragging effective rents and extending direct-space lease-up timelines.',
    'Three-plus quarters of sublease growth signals structural demand softness — not seasonal variance.',
  ],
};
