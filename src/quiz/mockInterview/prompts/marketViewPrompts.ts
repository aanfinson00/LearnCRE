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
  {
    id: 'mv-office-recovery-thesis',
    kind: 'marketView',
    prompt:
      'Is office dead, or is there a recovery thesis? If so, where does it work and on what timeline?',
    expectedDurationSec: 120,
    rubric: [
      { id: 'position', dimension: 'Takes a clear position — identifies where office recovers or argues it doesn\'t', weight: 2 },
      { id: 'segmentation', dimension: 'Distinguishes trophy, Class-A, and Class-B/C — they are structurally different markets', weight: 1.5 },
      { id: 'catalysts', dimension: 'Names specific demand catalysts (return-to-office mandates, conversion economics, etc.)', weight: 1 },
      { id: 'counter', dimension: 'Acknowledges the structural bear case honestly' },
    ],
    modelAnswer:
      'Office isn\'t dead, but it\'s a tale of two markets and only one has a recovery thesis. Trophy Class-A in primary MSAs — modern floor plates, full amenity package — is recovering because hybrid-work tenants are consolidating into quality space rather than just less space. Trophy leasing in Manhattan, Seattle, and Chicago has held. Class-B office in suburban markets is effectively obsolete for most use cases. The conversion thesis is real for some of that stock — I\'ve done the math on suburban campuses where the land is worth 2-3x more for multifamily or life-science use than for continued office operation. Timeline: trophy recovery is happening now in liquid primary markets; secondary markets lag 18-36 months. Class-B conversion takes 3-5 years from capital-raising through stabilization. The strongest bear case: if hybrid hardens into 2-day norms permanently, even trophy absorption slows meaningfully. I\'d watch Kastle badge-in data — if occupancy rates stop improving quarter-over-quarter, I re-evaluate.',
    tips: [
      'Never flatten office into one market. Trophy vs Class-A vs Class-B/C are three separate investment theses.',
      'Conversion economics are real but require specific asset characteristics — don\'t overstate how broadly they apply.',
      'Name a falsification trigger. "If Kastle data stops improving" is specific and shows you know how to monitor the thesis.',
    ],
  },
  {
    id: 'mv-msa-overweight',
    kind: 'marketView',
    prompt:
      'Pick one MSA where you\'d concentrate capital today. Walk me through your thesis — and the bear case.',
    expectedDurationSec: 120,
    rubric: [
      { id: 'position', dimension: 'Commits to a specific MSA, not a region or category', weight: 2 },
      { id: 'thesis', dimension: 'Thesis is supply-demand-based, not just "it\'s a growing market"', weight: 1.5 },
      { id: 'pricing', dimension: 'Addresses whether the market is already priced for the thesis', weight: 1 },
      { id: 'bear', dimension: 'Gives an honest bear case with a specific trigger to watch', weight: 1 },
    ],
    modelAnswer:
      'Nashville, specifically industrial and workforce multifamily. The thesis: Nashville is a top-5 fastest-growing MSA by net migration, but industrial supply has been absorbed faster than delivered — submarket vacancy is around 4%, well below the national average. Workforce housing is similarly constrained; the apartment pipeline is primarily luxury Class-A, leaving Class-B/C renters structurally supply-short. On pricing: Nashville industrial is trading at a slight premium to Phoenix or Dallas on a going-in cap basis, but still below the institutional compression you see in primary markets — you\'re still getting paid for the smaller-market liquidity discount. Bear case: Nashville\'s outperformance is partly an employer concentration story. If one of the major anchor employers contracts meaningfully, population growth slows disproportionately. The signal I\'d watch: net job postings from the top five Nashville employers — if those go negative quarter-over-quarter, I reduce position sizing.',
    tips: [
      'Commit to one market. A regional thesis ("Sun Belt generally") is safe and therefore weak — interviewers hear it constantly.',
      'Supply-demand specifics beat demographic stories. "4% vacancy vs national average" is stronger than "people are moving there."',
      'Show you understand the concentration risk of your own thesis. Acknowledging it is more credible than pretending it doesn\'t exist.',
    ],
  },
  {
    id: 'mv-distressed-opportunity',
    kind: 'marketView',
    prompt:
      'How real is the "wall of maturities" distressed opportunity? Are you seeing it play out, and would you deploy into it?',
    expectedDurationSec: 120,
    rubric: [
      { id: 'position', dimension: 'Takes a view on whether the distressed opportunity is real or has been absorbed', weight: 2 },
      { id: 'evidence', dimension: 'Anchors view in maturity data, transaction volumes, or sector-specific experience', weight: 1.5 },
      { id: 'execution', dimension: 'Names where the distress is visible vs where it isn\'t — avoids treating CRE as monolithic', weight: 1 },
      { id: 'risk', dimension: 'Acknowledges the risk of deploying too early vs too late' },
    ],
    modelAnswer:
      'The distress is real but unevenly distributed, and the maturity wall has materialized more slowly than the 2023 headlines implied. Office is genuinely distressed — note sales at 50-60 cents on the dollar in gateway markets, sponsor hand-backs on Class-B. Retail CMBS has specific pockets of distress on big-box-anchored centers. But multifamily and industrial have mostly avoided forced-sale dynamics because cash flows are still covering debt service, and lenders have extended maturities rather than force sales. Where I\'d deploy: directly into the note market on office in primary MSAs where land value creates a downside floor — you own the optionality on conversion without paying for the operating cash flow. Where I wouldn\'t: retail distress that\'s structural rather than cyclical. The timing risk is real — clearing-price discovery has been delayed by extend-and-pretend; I\'d be patient rather than forced to deploy into a wave that may take 12-18 more months to fully break.',
    tips: [
      'Separate structural distress (office, some retail) from cyclical distress (MF, industrial). Conflating them signals shallow analysis.',
      '"The opportunity is massive" is not a view — every institutional allocator already knows the headline. Your edge is specificity on WHERE.',
      'Acknowledge the timing risk explicitly. Being right about distress but wrong about timing still loses money.',
    ],
  },
];
