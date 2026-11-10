import type { SituationalCase } from '../../types/situational';

export const industrialSpecPipelineVacancy: SituationalCase = {
  "id": "industrial-spec-pipeline-vacancy",
  "title": "Deliveries vs. absorption — where does vacancy land?",
  "category": "absorption",
  "difficulty": "intermediate",
  "assetClass": "industrial",
  "roles": [
    "acquisitions",
    "portfolioMgmt"
  ],
  "scenario": "An industrial market has 40M SF of inventory and 6% vacancy. 4.5M SF will deliver over the next 12 months. Net absorption has run at 3M SF per year and you expect that pace to hold. A broker says the pipeline is no concern because 'most of it is preleased.'",
  "data": [
    {
      "label": "Inventory",
      "value": "40M SF"
    },
    {
      "label": "Current vacancy",
      "value": "6.0% (2.4M SF)"
    },
    {
      "label": "Deliveries, next 12 months",
      "value": "4.5M SF"
    },
    {
      "label": "Net absorption pace",
      "value": "3M SF / yr"
    }
  ],
  "question": "Roughly where does market vacancy land in 12 months?",
  "options": [
    {
      "label": "About 8.8% — occupied space grows by 3M SF while inventory grows by 4.5M SF.",
      "isBest": true,
      "explanation": "Occupied today: 37.6M SF. Add 3M SF of absorption = 40.6M occupied. New inventory is 44.5M SF, so vacant space is 3.9M SF, or about 8.8%. Preleasing does not change this: preleased move-ins are part of net absorption, so they are already inside the 3M SF figure."
    },
    {
      "label": "Still about 6% — preleased space is already spoken for, so supply is harmless.",
      "isBest": false,
      "explanation": "Preleased space still adds to inventory and the tenants moving into it are counted in absorption. If absorption is only 3M SF against 4.5M SF of supply, vacancy has to rise."
    },
    {
      "label": "About 9.75% — add the 1.5M SF gap to 6% as if inventory stayed at 40M SF.",
      "isBest": false,
      "explanation": "Close but wrong: inventory grows to 44.5M SF, so the denominator changes. Dividing by the old base overstates vacancy."
    },
    {
      "label": "About 17% — assume every delivered SF is vacant on day one.",
      "isBest": false,
      "explanation": "This ignores both preleasing and the 3M SF of absorption. It overstates the problem."
    }
  ],
  "takeaway": "Vacancy change comes from deliveries minus absorption measured against the new, larger inventory base. 'Preleased' describes how absorption arrives, not whether supply matters.",
  "tips": [
    "Recompute vacancy as (old vacant + deliveries − absorption) ÷ (inventory + deliveries).",
    "Check whether absorption is trailing or forward-looking before leaning on it.",
    "Compare the spec (unleased) share of the pipeline, not just the total."
  ]
};
