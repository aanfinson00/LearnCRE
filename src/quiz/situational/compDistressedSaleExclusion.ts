import type { SituationalCase } from '../../types/situational';

export const compDistressedSaleExclusion: SituationalCase = {
  id: 'comp-distressed-sale-exclusion',
  title: 'Should you use a distressed sale as a comp?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re pricing a 150-unit Class-B multifamily asset. The broker provides four comps: (1) a 120-unit trade 3 months ago at 5.1% cap — arm\'s length, both parties represented; (2) a 180-unit trade 5 months ago at 5.3% cap — similar vintage; (3) a 140-unit bank REO disposition at 6.4% cap 7 months ago — the lender sold under a court-ordered timeline with no marketing period; (4) a 200-unit portfolio trade at 5.0% cap 6 months ago — three properties sold as a package to one buyer.',
  data: [
    { label: 'Comp 1', value: '120 units, 5.1% cap, 3 mos ago, arm\'s length' },
    { label: 'Comp 2', value: '180 units, 5.3% cap, 5 mos ago, arm\'s length' },
    { label: 'Comp 3', value: '140 units, 6.4% cap, 7 mos ago, REO court sale' },
    { label: 'Comp 4', value: '200 units, 5.0% cap, 6 mos ago, portfolio trade' },
    { label: 'Your subject', value: '150 units, Class-B, single asset' },
  ],
  question: 'How should you weight and use these four comps?',
  options: [
    {
      label:
        "Use Comps 1 and 2 as the primary pricing anchors (arm\'s length, recent, similar scale). Comp 3 is a distressed comp — discard or use as a downside floor only. Comp 4 is a portfolio trade that may include a premium or discount vs. single-asset pricing. Bracket the subject at 5.1–5.3%, noting the portfolio comp (5.0%) as a tighter data point that likely reflects portfolio-buyer premium and the distressed comp (6.4%) as non-representative.",
      isBest: true,
      explanation:
        "Arm's length, single-asset, recent, same-submarket trades are the most reliable comps. Comp 3 (REO) was sold under duress — no marketing period, court timeline, lender motivation — which artificially depresses the price (i.e., widens the cap). It's the floor of what a distressed forced sale looks like, not a market indicator. Comp 4 (portfolio) likely reflects portfolio-buyer premium or a bulk discount depending on buyer; comparing a single-asset sale to a portfolio trade requires an explicit adjustment. Lead with Comps 1 and 2, use 4 as directional data, and exclude or footnote 3.",
    },
    {
      label:
        "Average all four comps — a larger sample produces a more defensible number.",
      isBest: false,
      explanation:
        "Averaging unfiltered comps includes a distressed sale (6.4%) that is not representative of arm's length market pricing, and a portfolio trade that may include structural differences in pricing. Simple averaging gives 5.45%, which is tighter than the two arm's length comps alone. Quantity of comps doesn't offset quality problems — a distressed REO comp and an arm's length comp measure fundamentally different things.",
    },
    {
      label:
        "Use Comp 3 (distressed) as the worst-case scenario and price off it — lenders will appreciate the conservative underwriting.",
      isBest: false,
      explanation:
        "This confuses stress-testing with comp selection. A 6.4% distressed cap rate doesn't reflect what an arm's length buyer would pay in a normal marketing process — it reflects a forced-sale outcome with compressed timelines and motivated seller. Pricing off the distressed comp as a base case understates market value and produces a bid that leaves money on the table. Use it as a downside sensitivity scenario, not as a primary comp.",
    },
    {
      label:
        "Use only Comp 4 (portfolio) — it's the most recent and the largest comparable transaction by unit count.",
      isBest: false,
      explanation:
        "Recency and size don't override structural comparability. A portfolio trade may include pricing adjustments for bulk, relationship, or mixed-quality assets that don't translate to a single-asset sale. Comp 4 at 5.0% might reflect a portfolio premium where a buyer paid up to secure a large trade — applying that cap to a single asset overstates its value. Always prefer arm's length single-asset comps over portfolio trades for single-asset pricing.",
    },
  ],
  takeaway:
    "Not all comps are created equal. Distressed sales (REO, lender forced sales, court-ordered dispositions) are non-representative of arm's length market pricing and should be excluded or relegated to downside-scenario use. Portfolio trades may include premiums or discounts not applicable to single-asset pricing. Rank comps by: (1) arm's length vs. distressed, (2) single-asset vs. portfolio, (3) recency, (4) geographic proximity, (5) physical similarity. The highest-quality comps are arm's length, single-asset, recent, same-submarket — everything else requires explicit adjustment or exclusion.",
  tips: [
    'Red flags: "court-ordered," "REO," "no marketing period" — all signal distressed pricing.',
    'Portfolio premium: buyers in portfolio trades sometimes pay up for scale; single-asset buyers do not.',
    'When in doubt: document why you excluded a comp, not just which ones you kept.',
  ],
};
