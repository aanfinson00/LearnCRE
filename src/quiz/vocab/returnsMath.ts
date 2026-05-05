import type { VocabTerm } from '../../types/vocab';

/** Returns + math vocabulary — the headline metrics every analyst quotes. */
export const RETURNS_MATH_TERMS: VocabTerm[] = [
  {
    id: 'noi',
    term: 'NOI',
    category: 'returns-math',
    difficulty: 'beginner',
    shortDef:
      'Net Operating Income — gross income less vacancy + operating expenses, before debt service or capex.',
    longDef:
      'NOI = Effective Gross Income − Operating Expenses. Excludes mortgage payments, capex, depreciation, and income taxes. Drives valuation when divided by cap rate.',
    distractors: [
      'Gross income before any deductions.',
      'Income after debt service and capex.',
      'Cash flow available for distribution after all expenses and taxes.',
    ],
    reverseDistractorIds: ['ebitda', 'cap-rate', 'cash-on-cash'],
    context: 'NOI is the "operating-level" cash number — the number that sets value via NOI/cap.',
  },
  {
    id: 'ebitda',
    term: 'EBITDA',
    category: 'returns-math',
    difficulty: 'beginner',
    shortDef:
      'Earnings Before Interest, Taxes, Depreciation, and Amortization — operating cash proxy for non-real-estate businesses.',
    longDef:
      'In CRE, NOI is the analog of EBITDA — both strip out capital structure (interest), tax, and non-cash items. EBITDA is more common in operating businesses (hotels, senior housing) where there\'s a meaningful "operating company" layer alongside the real estate.',
    distractors: [
      'Total revenue less cost of goods sold.',
      'Net income plus depreciation only.',
      'Cash flow available after debt service.',
    ],
    reverseDistractorIds: ['noi', 'gop', 'cash-on-cash'],
  },
  {
    id: 'cap-rate',
    term: 'Cap Rate',
    category: 'returns-math',
    difficulty: 'beginner',
    shortDef: 'NOI ÷ Value — the unlevered yield on a property at purchase or today.',
    longDef:
      'Capitalization rate. Inverse of the income multiple: a 5% cap = 20× NOI multiple. "Going-in" cap uses purchase price; "exit" or "terminal" cap uses sale price.',
    distractors: [
      'Cash flow ÷ equity invested.',
      'Year-over-year change in property value.',
      'Annual rent ÷ purchase price (ignores expenses).',
    ],
    reverseDistractorIds: ['debt-yield', 'cash-on-cash', 'irr'],
  },
  {
    id: 'irr',
    term: 'IRR',
    category: 'returns-math',
    difficulty: 'beginner',
    shortDef:
      'Internal Rate of Return — the discount rate that makes a project\'s cash-flow NPV equal to zero.',
    longDef:
      'Time-weighted measure of return. Sensitive to *when* dollars come back: a 1.4× MOIC in 2 years (≈18.3% IRR) is very different from 1.4× in 5 years (≈7% IRR). IRR + MOIC together tell the full return story.',
    distractors: [
      'Total cash returned ÷ cash invested.',
      'Average annual cash yield on equity.',
      'Annualized growth rate of property value.',
    ],
    reverseDistractorIds: ['em', 'moic', 'cagr'],
  },
  {
    id: 'em',
    term: 'EM',
    category: 'returns-math',
    difficulty: 'beginner',
    shortDef:
      'Equity Multiple — total cash returned ÷ cash invested. Time-blind absolute-dollar measure.',
    longDef:
      'EM = Total Cash Out / Total Cash In. A 2.0× EM means investors got back 2× their money. Pair with IRR: EM is dollars; IRR is speed. Common targets: core 1.4-1.6×, value-add 1.7-2.0×, opportunistic 2.0×+.',
    distractors: [
      'IRR raised to the power of hold years.',
      'Annual dividend ÷ equity invested.',
      'Sale price ÷ initial equity contribution.',
    ],
    reverseDistractorIds: ['irr', 'moic', 'cash-on-cash'],
  },
  {
    id: 'moic',
    term: 'MOIC',
    category: 'returns-math',
    difficulty: 'intermediate',
    shortDef:
      'Multiple on Invested Capital — synonymous with Equity Multiple in PE / RE contexts.',
    longDef:
      'MOIC = Total Returned ÷ Total Invested. Used most often at the fund / portfolio level; EM is the same math typically used at the deal level. Sometimes MOIC is calculated gross-of-fees; EM is usually net-of-fees.',
    distractors: [
      'Multiple of operating income to capital.',
      'Modified internal rate of return.',
      'Money-on-cash multiplier — distinct from EM.',
    ],
    reverseDistractorIds: ['em', 'irr', 'tvpi'],
  },
  {
    id: 'cash-on-cash',
    term: 'Cash-on-Cash (CoC)',
    category: 'returns-math',
    difficulty: 'beginner',
    shortDef:
      'Annual pre-tax cash flow ÷ equity invested. The "yield" on the equity check, year by year.',
    longDef:
      'CoC = Annual Cash Flow After Debt Service ÷ Initial Equity. Doesn\'t consider exit value or time. A 7% CoC means equity earns 7% per year in current cash, separate from what the asset does on sale.',
    distractors: [
      'Cap rate adjusted for leverage.',
      'IRR if the deal sold today at book.',
      'Total return less appreciation.',
    ],
    reverseDistractorIds: ['cap-rate', 'irr', 'debt-yield'],
  },
  {
    id: 'cagr',
    term: 'CAGR',
    category: 'returns-math',
    difficulty: 'intermediate',
    shortDef:
      'Compound Annual Growth Rate — geometric mean annual growth of a value over multiple periods.',
    longDef:
      'CAGR = (End / Start)^(1/n) − 1. Smooths year-over-year volatility into a single annualized rate. Distinguish from average annual growth (arithmetic mean), which can over-state actual compounding.',
    distractors: [
      'Cumulative annual growth rate, summed across years.',
      'Average annual return adjusted for risk.',
      'Continuous-compounded growth rate using natural log.',
    ],
    reverseDistractorIds: ['irr', 'em', 'moic'],
  },
  {
    id: 'grm',
    term: 'GRM',
    category: 'returns-math',
    difficulty: 'intermediate',
    shortDef: 'Gross Rent Multiplier — purchase price ÷ gross rent. Quick screening tool.',
    longDef:
      'Lazy version of cap rate that uses gross instead of net. A GRM of 8 means the asset is priced at 8× gross rent. Useful for quick comp screening but ignores OpEx differences across assets — a 35% OER asset and a 50% OER asset at the same GRM trade at very different cap rates.',
    distractors: [
      'Gross revenue multiple — same math but using EBITDA.',
      'Gross rent per square foot, indexed to market.',
      'Gross-up rent figure used in CAM calculations.',
    ],
    reverseDistractorIds: ['cap-rate', 'noi', 'cash-on-cash'],
  },
  {
    id: 'yield-on-cost',
    term: 'Yield on Cost (YoC)',
    category: 'returns-math',
    difficulty: 'intermediate',
    shortDef:
      'Stabilized NOI ÷ total project cost. The development-version of cap rate.',
    longDef:
      'YoC = NOI / All-In Cost (land + hard + soft + carry + reserves). Dev spread = YoC − market cap rate. Targets: 50-100 bps spread for low-risk projects, 150+ bps for risky / lease-up-heavy projects.',
    distractors: [
      'Year-1 cap rate at stabilization.',
      'Cap rate at sale less cap rate at start.',
      'Going-in cap rate net of soft costs.',
    ],
    reverseDistractorIds: ['cap-rate', 'dev-spread', 'debt-yield'],
  },
  {
    id: 'dev-spread',
    term: 'Dev Spread',
    category: 'returns-math',
    difficulty: 'intermediate',
    shortDef: 'Yield on cost minus market cap rate — the developer\'s margin of safety.',
    longDef:
      'Dev Spread = YoC − Market Cap. The wider, the more cushion against cost overruns + cap-rate widening. Sub-50 bps spreads are dangerously thin; institutional norms target 75-150 bps depending on risk.',
    distractors: [
      'Bid-ask spread on land in a primary market.',
      'Construction-loan rate less permanent-loan rate.',
      'Cost-of-equity less cost-of-debt for a dev deal.',
    ],
    reverseDistractorIds: ['yield-on-cost', 'cap-rate', 'debt-yield'],
  },
  {
    id: 't-12',
    term: 'T-12',
    category: 'returns-math',
    difficulty: 'beginner',
    shortDef:
      'Trailing-twelve-month — actual NOI / revenue / etc. for the most recent 12 months.',
    longDef:
      'T-12 is the credibility-tier of operating data. Sponsors prefer T-3-annualized when it\'s flattering ("we\'re running hot the last 3 months"); buyers should always demand T-12 to smooth seasonality and capture full-year OpEx run-rate.',
    distractors: [
      'Forward 12-month forecast NOI.',
      'Trailing 12-month rent escalator average.',
      'Twelve-quarter rolling NOI average.',
    ],
    reverseDistractorIds: ['t-3', 'pro-forma', 'noi'],
    context: 'Always demand T-12. T-3-annualized is sponsor-flavored data.',
  },
  {
    id: 't-3',
    term: 'T-3 Annualized',
    category: 'returns-math',
    difficulty: 'intermediate',
    shortDef:
      'Trailing-3-month operating data, multiplied by 4 to annualize. Often misleadingly favorable.',
    longDef:
      'T-3 × 4 = annualized run-rate based on the most recent quarter. Sponsors use it when seasonality favors the period (e.g. summer multifamily with low concessions). Buyers should always ask for T-12 to smooth out seasonal flattery.',
    distractors: [
      'Three-tier annualized return target.',
      'Three-quarter trailing average.',
      'Annualized 3-month forward forecast.',
    ],
    reverseDistractorIds: ['t-12', 'pro-forma', 'cagr'],
  },
  {
    id: 'pro-forma',
    term: 'Pro Forma',
    category: 'returns-math',
    difficulty: 'beginner',
    shortDef: 'Forward-looking projected operating numbers, as opposed to historicals.',
    longDef:
      'Pro forma = "as if" projection. Standard format: revenue / vacancy / OpEx / NOI / capex / financing / IRR over a 5-7 year hold. Always cross-check pro forma assumptions against in-place operations — gaps between pro forma and T-12 are the heart of underwriting.',
    distractors: [
      'Historical financials adjusted for one-time items.',
      'Rolling 12-month forecast at constant pricing.',
      'In-place financial reports for the most recent quarter.',
    ],
    reverseDistractorIds: ['t-12', 't-3', 'noi'],
  },
  {
    id: 'tvpi',
    term: 'TVPI',
    category: 'returns-math',
    difficulty: 'advanced',
    shortDef:
      'Total Value to Paid-In capital — fund-level ratio of (distributions + NAV) to paid-in capital.',
    longDef:
      'TVPI = (Distributions + Residual NAV) / Paid-In Capital. Tracks total value created relative to invested capital, including unrealized. Pair with DPI (distributions only / paid-in) to separate realized from unrealized return. A fund at 1.8× TVPI / 1.0× DPI has half its return still on paper.',
    distractors: [
      'Total value paid into a fund by limited partners.',
      'Time-weighted value per investment, indexed to inception.',
      'Total value as percentage of total commitments.',
    ],
    reverseDistractorIds: ['moic', 'em', 'irr'],
  },
];
