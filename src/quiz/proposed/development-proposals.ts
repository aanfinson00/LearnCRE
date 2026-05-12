/**
 * Proposed question submissions for the development role.
 *
 * These fill the gap identified in the question bank:
 *   acquisitions  60 templates
 *   assetManagement  20 templates
 *   portfolioMgmt   16 templates
 *   mortgageUw      16 templates
 *   development     10 templates  ← most underrepresented
 *
 * Format matches SubmissionDraft from src/cloud/questionSubmissions.ts.
 * Each entry is ready to be integrated as a new QuestionTemplate.
 */

import type { SubmissionDraft } from '../../cloud/questionSubmissions';

export const developmentProposals: SubmissionDraft[] = [
  // ─── 1. Residual Land Value ──────────────────────────────────────────────────
  {
    question_type: 'solvable',
    prompt:
      "You're targeting a 6.5% yield on cost on a development with $38M in hard and soft costs (excluding land). Stabilized NOI is projected at $2.73M. What's the maximum you can pay for land (in $)?",
    expected_answer: '4000000',
    unit: 'usd',
    explanation:
      'Max land = (Stabilized NOI / Target YoC) − Hard & Soft Costs. ' +
      '$2.73M / 6.5% = $42M stabilized value. $42M − $38M = $4M residual land value. ' +
      'Paying more erodes the development spread; paying less creates upside.',
    kind_hint: 'residualLandValue',
    role_hint: 'development',
    difficulty_hint: 'intermediate',
    tags: ['development', 'yield-on-cost', 'land'],
  },

  // ─── 2. Construction Interest Carry ─────────────────────────────────────────
  {
    question_type: 'solvable',
    prompt:
      'A $36M construction loan at a 7.5% annual rate has a 24-month draw period. Assuming the average outstanding balance during the draw is 50% of the committed amount, what is the total interest carry (in $)?',
    expected_answer: '2700000',
    unit: 'usd',
    explanation:
      'Interest carry = Committed × Rate × (Months / 12) × Avg balance %. ' +
      '$36M × 7.5% × 2 years × 50% = $2.7M. ' +
      'The 50% average balance assumption reflects a linear draw from $0 to full commitment; ' +
      'front-loaded draws increase this cost materially.',
    kind_hint: 'constructionInterestCarry',
    role_hint: 'development',
    difficulty_hint: 'intermediate',
    tags: ['development', 'construction-loan', 'interest-carry'],
  },

  // ─── 3. Break-Even Development Rent ─────────────────────────────────────────
  {
    question_type: 'solvable',
    prompt:
      "You're developing 120 multifamily units with a total project cost of $30M. Annual operating expenses are $4,200/unit. Your target yield on cost is 6.0%. What is the minimum monthly rent per unit needed to hit your return target (in $)?",
    expected_answer: '1600',
    unit: 'usd',
    explanation:
      'Target NOI = TPC × YoC = $30M × 6.0% = $1.8M. ' +
      'Required gross revenue = NOI + OpEx = $1.8M + (120 × $4,200) = $1.8M + $504K = $2.304M. ' +
      'Monthly rent per unit = $2.304M / 120 units / 12 months = $1,600/unit/mo.',
    kind_hint: 'breakEvenDevRent',
    role_hint: 'development',
    difficulty_hint: 'advanced',
    tags: ['development', 'yield-on-cost', 'multifamily', 'underwriting'],
  },

  // ─── 4. Hard Cost Ratio ──────────────────────────────────────────────────────
  {
    question_type: 'solvable',
    prompt:
      'A ground-up office development has $24M in hard construction costs and $6M in soft costs (architecture, engineering, permits, developer fee, and financing costs). Hard costs are what % of total project cost?',
    expected_answer: '80',
    unit: 'pct',
    explanation:
      'Hard cost % = Hard costs / (Hard + Soft) = $24M / $30M = 80%. ' +
      'Hard costs typically run 60–80% of TPC depending on asset class and location. ' +
      'Higher soft cost % is common in urban high-rise and hospitality.',
    kind_hint: 'hardCostRatio',
    role_hint: 'development',
    difficulty_hint: 'beginner',
    tags: ['development', 'budget', 'hard-costs', 'soft-costs'],
  },

  // ─── 5. Hard Cost Contingency ────────────────────────────────────────────────
  {
    question_type: 'solvable',
    prompt:
      "A developer is budgeting a $22M hard cost build. The lender requires a hard cost contingency of 7.5% of hard costs. What's the contingency reserve in dollars?",
    expected_answer: '1650000',
    unit: 'usd',
    explanation:
      'Contingency = Hard Costs × Contingency % = $22M × 7.5% = $1.65M. ' +
      'Hard cost contingency is carried in the budget to absorb overruns without requiring a budget amendment. ' +
      'Lenders typically require 5–10% for ground-up and 10–15% for adaptive reuse.',
    kind_hint: 'hardCostContingency',
    role_hint: 'development',
    difficulty_hint: 'beginner',
    tags: ['development', 'contingency', 'hard-costs', 'budget'],
  },

  // ─── 6. Lease-Up Velocity ───────────────────────────────────────────────────
  {
    question_type: 'solvable',
    prompt:
      'A newly completed 220-unit apartment building is 35% leased (77 units) and absorbing 20 new signed leases per month. The construction lender requires 90% occupancy to fund the permanent loan conversion. How many months until the property hits the conversion threshold?',
    expected_answer: '7',
    unit: 'usd',
    explanation:
      'Target occupied units = 220 × 90% = 198. Additional leases needed = 198 − 77 = 121. ' +
      'Months = ⌈121 / 20⌉ = ⌈6.05⌉ = 7 months. ' +
      'Slower absorption extends construction loan term and increases carry cost; ' +
      'every additional month burns interest reserve and reduces returns.',
    kind_hint: 'leaseUpVelocity',
    role_hint: 'development',
    difficulty_hint: 'intermediate',
    tags: ['development', 'lease-up', 'construction-loan', 'absorption'],
  },

  // ─── 7. Value Creation ──────────────────────────────────────────────────────
  {
    question_type: 'solvable',
    prompt:
      'Total project cost on a 100-unit multifamily development is $28M. Upon stabilization, the property will generate $1.68M NOI and trade at a 5.25% cap rate. What is the projected value creation in dollars (sale price minus total project cost)?',
    expected_answer: '4000000',
    unit: 'usd',
    explanation:
      'Stabilized value = NOI / Cap rate = $1.68M / 5.25% = $32M. ' +
      'Value creation = $32M − $28M TPC = $4M. ' +
      'This is the unlevered development profit; levered returns to common equity will be higher ' +
      'because debt amplifies the gain on the equity check.',
    kind_hint: 'valueCreation',
    role_hint: 'development',
    difficulty_hint: 'intermediate',
    tags: ['development', 'value-creation', 'cap-rate', 'profit'],
  },

  // ─── 8. Developer Profit Margin ─────────────────────────────────────────────
  {
    question_type: 'solvable',
    prompt:
      'A developer delivers a 45,000 SF office building at a total project cost of $16.2M and sells at certificate of occupancy for $21M. What is the developer profit margin as a % of sale price?',
    expected_answer: '22.86',
    unit: 'pct',
    explanation:
      'Profit = Sale − TPC = $21M − $16.2M = $4.8M. ' +
      'Margin = $4.8M / $21M = 22.86%. ' +
      'Note the denominator: profit as % of sale price (not cost). Expressed on cost it would be $4.8M / $16.2M = 29.6%. ' +
      'Deal sheets typically quote on cost; institutional buyers quote on price — clarify before comparing.',
    kind_hint: 'devProfitMargin',
    role_hint: 'development',
    difficulty_hint: 'intermediate',
    tags: ['development', 'profit-margin', 'exit', 'office'],
  },

  // ─── 9. Pre-Leasing Threshold ────────────────────────────────────────────────
  {
    question_type: 'solvable',
    prompt:
      "A lender requires 30% pre-leasing before funding a $45M construction loan on a 120,000 SF Class A office project. Currently 32,000 SF of executed leases have been signed. How many additional square feet of executed leases are needed to meet the lender's pre-leasing threshold?",
    expected_answer: '4000',
    unit: 'usd',
    explanation:
      'Required pre-leased SF = 30% × 120,000 = 36,000 SF. ' +
      'Gap = 36,000 − 32,000 = 4,000 SF still needed. ' +
      'Pre-leasing is a lender gate, not just a good sign — no commitment without it. ' +
      'LOIs and letters of intent do not count; only executed leases satisfy most lender definitions.',
    kind_hint: 'preLeasingThreshold',
    role_hint: 'development',
    difficulty_hint: 'beginner',
    tags: ['development', 'pre-leasing', 'construction-loan', 'office'],
  },

  // ─── 10. Capital Stack Equity % ─────────────────────────────────────────────
  {
    question_type: 'solvable',
    prompt:
      "A development's total project cost is $60M. The capital stack includes a $38M senior construction loan and $8M of preferred equity. What is the common equity as a % of total project cost?",
    expected_answer: '23.33',
    unit: 'pct',
    explanation:
      'Common equity = TPC − Senior − Preferred = $60M − $38M − $8M = $14M. ' +
      'Common equity % = $14M / $60M = 23.3%. ' +
      'Senior LTC = 63.3%; pref adds 13.3% more leverage for a total stack debt+pref of 76.7%. ' +
      'Higher preferred equity slices raise sponsor IRR but senior lenders often cap total leverage at 80–85% LTC.',
    kind_hint: 'capStackEquityPct',
    role_hint: 'development',
    difficulty_hint: 'intermediate',
    tags: ['development', 'capital-stack', 'equity', 'leverage'],
  },
];
