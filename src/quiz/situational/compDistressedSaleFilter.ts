import type { SituationalCase } from '../../types/situational';

export const compDistressedSaleFilter: SituationalCase = {
  id: 'comp-distressed-sale-filter',
  title: 'Should the REO sale be in your comp set?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re pricing a 180-unit stabilized Class-B multifamily asset. Your broker pulls 4 recent trades in the submarket. One of the 4 comps is a 200-unit asset that sold 7 months ago as an REO (bank-owned foreclosure). It traded at a 7.8% cap — meaningfully wider than the other 3 comps, which averaged 5.4%. The REO property was 60% occupied at sale with deferred maintenance; the seller was a lender liquidating collateral on a distressed basis.',
  data: [
    { label: 'Subject', value: '180 units, Class B, stabilized, well-maintained' },
    { label: 'Comp 1', value: 'Stabilized, 5.2% cap, 6 mos ago' },
    { label: 'Comp 2', value: 'Stabilized, 5.5% cap, 9 mos ago' },
    { label: 'Comp 3', value: 'Value-add, 5.6% cap, 4 mos ago' },
    { label: 'Comp 4 (REO)', value: '60% occupied, deferred maintenance, 7.8% cap, 7 mos ago' },
  ],
  question: 'How should you handle the REO comp?',
  options: [
    {
      label:
        'Discard the REO comp from the cap rate anchor — it reflects lender-liquidation pricing, not arm\'s-length market clearing. Use Comps 1-3 and bracket your subject at 5.2-5.6%, applying a modest adjustment for your subject\'s stabilized quality vs. the value-add comp.',
      isBest: true,
      explanation:
        'REO sales are constrained transactions — the seller (a lender) was motivated to liquidate, could not negotiate terms, and the property was under-occupied and poorly maintained. The 7.8% cap reflects: (1) lender-seller motivation, (2) high occupancy discount, and (3) deferred maintenance discount. None of these factors apply to your subject. Including this comp in an average would artificially widen your cap rate by ~55 bps (pulling from 5.4% toward 6.0%) without any basis in arm\'s-length market evidence. Most appraisers will discard or footnote REO comps; your IC presentation should treat it the same way.',
    },
    {
      label:
        'Weight the REO comp at 50% of the other comps — it\'s still a data point that reflects buyer sentiment in the submarket.',
      isBest: false,
      explanation:
        'Weighting a constrained transaction alongside arm\'s-length trades introduces systematic bias without a principled basis for the weight. "50%" is arbitrary. The REO reflects forced-sale mechanics and a deeply distressed property — weighting it even partially contaminates the market signal. Either include it with a documented normalized adjustment (occupancy, maintenance) or exclude it with a documented rationale.',
    },
    {
      label:
        'Include the REO comp — it shows the downside. Knowing buyers paid 7.8% in a stress scenario is useful context for your own downside stress.',
      isBest: false,
      explanation:
        'There\'s value in knowing where distressed assets traded, but that analysis belongs in the risk section, not the cap rate anchor section. Pricing at the mid-point of market and distress is not "conservative" — it\'s just wrong. The correct practice is to price off arm\'s-length comps, then separately model a distress scenario for downside.',
    },
    {
      label:
        'Use all 4 comps and average to 6.1% — lenders won\'t question a comp set with 4 trades.',
      isBest: false,
      explanation:
        'Lenders and their appraisers absolutely will question the REO comp — it\'s the first thing a competent appraiser flags. More importantly, pricing at 6.1% based on a contaminated average means you\'re likely underpricing the asset vs. market, or over-paying for it relative to true market cap rates. The IC will ask why your comp set includes a distressed liquidation.',
    },
  ],
  takeaway:
    'Distressed and constrained sales (REO, estate sales, forced liquidations, partial-interest sales) should be excluded from the primary cap rate anchor or normalized for the distress factors before inclusion. The standard appraiser practice is to identify and footnote these transactions separately. In an IC context, mixing constrained and arm\'s-length trades without disclosure is a diligence failure.',
  tips: [
    'Red flags for a constrained sale: REO/bank-owned, estate/probate, court-ordered, deed-in-lieu, lender-seller.',
    'If a comp\'s cap is 150+ bps outside the market cluster, investigate before including it.',
    'Document your comp exclusion rationale — IC will ask.',
    'Distressed comps are useful for downside scenarios, not primary valuation anchors.',
  ],
};
