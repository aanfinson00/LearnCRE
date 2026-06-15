import type { SituationalCase } from '../../types/situational';

export const officeSubmarketAbsorption: SituationalCase = {
  id: 'office-submarket-absorption',
  title: 'When does this over-supplied office submarket recover?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    "You're evaluating a value-add office acquisition in a CBD submarket currently sitting at 22% vacancy. Two large blocks are being returned to the market as tenants downsize post-pandemic. Net absorption for the submarket has been negative for 6 of the last 8 quarters, but has recently stabilized at roughly +50,000 SF/quarter. No new deliveries are expected. The building you're targeting has 200,000 SF of vacant space you need to lease to hit stabilization at 90% occupancy.",
  data: [
    { label: 'Submarket vacancy', value: '22%' },
    { label: 'Pending supply returns', value: '+300,000 SF' },
    { label: 'Submarket absorption', value: '+50,000 SF/quarter' },
    { label: 'New deliveries', value: 'None expected' },
    { label: 'Subject vacancy', value: '200,000 SF (target: 90% occ.)' },
  ],
  question:
    'How do you frame the absorption timeline risk, and what does that imply for underwriting?',
  options: [
    {
      label:
        "The +300k SF supply return adds ~6 additional quarters of absorption before the submarket tightens — you need to stress-test your lease-up timeline by 18+ months and underwrite a J-curve with extended carry before income stabilizes.",
      isBest: true,
      explanation:
        'The math: 300,000 SF ÷ 50,000 SF/quarter = 6 quarters of additional drag before absorption can work down existing vacancy. The submarket is not yet in recovery; it is absorbing new supply from downsizing tenants. Your subject building competes for the same demand pool. Conservative underwriting should stress the base lease-up timeline by at least 6 quarters (18 months), assume lower effective rents during lease-up (concessions competition), and model a J-curve on equity cash flows. If the deal only pencils at an aggressive lease-up assumption, it misprices the absorption risk.',
    },
    {
      label:
        'Since no new construction is coming, absorption should turn positive quickly — model stabilization in 12 months.',
      isBest: false,
      explanation:
        'Confuses "no new construction" with "no new supply." The 300k SF of subleases and direct space being returned IS new supply — it just comes from existing tenants downsizing rather than new buildings. The absence of construction starts is a positive signal on a 3–5 year view but does nothing to speed up near-term absorption of existing vacancy.',
    },
    {
      label:
        'Negative absorption for 6 quarters means the market is in structural decline — the deal should be passed regardless of price.',
      isBest: false,
      explanation:
        'Over-reaction. Negative absorption that has now stabilized at +50k SF/quarter is a turning point signal, not a pass trigger. The right discipline is to price the risk (extended lease-up, higher concessions) into the underwriting rather than blanket-pass. Value-add office deals require holding through the absorption trough — that\'s the source of value creation.',
    },
    {
      label:
        'Focus on the subject building\'s leasing velocity, not the submarket — if this building is well-positioned, it can outperform.',
      isBest: false,
      explanation:
        'Correct that outperformance is possible but wrong as a framing for risk analysis. Submarket absorption sets the ceiling on the available demand pool; even outperforming buildings must draw from the same tenant universe. Underwriting that ignores submarket supply/demand dynamics is single-asset optimism that misses the macro constraint.',
    },
  ],
  takeaway:
    'Pending supply returns (subleases, downsizing returns) are functionally identical to new deliveries from an absorption perspective — they expand the available inventory that must be leased before vacancy tightens. Always add pending supply to existing vacancy before computing absorption runway. In office, distinguish between demand-side absorption (new tenants expanding) and supply-side additions (existing tenants returning space); the recovery only starts when demand exceeds total supply additions.',
  tips: [
    'Absorption runway = (pending supply returns + current vacancy at target) ÷ quarterly absorption pace.',
    'Stabilizing at +50k SF/quarter after 6 negative quarters is a turning point — not yet a recovery.',
    'Value-add office underwriting must model a J-curve; cash-on-cash will be negative during lease-up.',
  ],
};
