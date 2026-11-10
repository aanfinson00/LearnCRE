import type { SituationalCase } from '../../types/situational';

export const hotelAdrVersusOccupancyFlowThrough: SituationalCase = {
  "id": "hotel-adr-versus-occupancy-flow-through",
  "title": "ADR decline or occupancy decline — which hurts profit more?",
  "category": "sensitivity",
  "difficulty": "advanced",
  "assetClass": "hotel",
  "roles": [
    "assetManagement",
    "acquisitions"
  ],
  "scenario": "A 200-room hotel runs 70% occupancy at $160 ADR, for $8.18M of rooms revenue. Variable cost per occupied room (housekeeping, laundry, amenities, commissions) is about $40. You are comparing two downside cases: ADR falls 5% ($8), or occupancy falls 3 points.",
  "data": [
    {
      "label": "Rooms",
      "value": "200"
    },
    {
      "label": "Occupancy / ADR",
      "value": "70% / $160"
    },
    {
      "label": "Rooms revenue",
      "value": "$8.18M"
    },
    {
      "label": "Variable cost",
      "value": "~$40 per occupied room"
    },
    {
      "label": "Case 1",
      "value": "ADR −5%"
    },
    {
      "label": "Case 2",
      "value": "Occupancy −3 pts"
    }
  ],
  "question": "Which case costs more profit?",
  "options": [
    {
      "label": "The ADR decline: about $409k of lost profit (51,100 occupied nights × $8), versus about $263k for the occupancy decline.",
      "isBest": true,
      "explanation": "ADR cuts fall almost entirely to the bottom line because the costs of serving the guest are unchanged. Losing 3 points of occupancy removes 2,190 room nights × $160 = $350k of revenue but saves 2,190 × $40 = $88k of variable cost, for a net loss of about $263k."
    },
    {
      "label": "The occupancy decline — losing guests always hurts more than losing rate.",
      "isBest": false,
      "explanation": "Occupancy loss is cushioned by variable costs you no longer spend; it nets to about $263k, less than the ADR case."
    },
    {
      "label": "They are the same because both are a roughly 5% revenue change.",
      "isBest": false,
      "explanation": "Revenue changes differ (5.0% vs 4.3%), and flow-through differs more."
    },
    {
      "label": "Neither matters — hotels are priced on RevPAR only.",
      "isBest": false,
      "explanation": "RevPAR ignores cost structure. Two equal RevPAR drops can have very different effects on GOP."
    }
  ],
  "takeaway": "Rate declines flow through at nearly 100%, while occupancy declines are cushioned by variable cost savings. Weigh profit, not revenue.",
  "tips": [
    "ADR change × occupied nights ≈ profit change.",
    "Occupancy loss nets variable cost per occupied room.",
    "Prefer holding rate when the occupancy trade is close."
  ]
};
