import type { SituationalCase } from '../../types/situational';

export const absorptionHotelRampUp: SituationalCase = {
  id: 'absorption-hotel-ramp-up',
  title: 'How long before the new hotel stabilizes RevPAR?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'hotel',
  scenario:
    'A 220-room full-service hotel opened 8 months ago in a downtown submarket. The competitive set has 1,800 rooms total and runs at a 74% occupancy index. The new hotel is currently achieving 58% occupancy and $185 ADR vs. the competitive set average of 78% occupancy and $210 ADR. Demand in the submarket has been growing at roughly 3% per year (measured in room-nights sold). No additional new supply is expected for 24 months.',
  data: [
    { label: 'New hotel rooms', value: '220' },
    { label: 'New hotel current occupancy', value: '58%' },
    { label: 'New hotel ADR', value: '$185' },
    { label: 'Competitive set occupancy', value: '78%' },
    { label: 'Competitive set ADR', value: '$210' },
    { label: 'Total competitive set rooms', value: '1,800' },
    { label: 'Submarket demand growth', value: '3%/yr' },
  ],
  question: 'Approximately when should the hotel reach stabilized occupancy, and what drives that timeline?',
  options: [
    {
      label: 'Roughly 18–24 months from opening — the hotel needs to build brand awareness and loyalty, close the ADR discount as reputation grows, and rely on 3%/yr demand growth to absorb the room-night inventory it added to the submarket.',
      isBest: true,
      explanation:
        'The hotel added 220 rooms to a 1,800-room set — a 12.2% capacity increase. At 3%/yr demand growth, submarket room-nights sold grow enough to absorb the new supply in roughly 4 years at the market level, but individual hotels ramp faster because they steal share from the set. Typical full-service ramp: 18–30 months to reach the competitive set occupancy index. The ADR discount ($185 vs $210, or ~12%) will compress as TripAdvisor reviews build. An 18–24 month stabilization is the right planning horizon; 12 months is too fast for a full-service, 36+ months signals operational or brand issues.',
    },
    {
      label: 'The hotel will stabilize within 6 months — the ADR discount is all that\'s holding back occupancy.',
      isBest: false,
      explanation:
        'ADR discount drives some occupancy share, but full-service hotels take time to build corporate accounts, group bookings, and loyalty referrals. Six months captures transient leisure; it misses group and corporate demand, which can take 12–24 months to ramp. Projecting 6-month stabilization on a full-service hotel is promoter-grade optimism.',
    },
    {
      label: 'The hotel can\'t stabilize until 3%/yr demand growth fills the rooms it added — that takes about 4 years.',
      isBest: false,
      explanation:
        'Treats the new hotel as if it absorbs only the incremental demand growth, but hotels can also steal occupancy share from the competitive set by pricing below market (the $185 vs. $210 ADR discount is doing exactly that). Share-driven ramp is faster than demand-growth-driven ramp. Four years would apply if the hotel had no ADR advantage and the market were static.',
    },
    {
      label: 'The RevPAR ramp timeline depends only on whether the flag is a strong national brand.',
      isBest: false,
      explanation:
        'Brand matters for loyalty enrollment and OTA ranking, but the math of supply absorption is driven by demand growth, the size of the new supply relative to the set, and the ADR positioning — not brand alone. A strong brand accelerates the ramp by 3–6 months; it doesn\'t change the fundamental supply/demand equation.',
    },
  ],
  takeaway:
    'Hotel stabilization has two components: (1) demand-side ramp — time to build accounts, reviews, and loyalty; (2) supply-side absorption — time for submarket demand growth to absorb the room-nights added. Full-service hotels typically take 18–30 months. Model the RevPAR index (hotel RevPAR ÷ comp set RevPAR) trending from ~70–75% at opening to 95–100% at stabilization.',
  tips: [
    'RevPAR index = subject RevPAR ÷ competitive set RevPAR; target 95–105% at stabilization.',
    'Full-service ramp: 18–30 months; limited-service ramp: 12–18 months.',
    'ADR discount drives occupancy share in the short run; brand/reviews close the gap over time.',
  ],
};
