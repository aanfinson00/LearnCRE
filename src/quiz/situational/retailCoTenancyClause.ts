import type { SituationalCase } from '../../types/situational';

export const retailCoTenancyClause: SituationalCase = {
  id: 'retail-co-tenancy-clause',
  title: 'Retail: parsing a co-tenancy clause before you sign the PSA',
  category: 'document-literacy',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'retail',
  documentExcerpt: {
    docType: 'lease',
    label: 'Section 14.3 — Co-Tenancy Condition',
    text: `"Co-Tenancy Condition" means (a) Anchor A (as defined in Exhibit B) is
Open for Business (as defined herein) at the Shopping Center in a space of
not less than 75,000 rentable square feet, and (b) the aggregate Occupied
GLA of the Shopping Center (excluding Tenant's Premises and the Anchor A
space) is not less than sixty percent (60%) of the total leasable area of
the Shopping Center.

In the event the Co-Tenancy Condition is not satisfied for a period of
ninety (90) consecutive days, Tenant may, upon thirty (30) days' prior
written notice to Landlord, elect to pay Alternate Rent (as defined in
Section 14.3(b)) in lieu of Base Rent until the Co-Tenancy Condition is
restored.

(b) "Alternate Rent" shall mean an amount equal to four percent (4%) of
Tenant's Gross Sales for each calendar month during the Alternate Rent Period.

(c) In the event the Co-Tenancy Condition is not satisfied for a period of
eighteen (18) consecutive months, Tenant may terminate this Lease upon one
hundred eighty (180) days' prior written notice to Landlord.`,
  },
  scenario:
    "You're reviewing the leases during due diligence on a $55M strip mall acquisition. The largest inline tenant — a national apparel retailer paying $28/SF on 22,000 SF — has the co-tenancy clause above. Anchor A is currently operating, but you've heard in the market that it's considering downsizing from 90,000 SF to 60,000 SF as part of a fleet rationalization. The total leasable area of the center is 280,000 SF; current occupancy is 78%.",
  data: [
    { label: 'Acquisition price', value: '$55M' },
    { label: 'Inline tenant', value: '22,000 SF at $28/SF NNN ($616k/yr)' },
    { label: 'Anchor A current SF', value: '90,000 SF' },
    { label: 'Anchor A rumored downsize', value: '60,000 SF (below 75k threshold)' },
    { label: 'Total leasable area', value: '280,000 SF' },
    { label: 'Current occupancy', value: '78%' },
    { label: 'Lease remaining', value: '6 years' },
  ],
  question:
    "Based on the lease excerpt, what are the two conditions that could trigger Alternate Rent, and how do you price the risk into your underwriting?",
  options: [
    {
      label:
        "The clause has two independent triggers, each of which alone is sufficient: (1) Anchor A drops below 75,000 SF — the rumored downsize to 60,000 SF would trigger this immediately; (2) Occupied GLA falls below 60% of total leasable area (168,000 SF). Currently at 78% occupancy, you're 18 points above the second trigger. At 4% Alternate Rent on $28/SF tenant at $650/SF average sales, you're looking at ~$26/SF alternate rent vs $28/SF base — a 7% income reduction. But the 18-month termination right is the bigger risk: if the Co-Tenancy Condition persists 18 months, this tenant can terminate a 6-year lease, removing $616k/yr of NOI at a 6% cap — a $10M value swing. Price this as a contingent liability on the anchor downsize scenario.",
      isBest: true,
      explanation:
        "Right reading. Two triggers, both running. The anchor downsize scenario is the live risk: 60,000 SF < 75,000 SF threshold → Co-Tenancy Condition fails → 90 days until Alternate Rent kicks in → 18 months until termination right arises. The termination right is the true value risk: losing 22,000 SF at $28/SF NNN on a 6-cap center is a $10.3M value impairment. The correct underwriting treatment: price a scenario where anchor downsizes, stress the NOI for 6 months of Alternate Rent + termination notice, and discount the acquisition price accordingly or add a contingency on anchor confirmation.",
    },
    {
      label:
        "The co-tenancy clause only matters if occupancy falls below 60% — at 78%, there's a wide buffer. No price adjustment needed.",
      isBest: false,
      explanation:
        "Reads only the second trigger, misses the first. The clause has two independent conditions joined by 'and' — both must be satisfied for the Co-Tenancy Condition to be met. The anchor size requirement (Anchor A ≥ 75,000 SF) is independent of overall occupancy. An anchor downsizing from 90,000 SF to 60,000 SF fails the first condition even if occupancy stays at 78%. 'And' means both conditions must hold.",
    },
    {
      label:
        "Even if triggered, Alternate Rent is only 4% of sales — $28/SF in base rent at average inline sales of ~$400/SF would translate to $16/SF alternate rent, a 43% income cut. That's the number to price.",
      isBest: false,
      explanation:
        "Gets the math directionally right but stops before the bigger risk: the 18-month termination right. A 43% rent cut for a period is a cash-flow problem; a lease termination is a structural NOI problem. The 18-month clock runs from when the Co-Tenancy Condition first fails — not from any additional notice. If you close the acquisition and the anchor downsizes 6 months in, you could face a termination notice 24 months post-close. That's the risk that moves the bid.",
    },
    {
      label:
        "Request a co-tenancy estoppel from the inline tenant certifying the Co-Tenancy Condition is satisfied at closing — this removes the liability.",
      isBest: false,
      explanation:
        "An estoppel only certifies current facts; it doesn't waive future rights. The inline tenant confirming the Co-Tenancy Condition is satisfied today doesn't stop them from invoking it tomorrow if the anchor downsizes post-closing. The risk you're trying to price is prospective (anchor downsize), not current state. An estoppel doesn't address forward-looking contingencies.",
    },
  ],
  takeaway:
    "Co-tenancy clauses have dual-trigger structures ('and' conditions) — read every condition independently; any one failure is sufficient to activate the clause. The termination right buried in (c) is the value-critical provision, not the rent reduction in (b). Underwrite the termination scenario: if the largest inline tenant exits, what does that do to NOI at market cap rate? That delta is the contingent liability to price or hedge via seller escrow / anchor confirmation contingency.",
  tips: [
    "Read co-tenancy clauses for three elements: (1) trigger conditions, (2) Alternate Rent definition (% of sales vs. fixed reduction), (3) termination right timeline.",
    "'And' vs. 'or' in trigger conditions is the most important word in co-tenancy clause parsing — 'and' means both conditions must hold; 'or' means either failure fires the clause.",
    "Anchor estoppels are standard in large retail acquisitions — request estoppel from anchor tenant confirming it is 'Open for Business' as defined in the inline co-tenancy clauses.",
  ],
};
