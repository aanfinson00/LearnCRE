import type { SituationalCase } from '../../types/situational';

export const leaseRenewalVsReplace: SituationalCase = {
  id: 'lease-renewal-vs-replace',
  title: 'Renew below-market or re-lease at market — which wins?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "An in-place tenant occupying 10,000 SF is paying $18/SF NNN — $6/SF below the current market of $24/SF. Their lease expires in 9 months. They've offered to renew for 5 years at $20/SF with $15/SF in TI. Your leasing broker estimates a new tenant would sign at $24/SF face rent with $35/SF in TI, a 3-month free-rent period, and a 6-month downtime for re-leasing. Both scenarios assume no rent bumps. Use a 7% discount rate.",
  data: [
    { label: 'Space', value: '10,000 SF office NNN' },
    { label: 'In-place rent', value: '$18/SF (expires in 9 months)' },
    { label: 'Market rent', value: '$24/SF' },
    { label: 'Renewal offer', value: '$20/SF, 5-yr term, $15/SF TI' },
    { label: 'New tenant', value: '$24/SF, 5-yr term, $35/SF TI, 3-mo free rent, 6-mo downtime' },
    { label: 'Discount rate', value: '7%' },
  ],
  question: 'Which path creates more value for the landlord?',
  options: [
    {
      label: "Run the 5-year NER for both. Renewal NER: $20 − ($15/5) = $17/SF. New tenant NER: $24 − ($35/5) − ($24 × 3/12 ÷ 5) = $24 − $7 − $1.20 = $15.80/SF — plus 9 months of total downtime (6-mo re-leasing + 3-mo free rent) costs ~$13.50/SF in forgone rent. After adjusting for downtime, renewal is likely better value even at lower face rent.",
      isBest: true,
      explanation:
        "Renewal NER = $20 − ($15 TI ÷ 5 yr) = $17/SF. New tenant NER = $24 face − ($35 TI ÷ 5 yr) − ($24 × 3 mo free ÷ 60 mo) = $24 − $7 − $1.20 = $15.80/SF. But the new tenant NER ignores downtime: 9 months of vacancy (6 re-leasing + 3 free rent) = 9/12 × $24 = $18/SF of forgone rent PV, spread over the 5-year hold ≈ $3.60/SF/yr equivalent drag. Effective new tenant economics ≈ $15.80 − $3.60 = ~$12.20/SF after downtime. Renewal at $17 NER beats the new tenant by ~$4.80/SF/yr on a 5-year basis. The $4/SF of market-to-renewal face rent gap is real but the downtime and TI premium make re-leasing economically worse in this case.",
    },
    {
      label: "Always pursue market rent — leaving $4/SF on the table for 5 years costs $200,000 of forgone income.",
      isBest: false,
      explanation:
        "Market rent sounds better but ignores the cost of capturing it. $35 TI vs. $15 TI = $20/SF more capex ($200,000 on 10K SF). Plus 9 months of downtime = ~$180,000 of forgone income. The rent uplift ($4/SF × 5 yr × 10K SF = $200,000 over the term) is largely consumed by the higher TI and downtime. 'Always pursue market rent' is an anchoring mistake; NER and downtime-adjusted economics are the right lens.",
    },
    {
      label: "The renewal is better because retaining a known tenant reduces leasing risk.",
      isBest: false,
      explanation:
        "Tenant retention has real value, but 'reduces risk' is not a complete answer — it must be quantified to defend a recommendation. The right answer names the NER for both paths and the cost of downtime, then concludes renewal is better for economic reasons, not just risk-reduction ones.",
    },
    {
      label: "The new tenant is better because market rents have room to grow and you lock in higher rents for 5 years.",
      isBest: false,
      explanation:
        "If market rents are growing, that's relevant — but the analysis should be based on the economics of each path at current rents, then layered with the rent growth assumption. The new tenant at $24/SF with $35 TI and 9 months of downtime has lower NER than the renewal at $20 with $15 TI, even before layering in rent growth. Starting with 'market rents can grow' without running the numbers is not a defensible recommendation.",
    },
  ],
  takeaway:
    "Below-market renewal vs. re-leasing at market is almost always closer than it appears. The re-leasing economics must include: higher TI, leasing commissions, downtime (re-leasing + free rent), and any landlord work. Reduce both paths to NER and adjust for downtime cost. In many cases, a below-market renewal wins on economics even when the face rent gap is $4–6/SF.",
  tips: [
    'NER = face rent − (TI + free rent + LCs) ÷ lease term. Use the same formula for both renewal and new-tenant paths.',
    'Downtime cost = months vacant × market rent/month. Add it as a cost to the new-tenant path, not a benefit to the renewal.',
    'The crossover point: renewal wins when downtime + TI premium > rent uplift × term.',
  ],
};
