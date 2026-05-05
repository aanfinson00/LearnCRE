import type { SituationalCase } from '../../types/situational';

export const lpaContributionRatios: SituationalCase = {
  id: 'lpa-contribution-ratios',
  title: 'Contribution ratios — when do Percentage Interests actually shift?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'acquisitions'],
  documentExcerpt: {
    docType: 'lpa',
    label: 'Section 4.6 — Adjustment of Percentage Interests',
    text: `(a) Default Position. Members\' Percentage Interests shall be
    determined as the ratio of each Member\'s aggregate Capital
    Contributions (Initial + Additional) to the aggregate Capital
    Contributions of all Members.

(b) Adjustment Events. Percentage Interests shall be recalculated
    upon: (i) any Capital Contribution required pursuant to Section
    4.2 (Additional Capital) or 4.3 (Cost Overruns); (ii) any
    Default Loan made pursuant to Section 4.5; (iii) any Buyout
    pursuant to Section 4.7.

(c) Sponsor Promote Carve-Out. Notwithstanding subsection (a), the
    Managing Member\'s Promote Interest (the right to receive
    distributions in excess of pro-rata in accordance with the
    Distribution Waterfall) shall not be diluted by any non-default
    Capital Contributions of other Members; provided, however, that
    in the event of a Member Default funded by Default Loan, the
    Defaulting Member\'s Promote Interest, if any, shall be subject
    to forfeiture in proportion to the Default Loan amount.

(d) Capital Account vs Percentage Interest. Capital Accounts track
    each Member\'s contributions and allocations of profit/loss for
    tax purposes; Percentage Interests govern voting and pro-rata
    distributions. Members acknowledge these may diverge over time.`,
  },
  scenario:
    'JV started 90/10 LP/GP at Initial Capital of $20M LP + $2M GP = $22M total. Mid-life, a $4M cost overrun was funded pro-rata; LP added $3.6M, GP added $0.4M. Six months later, an Additional Capital call of $3M was funded *only* by LP (GP couldn\'t fund). The non-defaulting LP made a Default Loan covering GP\'s $300k shortfall.',
  question:
    'After all three contribution events, what are the Members\' new Percentage Interests, and how does GP\'s Promote Interest change?',
  options: [
    {
      label:
        'Cumulative funded contributions: LP = $20M + $3.6M + $3M = $26.6M; GP = $2M + $0.4M = $2.4M. Percentage Interests post-non-default events = LP 91.7%, GP 8.3%. GP\'s Default Loan ($300k from LP) doesn\'t change the Percentage Interest immediately (since LP recovers via Default Loan repayment), but per (c), GP\'s Promote Interest is forfeited in proportion to the default. If the $300k Default Loan represents X% of GP\'s total contribution capacity, GP\'s Promote Interest is reduced by ~X%. Net: LP\'s economic interest is up modestly via Percentage Interest dilution; GP\'s is hit harder because the Promote Interest erodes faster than the Percentage Interest.',
      isBest: true,
      explanation:
        'Three things to track: (1) **Percentage Interests** shift via the contribution-ratio formula in (a), recalculated on each Adjustment Event. New ratios: LP = 26.6/29 = 91.7%; GP = 2.4/29 = 8.3% (down from 90/10). (2) **Promote Interest** under (c) is *separate* from Percentage Interest and is *not* automatically diluted by non-default contributions — that\'s the sponsor-friendly carve-out. So GP keeps their full Promote on the up-side waterfall *unless* there\'s a default. (3) The Default Loan triggers forfeiture per (c) proportional to the default. GP\'s missed $300k vs full GP capital of $2.4M is ~12.5%; GP\'s Promote Interest gets reduced ~12.5%. Critical insight: Promote Interest erosion via default forfeiture is often the *biggest* economic consequence of capital-call default — much more than the Percentage Interest dilution.',
    },
    {
      label:
        'Percentage Interests stay 90/10 because the Promote Interest carve-out in (c) protects GP from any dilution.',
      isBest: false,
      explanation:
        'Misreads (c). The carve-out only protects the Promote Interest from non-default dilution. Percentage Interests still recalculate via (a) on every Capital Contribution event.',
    },
    {
      label:
        'LP\'s Default Loan converts immediately to Capital Contribution and gives LP full Percentage Interest credit for the $300k.',
      isBest: false,
      explanation:
        'Default Loans are *loans*, not contributions. They earn interest at the Default Rate and get repaid out of the defaulting Member\'s distributions. They affect the Percentage Interest only if the LPA elects Forced Dilution as a remedy *separately* — Default Loan and Dilution are different remedies under the typical Section 4.5 menu.',
    },
    {
      label:
        'Capital Accounts and Percentage Interests are the same thing — both track contributions for distributions.',
      isBest: false,
      explanation:
        'Per (d), Capital Accounts track contributions + tax allocations (profits/losses); Percentage Interests govern voting + pro-rata distributions. They start aligned but diverge over time as profit/loss allocations and special tax adjustments happen. Don\'t conflate them.',
    },
  ],
  takeaway:
    'Three different "ratios" coexist in an LPA: (1) **Percentage Interests** track funding ratios for voting + pro-rata distributions; (2) **Capital Accounts** track contributions + tax allocations and diverge from Percentage Interests over time; (3) **Promote Interest** is the GP\'s incentive carve-out, separate from both, and protected from non-default dilution. Capital-call defaults hit Promote Interest harder than Percentage Interest because the LPA typically has explicit forfeiture mechanics for the Promote on default. Sponsors who default lose more than dilution suggests.',
  tips: [
    'Always track three numbers: Percentage Interest (governance + pro-rata), Capital Account (tax basis), Promote Interest (sponsor incentive). Don\'t conflate.',
    'Promote Interest carve-outs are sponsor-friendly defaults — they stop LPs from "stealing" the promote by funding a non-essential additional capital call.',
    'Default forfeiture on the Promote is the LP\'s strongest economic remedy. Cost-of-default for sponsors is often 5-10x the missed dollar amount when measured in lost Promote dollars over the deal life.',
    'Cross-check Percentage Interest against the operating agreement *and* the loan docs (some loans require notice on Member changes >X%).',
  ],
};
