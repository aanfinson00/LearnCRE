import type { SituationalCase } from '../../types/situational';

export const noiComponentDiagnostic: SituationalCase = {
  id: 'noi-component-diagnostic',
  title: 'The T-12 NOI looks too good — what\'s in it?',
  category: 'diagnostic',
  difficulty: 'beginner',
  roles: ['acquisitions', 'mortgageUw'],
  scenario:
    'A seller provides a trailing-12-month (T-12) operating statement showing $1,800,000 of NOI on a 40,000 SF retail strip center. Gross revenues are reported as $2,300,000. You notice two line items that seem unusual: (1) "Lease termination fees" of $150,000, and (2) "Insurance recovery — roof damage" of $80,000. Operating expenses are $500,000.',
  data: [
    { label: 'Reported gross revenue (T-12)', value: '$2,300,000' },
    { label: 'Operating expenses', value: '$500,000' },
    { label: 'Reported NOI', value: '$1,800,000' },
    { label: 'Lease termination fees (included in revenue)', value: '$150,000' },
    { label: 'Insurance recovery — roof damage (in revenue)', value: '$80,000' },
    { label: 'Recurring base rent + CAM reimbursements', value: '$2,070,000 (implied)' },
  ],
  question: 'How should you treat the lease termination fees and insurance recovery when underwriting NOI?',
  options: [
    {
      label: 'Exclude both from underwriting NOI — they are non-recurring items. Adjusted NOI = $1,800,000 − $150,000 − $80,000 = $1,570,000. Use the adjusted figure for cap rate pricing.',
      isBest: true,
      explanation:
        'Lease termination fees and insurance recoveries are one-time events that will not repeat in a normal operating year. Including them in NOI inflates the figure used for cap rate pricing, which overstates the asset\'s value. The correct underwriting NOI is the stabilized, recurring revenue minus recurring operating expenses. Adjusted NOI: $2,300k − $150k − $80k = $2,070k recurring revenue − $500k OpEx = $1,570k. Applied to a 6.5% cap: $1,570k ÷ 0.065 = $24.2M vs. $27.7M on the inflated figure — a $3.5M overstatement.',
    },
    {
      label: 'Include both — the seller collected the cash and it is part of the 12-month operating history.',
      isBest: false,
      explanation:
        'The question in underwriting is not "did the seller collect cash?" but "will this cash recur?" Lease termination fees and insurance proceeds are by definition one-time. Including them in NOI and applying a cap rate capitalizes a non-recurring event into perpetuity — a common seller tactic and a common buyer mistake.',
    },
    {
      label: 'Include the lease termination fee (it is rent-like) but exclude the insurance recovery (clearly non-recurring).',
      isBest: false,
      explanation:
        'Lease termination fees are the opposite of rent-like: they represent a tenant paying to exit early. After the payment, that space is vacant and generates no income. Capitalizing a termination fee as if it were stabilized rent is a significant underwriting error.',
    },
    {
      label: 'Ask the seller to re-state the T-12 before doing any analysis.',
      isBest: false,
      explanation:
        'Re-stating the T-12 is reasonable to request, but you should also know how to perform the adjustment yourself. Sellers may not voluntarily restate in a way that reduces the apparent NOI. The ability to identify and strip non-recurring items from an operating statement is a core diligence skill.',
    },
  ],
  takeaway:
    'Always scrutinize line items in a seller\'s T-12 for non-recurring revenue: lease termination fees, insurance proceeds, sale of assets, and one-time reimbursements inflate NOI and overstate value. Underwriting NOI must be based on stabilized, recurring cash flows only.',
  tips: [
    'Red flag line items: "other income", "termination fees", "insurance proceeds", "gain on sale", "litigation settlement".',
    'Adjust NOI yourself before applying a cap rate — never trust the seller\'s reported NOI for pricing without reviewing the supporting schedule.',
    'Ask: "would this line item appear every year in a normal operating period?" If not, exclude it.',
  ],
};
