import type { VocabTerm } from '../../types/vocab';

/** Capital structure vocabulary — pref/promote/catch-up + the LP/GP relationship. */
export const CAPITAL_STRUCTURE_TERMS: VocabTerm[] = [
  {
    id: 'pref',
    term: 'Pref (Preferred Return)',
    category: 'capital-structure',
    difficulty: 'beginner',
    shortDef:
      'A baseline annual rate of return owed to LP (before any GP promote) — typically 6-10%.',
    longDef:
      'The pref tier in a waterfall: LP gets paid pref *first*, before GP earns any incentive economics. Compound or simple per LPA. Failing to clear pref means GP gets no promote, only their pro-rata return on capital.',
    distractors: [
      'A preferred class of equity senior to common but junior to debt.',
      'GP\'s required management fee paid before promote.',
      'A loan covenant requiring minimum NOI before distributions.',
    ],
    reverseDistractorIds: ['promote', 'catch-up', 'mezz'],
  },
  {
    id: 'promote',
    term: 'Promote (Carry)',
    category: 'capital-structure',
    difficulty: 'beginner',
    shortDef:
      'GP\'s incentive — dollars beyond pro-rata-of-profit, earned only when the deal clears pref.',
    longDef:
      'Promote = GP take − (GP capital % × total profit). Senior-partner economics live here. A 20% promote means GP earns 20% of profits above pref despite contributing only ~10% of capital.',
    distractors: [
      'GP\'s flat management fee on AUM.',
      'A bonus paid to LP once IRR exceeds 20%.',
      'The GP\'s pro-rata cash distribution at exit.',
    ],
    reverseDistractorIds: ['pref', 'catch-up', 'carry'],
  },
  {
    id: 'carry',
    term: 'Carry',
    category: 'capital-structure',
    difficulty: 'beginner',
    shortDef:
      'Synonym for promote — the GP\'s share of profits above the LP\'s pref hurdle.',
    longDef:
      'Most common at the fund level (PE / hedge fund language); "promote" is more common at the deal level (RE JV language). Same economic mechanism: GP\'s incentive carry on outperformance.',
    distractors: [
      'A deferred fee paid in lieu of management fee.',
      'A break-even fee for fund administration.',
      'A loan-extension cost associated with carry trade.',
    ],
    reverseDistractorIds: ['promote', 'pref', 'clawback'],
  },
  {
    id: 'catch-up',
    term: 'Catch-up',
    category: 'capital-structure',
    difficulty: 'intermediate',
    shortDef:
      'Tier where GP receives 100% (or 50/50) of cash above pref until GP has reached its target promote share.',
    longDef:
      'After pref is paid to LP, the catch-up tier flows to GP — full catch-up means 100% to GP until they have target% of (pref + cat-up); 50/50 catch-up means 50/50 split through the tier. Above-cat-up, profits split at the stated ratio (e.g. 80/20).',
    distractors: [
      'GP\'s required reinvestment of distributed promote.',
      'LP\'s right to recoup deferred fees from GP carry.',
      'Period when GP can no longer earn additional promote.',
    ],
    reverseDistractorIds: ['promote', 'pref', 'clawback'],
  },
  {
    id: 'clawback',
    term: 'Clawback',
    category: 'capital-structure',
    difficulty: 'advanced',
    shortDef:
      'GP\'s obligation to return excess promote at fund-end if fund-level performance fell short.',
    longDef:
      'In American (deal-by-deal) waterfalls, GP gets promote on each winning deal as it pays out. If later deals lose money, fund-level lookback at liquidation may show LP wasn\'t made whole on capital + pref; clawback returns excess promote to LP. Often secured by escrow + GP guarantee.',
    distractors: [
      'LP\'s right to remove GP for cause.',
      'Sponsor\'s right to recoup expenses from LP.',
      'Lender\'s right to recover loan amounts from sponsor personally.',
    ],
    reverseDistractorIds: ['promote', 'catch-up', 'pref'],
  },
  {
    id: 'gp',
    term: 'GP (General Partner)',
    category: 'capital-structure',
    difficulty: 'beginner',
    shortDef:
      'The sponsor / managing partner of a JV or fund — invests a small co-invest, runs the deal, earns promote.',
    longDef:
      'GP = sponsor with skin-in-game co-investment (typically 5-10% of equity) plus the right to manage. Earns management fees + promote. LP is passive capital. In a JV, GP also bears construction-completion guaranty risk.',
    distractors: [
      'Gross profit — operating revenue less direct costs.',
      'Gross proceeds at sale, before transaction costs.',
      'Guarantor of last resort on a non-recourse loan.',
    ],
    reverseDistractorIds: ['lp', 'co-invest', 'carry'],
  },
  {
    id: 'lp',
    term: 'LP (Limited Partner)',
    category: 'capital-structure',
    difficulty: 'beginner',
    shortDef:
      'Passive capital investor — funds the bulk of equity, has limited liability, no operational control.',
    longDef:
      'LPs commit capital to a fund or JV, receive pref + pro-rata-of-profits, but have no day-to-day decision-making authority. Voting rights typically limited to major decisions (sale, refinance, GP removal). LP capital is the primary source of risk capital in CRE PE.',
    distractors: [
      'Lead Partner — the senior decision-maker on a deal.',
      'Lender Participant — junior debt counter-party.',
      'Listed Property — REIT-traded asset class.',
    ],
    reverseDistractorIds: ['gp', 'co-invest', 'mezz'],
  },
  {
    id: 'co-invest',
    term: 'Co-invest',
    category: 'capital-structure',
    difficulty: 'intermediate',
    shortDef:
      'GP\'s capital contribution alongside LP — typically 5-10% of total equity. Skin-in-game.',
    longDef:
      'GP\'s economic alignment with LP. A 10% co-invest means if the deal loses 50%, GP loses 50% of their co-invest dollars. Bigger co-invest signals stronger sponsor conviction. Some institutional LPs require minimum co-invest as a condition of investment.',
    distractors: [
      'Direct investment by LP into a portfolio company.',
      'Joint venture with another GP on a single asset.',
      'Side-pocket investment held outside the main fund.',
    ],
    reverseDistractorIds: ['gp', 'lp', 'pari-passu'],
  },
  {
    id: 'pari-passu',
    term: 'Pari-Passu',
    category: 'capital-structure',
    difficulty: 'intermediate',
    shortDef:
      'On equal footing — capital contributions or distributions made pro-rata at the same priority.',
    longDef:
      'Latin for "with equal step." Pari-passu funding means LP and GP fund at the same time, pro-rata. Pari-passu distributions means same. Distinct from "subordinated" (one party junior) or "preferred" (one party senior).',
    distractors: [
      'A type of mezzanine debt structure.',
      'Reverse-pro-rata distributions where smaller LPs get paid first.',
      'Preferred-return-only structure with no promote.',
    ],
    reverseDistractorIds: ['co-invest', 'mezz', 'subordinated'],
  },
  {
    id: 'mezz',
    term: 'Mezz (Mezzanine)',
    category: 'capital-structure',
    difficulty: 'intermediate',
    shortDef:
      'Subordinated debt sitting between senior debt and equity — higher rate, less collateral.',
    longDef:
      'Mezz fills the gap between max senior debt (typically 60-70% LTV) and equity. Coupon 8-13% typical. Secured by pledge of equity in the borrower (not direct property mortgage), so on default mezz forecloses on the equity, not the asset.',
    distractors: [
      'Senior debt at the construction-loan-rate floor.',
      'Equity that converts to debt at maturity.',
      'A bridge loan with seasonal repayment terms.',
    ],
    reverseDistractorIds: ['senior-debt', 'pref-equity', 'subordinated'],
  },
  {
    id: 'pref-equity',
    term: 'Pref Equity',
    category: 'capital-structure',
    difficulty: 'advanced',
    shortDef:
      'Equity tranche with a fixed coupon, senior to common equity but junior to debt.',
    longDef:
      'Hybrid: looks like debt (fixed return, no upside above coupon) but ranks as equity (no UCC pledge, paid after debt service). Common in JV structures where sponsor wants to limit dilution. Pref equity holders get paid before common equity but after all debt holders.',
    distractors: [
      'Senior debt with a guaranteed minimum return.',
      'Mezzanine debt with collateral senior to bank loans.',
      'Common equity with a 1.5x liquidation preference.',
    ],
    reverseDistractorIds: ['mezz', 'common-equity', 'pref'],
  },
  {
    id: 'common-equity',
    term: 'Common Equity',
    category: 'capital-structure',
    difficulty: 'beginner',
    shortDef:
      'The most-junior tier in the capital stack — last to be paid, captures all upside above hurdles.',
    longDef:
      'Common equity = the residual claim on cash flows + sale proceeds, after all debt + pref equity is paid. Highest risk, highest expected return. GP and LP both typically hold common equity, with the GP\'s share carved into co-invest + promote.',
    distractors: [
      'Equity tier paying a fixed coupon to all holders.',
      'Equity in a publicly-traded REIT.',
      'Equity contributed by senior management only.',
    ],
    reverseDistractorIds: ['pref-equity', 'mezz', 'senior-debt'],
  },
  {
    id: 'senior-debt',
    term: 'Senior Debt',
    category: 'capital-structure',
    difficulty: 'beginner',
    shortDef:
      'First-lien mortgage debt — most-senior tier in the capital stack, lowest cost.',
    longDef:
      'Senior debt = bank loan secured by first-position mortgage on the property. Typically 50-70% LTV; 5-7% coupon. On default, senior lender forecloses first; mezz / pref equity / common equity get paid only after senior is made whole.',
    distractors: [
      'Sponsor\'s personal guaranty on a non-recourse loan.',
      'Long-tenor debt held to maturity.',
      'Older-vintage debt placed during prior cycle.',
    ],
    reverseDistractorIds: ['mezz', 'pref-equity', 'common-equity'],
  },
  {
    id: 'subordinated',
    term: 'Subordinated',
    category: 'capital-structure',
    difficulty: 'intermediate',
    shortDef:
      'Junior in priority — paid only after senior tranche obligations have been satisfied.',
    longDef:
      'In CRE: mezz debt is "subordinated" to senior bank debt. Pref equity is subordinated to all debt. Common equity is subordinated to pref equity. Subordination is the language of capital-stack priority.',
    distractors: [
      'Subleased — leased from another tenant.',
      'Substituted — replaced by another instrument at maturity.',
      'Contingent — paid only on certain triggers.',
    ],
    reverseDistractorIds: ['pari-passu', 'senior-debt', 'mezz'],
  },
  {
    id: 'hurdle',
    term: 'Hurdle',
    category: 'capital-structure',
    difficulty: 'intermediate',
    shortDef:
      'A return threshold (IRR or MOIC) that must be cleared before GP earns next-tier promote.',
    longDef:
      'Multi-tier waterfalls have multiple hurdles: e.g. 8% pref → 80/20 to 12% IRR → 70/30 to 18% IRR → 60/40 above. Each hurdle steepens GP\'s split as the deal performs better. IRR hurdles are time-sensitive; MOIC hurdles are absolute.',
    distractors: [
      'A non-binding return target in a fund\'s offering memo.',
      'An LP\'s minimum investment commitment.',
      'A fund\'s NAV floor before redemptions are allowed.',
    ],
    reverseDistractorIds: ['pref', 'promote', 'catch-up'],
  },
  {
    id: 'american-waterfall',
    term: 'American Waterfall',
    category: 'capital-structure',
    difficulty: 'advanced',
    shortDef:
      'Deal-by-deal waterfall — GP earns promote on each individual deal as it pays out.',
    longDef:
      'GP gets paid promote sooner; LP relies on clawback mechanism for protection at fund-end. Sponsor-friendly: cash flows to GP earlier. Often paired with strong clawback security (escrow + GP guarantee). Common in family-office and HNW vehicles.',
    distractors: [
      'Fund-level waterfall used by US-based managers.',
      'Waterfall denominated in USD only.',
      'Distribution structure for US-tax-exempt LPs.',
    ],
    reverseDistractorIds: ['european-waterfall', 'pref', 'clawback'],
  },
  {
    id: 'european-waterfall',
    term: 'European Waterfall',
    category: 'capital-structure',
    difficulty: 'advanced',
    shortDef:
      'Fund-level waterfall — GP earns no promote until LP receives all capital + pref across the entire fund.',
    longDef:
      'LP-friendly: clawback risk is moot because GP doesn\'t get promote until LP is whole at the fund level. Slower cash to GP; preferred by institutional LPs (pension, sovereign). The "default" structure for institutional vehicles.',
    distractors: [
      'A waterfall used only by European-domiciled funds.',
      'Promote structure where GP earns carry on each tranche.',
      'A side-pocket distribution for European-tax LPs.',
    ],
    reverseDistractorIds: ['american-waterfall', 'clawback', 'pref'],
  },
  {
    id: 'capital-account',
    term: 'Capital Account',
    category: 'capital-structure',
    difficulty: 'advanced',
    shortDef:
      'Per-Member running balance of contributions + allocated profits − allocated losses − distributions.',
    longDef:
      'Tax-driven concept under partnership tax rules. Tracks each Member\'s notional equity ledger for tax allocation purposes. Diverges from "Percentage Interest" (which governs voting + pro-rata distributions) over time as profits / losses are allocated.',
    distractors: [
      'A bank account holding initial capital contributions.',
      'A schedule listing all members\' percentage interests.',
      'A cash reserve required to meet capital calls.',
    ],
    reverseDistractorIds: ['percentage-interest', 'co-invest', 'pari-passu'],
  },
  {
    id: 'percentage-interest',
    term: 'Percentage Interest',
    category: 'capital-structure',
    difficulty: 'intermediate',
    shortDef:
      'A Member\'s ownership share — drives voting + pro-rata distributions.',
    longDef:
      'Initial Percentage Interest = Member\'s capital ÷ total capital. Recalculated when additional capital flows; can shift via dilution, default, or buyout. Distinct from Capital Account (tax) and Promote Interest (incentive carve-out).',
    distractors: [
      'Year-over-year change in capital structure ownership.',
      'Percentage of profits a Member is entitled to receive.',
      'Member\'s pro-rata share of debt service obligations.',
    ],
    reverseDistractorIds: ['capital-account', 'co-invest', 'gp'],
  },
];
