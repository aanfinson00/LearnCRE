import type { SituationalCase } from '../../types/situational';

export const omRedFlags: SituationalCase = {
  id: 'om-red-flags',
  title: 'Reading an OM — what are the red flags?',
  category: 'pricing',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  scenario:
    'You\'re reviewing a broker\'s offering memorandum on a $35M MF deal. The OM shows: 5.0% going-in cap on T-3 NOI annualized, 8% Year-1 NOI growth, $0 capex reserve, "trended NOI" used for the cap calculation, comp set of 4 deals from 18+ months ago, and a 5.25% exit cap (only 25 bps of expansion). Asset is a 1995-vintage Class-B garden-style.',
  data: [
    { label: 'Going-in cap basis', value: 'T-3 NOI annualized' },
    { label: 'Year-1 NOI growth', value: '8%' },
    { label: 'Capex reserve', value: '$0' },
    { label: 'Cap calc denominator', value: '"Trended NOI"' },
    { label: 'Comp set age', value: '18+ months old' },
    { label: 'Exit cap spread', value: '25 bps' },
  ],
  question: 'Which red flags matter most when re-cutting the OM?',
  options: [
    {
      label:
        'All six, but rank-ordered: (1) "trended NOI" cap denominator is the dirtiest trick — using future NOI in a "going-in" cap inflates the implied value; demand T-12 actuals or Year-1 underwritten. (2) T-3 annualized misses seasonal vacancy + one-time concessions; demand T-12. (3) 8% NOI growth on a stabilized 1995 asset has no underlying value-add story — back to 3-4%. (4) $0 capex reserve on a 30-year-old building is fiction; budget $400-500/unit/yr. (5) 18-mo-old comps are pre-rate-cycle and don\'t reflect current pricing. (6) 25 bps of cap expansion over 5 years is aggressively tight in any rate environment.',
      isBest: true,
      explanation:
        'Each red flag understates buyer cost or overstates asset value. The most insidious is "trended NOI" in the cap denominator — going-in cap is by definition Year-1 income / price; using a future, projected, or annualized number inflates the implied price by however much the future income is above the present. The remaining items follow the same pattern: T-3 misses seasonality, $0 capex hides recurring cost, stale comps reflect different market conditions, tight exit cap depends on perfect rate environment. Re-cut every line; don\'t accept any.',
    },
    {
      label: 'The 8% NOI growth is the only real issue; the rest are normal broker presentation choices.',
      isBest: false,
      explanation:
        'Normalizes broker tactics that a sophisticated buyer should reject. T-3 annualized misses real seasonality. "Trended NOI" in a going-in cap is incorrect math, not presentation choice. $0 capex reserve isn\'t a presentation; it\'s fiction. Each of these adds to the price the seller is asking; treating them as benign produces a winning bid that\'s actually a losing deal.',
    },
    {
      label: 'The biggest issue is the comp set age — 18 months old in a moving rate environment is the dominant pricing concern.',
      isBest: false,
      explanation:
        'Stale comps matter, but they\'re a *secondary* indicator: they suggest the cap rate the OM cites is wrong, but the OM\'s OWN cap rate calc has multiple problems (T-3 + trended NOI + 25 bps exit) before you even get to the comp validation. Address the buyer\'s underwriting math first; comp validation comes after.',
    },
    {
      label: 'Demand the broker re-issue the OM with corrections; if they refuse, walk away.',
      isBest: false,
      explanation:
        'Brokers don\'t re-issue OMs. They\'re marketing documents from the seller\'s side; the buyer\'s job is to re-cut every line in their own model. "Walk away" is also too strong — this OM has standard broker-side biases, not deal-killing fraud. Re-cut and bid your number, not the OM\'s number.',
    },
  ],
  takeaway:
    'Brokers always present the rosiest version of the deal. The buyer\'s job is to re-cut every line in their own model: T-12 actuals (not T-3), real Year-1 NOI (not trended), 3-4% NOI growth (not 8%), full capex reserve (not $0), recent comps only, conservative exit cap. The bid you submit reflects YOUR model, not theirs. Treating the OM as the authoritative pricing input is the most-common junior-analyst mistake.',
  tips: [
    'T-3 annualized = trailing 3 months × 4. Misses seasonality every time.',
    '"Trended NOI" in a going-in cap is mathematically incorrect; demand a Year-1 number.',
    'Recent rule of thumb: comps older than 12 mos in a moving rate environment need a documented adjustment or a discard.',
  ],
};
