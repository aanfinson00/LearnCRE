import type { SituationalCase } from '../../types/situational';

export const industrialCompClearHeight: SituationalCase = {
  "id": "industrial-comp-clear-height",
  "title": "Comping a 24-foot clear building against new construction",
  "category": "comp-selection",
  "difficulty": "intermediate",
  "assetClass": "industrial",
  "roles": [
    "acquisitions",
    "mortgageUw"
  ],
  "scenario": "The subject is a 150,000 SF 1985 bulk warehouse with 24' clear height. You are choosing comps to price the building.",
  "data": [
    {
      "label": "Comp A",
      "value": "150k SF, 36' clear, built 2021: $165/SF, 5.0% cap"
    },
    {
      "label": "Comp B",
      "value": "140k SF, 28' clear, built 1998: $105/SF, 6.25% cap"
    },
    {
      "label": "Comp C",
      "value": "40k SF flex, 18' clear, built 1990: $95/SF, 7.0% cap"
    }
  ],
  "question": "How should you use these comps?",
  "options": [
    {
      "label": "Lead with Comp B as the closest functional match, use Comp A as a ceiling, and adjust for clear height, age, and rent.",
      "isBest": true,
      "explanation": "Clear height is the main functional driver in modern bulk industrial. Comp B is closest on size, height, and vintage. Comp A shows the upper bound for modern product, and the gap between A and B quantifies the premium for height and age."
    },
    {
      "label": "Average all three to smooth out the differences.",
      "isBest": false,
      "explanation": "Averaging unlike buildings blends in a flex asset and new Class A product, and produces a number that is not supportable for any real building."
    },
    {
      "label": "Use Comp A only — it is the best data point because it has the most recent sale and the same square footage.",
      "isBest": false,
      "explanation": "Matching square footage while ignoring a 12-foot clear-height gap and a 36-year age difference misses what actually drives value."
    },
    {
      "label": "Use Comp C — older vintage matches the subject's age.",
      "isBest": false,
      "explanation": "Flex and bulk warehouse attract different tenants. Vintage alone is not enough."
    }
  ],
  "takeaway": "For industrial, match functional specs — clear height, loading, column spacing — before vintage or size. Use higher-spec comps as ceilings.",
  "tips": [
    "Clear height, dock ratio, and truck court drive tenant demand.",
    "A modern comp sets the ceiling, an older one the floor.",
    "Check the rents behind each cap rate, not just the cap."
  ]
};
