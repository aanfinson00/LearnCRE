import type { SituationalCase } from '../../types/situational';

export const retailLeaseUpPacing: SituationalCase = {
  id: 'retail-lease-up-pacing',
  title: 'New strip center: is 18-month stabilization realistic?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'retail',
  scenario:
    "You're reviewing a development proforma for a 120,000 SF open-air strip center in a suburban submarket. The sponsor underwrites 18-month stabilization from CO (certificate of occupancy) to 95% leased. The anchor (40,000 SF grocery) is pre-leased and dark during construction. The remaining 80,000 SF of inline and junior anchor space is unleased. Comparable strip centers in the submarket have taken 24–36 months to hit 90%+ occupancy post-opening. Local submarket retail vacancy is 9%, and three new centers of similar size delivered in the last 4 years — none have reached 95% within 18 months.",
  data: [
    { label: 'Total GLA', value: '120,000 SF' },
    { label: 'Anchor (pre-leased)', value: '40,000 SF grocery' },
    { label: 'Inline + junior anchor (unleased)', value: '80,000 SF' },
    { label: 'Sponsor stabilization target', value: '18 months from CO' },
    { label: 'Submarket retail vacancy', value: '9%' },
    { label: 'Comparable lease-up precedents', value: '24–36 months to 90%+; zero examples under 18 months' },
  ],
  question:
    "What's the most defensible adjustment to the sponsor's stabilization underwriting, and why?",
  options: [
    {
      label:
        'Push stabilization to 28–30 months and model a more gradual rent ramp: the comparable lease-up data (24–36 months for 90%+ on similar centers) is the primary calibration point. No comps under 18 months means the sponsor\'s projection lacks evidentiary support. Model 75% occupancy at month 18 and full stabilization at month 30, with free rent averaging 6 months for inline tenants and 3–4 months for junior anchors.',
      isBest: true,
      explanation:
        'Right approach. When four directly comparable situations all fall outside the sponsor\'s projection range, the sponsor\'s number — not the comps — needs to justify itself. Retail lease-up is driven by the anchor\'s draw (grocery anchor is strong), but inline tenants sign sequentially, not simultaneously. A realistic 80,000 SF lease-up in an emerging center involves 8–15 LOIs processed over 18–30 months, averaging 2–4 deals per quarter. 28–30 months to stabilize inline space is well within the comparable range.',
    },
    {
      label:
        'Accept the 18-month stabilization — the grocery anchor is a strong demand generator and 9% submarket vacancy signals a healthy leasing environment for junior anchor and inline tenants.',
      isBest: false,
      explanation:
        'The anchor draw is real but not sufficient. Grocery anchors generate traffic, which helps inline tenants\'s sales but does not shorten the *leasing process* — tenants still need to negotiate, sign, build out, and open. 9% vacancy is moderately healthy (8–12% is typical for functional retail markets) but four comparable deliveries with 0% achieving 18-month stabilization is disqualifying precedent. Use the comps.',
    },
    {
      label:
        "Extend stabilization to 36 months — if no comp has hit 95% in 24 months, 18 months is clearly wrong and you should add a full cycle of buffer.",
      isBest: false,
      explanation:
        'Overcorrects. The comps hit 90%+ by 24–36 months, which means the range is 24–36, not necessarily 36 at the floor. The target here is 95% (slightly higher than comp observation of 90%+), which might add a few months but doesn\'t justify jumping to 36 without further justification. The 28–30 month estimate anchors to the mid-range of comps and targets 95% — more conservative than accepting 18 months, but not the maximum conservative case.',
    },
    {
      label:
        'The stabilization timeline is less important than the inline rent rate — if the sponsor is achieving market rents, the occupancy ramp is a timing adjustment that doesn\'t materially affect underwriting.',
      isBest: false,
      explanation:
        'This is wrong as a general principle. Stabilization timing directly affects: (1) interest carry during lease-up, (2) when the stabilized NOI begins for refi or sale purposes, (3) cash yield during the hold, and (4) LP capital call timing. A 12-month delta in stabilization at a 6% cap on a 120,000 SF center can shift the development spread by 50–100 bps and meaningfully affect levered returns.',
    },
  ],
  takeaway:
    'Retail lease-up projections must be anchored to comparable transaction data, not sponsor optimism. The standard calibration: identify 3–5 centers of similar size, anchor type, and submarket, and observe their actual time-to-stabilization. If the sponsor\'s projection is outside the observable range, require a deal-specific thesis for why this center is different. Grocery-anchored centers do lease up faster than unanchored, but the inline lease-up process still takes 24–36 months in most cases.',
  tips: [
    'Grocery anchor = strong traffic driver but does not compress the tenant negotiation and build-out timeline for inline spaces.',
    'Inline tenant deals take 3–9 months from LOI to opening; run 8–15 deals sequentially to fill 80,000 SF of inline space.',
    '9% retail vacancy is healthy but not tight; "available space" and "landlord negotiating leverage" are different things.',
    'Budget 4–8 months of free rent for inline tenants and 3–5 months for junior anchors in a new development context.',
  ],
};
