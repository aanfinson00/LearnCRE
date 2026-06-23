import type { SituationalCase } from '../../types/situational';

export const absorptionLeaseupPhasing: SituationalCase = {
  id: 'absorption-leaseup-phasing',
  title: 'Does the phased lease-up hold up?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['development', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    "A 300-unit multifamily development delivers in two phases: Phase 1 (180 units) in month 1, Phase 2 (120 units) in month 13. Market-wide absorption for the submarket (including all competing new supply) runs at 50 units/month. The sponsor's proforma models Phase 1 at 95% leased by month 12 and full-project stabilization at 95% by month 18.",
  data: [
    { label: 'Phase 1', value: '180 units, delivers month 1' },
    { label: 'Phase 2', value: '120 units, delivers month 13' },
    { label: 'Market absorption (all sources)', value: '50 units/month' },
    { label: 'Phase 1 target', value: '95% leased by month 12' },
    { label: 'Full project stabilization', value: '95% by month 18' },
  ],
  question: "Does the sponsor's phasing and timeline hold up under scrutiny?",
  options: [
    {
      label: "Phase 1 at month 12 is achievable only if market capture is very high. Phase 2 stabilization by month 18 is extremely optimistic — it requires the project to absorb nearly all market leasing in months 13–18 while Phase 1 must also maintain occupancy.",
      isBest: true,
      explanation:
        "Phase 1: 171 units to lease (95% × 180). At 50/mo market-wide, assuming 50–70% capture: 5–7 months. Month 12 target has room. Phase 2: 114 units to lease (95% × 120) in 5 months (months 13–18). At 50/mo market-wide, 5 months = 250 total market leasing events. Capturing 114 of those = 46% capture rate — tight, and requires Phase 1 tenants to have low churn during the same window. Any competing new supply during this period compresses the capture rate further. The timeline is possible but assumes favorable conditions on multiple variables simultaneously.",
    },
    {
      label: "Month 18 full stabilization is conservative — 300 units ÷ 50/mo = 6 months of needed absorption.",
      isBest: false,
      explanation:
        "This math assumes 100% of market absorption flows to this project with no competing supply. 300 ÷ 50 = 6 months only if the project captures every unit of market demand for 6 straight months. A realistic capture rate (50–70%) means 8–10 months for the full project, and the phased delivery stretches the timeline further because Phase 2 is adding supply while Phase 1 may still have vacancy.",
    },
    {
      label: "Phasing doesn't matter — total units and market absorption pace determine the timeline.",
      isBest: false,
      explanation:
        "Phasing creates overlapping lease-up demands. Phase 2 delivering at month 13 while Phase 1 may still have vacancy means both compete for the same renter pool simultaneously. If Phase 2 had delivered at month 25 (post-Phase 1 stabilization), the timeline math would be sequential and more forgiving. Overlapping phases share a finite absorption pool — the sequence matters.",
    },
    {
      label: "Market absorption will increase when Phase 2 delivers — new supply attracts additional renters to the market.",
      isBest: false,
      explanation:
        "Supply doesn't create demand. Household formation, in-migration, and job growth drive rental demand — all are independent of what developers build. Adding units to a market with flat demand stretches absorption timelines; it doesn't accelerate them. The 50/mo pace is the starting baseline; a developer cannot assume their deliveries will grow the pie.",
    },
  ],
  takeaway:
    "Multi-phase lease-up models require month-by-month tracking of overlapping absorption demands. The critical variable is capture rate — the fraction of market-wide absorption the project wins — and it must be applied to both phases simultaneously during the overlap window. Stabilization timing is a derived output from the absorption model, not an assumption to anchor the proforma.",
  tips: [
    "Phase 1 stabilization before Phase 2 delivery is the conservative case — model what happens when they overlap.",
    "Capture rate = project's share of market-wide monthly absorption; stress-test at 50% and 70%.",
    "Every competing new delivery during lease-up compresses your capture rate.",
  ],
};
