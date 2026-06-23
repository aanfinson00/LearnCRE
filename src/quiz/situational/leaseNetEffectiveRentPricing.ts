import type { SituationalCase } from '../../types/situational';

export const leaseNetEffectiveRentPricing: SituationalCase = {
  id: 'lease-net-effective-rent-pricing',
  title: 'NER vs. face rent — which comp wins?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    "Two recent office leases are being presented as rent comps for a renewal negotiation. Lease A: $40/SF face rent, 12 months free rent, $60/SF TI allowance, 7-year term. Lease B: $35/SF face rent, no free rent, $20/SF TI allowance, 5-year term. The broker argues Lease A is the superior comp because face rent is $5 higher.",
  data: [
    { label: 'Lease A', value: '$40/SF face · 12 mo free · $60/SF TI · 7-yr' },
    { label: 'Lease B', value: '$35/SF face · no free rent · $20/SF TI · 5-yr' },
    { label: 'Broker argument', value: 'Lease A > Lease B ($40 > $35 face)' },
    { label: 'Simplified NER check (Lease A)', value: '($40 × 72 mo − $60 TI) ÷ 84 mo ≈ $33.6/SF/yr' },
    { label: 'Simplified NER check (Lease B)', value: '($35 × 60 mo − $20 TI) ÷ 60 mo ≈ $34.7/SF/yr' },
  ],
  question: 'Which lease has the higher net effective rent and what does it mean for the negotiation?',
  options: [
    {
      label: "Lease B has the higher NER (~$34.7 vs. ~$33.6/SF). Free rent and TI allowances erode Lease A's economic return despite its higher face. The renewal should anchor to Lease B's NER, not Lease A's face rent.",
      isBest: true,
      explanation:
        "NER strips out the concession package to show what the landlord actually collects over the lease term. Lease A: 72 paying months × $40 = $2,880/SF gross; minus $60 TI = $2,820; per year over 7 years = $402.9/yr per SF. Lease B: 60 paying months × $35 = $2,100; minus $20 TI = $2,080; per year over 5 years = $416/yr per SF. Lease B's landlord earns more per year despite the lower face rent. The broker's face-rent comparison flatters a lease with heavy concessions — exactly the dynamic NER is designed to correct.",
    },
    {
      label: "Lease A is the better comp — $40 face rent sets the market benchmark and NER is too complex to explain to tenants.",
      isBest: false,
      explanation:
        "Market rents tracked as face rents can diverge materially from economic returns when concession packages vary. Tenants understand face rent; landlords must also track NER. Anchoring renewals to face rent without adjusting for concessions means accepting below-market economics on the theory that the headline number looks good. That's how soft markets produce stagnant NER alongside stable headline rents.",
    },
    {
      label: "Both leases are equivalent — the market sets face rent and concessions together, so NER equilibrates naturally.",
      isBest: false,
      explanation:
        "In competitive markets, NER does tend toward equilibrium over time — but face rents and concession levels frequently diverge during transitions. In softening markets, landlords hold face rents sticky while growing concessions (to avoid cutting published sticker prices). That divergence is exactly why NER tracking exists: it surfaces the real economics when face-rent signals are misleading.",
    },
    {
      label: "The TI allowance is a capital expenditure, not a rent variable — it shouldn't affect the NER comparison.",
      isBest: false,
      explanation:
        "TI allowances are out-of-pocket landlord costs that reduce the economic return from the lease. Including them in the NER calculation is the point — they're part of the total concession package the landlord offers to win the tenant. Comparing face rents while ignoring TIs is like comparing purchase prices while ignoring closing costs: the headline looks clean but the economics don't.",
    },
  ],
  takeaway:
    "Face rent is a marketing metric; net effective rent (NER) is the economic metric. NER nets out free rent and TI allowances to show actual landlord return per year. In competitive or softening markets, face rents can stay high while NER falls as concessions rise — NER is the metric that cuts through the window dressing.",
  tips: [
    "NER = (face rent × paying months − TI) ÷ total lease term (months), annualized.",
    "High face rent + heavy concessions often yields lower NER than moderate face rent + light concessions.",
    "Always ask for the full concession package (free rent, TI, parking abatement) when sourcing rent comps.",
  ],
};
