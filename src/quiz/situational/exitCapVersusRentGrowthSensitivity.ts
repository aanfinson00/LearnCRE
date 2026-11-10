import type { SituationalCase } from '../../types/situational';

export const exitCapVersusRentGrowthSensitivity: SituationalCase = {
  "id": "exit-cap-versus-rent-growth-sensitivity",
  "title": "Exit cap vs. rent growth — what moves the deal most?",
  "category": "sensitivity",
  "difficulty": "intermediate",
  "assetClass": "mixed",
  "roles": [
    "acquisitions",
    "portfolioMgmt"
  ],
  "scenario": "A five-year hold underwrites Year 6 NOI of $2.0M and a 5.5% exit cap, for a $36.4M sale. You are deciding which assumption deserves the most scrutiny. Two shocks are on the table: exit cap +50 bps, or rent growth 1% lower per year.",
  "data": [
    {
      "label": "Year 6 NOI",
      "value": "$2.0M"
    },
    {
      "label": "Exit cap",
      "value": "5.5%"
    },
    {
      "label": "Exit value",
      "value": "$36.4M"
    },
    {
      "label": "Shock 1",
      "value": "Exit cap +50 bps (6.0%)"
    },
    {
      "label": "Shock 2",
      "value": "Rent growth −1% / yr"
    }
  ],
  "question": "Which shock has the larger effect on exit value, and what is the right response?",
  "options": [
    {
      "label": "The cap shock: 6.0% on $2.0M is $33.3M, about an 8% drop. The growth shock cuts NOI about 5–7%. Run a two-way table of both.",
      "isBest": true,
      "explanation": "$2.0M ÷ 6.0% = $33.3M versus $36.4M, down about 8.3%. One point less annual growth for five years cuts NOI by roughly 5%, a bit more with fixed expenses. The cap shock hits harder per reasonable move and is outside your control, so a two-way sensitivity table is the right deliverable."
    },
    {
      "label": "Rent growth, because it compounds each year.",
      "isBest": false,
      "explanation": "It compounds, but a one-point change over five years is only about 5%, smaller than the 8% from a 50 bps cap move."
    },
    {
      "label": "Neither — a 50 bps move is immaterial.",
      "isBest": false,
      "explanation": "On a 5.5% base cap, 50 bps is a nearly 9% change in value."
    },
    {
      "label": "Only look at levered IRR, not value.",
      "isBest": false,
      "explanation": "Leverage magnifies value changes, so it makes them more important, not less."
    }
  ],
  "takeaway": "Exit cap changes are multiplicative on the entire sale price. Show a two-way table to see how they interact.",
  "tips": [
    "Value change ≈ −Δcap ÷ new cap.",
    "Rerun the base case with exit cap equal to going-in plus a spread.",
    "Leverage amplifies both shocks."
  ]
};
