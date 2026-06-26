import type { SituationalCase } from '../../types/situational';

export const compStaleDateBridge: SituationalCase = {
  id: 'comp-stale-date-bridge',
  title: 'How do you bridge a stale comp to current pricing?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'industrial',
  scenario:
    'You\'re underwriting an industrial acquisition and the best available comp traded 14 months ago at a 4.75% cap. Since that trade, the 10-year Treasury has risen 175 basis points. Cap rates in the broader industrial sector have been observed widening 100–130 bps over the same period, though the submarket has outperformed due to constrained supply. You estimate the subject submarket\'s cap rates have widened roughly 80 bps vs. the national sector average.',
  data: [
    { label: 'Best comp trade date', value: '14 months ago' },
    { label: 'Comp cap rate', value: '4.75%' },
    { label: '10-Year Treasury change', value: '+175 bps since trade date' },
    { label: 'Sector cap rate widening', value: '+100–130 bps (national industrial)' },
    { label: 'Subject submarket premium', value: '~80 bps widening (below sector average)' },
  ],
  question: 'What is the appropriate bridged cap rate for the subject today?',
  options: [
    {
      label: 'Bridge at +80 bps to reflect submarket-specific widening: 4.75% + 0.80% = 5.55%, and round to a 5.50–5.75% range given estimation uncertainty.',
      isBest: true,
      explanation:
        'The comp is real evidence but dated. The correct approach is to quantify how much pricing has moved since the trade date and bridge the observed price to today. The sector widened 100–130 bps nationally, but the subject submarket — constrained supply, outperforming fundamentals — outperformed by ~50 bps. Applying the submarket-specific 80 bps widening to the 4.75% comp gives 5.55%. Rounding to a 5.50–5.75% range acknowledges that the 80 bps adjustment is itself an estimate. This is more defensible than either using 4.75% frozen in time or abandoning the comp entirely.',
    },
    {
      label: 'Use 4.75% as-is — it\'s the only comp available and you can\'t invent a more recent data point.',
      isBest: false,
      explanation:
        'Using a stale comp without adjustment implicitly treats pricing as unchanged, which contradicts observable market evidence. A 14-month-old comp in an environment where rates rose 175 bps and sector cap rates widened 100+ bps cannot be used at face value without explanation. Using it would systematically overstate value.',
    },
    {
      label: 'Apply the full national sector widening of 100–130 bps: 4.75% + 1.15% (midpoint) = 5.90%.',
      isBest: false,
      explanation:
        'The national sector average is a reasonable sanity check, but the subject submarket has demonstrably outperformed. Ignoring the submarket premium by using the full sector widening overstates how much the cap has widened locally, understating value vs. a properly adjusted estimate. Use the most specific evidence available, which here is the submarket-level 80 bps estimate.',
    },
    {
      label: 'Discard the 14-month comp and wait for fresher evidence before proceeding.',
      isBest: false,
      explanation:
        'In thin transaction markets, you may have no choice but to work with stale comps. Walking away from an underwriting exercise because the comp set is imperfect is impractical — time-bridging stale comps is standard practice. The alternative (guessing the cap rate with no evidence) is worse than a documented, adjustable estimate.',
    },
  ],
  takeaway:
    'Stale comps are usable if you bridge them to current pricing with a transparent methodology. Identify how much cap rates have moved in the specific submarket since the comp date, apply that adjustment, and present a range rather than a point estimate. A documented adjustment beats using a frozen price.',
  tips: [
    'Bridge formula: adjusted cap = comp cap + submarket cap rate change since trade date.',
    'Prefer submarket-specific widening evidence over national sector averages when available.',
    'The wider the comp age, the wider your pricing range — 12+ months in a moving-rate environment justifies ±25 bps around the bridged estimate.',
  ],
};
