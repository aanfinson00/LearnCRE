import type { SituationalCase } from '../../types/situational';

export const exitCapIrrSensitivity: SituationalCase = {
  id: 'exit-cap-irr-sensitivity',
  title: 'IC pushback: how much does 50 bps of exit cap widening cost you on IRR?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    'You underwrote a multifamily acquisition at a 5.0% going-in cap (paid $80M) with Year 1 NOI of $4,000,000. Year 5 NOI is projected at $6,000,000. The exit cap is 5.25%, and you modeled a 60% LTV interest-only loan at 6.0% (loan = $48M). The deal pencils at approximately 14.5% levered IRR. In IC, your investment committee partner asks you to stress the exit cap by 50 bps to 5.75%.',
  data: [
    { label: 'Purchase price', value: '$80,000,000 (5.0% going-in)' },
    { label: 'Year 1 NOI', value: '$4,000,000' },
    { label: 'Year 5 NOI', value: '$6,000,000' },
    { label: 'Underwritten exit cap', value: '5.25% → exit value: $114.3M' },
    { label: 'Stressed exit cap', value: '5.75%' },
    { label: 'Loan', value: '$48M at 6.0% IO' },
    { label: 'Equity invested', value: '$32M' },
  ],
  question: 'What does the 50 bps exit cap stress do to exit proceeds and levered IRR?',
  options: [
    {
      label:
        'Exit at 5.75%: $6M ÷ 5.75% = $104.3M — roughly $10M lower than the $114.3M base. After repaying $48M of debt, equity proceeds fall from ~$66.3M to ~$56.3M. On a $32M equity investment, that moves the 5-year levered IRR from approximately 14.5% to roughly 11–12%. A 50 bps exit cap widening costs approximately 250–300 bps of levered IRR.',
      isBest: true,
      explanation:
        'The value impact of a cap rate move = NOI × (1/cap_stressed − 1/cap_base). Here: $6M × (1/5.75% − 1/5.25%) = $6M × (17.39 − 19.05) = $6M × (−1.65) ≈ −$9.9M. After debt payoff, the full $10M value swing lands in equity, which started at $32M. Going from $66.3M to $56.3M equity proceeds over 5 years compresses the IRR by roughly 250–300 bps. The leverage amplification is the key insight: the equity absorbed a $10M swing on a $32M investment (31% haircut to proceeds) even though the gross asset only moved ~8.7%.',
    },
    {
      label:
        'The impact is minimal — 50 bps is within the normal comp spread and cap rate moves barely affect exit proceeds.',
      isBest: false,
      explanation:
        'On a $100M+ gross asset, 50 bps of cap rate represents ~$10M of value, which is a 31% haircut to a $32M equity stack. Leverage amplification is the whole point: the debt is fixed, so every dollar of gross value loss falls entirely on equity. "Minimal" is the wrong frame for a heavily levered deal.',
    },
    {
      label:
        'A 50 bps cap move drops exit price by exactly 50 bps of NOI — about $30,000.',
      isBest: false,
      explanation:
        'Confuses bps-of-cap with bps-of-NOI. The value impact is NOI divided by the cap rate, not NOI times the basis point move. $6M ÷ 5.75% = $104.3M vs. $6M ÷ 5.25% = $114.3M — that\'s a $10M difference, not $30k. The correct formula is: ΔValue = NOI × (1/cap₁ − 1/cap₂).',
    },
    {
      label:
        'You can offset the exit cap stress by assuming higher rent growth in Years 4 and 5.',
      isBest: false,
      explanation:
        'That introduces two offsetting assumption changes and obscures the risk. IC asked for an isolated sensitivity test. Mixing exit cap stress with a rent growth upside defeats the purpose of the sensitivity — it tells you nothing about the downside exposure from cap rate expansion alone. Run the clean one-variable sensitivity first; blend scenarios separately.',
    },
  ],
  takeaway:
    'Levered IRR is highly sensitive to exit cap assumptions because leverage amplifies value swings. On a 60% LTV deal, a $10M gross value loss falls entirely on a $32M equity stack — a 31% hit to proceeds. Rule of thumb: every 25 bps of exit cap widening costs approximately 100–150 bps of levered IRR on a 5-year hold at moderate leverage. Always present IC with a +25 / +50 / +100 bps exit cap sensitivity table before any vote.',
  tips: [
    'Exit value = Year-of-exit NOI ÷ exit cap. Moving the cap 50 bps on a $6M NOI asset changes value by ~$10M.',
    'Equity absorbs 100% of gross value swings on a fixed-debt IO structure — that\'s the amplification mechanism.',
    'The longer the hold, the smaller the per-year IRR impact of a given proceeds change; shorter holds hit IRR harder.',
  ],
};
