import type { SituationalCase } from '../../types/situational';

export const compSizeAdjustment: SituationalCase = {
  id: 'comp-size-adjustment',
  title: 'Pricing a small asset when only large comps exist',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'retail',
  scenario:
    'You\'re pricing a 12,000 SF neighborhood strip center anchored by a dry cleaner and a nail salon. All available sales comps in the submarket are 40,000–90,000 SF power centers anchored by national grocery or big-box tenants, trading at 6.0–6.5% caps. Your subject is 100% occupied with local/regional tenants and no national anchor.',
  data: [
    { label: 'Subject', value: '12,000 SF, neighborhood strip, 100% occupied' },
    { label: 'Tenancy', value: 'Local/regional only — dry cleaner, nail salon, others' },
    { label: 'Comp range', value: '40,000–90,000 SF power centers @ 6.0–6.5% caps' },
    { label: 'Comp anchors', value: 'Grocery, big-box national tenants' },
    { label: 'Size gap', value: 'Subject is 7–13x smaller than available comps' },
  ],
  question: 'How should you approach cap rate pricing given the size and tenancy mismatch?',
  options: [
    {
      label: 'Start from the comp range (6.0–6.5%) and apply two explicit adjustments: +50–100 bps for smaller size and +50–100 bps for non-credit tenancy, implying 7.0–8.5% for the subject.',
      isBest: true,
      explanation:
        'The comp set anchors submarket pricing; your job is to bridge from comp to subject with documented adjustments. Smaller assets trade wider because (1) fewer buyers qualify or are interested at small price points ($1–3M), shrinking demand, and (2) each individual tenant is a higher percentage of income, making single-vacancy more damaging. Local/regional tenancy vs. national credit tenancy is a separate 50–100 bps adjustment in most retail markets: non-credit tenants carry higher perceived default risk and are harder for institutional underwriters to underwrite. Apply both adjustments explicitly and defend each one.',
    },
    {
      label: 'Ignore the comps — they\'re too different. Use a broker BOV for the small strip.',
      isBest: false,
      explanation:
        'The broker BOV is ultimately derived from the same comp set — brokers apply the same size and tenancy adjustments, just implicitly. Starting from comps and adjusting is more transparent and defensible than deferring to a BOV without showing your work. Even imperfect comps provide a directional anchor.',
    },
    {
      label: 'Use the comp range directly — retail cap rates in a submarket reflect all asset types, and size doesn\'t meaningfully change the cap.',
      isBest: false,
      explanation:
        'This ignores two real pricing factors with documented market effects. Buyer pool depth is directly tied to asset size and price point; $1–3M small strips have a different buyer universe than $20–80M anchored centers. Non-credit tenancy is a separate and well-documented cap rate adjustment. Applying the anchor comp cap directly to the unanchored strip would overprice the asset relative to what it will actually trade for.',
    },
    {
      label: 'Apply a single 50 bps adjustment for size and use 6.5–7.0%.',
      isBest: false,
      explanation:
        'Size adjustment alone is likely insufficient. Non-credit vs. grocery-anchored tenancy is at least another 50–100 bps. Under-adjusting produces a pricing that will be beaten by buyers with more granular submarket data — either you\'ll overbid, or you\'ll lose a deal you should have won at a different price. Both size and tenancy adjustments are necessary and should be documented separately.',
    },
  ],
  takeaway:
    'Comp selection requires explicit adjustment bridges. When size and tenancy don\'t match, document each adjustment in basis points and make each one independently defensible. A small, non-credit strip center trades at 100–200 bps wider than a large grocery-anchored power center — roughly 50–100 bps for size and 50–100 bps for tenancy credit quality.',
  tips: [
    'Size rule of thumb: strip centers <20K SF typically trade 50–100 bps wider than 50K+ anchored centers in the same submarket.',
    'Tenancy quality: national credit anchor → regional/local non-anchor adds 50–100 bps.',
    'If comp size mismatch is >5x, note the limitation explicitly — widen the range and document the gap.',
  ],
};
