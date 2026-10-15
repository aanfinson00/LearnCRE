import type { SituationalCase } from '../../types/situational';

export const hotelOccupancyFlowThrough: SituationalCase = {
  id: 'hotel-occupancy-flow-through',
  title: 'Hotel: what does a 5-point occupancy dip do to NOI?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'hotel',
  scenario:
    "You're underwriting a 150-key select-service hotel. Occupancy is 72% at a $180 ADR, total revenue is $10M, and NOI is $2.4M, so NOI margin is 24%. Your lender asks for a downside case where occupancy falls 5 points to 67% with ADR flat. Your analyst applies the 24% margin to the lost revenue.",
  data: [
    { label: 'Keys', value: '150' },
    { label: 'Occupancy / ADR', value: '72% / $180' },
    { label: 'Total revenue', value: '$10.0M' },
    { label: 'NOI / margin', value: '$2.4M / 24%' },
    { label: 'Downside occupancy', value: '67% (ADR flat)' },
    { label: 'Cap rate', value: '8.5%' },
  ],
  question: 'How should the lost revenue flow to NOI?',
  options: [
    {
      label:
        "Lost rooms revenue is about $493,000 (150 × 365 × $180 × 5%). Use a flow-through of roughly 55–65% because most hotel costs are fixed, which cuts NOI by about $270,000–320,000 (11–13%) and value by about $3.2–3.8M at an 8.5% cap.",
      isBest: true,
      explanation:
        "150 keys × 365 days × $180 × 5% = $492,750 of rooms revenue. Fewer occupied rooms save only variable costs such as housekeeping, laundry and amenities, so a high share of each lost dollar reaches NOI. At 55–65% flow-through NOI falls $271,000–320,000, or 11–13% of $2.4M, and at an 8.5% cap that is $3.2–3.8M of value. This is how revenue shocks hit hotels.",
    },
    {
      label:
        "Apply the 24% margin: $493,000 × 24% is about $118,000, so NOI falls to about $2.28M.",
      isBest: false,
      explanation:
        "The average margin blends fixed and variable costs across all revenue. The incremental dollar of lost revenue avoids only variable costs, so the flow-through is much higher than the average margin. Using 24% understates the NOI drop by more than half.",
    },
    {
      label:
        "Assume 100% flow-through because expenses are fixed: NOI falls by the full $493,000.",
      isBest: false,
      explanation:
        "Some costs do scale with occupied rooms (cleaning, laundry, supplies, credit-card fees, and some labor and management fees). Treating all costs as fixed overstates the drop. Flow-through for a select-service hotel is high but not 100%.",
    },
    {
      label:
        "Ignore it, because ADR is flat and the hotel can raise rates to recover the lost occupancy.",
      isBest: false,
      explanation:
        "The scenario holds ADR flat on purpose so that you can isolate the occupancy effect. In a demand-driven occupancy decline, raising rates usually lowers occupancy further. RevPAR is the product of both, and a downside case should not assume the fix.",
    },
  ],
  takeaway:
    "Hotel NOI moves with incremental flow-through, not with average margin. For select-service hotels, lost rooms revenue typically reaches NOI at 55–65%.",
  tips: [
    "Rooms revenue = keys × 365 × occupancy × ADR.",
    "Use incremental flow-through, not the blended margin, for revenue shocks.",
    "Run the cap rate on the stressed NOI to see the value effect.",
  ],
};
