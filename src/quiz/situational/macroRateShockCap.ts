import type { SituationalCase } from '../../types/situational';

export const macroRateShockCap: SituationalCase = {
  id: 'macro-rate-shock-cap',
  title: 'Macro: Fed hikes 300 bps — what happens to your portfolio values?',
  category: 'risk',
  difficulty: 'intermediate',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    "You're a portfolio manager at a core-plus fund holding $2B of stabilized assets acquired in 2021–2022 at a blended 4.8% going-in cap. Over the next 18 months, the Fed raises the fed funds rate 300 bps. The 10-year Treasury moves from 1.5% to 4.5%. The team is debating how to mark the portfolio and what, if anything, to do about it.",
  data: [
    { label: 'Portfolio value at acquisition', value: '$2B (blended 4.8% cap)' },
    { label: 'Blended NOI', value: '$96M' },
    { label: 'Fed funds Δ', value: '+300 bps over 18 months' },
    { label: '10-yr Treasury', value: '1.5% → 4.5%' },
    { label: 'Historic cap-rate / Treasury spread', value: '~150–200 bps' },
    { label: 'Leverage (blended LTV)', value: '60%' },
  ],
  question:
    'What is the most defensible framework for estimating NAV impact on the portfolio, and what actions, if any, are appropriate?',
  options: [
    {
      label:
        "Cap rates typically track Treasuries with a 150-200 bps spread lag. If the 10-yr lands at 4.5%, equilibrium cap rates for core assets migrate toward 6.0-6.5% — implying a 25-35% NAV haircut on a static-NOI portfolio (from $2B to $1.3-1.5B). Equity is disproportionately impaired at 60% LTV: a 30% value decline eliminates 75% of the equity cushion. Appropriate actions: stress-test each asset's refi profile at maturity, identify which assets face negative-leverage break-even, and consider selling assets where the hold thesis relies on cap-rate compression that is now off the table.",
      isBest: true,
      explanation:
        "Right framework. Cap rates lag Treasuries (real estate transactions clear slowly vs. bond markets), but the direction is nearly certain. The spread compression of 2020-2022 (cap rates near or below Treasury yields) was anomalous; historical spreads of 150-200 bps are the equilibrium anchor. At 4.5% Treasury + 150 bps spread = 6.0% cap. Applying 6.0% to $96M NOI gives $1.6B — a 20% haircut. At 6.5%, it's $1.48B — 26% down. Equity at 60% LTV ($800M) gets asymmetrically hit: a $400-500M value decline wipes out 50-63% of equity. That's the core risk to communicate.",
    },
    {
      label:
        "NOI is unchanged and the assets are cash-flowing — mark-to-market losses are unrealized. Hold the portfolio, avoid selling at trough values, and wait for rate normalization.",
      isBest: false,
      explanation:
        "Conflates operating performance with valuation risk. NOI stability matters for coverage, not for mark-to-market NAV. The practical risk isn't today's P&L — it's the refi cliff: when loan maturities hit and lenders underwrite at 6.0-6.5% cap rates and 65% proceeds, the fund may face a significant equity gap or extension fees. 'Hold and wait' is a viable strategy only if loan maturity schedules allow it and LP redemption windows aren't pressured.",
    },
    {
      label:
        "Sell the highest-cap-rate assets now to lock in gains before values decline further.",
      isBest: false,
      explanation:
        "Gets the sort wrong. In a rising-rate environment, higher-cap-rate assets (e.g., 6%+) are more protected than low-cap-rate assets (4.5-5%) because they already have a wider spread cushion. The assets most at risk are the lowest cap-rate purchases — typically core trophy assets in gateway markets bought at pricing that embedded significant rate and cap-rate compression. Selling the highest-cap-rate assets trades off the most resilient part of the portfolio.",
    },
    {
      label:
        "Hedge the portfolio by buying interest rate caps across all floating-rate loans; this fully protects against the rate shock.",
      isBest: false,
      explanation:
        "Rate caps protect debt service on floating-rate loans, not asset values. A cap at 4% on a SOFR + 200 loan limits the debt-service bleed — but it does nothing for cap-rate expansion, which affects the equity value independent of debt service. Fixed-rate loans don't need caps but still face exit risk when the value drops and the refi pencils at 60 cents on the original dollar.",
    },
  ],
  takeaway:
    "Rising Treasury rates exert gravitational pull on cap rates via the spread relationship — historically 150-200 bps for core assets. A 300 bps rate shock that normalizes from a compressed baseline is a 125-175 bps cap-rate expansion event. The equity impact is amplified by leverage: at 60% LTV, a 25% value decline eliminates ~60% of equity. The actionable risk isn't the paper loss — it's loan maturity timing and refi feasibility at the new cap-rate regime.",
  tips: [
    "Cap rate = NOI / Value; rearranged: Value = NOI / Cap Rate. A 100 bps cap expansion on a 5% cap asset means a 17% value decline: (5/6) - 1.",
    "Cap-rate / Treasury spread history: 150-200 bps for core, 250-350 bps for value-add, wider for opportunistic.",
    "Negative leverage occurs when the cap rate < interest rate. At a 5.5% cap and 7% all-in loan rate, every dollar of debt is destroying equity yield.",
  ],
};
