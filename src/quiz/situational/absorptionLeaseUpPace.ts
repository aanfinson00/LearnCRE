import type { SituationalCase } from '../../types/situational';

export const absorptionLeaseUpPace: SituationalCase = {
  id: 'absorption-lease-up-pace',
  title: "Is your lease-up pace fast enough to hit the refi trigger?",
  category: 'absorption',
  difficulty: 'beginner',
  roles: ['development', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "A new 280-unit apartment community just delivered. It's currently 0% leased. The construction lender requires 95% occupancy for 60 consecutive days before the loan converts to permanent financing — a deadline the sponsor estimates at 12 months from delivery. The leasing agent is projecting 30 units/month based on the sponsor's pro forma. Trailing submarket lease-up comps for similar new deliveries show 18–22 units/month.",
  data: [
    { label: 'Total units', value: '280' },
    { label: 'Refi trigger', value: '95% occupied (266 units) for 60 days' },
    { label: 'Timeline target', value: '12 months from delivery' },
    { label: 'Pro forma pace', value: '30 units/month' },
    { label: 'Submarket comps', value: '18–22 units/month for new deliveries' },
  ],
  question:
    "Is the 30-unit/month pace achievable, and will the deal hit the 12-month refi trigger?",
  options: [
    {
      label:
        "The submarket comp pace of 18–22 units/month is 35–65% below the pro forma assumption. At 20 units/month you'd lease 240 units (86%) by month 12 — short of the 266-unit trigger by 26 units. More realistically the trigger takes 14–15 months, which requires either an interest reserve extension or a construction loan extension. The 30-unit assumption needs a documented reason to deviate from submarket comps before you underwrite it.",
      isBest: true,
      explanation:
        "Lease-up pace should be anchored to what comparable new deliveries are actually achieving, not what the pro forma needs. Comps at 18–22 units/month are the market signal. At 20 units/month: 20 × 12 = 240 units = 86%, which misses the 95% trigger. At 22 units/month: 22 × 12 = 264 units = 94.3% — still one tranche short. Only at 23+ units/month does the deal clear 266 units inside 12 months. The sponsor needs to document what drives a premium over comps (better finishes, better location, more marketing budget) or carry additional interest reserve.",
    },
    {
      label:
        "30 units/month is achievable because new product always commands above-market absorption — tenants have been waiting for new supply and will lease up the first available quality units.",
      isBest: false,
      explanation:
        "New supply does attract demand, but submarket comps for comparable new deliveries already capture this. If comparable new communities in the same market are leasing at 18–22 units/month, the pro forma community has no documented advantage to justify a 35–65% premium. Saying 'new supply leases faster' is exactly what the comps already measure — they ARE new supply.",
    },
    {
      label:
        "The math works: 30 units/month × 9 months = 270 units, which clears the 266-unit threshold with 3 months to spare.",
      isBest: false,
      explanation:
        "The arithmetic is right but misses the premise error: the 30-unit assumption is 35–65% above submarket comps without justification. Running the math on an aggressive assumption without a stress test is how pro formas fail. The first step is to validate the pace assumption; then run the arithmetic.",
    },
    {
      label:
        "Absorption pace doesn't matter — what matters is whether the stabilized NOI supports the permanent loan's DSCR at full occupancy.",
      isBest: false,
      explanation:
        "Stabilized DSCR is a separate underwriting question; the absorption pace is the bridge between delivery and stabilization. A weak lease-up pace means a longer construction loan tail, higher carry costs, and potential covenant breach if the lender's 12-month trigger isn't met. Both questions matter; absorption pace is the more time-sensitive one at this stage.",
    },
  ],
  takeaway:
    "Lease-up pace assumptions should be grounded in submarket comps for comparable new deliveries — that's the market's revealed answer to how fast absorption runs. A pro forma that requires 35–65% above market pace without documented justification (better product, better location, more concessions) is an underwriting risk, not a conservative assumption. Always stress the pace and calculate the resulting timeline against any refi or stabilization trigger.",
  tips: [
    "Rule of thumb: if your pace assumption is >20% above submarket comps, you need a specific documented reason.",
    "Interest reserve sizing: assume pace at the 25th percentile of comps, not the mean.",
    "Lease-up timing affects not just the refi trigger but also the total carry cost — every extra month is additional interest expense.",
  ],
};
