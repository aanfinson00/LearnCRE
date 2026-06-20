import type { SituationalCase } from '../../types/situational';

export const absorptionVsDeliveries: SituationalCase = {
  id: 'absorption-vs-deliveries',
  title: 'Deliveries are running 3× absorption — do you still build?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You are evaluating a ground-up industrial development in a Sun Belt submarket. The project is a 500,000 SF bulk distribution facility with a projected 18-month lease-up. CoStar data for the submarket shows 4.2M SF of new deliveries expected over the next 24 months, while trailing-12-month net absorption is 1.4M SF. Current vacancy is 6.5%.',
  data: [
    { label: 'Project size', value: '500,000 SF' },
    { label: 'Projected lease-up', value: '18 months' },
    { label: 'Submarket deliveries (next 24 mos)', value: '4.2M SF' },
    { label: 'Trailing-12 net absorption', value: '1.4M SF' },
    { label: 'Current vacancy', value: '6.5%' },
  ],
  question: 'How do the supply/demand dynamics affect the development underwriting?',
  options: [
    {
      label:
        'Supply is running 3× trailing absorption — vacancy will rise materially before the project delivers. Your 18-month lease-up is optimistic; either extend the timeline, stress-test rent at a 10–15% discount to today\'s asking rents, or require a pre-lease commitment before breaking ground.',
      isBest: true,
      explanation:
        'At 1.4M SF of annual absorption and 4.2M SF of supply over 24 months, the submarket is absorbing only 2.8M SF over that window against 4.2M SF of new product — a net supply gap of ~1.4M SF. Vacancy, currently at 6.5%, will likely rise 200–400 bps before the market rebalances. Your 500,000 SF project competes directly with the new deliveries for the same demand pool. An 18-month lease-up assumes you capture a disproportionate share of a slowing market. Pre-leasing or extended timeline is the discipline; underwriting at today\'s asking rents without a rent concession buffer is aggressive.',
    },
    {
      label:
        'Industrial demand is structural — e-commerce and nearshoring will absorb the supply. Proceed at current underwriting.',
      isBest: false,
      explanation:
        'Structural demand tailwinds are real but they are already reflected in trailing absorption. If trailing absorption were 4.2M SF, the supply picture would be neutral. At 1.4M SF trailing, the gap is specific and quantifiable. Using a macro thesis to override a local supply/demand mismatch is how development deals blow up.',
    },
    {
      label:
        'Check whether competing deliveries are pre-leased — if 70%+ are pre-leased, net unabsorbed supply is lower.',
      isBest: false,
      explanation:
        'True and useful — but it\'s a diligence step, not an answer. Even if competing deliveries are partially pre-leased, the total unleased overhang could still exceed trailing absorption. This is the right question to ask next, not a reason to affirm the original underwriting.',
    },
    {
      label:
        'The 18-month lease-up already has 6 months of buffer — a 24-month lease-up is acceptable for a project of this size.',
      isBest: false,
      explanation:
        'The 18-month assumption was presumably set relative to the current 6.5% vacancy environment. In a market trending to 9–10% vacancy, the assumption needs to be reset from first principles, not padded with an arbitrary buffer. The right lease-up period follows from where vacancy settles and how quickly it recovers, not from adding months to a number built for different market conditions.',
    },
  ],
  takeaway:
    'Supply-to-absorption ratio is the development underwriter\'s primary market stress indicator. When deliveries materially exceed trailing absorption, vacancy will rise during the lease-up window — meaning your project faces tougher conditions than today\'s market implies. Either pre-lease, price in concessions, or extend the timeline to when the market has had time to rebalance.',
  tips: [
    'Delivery-to-absorption ratio >1.5× over the next 24 months is a yellow flag; >2× is a red flag.',
    'Ask the broker for the pre-leased percentage of competing deliveries before finalizing the lease-up schedule.',
    'Stress vacancy at +200 bps above current and +300 bps as a downside; see where rent and NOI land.',
  ],
};
