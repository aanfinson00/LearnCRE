import type { SituationalCase } from '../../types/situational';

export const absorptionRetailCoTenancy: SituationalCase = {
  id: 'absorption-retail-co-tenancy',
  title: 'Anchor vacates — how long to restabilize?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    "A 275,000 SF community center's anchor tenant (75,000 SF, $8/SF NNN) has announced it will vacate at lease expiration in 6 months. The center has 15 inline tenants occupying 140,000 SF at $22/SF NNN average. Eight of those inline leases contain co-tenancy clauses triggered by anchor vacancy: they may reduce rent to 50% of base for up to 24 months if the anchor space is not re-tenanted. The remaining 60,000 SF is vacant. The submarket has limited demand for large-format retail boxes.",
  data: [
    { label: 'Total GLA', value: '275,000 SF' },
    { label: 'Anchor space (vacating)', value: '75,000 SF @ $8/SF NNN' },
    { label: 'Inline tenants', value: '140,000 SF @ $22/SF avg' },
    { label: 'Co-tenancy exposure', value: '8 of 15 tenants — 50% rent reduction for up to 24 mo' },
    { label: 'Existing vacancy', value: '60,000 SF' },
    { label: 'Submarket demand for large-format boxes', value: 'Limited' },
  ],
  question: "How do you underwrite the income impact and recovery timeline?",
  options: [
    {
      label: "Model the worst case immediately: anchor vacates at month 6, all 8 co-tenancy clauses activate, inline rent on those spaces drops 50% for up to 24 months. That's the downside floor. Recovery requires replacing the anchor within 24 months — otherwise co-tenancy cash payments become permanent rent reductions or lease terminations.",
      isBest: true,
      explanation:
        "Co-tenancy clauses create a binary cash flow event: if anchor is re-tenanted within the cure window (typically 12–24 months), full rents restore. If not, tenants either permanently reduce rent or exercise termination rights. The annual income impact of co-tenancy activation on 8 tenants at 50% haircut, assuming average 10,000 SF each at $22/SF, is roughly 80,000 SF × $11/SF = $880,000/yr of lost NOI — on top of the $600,000 in anchor rent. Total NOI at-risk: ~$1.5M/yr. Underwriting must show the full downside and the required anchor replacement timeline to avoid permanent damage.",
    },
    {
      label: "The inline tenants won't actually exercise their co-tenancy rights — most don't want the hassle, and the landlord can negotiate waivers.",
      isBest: false,
      explanation:
        "This is the wrong null hypothesis. Co-tenancy clauses are contractual rights that tenants exercise when it is economically rational to do so — and a 50% rent reduction is almost always worth claiming. Some tenants may waive in exchange for landlord concessions, but you can't underwrite to that outcome without negotiation leverage and certainty. Base case should be: clauses trigger; model the economics of a waiver negotiation separately.",
    },
    {
      label: "Focus on finding a replacement anchor quickly — once a new anchor signs, co-tenancy issues resolve themselves.",
      isBest: false,
      explanation:
        "True in principle, but \"finding a replacement anchor quickly\" in a submarket with limited demand for large-format boxes is the core risk, not a solution. The underwriting challenge is quantifying what happens if that anchor replacement takes 24, 36, or 48 months. The recovery-dependent answer only works if you also model the distressed scenario.",
    },
    {
      label: "The 60,000 SF of existing vacancy proves the center has absorption capacity — the anchor space will lease up similarly.",
      isBest: false,
      explanation:
        "The existing 60,000 SF vacant is unrelated to the 75,000 SF anchor box — and if anything, its existence suggests the center already has leasing challenges. Anchor spaces require a specific category of tenant (grocer, big-box, fitness) that can't easily lease smaller spaces, and vice versa. The existing vacancy compounds the problem; it doesn't demonstrate absorption capacity.",
    },
  ],
  takeaway:
    "Anchor vacancy in retail creates a compounding risk: direct income loss from the anchor rent plus co-tenancy-triggered reductions or terminations from inline tenants. The cure window (typically 12–24 months to re-tenant) is the critical underwriting variable. Model the full downside as the base case and size the recovery thesis around it, not the other way around.",
  tips: [
    'Read every co-tenancy clause: they differ by cure period, notice requirements, and remedy (rent reduction vs. termination right).',
    'Model NOI at anchor vacancy + full co-tenancy activation as the downside floor.',
    'Large-format box replacement demand varies dramatically by submarket — don\'t assume national sector trends apply locally.',
  ],
};
