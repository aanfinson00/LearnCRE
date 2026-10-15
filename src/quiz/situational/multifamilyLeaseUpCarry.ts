import type { SituationalCase } from '../../types/situational';

export const multifamilyLeaseUpCarry: SituationalCase = {
  id: 'multifamily-lease-up-carry',
  title: 'Development: how long should the lease-up carry run?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['development', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    "A 240-unit garden community is delivering next year with a $42M construction loan at 7.5% interest-only. Your pro forma assumes leasing 18 units a month to a 93% stabilized occupancy. The last three comparable lease-ups in the submarket took 14, 15 and 17 months to stabilize. Your lender wants the interest reserve sized now.",
  data: [
    { label: 'Units', value: '240' },
    { label: 'Stabilized occupancy', value: '93% (about 223 units)' },
    { label: 'Pro forma pace', value: '18 units/month' },
    { label: 'Comparable lease-ups', value: '14, 15, 17 months' },
    { label: 'Loan / rate', value: '$42M / 7.5% interest-only' },
  ],
  question: 'What lease-up period should the carry assume?',
  options: [
    {
      label:
        "Use the comps, not the pro forma: 223 units at 18 per month is 12.4 months, but the market took 14–17 months. Size the reserve for about 17 months or more. At about $262,500 of interest a month, the gap from 12.4 months to 17 months is roughly $1.2M.",
      isBest: true,
      explanation:
        "$42M × 7.5% ÷ 12 = $262,500 a month. 223 ÷ 18 is 12.4 months, or about $3.3M of interest, against about $4.5M at 17 months, a difference of roughly $1.2M before offsetting NOI. The pro forma pace is faster than any of the three recent lease-ups. Interest reserves are sized to the realistic downside, because running out mid-lease-up forces a costly equity call or loan extension.",
    },
    {
      label:
        "Use the 12.4-month pro forma and the lender can top up later if it takes longer.",
      isBest: false,
      explanation:
        "The pro forma pace beat all three comps, so it is the optimistic case, not a base case. If the building runs long, the extra carry falls on you when equity is least available. Reserves should cover a reasonable downside, not the plan.",
    },
    {
      label:
        "Use the 15-month comp average, since averages are the most defensible number.",
      isBest: false,
      explanation:
        "The average of 14, 15 and 17 is about 15.3 months, which is a reasonable base case but leaves no cushion for the slowest comp. A reserve sized to the average is exhausted half the time. The reserve should be sized to the slow end of the range, and the base case used for returns.",
    },
    {
      label:
        "Skip the interest reserve and fund carry from operating cash flow as units come online.",
      isBest: false,
      explanation:
        "During lease-up, NOI is negative or thin because concessions are high and occupancy is low. Operating cash will not cover $262,500 a month of interest in the early months. That is the reason lenders require the reserve.",
    },
  ],
  takeaway:
    "Size the carry to the slow end of local lease-up comps, not to the pro forma. The reserve covers the downside, while the base case drives returns.",
  tips: [
    "Months to stabilize = stabilized units ÷ monthly absorption.",
    "Monthly interest = loan × rate ÷ 12.",
    "Check pro forma pace against recent comparable lease-ups.",
  ],
};
