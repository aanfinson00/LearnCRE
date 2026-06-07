import type { SituationalCase } from '../../types/situational';

export const noiMissSensitivity: SituationalCase = {
  id: 'noi-miss-sensitivity',
  title: 'A 5% NOI miss — how much does it hurt the levered return?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'mixed',
  scenario:
    'You modeled a $20M acquisition with $1.2M Year 1 NOI (6.0% going-in cap) and a 70% LTV interest-only loan at 6.5%. The model shows a 14% levered IRR. A senior asset manager asks: "If NOI underperforms by 5% in Year 1 — say, a tenant delays move-in — how does that flow through to equity?"',
  data: [
    { label: 'Purchase price', value: '$20M' },
    { label: 'Year 1 NOI (modeled)', value: '$1.2M (6.0% cap)' },
    { label: 'Loan', value: '$14M at 6.5% I/O' },
    { label: 'Annual debt service', value: '$910K' },
    { label: 'Equity invested', value: '$6M' },
    { label: 'Modeled Year 1 equity cash flow', value: '$290K ($1.2M − $910K)' },
    { label: 'Modeled levered IRR', value: '14%' },
  ],
  question: 'What\'s the correct framing of the 5% NOI sensitivity?',
  options: [
    {
      label: 'A $60K NOI miss hits equity cash flow directly — debt service is fixed at $910K, so equity cash flow drops from $290K to $230K, a 21% cut. Leverage amplifies the miss roughly 4× against the equity base.',
      isBest: true,
      explanation:
        '5% of $1.2M NOI = $60K shortfall. Debt service ($14M × 6.5% = $910K) doesn\'t move. Year 1 equity cash flow: $290K → $230K — a 21% drop from a 5% NOI miss. That\'s leverage amplification in practice: every dollar of NOI shortfall is a dollar out of equity, not spread across the whole capital stack. For the hold period IRR, the Year 1 impact alone is ~50–80 bps of drag. If the 5% miss is persistent (NOI runs 5% low every year AND exit NOI reflects the same miss), the compounded effect on both cash flows and terminal value pushes IRR impact to 150–200+ bps.',
    },
    {
      label: 'A 5% NOI miss reduces the deal IRR by 5% — returns are proportional to NOI.',
      isBest: false,
      explanation:
        'Returns are NOT proportional. Debt service is fixed; the equity absorbs the entire shortfall. If NOI drops 5%, equity cash flow in Year 1 drops 21% — that\'s the leverage amplification. "Proportional" would only hold at 0% leverage, where NOI = free cash flow 1:1.',
    },
    {
      label: 'The miss doesn\'t matter much — NOI in Year 1 is small and terminal value drives 70–80% of IRR.',
      isBest: false,
      explanation:
        'True that terminal proceeds dominate IRR, but this ignores the secondary effect: if NOI persistently misses 5%, exit NOI is also 5% lower. At a 6.5% exit cap, 5% lower exit NOI reduces the sale price by ~$900K — roughly 15% of the $6M equity. Even a one-year miss has lender signaling risk (DSCR watching). "Doesn\'t matter" is the wrong conclusion.',
    },
    {
      label: 'Just remodel with the lower NOI — there\'s no conceptual shortcut for sensitivity analysis.',
      isBest: false,
      explanation:
        'Remodeling is correct process, but in an IC discussion you must explain the direction and magnitude without a spreadsheet. Knowing "leverage amplifies NOI misses roughly 3–4× against equity cash flow" is the core mental model. The remodel confirms it; the mental model is what the IC conversation is testing.',
    },
  ],
  takeaway:
    'Leverage amplifies NOI misses against equity. A 5% NOI miss on a 70% LTV I/O deal cuts equity Year 1 cash flow ~21% — because debt service is fixed and equity absorbs the entire shortfall. The rough rule: every 1% of NOI underperformance ≈ 3–4% of equity cash flow reduction, depending on leverage and coverage ratios. When modeling sensitivity, always state both the NOI impact and the equity cash flow impact; they\'re very different numbers.',
  tips: [
    'Leverage amplification: at 70% LTV I/O, equity bears 100% of any NOI shortfall.',
    'Quick: NOI miss ÷ equity cash flow = % equity hit. Here: $60K ÷ $290K = 21%.',
    'If the NOI miss is persistent, it also lowers exit NOI — the terminal value loss compounds the IRR drag.',
  ],
};
