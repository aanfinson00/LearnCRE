import type { SituationalCase } from '../../types/situational';

export const compGeographicAdjustment: SituationalCase = {
  id: 'comp-geographic-adjustment',
  title: 'Your comp is in the wrong submarket — how do you adjust?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're pricing a 200-unit Class-B multifamily in a suburban submarket with limited comparable trades. The closest recent comp is a 220-unit Class-B trade 4 months ago in an adjacent submarket at a 5.0% cap. The adjacent submarket has historically traded 30–40 bps tighter than your subject's submarket due to stronger school districts and higher median incomes. There is also a 180-unit trade in your exact submarket from 18 months ago at 5.5% — pre-rate-hike.",
  data: [
    { label: 'Subject', value: '200 units, Class-B, suburban submarket A' },
    { label: 'Comp 1', value: '220 units, Class-B, adjacent submarket B, 4 mos, 5.0% cap' },
    { label: 'Submarket gap', value: 'Submarket B trades 30–40 bps tighter historically' },
    { label: 'Comp 2', value: '180 units, Class-B, submarket A, 18 mos ago, 5.5% cap' },
    { label: 'Macro', value: '5-yr Treasury rose ~175 bps in the 18 months between Comp 2 and today' },
  ],
  question: 'How do you arrive at a defensible cap rate for the subject?',
  options: [
    {
      label:
        "Adjust Comp 1 upward by 30–40 bps for the submarket differential: 5.0% + 0.35% ≈ 5.35%. Treat Comp 2 as stale and document the rate-environment change, using it as a check (5.5% in a lower-rate environment implies ≥5.5% today if the 175 bps rate rise has widened caps). Bracket subject at 5.25–5.50%, flagging that the thin comp base limits pricing precision.",
      isBest: true,
      explanation:
        "When you lack a perfect comp, you build a bridge. Comp 1 is the most comparable on time and product but is in the wrong submarket — the submarket differential is a documented, historically stable 30–40 bps, making it a supportable adjustment. Comp 2 is in the right submarket but stale; the 175 bps rate move suggests caps have likely widened since then (the rule of thumb is caps widen ~60–80% of Treasury moves), implying Comp 2 today might be 5.5% + ~105–140 bps = 5.6–5.9%+ — though that adjustment is less precise. The Comp 1 adjustment gives a tighter read; the Comp 2 provides a directional floor check. Bracketing 5.25–5.50% and disclosing the thin comp base is honest and defensible.",
    },
    {
      label:
        'Use Comp 1 at face value (5.0%) — the adjacent submarket is "close enough" and the 4-month age is fresh.',
      isBest: false,
      explanation:
        "The 30–40 bps differential between submarkets is documented and historically stable — ignoring it produces a cap that's 30–40 bps too tight, which at a $30M+ asset is a $2–4M pricing error. 'Close enough' is not a comp-adjustment methodology; the bridge from observed comp to subject always needs documentation of what adjustments were made and why.",
    },
    {
      label:
        "Use Comp 2 as the primary data point — it's in the exact submarket, which is the most important attribute.",
      isBest: false,
      explanation:
        "Geographic match is important but not the only variable. Comp 2 is 18 months old in an environment where rates rose ~175 bps — which almost certainly means cap rates have widened from the 5.5% of 18 months ago. A stale comp in a changed rate environment without adjustment is at least as misleading as an adjacent-submarket comp with a documented differential. Best practice: use both with explicit adjustments, and acknowledge the uncertainty.",
    },
    {
      label:
        "Average Comp 1 and Comp 2 — split the difference between old-same-submarket and new-different-submarket.",
      isBest: false,
      explanation:
        "Averaging unadjusted comps doesn't produce a more accurate number — it produces the average of two differently-biased inputs. (5.0% + 5.5%) / 2 = 5.25%, which happens to be in the right range, but for the wrong reason. A buyer or seller scrutinizing the comp set will ask 'why average?' and the answer reveals that each comp was used without adjustment. The correct approach: adjust each comp for its specific differences from the subject, then reconcile.",
    },
  ],
  takeaway:
    "Comp adjustment is the practice of documenting and quantifying the difference between a comp and the subject — whether geographic, vintage, size, or rate-environment. Always adjust rather than use comps raw; always document why the adjustment was made and what magnitude you applied. When the comp base is thin (2 or fewer usable comps), disclose the uncertainty explicitly rather than presenting a false precision in the cap rate conclusion. Thin comp bases warrant wider pricing ranges, not false precision.",
  tips: [
    'Document the submarket differential before using a cross-market comp — the burden of proof is on you.',
    'Rate-environment adjustment: for every 100 bps of Treasury move, cap rates typically widen 60–80 bps (asset-class dependent).',
    'When in doubt: widen the range, disclose the uncertainty, flag the thin data.',
  ],
};
