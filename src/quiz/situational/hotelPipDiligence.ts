import type { SituationalCase } from '../../types/situational';

export const hotelPipDiligence: SituationalCase = {
  id: 'hotel-pip-diligence',
  title: 'Hotel: a $12M brand PIP is on the table — how do you underwrite it?',
  category: 'deal-process',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  assetClass: 'hotel',
  scenario:
    "You're underwriting the acquisition of a 200-key full-service hotel with a major national flag. The flag expires in 11 months and the brand has issued a formal Property Improvement Plan (PIP) requiring $12M in renovations ($60k/key) to renew for 15 years. The OM projects $8M in value creation from the renovation, citing a 200 bps RevPAR Index improvement post-renovation at comparable flag-renewal assets. The seller is asking you to close with the flag expiration unresolved and absorb the PIP post-close.",
  data: [
    { label: 'Purchase price', value: '$42M' },
    { label: 'PIP cost', value: '$12M ($60k/key)' },
    { label: "Seller's claimed value creation", value: '$8M (200 bps RevPAR Index uplift)' },
    { label: 'Flag term', value: 'Expires in 11 months; 15-yr renewal contingent on PIP' },
    { label: 'Brand', value: 'National flag (not soft brand)' },
  ],
  question: 'How do you treat the PIP in your underwriting and what deal-process risk should you flag?',
  options: [
    {
      label:
        "Model all-in basis as $42M + $12M = $54M ($270k/key). Apply the RevPAR Index uplift conservatively at 100–150 bps (not the 200 bps seller scenario) and stress-test the renovation timeline: 6-month displacement, 12-month ramp-back. Flag deal-process risk: closing without flag resolution means you're taking flag-expiration risk — if the brand refuses renewal post-close (due to non-PIP conditions), you own an unflagged asset. Require seller to resolve flag status before close or price the deal as if the flag doesn't exist.",
      isBest: true,
      explanation:
        "Hotel PIP underwriting has two distinct components: (1) the capital math — all-in cost, not just purchase price, is what drives return metrics; and (2) the flag-status risk, which is deal-process, not financial. On the capital math: $54M all-in / ($42M NOI ÷ going-in cap rate) shows whether the deal pencils on a forward basis. On the RevPAR uplift: seller scenarios almost always present the high case; institutional buyers haircut to 50–75% of the cited comparable data. On deal-process risk: a full-service hotel trading at 7–8% cap without its flag is worth 25–30% less — the flag is not just brand recognition, it's distribution (reservation system), loyalty program access, and lender confidence. Closing without flag resolution is an underwriting mistake, not a negotiation tactic.",
    },
    {
      label:
        "Underwrite the $8M value creation at face value — the brand has already issued the PIP, so the renewal is essentially guaranteed once complete.",
      isBest: false,
      explanation:
        "A PIP being issued is not the same as a renewal being guaranteed. Brands can reject renewals for reasons beyond PIP completion: market penetration (too many flags in the submarket), ownership/management changes post-close, or structural issues discovered during the PIP inspection. Additionally, $8M of value creation assumes the RevPAR Index improvement materializes and cap rates stay flat — neither is guaranteed. Underwriting the full seller scenario is the buyer's fastest path to overpaying.",
    },
    {
      label:
        "Exclude the PIP from underwriting — it's a seller obligation that should be resolved pre-close, not a buyer cost.",
      isBest: false,
      explanation:
        "Sellers rarely absorb PIPs in hotel transactions — it's standard practice to pass the PIP obligation to the buyer and price it into the purchase price (or not). Assuming the PIP is 'someone else's problem' and ignoring it in your all-in basis means you're underwriting at $42M when the true cost is $54M. Whether the seller provides a credit, escrow, or price reduction, your underwriting must account for $12M of capital going out the door within 11 months.",
    },
    {
      label:
        "Close immediately to lock in the flag before it expires, then negotiate the PIP scope down with the brand post-close.",
      isBest: false,
      explanation:
        "Closing to 'beat the flag expiration' is the wrong logic. Once you close, you've assumed all risk — you can't retroactively negotiate the PIP scope, and brands rarely reduce PIP requirements post-close since they have more leverage once you're in the relationship. The correct sequence is to use the flag expiration as leverage in pre-close negotiations: either seller resolves the flag, brand provides a PIP credit/timeline extension, or price is reduced to reflect the unflagged risk.",
    },
  ],
  takeaway:
    "Hotel PIP underwriting requires two frameworks running in parallel: the all-in capital analysis (purchase price + PIP + renovation carry) and the flag-status risk analysis (what's the asset worth if the flag doesn't renew?). Never underwrite a hotel assuming the flag will automatically renew — brand agreements are bilateral, and the PIP completion is a necessary-but-not-sufficient condition. Always resolve flag status pre-close or price the deal at unflagged value.",
  tips: [
    'All-in cost = purchase price + PIP + renovation carry (lost NOI during closure × months).',
    'National flag hotels at a 25–35% RevPAR premium vs soft brands in the same submarket — losing the flag matters.',
    'Require the brand to issue a comfort letter or conditional-renewal agreement as a pre-close condition.',
  ],
};
