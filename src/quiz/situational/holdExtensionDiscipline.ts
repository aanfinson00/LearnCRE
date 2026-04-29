import type { SituationalCase } from '../../types/situational';

export const holdExtensionDiscipline: SituationalCase = {
  id: 'hold-extension-discipline',
  title: 'The sponsor wants to extend "to capture more growth"',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['assetManagement', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    'You\'re the LP IC member on a Class-B multifamily deal that\'s 5 years into a 5-year hold. The sponsor proposes extending 2 more years "to capture additional rent growth from the renovation completed last year." Original-hold IRR is 14% to LPs. The sponsor projects 16% if the extension goes well. The fund\'s required return on redeployed capital today is also 14%.',
  data: [
    { label: 'Original-hold LP IRR', value: '14%' },
    { label: 'Extended-hold projected', value: '16%' },
    { label: 'Extension', value: '2 years' },
    { label: 'Fund alt-deployment hurdle', value: '14%' },
    { label: 'Story', value: 'Reno already done; sponsor sees more room' },
  ],
  question: 'How should the IC respond?',
  options: [
    {
      label:
        'Reject the extension — the marginal *extension* IRR (not the blended) is what matters, and the sponsor needs to defend that the *next 2 years* clear the hurdle, not the overall return. Compute the extension IRR explicitly.',
      isBest: true,
      explanation:
        'Blended IRR (14% → 16%) is the wrong frame. The extension is a new investment decision: today\'s asset value is the entry, NOI + exit-2-years-out is the cash flow. If those flows produce <14% on the *extension* alone, the LP is better off taking the cash today and redeploying. A blended improvement from 14% to 16% can mask an extension IRR well below the hurdle. Discipline is to size the extension as a standalone decision.',
    },
    {
      label: 'Accept — 16% > 14%, the blended return is better.',
      isBest: false,
      explanation:
        'Compares apples to oranges. The 14% blended IRR is realized through the original hold; the 16% is the projected blended IRR if the 2-year extension goes perfectly. The right comparison is between (a) take cash now + redeploy at 14%, or (b) keep capital deployed in this asset for 2 more years. Whichever has higher *forward* IRR wins — and that\'s the extension IRR, not the blended.',
    },
    {
      label: 'Accept — but require the sponsor to share more of the upside via promote.',
      isBest: false,
      explanation:
        'Renegotiating the waterfall doesn\'t answer the underlying question of whether the extension itself pencils. If the extension IRR is below the LP hurdle, more promote to the GP doesn\'t fix the LP\'s problem. Address the math first, the structure second.',
    },
    {
      label: 'Reject — but only because the sponsor extended their last deal and missed the projection.',
      isBest: false,
      explanation:
        'Pattern-matching is informative but not a sufficient reason. Each extension stands on its own underwriting. Bring the math: is the extension IRR ≥ alt-deployment hurdle? If yes, accept; if no, reject. Past sponsor performance informs your view of the projection but doesn\'t replace the IRR test.',
    },
  ],
  takeaway:
    'Hold-extension decisions are forward-IRR decisions. Compute the extension IRR (today\'s value as entry, NOI + future exit as cash flows) and compare to your alternative deployment. A blended IRR going from 14% to 16% sounds good, but if the *extension* alone returns 8%, you\'re using LP capital to earn less than you could elsewhere. Discipline beats narrative.',
  tips: [
    'Extension IRR ≠ blended IRR. Compute them separately.',
    'Today\'s value is the new entry; everything before is sunk.',
    'Sponsors framing extensions in blended terms are usually hiding a weak forward IRR.',
  ],
};
