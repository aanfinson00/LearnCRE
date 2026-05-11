import type { SituationalCase } from '../../types/situational';

export const hotelPipKeyMoney: SituationalCase = {
  id: 'hotel-pip-key-money',
  title: 'Hotel: does the brand PIP pencil against key money and RevPAR lift?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'hotel',
  scenario:
    "You own a 180-key limited-service hotel currently operating under a soft-flag affiliation (minimal brand standards). The hotel generates $10.5M of gross room revenue and $2.0M of NOI (19% NOI margin). A major flag brand (upper-midscale) offers to convert your property to their flag under a new 15-year franchise agreement. The franchise agreement requires a $4.2M Property Improvement Plan (PIP) — lobby modernization, room refresh, and FF&E replacement to brand standards. In exchange, the brand offers $850K of key money (upfront cash) and projects a 12% RevPAR lift from flag conversion, attributable to OTA rank improvement and loyalty program channel. Existing royalty: 5.5% of GRR ($577K/yr). New royalty: 6.5% of GRR ($683K/yr assuming same revenue base). Your exit cap rate assumption: 6.5% for the soft-flag hotel; the brand estimates a 5.75–6.0% cap for their flag at stabilization.",
  data: [
    { label: 'Gross room revenue (current)', value: '$10.5M' },
    { label: 'NOI (current)', value: '$2.0M (19% margin)' },
    { label: 'PIP cost', value: '$4.2M' },
    { label: 'Key money from brand', value: '$850K' },
    { label: 'Net PIP cost (after key money)', value: '$3.35M' },
    { label: 'RevPAR lift (brand estimate)', value: '+12% → +$1.26M GRR' },
    { label: 'Royalty increase', value: '+1.0% of GRR = +$106K/yr additional (on current GRR)' },
    { label: 'Assumed NOI margin on incremental GRR', value: '~35% (above-average flow-through)' },
    { label: 'Current exit cap assumption', value: '6.5% (soft-flag)' },
    { label: 'Brand-projected exit cap', value: '5.75–6.0% (branded)' },
  ],
  question:
    'On a 5-year hold, does the PIP pencil? Walk through the operating and exit components.',
  options: [
    {
      label:
        "Operating cash alone is marginal: incremental NOI from 12% RevPAR lift (~$441K/yr at 35% flow-through) minus royalty increase ($106K) = ~$335K/yr net benefit. Over 5 years: ~$1.675M — roughly half the $3.35M net PIP cost. The real return is at exit: a 50-bps cap compression on stabilized NOI of ~$2.34M implies ~$1.95M of additional exit value, and 75-bps compression implies ~$2.9M. Combined with 5-year operating gains, the total 5-year return on the net PIP cost is likely positive but hinges heavily on whether the market will credit the brand cap at exit.",
      isBest: true,
      explanation:
        "Right decomposition. Operating cash math: +$1.26M GRR × 35% flow-through = +$441K NOI lift; minus +$106K royalty drag = +$335K net NOI per year. 5-year total: ~$1.675M on a $3.35M net PIP cost — 50% payback on operations alone. The full ROI story lives at exit: the branded vs. soft-flag cap rate spread is the key variable. At 50 bps compression, a stabilized NOI of $2.34M implies exit value of $2.34M/5.75% = $40.7M vs. $2.0M/6.5% = $30.8M — a $9.9M valuation uplift. Even discounting the brand's cap estimate conservatively (say 6.1% exit cap), the conversion clearly pencils on the combined operating + exit basis. The risk is whether the market cap at your projected sale date reflects the brand premium.",
    },
    {
      label:
        "The PIP pencils purely on operating cash: $335K/yr × 5 years = $1.675M, which is close enough to the $3.35M net PIP cost to justify the conversion.",
      isBest: false,
      explanation:
        "$1.675M is only 50% payback on the $3.35M net cost on an undiscounted basis — that's not 'penciling.' The correct conclusion is that operating cash alone does NOT fully justify the PIP in 5 years; the exit story is essential to the return. Claiming the operating math is close enough understates the dependency on cap rate compression at exit, which is the actual thesis.",
    },
    {
      label:
        "Don't do the PIP — hotel brand PIPs are notoriously over-budget, and the RevPAR lift is the brand's marketing projection, not a guarantee. The $3.35M net cost is a certain cash outlay; the benefits are speculative.",
      isBest: false,
      explanation:
        "Valid risk flags (PIP overruns are real; brand RevPAR projections are optimistic) but the conclusion is too broad. PIP risk management and independent feasibility review are the right responses, not blanket rejection. Franchised hotels consistently outperform soft-flag hotels in RevPAR index and exit cap rate — the structural benefit is documented. The appropriate discipline is to model the case conservatively (say 8–10% RevPAR lift, 25–50 bps cap compression) and confirm the deal still pencils before committing. At 8% RevPAR lift and 25 bps compression, the math is marginal; at 10% and 50 bps, it clearly works.",
    },
    {
      label:
        "The royalty increase from 5.5% to 6.5% of GRR is the critical issue — it costs $106K/yr more and wipes out the RevPAR lift benefit. Negotiate the royalty rate first before evaluating the PIP.",
      isBest: false,
      explanation:
        "The royalty increase is a cost, but at $106K/yr it is not the deal-breaker — the RevPAR lift ($441K NOI) and exit cap compression are both materially larger numbers. Negotiating the royalty from 6.5% to 6.0% saves $52K/yr, worth $260K over 5 years. Valuable, but secondary to the $2–$3M of exit cap compression upside. Don't let a $260K fixable cost dominate the analysis of a decision with $10M+ of exit-value sensitivity.",
    },
  ],
  takeaway:
    "Hotel brand conversion ROI has two components: (1) operating — incremental RevPAR × flow-through margin − royalty drag, and (2) exit — cap rate compression from branded vs. unbranded buyer pricing. On a 5-year hold, operating cash rarely pays back the net PIP cost alone; the exit story is almost always required. Evaluate the conversion by independently stress-testing both the RevPAR lift and the cap compression — if the deal pencils only at the brand's most optimistic projections, the risk/reward is poor.",
  tips: [
    'Flow-through margin for hotel revenue: incremental RevPAR lift flows through at 60–80% to GOP and 30–50% to NOI, depending on whether it comes from ADR (higher flow) or occupancy (lower flow, more variable cost).',
    'Brand exit cap compression varies by flag tier: upper-upscale and select-service franchises consistently trade 50–100 bps tighter than equivalent soft-flag assets in the same market.',
    'PIP cost overruns of 10–20% above original estimate are common; always underwrite a contingency buffer when modeling PIP ROI.',
  ],
};
