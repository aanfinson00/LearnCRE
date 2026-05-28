/**
 * Question bank additions targeting the most underrepresented areas.
 *
 * Gap analysis (by asset class / category in the live question bank):
 *   Hotel situational     — 1 case  (critical gap)
 *   Absorption category   — 1 case  (critical gap)
 *   Retail situational    — 2 cases (high gap)
 *   Sensitivity category  — 2 cases (high gap)
 *   Comp-selection        — 2 cases (high gap)
 *   Lease-econ category   — 2 cases (high gap)
 *   Industrial situational— 3 cases (medium gap)
 *   Development role      — 10 of 69 templates (medium gap)
 *
 * These 10 drafts address hotel (2), retail (3), industrial (2), and
 * development/construction (3) — the thinnest coverage in the math/calc
 * question bank. Each is ready to insert into question_submissions once the
 * table is deployed.
 */

import type { SubmissionDraft } from '../cloud/questionSubmissions';

export const questionBankDrafts: SubmissionDraft[] = [
  // ─── HOTEL (2 questions) ──────────────────────────────────────────────────
  // Hotel has only 1 situational case and 4 template kinds total (gopMargin,
  // revparFromAdrOcc, ffeReserveDollars, revporVsRevpar). These add alternate
  // phrasings for gopMargin and revparFromAdrOcc.

  {
    question_type: 'solvable',
    prompt:
      'A 180-key select-service hotel posts T-12 rooms revenue of $6.2M and F&B revenue of $380k. ' +
      'Rooms departmental costs are $2.1M; F&B departmental costs are $310k. ' +
      'Undistributed operating expenses (A&G, sales & marketing, maintenance, utilities) total $1.4M. ' +
      'What is the hotel\'s Gross Operating Profit (GOP) margin as a percentage of total revenue? ' +
      'Round to one decimal place.',
    expected_answer: '42.1',
    unit: 'pct',
    explanation:
      'Total revenue = $6.2M + $0.38M = $6.58M. ' +
      'Departmental profit = $6.58M – $2.1M – $0.31M = $4.17M. ' +
      'GOP = $4.17M – $1.4M = $2.77M. ' +
      'GOP margin = $2.77M / $6.58M = 42.1%.',
    kind_hint: 'gopMargin',
    role_hint: 'assetManagement',
    difficulty_hint: 'intermediate',
    tags: ['hotel', 'gop', 'margin', 'select-service', 'noi-bridge'],
  },

  {
    question_type: 'solvable',
    prompt:
      'A 220-key mountain resort runs an average ADR of $285 and an average occupancy rate of 88% ' +
      'during its peak summer season (June–August, 92 days). ' +
      'What is the RevPAR for this period? Round to the nearest dollar.',
    expected_answer: '251',
    unit: 'usd',
    explanation:
      'RevPAR = ADR × Occupancy = $285 × 0.88 = $250.80 ≈ $251. ' +
      'The 92-day season length and key count are context but do not change the RevPAR formula.',
    kind_hint: 'revparFromAdrOcc',
    role_hint: 'acquisitions',
    difficulty_hint: 'beginner',
    tags: ['hotel', 'revpar', 'adr', 'occupancy', 'resort'],
  },

  // ─── RETAIL (3 questions) ─────────────────────────────────────────────────
  // Retail has only 2 situational cases. These add alternate phrasings for
  // percentageRentBreakpoint, salesPerSf, and occupancyCostRatio.

  {
    question_type: 'solvable',
    prompt:
      'A fitness studio tenant pays $72,000/year in base rent. Their lease includes 8% percentage rent ' +
      'on gross revenue above the natural breakpoint. ' +
      'The tenant reports $1.25M in annual gross revenue. ' +
      'How much additional percentage rent does the landlord collect above the base rent?',
    expected_answer: '28000',
    unit: 'usd',
    explanation:
      'Natural breakpoint = base rent ÷ percentage rate = $72,000 / 0.08 = $900,000. ' +
      'Overage = $1,250,000 – $900,000 = $350,000. ' +
      'Percentage rent = 8% × $350,000 = $28,000.',
    kind_hint: 'percentageRentBreakpoint',
    role_hint: 'assetManagement',
    difficulty_hint: 'beginner',
    tags: ['retail', 'percentage-rent', 'natural-breakpoint', 'fitness', 'lease-econ'],
  },

  {
    question_type: 'solvable',
    prompt:
      'A mixed-use retail center has four inline tenants. Their leasable SF and annual gross sales are: ' +
      'Tenant A — 3,200 SF, $1.44M; Tenant B — 4,800 SF, $1.85M; ' +
      'Tenant C — 5,000 SF, $2.10M; Tenant D — 5,500 SF, $2.475M. ' +
      'What is the weighted-average sales per SF across all four tenants? Round to the nearest dollar.',
    expected_answer: '425',
    unit: 'usdPerSf',
    explanation:
      'Total SF = 3,200 + 4,800 + 5,000 + 5,500 = 18,500 SF. ' +
      'Total sales = $1.44M + $1.85M + $2.10M + $2.475M = $7.865M. ' +
      'Weighted avg = $7,865,000 / 18,500 = $425.14/SF ≈ $425/SF.',
    kind_hint: 'salesPerSf',
    role_hint: 'acquisitions',
    difficulty_hint: 'intermediate',
    tags: ['retail', 'sales-per-sf', 'inline-tenants', 'mixed-use', 'productivity'],
  },

  {
    question_type: 'solvable',
    prompt:
      'A fast-casual restaurant occupies 2,800 SF at a base rent of $42/SF NNN. ' +
      'T-12 gross restaurant sales are $1.26M. ' +
      'What is the tenant\'s occupancy cost ratio (annual rent ÷ annual gross sales)? ' +
      'Round to two decimal places.',
    expected_answer: '9.33',
    unit: 'pct',
    explanation:
      'Annual rent = 2,800 SF × $42/SF = $117,600. ' +
      'OCR = $117,600 / $1,260,000 = 9.33%. ' +
      'Industry health range for QSR/fast-casual is roughly 8–12%; 9.3% is within the acceptable band.',
    kind_hint: 'occupancyCostRatio',
    role_hint: 'acquisitions',
    difficulty_hint: 'beginner',
    tags: ['retail', 'occupancy-cost-ratio', 'restaurant', 'nnn', 'tenant-health'],
  },

  // ─── INDUSTRIAL (2 questions) ─────────────────────────────────────────────
  // Industrial has only 3 situational cases. These add alternate phrasings for
  // clearHeightPremium and truckCountPerSf.

  {
    question_type: 'solvable',
    prompt:
      'An industrial submarket has two recently leased warehouses: ' +
      'a 80,000 SF ambient warehouse (28\' clear) at $9.25/SF NNN ' +
      'and a 75,000 SF refrigerated cold-storage facility (28\' clear) at $14.34/SF NNN. ' +
      'A new 50,000 SF cold-storage building is coming to market. ' +
      'If the cold-storage premium holds, and the current ambient rate has risen to $9.75/SF NNN, ' +
      'what is the expected NNN asking rent for the new cold-storage building? ' +
      'Use the same premium ratio and round to the nearest cent.',
    expected_answer: '15.11',
    unit: 'usdPerSf',
    explanation:
      'Cold-storage premium ratio = $14.34 / $9.25 = 1.5503x (55% premium over ambient). ' +
      'Apply the same ratio to the new ambient rate: $9.75 × 1.5503 = $15.11/SF NNN. ' +
      'The 50,000 SF building size is context; it does not change the per-SF pricing.',
    kind_hint: 'clearHeightPremium',
    role_hint: 'acquisitions',
    difficulty_hint: 'intermediate',
    tags: ['industrial', 'cold-storage', 'clear-height', 'rent-premium', 'logistics'],
  },

  {
    question_type: 'multipleChoice',
    prompt:
      'A developer is sizing dock doors for a 350,000 SF cross-dock fulfillment facility. ' +
      'Industry standard for e-commerce fulfillment operations is 1 dock door per 4,500–5,500 SF. ' +
      'Which range best represents the appropriate dock door count for this building?',
    choices: [
      'A. 45–55 dock doors',
      'B. 64–78 dock doors',
      'C. 90–110 dock doors',
      'D. 120–140 dock doors',
    ],
    expected_answer: 'B',
    explanation:
      'Low end: 350,000 SF ÷ 5,500 SF/dock = 63.6 → 64 docks. ' +
      'High end: 350,000 SF ÷ 4,500 SF/dock = 77.8 → 78 docks. ' +
      'Range: 64–78 dock doors. ' +
      'A is too few (implies ~7,000 SF/dock, last-mile suburban). ' +
      'C and D imply 3,500 or 2,500 SF/dock, typical of grocery-warehouse cross-docks, not standard e-com fulfillment.',
    kind_hint: 'truckCountPerSf',
    role_hint: 'development',
    difficulty_hint: 'intermediate',
    tags: ['industrial', 'dock-doors', 'cross-dock', 'fulfillment', 'sizing', 'e-commerce'],
  },

  // ─── DEVELOPMENT / CONSTRUCTION (3 questions) ────────────────────────────
  // Development role has only 10 of 69 templates. These add alternate phrasings
  // for retainageRunning, contingencyDrawDown, and drawAllocation.

  {
    question_type: 'solvable',
    prompt:
      'A $28M hotel construction contract carries standard 10% retainage on all draws. ' +
      'After $18.2M of completed work, the GC requests a retainage reduction to 5% ' +
      'on all remaining work. The remaining contract value is $9.8M. ' +
      'By how many dollars does the owner\'s retainage balance decrease if the reduction is approved?',
    expected_answer: '490000',
    unit: 'usd',
    explanation:
      'Retainage on remaining $9.8M at 10%: $980,000. ' +
      'Retainage on remaining $9.8M at 5%: $490,000. ' +
      'Reduction in retainage held = $980,000 – $490,000 = $490,000. ' +
      'The $18.2M already retained ($1.82M) is unaffected — the reduction applies only to future draws.',
    kind_hint: 'retainageRunning',
    role_hint: 'development',
    difficulty_hint: 'intermediate',
    tags: ['construction', 'retainage', 'hotel', 'development', 'gmp-contract'],
  },

  {
    question_type: 'solvable',
    prompt:
      'A 500,000 SF industrial development has a $4.2M contingency budget. ' +
      'At 70% project completion, $2.1M of contingency has been drawn. ' +
      'The remaining scope includes two elevated-risk contracts: ' +
      'steel erection ($800k remaining) and site utilities ($600k remaining). ' +
      'The PM assigns 15% contingency to each. ' +
      'What percentage of the remaining contingency balance is now earmarked for these two contracts?',
    expected_answer: '10',
    unit: 'pct',
    explanation:
      'Remaining contingency = $4.2M – $2.1M = $2.1M. ' +
      'Steel risk = 15% × $800k = $120k. ' +
      'Utilities risk = 15% × $600k = $90k. ' +
      'Total earmarked = $210k. ' +
      'Earmarked % = $210k / $2.1M = 10.0%.',
    kind_hint: 'contingencyDrawDown',
    role_hint: 'development',
    difficulty_hint: 'advanced',
    tags: ['construction', 'contingency', 'industrial', 'development', 'risk-allocation'],
  },

  {
    question_type: 'solvable',
    prompt:
      'A mixed-use development construction loan funds at 95% of hard costs and 90% of soft costs. ' +
      'During the third draw period the following work was completed and invoiced: ' +
      'foundations $2.4M, structural steel $5.8M, MEP rough-in $1.6M, ' +
      'and architect / engineer fees (soft costs) $480k. ' +
      'What is the total draw amount the lender funds for this period?',
    expected_answer: '9742000',
    unit: 'usd',
    explanation:
      'Hard costs = $2.4M + $5.8M + $1.6M = $9.8M. ' +
      'Soft costs = $0.48M. ' +
      'Draw = 95% × $9.8M + 90% × $0.48M = $9.31M + $0.432M = $9.742M = $9,742,000.',
    kind_hint: 'drawAllocation',
    role_hint: 'development',
    difficulty_hint: 'intermediate',
    tags: ['construction', 'draw', 'mixed-use', 'development', 'loan-mechanics', 'hard-costs', 'soft-costs'],
  },
];
