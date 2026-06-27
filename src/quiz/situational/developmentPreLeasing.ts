import type { SituationalCase } from '../../types/situational';

export const developmentPreLeasing: SituationalCase = {
  id: 'development-pre-leasing',
  title: 'Development: how much pre-leasing do you need before breaking ground?',
  category: 'risk',
  difficulty: 'advanced',
  roles: ['development', 'mortgageUw'],
  scenario:
    "You're developing a 220,000 SF speculative Class A office building in a suburban market. Total project cost is $95M (land + hard + soft). Your construction lender requires a 30% pre-lease commitment before funding the construction draw. The anchor prospect has been in negotiation for 3 months on 70,000 SF (32% of the building) but hasn't signed an LOI. Your equity partners are pushing to break ground without pre-leasing to capture the construction window before winter. Market vacancy in the submarket is 14%; three competing buildings are under construction without pre-leasing.",
  data: [
    { label: 'Building size', value: '220,000 SF Class A office' },
    { label: 'Total project cost', value: '$95M' },
    { label: 'Construction lender pre-lease requirement', value: '30% (66,000 SF)' },
    { label: 'Anchor prospect', value: '70,000 SF (32%) — no LOI signed' },
    { label: 'Submarket vacancy', value: '14%' },
    { label: 'Competing spec buildings', value: '3 under construction without pre-leasing' },
    { label: 'Target stabilized yield on cost', value: '6.5%' },
  ],
  question:
    "Should you break ground without a signed anchor commitment, and what are the real risks if you do?",
  options: [
    {
      label:
        "No — starting without a signed commitment exposes you to two compounding risks: (1) the anchor takes competing space during your 18-month construction window, leaving you with a 220k SF vacancy in a 14%-vacant submarket with three competing spec buildings; (2) the construction lender won't fund draws without the 30% pre-lease, meaning you'd be equity-funding construction draws on a speculative basis until you get the anchor signed. The business logic for breaking ground first is 'capture the window' — which only makes sense if construction availability is the genuine constraint (it isn't in a 14%-vacant submarket). 3 months without an LOI on a 70,000 SF deal is a signal, not a holdout.",
      isBest: true,
      explanation:
        "Right call. The construction window rationale is valid in tight-submarket conditions (vacancy < 5%, no competing supply) where the site-preparation lead time is a genuine barrier. At 14% vacancy with 3 competing spec starts, there's no supply scarcity to justify the leasing risk. The construction lender condition (30% pre-lease) reflects this: lenders calibrate pre-lease thresholds to submarket conditions. Breaking ground without the anchor signed means funding construction draws from equity at risk — effectively writing a call option against $95M of project cost with the prospect as the counterparty.",
    },
    {
      label:
        "Break ground now — losing the construction window means missing the delivery date, and delivering 6 months later into a potentially softer market is worse than the current leasing risk.",
      isBest: false,
      explanation:
        "This logic holds in a tight, supply-constrained market — not in a 14%-vacant submarket with 3 competing spec buildings. 'Missing the construction window' is a real cost when the leasing environment is tight enough that the building will absorb quickly on delivery regardless. Here, the absorption risk (3 competing buildings, 14% vacancy) is the binding constraint — delivering 6 months earlier into a market with unabsorbed supply doesn't help occupancy. The timing argument is being used to rationalize a leasing-risk decision.",
    },
    {
      label:
        "Require the equity partners to fund 100% of the construction draws out of pocket until the pre-lease condition is met, then bring in the construction loan.",
      isBest: false,
      explanation:
        "Operationally possible but financially equivalent to breaking ground at full equity risk. If the anchor walks during the 18-month construction period, you've funded a speculative build on a 14%-vacant submarket using equity at a project-level IRR risk. The construction lender's pre-lease condition exists precisely to avoid this exposure — working around it by substituting equity doesn't reduce the underlying risk, it just shifts who bears it. The equity partners would be taking on construction lender risk without construction lender pricing.",
    },
    {
      label:
        "Offer the anchor tenant a 6-month rent abatement to accelerate the LOI signing and meet the lender's pre-lease threshold before ground-breaking.",
      isBest: false,
      explanation:
        "Reasonable tactic if used carefully — rent abatements are standard in office leases and can accelerate a signing decision. But the question is whether 6-month abatement is the reason the anchor hasn't signed, or whether the delay reflects genuine uncertainty about taking space. 3 months of negotiation without an LOI often signals a decision-making hold at the tenant side (board approval, space audit, competing space in the prospect's consideration set). Abatement solves a pricing objection; it doesn't solve a process objection. Clarify the reason for the delay before conceding economics.",
    },
  ],
  takeaway:
    "Pre-leasing thresholds exist because construction lenders price risk based on lease commitment coverage — they won't fund spec construction in weak leasing markets without it. Breaking ground before meeting the threshold requires equity-funded construction draws, concentrating risk at the project level. The 'capture the window' rationale is only valid when the submarket is supply-constrained and absorption is near-certain on delivery. At 14% vacancy with competing spec supply, the risk isn't missing the window — it's delivering a building into a market that can't absorb it.",
  tips: [
    "Construction lender pre-lease thresholds by product type: office 30-50%, industrial spec 0-20%, multifamily 0% (preleasing not standard), retail anchored 60-80%.",
    "Three months without an LOI on a known prospect is a yellow flag — ask directly whether the delay is price, decision authority, or competing space. The answer changes your strategy.",
    "Deliver risk vs. lease risk: in tight markets, delivering early is more valuable (capturing peak rents). In oversupplied markets, lease-up risk swamps timing benefit — get the tenant signed first.",
  ],
};
