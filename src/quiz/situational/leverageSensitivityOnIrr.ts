import type { SituationalCase } from '../../types/situational';

export const leverageSensitivityOnIrr: SituationalCase = {
  id: 'leverage-sensitivity-on-irr',
  title: 'Rate goes up 100 bps — does more leverage still help your IRR?',
  category: 'sensitivity',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  scenario:
    "You're evaluating a value-add office acquisition at a 7.0% going-in cap rate. Base case underwriting uses 60% LTV at a 6.5% fixed rate (I/O for 3 years, then 25-year amortization). Levered IRR: 13.5%. Unlevered IRR: 9.2%. A rising-rate environment has pushed lender quotes to 7.5% on similar proceeds. You can alternatively: (A) keep 60% LTV at 7.5%, or (B) reduce to 50% LTV at 7.5% (lender incentivizes lower LTV with wider debt yield headroom). The 3-year hold ends in Year 3 with a projected refi or sale.",
  data: [
    { label: 'Going-in cap rate', value: '7.0%' },
    { label: 'Base case debt', value: '60% LTV, 6.5% fixed I/O' },
    { label: 'Base case levered IRR', value: '13.5%' },
    { label: 'Unlevered IRR', value: '9.2%' },
    { label: 'Stress scenario A', value: '60% LTV at 7.5%' },
    { label: 'Stress scenario B', value: '50% LTV at 7.5%' },
    { label: 'Hold period', value: '3 years, exit by refi or sale' },
  ],
  question:
    'Under the 7.5% rate environment, does keeping 60% LTV (A) or reducing to 50% LTV (B) produce a better levered IRR, and at what point does leverage start destroying value?',
  options: [
    {
      label:
        "At 7.5% debt cost vs a 7.0% going-in cap rate, leverage is dilutive — you are borrowing at 7.5% and deploying capital that earns 7.0% (unlevered). Scenario A (60% LTV at 7.5%) produces a levered IRR below the base case and potentially below the 9.2% unlevered IRR. Scenario B (50% LTV at 7.5%) is directionally better than A — less dilutive leverage — but both are worse than the base case. The crossover where leverage destroys value is when debt cost exceeds the cap rate (the 'negative leverage' threshold), which is exactly this situation.",
      isBest: true,
      explanation:
        "Correct. Negative leverage occurs when the debt constant (or interest rate on I/O debt) exceeds the cap rate. At 7.5% debt vs 7.0% cap, every dollar of debt deployed earns 7.0% on assets and costs 7.5% — 50 bps of negative carry per dollar of debt. On a $25M asset at 60% LTV ($15M debt), that's ~$75,000/year of negative carry before value-add NOI growth. With only a 3-year hold, the NOI growth may not fully offset the drag. Reducing to 50% LTV cuts the negative-leverage drag by 10 percentage points of the capital structure. Both scenarios are worse than base; B is less bad than A.",
    },
    {
      label:
        "Higher leverage always amplifies returns — keeping 60% LTV (Scenario A) is better because leverage boosts equity returns even at 7.5%.",
      isBest: false,
      explanation:
        "This is the positive-leverage assumption applied incorrectly. Leverage amplifies returns when the spread between cap rate and debt cost is positive (cap rate > debt cost). Here, cap rate (7.0%) < debt cost (7.5%) — that's negative leverage. In this regime, more leverage means more capital borrowed at a rate above the asset's unlevered return, which dilutes equity returns. The statement that 'higher leverage always amplifies returns' is a common misconception that conflates positive- and negative-leverage regimes.",
    },
    {
      label:
        "Unlevered IRR of 9.2% is already above the debt cost, so leverage is still accretive — Scenario A at 60% LTV should produce a levered IRR higher than 9.2%.",
      isBest: false,
      explanation:
        "This confuses unlevered IRR with cap rate for the leverage calculation. The relevant comparison is the going-in cap rate (cash yield on cost) vs the interest rate (cash cost of debt) — not the IRR (which includes appreciation). On an I/O basis in Year 1: the asset earns 7.0% cap rate on assets vs 7.5% debt cost — negative leverage on the cash flow basis. The IRR-based comparison is more complex and accounts for appreciation, but the cash flow drag from negative carry is the key near-term issue for a 3-year hold.",
    },
    {
      label:
        "The decision between A and B depends entirely on the refi market in Year 3 — if rates come down, you want more leverage (A); if rates stay high, reduce to B.",
      isBest: false,
      explanation:
        "Correct direction but wrong framing as the primary answer. The current cash flow dilution from negative leverage is real and immediate — it affects Year 1–3 carry regardless of where rates go at exit. The question asks which scenario produces better levered IRR given the 7.5% current rate environment. The answer requires first recognizing negative leverage exists now. Rate bets at exit are speculative and belong in a sensitivity table, not as the primary analysis.",
    },
  ],
  takeaway:
    'Negative leverage occurs when debt cost exceeds the going-in cap rate — at that point, every dollar of debt deployed reduces equity returns rather than amplifying them. The crossover point is: debt rate = going-in cap rate. Above that, leverage dilutes. In a rising-rate environment, acquisitions teams must re-underwrite the leverage question: (1) is leverage still accretive on a cash yield basis? (2) if not, how much do you reduce proceeds? (3) does the deal still meet the hurdle rate on reduced leverage? A 7.5% debt rate on a 7.0% cap is the textbook negative-leverage scenario.',
  tips: [
    'Quick negative leverage test: if interest rate > going-in cap rate, adding leverage reduces cash-on-cash yield. The broader question is whether appreciation offsets the drag over the hold.',
    'On a 3-year I/O hold, negative-carry drag compounds: $75,000/year × 3 years = $225,000 of equity drag before appreciation works its magic.',
    'Lenders sometimes incentivize lower LTV with better pricing — evaluate the IRR at multiple LTV points to find the optimal leverage ratio.',
    'Negative leverage is especially dangerous in short holds (3 years) where appreciation may not compensate for the annual cash flow drag.',
  ],
};
