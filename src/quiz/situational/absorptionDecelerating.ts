import type { SituationalCase } from '../../types/situational';

export const absorptionDecelerating: SituationalCase = {
  id: 'absorption-decelerating',
  title: 'Absorption is slowing — what does this do to your stabilization timeline?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    'A multifamily developer is projecting lease-up for a new 300-unit community. The submarket absorption pace has been decelerating: Q3 was 150 units/month, Q2 was 110 units/month, Q1 was 75 units/month. There are 900 units of new supply currently in lease-up across 4 competing projects in the same submarket. The developer\'s proforma assumes 80 units/month absorption to underwrite a 10-month stabilization.',
  data: [
    { label: 'Project size', value: '300 units' },
    { label: 'Q3 submarket absorption', value: '150 units/mo' },
    { label: 'Q2 submarket absorption', value: '110 units/mo' },
    { label: 'Q1 submarket absorption', value: '75 units/mo' },
    { label: 'Competing supply in lease-up', value: '900 units (4 projects)' },
    { label: 'Developer assumption', value: '80 units/mo → 10-month stabilization' },
  ],
  question: 'How do you assess the developer\'s 80 units/month absorption assumption?',
  options: [
    {
      label: 'It\'s likely too aggressive. The submarket pace is decelerating and the project must capture share among 1,200 total lease-up units. A market-share-based approach at 55–65 units/month implies 5–6 months more than modeled.',
      isBest: true,
      explanation:
        'Two problems: (1) The trend is negative — submarket absorption fell from 150 to 75 units/month in two quarters. Extrapolating forward, the base case is further deceleration, not recovery. (2) Market-share math: at 75 units/month total and 1,200 units in simultaneous lease-up (900 + this project), a fair share is ~75 × (300/1,200) = ~19 units/month — far below the 80 assumed. Even using the peak Q3 pace, share would be 150 × (300/1,200) = ~38 units/month. The 80/month assumption requires the project to capture 53–100% of total submarket demand, which is implausible with 4 competing projects.',
    },
    {
      label: 'The 80 units/month assumption is reasonable — Q3 pace was 150, and the project only needs 80.',
      isBest: false,
      explanation:
        'Using the peak Q3 pace ignores (a) the decelerating trend and (b) competitive share. The 80 units/month is an *aggregate submarket* figure during better conditions. The project competing for a share of a declining total produces a very different per-project number. Always compute implied capture rate.',
    },
    {
      label: 'Defer to the developer — they know the project and the local market better.',
      isBest: false,
      explanation:
        'Developer projections are inherently optimistic — the development economics only work if the project succeeds. The lender\'s and investor\'s job is to stress-test the absorption assumption independently, using submarket data and competitive positioning. A decelerating trend and high competitive supply are both observable inputs that override developer intuition.',
    },
    {
      label: 'Model two scenarios: base case at 80 units/month and downside at 50 units/month.',
      isBest: false,
      explanation:
        'Scenario analysis is useful but incomplete if the base case is itself unsupported. The first step is to challenge whether 80/month is a defensible base, not just stress it. Framing an unsupported number as the "base" and modeling a 50/month downside still anchors the analysis around an optimistic number.',
    },
  ],
  takeaway:
    'A decelerating absorption trend is a leading indicator — don\'t use the peak pace as your base case. Always translate submarket absorption into a per-project capture rate: (project units / total lease-up units) × submarket pace. When competition is heavy and the trend is down, a 10-month stabilization can easily become 18+.',
  tips: [
    'Capture rate = your units ÷ total units in lease-up × submarket pace.',
    'Decelerating Q-o-Q absorption signals softening demand — extrapolate the trend, not the peak.',
    'Stress stabilization timing: every 3 months of delayed lease-up burns ~75–150 bps of levered IRR on typical development deals.',
  ],
};
