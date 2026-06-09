import type { LongformCase } from '../../types/longform';

export const macroRateStressTest: LongformCase = {
  id: 'macro-rate-stress-test',
  title: 'IC asks: what happens to this deal if rates stay at 5% for 3 more years?',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    "You are presenting a $45M, 250-unit Class B multifamily acquisition to your investment committee. Base case: 5-year hold, 7.5% levered IRR, 5.8% exit cap (vs. 5.3% going-in), 3% annual rent growth, 70% LTV bridge at SOFR + 195bps (all-in 7.15%), refi into permanent at Year 3 at an assumed 6.25% fixed rate. The 10Y Treasury is at 4.7%. An IC member challenges: 'What if rates don't move — 10Y stays at 4.7% and SOFR barely drops — for the next 3 years? Walk me through exactly how that changes every assumption in your model.'",
  data: [
    { label: 'Purchase price', value: '$45M' },
    { label: 'Going-in cap rate', value: '5.3%' },
    { label: 'Exit cap (base case)', value: '5.8%' },
    { label: 'Bridge financing', value: 'SOFR + 195bps, all-in 7.15% today' },
    { label: 'Assumed Year-3 refi rate', value: '6.25% fixed' },
    { label: '10Y Treasury (flat scenario)', value: '4.7% — stays here 3 years' },
    { label: 'Rent growth (base)', value: '3% annually' },
    { label: 'Base-case levered IRR', value: '7.5%' },
  ],
  question:
    'Walk the committee through the impact of flat rates on each key model assumption, and give a revised IRR range. Propose one structural change that reduces the exposure.',
  modelAnswer: `A flat-rate environment hits this deal through four compounding channels — I will walk each one. First, bridge debt remains expensive: if SOFR stays near current levels, our all-in bridge cost holds at ~7.15% for years 1–3 instead of declining toward the 6.50% we implicitly embedded; that's roughly 65bps of excess cost on a $31.5M loan for 3 years — approximately $615k in incremental interest drag that reduces early cash flows. Second, the Year-3 refi at 6.25% fixed is now improbable — if T10 is at 4.7% and MF permanent spreads are at 150–175bps, refi rates land at 6.25–6.45%, roughly flat to our assumption — this channel is actually close to neutral and does not meaningfully hurt the deal. Third, the exit cap assumption of 5.8% becomes the largest risk: if T10 stays at 4.7% at year 5 and buyers require a historical 150bps spread, exit cap normalizes toward 6.25%, not 5.8% — a 45bps move on a $45M asset reduces sale proceeds by approximately $3.5M and compresses levered IRR by roughly 200bps on its own. Fourth, sustained high rates soften MF demand as single-family affordability improves, potentially trimming rent growth from 3% to 2% in years 2–3, reducing NOI at exit by ~$250k. Blending these four channels, the flat-rate stress case moves levered IRR from 7.5% to approximately 5.0–5.5% — below our 6.5% return hurdle. The deal survives the base case but fails the rate-stress test as structured. My proposed structural change: replace the floating bridge with a fixed-rate bridge at today's terms (available at roughly 7.0% fixed vs. 7.15% floating) — this eliminates Channel 1 entirely and provides budget certainty on debt service, shaving approximately 15bps of cost while removing the SOFR tail risk.`,
  rubric: [
    {
      id: 'identifies-four-channels',
      dimension: 'Correctly identifies at least 3 of the 4 channels: bridge cost, refi rate, exit cap, rent growth',
      weight: 2,
    },
    {
      id: 'exit-cap-identified-as-dominant',
      dimension: 'Identifies exit cap widening as the highest-magnitude risk (not bridge rate or refi rate)',
      weight: 2,
    },
    {
      id: 'irr-range-quantified',
      dimension: 'Provides a specific revised IRR range — not just "lower" or "compressed"',
      weight: 1.5,
    },
    {
      id: 'structural-fix-proposed',
      dimension: 'Proposes a specific, actionable structural change to reduce rate exposure',
      weight: 1.5,
    },
    {
      id: 'ic-concern-engaged',
      dimension: 'Engages the IC challenge honestly without deflecting — acknowledges the deal fails the stress test',
      weight: 1,
    },
  ],
  takeaway:
    'A macro rate stress test should decompose into named channels: debt cost, refi rate, exit cap, and NOI growth. Exit cap is almost always the highest-magnitude variable — a 45bps cap-rate move on a $45M asset moves equity by ~$3.5M, dwarfing any interest-cost sensitivity. IC members asking "what if rates stay high?" are really asking: "did you underwrite an exit multiple that requires rate relief to hold?" If yes, name it, stress it, and propose the structural fix — do not defend the base case as though the question is unfair.',
  tips: [
    'Build a rate-stress tab in every model: T10 flat, T10 +50bps, T10 +100bps. Show exit cap, bridge cost, and refi cost across each scenario.',
    'Exit cap sensitivity dwarfs debt cost sensitivity — model it first and calibrate the hold-period NOI growth needed to offset exit cap expansion.',
    'Fixed-rate bridge products exist at a modest premium. When macro uncertainty is elevated, the certainty is often worth 15–20bps.',
  ],
};
