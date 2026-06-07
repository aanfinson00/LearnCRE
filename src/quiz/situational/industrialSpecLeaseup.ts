import type { SituationalCase } from '../../types/situational';

export const industrialSpecLeaseup: SituationalCase = {
  id: 'industrial-spec-leaseup',
  title: 'How long before a spec building stabilizes into an oversupplied market?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['development', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    'A developer is completing a 500,000 SF spec industrial building. The submarket has 3.2M SF of available industrial space and is absorbing 400,000 SF per quarter. Five competing spec buildings are also delivering this year, adding 2.0M SF of new supply — none with pre-leases. The construction lender requires 80% occupancy to convert to permanent financing.',
  data: [
    { label: 'Subject size', value: '500,000 SF (no pre-leases)' },
    { label: 'Existing submarket availability', value: '3.2M SF' },
    { label: 'Competing new supply (this year)', value: '2.0M SF (5 spec buildings)' },
    { label: 'Quarterly absorption pace', value: '400,000 SF' },
    { label: 'Perm loan trigger', value: '80% occupancy' },
  ],
  question: 'Roughly how long before the subject building hits 80% occupancy?',
  options: [
    {
      label: 'More than 18 months — total available supply (5.2M SF) far outpaces quarterly demand (400K SF), and the subject captures a share of absorption across the whole market, not all of it.',
      isBest: true,
      explanation:
        'Total available supply: 3.2M existing + 2.0M new = 5.2M SF. At 400,000 SF/quarter, the market takes 13 quarters (~3.25 years) to clear all supply. The subject at 500,000 SF represents roughly 10% of total available space; at a pro-rata share of 400,000 SF/quarter, it absorbs ~40,000 SF/quarter — taking 10 quarters just to reach 400,000 SF (80% occupancy). In practice, the first-to-deliver and best-positioned buildings win the early tenants; the last-to-fill building can sit 24+ months past completion. For the construction loan conversion, the developer should model a 24-month interest reserve as a floor.',
    },
    {
      label: 'About 5 months — at 400,000 SF/quarter the subject fills in just over a quarter.',
      isBest: false,
      explanation:
        'Confuses total submarket absorption with absorption to the subject. The 400,000 SF/quarter is spread across all 5.2M SF of available supply — not directed exclusively to this building. The subject\'s pro-rata share of quarterly demand is roughly 40,000 SF, putting full lease-up far beyond 5 months.',
    },
    {
      label: 'About 3 quarters — each spec building gets a fair share of demand.',
      isBest: false,
      explanation:
        'The "equal share" assumption is optimistic. Large tenants often pre-commit to the first or best-positioned building; the last buildings to deliver in an oversupplied market see dramatically longer lease-up periods. A simultaneous delivery of 6 spec buildings without pre-leases creates direct competition for the same demand pool, with the laggard waiting the longest.',
    },
    {
      label: 'It depends on rents — if the developer drops rents 15%, absorption will accelerate materially.',
      isBest: false,
      explanation:
        'Rent cuts help at the margin but don\'t solve a supply-demand imbalance. In a market where 6 spec buildings are competing simultaneously, a 15% rent cut by one typically forces the others to follow — creating a race to the bottom that extends the low-rent period beyond the original timeline. Rent cuts should be modeled as a sensitivity, not a solution.',
    },
  ],
  takeaway:
    'Spec industrial lease-up timing starts with supply/demand math: total available supply ÷ quarterly absorption pace = quarters to clear the market. The subject captures a share of that demand — not all of it. In a heavily supplied market, late-to-fill buildings can sit empty 18–24+ months beyond the most optimistic plan. Size the interest reserve to absorb the full lease-up period; never assume pro-rata demand sharing.',
  tips: [
    'Market clearing time: total available supply ÷ quarterly absorption. Subject captures its share, not the total.',
    'Last-building-to-fill problem: in oversupply, the weakest-positioned asset waits longest for tenants.',
    'Spec construction interest reserve: size for 18–24 months past completion, minimum.',
  ],
};
