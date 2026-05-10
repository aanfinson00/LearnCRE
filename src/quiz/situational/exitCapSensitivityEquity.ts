import type { SituationalCase } from '../../types/situational';

export const exitCapSensitivityEquity: SituationalCase = {
  id: 'exit-cap-sensitivity-equity',
  title: '25 bps wider on the exit cap — what happens to your equity?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  scenario:
    'You are underwriting a value-add office acquisition. Your base-case exit assumes a 5.5% cap on Year-5 NOI of $2.5M, producing a gross sale price of $45.5M. The senior loan is $30M (interest only, no amortization), and equity invested was $8M. A lender asks what happens to your equity return if the exit cap widens 25 bps to 5.75%.',
  data: [
    { label: 'Year-5 NOI', value: '$2,500,000' },
    { label: 'Base-case exit cap', value: '5.50%' },
    { label: 'Base-case gross sale price', value: '$45,455,000 ($2.5M ÷ 5.5%)' },
    { label: 'Senior debt outstanding at exit', value: '$30,000,000' },
    { label: 'Equity invested', value: '$8,000,000' },
    { label: 'Stress exit cap', value: '5.75%' },
    { label: 'Closing costs / disposition fee', value: '1% of sale price' },
  ],
  question:
    'How much equity is at risk with a 25 bps cap rate widening, and what does that do to your equity multiple?',
  options: [
    {
      label: 'Stressed sale price: $2.5M ÷ 5.75% = $43.5M. After debt ($30M) and 1% closing ($435k), equity proceeds = $13.06M vs. $14.99M base case. Equity multiple drops from ~1.87x to ~1.63x — a $1.93M equity shortfall from a 25 bps move.',
      isBest: true,
      explanation:
        'Stressed gross price: $2,500,000 ÷ 0.0575 = $43,478,000. Closing costs (1%): $435k. Net to equity: $43,478k − $30,000k − $435k = $13,043k. Base case: $45,455k − $30,000k − $455k = $15,000k. Equity proceeds drop by $1,957k. Multiple: $13.04M ÷ $8M = 1.63x vs. $15.0M ÷ $8M = 1.87x. The key insight: the 25 bps cap rate move reduces gross value by ~$2M, but equity absorbs the full loss because debt is fixed — the leverage amplifies the cap rate sensitivity.',
    },
    {
      label: 'The impact is minor — 25 bps is within normal cap rate estimation error and would reduce equity by roughly $250k.',
      isBest: false,
      explanation:
        'This dramatically underestimates the impact. A 25 bps move on $2.5M NOI changes gross value by ~$1.95M ($45.45M vs. $43.48M). At 65% LTV, debt is fixed and equity absorbs the entire value change. The amplification from leverage makes cap rate sensitivity a first-order risk, not rounding error.',
    },
    {
      label: 'Equity is unaffected — the loan-to-value drops but as long as you can sell for more than $30M, equity is safe.',
      isBest: false,
      explanation:
        '"Safe" means getting your principal back; "return" is what matters. Equity proceeds drop from $15M to $13M — a 13% reduction in equity value. Lenders asking this question want to know the cushion, not just whether debt is covered. The multiple compression from 1.87x to 1.63x is material to any sponsor LP or lender stress test.',
    },
    {
      label: 'You need to reforecast Year-5 NOI before answering — the cap rate stress and NOI are two separate variables.',
      isBest: false,
      explanation:
        'The prompt holds NOI constant to isolate cap rate sensitivity — that is the right analytical approach. When sensitizing exit value, you want to see the cap rate effect in isolation first, then layer in an NOI stress. Refusing to answer the clean cap rate question by invoking NOI uncertainty misses the point of the exercise.',
    },
  ],
  takeaway:
    'Exit cap sensitivity is amplified by leverage: debt is fixed, so every dollar of value reduction falls entirely on equity. The formula is: stressed price = NOI ÷ stressed cap rate; equity proceeds = price − debt − closing costs. Even a 25 bps move can compress your equity multiple by 15–20% on a levered deal.',
  tips: [
    'Rule of thumb: at 65% LTV, a 25 bps cap rate widening on a stabilized NOI reduces equity by roughly 2.5× the nominal value change.',
    'Always run the cap rate sensitivity in your IC deck — it is the first question any sophisticated LP or lender asks.',
    'Exit cap conservatism (going in wider than entry) is your hedge: a 50 bps spread between going-in and exit cap absorbs normal market movement without destroying your return thesis.',
  ],
};
