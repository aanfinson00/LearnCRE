import type { SituationalCase } from '../../types/situational';

export const hotelSeasonalityRisk: SituationalCase = {
  id: 'hotel-seasonality-risk',
  title: 'Hotel: 60% of NOI lands in one quarter — how does extreme seasonality reshape your underwriting?',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'hotel',
  scenario:
    "You're underwriting a 120-key mountain ski resort. T-12 EBITDA is $3.0M. Q4 (peak ski season — Thanksgiving through New Year) generated $1.8M (60% of annual EBITDA). Q1-Q2 combined is barely breakeven. The seller is asking $50M, implying a 6.0% going-in cap on T-12 NOI. Proposed debt is 55% LTV at a floating rate. You're evaluating both as an equity acquirer and thinking through how a lender will size and structure the debt.",
  data: [
    { label: 'Keys', value: '120' },
    { label: 'T-12 EBITDA', value: '$3.0M' },
    { label: 'Q4 EBITDA (peak)', value: '$1.8M (60% of annual)' },
    { label: 'Q1-Q2 EBITDA combined', value: 'Near breakeven' },
    { label: 'Asking price', value: '$50M' },
    { label: 'Going-in cap', value: '6.0%' },
    { label: 'Proposed debt', value: '55% LTV, floating rate' },
  ],
  question: "How does extreme seasonality change your underwriting assumptions and debt structure requirements?",
  options: [
    {
      label:
        "Seasonality requires explicit cash management in the debt structure — a lender-required sweep of Q4 excess cash into a debt service reserve that funds Q1-Q2 debt payments. DSCR is tested on trailing-12 NOI, not any single quarter, but the trough-quarter cash deficit is real and must be pre-funded. Equity underwriting discipline: stress a bad-snow-year scenario (ski-season RevPAR -20-25% — one poor snowpack drops annual EBITDA to ~$2.2M), confirm DSCR holds above 1.15x, and widen exit cap by 50bps vs. non-seasonal comparables to reflect the limited buyer pool for resort assets.",
      isBest: true,
      explanation:
        "Right discipline. Seasonal hospitality assets face two compounding risks: (1) in-period cash flow structure — 60% of annual EBITDA in Q4 means Q1-Q2 generates insufficient cash for debt service; lenders address this with cash management/lock-box structures that sweep Q4 surplus into a reserve; (2) weather/demand risk — a single poor ski season drops EBITDA 20-30%, potentially breaching the DSCR covenant on the next trailing-12 test window. On the equity side, exit cap should be 50-100bps wider than stabilized urban full-service comps because the buyer pool for resort assets is shallower.",
    },
    {
      label:
        "Seasonality is already reflected in T-12 NOI. A 6.0% going-in cap on full-year earnings captures the seasonal variation — no additional structural adjustments are needed.",
      isBest: false,
      explanation:
        "The T-12 cap price captures the historical seasonal pattern but not the tail risk. A bad snowpack year (realistic for mountain resorts — happens every 3-5 years) drops Q4 RevPAR 25%, reducing annual EBITDA to ~$2.2M. If debt service is sized to T-12 NOI, a bad season pushes DSCR below covenant, triggering a cash trap or default notice before the annual NOI recovers. Structural accommodation in the debt is required, not just acknowledgment in the going-in cap.",
    },
    {
      label:
        "Require interest-only payments in Q1-Q2 from the lender to eliminate the trough-quarter cash deficit — that's standard for seasonal resort loans.",
      isBest: false,
      explanation:
        "IO for six months per year is not standard and most lenders won't offer it — it effectively means the loan never amortizes. Standard hospitality lenders use cash management lock-box structures: Q4 excess cash sweeps into a debt service reserve; the reserve funds Q1-Q2 debt payments. The DSCR is evaluated on trailing-12, not quarterly. Requesting semi-annual IO signals unfamiliarity with hospitality debt structures.",
    },
    {
      label:
        "Lower the LTV to 40% instead of 55% — less leverage is the primary tool for managing seasonality risk.",
      isBest: false,
      explanation:
        "Lower leverage helps at the margin but is the wrong primary tool. At 40% LTV, the annual debt service is lower, but the seasonal cash flow pattern still creates a Q1-Q2 deficit relative to debt service due dates. 55% LTV with proper cash management structure (Q4 sweep, debt service reserve) is safer than 40% LTV with no structural accommodation. The fix is cash flow structure, not just lower leverage.",
    },
  ],
  takeaway:
    "Highly seasonal hospitality assets require explicit cash management structures in the debt document — Q4 sweep-to-reserve funds Q1-Q2 debt service, and trailing-12 DSCR testing provides the covenant framework. On the equity underwriting side: stress a one-bad-season scenario (20-25% RevPAR decline in peak quarter) as the base stress test, not a tail case. Exit cap should price in the narrower buyer pool for resort assets — 50-100bps wider than comparable non-seasonal full-service hotels.",
  tips: [
    "Seasonal cash management: most hospitality lenders require a DSCR trigger (e.g., <1.15x trailing-12) that activates a cash trap — Q4 cash flow sweeps into reserve before any distributions are released.",
    "Weather risk proxy: pull 10-year snowpack or visitation data for mountain resorts. One outlier year tells you the NOI floor; two consecutive bad years tell you the debt stress scenario.",
    "Buyer pool at exit: mountain resorts trade at 50-100bps cap premium vs. urban full-service because the buyer universe is narrower — lifestyle/leisure specialists rather than institutional generalists.",
  ],
};
