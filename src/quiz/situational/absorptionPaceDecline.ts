import type { SituationalCase } from '../../types/situational';

export const absorptionPaceDecline: SituationalCase = {
  id: 'absorption-pace-decline',
  title: 'Absorption pace is falling every month — does your lease-up budget still hold?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['development', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're reviewing monthly leasing velocity for a 300-unit multifamily development that delivered 9 months ago. Month 1 absorbed 45 units. The pace has fallen every quarter: M4 = 30 units/mo, M7 = 22 units/mo, M9 = 18 units/mo. The asset is currently 65% leased. Your business plan assumed a consistent 40 units/month, targeting 93% occupancy (stabilization) by month 10. Concessions of 1.5 months free rent are already in the market.",
  data: [
    { label: 'Total units', value: '300' },
    { label: 'Current occupancy (M9)', value: '65% — 195 units leased' },
    { label: 'Month 1 absorption', value: '45 units/mo' },
    { label: 'Recent pace (M9)', value: '18 units/mo' },
    { label: 'Business plan pace', value: '40 units/mo' },
    { label: 'Concessions outstanding', value: '1.5 months free rent' },
    { label: 'Stabilization target', value: '93% by month 10' },
  ],
  question: "You're 9 months in and 28 percentage points below plan. What's the right diagnosis?",
  options: [
    {
      label:
        "The monotonically declining pace with concessions already deployed signals a structural demand/price mismatch, not a temporary delay. Month 10 stabilization requires absorbing 84 units in 1 month at a current pace of 18/mo — impossible. Extend the lease-up timeline by 4-8 months, investigate the root cause (rent level, competing supply, demand shock), and communicate the revised date to the lender before they find out in the next reporting cycle.",
      isBest: true,
      explanation:
        "When absorption pace falls monotonically over 9 months while concessions are already in the market, the issue isn't temporary. Likely root causes: (a) rents priced above market absorption capacity, (b) new competitive supply arrived, (c) a macro demand shock (employment contraction), or (d) product quality issues driving traffic to competing properties. The math is insurmountable: 300 × 93% = 279 target units; 195 currently leased = 84 units needed in 1 month at 18 units/mo current pace — a 4.7× acceleration that won't happen without a structural change. Realistic path: extend lease-up budget 4-8 months, consider a 3-5% rent reduction (concessions alone aren't correcting the issue), and have a proactive lender conversation now, not after the covenant miss.",
    },
    {
      label:
        "Early lease-up months always absorb faster due to pent-up demand, so the deceleration is expected — stabilization will still occur by month 12.",
      isBest: false,
      explanation:
        "An early-month velocity premium is real, but a healthy lease-up shows a sharp peak followed by a stable plateau at a sustainable run-rate. Here the curve hasn't found a floor at month 9 (45 → 30 → 22 → 18 — still declining). A plateau hasn't formed. If the stabilized run-rate IS 18 units/mo, month-12 stabilization requires 6 months × 18 = 108 more units; you need 84. Even at month 12 that math barely closes and only if the pace doesn't fall further.",
    },
    {
      label:
        "Push concessions higher (to 2.5 months free rent) — tenants respond to concessions, and the problem will resolve.",
      isBest: false,
      explanation:
        "Concessions convert gross rent to net effective rent; if the market won't absorb at the existing gross-minus-1.5-month-free rate, adding another month of free rent signals desperation and can anchor future renter expectations. The right lever depends on the diagnosis: if the issue is absolute rent level, a permanent base rent reduction is cleaner and more durable. If it's new supply competition, concessions can bridge until supply tightens. Reaching for more concessions without diagnosing the cause risks compounding the problem without addressing it.",
    },
    {
      label:
        "The pace decline doesn't matter — stabilization is a threshold (occupancy ≥ 93%), not a speed metric. You'll hit it when you hit it.",
      isBest: false,
      explanation:
        "Technically true, but the pace determines when you hit stabilization — and you're carrying a construction loan or lease-up facility that has a stabilization date covenant. Missing that date by 6-12 months triggers extension fees, potential default, and a lender conversation you don't want to have unprepared. Pace is the leading indicator for the covenant; ignoring it is how surprises happen.",
    },
  ],
  takeaway:
    'A monotonically declining absorption pace that hasn\'t found a floor by month 9 signals a structural demand/price mismatch, not a timing issue. At month 9, the math for month-10 stabilization is insurmountable. The correct response: diagnose the root cause (rents, competing supply, demand shock), extend the business plan timeline, and communicate proactively with the lender before a covenant miss forces the conversation.',
  tips: [
    'Healthy lease-up pattern: spike in month 1 (pent-up demand) → stable plateau at the sustainable run-rate.',
    'A pace in freefall at month 9 with no plateau forming signals structural trouble, not a timing issue.',
    'Concessions buy time for marginal renters — they don\'t fix a rent-above-market problem.',
  ],
};
