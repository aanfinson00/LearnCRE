import type { SituationalCase } from '../../types/situational';

export const hotelNewSupplyOccupancy: SituationalCase = {
  "id": "hotel-new-supply-occupancy",
  "title": "New hotel opens — what happens to submarket occupancy?",
  "category": "absorption",
  "difficulty": "intermediate",
  "assetClass": "hotel",
  "roles": [
    "acquisitions",
    "assetManagement"
  ],
  "scenario": "A 2,400-room submarket runs 72% occupancy. A 220-room select-service hotel opens next quarter. Demand (occupied room nights) is growing about 2% a year. You are underwriting an existing 150-room hotel in the submarket.",
  "data": [
    {
      "label": "Existing rooms",
      "value": "2,400"
    },
    {
      "label": "Current occupancy",
      "value": "72%"
    },
    {
      "label": "New supply",
      "value": "+220 rooms (9.2%)"
    },
    {
      "label": "Annual demand growth",
      "value": "2%"
    }
  ],
  "question": "What is the most reasonable read on submarket occupancy over the next year?",
  "options": [
    {
      "label": "It falls to about 67% — supply grows 9% while demand grows 2%, so the occupancy denominator outpaces the numerator.",
      "isBest": true,
      "explanation": "Occupied rooms: 2,400 × 72% = 1,728, grown 2% = 1,763. Available rooms: 2,620. Occupancy = 1,763 ÷ 2,620 ≈ 67%. Competitors will also defend occupancy with rate cuts, so expect ADR pressure as well, and the new hotel's own ramp will take a couple of years."
    },
    {
      "label": "It stays near 72% — a new hotel only captures new demand, so existing hotels are unaffected.",
      "isBest": false,
      "explanation": "New hotels do generate some demand, but not 9% worth. They mostly take share from existing hotels through discounting and new-build appeal."
    },
    {
      "label": "It collapses to about 60% — the new hotel instantly fills at the expense of everyone else.",
      "isBest": false,
      "explanation": "New hotels ramp over two to three years, and the math at 2% demand growth gives roughly 67%, not 60%."
    },
    {
      "label": "Occupancy is unchanged but ADR rises because the new product raises the market.",
      "isBest": false,
      "explanation": "Added supply that outpaces demand generally pressures rate, not lifts it."
    }
  ],
  "takeaway": "Hotel occupancy is demand ÷ supply. When supply grows faster than demand, occupancy falls even if nothing else changes, and rate usually follows.",
  "tips": [
    "Compute implied occupancy from room-night demand and available rooms.",
    "Net supply by checking openings and closures.",
    "Expect a ramp — a new hotel takes two to three years to reach stabilized share."
  ]
};
