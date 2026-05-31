import type { SituationalCase } from '../../types/situational';

export const qualityTierCompAdjustment: SituationalCase = {
  id: 'quality-tier-comp-adjustment',
  title: 'All your comps are Class-A — how do you apply them to a Class-B subject?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'multifamily',
  scenario:
    'You are underwriting a 200-unit Class-B multifamily asset built in 2004. Recent trades in the submarket have been Class-A new construction at 5.25–5.50% cap rates. There are no same-vintage Class-B trades in the submarket in the past 18 months. The broker is using the Class-A comps directly to support a 5.25% cap rate on the subject.',
  data: [
    { label: 'Subject', value: '200-unit Class-B, 2004 vintage' },
    { label: 'Available comps', value: 'Class-A new construction, 5.25–5.50% cap' },
    { label: 'Same-class comps', value: 'None in submarket last 18 mos' },
    { label: 'Typical Class-A/B spread', value: '50–100 bps in comparable markets' },
    { label: 'Broker\'s implied subject cap', value: '5.25% (unadjusted)' },
  ],
  question:
    'How do you derive a defensible cap rate for the Class-B subject when only Class-A comps are available?',
  options: [
    {
      label:
        'Apply a 50–75 bps quality adjustment to the Class-A comp average — older product carries higher capex burden, shorter remaining economic life, and a shallower buyer pool, producing a subject cap of approximately 5.875–6.125%.',
      isBest: true,
      explanation:
        'Class-A to Class-B cap spreads typically run 50–100 bps, reflecting the age premium buyers pay for new construction versus older product with higher capex requirements. Starting from 5.375% (the midpoint of the Class-A range) and adding 50–75 bps gives 5.875–6.125% — defensibly anchored near 6.00%. The adjustment should be documented with comparable market spread data, broker intel, or recent appraisal references. "I used Class-A comps and widened 75 bps for quality" is a defensible answer in a lender or IC review. Using the unadjusted Class-A comps on a 2004-vintage asset systematically overpays by 50–100 bps.',
    },
    {
      label:
        'Use the Class-A comps directly at 5.25–5.50% — the subject benefits from the same submarket fundamentals.',
      isBest: false,
      explanation:
        'Same-submarket fundamentals support a comparable demand story, not an identical cap rate. A 2004-vintage asset has higher capex burden, shorter remaining economic life, and a shallower buyer pool relative to new construction — all of which widen the cap. Using Class-A comps without adjustment systematically overpays for Class-B product.',
    },
    {
      label:
        'Add 200 bps for age — the building is 20+ years old and that warrants a significant penalty.',
      isBest: false,
      explanation:
        '200 bps is punitive for a well-maintained Class-B asset in a strong submarket. Age alone does not drive a 200 bps spread; what matters is capex burden, functional obsolescence, and buyer pool depth relative to newer product. A 2004 vintage in good condition typically warrants 50–100 bps over Class-A new construction, not 200 bps.',
    },
    {
      label:
        'Decline to support a cap rate without same-class comps — the analysis is unsupportable without a direct comparable.',
      isBest: false,
      explanation:
        'Refusing to bridge from available data to a defensible estimate is unhelpful in an underwriting context. Documented, adjusted cross-class comps are standard practice when local same-class trades are unavailable. The key is the transparency of the adjustment and the documented rationale for the quality spread.',
    },
  ],
  takeaway:
    'Quality-tier adjustments bridge from available comps to the subject property. Class-A to Class-B spread is typically 50–100 bps — always document the adjustment with market data or broker references. The IC question will be: "Why that spread?" Have the answer ready before the meeting.',
  tips: [
    'Class-A to Class-B spread: 50–100 bps typical, wider in high-capex or thin-buyer-pool markets.',
    'Document the spread source: market data, broker intel, or comparable appraisal references.',
    'A tightening Class-A/B spread signals strong Class-B demand — note it as a positive market dynamic.',
  ],
};
