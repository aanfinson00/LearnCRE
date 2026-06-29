import type { SituationalCase } from '../../types/situational';

export const industrialBigBoxReabsorption: SituationalCase = {
  id: 'industrial-bigbox-reabsorption',
  title: 'Single-tenant departure — how long to re-lease?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'industrial',
  scenario:
    'You own a 500,000 SF Class-A industrial building 100% occupied by a single tenant whose lease expires in 6 months. The tenant has confirmed departure. The submarket has 8.0M SF of total inventory currently at 4% vacancy (320K SF vacant). Historical net absorption has averaged 200K SF per quarter. Three new speculative buildings totaling 1.2M SF are scheduled to deliver over the next 12 months.',
  data: [
    { label: 'Subject size', value: '500,000 SF (departing single tenant)' },
    { label: 'Submarket inventory', value: '8.0M SF' },
    { label: 'Current vacancy', value: '4% (320K SF)' },
    { label: 'Net absorption', value: '200K SF/qtr average' },
    { label: 'New spec deliveries (12 mos)', value: '+1.2M SF' },
  ],
  question: 'What is the realistic re-leasing timeline for the subject building?',
  options: [
    {
      label: 'Model 18–24 months to re-lease. When the subject delivers vacant, total vacancy jumps to ~820K SF. Adding 1.2M SF of new spec brings combined available supply to ~2.0M SF. At 200K SF/qtr absorption, clearing to prior vacancy levels takes ~10 quarters — and big-box space (500K SF) re-leases slower than the market average because the tenant universe is thinner.',
      isBest: true,
      explanation:
        'Step 1: add the subject to the vacancy pool — 320K existing + 500K subject = 820K SF vacant. Step 2: layer in new spec deliveries — 820K + 1,200K = 2.02M SF total available. Step 3: at 200K SF/qtr market absorption, the supply-to-absorption ratio is 10 quarters. But 500K SF blocks attract fewer tenants than 50K SF blocks; deal negotiations are longer; build-out lead time is longer. Applying a large-block lag factor, 18–24 months is conservative but defensible. Underwriting 12 months would systematically understate lease-up risk.',
    },
    {
      label: 'About 6 months — the market absorbs 200K SF per quarter, so 500K SF clears in under 3 quarters.',
      isBest: false,
      explanation:
        '200K SF/qtr is market-wide absorption, not specific to your building. It doesn\'t mean 500K SF will absorb in 2.5 quarters. You\'re adding 500K SF on top of the existing supply — plus 1.2M SF of new spec — all competing for the same tenant demand. The supply shock is four times larger than the simplistic math implies.',
    },
    {
      label: 'The submarket is tight at 4% vacancy, so re-leasing will happen quickly — assume 9 months at most.',
      isBest: false,
      explanation:
        '4% is the current vacancy before your building delivers and before new spec comes online. After those events, effective vacancy jumps from 4% to ~25% on a pro-forma basis. "Tight market" reasoning must update for known supply changes; treating the pre-event condition as the underwriting condition systematically understates lease-up time.',
    },
    {
      label: 'Lease-up timing can\'t be estimated without knowing specific tenant demand — leave the line blank and revisit.',
      isBest: false,
      explanation:
        'Refusing to model lease-up timing is not an acceptable underwriting position. You can\'t underwrite reserves, debt service coverage, or IRR without a re-leasing assumption. The right approach is a base case (18–24 months), a bull case (12 months), and a bear case (30+ months) with documented sensitivities.',
    },
  ],
  takeaway:
    'Single-tenant departures require a fresh supply/demand analysis from scratch — "current market vacancy" doesn\'t reflect what happens when your space is added to the pool and new supply delivers simultaneously. Always add the subject to the vacancy count, layer in known coming supply, and divide by absorption pace before committing to a re-leasing assumption.',
  tips: [
    'Supply months = total vacancy ÷ quarterly absorption — this is your lease-up buffer.',
    'Large blocks (>200K SF) re-lease slower: the tenant universe is thinner and deal negotiations take longer.',
    'Budget downtime reserves, re-leasing commissions, and TIs for the vacant period in the underwriting.',
  ],
};
