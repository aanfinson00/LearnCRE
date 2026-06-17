import type { SituationalCase } from '../../types/situational';

export const absorptionNegativeNetVsDemand: SituationalCase = {
  id: 'absorption-negative-net-vs-demand',
  title: 'Negative net absorption but positive gross demand — what\'s happening?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A quarterly market report for a CBD office submarket shows gross leasing activity of 420K SF (new leases and renewals signed). Yet the same report shows negative net absorption of -180K SF for the quarter. The vacancy rate ticked up from 14.5% to 15.8% quarter-over-quarter. You\'re trying to decide whether the market is deteriorating or just in a transition period.',
  data: [
    { label: 'Gross leasing activity', value: '420K SF (new + renewal)' },
    { label: 'Net absorption', value: '-180K SF' },
    { label: 'Vacancy (start of quarter)', value: '14.5%' },
    { label: 'Vacancy (end of quarter)', value: '15.8%' },
    { label: 'Net change in vacant SF', value: '+600K SF' },
  ],
  question:
    'How do you reconcile positive gross leasing with negative net absorption, and what does it signal?',
  options: [
    {
      label:
        'Tenants signing new or renewal leases vacated more space than they took. This happens when tenants downsize at renewal (sign 30K SF but give back 50K SF) or when move-outs and lease expirations outpace new occupancy. Negative net absorption means the market is losing occupied SF in aggregate — space is being physically vacated faster than it\'s being filled, regardless of leasing velocity.',
      isBest: true,
      explanation:
        "Net absorption = change in occupied SF = new move-ins minus move-outs. Gross leasing counts all *signings*, not *occupancies*. A tenant who signs today for space they won't occupy until next quarter doesn\'t show up in net absorption until they physically move in. Conversely, a tenant who signed a renewal but gave back two floors generates positive gross leasing activity AND negative net absorption simultaneously. The 420K SF of gross activity and -180K SF of net absorption are reconcilable: tenants signed, but existing tenants shed more space than the new signings occupied. This is a WARN sign — the market is contracting in physical terms even as brokers are signing deals.",
    },
    {
      label:
        'The data must be wrong — positive gross leasing and negative net absorption cannot coexist in the same quarter.',
      isBest: false,
      explanation:
        "They can and do coexist regularly — especially in markets with high renewal activity and downsizing. Gross leasing counts signing events; net absorption counts physical occupancy changes. A tenant renewing for 40% less space contributes positively to gross (a lease was signed) and negatively to net (60% of their old footprint vacates). Treating contradictory-seeming stats as an error misses an important market reading.",
    },
    {
      label:
        'Positive gross leasing signals demand recovery; ignore the net absorption — it\'s a lagging indicator driven by prior-quarter move-outs.',
      isBest: false,
      explanation:
        "Net absorption is *not* a lagging indicator in the same way vacancy is — it measures what physically happened to occupancy in the current quarter, not what happened to prices last year. Gross leasing is a *leading* indicator (what was signed), while net absorption is a *concurrent* measure (what occupancy actually did). Dismissing negative net absorption in favor of gross leasing activity is optimism bias — the exact trap aggressive underwriting falls into.",
    },
    {
      label:
        'The +600K SF increase in vacant SF means new deliveries hit the market — the gross leasing is absorbing the new supply, so the trend is healthy.',
      isBest: false,
      explanation:
        "New deliveries would show up as inventory expansion. If the vacancy rate went from 14.5% to 15.8% *without* total inventory growing, it means existing space is being vacated, not that new supply hit the market. You can back-check: if inventory was flat, the increase in vacant SF must come from net move-outs in the existing stock. Always verify whether vacancy changes are inventory-driven (supply) or occupancy-driven (demand) before drawing conclusions.",
    },
  ],
  takeaway:
    "Gross leasing activity (signings) and net absorption (occupancy change) measure different things. Positive gross leasing with negative net absorption is a warning sign of tenant contraction — companies are renewing for less space or vacating faster than new leases mature into occupancy. Underwriters who anchor on gross velocity and ignore net absorption systematically underestimate vacancy risk. Always look at both, and ask: are the deals adding or shedding SF?",
  tips: [
    'Net absorption = Σ(move-ins) − Σ(move-outs); gross leasing = total SF signed, regardless of move-in timing.',
    'Consecutive quarters of negative net absorption signal structural demand loss, not just timing lag.',
    'Track the ratio of renewal-to-new: high renewals + negative net absorption = tenants shrinking in place.',
  ],
};
