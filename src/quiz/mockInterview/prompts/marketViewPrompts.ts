import type { MockProsePrompt } from '../../../types/mockInterview';

/**
 * Market-view prompts — opinions that need to be defended with logic +
 * data, no single right answer. Rubric weighs (1) takes a clear position,
 * (2) cites supporting evidence, (3) acknowledges the strongest counter,
 * (4) names what would change the candidate's view.
 */
export const MARKET_VIEW_PROMPTS: MockProsePrompt[] = [
  {
    id: 'mv-cap-rate-direction',
    kind: 'marketView',
    prompt:
      'Where do you see institutional CRE cap rates over the next 12-18 months? Pick a position and defend it.',
    expectedDurationSec: 120,
    rubric: [
      { id: 'position', dimension: 'Takes a clear directional position (compress / widen / range-bound)', weight: 2 },
      { id: 'evidence', dimension: 'Cites concrete data — Treasury rates, transaction volumes, observed comps', weight: 1.5 },
      { id: 'sector-nuance', dimension: 'Differentiates by sector — caps don\'t move in lockstep', weight: 1 },
      { id: 'counter', dimension: 'Acknowledges the strongest case against your view' },
      { id: 'walk-threshold', dimension: 'Names what would change your mind' },
    ],
    modelAnswer:
      'I expect modest compression (25-50 bps) on Class-A institutional in primary markets, but flat-to-widening on secondary / Class-B over the next 12-18 months. Three things support compression on the trophy end: 10-year Treasury settling 50 bps below current peak gives spread relief; transaction volumes are recovering off the 2023 trough, which historically precedes 1-2 quarters of cap-rate tightening; and capital-flow data shows institutional dry powder is $400B+, with allocators starting to deploy. The reason I think secondary markets stay wider: insurance-cost shocks haven\'t flushed through underwriting yet, and the bid pool for B+ assets is thinner — fewer buyers willing to compete for marginal yield. The strongest counter to my view is a re-acceleration in Treasury yields, which would gut the trophy compression. What would change my mind: a print of CPI above 3.5% sustained for two months — that pushes my baseline to range-bound with a wider downside.',
    tips: [
      'Take a position. "It depends" is the worst answer; weak directional view beats hedging.',
      'Mix sector / geography nuance. Cap-rate views that treat all CRE as one trade signal shallow thinking.',
      'Always include a falsification trigger ("what would change my mind"). Senior partners listen for it.',
    ],
  },
  {
    id: 'mv-sector-overweight',
    kind: 'marketView',
    prompt:
      'If you had $100M of dry powder to deploy in CRE in the next year, which sector would you over-weight, and which would you under-weight? Why?',
    expectedDurationSec: 120,
    rubric: [
      { id: 'position', dimension: 'Specific over/under-weight calls (not "diversify")', weight: 2 },
      { id: 'thesis', dimension: 'Clear underwriting thesis — what dynamic drives the call', weight: 1.5 },
      { id: 'execution', dimension: 'Names the specific sub-sector / market where the trade actually works', weight: 1 },
      { id: 'risk', dimension: 'Acknowledges what could break the thesis' },
      { id: 'discipline', dimension: 'Shows pricing discipline — at what cap / YoC does it stop being a buy?' },
    ],
    modelAnswer:
      'Over-weight Sun Belt MF, specifically Class-B garden product in 50k-200k MSAs that aren\'t the headline metros. Under-weight gateway-market office. The MF thesis: secondary-market Class-B is trading at 75-100 bps wider than primary because the bid pool is thinner, but rent-growth fundamentals are *better* than in primary (population growth + supply absorption). I\'d look for value-add at 6.5-7.0% going-in cap, $400-800/door capex with ~12% mark-to-market, and exit caps modeled wider than going-in. Discipline trigger: stop buying once going-in cap compresses below 6.0%. The under-weight on office is structural — even at $200/SF on Class-A, hybrid work has reset demand permanently for ~30% of the previous market; and Class-B is functionally obsolete. Risk to MF thesis: rate-driven recession that hits jobs in the Sun Belt disproportionately. Risk to office under-weight: I miss the trade if rates fall fast enough that everything compresses. I\'d hedge the second risk by holding 5-10% in cash to redeploy.',
    tips: [
      'Concrete sub-sector + geography beats sector-level views. Specificity = credibility.',
      'Always state the *price discipline* — at what cap rate does it stop being a buy?',
      'Show you understand the trade can be wrong. Risk acknowledgment differentiates from sales pitch.',
    ],
  },
  {
    id: 'mv-lender-spread-direction',
    kind: 'marketView',
    prompt:
      'Where do you see CRE debt spreads moving over the next 12 months — for senior bank debt, agency, and CMBS? Pick a stance and defend it.',
    expectedDurationSec: 120,
    roles: ['mortgageUw'],
    rubric: [
      { id: 'position', dimension: 'Differentiated stance across the three lender categories', weight: 2 },
      { id: 'fundamentals', dimension: 'Anchors view in capital flows / underwriting trends / credit losses', weight: 1.5 },
      { id: 'sector-nuance', dimension: 'Acknowledges spreads vary by asset class within each category' },
      { id: 'walk-threshold', dimension: 'Names what would shift your view' },
    ],
    modelAnswer:
      'I expect senior bank spreads to tighten 25-50 bps over the next 12 months as deposit costs stabilize and bank balance sheets digest the 2023-24 CRE writedowns. Agency spreads should be roughly flat — Fannie/Freddie pricing is policy-driven and the rate-driven spread compression is mostly priced in. CMBS I\'d expect to widen 10-25 bps, especially on office and lower-tier multifamily, as the maturity wall puts pressure on issuance and AAA tranche buyers stay defensive. The differentiation matters: bank debt is supply-constrained (banks pulled back); agency is regulated; CMBS is capital-markets-priced. The strongest counter to my bank-spread-tightening call is a Texas-bank-style stress test resurfacing — that resets risk premia. The signal I\'d look for: 30-day deposit-flight-to-quality data in the regional bank tape — if that re-spikes, my bank-tightening view fails.',
    tips: [
      'Senior bank / agency / CMBS each price differently — sophisticated lenders distinguish.',
      'Anchor in capital-flow data: deposits, issuance volumes, AAA tranche bid.',
      'Always include a falsification: "what would change my mind on this trade?"',
    ],
  },
  {
    id: 'mv-debt-equity-mix',
    kind: 'marketView',
    prompt:
      'How are you thinking about the debt-vs-equity mix in CRE deployment today? Should investors lean more into preferred equity / mezz / debt funds, or stay in common equity?',
    expectedDurationSec: 120,
    rubric: [
      { id: 'position', dimension: 'Takes a position on the trade-off', weight: 2 },
      { id: 'rate-context', dimension: 'Anchors view in the current rate / spread environment', weight: 1.5 },
      { id: 'risk-return', dimension: 'Articulates the risk-return trade-off explicitly' },
      { id: 'counter', dimension: 'Names where common equity beats credit despite the rate environment' },
    ],
    modelAnswer:
      'I lean credit-heavy in this environment but not exclusively. Mezz and pref equity are pricing 11-13% all-in for assets where common equity is barely clearing 8-10% IRR after adjusting for cap-rate widening risk. The risk-return trade-off favors credit: you get equity-like return with debt-like protection, and the asset has to drop 30%+ in value before you take a real loss. The case for common equity: distressed transactions where you can buy at 7-8% YoC on a 5%-cap stabilized basis. That\'s where common equity\'s upside is real. So my framework: 65-70% to credit (mezz / pref / agency-paper) for liquidity-of-yield + downside protection, 25-30% to common equity in *deeply* discounted situations only, 5-10% in cash for opportunistic redeployment. The counter to credit-heavy: if rates compress 100 bps over the next year, common equity captures the cap-rate compression while credit just keeps clipping coupons. So credit-heavy gives up the convex upside in a rates-down scenario.',
    tips: [
      'Frame the trade as risk-return, not "credit is better than equity." Both have a place.',
      'Mention specific yields you\'re seeing in the market — generic numbers signal you don\'t actually price deals.',
      'Acknowledge the convexity asymmetry: credit caps your upside.',
    ],
  },
];
