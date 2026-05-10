import type { SituationalCase } from '../../types/situational';

export const officeNegativeAbsorption: SituationalCase = {
  id: 'office-negative-absorption',
  title: 'Six straight quarters of negative absorption — do you still bid?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'A suburban office submarket has recorded negative net absorption for six consecutive quarters, totaling −480,000 SF of demand destruction. Current vacancy is 22%. A Class-B, 120,000 SF building is offered at a 9.5% going-in cap on in-place rents with an average remaining lease term of 3.2 years. The broker argues the negative absorption trend is bottoming out.',
  data: [
    { label: 'Submarket vacancy', value: '22%' },
    { label: 'Net absorption (trailing 6 qtrs)', value: '−480,000 SF' },
    { label: 'Going-in cap (in-place)', value: '9.5%' },
    { label: 'Weighted avg lease term', value: '3.2 years' },
    { label: 'Asset size', value: '120,000 SF' },
  ],
  question:
    'How should you interpret six quarters of negative absorption in your underwriting — and what is the right analytical response before bidding?',
  options: [
    {
      label: 'Treat the negative absorption as a structural signal, not noise. Stress-test the roll schedule: if 40–60% of leases roll into a 22%-vacant submarket, model several mark-to-market scenarios, including rents declining 15–25% on renewal and a 12-month re-leasing drag per vacancy.',
      isBest: true,
      explanation:
        'Six consecutive negative quarters is not a blip — it is sustained demand destruction. In a 22%-vacant submarket, any tenant rolling has enormous negotiating leverage. The right response is to stress the rent roll systematically: identify the roll schedule, model realistic renewal rents versus current in-place, and account for re-leasing TI and downtime. The 9.5% going-in cap is fictional if in-place rents are above market and leases expire into a soft environment.',
    },
    {
      label: 'The 9.5% going-in cap provides ample cushion. Even if rents fall 10%, the asset still yields above market alternatives.',
      isBest: false,
      explanation:
        'This reasoning anchors on the going-in cap without modeling what happens when leases expire. A 9.5% cap on above-market in-place rents in a 22%-vacant market can quickly compress to a 5–6% stabilized yield once tenant roll and re-leasing costs are accounted for. Going-in cap is backward-looking; underwriting must be forward-looking.',
    },
    {
      label: 'Trust the broker — if they say absorption is bottoming, the timing is favorable.',
      isBest: false,
      explanation:
        'Broker color is a starting point, not underwriting. "Bottoming out" has been said at every stage of secular office demand decline. The data — six negative quarters and 22% vacancy — is objective. Request the underlying leasing activity report, not the narrative.',
    },
    {
      label: 'Negative absorption is typical in office; average it against historical positive periods to get a normalized pace.',
      isBest: false,
      explanation:
        'Averaging across market cycles works in sectors with mean-reverting demand (multifamily, industrial). Suburban office faces structural headwinds (remote work, densification, flight to quality) that may not mean-revert. Averaging six negative quarters against a prior positive cycle overstates recovery speed.',
    },
  ],
  takeaway:
    'Negative absorption is a signal about future re-leasing economics, not just a market stat. The first job when evaluating office in a declining submarket is to map the roll schedule against the vacancy rate and build a realistic mark-to-market model — not rationalize the going-in yield.',
  tips: [
    'Run a "bleed rate": at current absorption, how many quarters until vacancy exceeds 25%? That is your downside scenario.',
    'In-place rents above market + short WALT + high vacancy = rent-roll risk trifecta. Each factor compounds the others.',
    'Ask the broker for a submarket leasing activity report (not just absorption) — leasing velocity with long concessions is very different from genuine demand recovery.',
  ],
};
