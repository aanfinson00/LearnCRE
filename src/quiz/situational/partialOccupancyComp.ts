import type { SituationalCase } from '../../types/situational';

export const partialOccupancyComp: SituationalCase = {
  id: 'partial-occupancy-comp',
  title: 'The best recent comp was 65% leased at sale — do you use it?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'retail',
  scenario:
    "You're pricing a 180,000 SF stabilized grocery-anchored retail center. The most recent trade in the submarket (5 months ago) involves a nearly identical center that sold at a 7.8% cap rate — but at the time of sale it was only 65% occupied; the anchor space had been dark for 18 months. You are 97% leased with a healthy rent roll. Your broker is pushing to use the 7.8% cap as the floor of your pricing.",
  data: [
    { label: 'Subject occupancy', value: '97% leased, strong rent roll' },
    { label: 'Comp trade date', value: '5 months ago — 7.8% cap' },
    { label: 'Comp occupancy at sale', value: '65% (anchor dark 18 months)' },
    { label: 'Other comps (submarket)', value: '6.5–7.0% caps, 90%+ occupancy, 9–18 months old' },
    { label: 'Subject', value: '180k SF grocery-anchored center' },
  ],
  question: 'How should you use the 7.8% comp when pricing your stabilized asset?',
  options: [
    {
      label:
        "Document the 7.8% cap but treat it as a value-add/lease-up comp, not a stabilized comp. Price your stabilized asset off the 6.5–7.0% comps and show the 7.8% as the distressed reference that explains the spread. The occupancy gap (97% vs 65%) is worth 80–120 bps of cap rate — the 7.8% comp supports pricing tighter, not wider, for your stabilized asset.",
      isBest: true,
      explanation:
        "The occupancy gap between your subject and the 7.8% comp is the pricing variable, not evidence of a market-wide cap expansion. The comp traded at a value-add pricing basis — a buyer underwrote leasing risk (dark anchor, 18 months of uncertainty, lease-up capital required) into the cap. The cap rate differential vs. stabilized comps (~70–130 bps) is the market's pricing of that leasing risk. Your fully stabilized asset should price off the 90%+ comps (6.5–7.0%), and the 7.8% comp is useful as a stress reference showing how much the market discounts for occupancy risk. The broker is using it backwards — it should support a tighter cap for your stabilized asset relative to the comp, not act as a floor.",
    },
    {
      label:
        "Use 7.8% as the pricing floor since it's the most recent submarket trade — recency trumps occupancy differences.",
      isBest: false,
      explanation:
        "Recency is one comp-selection criterion; occupancy comparability is another. Using a 65%-occupied comp to price a 97%-occupied asset ignores the fundamental difference in risk profile. The 7.8% cap includes a lease-up risk premium that your stabilized asset does not carry. Anchoring to this comp creates a self-inflicted discount — you'd be penalizing your own asset for risk it doesn't have.",
    },
    {
      label:
        "Discard the 7.8% comp entirely — it's not comparable and could mislead buyers.",
      isBest: false,
      explanation:
        "Don't discard it — document it. The 7.8% comp is valuable information: it tells buyers (and appraisers) that occupancy risk commands 80–130 bps of cap widening in this submarket. Showing it alongside your stabilized comps with a clear bridge (stabilized vs. value-add basis) actually strengthens your pricing narrative rather than weakening it.",
    },
    {
      label:
        "Average the 7.8% comp with the 6.5–7.0% comps and present the blended result as the market rate.",
      isBest: false,
      explanation:
        "Averaging apples and oranges produces a misleading number that's too wide for a stabilized asset and too tight for a value-add one. Buyers will immediately identify the occupancy discrepancy and discard the average. Present the comps stratified by occupancy bucket so the audience can see the market's own pricing logic.",
    },
  ],
  takeaway:
    "Comps should be stratified by occupancy status — stabilized (90%+ occupied) vs. value-add (sub-90%) trade at materially different cap rates because they embed different risk profiles. A single value-add trade doesn't reprice the stabilized market; it tells you what the market charges for leasing risk. The occupancy adjustment between a 65%-occupied and a 97%-occupied center is 80–130 bps in most retail submarkets. Always document the occupancy at sale in comp tables — it's as important as the trade date.",
  tips: [
    "Comp filter: occupancy at sale should be within ±10% of subject — outside that, document the adjustment explicitly.",
    "Occupancy gap pricing: each 10% of vacancy from stabilized costs ~15–25 bps of cap widening (market-dependent).",
    "Show comps stratified by occupancy bucket in your IC presentation — it makes your pricing rationale self-evident.",
  ],
};
