import type { SituationalCase } from '../../types/situational';

export const nnnVsGrossEffectiveRent: SituationalCase = {
  "id": "nnn-vs-gross-effective-rent",
  "title": "$30 gross or $22 NNN — which offer is better?",
  "category": "lease-econ",
  "difficulty": "intermediate",
  "assetClass": "retail",
  "roles": [
    "acquisitions",
    "assetManagement"
  ],
  "scenario": "Two prospects want the same 5,000 SF space. Tenant 1 offers $30/SF full-service gross with no expense pass-throughs. Tenant 2 offers $22/SF NNN. Operating expenses (taxes, insurance, CAM) are running $8.50/SF and are growing about 3% a year. Credit and TI requests are equivalent.",
  "data": [
    {
      "label": "Tenant 1",
      "value": "$30/SF gross"
    },
    {
      "label": "Tenant 2",
      "value": "$22/SF NNN"
    },
    {
      "label": "Current opex",
      "value": "$8.50/SF"
    },
    {
      "label": "Opex growth",
      "value": "~3% / yr"
    }
  ],
  "question": "How should you compare them?",
  "options": [
    {
      "label": "Convert to a net basis: the gross deal nets $21.50 ($30 − $8.50) versus $22 NNN, and NNN also protects against expense growth.",
      "isBest": true,
      "explanation": "Gross rent includes opex that the landlord pays. Net of that, Tenant 1 is $21.50/SF versus $22.00 for Tenant 2, and the gap widens as expenses inflate, because the landlord absorbs growth on the gross lease but recovers it on the NNN."
    },
    {
      "label": "Take the $30 gross — it is $8 higher on its face.",
      "isBest": false,
      "explanation": "The headline numbers are on different bases. The extra $8 is largely reimbursement for expenses the landlord must pay."
    },
    {
      "label": "They are equivalent because $22 + $8.50 = $30.50, which is about $30.",
      "isBest": false,
      "explanation": "Equating the two ignores that the gross tenant doesn't pay growth in expenses. $30.50 assumes recoveries that rise with costs only under NNN."
    },
    {
      "label": "Take the NNN only if the tenant also pays a security deposit.",
      "isBest": false,
      "explanation": "Deposits do not affect the comparison of effective rent."
    }
  ],
  "takeaway": "Compare leases on a common basis. Net out landlord-paid expenses from gross rents, and remember who bears expense growth.",
  "tips": [
    "Gross − landlord-paid opex = net rent.",
    "Base-year and expense-stop structures sit between gross and NNN.",
    "Always model expense growth when the landlord bears it."
  ]
};
