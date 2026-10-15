import type { SituationalCase } from '../../types/situational';

export const retailUnanchoredCapComps: SituationalCase = {
  id: 'retail-unanchored-cap-comps',
  title: 'Retail: which cap rate comps apply to an unanchored strip?',
  category: 'comp-selection',
  difficulty: 'beginner',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'retail',
  scenario:
    "You're pricing a 40,000 SF unanchored strip center with local tenants and 4.5 years of weighted average lease term. Your broker's comp package has three grocery-anchored sales at 6.0%–6.25% and two unanchored strip sales at 7.25%–7.5%. The broker suggests pricing at 6.25% because there are more anchored comps.",
  data: [
    { label: 'Subject', value: '40,000 SF unanchored strip, WALT 4.5 years' },
    { label: 'Anchored comps', value: '3 sales, 6.00%–6.25%' },
    { label: 'Unanchored comps', value: '2 sales, 7.25%–7.50%' },
    { label: 'Broker suggestion', value: '6.25%' },
  ],
  question: 'How should you use these comps?',
  options: [
    {
      label:
        "Anchor on the two unanchored sales (7.25%–7.50%) and adjust for specifics like WALT, tenant mix and location. Use the grocery-anchored deals only as a floor that the subject should trade wide of.",
      isBest: true,
      explanation:
        "Cap rates in retail are driven by traffic stability and tenant credit, and a grocery anchor changes both. The anchored sales reflect that durability, so they are a lower bound, not a peer. The unanchored sales are the same product type, so they set the range. Adjustments for WALT and location then move the subject within or slightly around 7.25%–7.50%.",
    },
    {
      label:
        "Average all five comps (about 6.7%) since more data points produce a more reliable number.",
      isBest: false,
      explanation:
        "Averaging blends two different risk profiles into a number that matches neither. A larger sample helps only when the observations are from the same population. Five comps from two asset types give a precise-looking answer to the wrong question.",
    },
    {
      label:
        "Use 6.25% as the broker suggests, since the majority of the comps are anchored.",
      isBest: false,
      explanation:
        "Comp selection is about similarity, not counting. At 6.25% versus 7.25% on, say, $1.6M of NOI, the difference is about $3.7M of value (1.6M ÷ 6.25% = $25.6M versus 1.6M ÷ 7.25% = $22.1M). That is a large amount to give up because of how the comp package was assembled.",
    },
    {
      label:
        "Discard the unanchored comps because only two sales is too small a sample.",
      isBest: false,
      explanation:
        "Two relevant comps are more informative than three irrelevant ones. The right response to a thin sample is to widen the search for more unanchored sales or to add a risk premium over the anchored comps, not to switch to the wrong product type.",
    },
  ],
  takeaway:
    "Choose comps on similarity of risk, not on count. Anchored retail is a floor for an unanchored strip, and the unanchored sales set the range.",
  tips: [
    "A grocery anchor lowers cap rates by stabilizing traffic and rent.",
    "Thin comps call for a wider search, not for a different asset type.",
    "Show the value effect of the cap rate choice in dollars.",
  ],
};
