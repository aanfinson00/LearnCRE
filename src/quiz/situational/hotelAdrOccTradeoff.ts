import type { SituationalCase } from '../../types/situational';

export const hotelAdrOccTradeoff: SituationalCase = {
  id: 'hotel-adr-occ-tradeoff',
  title: 'Hotel: push ADR or chase occupancy — which produces more RevPAR?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'hotel',
  scenario:
    "You manage a 160-key limited-service hotel. Current trailing-12 performance: ADR $132, Occupancy 74%, RevPAR $97.68. Your revenue manager offers two strategies for next year: (A) push ADR by 8% to $142.56 while accepting a 3-point occupancy drop to 71%, or (B) hold ADR flat at $132 and grow occupancy 4 points to 78% through OTA discounting and a new corporate account.",
  data: [
    { label: 'Current ADR', value: '$132' },
    { label: 'Current occupancy', value: '74%' },
    { label: 'Current RevPAR', value: '$97.68' },
    { label: 'Strategy A', value: 'ADR +8% → $142.56; Occ −3pts → 71%' },
    { label: 'Strategy B', value: 'ADR flat $132; Occ +4pts → 78%' },
    { label: 'Variable cost per occupied room', value: '~$28' },
  ],
  question: 'Which strategy produces better RevPAR and, more importantly, better GOP contribution?',
  options: [
    {
      label:
        'Strategy A produces higher RevPAR ($101.22 vs $102.96 for B), so Strategy B is marginally better on RevPAR — but Strategy A wins on GOP contribution. Higher ADR costs nothing incremental; each additional occupied room costs ~$28 in variable costs (housekeeping, amenities, supplies). At 160 keys, Strategy B generates ~6.4 more occupied room-nights/day at $28/night variable cost = ~$65k/yr more cost than Strategy A.',
      isBest: true,
      explanation:
        "RevPAR math: A = $142.56 × 0.71 = $101.22; B = $132 × 0.78 = $102.96. Strategy B is slightly better on RevPAR (+$1.74/room). But GOP is the right metric. Strategy A rooms revenue: $142.56 × 0.71 × 160 keys × 365 = ~$5.91M. Strategy B: $132 × 0.78 × 160 × 365 = ~$6.01M. Revenue difference: B generates ~$100k more. Variable cost difference: B has 4% more occupancy = 6.4 more rooms/night × $28 × 365 = ~$65k more variable cost. Net GOP advantage to B: ~$35k — Strategy B barely wins on GOP too, but the RevPAR difference is negligible. The key insight is that ADR growth is pure margin, while occupancy growth brings incremental cost.",
    },
    {
      label:
        "Strategy B is obviously better — it has higher RevPAR ($102.96 vs $101.22) and more guests means more ancillary revenue (parking, F&B).",
      isBest: false,
      explanation:
        "RevPAR is marginally higher for B, but the answer ignores variable cost. The 'more guests = more ancillary revenue' logic only holds if the property has significant F&B or parking operations — a limited-service hotel typically does not. The right framing is: RevPAR difference is only $1.74/available room, and the variable cost of the extra occupied rooms partially offsets that revenue gain. Neither strategy clearly dominates on GOP; the right answer requires running the full contribution math.",
    },
    {
      label:
        "Strategy A — higher ADR is always better because it protects rate integrity for future years.",
      isBest: false,
      explanation:
        "Rate integrity is a real consideration (OTA discounting creates a pricing floor that's hard to walk back), but 'always protect rate' is not a nuanced answer. In this scenario, both strategies are viable and the RevPAR difference is under 2%. The right framework considers both the revenue math and the cost structure, not a categorical preference for one lever.",
    },
    {
      label:
        "There's no meaningful difference — both strategies produce RevPAR within $2 of each other, so focus on guest satisfaction instead.",
      isBest: false,
      explanation:
        "Guest satisfaction is a lagging indicator of rate and occupancy performance, not an alternative strategy. When two revenue strategies produce similar RevPAR, the tiebreaker is GOP contribution margin — which requires calculating variable costs on the incremental occupied rooms. Declaring a tie and pivoting to satisfaction metrics misses the core analytical question.",
    },
  ],
  takeaway:
    "ADR growth is a high-quality revenue lever because it carries no incremental operating cost — each dollar of rate increase falls directly to GOP. Occupancy growth brings incremental variable costs ($25–35/room for limited-service). When two strategies produce similar RevPAR, decompose the contribution: revenue delta minus variable cost delta. The implication for underwriting: in a value-add hotel story, ADR recovery (post-renovation, repositioning) is more powerful per dollar than occupancy recovery because it doesn't widen the cost base.",
  tips: [
    'RevPAR = ADR × Occupancy. Simple RevPAR maximization ignores variable cost — always carry the GOP math.',
    'Variable cost per occupied room (CPOR) for limited-service: $22–35; full-service: $45–70. Use CPOR to evaluate occupancy-driving initiatives.',
    'OTA discounting to drive occupancy creates a pricing floor: rate resets are hard once OTA channels reset to a lower rate parity.',
  ],
};
