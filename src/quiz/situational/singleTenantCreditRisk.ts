import type { SituationalCase } from '../../types/situational';

export const singleTenantCreditRisk: SituationalCase = {
  id: 'single-tenant-credit-risk',
  title: 'Your net-lease tenant just got downgraded — how does that reprice the asset?',
  category: 'risk',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement', 'portfolioManager'],
  assetClass: 'retail',
  scenario:
    'You own a single-tenant NNN retail box leased to a national drugstore chain at $2.1M NOI per year. You paid a 5.0% going-in cap ($42M) two years ago when the tenant had a BBB credit rating and 12 years of lease term remaining. The tenant was just downgraded to BB+ (below investment grade), and now has 10 years of term remaining.',
  data: [
    { label: 'Original purchase price', value: '$42M (5.0% cap, BBB tenant)' },
    { label: 'Current NOI', value: '$2.1M/year (unchanged)' },
    { label: 'Remaining lease term', value: '10 years' },
    { label: 'Tenant credit change', value: 'BBB → BB+ (below investment grade)' },
    { label: 'Investment-grade NNN spread', value: '5.0–5.5% in current market' },
    { label: 'Sub-IG NNN spread', value: '6.5–7.5% in current market' },
  ],
  question: 'How has the credit downgrade affected asset value and your exit options?',
  options: [
    {
      label:
        'The asset has repriced materially: apply 6.5–7.5% cap to the unchanged NOI → implied value of $28–32M, a $10–14M loss on $42M cost. Buyers of sub-IG NNN narrowed significantly; a sale now crystalizes the loss. If you can hold 10 years to natural lease expiry and then re-lease at current rates, a hold strategy may outperform a distressed sale.',
      isBest: true,
      explanation:
        'NNN cap rates are fundamentally a function of (1) lease term remaining and (2) tenant credit quality. Both deteriorated: term fell from 12→10 years and credit fell from BBB→BB+. The market cap for sub-IG NNN is 150–250 bps wider than investment-grade. At 6.5% cap: $2.1M / 0.065 = $32.3M. At 7.5%: $2.1M / 0.075 = $28M. You\'ve lost $10–14M of equity value. Hold vs. sell depends on re-leasing prospects at expiry and your cost of capital vs. the imputed return of cutting losses now.',
    },
    {
      label:
        'The NOI hasn\'t changed so the value is still $42M — credit ratings don\'t affect in-place income.',
      isBest: false,
      explanation:
        'Income is the same but perceived durability dropped. NNN buyers price credit risk because the lease is the *entire* return — there\'s no multi-tenant diversification. A BB+ tenant is more likely to default, renegotiate, or close stores before the lease expires. The market pays less for that income stream, mechanically widening the cap and compressing value.',
    },
    {
      label:
        'Immediately execute a sale-leaseback structure to reset the lease and improve pricing.',
      isBest: false,
      explanation:
        'A sale-leaseback isn\'t available here — you\'re already the owner and the tenant owns the business, not the building. Sale-leasebacks are a tool the *tenant* executes with a *new* buyer, not a remedy for an existing investor who already owns the asset.',
    },
    {
      label:
        'Refinance the asset before the downgrade is reflected in lender credit files — lock in favorable debt and buy time.',
      isBest: false,
      explanation:
        'Refinancing may provide liquidity, but lenders will re-underwrite tenant credit at closing. A sub-IG tenant on a 10-year lease will produce a smaller loan than a BBB tenant at 12 years — the refi may not improve your position materially. Also, using debt to defer credit risk doesn\'t resolve the equity loss; it just loads the asset with leverage.',
    },
  ],
  takeaway:
    'Single-tenant NNN assets are pure credit plays. When the tenant\'s credit deteriorates, the asset reprices even if NOI is unchanged — because buyers discount the probability that the income stream survives the full lease term. Before buying a single-tenant NNN, stress-test the impact of a 1–2 notch downgrade on exit cap and implied value.',
  tips: [
    'Investment-grade NNN (BBB- or above): tight cap, deep buyer pool, bond-like pricing.',
    'Sub-investment-grade NNN (BB+ or below): cap widening of 150–300 bps is common, buyer pool thins sharply.',
    'Hold vs. sell calc: NPV of holding (discounted remaining lease cash flows + re-leasing scenario) vs. net sale proceeds today.',
    'Credit event is an early-warning trigger — monitor tenant quarterly earnings for same-store sales and store closure signals.',
  ],
};
