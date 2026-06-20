import type { SituationalCase } from '../../types/situational';

export const absorptionAnchorVacancy: SituationalCase = {
  id: 'absorption-anchor-vacancy',
  title: 'The anchor left — how long until the inline tenants re-absorb?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    'A community retail center lost its 40,000 SF anchor (grocery) 8 months ago. Inline vacancy jumped from 5% to 22% as co-tenancy clauses permitted rent relief for 12 tenants. You are evaluating whether to acquire the center at a distressed basis. The center has 180,000 SF of total GLA. Broker-supplied comps show anchor re-leasing in this submarket has taken 18–30 months; once a new anchor opens, inline absorption has historically returned to market pace (roughly 3,000–4,000 SF/quarter).',
  data: [
    { label: 'Total GLA', value: '180,000 SF' },
    { label: 'Anchor vacancy', value: '40,000 SF (22% of GLA)' },
    { label: 'Inline vacancy (post co-tenancy)', value: '~32,000 SF additional' },
    { label: 'Anchor re-leasing timeline (comps)', value: '18–30 months from vacancy' },
    { label: 'Inline absorption pace (post-anchor)', value: '3,000–4,000 SF/quarter' },
    { label: 'Time since anchor departure', value: '8 months' },
  ],
  question: 'How do you model the path to stabilization?',
  options: [
    {
      label:
        'Stabilization is two-phased and sequenced: first, anchor re-leasing (10–22 months remaining); then inline recovery begins. Model anchor re-lease at month 18 (base case), inline absorption at 3,500 SF/quarter after anchor opens — full stabilization in ~36–40 months from today.',
      isBest: true,
      explanation:
        'Inline absorption in a co-tenancy structure is functionally gated on the anchor. The 32,000 SF of incremental inline vacancy won\'t re-absorb until tenants regain confidence (i.e., anchor opens). Using an anchor timeline of month 18 (base case midpoint of 18–30 range) and 3,500 SF/quarter absorption post-open, you clear ~28,000 SF of inline vacancy in 2 years. Add the 8 months already elapsed — you\'re looking at 36–40 months total from today to stabilization. This is the defensible modeling framework; sensitivity around anchor re-lease timing drives the range.',
    },
    {
      label:
        'Apply a market-average absorption pace immediately — the anchor lease-up takes care of itself in parallel.',
      isBest: false,
      explanation:
        'Co-tenancy clauses mean inline absorption and anchor re-leasing are interdependent, not parallel. If tenants can reduce rent or terminate under co-tenancy provisions, they are unlikely to re-sign or backfill while the anchor remains dark. Running both simultaneously in the model understates the lease-up risk.',
    },
    {
      label:
        'It is impossible to model — anchor re-leasing is binary (they find one or they don\'t). Underwrite a stabilized value and discount heavily.',
      isBest: false,
      explanation:
        'Not meaningless — comp data on anchor re-leasing timelines gives you a distribution to work with. The right approach is a base/downside two-scenario model with the anchor timeline as the key variable. "Can\'t model it" understates your ability to structure a disciplined range.',
    },
    {
      label:
        'Buy at a yield on stabilized NOI and assume 12 months to stabilization — the anchor was a grocery, high replacement demand.',
      isBest: false,
      explanation:
        'Grocery replacement demand has contracted significantly post-pandemic; format and square footage are constrained variables. A blanket 12-month assumption ignores the broker comp data showing 18–30 months. Underwriting the fastest outcome without supporting data is the error pattern distressed sellers rely on.',
    },
  ],
  takeaway:
    'Retail absorption in co-tenancy situations is sequenced, not concurrent. The anchor drives the timeline; inline absorption doesn\'t normalize until the anchor re-opens. Model the two phases explicitly, use market comp data for anchor re-lease timing, and size your return to compensate for the elongated carry period.',
  tips: [
    'Co-tenancy clauses trigger rent relief or termination rights — always read them before modeling inline recovery.',
    'Anchor replacement timeline varies: grocery 12–24 mos, department store 24–48 mos, fitness/entertainment 18–30 mos.',
    'Inline absorption post-anchor opening typically outperforms the trailing pace for 2–4 quarters (pent-up demand).',
  ],
};
