import type { SituationalCase } from '../../types/situational';

export const pipelineVsAbsorption: SituationalCase = {
  id: 'pipeline-vs-absorption',
  title: 'The pipeline is twice trailing absorption — is this deal deliverable?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'development'],
  assetClass: 'industrial',
  scenario:
    "You're evaluating an industrial development in a high-growth logistics submarket. The trailing 12-month net absorption was 2.5M SF. The total under-construction pipeline across all developers is 5M SF — exactly 2× the trailing absorption pace — with 2M SF delivering in the next 9 months, including your 400K SF project. Build cost is $85/SF all-in; stabilized NOI projects to a 6.5% yield on cost at your proforma rents.",
  data: [
    { label: 'Trailing 12-mo net absorption', value: '2.5M SF' },
    { label: 'Total pipeline', value: '5.0M SF (2× absorption)' },
    { label: 'Near-term deliveries (9 mo)', value: '2.0M SF' },
    { label: 'Your project', value: '400K SF, delivering in 9 mo' },
    { label: 'All-in build cost', value: '$85/SF' },
    { label: 'Stabilized yield on cost', value: '6.5%' },
  ],
  question: 'How should the pipeline-to-absorption ratio shape your underwriting?',
  options: [
    {
      label: "Flag a realistic 12–18 month lease-up instead of the 6 months likely modeled, stress-test concessions, and verify the 6.5% yield on cost still clears the prevailing cap rate by 100–150 bps after the extended carry.",
      isBest: true,
      explanation:
        "When pipeline is 2× trailing absorption, average stabilization slows materially. The full 5M SF cannot clear in 12 months if trailing demand was only 2.5M. Your 400K SF is 20% of the near-term deliveries; even in a well-absorbed submarket, 2M SF of simultaneous supply creates concession pressure (free rent, TI competitions). The right underwriting: (1) extend lease-up to 12–18 months from stabilization, (2) add 3–6 months of free rent and elevated TI concessions to the proforma, (3) stress the extended carry cost at those conditions, and (4) verify the 6.5% yield on cost still produces a development spread of 100–150 bps over the prevailing market cap rate after all adjustments. The development spread is your margin of safety — if it compresses below 75 bps, the deal's risk/reward deteriorates.",
    },
    {
      label: 'A 2× pipeline is fine — logistics demand is inelastic and the sector always absorbs more than forecast.',
      isBest: false,
      explanation:
        "Sector optimism is not an underwriting input. Even in high-growth logistics markets, 2× trailing absorption as pipeline means some deals stabilize late, concessions rise, and rents soften. The 2018–2022 era of effortless industrial absorption has ended. Underwrite the math, not the narrative — the pipeline-to-absorption ratio is the first supply pressure signal to quantify.",
    },
    {
      label: "Exit the deal — 2× pipeline guarantees you won't stabilize at proforma rent.",
      isBest: false,
      explanation:
        "2× pipeline creates pressure but doesn't guarantee failure. The question is whether your margin — yield on cost spread to prevailing cap rate — can absorb a lease-up extension and moderate concession increase. Calculate the break-even stabilization period and compare to your carry capacity. Exiting without running the math is as much a mistake as proceeding without it.",
    },
    {
      label: 'Adjust lease-up to 18 months and accept a 10% rent reduction from the proforma; if the deal still pencils, proceed.',
      isBest: false,
      explanation:
        "The 10% rent reduction is a guess. The right method: look at current transactions in the submarket to see where leasing is clearing vs. proforma. If comps confirm 10% below proforma, use that with evidence. If the submarket is concession-heavy (free rent vs. face rent) rather than discounting face rent, the analysis changes. Model the specific market signal, not an arbitrary haircut.",
    },
  ],
  takeaway:
    "Pipeline-to-absorption ratio (P/A) is the primary supply pressure metric in development underwriting. When P/A > 1.5×, model extended lease-up and higher concessions. When P/A > 2.0×, stress the full proforma. The development spread (yield on cost minus prevailing cap rate) is your buffer — it must clear 100–150 bps after adjusting for extended carry costs for the deal to remain investable.",
  tips: [
    'Pipeline-to-absorption > 1.5× = extend lease-up; > 2.0× = pressure-test the entire proforma.',
    "Check pre-leased % of pipeline — pre-leased supply doesn't compete for your tenant pool.",
    'Concession increases (free rent) typically precede face-rent cuts; track them separately in your comp research.',
  ],
};
