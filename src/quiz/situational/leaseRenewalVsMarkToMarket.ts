import type { SituationalCase } from '../../types/situational';

export const leaseRenewalVsMarkToMarket: SituationalCase = {
  id: 'lease-renewal-vs-mark-to-market',
  title: 'Renew below-market or roll to market rents?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  scenario:
    'Your anchor tenant occupies 50,000 SF NNN at $18/SF with 2 years remaining on their lease. Market rents in the submarket are $26/SF NNN. The tenant wants a 5-year renewal at $21/SF with no tenant improvement allowance. Replacing this tenant in a 14%-vacant submarket would require $30/SF TI, 4 months of downtime, and a new 7-year lease at market ($26/SF). Your discount rate is 8%.',
  data: [
    { label: 'Tenant size', value: '50,000 SF NNN' },
    { label: 'In-place rent', value: '$18/SF' },
    { label: 'Lease term remaining', value: '2 years' },
    { label: 'Tenant offer: renewal rent', value: '$21/SF for 5 years (no TI)' },
    { label: 'Market rent (replacement)', value: '$26/SF NNN' },
    { label: 'Replacement TI', value: '$30/SF' },
    { label: 'Replacement downtime', value: '4 months' },
    { label: 'Replacement lease term', value: '7 years at market' },
    { label: 'Discount rate', value: '8%' },
  ],
  question: 'Should you accept the $21/SF renewal or push for market rent at the risk of losing the tenant?',
  options: [
    {
      label: 'Accept the renewal — the $1.5M TI cost and 4 months of lost rent (~$433k) at replacement make the in-place economics superior for years 1–3; $21/SF NNN for 5 years beats the NPV of the replacement scenario.',
      isBest: true,
      explanation:
        'Replacement cost: TI = 50,000 × $30 = $1.5M. Lost rent for 4 months = 50,000 × $26 × (4/12) = $433k. Total leasing cost ≈ $1.93M. Replacement benefit: $26 vs. $21/SF = $5/SF × 50,000 SF = $250k/yr extra rent over 7 years. PV of $250k/yr for 7 yrs at 8% ≈ $1.31M. Net value of rolling to market: $1.31M − $1.93M ≈ −$620k. The renewal at $21/SF is economically superior by ~$620k on a present-value basis. You also eliminate rollover risk in a 14%-vacant submarket.',
    },
    {
      label: 'Reject the renewal and re-let at market — $26/SF vs $21/SF over a 7-year lease is a $1.75M difference that more than covers TI and downtime.',
      isBest: false,
      explanation:
        'This overstates the benefit by using undiscounted dollars. $1.75M in additional rent is spread over 7 years ($250k/yr); its PV at 8% is ~$1.31M. The cost to replace is $1.5M TI + $433k downtime = $1.93M. The NPV of the trade is negative. Additionally, assuming you find a market-rate tenant in a 14%-vacant submarket within 4 months may be optimistic.',
    },
    {
      label: 'Counter-propose $24/SF NNN with $10/SF TI — split the difference to keep the tenant while capturing some mark-to-market upside.',
      isBest: false,
      explanation:
        'Splitting the difference may feel pragmatic, but the math shows the renewal is already the better economic outcome. Offering TI at $24/SF reduces your NPV further. Counter-proposals should be informed by the actual leasing economics, not splitting for its own sake.',
    },
    {
      label: 'It depends entirely on your hold period — if you are selling in 2 years, roll to market to maximize sale NOI.',
      isBest: false,
      explanation:
        'If you are selling in 2 years with the tenant on a 5-year renewal at $21/SF, buyers see 3 years of remaining term on a below-market lease — which typically trades at a discount to market rent, not a premium. The sale scenario actually penalizes you for the sub-market rent. Renewal at $21/SF may still be preferable to a vacant building at sale.',
    },
  ],
  takeaway:
    'Lease renewal vs. re-letting is an NPV problem: PV of the rent gap versus leasing costs (TI + downtime). In most cases, below-market renewals win when TI and vacancy drag are large relative to the annual rent differential. The leasing cost tends to dominate in the near term.',
  tips: [
    'Shortcut: if (TI + downtime cost) > PV of (market rent − renewal rent) over replacement term, take the renewal.',
    'Downtime is often underestimated — 14% submarket vacancy means competition for tenants is high and re-leasing may take longer.',
    'Weighted-average lease term after the transaction matters for valuation: a 5-year renewal term adds term to WALT, supporting cap rate compression at sale.',
  ],
};
