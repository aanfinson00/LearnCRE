import type { LongformCase } from '../../types/longform';

export const sellVs1031Memo: LongformCase = {
  id: 'sell-vs-1031-memo',
  title: 'Write the decision memo: sell now for cash vs. 1031 exchange',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    "You are advising a family partnership on the disposition of a $22M, 150-unit Class B multifamily asset held for 14 years. Adjusted basis after depreciation: $6M. Cumulative depreciation taken: $5M. Estimated tax on cash sale: ~$4.5M (blended federal + state recapture and LTCG). Two paths: (A) cash sale at $22M — net ~$17.5M distributed to partners; (B) 1031 exchange into a $25M Class A MF deal in an adjacent submarket, requiring an additional $1.8M of partner equity. One LP (30% ownership) is 78 years old with estate-planning intent; the remaining partners (70%) are active investors planning to redeploy. The partnership agreement permits a 1031 exchange with majority consent.",
  data: [
    { label: 'Sale price', value: '$22M' },
    { label: 'Adjusted basis', value: '$6M (14 yrs of straight-line depreciation)' },
    { label: 'Depreciation taken', value: '$5M' },
    { label: 'Estimated tax — cash sale', value: '~$4.5M (recapture + LTCG)' },
    { label: 'Net proceeds to partners (cash)', value: '~$17.5M' },
    { label: 'Replacement property', value: '$25M Class A MF; $1.8M additional partner equity' },
    { label: 'Elderly LP', value: '30% interest, 78 years old, estate step-up intent' },
    { label: 'Active LPs', value: '70% interest, want to reinvest' },
  ],
  question:
    'Write a 5–7 sentence decision memo recommending one path. Address the tax mechanics, the LP conflict, the replacement property execution risk, and what would change your recommendation.',
  modelAnswer: `We recommend pursuing the 1031 exchange subject to two conditions: first, the elderly LP (30%) is offered the option to cash out her interest at the $22M valuation prior to the exchange — either through an arms-length buyout by the remaining partners or a partial-interest sale — preserving her estate step-up intent without blocking the exchange for the majority; second, the replacement property underwrites to at least a 9% unlevered return on the marginal $1.8M capital call, demonstrating that the incremental equity is accretive. The deferral case for the active LPs is compelling: by deferring the $4.5M tax bill, that capital compounds inside the replacement asset rather than going to the IRS — at an 8% return over 5 years, the deferred $4.5M grows to approximately $6.6M, a $2.1M advantage over the cash-sale path. The primary exchange risk is execution: with 45 days to identify and 180 days to close, the replacement deal must be under LOI before or concurrent with the sale closing, and we should have a vetted backup property identified to protect against deal fallout. What would change this recommendation: if the replacement property falls through during the ID window with no backup, a forced cash-out at a compressed basis is preferable to a failed exchange that triggers the full $4.5M tax anyway; or if the elderly LP refuses the buyout structure and insists on her $6.6M share of clean cash proceeds, the partnership conflict cannot be resolved without her consent and the cash sale becomes the cleaner path. We recommend structuring the LP buyout now, before the exchange is initiated, while everyone is aligned on the sale price.`,
  rubric: [
    {
      id: 'lp-conflict-resolution',
      dimension: 'Identifies the LP conflict (elderly LP estate vs. active investors) and proposes a structural resolution',
      weight: 2,
    },
    {
      id: 'tax-deferral-quantified',
      dimension: 'Quantifies the tax-deferral benefit — names the $4.5M and either runs time-value math or states the compounding advantage',
      weight: 2,
    },
    {
      id: 'execution-risk-named',
      dimension: 'Names the 45-day ID window and replacement-property execution as the primary exchange risk',
      weight: 1.5,
    },
    {
      id: 'recommendation-with-conditions',
      dimension: 'States a clear recommendation with named conditions — not a list of pros and cons',
      weight: 1.5,
    },
    {
      id: 'flip-conditions',
      dimension: 'Articulates specific conditions that would flip the recommendation (deal fallout, LP veto)',
      weight: 1,
    },
  ],
  takeaway:
    'In a multi-LP 1031 decision, individual LP tax positions often matter more than the aggregate deal math. Here, an elderly LP with step-up-in-basis intent may benefit more from cashing out and holding assets to death than from deferring gain into a new exchange. The active LPs benefit from deferral. Structuring around the conflict — buying out the dissenting LP pre-exchange — is often cleaner than forcing a unanimous decision that one party is economically indifferent to or opposed to.',
  tips: [
    'In a multi-LP context, always ask: does every LP benefit from exchange deferral? If not, structure around the exception before the vote.',
    '1031 time-value math: the return you earn on the deferred tax over the hold period is the economic benefit. At 8% for 5 years, $4.5M becomes $6.6M.',
    'The ID window failure risk is underrated. Have a backup property identified before the sale closes — not after.',
  ],
};
