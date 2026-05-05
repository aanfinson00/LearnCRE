import type { SituationalCase } from '../../types/situational';

export const riskAdjustedReturnFramework: SituationalCase = {
  id: 'risk-adjusted-return-framework',
  title: 'Risk-adjusted return — what\'s the actual framework?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['portfolioMgmt'],
  scenario:
    "An LP asks: \"How are you measuring risk-adjusted returns across your fund's holdings?\" You can't just say \"IRR\" — every deal in the book has a different IRR. You need a defensible framework that lets you compare a 14% stabilized industrial deal to a 24% ground-up MF deal on the same axis.",
  data: [
    { label: 'Deal type 1', value: 'stabilized industrial — 14% IRR' },
    { label: 'Deal type 2', value: 'value-add MF — 18% IRR' },
    { label: 'Deal type 3', value: 'ground-up MF — 22% IRR' },
    { label: 'Deal type 4', value: 'distressed retail — 24% IRR' },
    { label: 'LP question', value: '"how do you compare these on risk?"' },
  ],
  question:
    "What's the most defensible risk-adjusted-return framework to articulate?",
  options: [
    {
      label:
        "IRR over a deal-type-specific 'required return' hurdle. Stabilized core wants ~10%, value-add ~15%, opportunistic ~20%. Subtract the hurdle from the deal IRR and compare the spread; positive means you're earning a risk premium, negative means you're underpriced for the risk taken.",
      isBest: true,
      explanation:
        "This is the institutional convention — sometimes called 'return premium over hurdle' or 'risk-adjusted spread.' It's defensible because it explicitly references a market-observed required return for each deal class, which is what an LP's bond-fund counterpart uses for credit-spread analysis. The 14% industrial earning 4% over a 10% core hurdle and the 24% distressed earning 4% over a 20% opportunistic hurdle are now legitimately comparable. It also surfaces deals that look great on headline IRR but are mispriced for the risk taken (a 16% value-add return earns only 1% over the 15% hurdle — thin).",
    },
    {
      label:
        'Compute a Sharpe ratio per deal: (IRR − risk-free rate) / standard deviation of projected returns. Highest Sharpe wins.',
      isBest: false,
      explanation:
        "Borrowed from public-markets equity / fixed-income, but mostly nonsense in CRE. Standard deviation of projected returns isn't observable for a deal that hasn't run its hold yet — you'd be substituting a model assumption for empirical data. Real-estate Sharpe is sometimes calculated at the *portfolio* level using NCREIF time series, but at the deal level it's a vanity number that doesn't survive scrutiny.",
    },
    {
      label:
        "Just compare equity multiples. EM levels the time-horizon problem (a 14% IRR over 7 years vs a 22% IRR over 4 years) and tells you total dollars made.",
      isBest: false,
      explanation:
        "Cleaner than IRR for cross-horizon comparison, but EM ignores the cost of capital. A 1.7x over 7 years and a 1.7x over 3 years are very different deals — the second one redeploys faster and lets you compound. EM as a primary risk-adjuster understates short-hold strategies and overstates long-hold ones.",
    },
    {
      label:
        'Use the deal\'s downside IRR (5th-percentile sensitivity case) instead of base-case IRR. Whichever deal still produces a positive IRR in the downside case is the lowest-risk deal regardless of base-case return.',
      isBest: false,
      explanation:
        "Useful as a stress-test layer, not as your primary framework. Downside-IRR analysis depends entirely on the rigor of your sensitivity model — and most sensitivities are tuned to make the deal look defensible, not to actually capture left-tail risk. As a *complement* to the hurdle-spread framework: yes. As the *sole* framework: too easy to game and too narrow.",
    },
  ],
  takeaway:
    "Risk-adjusted return in CRE = return relative to the asset class's required return, NOT a Sharpe ratio or downside IRR alone. Articulate a defensible hurdle for each deal type (core / core+ / value-add / opportunistic / development), measure each deal's spread over that hurdle, and report the spread alongside the headline IRR. LPs trained in fixed-income or private equity will recognize this framing immediately.",
  tips: [
    "Common hurdle anchors: core ~9-10%, core+ ~12%, value-add ~15-17%, opportunistic ~20%, development ~25%+ given execution risk.",
    "A '4% spread over hurdle' is a reasonable target — anything below 2% is thin, above 6% is suspicious (something's miscalibrated).",
    "Sharpe ratios make sense at the fund level using NCREIF returns; not at the deal level.",
    "Downside IRR is a useful pair, but only when the sensitivity model is independently rigorous (not sponsor-tuned).",
  ],
};
