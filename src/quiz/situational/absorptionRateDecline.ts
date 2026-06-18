import type { SituationalCase } from '../../types/situational';

export const absorptionRateDecline: SituationalCase = {
  id: 'absorption-rate-decline',
  title: 'Absorption is slowing — do you adjust the lease-up?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    'You\'re underwriting a 500,000 SF industrial lease-up in a submarket that averaged 200,000 SF/quarter of net absorption over the prior 3 years. The most recent two quarters came in at 120,000 SF and 80,000 SF respectively. Your model was built on the 200k/quarter pace. A seller\'s broker argues the slowdown is temporary and tied to a single large tenant\'s delayed move-in.',
  data: [
    { label: 'Subject size', value: '500,000 SF' },
    { label: 'Historical absorption (3-yr avg)', value: '200,000 SF/quarter' },
    { label: 'Q-2 absorption', value: '120,000 SF' },
    { label: 'Q-1 absorption', value: '80,000 SF' },
    { label: 'Model pace used', value: '200,000 SF/quarter' },
  ],
  question: 'How should you treat the decelerating absorption trend in your underwrite?',
  options: [
    {
      label: 'Rebuild the model using the trailing trend (declining toward 80k/quarter) and show a stressed lease-up timeline alongside base case. If the deal doesn\'t pencil on the stressed pace, the 3-yr average is not a safe anchor.',
      isBest: true,
      explanation:
        'Two consecutive quarters of deceleration is a directional signal, not noise. The "single large tenant" explanation is possible but unverifiable. Conservative underwriting requires: (1) recompute lease-up using the trailing pace as the base; (2) show a stress case at 50k/quarter; (3) bridge to a different conclusion only if you can document the delayed-tenant thesis with actual evidence. A model built on a 3-year average that just broke down materially is a model built on stale data.',
    },
    {
      label: 'Keep the 200k/quarter pace — two quarters is not enough to call a trend change.',
      isBest: false,
      explanation:
        'Two consecutive quarters of deceleration in the same direction is exactly the kind of signal you should test. "Not enough data" is a valid philosophical position but a risky underwriting position — if the slowdown persists, the lease-up takes 6 quarters instead of 2.5, which can materially shift returns on a levered deal.',
    },
    {
      label: 'Average all 5 quarters of data to get a blended 168k/quarter pace.',
      isBest: false,
      explanation:
        'Averaging a declining series uses the historical high-water mark to offset the current trend, which smooths away exactly the signal you need to hear. If absorption is 80k and falling, using 168k implies a snap-back that has no current support. Weighted-toward-recent data (or simply using the trailing two quarters) is more defensible.',
    },
    {
      label: 'Use the broker\'s single-tenant explanation and hold the 200k/quarter pace with a footnote.',
      isBest: false,
      explanation:
        'A footnote is not a stress test. If the explanation is correct, your upside case is fine; if it\'s wrong, you haven\'t quantified the downside. The footnote approach protects the broker\'s deal, not your underwriting discipline.',
    },
  ],
  takeaway:
    'Absorption rate changes are more dangerous than absolute absorption misses. A single below-forecast quarter can be noise; two consecutive deceleration quarters in the same direction is a trend that requires a re-anchored base case, not a footnote.',
  tips: [
    'Recency-weight absorption: the last 2 quarters matter more than the trailing 3-year average in a turning market.',
    'Separate "market absorption" from "your project\'s capture rate" — both can decelerate independently.',
    'If you can\'t support a delayed-tenant claim with a signed LOI or lease, don\'t build the model on it.',
  ],
};
