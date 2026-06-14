import type { SituationalCase } from '../../types/situational';

export const absorptionLeadingIndicators: SituationalCase = {
  id: 'absorption-leading-indicators',
  title: 'Three leading indicators are flashing red — do you adjust the absorption pace?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'development'],
  assetClass: 'multifamily',
  scenario:
    'You\'re underwriting a 300-unit multifamily development in a secondary market. TTM absorption has run 200 units/quarter, well above the 5-year average of 140. A senior PM challenges your assumption: "Three leading indicators are deteriorating — (A) employment growth has decelerated from +2.8% to +0.4% YoY; (B) the 2-year permit pipeline in the submarket just hit a 10-year high; (C) the area\'s largest tech employer (representing ~20% of the local renter base) just announced a hiring freeze." You\'re using the TTM 200-unit pace in your base case.',
  data: [
    { label: 'TTM absorption', value: '200 units/quarter' },
    { label: '5-yr avg absorption', value: '140 units/quarter' },
    { label: 'Employment growth', value: 'Decelerating: +2.8% → +0.4% YoY' },
    { label: 'Permit pipeline (2 yr)', value: '10-year high' },
    { label: 'Key employer signal', value: 'Hiring freeze (~20% of renter base)' },
  ],
  question: 'How do you respond to the challenge and what do you revise?',
  options: [
    {
      label: 'Revise down to the 5-year average (140/quarter) or below for the base case. Three convergent leading indicators — slowing employment, a record supply pipeline, and a concentrated employer freeze — all point to absorption deceleration. The TTM pace reflects yesterday\'s conditions.',
      isBest: true,
      explanation:
        'Leading indicators precede absorption changes by 1–3 quarters. All three here point in the same direction. The TTM 200-unit pace reflects the recent demand peak; the 5-year average of 140 is a better forward estimate. With a 20% employer-concentration risk from the hiring freeze, you might stress below 140 — say, 100–120 — as a downside scenario. Your deal must clear its hurdle at those numbers.',
    },
    {
      label: 'Use the TTM pace — leading indicators are speculative and historically unreliable.',
      isBest: false,
      explanation:
        'Employment growth rates and permit volume are among the most reliable multifamily absorption predictors used by every institutional research shop in CRE. A hiring freeze from a 20% concentration employer is not speculative — it\'s a direct and measurable demand headwind. Dismissing all three indicators as unreliable is motivated reasoning, not analysis.',
    },
    {
      label: 'Use the midpoint of TTM and 5-year average (170/quarter) as a compromise.',
      isBest: false,
      explanation:
        'Midpoints are compromises without analytical basis. If the indicators point to deceleration, the revision should be sized to the magnitude of the signals, not averaged for comfort. A deal that clears at 170 but fails at 140 has unacknowledged risk — averaging doesn\'t address it.',
    },
    {
      label: 'Add a 10% vacancy stress buffer on top of the TTM absorption rather than changing the pace.',
      isBest: false,
      explanation:
        'A vacancy buffer is a different tool from an absorption pace. If you use 200/quarter but add 10% vacancy, you\'re modeling fast lease-up followed by elevated turnover vacancy — not slow initial absorption. The adjustment needs to be to the lease-up pace itself.',
    },
  ],
  takeaway:
    'Trailing absorption is a rear-view mirror; leading indicators (employment, permit pipeline, major employer events) are the windshield. When leading indicators deteriorate, convention is to revert toward the long-run average or below it — not to extrapolate the recent peak. Employer concentration risk (>10% of renter base tied to one employer) warrants explicit scenario analysis, not a footnote.',
  tips: [
    'Key MF absorption leading indicators: employment growth rate, permit pipeline, renter-age population growth, wage trends.',
    'Employer concentration >10–15% of renter base = single-event risk; model it as a discrete scenario.',
    'When indicators conflict, model a bull/bear range explicitly rather than splitting the difference.',
  ],
};
