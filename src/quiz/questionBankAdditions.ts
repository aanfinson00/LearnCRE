/**
 * Question Bank Pipeline — Potential New Phrasings
 *
 * These 10 question prompts target the three most under-represented areas
 * in the template library:
 *
 *   Industrial   2 templates  →  clearHeightPremium, truckCountPerSf
 *   Retail       2 templates  →  salesPerSf, percentageRentBreakpoint
 *   Tax/After-Tax 2 templates →  taxAdjustedExit, taxReassessment
 *   Growth/Time  3 templates  →  cagr, compoundGrowth, reversionValue
 *
 * Each entry uses the SubmissionDraft shape so it can be bulk-inserted into
 * question_submissions (via submitQuestion) once the table is live, or
 * reviewed here and promoted directly to full QuestionTemplate files.
 */

import type { SubmissionDraft } from '../cloud/questionSubmissions';

// ---------------------------------------------------------------------------
// INDUSTRIAL  (3 new)  — currently only clearHeightPremium + truckCountPerSf
// ---------------------------------------------------------------------------

/**
 * Land Cost Per Building SF
 * Formula: land price $/SF ÷ site coverage ratio
 * Example: $2.80/SF land ÷ 40% coverage = $7.00/SF of building
 */
export const landCostPerBuildingSf: SubmissionDraft = {
  question_type: 'solvable',
  prompt:
    'A developer acquires a 15-acre industrial site for $2.80/SF of land. The planned ' +
    'building is 260,000 SF and occupies exactly 40% of the site. What is the effective ' +
    'land cost per SF of building?',
  expected_answer: '7.00',
  unit: 'usdPerSf',
  explanation:
    'Effective land $/SF of building = land price $/SF ÷ coverage ratio. ' +
    '$2.80 ÷ 0.40 = $7.00/SF. Coverage drives how efficiently a developer converts ' +
    'raw land cost into productive building area — the lower the coverage, the higher ' +
    'the per-SF land carry.',
  kind_hint: 'landCostPerBuildingSf',
  role_hint: 'acquisitions',
  difficulty_hint: 'intermediate',
  tags: ['industrial', 'development', 'land', 'coverage'],
};

/**
 * Cold Storage Rent Premium
 * Formula: dry warehouse rent × (1 + cold-storage premium %)
 * Example: $10.50/SF × 1.40 = $14.70/SF
 */
export const coldStoragePremium: SubmissionDraft = {
  question_type: 'solvable',
  prompt:
    'Dry warehouse in this submarket leases for $10.50/SF NNN. Cold-storage ' +
    'space commands a 40% premium over comparable dry warehouse. What is the ' +
    'asking rent for a 60,000 SF refrigerated distribution facility?',
  expected_answer: '14.70',
  unit: 'usdPerSf',
  explanation:
    'Cold-storage rent = dry rent × (1 + premium). $10.50 × 1.40 = $14.70/SF. ' +
    'Cold storage premiums (30–60%) reflect the capital cost of refrigeration systems, ' +
    'higher power requirements, and the limited supply of purpose-built facilities.',
  kind_hint: 'coldStoragePremium',
  role_hint: 'acquisitions',
  difficulty_hint: 'intermediate',
  tags: ['industrial', 'cold-storage', 'rent-premium'],
};

/**
 * Power Density (Watts per SF)
 * Formula: installed kW × 1,000 ÷ building SF
 * Example: 3,600 kW × 1,000 ÷ 180,000 SF = 20 W/SF
 */
export const powerDensityPerSf: SubmissionDraft = {
  question_type: 'solvable',
  prompt:
    'A 180,000 SF advanced manufacturing facility has 3.6 MW of installed electrical ' +
    'capacity. What is the available power density in watts per SF?',
  expected_answer: '20',
  unit: 'multiple',
  explanation:
    'Power density (W/SF) = (MW × 1,000,000) ÷ SF. 3,600,000 W ÷ 180,000 SF = 20 W/SF. ' +
    'Light manufacturing typically needs 3–5 W/SF; heavy manufacturing or data-adjacent ' +
    'uses require 20–50 W/SF. Power delivery is increasingly a hard constraint in ' +
    'industrial underwriting.',
  kind_hint: 'powerDensityPerSf',
  role_hint: 'acquisitions',
  difficulty_hint: 'advanced',
  tags: ['industrial', 'power', 'infrastructure'],
};

// ---------------------------------------------------------------------------
// RETAIL  (3 new)  — currently only salesPerSf + percentageRentBreakpoint
// ---------------------------------------------------------------------------

/**
 * Percentage Rent Overage (above natural breakpoint)
 * Formula: (tenant sales − natural breakpoint) × percentage rate
 * Example: ($4.5M − $3.2M) × 5% = $65,000
 */
export const percentageRentOverage: SubmissionDraft = {
  question_type: 'solvable',
  prompt:
    'A retail lease has $160,000 base rent and a 5% percentage-rent clause on sales ' +
    'above the natural breakpoint. The tenant reports $4.5M in annual sales. The natural ' +
    'breakpoint is $3.2M. How much percentage rent (overage rent) does the landlord collect?',
  expected_answer: '65000',
  unit: 'usd',
  explanation:
    'Overage rent = (actual sales − natural breakpoint) × pct rate. ' +
    '($4,500,000 − $3,200,000) × 5% = $65,000. This is additive to base rent — ' +
    'the landlord collects $225,000 total. Breakpoint = base rent ÷ rate = $160K ÷ 5% = $3.2M.',
  kind_hint: 'percentageRentOverage',
  role_hint: 'acquisitions',
  difficulty_hint: 'intermediate',
  tags: ['retail', 'percentage-rent', 'overage'],
};

/**
 * Co-Tenancy Rent Reduction (dollar impact)
 * Formula: (standard rent − co-tenancy rent) × SF
 * Example: ($38 − $24) × 7,500 SF = $105,000 annual rent reduction
 */
export const coTenancyRentReduction: SubmissionDraft = {
  question_type: 'solvable',
  prompt:
    "An inline retail tenant's lease requires the center's anchor to remain open. " +
    'Current rent is $38/SF on 7,500 SF. The co-tenancy clause drops rent to $24/SF ' +
    'if the anchor goes dark. The anchor vacates. What is the annual rent reduction in dollars?',
  expected_answer: '105000',
  unit: 'usd',
  explanation:
    'Rent reduction = (full rent − co-tenancy rent) × SF. ($38 − $24) × 7,500 = $105,000/yr. ' +
    'Co-tenancy clauses are a key retail lease risk factor: landlords model them as a downside ' +
    'scenario in NOI stress tests, especially for anchored strips dependent on a single draw tenant.',
  kind_hint: 'coTenancyRentReduction',
  role_hint: 'acquisitions',
  difficulty_hint: 'intermediate',
  tags: ['retail', 'co-tenancy', 'anchor', 'lease-risk'],
};

/**
 * Anchor vs. Inline Blended Rent
 * Formula: (anchor rent × anchor SF + inline rent × inline SF) ÷ total SF
 * Example: ($4 × 45,000 + $28 × 55,000) ÷ 100,000 = $17.20/SF
 */
export const anchorVsInlineBlendedRent: SubmissionDraft = {
  question_type: 'solvable',
  prompt:
    "A community shopping center's inline tenants pay an average of $28/SF on 55,000 SF. " +
    'The anchor tenant occupies 45,000 SF at $4/SF. What is the blended average rent ' +
    'across all 100,000 SF?',
  expected_answer: '17.20',
  unit: 'usdPerSf',
  explanation:
    'Blended rent = weighted average by SF. ($28 × 55,000 + $4 × 45,000) ÷ 100,000 = ' +
    '($1,540,000 + $180,000) ÷ 100,000 = $17.20/SF. Anchor tenants often pay below-market ' +
    'rent as a traffic driver — the true economics are in the inline rents they support.',
  kind_hint: 'anchorVsInlineBlendedRent',
  role_hint: 'acquisitions',
  difficulty_hint: 'beginner',
  tags: ['retail', 'anchor', 'blended-rent', 'weighted-average'],
};

// ---------------------------------------------------------------------------
// TAX / AFTER-TAX  (2 new)  — currently only taxAdjustedExit + taxReassessment
// ---------------------------------------------------------------------------

/**
 * 1031 Exchange Boot Tax
 * Formula: boot received × capital gains tax rate
 * Example: $400,000 boot × 20% = $80,000 tax
 */
export const exchangeBootTax: SubmissionDraft = {
  question_type: 'solvable',
  prompt:
    'An investor sells a property for $3.5M and completes a 1031 exchange into a $3.1M ' +
    'replacement property. The $400,000 cash boot received is fully taxable as long-term ' +
    'capital gain at 20%. What is the tax owed on the boot?',
  expected_answer: '80000',
  unit: 'usd',
  explanation:
    'Boot tax = boot amount × applicable rate. $400,000 × 20% = $80,000. ' +
    'Boot is any cash or non-like-kind property received in a 1031 exchange — the portion ' +
    'of realized gain that cannot be sheltered by the deferral. To defer 100% of the gain, ' +
    'the replacement property must be equal or greater in value and equity.',
  kind_hint: 'exchangeBootTax',
  role_hint: 'portfolioMgmt',
  difficulty_hint: 'intermediate',
  tags: ['tax', '1031-exchange', 'boot', 'capital-gains'],
};

/**
 * Straight-Line Depreciation Annual Deduction
 * Formula: (purchase price − land value) ÷ depreciable life (39 years commercial)
 * Example: ($9.2M − $1.7M) ÷ 39 = $192,308/yr
 */
export const depreciateStraightLine: SubmissionDraft = {
  question_type: 'solvable',
  prompt:
    'An office building is acquired for $9.2M. The land is appraised at $1.7M (non-depreciable). ' +
    'The building is depreciated straight-line over the 39-year commercial recovery period. ' +
    'What is the annual depreciation deduction?',
  expected_answer: '192308',
  unit: 'usd',
  explanation:
    'Annual depreciation = depreciable basis ÷ recovery period. ' +
    '($9,200,000 − $1,700,000) ÷ 39 = $7,500,000 ÷ 39 ≈ $192,308/yr. ' +
    'Depreciation shields ordinary income dollar-for-dollar while the property appreciates — ' +
    'the tax "phantom loss" is one of commercial real estate\'s core return drivers.',
  kind_hint: 'depreciateStraightLine',
  role_hint: 'portfolioMgmt',
  difficulty_hint: 'intermediate',
  tags: ['tax', 'depreciation', 'straight-line', 'after-tax'],
};

// ---------------------------------------------------------------------------
// GROWTH / TIME VALUE  (2 new)  — currently only cagr, compoundGrowth, reversionValue
// ---------------------------------------------------------------------------

/**
 * Rent Escalation — Future Year Rent
 * Formula: starting rent × (1 + annual escalation) ^ years elapsed
 * Example: $32/SF × (1.03)^4 = $36.02/SF
 */
export const rentEscalationFutureYear: SubmissionDraft = {
  question_type: 'solvable',
  prompt:
    'An office lease starts at $32/SF in year 1 and escalates 3% per year at each anniversary. ' +
    'What is the base rent at the beginning of year 5 (after 4 annual step-ups)?',
  expected_answer: '36.02',
  unit: 'usdPerSf',
  explanation:
    'Future rent = starting rent × (1 + g)^n. $32 × (1.03)^4 = $32 × 1.12551 ≈ $36.02/SF. ' +
    'Lease escalations compound just like investment returns. In a 10-year lease at 3%, ' +
    'year-10 rent is ~34% higher than year-1 — a meaningful driver of NOI growth and exit value.',
  kind_hint: 'rentEscalationFutureYear',
  role_hint: 'acquisitions',
  difficulty_hint: 'beginner',
  tags: ['growth', 'rent-escalation', 'compound-growth', 'lease'],
};

/**
 * NOI Projection — Future Year
 * Formula: current NOI × (1 + growth rate) ^ years
 * Example: $925,000 × (1.025)^5 = $1,046,553
 */
export const noiProjectionFutureYear: SubmissionDraft = {
  question_type: 'solvable',
  prompt:
    'Stabilized NOI today is $925,000 and is underwritten at 2.5% annual growth. ' +
    'What is the projected NOI at the start of year 6 (i.e., after 5 years of growth)?',
  expected_answer: '1046553',
  unit: 'usd',
  explanation:
    'Future NOI = current NOI × (1 + g)^n. $925,000 × (1.025)^5 = $925,000 × 1.13141 ' +
    '≈ $1,046,553. This forward NOI is the numerator for the exit cap-rate reversion value — ' +
    'small changes in the growth rate assumption compound significantly over a 5–7 year hold.',
  kind_hint: 'noiProjectionFutureYear',
  role_hint: 'acquisitions',
  difficulty_hint: 'beginner',
  tags: ['growth', 'noi', 'projection', 'compound-growth', 'reversion'],
};

// ---------------------------------------------------------------------------
// All 10 additions in one export for bulk review / seeding
// ---------------------------------------------------------------------------

export const questionBankAdditions: SubmissionDraft[] = [
  // Industrial
  landCostPerBuildingSf,
  coldStoragePremium,
  powerDensityPerSf,
  // Retail
  percentageRentOverage,
  coTenancyRentReduction,
  anchorVsInlineBlendedRent,
  // Tax / After-Tax
  exchangeBootTax,
  depreciateStraightLine,
  // Growth / Time Value
  rentEscalationFutureYear,
  noiProjectionFutureYear,
];
