import type { SituationalCase } from '../../types/situational';

export const renewalFlatVsMarkToMarket: SituationalCase = {
  id: 'renewal-flat-vs-mark-to-market',
  title: 'The tenant wants to renew flat — is that a win or a concession?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "A 60,000 SF office tenant (33% of building) has been in place for 7 years at $30/SF gross. They want to renew for 5 more years at the same $30/SF — no TI, no concessions. Current market rent for comparable space is $38/SF gross. Replacing them with a new tenant would require $50/SF in TI, 6 months of downtime (dark), and a 6-month free-rent period.",
  data: [
    { label: 'Tenant size', value: '60,000 SF' },
    { label: 'In-place rent', value: '$30/SF gross' },
    { label: 'Renewal ask', value: '$30/SF flat (no TI, no free rent)' },
    { label: 'Current market rent', value: '$38/SF gross' },
    { label: 'New-tenant TI cost', value: '$50/SF' },
    { label: 'Estimated downtime (new tenant)', value: '6 months dark' },
    { label: 'Free rent (new tenant)', value: '6 months' },
    { label: 'Discount rate', value: '7%' },
  ],
  question: 'How should you evaluate the flat renewal offer?',
  options: [
    {
      label:
        'Accept the flat renewal. NER on renewal = $30/SF (no cost). NER on new tenant ≈ $38 − ($50/5) − (12 months × $38/12 / 5) ≈ $38 − $10 − $7.60 = $20.40/SF. The flat renewal outperforms the new-tenant scenario by nearly $10/SF/yr in net economic rent over the 5-year term — despite being $8 below market face rent.',
      isBest: true,
      explanation:
        'The math is counterintuitive but decisive. Renewal at $30/SF with no costs has NER = $30. The new-tenant scenario at $38/SF face incurs: (1) $50/SF TI amortized over 5 years = $10/SF/yr; (2) 6 months downtime = revenue loss of $38 × 0.5 yr = $19/SF, divided over 5-year term = $3.80/SF/yr; (3) 6 months free rent = another $19/SF ÷ 5 = $3.80/SF/yr. Total concession load: $10 + $3.80 + $3.80 = $17.60/SF/yr. NER = $38 − $17.60 = $20.40. The flat renewal wins by ~$9.60/SF/yr for 5 years — roughly $2.9M more value on 60k SF before discounting. Face rent is the wrong anchor; NER is.',
    },
    {
      label:
        'Reject — $38 is market rent and you\'re leaving $8/SF/yr ($2.9M over 5 years) on the table by renewing flat.',
      isBest: false,
      explanation:
        "This compares $30 face rent to $38 face rent while ignoring all re-leasing costs. $8/SF/yr in gross face-rent upside sounds compelling, but $50 TI + 12 months of concessions erases that upside entirely and then some. The correct comparison is NER-to-NER, not face-to-face. Without accounting for re-leasing costs, you will systematically over-count the value of replacing tenants.",
    },
    {
      label:
        'Counter at $34/SF and give $25/SF TI — meet in the middle to keep the tenant and capture some mark-to-market.',
      isBest: false,
      explanation:
        "This is a negotiating instinct, not an economic analysis. A $34/SF counter with $25 TI produces NER ≈ $34 − ($25/5) = $29/SF — marginally below the flat-renewal NER of $30. If TI is required to justify the counter, the counter likely doesn't improve economics over the flat renewal. Run the NER math for any counter before proposing it.",
    },
    {
      label:
        'Accept but demand a 10-year term to lock in the below-market rent as a long-duration cash-flow stream.',
      isBest: false,
      explanation:
        "A 10-year flat lease at $30/SF gross locks in a rent that was already $8 below market at signing. If market rents grow over 10 years, the below-market gap widens — and a long-term flat lease makes it harder to mark to market at the next cycle. A shorter renewal (3–5 years) keeps the mark-to-market option alive sooner. Lock in term only when the economics are favorable over the full period.",
    },
  ],
  takeaway:
    'Renewal economics are almost never as simple as comparing face rents. The right framework is NER: renewal NER vs. replacement NER after all re-leasing costs (TI + free rent + downtime) are amortized. In many markets, a flat or slightly below-market renewal beats a mark-to-market rollover once re-leasing costs are honestly modeled. Always compute before deciding.',
  tips: [
    'Re-leasing cost of thumb: 12–24 months of new gross rent is the typical TI + free-rent + downtime load.',
    "Renewal NER = face rent (since there's usually no TI and no downtime). It's the cleanest number in lease economics.",
    'If the renewal NER exceeds replacement NER, retaining the tenant is the superior economic outcome — regardless of face rent.',
  ],
};
