import type { VocabTerm } from '../../types/vocab';

/** Lease + operations vocabulary — what tenants pay and what landlords pass through. */
export const LEASE_OPS_TERMS: VocabTerm[] = [
  {
    id: 'nnn',
    term: 'NNN (Triple Net)',
    category: 'lease-ops',
    difficulty: 'beginner',
    shortDef:
      'Lease structure where tenant pays base rent + 100% of taxes + insurance + CAM.',
    longDef:
      'Most landlord-friendly mainstream structure. Tenant\'s "all-in" cost = base rent + pass-throughs. Common in retail, single-tenant office, and industrial. Distinct from gross / modified-gross structures where landlord absorbs some / all OpEx.',
    distractors: [
      'Triple Net — three leases on one tenant.',
      'Triple Negotiation — three rounds of renewal.',
      'Net of all reserves.',
    ],
    reverseDistractorIds: ['mg', 'fsg', 'base-year'],
  },
  {
    id: 'mg',
    term: 'MG (Modified Gross)',
    category: 'lease-ops',
    difficulty: 'beginner',
    shortDef:
      'Tenant pays base rent that includes some OpEx; passes through growth above a Base Year.',
    longDef:
      'Hybrid between gross and net. Tenant pays a "gross" rent that bundles base year operating expenses. Year 2+, tenant pays growth above base year. Landlord bears the year 1 OpEx; tenant bears growth. Common in suburban office and Class B commercial.',
    distractors: [
      'Major Gross — gross rent above market median.',
      'Mortgage Gross — gross debt service.',
      'Mid Gross — middle-tier rent in a stack plan.',
    ],
    reverseDistractorIds: ['nnn', 'fsg', 'base-year'],
  },
  {
    id: 'fsg',
    term: 'FSG (Full Service Gross)',
    category: 'lease-ops',
    difficulty: 'beginner',
    shortDef:
      'Most tenant-friendly — landlord pays all OpEx; tenant pays only base rent.',
    longDef:
      'Common in Class A office and amenity-rich buildings. Tenant gets predictability; landlord absorbs OpEx growth (and OpEx cuts). Almost always paired with annual rent escalators (e.g. 3% / yr) to compensate landlord for absorbing OpEx inflation.',
    distractors: [
      'Full Service Group — bundled vendor services.',
      'Free-Service Grant — landlord-provided amenities.',
      'Front-loaded gross rent in early years of lease.',
    ],
    reverseDistractorIds: ['mg', 'nnn', 'base-year'],
  },
  {
    id: 'base-year',
    term: 'Base Year',
    category: 'lease-ops',
    difficulty: 'intermediate',
    shortDef:
      'Year 1 of a lease — actual OpEx that year sets the baseline; tenant pays only growth above it.',
    longDef:
      'Used in Modified Gross and Full Service Gross leases. Year 1 actuals = the "base." Year 2+ tenant pays growth above the base, pro-rata. Often "grossed up" to 95% occupancy if building is below-occupied, which raises the baseline (tenant-friendly).',
    distractors: [
      'The first year of property operation post-construction.',
      'Year used for property tax assessment.',
      'Year of original purchase, indexed for inflation.',
    ],
    reverseDistractorIds: ['expense-stop', 'mg', 'fsg'],
  },
  {
    id: 'expense-stop',
    term: 'Expense Stop',
    category: 'lease-ops',
    difficulty: 'intermediate',
    shortDef:
      'A fixed dollar-per-SF cap on operating expenses; tenant pays everything above.',
    longDef:
      'Like a Base Year but fixed at a stated $/SF rather than recalculated for occupancy. Older / more landlord-friendly structure. The "stop" doesn\'t move with occupancy or inflation — landlord eats below; tenant pays above.',
    distractors: [
      'Cap on annual capex contribution by tenant.',
      'Floor on operating expenses below which lease terminates.',
      'Cap on TI/LC contribution by landlord.',
    ],
    reverseDistractorIds: ['base-year', 'cam', 'rubs'],
  },
  {
    id: 'ti',
    term: 'TI (Tenant Improvements)',
    category: 'lease-ops',
    difficulty: 'beginner',
    shortDef:
      'Build-out allowance landlord pays toward customizing the space for the tenant.',
    longDef:
      'Quoted as $/SF (e.g. "$45/SF TI"). Used to attract tenants without lowering face rent. Amortized over the lease term in NER calculations. Higher TI on a long lease can represent 5-15% of total lease economic value.',
    distractors: [
      'Tax Indemnity — landlord\'s tax obligation pass-through.',
      'Termination Indemnity — fee paid for early lease termination.',
      'Total Investment — sum of capex + TI/LC.',
    ],
    reverseDistractorIds: ['lc', 'ner', 'cam'],
  },
  {
    id: 'lc',
    term: 'LC (Leasing Commission)',
    category: 'lease-ops',
    difficulty: 'beginner',
    shortDef:
      'Broker fee for procuring a tenant — typically 4-6% of total lease value.',
    longDef:
      'Tenant rep + landlord rep splits typically 50/50. Bigger brokerages negotiate harder for tenants. LC + TI together represent a tenant\'s "cost to the landlord" — and are amortized in NER calculations.',
    distractors: [
      'Lease Counterparty — co-tenant on shared space.',
      'Letter of Credit — security deposit alternative.',
      'Lease Commitment — minimum rent obligation.',
    ],
    reverseDistractorIds: ['ti', 'ner', 'cam'],
  },
  {
    id: 'ner',
    term: 'NER (Net Effective Rent)',
    category: 'lease-ops',
    difficulty: 'intermediate',
    shortDef:
      'Face rent net of TI + LC + free rent, amortized over lease term. The economic-truth rent number.',
    longDef:
      'NER = (Total Rent Payable − TI − LC − Free Rent Value) / Total Lease Term. Strips out the puffery in "face rent" headlines. A $50/SF face rent on a 10-yr lease with $80 TI + 6 months free + 5% LC has an NER closer to $42/SF.',
    distractors: [
      'Net Equity Return — IRR after fees.',
      'Negotiated Effective Rent — rent after concessions.',
      'New Effective Rent — first-year base rent only.',
    ],
    reverseDistractorIds: ['ti', 'lc', 'cam'],
  },
  {
    id: 'rubs',
    term: 'RUBS',
    category: 'lease-ops',
    difficulty: 'intermediate',
    shortDef:
      'Ratio Utility Billing System — multifamily method to bill utilities by formula when not metered.',
    longDef:
      'Used when individual unit metering isn\'t feasible. Charges tenants based on apartment size, occupancy, etc. Effectively converts a landlord-paid utility into a tenant pass-through. Reading "RUBS recovery" of $25/unit/mo on an OM = the landlord is monetizing utility billing.',
    distractors: [
      'Resident Utility Billing Schedule — month-by-month tenant utility bill.',
      'Repair / Upgrade Billing System — capex pass-through.',
      'Rental Unit Bill-Back Standard — required pass-through under HUD rules.',
    ],
    reverseDistractorIds: ['cam', 'expense-stop', 'concession'],
  },
  {
    id: 'cam',
    term: 'CAM',
    category: 'lease-ops',
    difficulty: 'beginner',
    shortDef:
      'Common Area Maintenance — operating expenses for shared spaces, passed through to tenants.',
    longDef:
      'Janitorial, security, parking, landscaping, building elevators, common HVAC. Different from real estate taxes + insurance, which are usually billed separately. Tenants typically pay pro-rata share. Annual reconciliation true-up adjusts estimates to actuals.',
    distractors: [
      'Capital Asset Management — capex management fee.',
      'Combined Allowance Method — CAM accounting standard.',
      'Calendar Adjustment Method — CAM month-end true-up.',
    ],
    reverseDistractorIds: ['rubs', 'ner', 'expense-stop'],
  },
  {
    id: 'walt',
    term: 'WALT',
    category: 'lease-ops',
    difficulty: 'intermediate',
    shortDef:
      'Weighted-Avg Lease Term — average lease duration weighted by either rent or SF.',
    longDef:
      'WALT (rent-weighted) = Σ(rent × remaining term) / Σ(rent). Used in office and industrial. Higher WALT = more income predictability + lower rollover risk. Investors price WALT premium into stabilized values; trophy office at 8+ years WALT trades at tighter caps.',
    distractors: [
      'Weighted Asset Lease Term — weighted by asset class.',
      'Weighted Average Loan Term — debt maturity weighted by balance.',
      'Working Asset Liquidity Test — cash-flow stress measure.',
    ],
    reverseDistractorIds: ['rollover', 'rent-roll', 'ner'],
  },
  {
    id: 'loss-to-lease',
    term: 'Loss to Lease',
    category: 'lease-ops',
    difficulty: 'intermediate',
    shortDef:
      'Difference between in-place rent and current market rent — the embedded mark-to-market upside.',
    longDef:
      'Loss to Lease = (Market Rent − In-Place Rent) / Market Rent. A 5% loss-to-lease on a $4M GPR property = $200k/yr of recoverable income on lease renewals. The bigger the LTL, the more value-add embedded in the rent roll.',
    distractors: [
      'Income lost when a lease expires without renewal.',
      'Income lost during free-rent period of a new lease.',
      'Cumulative rent reduction from concessions.',
    ],
    reverseDistractorIds: ['mark-to-market', 'concession', 'ner'],
  },
  {
    id: 'mark-to-market',
    term: 'Mark to Market',
    category: 'lease-ops',
    difficulty: 'intermediate',
    shortDef:
      'Process of bringing in-place rents up to current market rates as leases roll.',
    longDef:
      'Captured via lease renewals at market or new tenants at market. Drives organic NOI growth in value-add deals. The natural rent-growth lever beyond inflationary CPI bumps. The "mark-to-market opportunity" is a recurring sales-pitch line in OMs.',
    distractors: [
      'Daily revaluation of asset to current bid-ask.',
      'Quarterly NAV adjustment for LP reporting.',
      'Annual rent escalator tied to a published index.',
    ],
    reverseDistractorIds: ['loss-to-lease', 'concession', 'ner'],
  },
  {
    id: 'concession',
    term: 'Concession',
    category: 'lease-ops',
    difficulty: 'beginner',
    shortDef:
      'Free rent or other tenant inducement (TI top-up, parking) to close a lease.',
    longDef:
      'Common forms: free months ("2 months free on a 12-month lease" = 17% concession), increased TI / LC, signing bonuses, abated parking. Concessions reduce NER without reducing face rent — a tactic to maintain market-headline pricing.',
    distractors: [
      'Tenant\'s right to break the lease early without penalty.',
      'Reduction in security deposit at lease end.',
      'Landlord\'s discount on tax pass-through.',
    ],
    reverseDistractorIds: ['ner', 'concession', 'mark-to-market'],
  },
  {
    id: 'bad-debt',
    term: 'Bad Debt',
    category: 'lease-ops',
    difficulty: 'intermediate',
    shortDef:
      'Rent that wasn\'t collected — tenant skips, defaults, or goes 90+ days late.',
    longDef:
      'Reported as a percentage of gross rent (e.g. "2% bad debt"). A leading indicator of tenant credit deterioration. Spikes in recessions, Class B / C properties, or markets with rapid economic decline.',
    distractors: [
      'Debt service that defaults on the loan.',
      'Sponsor\'s defaulted capital contribution.',
      'Mezzanine loan that goes into special servicing.',
    ],
    reverseDistractorIds: ['concession', 'vacancy', 'rubs'],
  },
  {
    id: 'going-in-cap',
    term: 'Going-In Cap',
    category: 'lease-ops',
    difficulty: 'beginner',
    shortDef:
      'Year-1 NOI ÷ purchase price. The cap rate at acquisition.',
    longDef:
      '"Going-in" because it\'s the cap when you "go in" (acquire). Distinguished from "exit cap" or "terminal cap" used for sale. Going-in cap expansion vs comp-set cap = potential value-creation; compression = potential value-loss.',
    distractors: [
      'Average cap rate over the hold period.',
      'Cap rate net of pro-forma adjustments.',
      'Cap rate on the going-concern value.',
    ],
    reverseDistractorIds: ['exit-cap', 'cap-rate', 'debt-yield'],
  },
  {
    id: 'exit-cap',
    term: 'Exit Cap (Terminal Cap)',
    category: 'lease-ops',
    difficulty: 'intermediate',
    shortDef:
      'Cap rate used to compute sale value at exit — typically 50-100 bps wider than going-in.',
    longDef:
      'Exit cap reflects: aging asset (more capex needed), market cap-rate movement, buyer\'s required return premium. Sponsors who underwrite tight exit caps (< 25 bps spread) are betting on cap-rate compression — a dangerous assumption.',
    distractors: [
      'Cap rate at the date of sponsor exit from the JV.',
      'Cap rate adjusted for debt assumption.',
      'Cap rate at refinance, if not selling.',
    ],
    reverseDistractorIds: ['going-in-cap', 'cap-rate', 'debt-yield'],
  },
];
