import type { SituationalCase } from '../../types/situational';

export const leaseRenewalVsReplace: SituationalCase = {
  id: 'lease-renewal-vs-replace',
  title: 'Accept the below-market renewal or replace the tenant?',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['assetManagement'],
  assetClass: 'office',
  scenario:
    "A 10,000 SF office tenant occupying 20% of your building has been in place for 12 years and wants to renew for 5 more years. Their current rent is $28/SF NNN — 15% below the $33/SF market. They're asking to renew at $29/SF with no TI (they'll stay as-is). Replacing them at market would require 5 months of downtime, $40/SF in TI, a 3-month free rent concession, and a 4% leasing commission on the new lease value.",
  data: [
    { label: 'Space', value: '10,000 SF' },
    { label: 'Current rent', value: '$28/SF NNN' },
    { label: 'Market rent', value: '$33/SF NNN' },
    { label: 'Renewal ask', value: '$29/SF NNN · no TI · 5-year term' },
    { label: 'Replacement cost', value: '5 mo downtime + $40/SF TI + 3 mo free rent + 4% LC' },
    { label: 'Discount rate', value: '7%' },
  ],
  question: "Should you take the renewal or replace the tenant at market rent?",
  options: [
    {
      label: "Take the renewal — the all-in replacement cost is ~$680k ($500k TI + $82.5k downtime + $82.5k free rent + ~$66k LC), while the annual rent premium is only $40k/yr. Payback on replacement is 17 years — far beyond the 5-year term. The renewal wins decisively.",
      isBest: true,
      explanation:
        "Replacement costs: (a) downtime = 5 months × ($33 × 10,000 ÷ 12) = $137,500 in forgone rent; (b) TI = $40 × 10,000 = $400,000; (c) free rent = 3 months × ($33 × 10,000 ÷ 12) = $82,500; (d) leasing commission = 4% × ($33 × 10,000 × 5 years) = $66,000. Total replacement cost: ~$686,000. Annual rent premium vs. renewal: ($33 − $29) × 10,000 = $40,000/yr. Over 5 years, total premium = $200,000 — less than one-third of the replacement cost. Take the renewal. The below-market rent costs far less than the cost of replacing the tenant.",
    },
    {
      label: "Push for market rent — $4/SF below market on 10,000 SF caps the NOI, compounding to ~$727k of lost value at a 5.5% cap rate.",
      isBest: false,
      explanation:
        "The valuation impact of below-market rent is real — $40k/yr at a 5.5% cap = $727k of 'lost value.' But this framing ignores replacement cost: you'd spend $686k immediately to eventually earn $40k/yr more over 5 years = $200k in total incremental income. Net economic result of replacing: −$486k vs. renewing. The capitalization math makes accepting below-market rent look worse than it is by ignoring the cost to achieve market rent.",
    },
    {
      label: "Counter at $31/SF — split the difference to get closer to market while keeping the tenant.",
      isBest: false,
      explanation:
        "Countering is valid dealmaking. But the economics strongly favor accepting even the $29/SF ask — replacement payback is 17 years on a 5-year term. The right negotiating posture might be to counter at $31 as an opener while remaining fully prepared to accept $29 if the tenant walks. The error is treating $31 as the decision, not running the payback math first.",
    },
    {
      label: "Always push for market rent — accepting below-market leases sets a bad precedent for other tenants.",
      isBest: false,
      explanation:
        "'Precedent' is a real consideration in multi-tenant buildings, but it doesn't override the economics. If the math says replacement costs $686k and the rent premium earns $200k, the precedent argument has to be worth $486k to swing the decision — which it isn't. Decisions driven by precedent over economics are common in asset management and commonly destroy value.",
    },
  ],
  takeaway:
    "Renewal vs. replacement is an NPV question, not a 'get to market rent' decision. Compute total replacement cost (downtime + TI + free rent + leasing commissions) and compare to the NPV of incremental annual rent over the proposed term. If payback exceeds the term, the renewal wins even if it's below market. The below-market renewal is frequently the correct economic choice.",
  tips: [
    "Payback rule: if payback period > proposed term, accept the renewal. If payback < 3 years, push for market.",
    "Don't forget leasing commissions — 4–6% of total lease value is real cash, not just a negotiating artifact.",
    "A 10-year renewal term changes the math significantly: longer term makes the premium more valuable.",
  ],
};
