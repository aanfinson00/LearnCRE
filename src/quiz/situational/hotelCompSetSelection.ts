import type { SituationalCase } from '../../types/situational';

export const hotelCompSetSelection: SituationalCase = {
  id: 'hotel-comp-set-selection',
  title: 'Hotel: your STR comp set is pulling your RevPAR Index down — should you change it?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'hotel',
  scenario:
    "You manage a 200-key full-service hotel in a suburban office corridor. Your current STR comp set (selected at acquisition 3 years ago) includes 4 hotels: a 280-key convention hotel 2 miles away, a 150-key boutique hotel in the adjacent urban core, a 180-key extended-stay property, and a 210-key branded full-service comp that recently completed a $12M renovation. Your RevPAR Index has been declining and sits at 91. You're considering requesting a comp set change from STR.",
  data: [
    { label: 'Your property', value: '200-key full-service, suburban office corridor' },
    { label: 'Comp 1', value: '280-key convention hotel, 2 mi away — heavy group/meetings demand' },
    { label: 'Comp 2', value: '150-key boutique hotel, urban core — higher transient/leisure ADR' },
    { label: 'Comp 3', value: '180-key extended-stay property — long-stay corporate, lower ADR' },
    { label: 'Comp 4', value: '210-key branded full-service, $12M renovation complete — post-reno rate premium' },
    { label: 'Current RevPAR Index', value: '91 (declining 4 consecutive quarters)' },
  ],
  question: 'Which comp(s) should be reconsidered, and what criteria justify a comp set change?',
  options: [
    {
      label:
        "Comps 1, 2, and 4 warrant scrutiny. Comp 1 is heavily group-driven (different demand calendar, different booking window) and will systematically outperform on midweek ADR when you're not filling group blocks. Comp 2 is urban-core and leisure-driven — different location type, different demand segment. Comp 4 recently renovated, which inflates its rate and occupancy temporarily due to ramp-up demand; it will distort your index until it normalizes. Comp 3 (extended-stay) has structurally lower ADR but comparable occupancy, so it may actually be an appropriate if painful comp. Valid grounds for a comp set change: demand segment mismatch and product type mismatch — not just 'they're beating me.'",
      isBest: true,
      explanation:
        "STR comp sets should reflect hotels competing for the same traveler in the same market. The problems: Comp 1 is a convention hotel — group bookings are block-sold months ahead, at different rates, to a corporate meeting buyer you don't compete with on GDS/OTA. Comp 2 is urban core boutique — a different location type draws a leisure/weekend segment you can't access from a suburban office corridor. Comp 4's post-renovation ramp inflates its index temporarily (new product gets trial bookings and PR-driven demand). These three create a comp set that systematically outperforms your segment — making your RevPAR Index look weak when you're actually performing correctly for your product type. The legitimate change criteria: product type (full-service suburban vs. convention vs. boutique), demand segment (transient corporate vs. group vs. leisure), and location type.",
    },
    {
      label:
        "Change the comp set to remove any hotel outperforming you — a RevPAR Index of 91 shows the current set is unfair.",
      isBest: false,
      explanation:
        "This is the wrong reason to change a comp set. If Comp 4 outperforms because of superior product (post-renovation), removing it just because it beats you is benchmarking fraud — you'd be managing to the metric rather than the business. The valid reason to change is fundamental demand segment or product type mismatch, not performance gap. STR reviews comp set change requests carefully and will reject changes that appear motivated by index management.",
    },
    {
      label:
        "Don't change the comp set — RevPAR Index at 91 is the right signal that your asset is underperforming; use it to drive operational improvement, not to benchmark-shop.",
      isBest: false,
      explanation:
        "This is correct if the comps are appropriate comparators. But if the comp set is measuring you against a convention hotel (group-driven), an urban boutique (leisure-driven), and a post-renovation outlier, the Index is not a clean signal of your operational performance — it's noise from segment and product mismatch. The right discipline is to validate the comp set's appropriateness before accepting the Index as a verdict on your operations.",
    },
    {
      label:
        "Ask the brand to change the comp set — they have more leverage with STR and will protect the flag's performance metrics.",
      isBest: false,
      explanation:
        "The brand can advocate, but they don't control STR's comp set methodology. Also, the brand's interest (protecting RevPAR Index across their system) doesn't necessarily align with your property's interest. The right path is to document the mismatch criteria (demand segment, product type, location type) and submit the change request to STR with supporting data — STR approves comp set changes on the merits, not based on who submits.",
    },
  ],
  takeaway:
    "STR comp set validity depends on three axes: (1) product type — full-service vs. limited-service vs. extended-stay compete for different travelers; (2) demand segment — group hotels, extended-stay, and transient corporate hotels have different demand calendars and booking windows; (3) location type — urban core vs. suburban office corridor vs. airport corridor serve different trip purposes. A comp set that mismatches any of these produces a distorted RevPAR Index. The test for a change request: can you document that your subject property does not compete for the same traveler as the comp? Not 'is the comp beating me?'",
  tips: [
    "STR comp set rules: 3–5 properties, same market, same product type. Changes require documented rationale; STR approves ~50–60% of requests.",
    "RevPAR Index = (your RevPAR / comp set RevPAR) × 100. Above 100 = outperforming; below 100 = underperforming relative to the set.",
    "Post-renovation ramp (months 1–12 after a major flag renovation) distorts RevPAR Index temporarily — document it as a comp set anomaly in your IC reporting.",
  ],
};
