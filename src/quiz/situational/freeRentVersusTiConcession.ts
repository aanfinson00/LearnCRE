import type { SituationalCase } from '../../types/situational';

export const freeRentVersusTiConcession: SituationalCase = {
  "id": "free-rent-versus-ti-concession",
  "title": "Six months free or $15 more TI?",
  "category": "lease-econ",
  "difficulty": "advanced",
  "assetClass": "office",
  "roles": [
    "assetManagement",
    "acquisitions"
  ],
  "scenario": "A tenant is signing a 10-year office lease at $30/SF NNN and asks for either six months of free rent or an extra $15/SF of TI. The building carries a loan with a DSCR covenant and the owner may sell in three years.",
  "data": [
    {
      "label": "Lease term",
      "value": "10 years"
    },
    {
      "label": "Rent",
      "value": "$30/SF NNN"
    },
    {
      "label": "Option 1",
      "value": "6 months free rent"
    },
    {
      "label": "Option 2",
      "value": "+$15/SF TI"
    },
    {
      "label": "Loan",
      "value": "DSCR covenant tested quarterly"
    }
  ],
  "question": "How do the two concessions compare?",
  "options": [
    {
      "label": "Nominally equal ($15/SF each). TI is cash out on day one, so it costs more in present value, but free rent reduces in-place cash flow and can pressure the DSCR covenant — weigh both.",
      "isBest": true,
      "explanation": "Six months of $30 rent is $15/SF, equal to the extra TI in dollars. TI is paid upfront or at buildout, so it costs more in PV. Free rent is cheaper in present value but suppresses NOI during the free period, which can matter for covenants and for a sale in three years."
    },
    {
      "label": "Free rent is always cheaper because you do not write a check.",
      "isBest": false,
      "explanation": "The nominal cost is the same, and not writing a check does not make it free — it reduces cash flow just as directly."
    },
    {
      "label": "TI is always cheaper because it is a one-time capital cost.",
      "isBest": false,
      "explanation": "Same nominal amount, paid earlier. It is not cheaper in PV."
    },
    {
      "label": "They cost different amounts because TI is amortized over the lease.",
      "isBest": false,
      "explanation": "Amortizing TI is an accounting treatment. The cash economics are the same $15/SF."
    }
  ],
  "takeaway": "Concessions need a common basis: nominal dollars, then timing, then who it affects. Cash timing and covenant exposure break the tie.",
  "tips": [
    "Six months of rent = 0.5 × annual rent per SF.",
    "Check DSCR and debt yield during the free-rent period.",
    "Buyers may credit free rent differently than TI at sale."
  ]
};
