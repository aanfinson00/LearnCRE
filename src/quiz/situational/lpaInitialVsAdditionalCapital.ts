import type { SituationalCase } from '../../types/situational';

export const lpaInitialVsAdditionalCapital: SituationalCase = {
  id: 'lpa-initial-vs-additional-capital',
  title: 'Initial vs Additional Capital — what\'s a partner actually obligated to fund?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'acquisitions'],
  documentExcerpt: {
    docType: 'lpa',
    label: 'Article IV — Capital Contributions',
    text: `4.1 Initial Capital Contributions. Each Member\'s "Initial Capital
    Contribution" is set forth on Schedule A and shall be funded in
    full at Closing. Failure to fund the Initial Capital Contribution
    when due shall be a Member Default subject to Section 4.5.

4.2 Additional Capital Contributions. The Manager may, from time to
    time and in its sole discretion, request Additional Capital
    Contributions from the Members in proportion to their Percentage
    Interests for: (a) operating shortfalls; (b) capital improvements
    contemplated by the Approved Business Plan; (c) protective
    advances to preserve the Property\'s value. Members shall not be
    obligated to fund Additional Capital Contributions exceeding, in
    the aggregate, fifty percent (50%) of the Initial Capital
    Contribution amount, unless approved by Supermajority Consent.

4.3 Cost Overrun Contributions. To the extent actual project costs
    exceed the Approved Budget by more than the Contingency Reserve,
    the resulting "Cost Overrun" shall be funded as follows: (i) the
    first $1,000,000 by the Managing Member only; (ii) thereafter,
    pro rata by all Members in accordance with Percentage Interests;
    provided that no Member shall be obligated to fund Cost Overrun
    Contributions exceeding 25% of the Initial Capital Contribution
    of such Member.`,
  },
  scenario:
    'You\'re an LP at a JV that funded $20M of Initial Capital ($18M LP, $2M GP). The deal has a $20M budget and $1M contingency. Construction is now 30% over budget — $6M of total overruns. The Manager is asking you to fund your share of the next capital request. The request mixes operating shortfall ($1M), value-preserving capex ($1.5M), and your share of cost overruns.',
  question:
    'Under the clauses above, what\'s your maximum mandatory funding obligation right now?',
  options: [
    {
      label:
        'You\'re obligated for ~$1M of overrun + ~$2.25M of additional capital. Cost overrun: GP funds the first $1M alone (4.3(i)); the remaining $5M is pro-rata, so your 90% share = $4.5M but capped at 25% of your Initial = $4.5M cap (90% × $5M / 25% × $18M = $4.5M cap). Additional capital is $2.5M total and pro-rata 90/10, so your share = $2.25M, but capped at 50% of your Initial = $9M cap. Combined: ~$6.75M obligation. Above that, the Manager needs Supermajority Consent for any further calls.',
      isBest: true,
      explanation:
        'The clauses create three separate funding buckets, each with its own cap: (1) **Initial Capital**: already funded, no further obligation. (2) **Additional Capital** (4.2): pro-rata, capped at 50% of Initial = $9M for LP, $1M for GP. Manager\'s ask of $2.5M total → LP\'s share is 90% × $2.5M = $2.25M, well within the 50% cap. (3) **Cost Overrun** (4.3): GP funds first $1M alone; remaining $5M pro-rata, capped at 25% of each Member\'s Initial = $4.5M LP / $0.5M GP. LP\'s pro-rata share of the remaining $5M = $4.5M, equal to the cap. Total LP obligation = $2.25M (additional) + $4.5M (overrun) = $6.75M. The 25% cost-overrun cap is the binding constraint; if overruns continue, GP will need Supermajority Consent for additional calls — and may face a default if the Property requires more capital than Members will fund.',
    },
    {
      label:
        'You owe your full pro-rata share of all $6M overrun + $2.5M additional capital = $7.65M. The clauses obligate you to fund whatever the Manager calls.',
      isBest: false,
      explanation:
        'Misses the 50%/25% caps entirely. The clauses are explicit that Members\' obligations are *capped* — Manager calls can be in larger amounts but Members can decline above the caps without default consequences.',
    },
    {
      label:
        'Nothing. The 50% / 25% caps mean you can refuse all capital calls if you want.',
      isBest: false,
      explanation:
        'Confuses cap with optionality. Members are *obligated* up to the cap and *optional* above. Refusing a properly-noticed call within the cap triggers Member Default + Section 4.5 remedies (typically dilution + interest penalty).',
    },
    {
      label:
        'GP must fund the entire $6M cost overrun alone — that\'s the point of putting the GP first in 4.3(i).',
      isBest: false,
      explanation:
        'Misreads 4.3. GP funds the *first* $1M alone; thereafter pro-rata. The "first $1M from GP" is a sponsor-skin-in-game tier, not unlimited GP exposure.',
    },
  ],
  takeaway:
    'Three funding tiers with three caps: Initial (mandatory at close); Additional Capital (capped at 50% of Initial, for ops + planned capex + protective advances); Cost Overrun (first slug on GP, then pro-rata, capped at 25% of Initial per Member). When overruns approach the cap, Manager faces a constrained menu: Supermajority Consent for more calls, refi/mezz to fill the gap, or sell the asset. Defaults trigger Member Default remedies — typically punitive dilution.',
  tips: [
    'LPA capital-call language has *separate* caps per bucket. Read each one.',
    'Cost-overrun caps are usually 25% of Initial; additional-capital caps are usually 50% of Initial. These are sponsor-friendly defaults; LPs negotiate higher cost-overrun caps when they have leverage.',
    'GP-first overrun tier is "skin in the game." Common sizes: first $1M, first $2M, or first 5-10% of budget.',
    'When members refuse capital calls beyond the cap, the deal usually goes to refi/mezz/sale — not failure. Plan exits before hitting the cap.',
    'Default remedies (Section 4.5) typically include forced dilution at a punitive valuation (e.g. 50% of book), interest accrual on unfunded amounts, and loss of voting rights. Read carefully.',
  ],
};
