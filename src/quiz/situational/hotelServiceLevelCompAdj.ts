import type { SituationalCase } from '../../types/situational';

export const hotelServiceLevelCompAdj: SituationalCase = {
  id: 'hotel-service-level-comp-adj',
  title: 'The hotel comp set mixes full-service and select-service — does it matter?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'hotel',
  scenario:
    "You're bidding on a 180-key select-service hotel (Courtyard by Marriott) in a primary market. The broker's comp set includes three recent sales, spanning multiple service levels and flag types.",
  data: [
    {
      label: 'Comp 1',
      value: 'Select-service, same brand class (Courtyard), 175 keys, same market — 9.8% trailing cap',
    },
    {
      label: 'Comp 2',
      value: 'Full-service Hilton, 315 keys, food & beverage, same market — 8.2% trailing cap',
    },
    {
      label: 'Comp 3',
      value:
        'Extended-stay (Residence Inn), 160 keys, same market — 10.1% trailing cap',
    },
  ],
  question: 'Which comps should anchor pricing, and how do you treat the others?',
  options: [
    {
      label:
        'Use Comp 1 as the primary anchor (same service level, comparable keys, same market). Discard Comp 2 — full-service hotels have meaningfully different cost structures, revenue sources, and cap rate bands. Adjust Comp 3 down slightly (extended-stay trades modestly wider due to longer average stay and lower ADR volatility). Anchor at 9.8–10.1%.',
      isBest: true,
      explanation:
        'Service level is the most important segmentation cut in hotel comp selection. Full-service (Comp 2) includes significant food & beverage operations with their own staffing, inventory, and margin dynamics — producing structurally different NOI margins and a 100–200 bps tighter cap than select-service. Averaging it with select-service will pull your cap artificially tight. Extended-stay (Comp 3) has more stable RevPAR (long stays buffer against transient volatility) and slightly lower operating leverage, so it trades comparably to select-service but may warrant a minor cap adjustment. Comp 1 is the clean anchor.',
    },
    {
      label:
        'Average all three — they\'re all branded, institutional-quality hotels in the same primary market.',
      isBest: false,
      explanation:
        "Brand quality and market geography matter, but service level is a separate dimension that drives materially different cap rates. Averaging the 8.2% full-service cap with the 9.8–10.1% select/extended-stay range produces a composite around 9.4% — 40 bps tight relative to the select-service anchor. A bid built on 9.4% would overpay by 4–6% relative to correct comparable pricing.",
    },
    {
      label:
        'Discard all three and price per key instead — hotel buyers use $/key multiples, not cap rates.',
      isBest: false,
      explanation:
        "Hotels are routinely priced on both $/key and trailing-NOI cap rate (and RevPAR multiples). Cap-rate analysis is the standard income-approach anchor for stabilized hotels, the same as any other income-producing property. Per-key analysis is a useful cross-check but not a substitute for income-approach pricing on an asset generating meaningful NOI.",
    },
    {
      label:
        'Use only Comp 2 as the anchor — full-service is the institutional benchmark and select-service is priced relative to it.',
      isBest: false,
      explanation:
        "Full-service is a different product category, not a benchmark for select-service pricing. The operational complexity of F&B, higher fixed staffing costs, and different RevPAR composition mean full-service caps are structurally tighter than select-service. Using a full-service comp as the primary anchor would artificially tighten your going-in cap and result in overpaying.",
    },
  ],
  takeaway:
    'Hotel comp vetting requires a two-step filter: (1) service level — select, limited, extended-stay, and full-service each have distinct cap rate bands; (2) flag brand tier — same service level, different brand quality, can still require adjustment. Mixing service levels in an unweighted average is the most common hotel comp error and will consistently bias cap rates toward the full-service (tighter) end.',
  tips: [
    'Service-level spread: full-service caps ~100–200 bps tighter than comparable select-service.',
    'Extended-stay typically trades in line with select-service, sometimes modestly wider on ADR volatility.',
    'For per-key cross-check: select-service trades at 8–12× trailing RevPAR per key in primary markets.',
  ],
};
