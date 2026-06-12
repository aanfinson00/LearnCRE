import type { SituationalCase } from '../../types/situational';

export const sensitivityRentGrowthBreakeven: SituationalCase = {
  id: 'sensitivity-rent-growth-breakeven',
  title: 'What rent growth does this deal actually need?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'A value-add multifamily deal underwrites to a 16% levered IRR at 3.5% annual rent growth over a 5-year hold. The acquisition price is $25M with $5M of equity. The model uses a 5.25% going-in cap and a 5.50% exit cap. A senior partner asks: "What\'s the rent growth breakeven — below what growth rate does this fall below our 12% IRR hurdle?"',
  data: [
    { label: 'Acquisition price', value: '$25,000,000' },
    { label: 'Equity invested', value: '$5,000,000' },
    { label: 'Modeled rent growth', value: '3.5%/yr' },
    { label: 'Going-in cap', value: '5.25%' },
    { label: 'Exit cap', value: '5.50%' },
    { label: 'Hold period', value: '5 years' },
    { label: 'Modeled IRR', value: '16%' },
    { label: 'IRR hurdle', value: '12%' },
  ],
  question:
    'What is the right way to approach a rent growth breakeven analysis?',
  options: [
    {
      label:
        'Run the model at multiple rent growth assumptions (0%, 1%, 2%, 3%, 3.5%) and find the crossing point where IRR = 12%. Report the gap between your modeled case (3.5%) and the breakeven as the "growth cushion" — the miss the deal can absorb before falling below the hurdle.',
      isBest: true,
      explanation:
        'Sensitivity analysis is systematic: hold all variables constant except rent growth, vary it from 0% to the modeled case, and identify where IRR crosses 12%. As a rough calibration: each 100 bps of rent growth on a 5-year levered deal improves IRR by roughly 150–200 bps (leverage amplification). Working backward: 16% model, 12% hurdle = 400 bps of cushion. At ~175 bps IRR per 100 bps rent growth, the deal breaks the hurdle at roughly 1.7–2.3% annual growth. Report that to IC: "This deal clears the hurdle at rent growth above ~2%, vs the modeled 3.5% — a cushion of ~150 bps." One number (base case IRR) is never enough.',
    },
    {
      label:
        'The breakeven is 0% rent growth — any positive growth makes the deal work.',
      isBest: false,
      explanation:
        'At 0% rent growth, the deal generates return from in-place yield (5.25%) minus financing cost, likely producing a 10–12% levered IRR — near or below the 12% hurdle. 0% is very close to the breakeven, not a comfortable floor. The actual crossing point needs to be modeled, not assumed.',
    },
    {
      label:
        'The question doesn\'t matter if the base case underwrites to 16% — there\'s already a 400 bps buffer to the hurdle.',
      isBest: false,
      explanation:
        'This conflates modeled return with sensitivity to the key assumptions. A 16% model that breaks below 12% with a 50 bps rent growth miss is far riskier than a 14% model that absorbs a 200 bps miss. The absolute IRR is less important than the assumption sensitivity. "How wrong can I be and still clear the hurdle?" is always the right follow-up to any modeled return.',
    },
    {
      label:
        'Use historical submarket rent growth as the breakeven — if history says 2% is normal, underwrite to that.',
      isBest: false,
      explanation:
        'Historical data informs the assumption; it does not define the breakeven. The breakeven is a model output (the growth rate where IRR = 12%), not the historical average. You use history to contextualize the cushion: "This deal breaks at 1.8% growth; the submarket has averaged 2.5% over 10 years." The breakeven and the historical context are two separate things.',
    },
  ],
  takeaway:
    'Sensitivity analysis answers "how wrong can I be and still hit the hurdle?" The rent growth breakeven is the growth rate at which IRR = target return. Report it alongside the modeled case so IC can judge whether the cushion is adequate. A deal that requires 3.2% growth to clear a 3.5% model case has almost no margin; a deal that clears at 1.0% has real cushion. One number is never enough.',
  tips: [
    'Rule of thumb: each 100 bps of rent growth ≈ 150–200 bps IRR improvement on a 5-yr levered deal.',
    'Report breakeven to IC as: "Deal clears the hurdle as long as rent growth exceeds X% — vs modeled Y%."',
    'Always run 0%, 1%, 2%, 3% rent growth scenarios regardless of the base case.',
  ],
};
