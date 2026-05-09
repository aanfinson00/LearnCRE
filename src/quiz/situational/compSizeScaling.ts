import type { SituationalCase } from '../../types/situational';

export const compSizeScaling: SituationalCase = {
  id: 'comp-size-scaling',
  title: 'Do you adjust the cap rate when the comps are the wrong size?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    "You're pricing a 100,000 SF Class-B suburban office building. The three best recent comps are: a 250,000 SF asset at 5.50%, a 75,000 SF asset at 6.25%, and a 50,000 SF asset at 6.50%. All traded within the past 9 months in the same submarket. The unweighted average cap across all three is 6.08%.",
  data: [
    { label: 'Subject', value: '100,000 SF' },
    { label: 'Comp 1', value: '250,000 SF · 5.50% cap' },
    { label: 'Comp 2', value: '75,000 SF · 6.25% cap' },
    { label: 'Comp 3', value: '50,000 SF · 6.50% cap' },
    { label: 'Raw unweighted average', value: '6.08%' },
  ],
  question: "How should you handle the size disparity in this comp set?",
  options: [
    {
      label: "Weight toward the smaller comps and apply a documented size adjustment to Comp 1. Larger buildings attract a broader institutional buyer pool and trade at tighter caps — the 100k SF subject is closer to Comps 2 and 3. The adjusted anchor lands near 6.00–6.25%, not 5.50%.",
      isBest: true,
      explanation:
        "Building size is a systematic cap-rate driver: larger assets attract REITs, pension funds, and large private equity — more bidders, tighter caps. A 100k SF building's buyer pool skews to regional investors and smaller operators, a meaningfully narrower group. The spread between the 50k SF and 250k SF comps (100 bps) reflects this. At 100k SF, the subject sits closer to the smaller comps. The right move: weight Comps 2 and 3 more heavily, or apply a documented ~+25 bps adjustment to Comp 1, landing near 6.10–6.25%.",
    },
    {
      label: "Average all three — the raw average already captures size diversity and is the most defensible estimate.",
      isBest: false,
      explanation:
        "A straight average treats all three comps as equally comparable when they differ systematically. The 250k SF building at 5.50% pulls the average 50+ bps tighter than the subject warrants. An unweighted average on a comp set with a known systematic factor (size) produces a number that looks defensible but isn't.",
    },
    {
      label: "Discard Comp 1 (too large) and average Comps 2 and 3 only — 6.38% is the right anchor.",
      isBest: false,
      explanation:
        "Discarding is unnecessarily aggressive when adjustment is more informative. Comp 1 is same-submarket, recent, and quality — it just needs a size adjustment. Averaging Comps 2 and 3 at 6.38% likely goes too wide for a 100k SF asset; the subject is meaningfully larger than 50k SF and should trade tighter than the smallest comp.",
    },
    {
      label: "Use Comp 1 as the primary benchmark since larger buildings set the institutional floor for the market.",
      isBest: false,
      explanation:
        "Institutional assets set a floor for INSTITUTIONAL buyers — who won't show up for a 100k SF asset. Using the 250k SF comp as the primary anchor systematically overpays by anchoring to a buyer pool that won't participate in the auction.",
    },
  ],
  takeaway:
    "Size is a systematic cap-rate driver. Larger assets trade at tighter caps because they attract a broader, more competitive institutional buyer pool. For comp sets with size disparity, either weight toward same-size comps or apply a documented size adjustment. Never silently average across heterogeneous comps — the systematic bias will compound in the valuation.",
  tips: [
    "Size premium rule of thumb: 15–30 bps per major size step (50k → 100k → 200k+ SF).",
    "The mechanism is buyer pool: fewer bidders for smaller buildings = wider caps.",
    "Document your adjustments explicitly — 'weighted toward smaller comps because subject is 100k SF' is defensible; silent averaging is not.",
  ],
};
