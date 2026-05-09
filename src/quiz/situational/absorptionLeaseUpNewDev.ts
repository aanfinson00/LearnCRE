import type { SituationalCase } from '../../types/situational';

export const absorptionLeaseUpNewDev: SituationalCase = {
  id: 'absorption-leaseup-new-dev',
  title: 'How long does a spec development actually take to stabilize?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    "A developer is delivering a 400-unit Class-A apartment building into a submarket already absorbing 80 units per month across all competing properties. Two other projects are delivering the same quarter, totaling 350 units combined. The developer's pro forma projects stabilization (95% leased) in 5 months, citing the 80-unit monthly absorption pace.",
  data: [
    { label: 'Subject units', value: '400 units' },
    { label: 'Simultaneous pipeline', value: '+350 units (2 other projects)' },
    { label: 'Total new supply', value: '750 units this quarter' },
    { label: 'Market absorption', value: '80 units/month (market-wide)' },
    { label: 'Target stabilization', value: '95% leased (380 units)' },
  ],
  question: "Is the 5-month stabilization timeline defensible?",
  options: [
    {
      label: "No — 80 units/month is market-wide absorption split across 750 new units. The subject's proportional share is roughly 43 units/month, putting stabilization closer to 9 months. The pro forma is using market absorption as if the subject captures it all.",
      isBest: true,
      explanation:
        "If 750 units are delivering simultaneously and the market absorbs 80/month, the subject captures 400/750 × 80 ≈ 43 units/month in a proportional-share scenario. To reach 380 units leased: 380 ÷ 43 ≈ 9 months. The 5-month model solves 380 ÷ 80 — i.e., the subject absorbs ALL of the market's demand. That's only valid if the subject is the only delivery. With competing simultaneous deliveries, you divide by the subject's share of new supply.",
    },
    {
      label: "Yes — if the market absorbs 80 units/month and the target is 380 units, 380 ÷ 80 = 4.75 months. The pro forma is slightly conservative.",
      isBest: false,
      explanation:
        "This is precisely the error in the pro forma. Market absorption of 80 units/month is split across ALL new deliveries, not just the subject. When 750 units deliver simultaneously, each project competes for that 80-unit monthly demand pool. Treating market absorption as 100% capturable by a single project is a common and consequential underwriting mistake.",
    },
    {
      label: "Impossible to say — absorption pace depends on rent pricing relative to the competition.",
      isBest: false,
      explanation:
        "Rent competitiveness influences absorption share but doesn't make the timeline incalculable. The base case is the proportional supply share (~43 units/month), then you adjust up if the subject is priced competitively vs. the pipeline or down if priced above. 'Impossible to say' misses the base-case modeling step.",
    },
    {
      label: "Conservative — Class-A buildings stabilize faster because demand skews to new product.",
      isBest: false,
      explanation:
        "New-product preference is real, but the 80 units/month figure already represents market demand for new product. You can't claim both market-wide absorption AND a faster-than-market capture rate without a documented pricing or amenity advantage. The supply-share math is still the correct starting point.",
    },
  ],
  takeaway:
    "When multiple projects deliver simultaneously, allocate market absorption by supply share — don't credit the subject with 100% of market demand. Subject stabilization time ≈ (target units leased) ÷ (market absorption × subject share of new supply). This is the single most common lease-up underwriting error in development pro formas.",
  tips: [
    "Subject absorption share ≈ subject units ÷ total new supply delivering in the same quarter.",
    "If the subject is priced below competing deliveries, shade the share higher — but document the basis.",
    "Check the supply pipeline 6–12 months forward, not just the current quarter.",
  ],
};
