import type { SituationalCase } from '../../types/situational';

export const floatingRateCapStrikeStress: SituationalCase = {
  "id": "floating-rate-cap-strike-stress",
  "title": "Stress-testing a floating-rate loan",
  "category": "sensitivity",
  "difficulty": "advanced",
  "assetClass": "multifamily",
  "roles": [
    "mortgageUw",
    "acquisitions"
  ],
  "scenario": "A $30M interest-only loan floats at SOFR + 3.00%. Current SOFR is 4.00%. NOI is $2.7M. The lender requires an interest rate cap with a 5.00% SOFR strike for the initial term.",
  "data": [
    {
      "label": "Loan",
      "value": "$30M IO"
    },
    {
      "label": "Spread",
      "value": "SOFR + 3.00%"
    },
    {
      "label": "Current SOFR",
      "value": "4.00% (7.00% all-in)"
    },
    {
      "label": "Cap strike",
      "value": "5.00% SOFR (8.00% all-in)"
    },
    {
      "label": "NOI",
      "value": "$2.7M"
    }
  ],
  "question": "What is the most useful stress to run?",
  "options": [
    {
      "label": "Compute DSCR at the cap strike: $30M × 8.00% = $2.4M of interest, so 1.125x, compared with 1.29x today — and confirm the cap term covers the loan including extensions.",
      "isBest": true,
      "explanation": "The cap guarantees SOFR for debt-service purposes no higher than 5%, so 8.00% all-in is the contractual worst case during the cap term. Today's DSCR is $2.7M ÷ $2.1M = 1.29x. Confirm the cap covers the full term plus extensions; beyond expiry, rates are uncapped."
    },
    {
      "label": "Stress DSCR at SOFR of 10% to be safe.",
      "isBest": false,
      "explanation": "With a cap in place, stressing above the strike overstates risk during the cap term. Stress beyond the strike only after the cap expires."
    },
    {
      "label": "Use current SOFR only — rates are stable.",
      "isBest": false,
      "explanation": "Floating-rate exposure is exactly why you stress. A current-rate DSCR hides the cap-strike scenario."
    },
    {
      "label": "Ignore the cap in sizing and assume SOFR is 0%.",
      "isBest": false,
      "explanation": "That removes the key risk. It overstates DSCR drastically."
    }
  ],
  "takeaway": "Stress floating-rate debt at the cap strike during the cap term and uncapped after it. Confirm the cap's term versus the loan's extended maturity.",
  "tips": [
    "All-in rate = SOFR + spread.",
    "Each +100 bps on $30M IO is $300k of interest.",
    "A cap cost is an upfront equity use — include it in sources and uses."
  ]
};
