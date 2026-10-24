import type { SituationalCase } from '../../types/situational';

export const retailPercentageRentBreakpoint: SituationalCase = {
  id: 'retail-percentage-rent-breakpoint',
  title: 'Is percentage rent real NOI?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'retail',
  scenario:
    'An OM underwrites $2.50/SF of percentage rent from an in-line tenant paying $30/SF base rent. The lease charges 5% of gross sales above a natural breakpoint. Trailing sales are $500/SF, and the seller points to a 6% annual sales growth trend.',
  data: [
    { label: 'Base rent', value: '$30/SF' },
    { label: 'Percentage rate', value: '5%' },
    { label: 'Breakpoint', value: 'Natural' },
    { label: 'Trailing sales', value: '$500/SF' },
    { label: 'Sales growth', value: '6% per year' },
  ],
  question: 'How much percentage rent should you underwrite in Year 1?',
  options: [
    {
      label: 'None — the natural breakpoint is $600/SF ($30 ÷ 5%), and sales of $500/SF sit below it.',
      isBest: true,
      explanation:
        'Natural breakpoint = base rent ÷ percentage rate = $30 ÷ 0.05 = $600/SF. Sales of $500 × 1.06 = $530 in Year 1, still below it. At roughly 6% growth it takes about three years to cross; underwrite $0 and treat future overage as upside.',
    },
    {
      label: '$2.50/SF — as shown in the OM, since the lease provides for it.',
      isBest: false,
      explanation:
        '$2.50/SF would require sales of $650/SF. The lease provides for percentage rent only above the breakpoint.',
    },
    {
      label: '$1.25/SF — half the OM figure to reflect sales risk.',
      isBest: false,
      explanation:
        'Haircutting an amount that does not exist yet is arbitrary. The question is whether sales reach the breakpoint at all.',
    },
    {
      label: '$2.50/SF — percentage rent is on top of base so sales are irrelevant.',
      isBest: false,
      explanation:
        'Percentage rent depends entirely on sales relative to the breakpoint; it is not additive on its own.',
    },
  ],
  takeaway:
    'Percentage rent is an option on tenant sales. Compute the breakpoint first; underwrite only what current sales actually clear.',
  tips: [
    'Natural breakpoint = base rent ÷ percentage rate.',
    'Check whether the lease uses an artificial breakpoint instead.',
    'Request sales reports and audit rights before relying on overage.',
  ],
};
