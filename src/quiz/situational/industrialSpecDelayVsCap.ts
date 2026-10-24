import type { SituationalCase } from '../../types/situational';

export const industrialSpecDelayVsCap: SituationalCase = {
  id: 'industrial-spec-delay-vs-cap',
  title: 'What really hurts a spec development?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You are underwriting a 400,000 SF spec industrial building. All-in cost is $48M and stabilized NOI is $3.36M, a 7.0% yield on cost. The base case exits at a 5.25% cap rate. Your partner is worried about a 6-month lease-up delay, which would add roughly $1.4M of carry. You are more worried about exit cap rates.',
  data: [
    { label: 'All-in cost', value: '$48.0M' },
    { label: 'Stabilized NOI', value: '$3.36M' },
    { label: 'Yield on cost', value: '7.0%' },
    { label: 'Base exit cap', value: '5.25%' },
    { label: 'Delay cost (6 months)', value: '+$1.4M' },
    { label: 'Cap rate shock', value: '+50 bps' },
  ],
  question: 'Which risk takes more profit margin off the deal?',
  options: [
    {
      label: 'The exit cap shock — profit on cost falls from about 33% to about 18%, versus about 30% for the delay.',
      isBest: true,
      explanation:
        'Base: $3.36M ÷ 5.25% = $64.0M value ÷ $48M = 33% margin. Delay: cost $49.4M → 29.6%. Cap at 5.75%: $58.4M ÷ $49.4M → 18.3%. A 50 bps cap move costs roughly 11 points; a 6-month delay about 4. Spreads over exit cap are the thing to protect.',
    },
    {
      label: 'The 6-month delay — carry costs are certain while exit caps are only a forecast.',
      isBest: false,
      explanation:
        'The delay cost is real but small relative to the value. A $1.4M overrun is about 3% of cost; a 50 bps cap move changes value by about 9%.',
    },
    {
      label: 'They are about equal in magnitude, so size the reserve for both.',
      isBest: false,
      explanation:
        'They are not equal: roughly 11 points vs 4 points of margin. Treating them as equal misallocates both attention and cushion.',
    },
    {
      label: 'Neither matters because a 7.0% yield on cost is well above any market cap rate.',
      isBest: false,
      explanation:
        'The 175 bps spread is the cushion; it is what absorbs these shocks. Margin still compresses sharply if caps widen.',
    },
  ],
  takeaway:
    'In development, exit cap sensitivity dwarfs most schedule risk. Size your spread over market cap first, then manage the schedule.',
  tips: [
    'Development spread = yield on cost − exit cap.',
    'Run exit cap sensitivity at +25, +50 and +100 bps before approving a deal.',
    'Delays also reduce value indirectly via lost first-year NOI.',
  ],
};
