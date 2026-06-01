import type { SituationalCase } from '../../types/situational';

export const distressedSaleComp: SituationalCase = {
  id: 'distressed-sale-comp',
  title: 'Foreclosure sale in the comp set: does it belong in your pricing analysis?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'hotel',
  scenario:
    'You are pricing a 120-room stabilized select-service hotel performing at 72% occupancy and $145 ADR (RevPAR = $104). One recent comp in the submarket was a 150-room hotel that sold in a lender-directed sale at a 9.2% cap after the property missed DSCR covenants. The other two comps are arms-length trades at 7.5% and 7.75% cap rates. Your broker recommends excluding the distressed sale; your IC partner asks why.',
  data: [
    { label: 'Subject', value: '120 rooms, stabilized, arms-length sale' },
    { label: 'Comp A', value: 'Lender-directed sale, 150 rooms — 9.2% cap' },
    { label: 'Comp B', value: 'Arms-length, 150 rooms — 7.5% cap' },
    { label: 'Comp C', value: 'Arms-length, 140 rooms — 7.75% cap' },
    { label: 'Your subject occupancy', value: '72% at $145 ADR' },
  ],
  question: 'How should you treat the lender-directed sale comp in your pricing analysis?',
  options: [
    {
      label:
        'Exclude the distressed sale from the primary comp bracket and document the reason explicitly. Lender-directed and foreclosure sales are not arms-length transactions — the seller (the lender) is motivated to exit quickly, not to maximize price. The 9.2% cap reflects liquidation pricing, not what a willing buyer pays a willing seller in a normal market transaction. Including it without adjustment would artificially widen the bracket and undervalue your stabilized, performing asset. Disclose it as a reference point in the comp table, but do not include it in your pricing anchor range.',
      isBest: true,
      explanation:
        'The arms-length standard is the foundation of comp analysis. A lender-directed sale fails that standard because the seller\'s motivation is not price maximization — it is balance sheet cleanup, covenant compliance, or regulatory capital relief. The 150-bps premium vs. arms-length comps (9.2% vs. 7.5–7.75%) likely reflects distress pricing, below-market occupancy at that specific asset, and limited exposure to the typical buyer pool. The right treatment is: exclude from pricing bracket, note it in the comp table with explanation, and potentially use it as the floor of a stress-test scenario.',
    },
    {
      label:
        'Include it — all completed transactions represent actual market pricing, and a 9.2% cap tells you where capital was deployed.',
      isBest: false,
      explanation:
        'Not all transactions reflect market pricing. Distressed, lender-directed, and REO sales reflect liquidation pricing under duress — a fundamentally different condition than a voluntary arms-length sale. Including the 9.2% cap alongside 7.5–7.75% arms-length comps and averaging them would produce a bracket that misrepresents normal market clearing conditions for a stabilized asset.',
    },
    {
      label:
        'Average all three caps including the distressed comp — the range represents realistic market uncertainty.',
      isBest: false,
      explanation:
        'Unweighted averaging contaminated by a distressed comp produces ~8.2% as the bracket midpoint, roughly 50 bps wider than the arms-length range. For a $15–20M hotel, that equates to $1–2M of understated pricing. IC would be right to flag why a distressed comp was mixed with arms-length trades without adjustment.',
    },
    {
      label:
        'Use the distressed comp as your primary pricing anchor since it represents the most recent transaction.',
      isBest: false,
      explanation:
        'Recency does not override transaction type. A distressed sale from last month is less relevant than an arms-length sale from 6 months ago for pricing a stabilized, non-distressed asset. The distressed sale tells you about lender behavior and liquidation pricing — not the market clearing level for voluntary sellers.',
    },
  ],
  takeaway:
    'Distressed, lender-directed, and REO sales fail the arms-length standard and should be excluded from primary comp brackets for stabilized assets. Document the exclusion explicitly with the reason. These transactions are useful for stress-testing floor values (what does a buyer pay in a forced sale scenario?) but not for establishing fair market value. In hotel underwriting, also verify whether the distressed asset had below-market operating metrics (occupancy, ADR) that explain part of the cap widening beyond the distress premium.',
  tips: [
    'Arms-length standard: both parties are willing, knowledgeable, and not under duress. Lender-directed sales fail this test.',
    'Transaction types to exclude from primary comp sets: foreclosure, REO sale, lender-directed sale, related-party transaction, partial-interest sale.',
    'In hotel, always check whether the distressed comp had below-market RevPAR — that compounds the cap widening beyond just distress pricing.',
    'If distressed comps are the ONLY recent data in a thin market, use them with explicit documentation and a wide pricing range.',
  ],
};
