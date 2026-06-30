import type { SituationalCase } from '../../types/situational';

export const retailAnchorDarkening: SituationalCase = {
  id: 'retail-anchor-darkening',
  title: 'Retail: the anchor goes dark — what triggers in the small-shop leases?',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You own a 180,000 SF community retail center. The 60,000 SF grocery anchor (33% of GLA) has 4 years remaining on its lease but just announced it will go dark — closing the store while continuing to pay rent under its lease (not a bankruptcy). Your small-shop leases total 120,000 SF across 24 tenants at an average $22/SF base rent. You need to understand the financial impact before the next IC meeting.",
  data: [
    { label: 'Anchor (grocery)', value: '60,000 SF · 4 yrs remaining · going dark (paying rent)' },
    { label: 'Small shops', value: '24 tenants · 120,000 SF · avg $22/SF base rent' },
    { label: 'Total GLA', value: '180,000 SF' },
    { label: "Anchor's in-place rent", value: '$8/SF ($480k/yr)' },
    { label: 'Anchor rent as % of total NOI', value: '~18%' },
  ],
  question:
    'The anchor is paying rent — is this actually a problem? What should you immediately review in the small-shop leases?',
  options: [
    {
      label:
        "Yes, this is a significant problem even though rent is being paid. Immediately review all small-shop leases for co-tenancy clauses: if the anchor going dark triggers a co-tenancy breach, small-shop tenants may have the right to (a) reduce rent to a percentage-of-sales floor (typically 2–4% of annual sales) or (b) terminate early after a cure period. If 30–40% of your small shops have broad co-tenancy language, the income at risk could exceed the anchor rent many times over.",
      isBest: true,
      explanation:
        "An anchor going dark while paying rent is deceptive security. The anchor's $480k/yr is intact. But co-tenancy clauses in small-shop leases — which typically give tenants relief when a named or sized anchor isn't operating — can reduce base rents to percentage-of-sales floors or trigger termination rights. On 120k SF at $22/SF, the small-shop rent roll is $2.64M/yr. If 35% of tenants (8–9 shops) invoke co-tenancy and drop to 3% of sales (say $500k in annual sales per tenant = $15k/yr vs $22/SF × avg 2,500 SF = $55k), you've lost $320k+ of rent — and if 3 tenants terminate, you lose another $165k. The total risk can easily be $500k–$1M+/yr, dwarfing the anchor income. Review the lease abstract for: (1) named vs. 'operating grocery anchor' co-tenancy definitions, (2) cure period before rights activate, (3) form of remedy (rent reduction vs. termination right vs. both).",
    },
    {
      label:
        "No — the anchor is paying rent, so the financial impact is neutral. Small-shop tenants don't have visibility into who else is paying rent.",
      isBest: false,
      explanation:
        "Co-tenancy clauses are triggered by an anchor not *operating*, not by rent payment status. The small-shop tenants can see the anchor is dark (the lights are off). Whether the anchor continues to pay rent is irrelevant to co-tenancy enforcement — the legal trigger is the cessation of operations, typically defined as 'open for business to the general public for a minimum of X hours per week.'",
    },
    {
      label:
        "The main risk is losing the anchor's rent in 4 years when the lease expires — the near-term problem is limited.",
      isBest: false,
      explanation:
        "The 4-year lease maturity is a known future event, not the immediate crisis. The immediate crisis is co-tenancy exposure: the small-shop rights activate now that the anchor is dark, not in 4 years. If co-tenancy leases allow termination after a 60–90 day cure period, you could be losing small-shop tenants within 6 months. The timing risk is today, not at lease maturity.",
    },
    {
      label:
        "Replace the anchor immediately — offer rent-free to a new grocery operator to restore co-tenancy compliance.",
      isBest: false,
      explanation:
        "Backfilling a 60,000 SF grocery anchor in 30 days is not possible, and offering rent-free to a grocery chain is a significant concession that may not be market-clearing anyway. This is a medium-term solution (12–24 months minimum). The immediate priority is reviewing co-tenancy exposure so you understand the true downside before committing to a replacement strategy or communicating to your IC.",
    },
  ],
  takeaway:
    "An anchor going dark while paying rent is one of the most counterintuitive retail crises: it looks financially neutral but exposes the entire small-shop rent roll through co-tenancy clauses. Every retail acquisition and ownership decision requires a co-tenancy audit: which leases have clauses, what triggers them (named anchor vs. operating threshold), what the remedy is (rent reduction vs. termination), and what the cure period is. A grocery anchor going dark can trigger 3–4x the financial impact of the anchor rent itself.",
  tips: [
    "Co-tenancy triggers are almost always operational ('open for business'), not financial (paying rent).",
    'Cure period before remedy activates typically ranges from 60–180 days — you may have a window to backfill.',
    'Model three co-tenancy scenarios: no impact (all leases lack clauses), partial impact (30% of shops invoke), full impact (all shops with clauses invoke).',
  ],
};
