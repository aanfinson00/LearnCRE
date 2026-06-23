import type { SituationalCase } from '../../types/situational';

export const compDistressedSale: SituationalCase = {
  id: 'comp-distressed-sale',
  title: 'Should a distressed sale count as a comp?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    "You're pricing a 120,000 SF suburban office building. Three comparable properties traded in the past 12 months: Comp A at a 7.2% cap (arms-length, 6 months ago), Comp B at a 7.5% cap (arms-length, 9 months ago), and Comp C at a 9.0% cap (lender-directed REO sale after borrower default, 45-day close, 4 months ago). A junior analyst proposes averaging all three for a blended cap of 7.9%.",
  data: [
    { label: 'Comp A', value: '7.2% cap — arms-length, 6 months ago' },
    { label: 'Comp B', value: '7.5% cap — arms-length, 9 months ago' },
    { label: 'Comp C', value: '9.0% cap — REO / lender-directed, 45-day close' },
    { label: 'Blended average (all three)', value: '7.9% cap' },
    { label: 'Arms-length only average', value: '7.35% cap (A and B)' },
  ],
  question: 'How should you treat Comp C in the pricing analysis?',
  options: [
    {
      label: "Exclude Comp C from the primary cap-rate anchor. REO sales are non-arm's-length — motivated-seller pricing under time pressure isn't market value. Use Comps A and B for the cap anchor; reference Comp C only as a documented downside stress bound.",
      isBest: true,
      explanation:
        "Arms-length definition: buyer and seller are independent, informed, and acting without compulsion. REO/lender-directed sales fail this test — the lender is motivated to exit quickly, often accepting below-market value, and buyers price in execution risk (shorter diligence, potential title issues). Including Comp C at face value drags the cap 55 bps wider than the arms-length evidence supports. Appraisal standards (USPAP) and most institutional underwriting protocols require excluding or heavily discounting non-arm's-length trades. Reference Comp C as the distress floor, not the market mid-point.",
    },
    {
      label: "Average all three — three data points improves statistical reliability, and the distressed sale still happened.",
      isBest: false,
      explanation:
        "Quantity of data points doesn't compensate for quality. A distressed sale reflects compelled-seller pricing, not market equilibrium. Blending it into a simple average produces a 7.9% cap — a number that represents neither the arms-length market (7.35%) nor the distress floor (9.0%). It's a mathematical artifact, not an economic conclusion.",
    },
    {
      label: "Include Comp C but weight it at 25% vs. 100% for the arms-length comps.",
      isBest: false,
      explanation:
        "Arbitrary weighting masks the problem without solving it. The core question is whether Comp C reflects market value at all — if it doesn't, no weighting scheme makes it a valid market comp. Standard practice is to exclude distressed trades with explicit documentation, not to blend them at reduced weight and hope the math averages out.",
    },
    {
      label: "Comp C is the most conservative anchor — use it to stress-test the deal.",
      isBest: false,
      explanation:
        "Distressed transactions are useful as downside stress references — that's correct. But treating the REO price as the 'conservative base' for underwriting a normally functioning asset means pricing in the scenario where the subject is also in distress. A borrower-default pricing assumption applied to an arms-length acquisition is stress-scenario analysis, not base-case underwriting.",
    },
  ],
  takeaway:
    "Arms-length qualification is a threshold requirement for comps, not a scoring variable. Distressed sales tell you the clearing price under duress — essential for risk framing, but not for anchoring market value. Exclude non-arm's-length trades from the primary comp set, document why, and reference them as the downside bound only.",
  tips: [
    "Arms-length = buyer and seller independent, informed, not compelled. REO fails this test.",
    "Discard distressed comps from the cap-rate anchor; use them to define the stress floor.",
    "Always note sale conditions when sourcing comps: REO, foreclosure, divorce sale, deferred maintenance.",
  ],
};
