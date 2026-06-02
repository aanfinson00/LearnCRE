import type { SituationalCase } from '../../types/situational';

export const leaseEconEffectiveRent: SituationalCase = {
  id: 'lease-econ-effective-rent',
  title: "Face rent went up $4/SF — did the deal actually get better?",
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "A 4,500 SF Class-B office tenant just signed a 7-year renewal at $38/SF full-service gross. The deal includes 8 months of free rent plus a $45/SF TI allowance. The prior deal (expiring now) was $34/SF full-service gross over 5 years with a $20/SF TI allowance and no free rent. Your asset manager is celebrating the $4/SF face-rent increase and calling it a 'strong renewal.'",
  data: [
    { label: 'Tenant SF', value: '4,500 SF' },
    { label: 'New deal', value: '$38/SF FSG · 7 years · 8 months free rent · $45/SF TI' },
    { label: 'Prior deal', value: '$34/SF FSG · 5 years · no free rent · $20/SF TI' },
    { label: 'Lease structure', value: 'Full-service gross (FSG) — landlord pays OpEx' },
  ],
  question:
    "Calculate the effective net rent on both deals and determine whether the renewal actually improved the landlord's economics.",
  options: [
    {
      label:
        "New deal effective rent ≈ $27.95/SF/yr; prior deal effective rent = $30.00/SF/yr. The renewal looks worse for the landlord despite the $4/SF face-rent increase. New deal: gross rent over 7 years = $38 × 7 = $266/SF; minus 8 months free rent = $38 × (8/12) = $25.33/SF; minus TI = $45/SF; net = $195.67/SF ÷ 7 = $27.95/SF/yr. Prior deal: ($34 × 5 − $20) / 5 = $150/5 = $30/SF/yr. The 12% face-rent increase is more than erased by the free rent and TI package.",
      isBest: true,
      explanation:
        "Effective rent strips away one-time concessions to find the true annual net landlord yield. New: ($38 × 7 − free rent $25.33 − TI $45) / 7 = ($266 − $25.33 − $45) / 7 = $195.67 / 7 = $27.95/SF/yr. Prior: ($34 × 5 − $20) / 5 = $150 / 5 = $30/SF/yr. The 7-year term reduces the per-year amortization of concessions (slightly favorably), but the larger free rent and TI package more than offset the term benefit and the $4/SF rate increase. This is a common trap in office leasing: market conditions require bigger concession packages even as face rents hold or rise nominally.",
    },
    {
      label:
        "Effective rent = $38/SF on the new deal since that's the contract rate — free rent and TI are one-time items that aren't part of the ongoing lease economics.",
      isBest: false,
      explanation:
        "Free rent and TI are absolutely part of the lease economics — they reduce total net revenue the landlord collects over the lease term. Ignoring them overstates the landlord's return by $10/SF/yr on the new deal. This is exactly why effective rent (or 'net effective rent') exists as a metric: to normalize concession-heavy deals against simpler structures.",
    },
    {
      label:
        "Effective rent ≈ $31.57/SF — subtract the amortized TI ($45/7 = $6.43) from face rent ($38), and ignore the free rent since it's already in the rearview mirror.",
      isBest: false,
      explanation:
        "Free rent is not 'in the rearview' — it's a cost that will be incurred upfront in year 1. When calculating effective rent from a deal-signing perspective, both the free rent and the TI must be amortized over the lease term to arrive at the true annual yield. Ignoring free rent understates the total concession cost by $25/SF.",
    },
    {
      label:
        "The two deals can't be compared because one is 7 years and one is 5 years — longer terms always produce different effective rent calculations.",
      isBest: false,
      explanation:
        "Term length is exactly why you amortize — dividing total net economics by the term length normalizes for different durations and produces an annual per-SF figure that is directly comparable. The fact that the terms differ is not a barrier to comparison; it's the reason you do the effective-rent calculation in the first place.",
    },
  ],
  takeaway:
    "Effective rent = (gross rent over term − free rent − TI allowance) ÷ term length. Face rent is a headline number; effective rent is what the landlord actually earns per SF per year after concessions. In soft markets, face rent is often held artificially high while landlords compete on concession packages — effective rent is the tool that cuts through the noise. A rising face rent with a bigger concession package can, and often does, produce a *lower* effective rent.",
  tips: [
    "Quick formula: effective rent = (face rent × years − free rent months × face rent/12 − TI) ÷ years.",
    "A $1/SF increase in TI on a 7-year deal costs the landlord $0.14/SF/yr in effective rent — small per year, large in total.",
    "When a broker touts a 'face rent record,' always ask for the concession package before celebrating.",
  ],
};
