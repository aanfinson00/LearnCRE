import type { SituationalCase } from '../../types/situational';

export const retailAnchorTenantDeparture: SituationalCase = {
  id: 'retail-anchor-tenant-departure',
  title: 'Retail: the grocery anchor just announced it\'s going dark — how does pricing change?',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You're 60 days into diligence on a $28M grocery-anchored community center. The grocery anchor (45,000 SF, 30% of GLA) has 4 years left on its lease at $14/SF NNN with no renewal option. Yesterday you learned the chain filed Chapter 11. The in-line shop tenants (remaining 70% of GLA) have co-tenancy clauses that let them reduce rent by 20–30% if the anchor goes dark. T-12 NOI was $1.68M; the asking price implies a 6.0% cap.",
  data: [
    { label: 'Asking price', value: '$28M (6.0% cap)' },
    { label: 'T-12 NOI', value: '$1.68M' },
    { label: 'Anchor (grocery)', value: '45,000 SF, $14/SF NNN, 4 yrs remaining' },
    { label: 'Anchor contribution to NOI', value: '~$630k/yr base rent' },
    { label: 'In-line GLA', value: '70% of 150,000 SF = 105,000 SF' },
    { label: 'Co-tenancy clause', value: '20–30% rent reduction if anchor dark' },
    { label: 'In-line total rent (T-12)', value: '~$1.05M/yr' },
  ],
  question: 'How does the bankruptcy filing change your underwriting and bid, if at all?',
  options: [
    {
      label:
        'Re-underwrite NOI assuming the anchor goes dark: lose the $630k anchor rent, apply a 25% co-tenancy reduction to in-line (~$263k), and add a re-leasing reserve for the anchor box. Stabilized NOI drops to roughly $757k — at a market cap of 7.5–8.0% on distressed retail, value is $9.5–$10M, not $28M. Either walk or wait for a post-bankruptcy restructuring that reduces the ask.',
      isBest: true,
      explanation:
        "This is the right framework. The anchor's departure creates a cascade: (1) anchor rent loss ~$630k, (2) co-tenancy rent reductions on in-lines ~$263k (midpoint 25% × $1.05M), (3) likely in-line vacancy from co-tenancy-triggered lease terminations, (4) re-leasing cost (TI + LC + free rent) to backfill 45,000 SF. The stabilized NOI without the anchor is closer to $757k on today's in-line rents before any further vacancy. At 7.5–8.0% distressed retail caps, that's $9.4–10.1M of value — a ~65% discount to ask. The only reason to bid is a credible re-leasing plan (e.g., you have a letter of intent from a replacement anchor) that changes the denominator.",
    },
    {
      label:
        "The anchor has 4 years left on its lease, so you're protected for 4 years even in bankruptcy — price off the existing NOI with a slight premium for the bankruptcy risk.",
      isBest: false,
      explanation:
        "Bankruptcy leases can be rejected in Chapter 11, removing the contractual obligation immediately regardless of remaining term. The debtor-in-possession (and later the estate) will reject leases that are a liability (i.e., above-market rents in a dark box). A grocery tenant paying $14/SF NNN when the box is dark is almost certainly a rejected lease within 12–18 months. You cannot underwrite 4 years of anchor rent as protected cash flow once a Chapter 11 is filed.",
    },
    {
      label:
        'Negotiate a price reduction of ~10% ($2.8M) to reflect the bankruptcy risk and proceed to closing — the in-line tenants still have leases and the NOI is mostly intact.',
      isBest: false,
      explanation:
        'A 10% reduction gets you to $25.2M on an asset that, under the anchor-dark scenario, is worth ~$10M. The in-line rent is not mostly intact once co-tenancy kicks in — you lose the anchor rent plus 20–30% of in-line rent, plus you have a 45,000 SF dark box with no income and ongoing operating costs (taxes, insurance, maintenance). The math doesn\'t close at $25M.',
    },
    {
      label:
        'Ask for a 60-day extension, wait for the bankruptcy outcome, and re-evaluate if the anchor confirms it will stay.',
      isBest: false,
      explanation:
        'Patience is reasonable but waiting passively is not a complete answer. You still need a revised underwriting model that prices the anchor-departure scenario, because the seller will likely re-launch at a price that still prices in some anchor assumption. Entering an extension without your own clear bid range leaves you exposed to a seller who uses the extension to shop the asset to other buyers while you wait.',
    },
  ],
  takeaway:
    "Grocery-anchored retail value is almost entirely a function of the anchor's health. Co-tenancy clauses are the transmission mechanism by which anchor distress spreads to in-line rent — the cascade is anchor rent loss → co-tenancy rent reductions → in-line vacancy. Underwriting a Chapter 11 filing requires a NOI rebuild from the bottom up under the anchor-dark scenario, not a percentage haircut to the T-12. If your restated NOI supports a materially lower bid, that's the right answer even if it means walking.",
  tips: [
    "Bankruptcy lease rejection under 11 U.S.C. § 365 can happen on 60 days' notice; 'years remaining on the lease' is not protection once Chapter 11 is filed.",
    'Co-tenancy clauses vary: some trigger only if the anchor is dark for 90+ days; others trigger at filing. Read the actual lease language.',
    'The re-leasing reserve for a 45k SF anchor box (TI: $30–50/SF + LC + free rent) can easily be $2–3M — model it as a capital cost, not an operating expense.',
  ],
};
