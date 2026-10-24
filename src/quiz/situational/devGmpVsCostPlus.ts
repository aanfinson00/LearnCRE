import type { SituationalCase } from '../../types/situational';

export const devGmpVsCostPlus: SituationalCase = {
  id: 'dev-gmp-vs-cost-plus',
  title: 'GMP or cost-plus at 60% drawings?',
  category: 'risk',
  difficulty: 'intermediate',
  roles: ['development'],
  scenario:
    'You are about to select a contract form for a $45M mid-rise. Drawings are about 60% complete. The GC will give a guaranteed maximum price now but wants a 7% contingency and a 4% fee. A cost-plus option with a 3.5% fee would be cheaper on paper but has no cap.',
  data: [
    { label: 'Drawing completeness', value: '60%' },
    { label: 'GMP fee', value: '4%' },
    { label: 'GMP contingency', value: '7%' },
    { label: 'Cost-plus fee', value: '3.5%' },
    { label: 'Contract value', value: '$45M' },
  ],
  question: 'What is the best approach?',
  options: [
    {
      label: 'Start cost-plus with a target price and convert to GMP when drawings reach roughly 90%, with savings shared.',
      isBest: true,
      explanation:
        'A GMP struck at 60% prices unknown scope as risk, so the GC pads contingency and exclusions and later argues change orders. Waiting until drawings are nearly complete lets the GC price firm scope. Open-book cost-plus keeps the early period transparent.',
    },
    {
      label: 'Sign the GMP now — certainty of price is the priority.',
      isBest: false,
      explanation:
        'The certainty is partly illusory: a GMP on incomplete drawings usually generates change orders for design gaps, and you pay a large contingency premium.',
    },
    {
      label: 'Stay on uncapped cost-plus through completion to take advantage of the lower fee.',
      isBest: false,
      explanation:
        'The fee saving is 0.5% (~$225K) but you retain all cost risk. One bad bid package can cost more than that.',
    },
    {
      label: 'Fix a lump sum with a different GC to force competition.',
      isBest: false,
      explanation:
        'Lump sum needs complete drawings, which do not exist at 60%. Bidders will price in the unknowns.',
    },
  ],
  takeaway:
    'Match contract form to design maturity. Convert to a GMP once the scope is defined enough for the GC to price it without a risk premium.',
  tips: [
    'Insist on open-book accounting during the cost-plus phase.',
    'Define who owns contingency savings and in what split.',
    'Review exclusions and allowances line by line in any GMP.',
  ],
};
