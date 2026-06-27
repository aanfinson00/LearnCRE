import type { SituationalCase } from '../../types/situational';

export const retailAnchorDark: SituationalCase = {
  id: 'retail-anchor-dark',
  title: 'Retail: the anchor tenant just announced it\'s going dark — what happens to your NOI?',
  category: 'risk',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'retail',
  scenario:
    "You own a 320,000 SF power center anchored by a 90,000 SF sporting goods retailer paying $12/SF NNN with 5 years remaining on the lease. The anchor just announced a Chapter 11 restructuring and plans to vacate within 90 days (while remaining on the hook for rent through the lease term under bankruptcy law, assuming it assumes the lease). Four inline tenants — accounting for 45,000 SF and $18.50/SF average rent — each have co-tenancy clauses tied to 'anchor occupancy above 80,000 SF.' If triggered, each inline tenant may reduce rent to a percentage-of-sales rate until a replacement anchor is open.",
  data: [
    { label: 'Total center SF', value: '320,000 SF' },
    { label: 'Anchor SF / rent', value: '90,000 SF at $12/SF NNN' },
    { label: 'Anchor lease remaining', value: '5 years' },
    { label: 'Anchor status', value: 'Ch. 11 filing, 90-day vacate notice' },
    { label: 'Co-tenancy trigger', value: 'Anchor occupancy < 80,000 SF' },
    { label: 'Inline tenants affected', value: '4 tenants, 45,000 SF at $18.50/SF avg' },
    { label: 'Percentage-of-sales fallback rate', value: '4% of gross sales (per clause)' },
  ],
  question:
    "Walk through the NOI impact and identify the two most important decisions you face in the next 90 days.",
  options: [
    {
      label:
        "Two separate NOI risks are now running simultaneously. First, the anchor rent stream: in Ch. 11 the retailer has 60 days to assume or reject unexpired leases (11 U.S.C. §365). If assumed, the $12/SF continues for 5 years ($1.08M/yr); if rejected, the lease terminates and rent falls to zero immediately — and you get an unsecured rejection-damage claim worth ~6% of the landlord's recovery in practice. Second, the co-tenancy trigger: the moment the anchor SF falls below 80,000 SF (vacating 90,000 SF triggers it), four inline tenants can collectively drop from $18.50 to a percentage-of-sales rate — likely reducing their rent by 60-75% until you replace the anchor. The two decisions: (1) engage Ch. 11 counsel immediately to monitor the assumption/rejection timeline and negotiate any lease modification; (2) begin anchor replacement search now, because each month without a replacement anchor continues the co-tenancy drag on four income streams.",
      isBest: true,
      explanation:
        "Right framing. The bankruptcy lease-assumption timeline is the most time-sensitive issue — missing the 120-day assumption window (or court-extended deadline) results in deemed rejection. Monitoring this and having counsel present at any §365 hearing is critical. Simultaneously, the co-tenancy trigger is structural: it fires immediately on vacancy, not on lease termination — so even if the anchor is still paying rent while dark, the co-tenancy clock is running. Aggressive landlords begin anchor negotiations with replacement candidates before the existing anchor vacates; every month of delay compounds the co-tenancy drag.",
    },
    {
      label:
        "The anchor is still legally obligated under the lease for 5 years — focus on collecting rent and don't worry about replacement until the lease terminates.",
      isBest: false,
      explanation:
        "Ignores two structural problems. First, bankruptcy §365 gives the debtor the right to reject unexpired leases — the contractual obligation doesn't survive rejection; you get a damages claim treated as a general unsecured creditor (typically 1-15 cents on the dollar). Second, the co-tenancy clause fires on *occupancy* below 80,000 SF, not on lease termination — even if rent is being paid, a dark (physically vacant) anchor may trigger the clause depending on the lease definition. 'Occupancy' clauses differ from 'lease in place' clauses.",
    },
    {
      label:
        "Wait for the bankruptcy process to play out before taking action — any replacement anchor discussions now would be premature and could confuse the situation.",
      isBest: false,
      explanation:
        "Waiting is expensive. The co-tenancy trigger fires now (on vacancy), and replacement anchor negotiations typically take 12-24 months to close. Starting the replacement search 12 months later means 12 additional months of co-tenancy drag on four income streams. Aggressive landlords run dual-track: monitor the bankruptcy process AND begin replacement negotiations simultaneously. The two tracks don't conflict.",
    },
    {
      label:
        "Trigger the lease termination clause and buy out the anchor's remaining lease at a discounted lump sum to clear the space faster for a replacement tenant.",
      isBest: false,
      explanation:
        "That's backwards — the landlord doesn't hold a termination right here; the anchor (as debtor-in-possession) does. In Ch. 11, the debtor can reject leases; the landlord cannot unilaterally terminate them. A lease buyout is a negotiated deal only if the debtor-in-possession agrees (typically for a cash payment to 'cure' and walk away). This can work, but it requires DIP consent and typically means paying, not receiving, a lump sum.",
    },
  ],
  takeaway:
    "An anchor going dark in a co-tenancy center creates two simultaneous risk threads: the bankruptcy lease-assumption/rejection timeline (governed by 11 U.S.C. §365) and the co-tenancy trigger (governed by individual lease language). Co-tenancy clauses fire on *occupancy*, not *lease status* — so dark (vacant) anchor space can trigger inline rent relief even while the anchor is paying rent. The two immediate priorities: bankruptcy counsel to monitor §365 deadlines, and replacement anchor search before the existing anchor physically vacates.",
  tips: [
    "Ch. 11 §365: debtor has 60 days (extensible) to assume or reject unexpired leases. Assumption requires curing all defaults; rejection terminates the lease and gives landlord an unsecured claim.",
    "Co-tenancy clause types: 'anchor open for business' (triggers on dark, even if rent paid) vs. 'anchor lease in place' (doesn't trigger until lease terminates). Know which one you have.",
    "Replacement anchor timelines: grocery 18-24 months from LOI to open, fitness/entertainment 12-18 months, discount department store 24-36 months.",
  ],
};
