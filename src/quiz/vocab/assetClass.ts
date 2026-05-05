import type { VocabTerm } from '../../types/vocab';

/** Asset-class + market vocabulary — the mode-specific language for hotels, retail, industrial, office, MF. */
export const ASSET_CLASS_TERMS: VocabTerm[] = [
  {
    id: 'adr',
    term: 'ADR',
    category: 'asset-class',
    difficulty: 'beginner',
    shortDef: 'Average Daily Rate — total room revenue ÷ rooms sold. Hotel-only metric.',
    longDef:
      'ADR = Room Revenue / Rooms Sold. Excludes complimentary or out-of-order rooms. Tracks pricing power. Pair with occupancy: high occ + low ADR = value-priced; low occ + high ADR = premium-pricing strategy.',
    distractors: [
      'Average Daily Rent — multifamily daily rent.',
      'Annual Discount Rate — fund-level NPV discount.',
      'Adjusted Debt Ratio — loan covenant test.',
    ],
    reverseDistractorIds: ['revpar', 'gop', 'occupancy'],
  },
  {
    id: 'revpar',
    term: 'RevPAR',
    category: 'asset-class',
    difficulty: 'beginner',
    shortDef:
      'Revenue Per Available Room — room revenue ÷ all available rooms (occupied + vacant).',
    longDef:
      'RevPAR = ADR × Occupancy. The headline hotel-performance metric — combines pricing and demand into one number. Industry comp benchmark via STR (Smith Travel) reports.',
    distractors: [
      'Revenue Per Annual Rent — apartment metric.',
      'Reverse Per-Allocation Ratio — fund accounting.',
      'Revenue Per Available Room-night, weighted by ADR.',
    ],
    reverseDistractorIds: ['adr', 'occupancy', 'gop'],
  },
  {
    id: 'gop',
    term: 'GOP',
    category: 'asset-class',
    difficulty: 'intermediate',
    shortDef:
      'Gross Operating Profit — hotel-level profit after departmental + undistributed expenses, before fixed costs.',
    longDef:
      'GOP = Total Revenue − Direct + Allocated Operating Costs (rooms, F&B, admin, marketing, repairs). Reported on the Uniform System of Accounts for the Lodging Industry (USALI). NOI starts from GOP, then subtracts taxes, insurance, and FF&E reserve.',
    distractors: [
      'Gross Operating Plan — hotel\'s annual operating budget.',
      'Group Operating Profit — multi-property metric.',
      'Gross Owner Plan — owner\'s share of profits.',
    ],
    reverseDistractorIds: ['noi', 'revpar', 'ebitda'],
  },
  {
    id: 'occupancy',
    term: 'Occupancy',
    category: 'asset-class',
    difficulty: 'beginner',
    shortDef:
      'Percentage of available units / rooms / SF actually leased / sold.',
    longDef:
      'For multifamily: leased units / total units. For hotels: rooms sold / rooms available. For office: leased SF / total SF. The *demand* signal in the demand × pricing identity.',
    distractors: [
      'Vacancy rate — % unoccupied.',
      'Absorption rate — change in occupancy.',
      'Tenant retention rate at lease expiration.',
    ],
    reverseDistractorIds: ['vacancy', 'absorption', 'walt'],
  },
  {
    id: 'vacancy',
    term: 'Vacancy',
    category: 'asset-class',
    difficulty: 'beginner',
    shortDef:
      'Inverse of occupancy — percentage of available space that is unleased.',
    longDef:
      'Vacancy = 1 − Occupancy. Underwriting always assumes some vacancy ("frictional vacancy") of 3-5% even at "stabilized" occupancy. A 0% vacancy assumption = sponsor flagged as too aggressive.',
    distractors: [
      'Tenant turnover during a calendar quarter.',
      'Available space at market rent.',
      'Move-out rate at lease expiration.',
    ],
    reverseDistractorIds: ['occupancy', 'absorption', 'concession'],
  },
  {
    id: 'absorption',
    term: 'Absorption',
    category: 'asset-class',
    difficulty: 'intermediate',
    shortDef:
      'Change in leased / occupied space over a period — "how fast is the market eating supply?"',
    longDef:
      'Net absorption = Leased SF this period − Vacated SF this period. Positive = market tightening; negative = market loosening. Pre-leasing for new construction critical: how much do you need pre-leased before lender funds? Often 50%+.',
    distractors: [
      'Annual rent escalator on a multi-year lease.',
      'Cap rate adjustment for market velocity.',
      'Renewal rate at lease expiration.',
    ],
    reverseDistractorIds: ['vacancy', 'occupancy', 'walt'],
  },
  {
    id: 'msa',
    term: 'MSA',
    category: 'asset-class',
    difficulty: 'beginner',
    shortDef:
      'Metropolitan Statistical Area — Census-defined urban region for benchmarking comps + demographics.',
    longDef:
      'OMB-defined regions: NYC, LA, Chicago, etc. There are ~380 MSAs nationwide. CRE professionals refer to "top-50" and "top-25" MSAs as proxies for institutional-quality markets. Submarkets sit within MSAs.',
    distractors: [
      'Master Service Agreement — vendor contract.',
      'Multi-Stop Acquisition — JV deal structure.',
      'Mortgage Servicing Agency — loan servicer.',
    ],
    reverseDistractorIds: ['cbsa', 'submarket', 'comp-set'],
  },
  {
    id: 'cbsa',
    term: 'CBSA',
    category: 'asset-class',
    difficulty: 'advanced',
    shortDef:
      'Core-Based Statistical Area — superset of MSAs + smaller "Micropolitan" areas (10k-50k urban core).',
    longDef:
      'CBSA = MSA + μSA (Micropolitan). All MSAs are CBSAs; not all CBSAs are MSAs. Used in finer-grained demographic analysis. Most CRE pros default to MSA-level analysis; CBSA matters when looking at smaller / secondary markets.',
    distractors: [
      'Cross-Border Statistical Area — international markets.',
      'Census Block Statistical Area — sub-MSA neighborhoods.',
      'Class B Statistical Area — Class B asset benchmark.',
    ],
    reverseDistractorIds: ['msa', 'submarket', 'comp-set'],
  },
  {
    id: 'submarket',
    term: 'Submarket',
    category: 'asset-class',
    difficulty: 'beginner',
    shortDef: 'Specific neighborhood or trade area within an MSA — finer comp-analysis unit.',
    longDef:
      'MSAs are too broad for CRE pricing — submarket dictates rent / cap / vacancy / absorption. Examples: "Midtown South" within NYC; "Buckhead" within Atlanta. CoStar / data providers track ~5-10 submarkets per major MSA for office / retail / industrial.',
    distractors: [
      'Junior submarket below an MSA in tier ranking.',
      'Sub-class asset within a tertiary market.',
      'Sub-market rent — rent below the MSA average.',
    ],
    reverseDistractorIds: ['msa', 'cbsa', 'comp-set'],
  },
  {
    id: 'comp-set',
    term: 'Comp Set',
    category: 'asset-class',
    difficulty: 'beginner',
    shortDef:
      'Set of comparable properties used to benchmark pricing, rents, occupancy, sales.',
    longDef:
      'Curated by analyst for each deal — typically 5-10 comparable assets in the same submarket / asset class / vintage. Two flavors: trade comps (recent sales) and listing comps (currently leased / for sale). Sponsor cherry-picking of comp sets is the #1 OM red flag.',
    distractors: [
      'Comprehensive set of all listings in a market.',
      'Computer-modeled comp adjustment system.',
      'Compositional set used in actuarial pricing.',
    ],
    reverseDistractorIds: ['trade-comp', 'listing-comp', 'submarket'],
  },
  {
    id: 'trade-comp',
    term: 'Trade Comp',
    category: 'asset-class',
    difficulty: 'intermediate',
    shortDef:
      'Recent closed sale — the gold standard for cap-rate / price-per-SF comp analysis.',
    longDef:
      '"What did similar assets actually trade for?" Most reliable type of comp because it\'s observed market clearing prices. Sources: CoStar, RCA, MLS for trades. Adjust for vintage, location, and asset-quality differences.',
    distractors: [
      'Comp from a 1031 trade swap.',
      'Comp adjusted for trade-in value of fixtures.',
      'Comp using bid-ask midpoint at last list.',
    ],
    reverseDistractorIds: ['listing-comp', 'comp-set', 'bpo'],
  },
  {
    id: 'listing-comp',
    term: 'Listing Comp',
    category: 'asset-class',
    difficulty: 'intermediate',
    shortDef:
      'Currently-listed (not closed) asset — useful but stale; reflects asking, not bid.',
    longDef:
      'Indicative but not market-clearing. List prices are typically 5-15% above clearing prices. Useful when there are no recent trade comps in the submarket. Always note "list" vs "trade" in comp tables.',
    distractors: [
      'Comp from a private listing not on MLS.',
      'Comp adjusted for marketing costs.',
      'List of comp set members ranked by score.',
    ],
    reverseDistractorIds: ['trade-comp', 'comp-set', 'bpo'],
  },
  {
    id: 'last-mile',
    term: 'Last Mile',
    category: 'asset-class',
    difficulty: 'intermediate',
    shortDef:
      'Distribution / industrial real estate within ~30 minutes of an urban core for fast delivery.',
    longDef:
      'Last-mile facilities sit at the end of the supply chain — moving goods to customer addresses (e.g. Amazon\'s same-day fulfillment centers). Premium to general industrial: tighter caps, higher rent, scarcer land. Surge-priced post-2020 e-commerce expansion.',
    distractors: [
      'Last-mile sale — final tranche of a portfolio sale.',
      'Last-tenant building — single-tenant industrial.',
      'Last-call distribution center for hotel supplies.',
    ],
    reverseDistractorIds: ['clear-height', 'submarket', 'comp-set'],
  },
  {
    id: 'clear-height',
    term: 'Clear Height',
    category: 'asset-class',
    difficulty: 'advanced',
    shortDef:
      'Floor-to-ceiling clearance in industrial buildings — the determinant of vertical storage capacity.',
    longDef:
      'Modern logistics: 32-40 ft clear is the standard for new construction; 24-28 ft is older / Class B. Higher clear = more cubic feet of storage per SF = higher rent per SF. Tenants pay material rent premium for 36+ ft clear in distribution.',
    distractors: [
      'Height clearance for delivery trucks.',
      'Vertical setback from property line.',
      'Distance from floor to top of dock door.',
    ],
    reverseDistractorIds: ['last-mile', 'stack-plan', 'rent-roll'],
  },
  {
    id: 'stack-plan',
    term: 'Stack Plan',
    category: 'asset-class',
    difficulty: 'intermediate',
    shortDef:
      'Diagram showing each tenant + suite + lease expiration date in a multi-tenant office building.',
    longDef:
      'The visual rent-roll for office buildings. Tells you which floors are leased, by whom, and when leases expire. Concentration of expirations in a single year = "rollover risk." Used in due diligence for office acquisitions.',
    distractors: [
      'Capital stack diagram — debt + equity tiers.',
      'Stacked-rent schedule with annual escalators.',
      'Stack of building permits for renovation phases.',
    ],
    reverseDistractorIds: ['rent-roll', 'walt', 'rollover'],
  },
  {
    id: 'rent-roll',
    term: 'Rent Roll',
    category: 'asset-class',
    difficulty: 'beginner',
    shortDef:
      'List of every tenant, lease term, base rent, escalators, options. The income foundation.',
    longDef:
      'The single most-important DD document on a multi-tenant asset. Tells you: who pays you (tenant credit), how much (base rent), for how long (term), and what changes (escalators / options). Rent roll mistakes are the #1 cause of NOI surprises post-close.',
    distractors: [
      'List of comp rents in the submarket.',
      'Schedule of rent escalators by tenant.',
      'Rent collection report by month.',
    ],
    reverseDistractorIds: ['stack-plan', 'walt', 'rollover'],
  },
  {
    id: 'rollover',
    term: 'Rollover',
    category: 'asset-class',
    difficulty: 'intermediate',
    shortDef:
      'Lease expiration creating re-leasing risk — the moment when tenants renew, leave, or are replaced.',
    longDef:
      'Tracked as % of total income / SF expiring per year. Concentration = "rollover risk" — if a major tenant rolls in year 3 and doesn\'t renew, NOI shocks. Diversification + WALT mitigate. Underwriting models stress vacancy + downtime + leasing costs at each rollover.',
    distractors: [
      'Roll-up of multiple LLCs into one parent.',
      'Tenant\'s right to extend lease beyond expiration.',
      'Quarterly true-up of rent escalator basis.',
    ],
    reverseDistractorIds: ['walt', 'rent-roll', 'stack-plan'],
  },
  {
    id: 'bpo',
    term: 'BPO',
    category: 'asset-class',
    difficulty: 'intermediate',
    shortDef:
      'Broker Price Opinion — a broker\'s informal valuation, less rigorous than a full appraisal.',
    longDef:
      'Used when a quick price view is needed without the cost / time of a full appraisal: distressed asset assessments, lender CRE portfolio reviews, listing prep. Less defensible than a MAI appraisal but cheaper and faster.',
    distractors: [
      'Bid Price Order — open offer to a broker.',
      'Bond Price Opinion — fixed-income valuation.',
      'Building Performance Optimization — energy audit.',
    ],
    reverseDistractorIds: ['trade-comp', 'listing-comp', 'comp-set'],
  },
];
