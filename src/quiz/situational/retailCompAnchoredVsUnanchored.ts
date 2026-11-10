import type { SituationalCase } from '../../types/situational';

export const retailCompAnchoredVsUnanchored: SituationalCase = {
  "id": "retail-comp-anchored-vs-unanchored",
  "title": "Which retail comp should anchor your cap rate?",
  "category": "comp-selection",
  "difficulty": "intermediate",
  "assetClass": "retail",
  "roles": [
    "acquisitions",
    "mortgageUw"
  ],
  "scenario": "The subject is an 85,000 SF grocery-anchored neighborhood center built in the 1990s in a suburban market. You have four recent sales to benchmark the cap rate.",
  "data": [
    {
      "label": "Comp A",
      "value": "300,000 SF power center, same metro, 6.0% cap"
    },
    {
      "label": "Comp B",
      "value": "90,000 SF grocery-anchored, 3 miles away, sold 4 months ago, 7.0% cap"
    },
    {
      "label": "Comp C",
      "value": "20,000 SF unanchored strip next door, 7.5% cap"
    },
    {
      "label": "Comp D",
      "value": "Grocery-anchored lifestyle center, affluent submarket 15 miles away, 5.5% cap"
    }
  ],
  "question": "Which comp should be your primary reference point?",
  "options": [
    {
      "label": "Comp B — same format, similar size, nearby and recent. Adjust at the margin for anchor credit and rollover.",
      "isBest": true,
      "explanation": "Retail pricing is driven by format and tenancy. Comp B shares the grocery anchor, similar scale, trade area, and timing. Residual differences are handled with adjustments rather than by switching to a different asset type."
    },
    {
      "label": "Comp A — it's the largest and most liquid sale in the metro.",
      "isBest": false,
      "explanation": "A power center is a different investor pool, tenant mix, and risk profile. Size and liquidity do not make it comparable."
    },
    {
      "label": "Comp C — it is literally adjacent, so location is perfect.",
      "isBest": false,
      "explanation": "Proximity matters, but an unanchored strip has no grocery draw, different tenancy, and a different buyer set."
    },
    {
      "label": "Comp D — it shares the grocery anchor and the cap rate is the most recent low.",
      "isBest": false,
      "explanation": "A different submarket demographic and lifestyle format explain the tighter cap. It supports a ceiling, not a base case."
    }
  ],
  "takeaway": "Match format and tenancy first, then size, location, and timing. Use outlier comps to bracket the range, not to set it.",
  "tips": [
    "Property type and anchor status come before proximity.",
    "Bracket with a floor and a ceiling comp, then anchor on the closest match.",
    "Document each adjustment so you can defend it at IC."
  ]
};
