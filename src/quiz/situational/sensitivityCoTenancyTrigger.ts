import type { SituationalCase } from '../../types/situational';

export const sensitivityCoTenancyTrigger: SituationalCase = {
  id: 'sensitivity-co-tenancy-trigger',
  title: "The anchor dark-stores 40% of its space — does co-tenancy trigger?",
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "You own a 120,000 SF neighborhood retail center. The anchor is a 45,000 SF grocery paying $14/SF NNN ($630k/yr). Six in-line tenants occupy 40,000 SF at an average of $26/SF NNN ($1,040k/yr). Every in-line lease contains the same co-tenancy clause: 'If the anchor occupies less than 80% of its demised premises, tenant's base rent shall reduce to $16/SF until anchor full occupancy is restored, with a 90-day landlord cure period before the rent reduction takes effect.' The anchor just notified you it is dark-storing its deli, bakery, and floral sections, reducing its actively operated space from 45,000 SF to 26,000 SF. The anchor continues to pay full rent on all 45,000 SF.",
  data: [
    { label: 'Total SF', value: '120,000 SF' },
    { label: 'Anchor', value: '45,000 SF at $14/SF NNN = $630k/yr' },
    { label: 'In-line tenants', value: '40,000 SF at avg $26/SF NNN = $1,040k/yr' },
    { label: 'Co-tenancy threshold', value: 'Anchor must actively occupy ≥80% of demised SF' },
    { label: 'Co-tenancy reduction', value: '$26/SF → $16/SF for in-line tenants' },
    { label: 'Anchor dark-store SF', value: '19,000 SF dark (26,000 SF active / 45,000 SF total = 58%)' },
    { label: 'Center T-12 NOI', value: '~$1.5M' },
    { label: 'Acquisition cap rate', value: '6.5%' },
  ],
  question:
    "Does the co-tenancy clause trigger, and what is the maximum annual NOI impact if all six in-line tenants exercise their rent reduction?",
  options: [
    {
      label:
        "Yes, the clause triggers: the anchor is actively occupying 26,000 / 45,000 SF = 58% of its demised premises, below the 80% threshold. After the 90-day cure period, if all six in-line tenants exercise, rent drops from $26/SF to $16/SF on 40,000 SF — a $10/SF reduction worth $400k/yr of NOI. At a 6.5% cap that's ~$6.15M of value destruction. The anchor paying full rent is irrelevant to whether the clause triggers — the threshold is based on physical occupancy, not rental payment.",
      isBest: true,
      explanation:
        "The math is binary: 58% < 80% → clause triggers. The economic impact: in-line rent drops from $1,040k to $640k (40,000 × $16), a $400k annual reduction. Capitalized at 6.5%: $400k / 6.5% = $6.15M of value at risk. Key nuance: the anchor paying full rent does not satisfy the co-tenancy clause, which is written in terms of physical occupancy ('occupies'). The 90-day cure period gives the landlord time to compel the anchor to restore operations or source a temporary tenant — but if cure fails, the in-line rent reductions activate.",
    },
    {
      label:
        "The clause does not trigger because the anchor is still paying full rent on all 45,000 SF — 'occupies' in a lease context means 'has possession of and pays rent for,' not 'actively operates in.'",
      isBest: false,
      explanation:
        "Most co-tenancy clauses drafted after 2010 specifically define 'occupies' as 'open for business and actively operating' — precisely to prevent dark-store tactics. Tenants and their counsel included this language after early dark-store disputes. Without reading the specific lease language, this is a legal interpretation question; but the scenario states the anchor is 'dark-storing,' which is the fact pattern designed to trigger occupancy-based (not rent-based) co-tenancy clauses.",
    },
    {
      label:
        "Only the tenants physically adjacent to the dark-store areas can exercise the co-tenancy reduction.",
      isBest: false,
      explanation:
        "Co-tenancy clauses are center-wide, not location-specific. In-line tenants lease the anchor's presence for its traffic-generating effect on the whole center — not just the adjacent zones. The clause language says nothing about adjacency; it references the anchor's demised premises as a whole.",
    },
    {
      label:
        "Co-tenancy clauses are rarely enforced — most landlords and tenants reach informal agreements before formal rent reductions activate. Model it as a footnote risk, not a base-case NOI impact.",
      isBest: false,
      explanation:
        "Dark-store litigation and co-tenancy enforcement have increased sharply since 2018 as traditional retailers have dark-stored more locations. Treating it as a footnote ignores real legal exposure. The 90-day cure period is the landlord's practical window to avoid the reduction; if cure fails, the reductions are contractual and enforceable. Underwrite the downside, note the cure option, and price the deal accordingly.",
    },
  ],
  takeaway:
    "Co-tenancy clauses create a binary NOI risk: either the anchor's occupancy threshold is met or all in-line tenants get a contractual rent reduction. The trigger test is physical occupancy percentage, not rent payment. Dark-storing — keeping possession but ceasing active operations — is the classic trigger event. Always run the co-tenancy scenario as a base-case sensitivity in retail underwriting, not an asterisk.",
  tips: [
    "Dark-store threshold: most modern leases set the anchor occupancy floor at 75–85% of demised SF. Know your specific clause.",
    "Value at risk = in-line rent reduction × in-line SF / cap rate. On a $26→$16 cut across 40k SF: $400k / cap rate.",
    "The 90-day cure period is your negotiating window — notify the anchor in writing on day 1, document every communication.",
  ],
};
