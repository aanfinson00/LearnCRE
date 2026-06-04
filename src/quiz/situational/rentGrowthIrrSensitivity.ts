import type { SituationalCase } from '../../types/situational';

export const rentGrowthIrrSensitivity: SituationalCase = {
  id: 'rent-growth-irr-sensitivity',
  title: 'What does 150 bps of rent growth do to your IRR?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re underwriting a 5-year office hold: $2M of Year-1 NOI, 2.5% annual rent growth, 6.5% exit cap, 65% LTV interest-only bridge at 7.0%. Modeled levered IRR: 12.1%. An IC member challenges the growth assumption, noting that the submarket has averaged 1.0% rent growth over the past 3 years and office fundamentals remain soft. You re-run at 1.0% growth and are asked to interpret the output.',
  data: [
    { label: 'Year-1 NOI', value: '$2,000,000' },
    { label: 'Underwritten rent growth', value: '2.5%/year' },
    { label: 'Exit cap rate', value: '6.5%' },
    { label: 'Hold period', value: '5 years' },
    { label: 'LTV (interest-only @ 7.0%)', value: '65%' },
    { label: 'Modeled levered IRR (base)', value: '12.1%' },
  ],
  question: 'What is the correct analytical response to the IC challenge?',
  options: [
    {
      label: 'Quantify the IRR delta, then defend or concede the 2.5% base case with specific evidence — mark-to-market rents on expiring leases, supply pipeline, and submarket vacancy trend.',
      isBest: true,
      explanation:
        'At 2.5% growth, Year-5 NOI ≈ $2.26M → exit value ÷ 6.5% ≈ $34.8M. At 1.0% growth, Year-5 NOI ≈ $2.10M → exit value ÷ 6.5% ≈ $32.3M. That\'s ~$2.5M less in exit proceeds, which on a levered basis typically translates to 100–150 bps of IRR. Show the table: base IRR = 12.1%, stress IRR ≈ 10.6–10.8%. Then defend 2.5% with specifics: what are the rolling leases\' in-place vs. market rents? Is new supply being absorbed? The IC is asking for evidence, not capitulation.',
    },
    {
      label: 'Accept 1.0% growth and re-model. If the IRR still meets the hurdle, proceed; if not, pass.',
      isBest: false,
      explanation:
        'Mechanically responsive but misses the point. The IC\'s goal is to test whether 2.5% is defensible — not to kill the deal at 1.0%. Immediately adopting the stress case without defending the base is a failure of conviction. Showing both scenarios and defending the base with evidence is the expected analytical response in an IC setting.',
    },
    {
      label: 'Split the difference — model 1.75% as a conservative scenario and present it alongside the 2.5% base.',
      isBest: false,
      explanation:
        '"Split the difference" is a negotiating posture, not underwriting discipline. The growth rate should reflect a specific view on submarket fundamentals and lease mark-to-market. A 1.75% "compromise" doesn\'t explain which inputs support that rate — IC committees can usually spot a political split vs. a reasoned estimate.',
    },
    {
      label: 'Defend 2.5% firmly — 3-year trailing growth is mean-reverting, and long-run office rent growth historically averages 2–3%.',
      isBest: false,
      explanation:
        'Arguing mean-reversion without grounding it in the specific submarket and lease roll is speculative. An office submarket at 18% vacancy with a 500K SF supply pipeline isn\'t mean-reverting on a 5-year horizon just because of a historical long-run average. Long-run averages computed over markets with 5–8% vacancy are not directly comparable to today\'s oversupplied office environment.',
    },
  ],
  takeaway:
    'When an IC challenges a growth assumption, the required response is a sensitivity table plus a fundamental defense (or concession). Show the IRR impact in basis points, then defend the base case with specific evidence: in-place vs. market rents, supply pipeline, and submarket vacancy trend. Never let "stress it down" substitute for "here\'s why the base case is right."',
  tips: [
    'Rule of thumb: on a 5-yr hold, each 1% of rent growth changes Year-5 NOI by ~5%; at a 6.5% exit cap, each $100K of NOI is ~$1.5M of value.',
    'Mark-to-market analysis (in-place vs. market rent per expiring lease) is the primary anchor for growth assumptions.',
    'Always show the break-even growth rate — the rate at which levered IRR equals the hurdle. It anchors the IC conversation.',
  ],
};
