import type { SituationalCase } from '../../types/situational';

export const ethicsRelatedPartyTransaction: SituationalCase = {
  id: 'ethics-related-party-transaction',
  title: 'Ethics: the sponsor wants to use an affiliated property manager — what do you do?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    "You're a junior associate at a fund that just closed a $45M multifamily acquisition. The sponsor has informed the fund that property management will be provided by an affiliate of the GP — a management company the sponsor's principal owns a 60% stake in. The LPA states that related-party transactions require 'prior written consent of the Advisory Board with majority LP approval.' The proposed management fee is 5% of effective gross income (EGI) — the market rate for the asset class is 4-4.5%. The sponsor did not mention the affiliate relationship at the time of the LP close.",
  data: [
    { label: 'Asset', value: '$45M multifamily acquisition' },
    { label: 'Property management fee', value: '5% of EGI (market: 4–4.5%)' },
    { label: 'Sponsor affiliate stake', value: '60% in management company' },
    { label: 'LPA requirement', value: 'Prior written consent, majority LP approval' },
    { label: 'Disclosure at LP close', value: 'None disclosed' },
  ],
  question:
    "As the associate managing the relationship, what is the correct sequence of actions, and why does the 50 bps fee difference matter more than it looks?",
  options: [
    {
      label:
        "Three actions in sequence: (1) document the facts — confirm the LPA language, the affiliate relationship, and that disclosure was not made at close; (2) escalate internally before any response to the sponsor — this is a fiduciary and legal issue, not a negotiation; (3) once internally aligned, notify the Advisory Board and trigger the LPA approval process before the management company takes over (if they've already started, flag it as an unauthorized related-party transaction). On the fee: 50 bps above market on $45M at 95% occupancy and $1,400/unit is roughly $27k/year — but the LPA approval mechanism exists precisely because related-party fees are a systematic wealth transfer from LP returns to the sponsor. The disclosure failure is the bigger issue than the 50 bps.",
      isBest: true,
      explanation:
        "Right sequence and right framing. Related-party transactions in private equity real estate are tightly regulated by LPA language for good reason: they allow GPs to extract returns outside of the promote structure by routing fees through affiliates. The LPA here requires advisory board + LP approval — that process needs to be honored before the affiliate management company is engaged, not after the fact. The disclosure failure at close is a potential breach of the sponsor's fiduciary duty to LPs (who had the right to know the affiliated management relationship before committing capital). The 50 bps matters: across a 5-year hold on a growing EGI base, it's $130-200k in cumulative fee leakage — but it's also evidence of the conflict-of-interest dynamic.",
    },
    {
      label:
        "Negotiate the fee down to 4.25% and document it as arm's-length — that resolves the conflict-of-interest concern since the fee is now at market.",
      isBest: false,
      explanation:
        "Getting the fee to market rate doesn't cure the process failure. The LPA requires prior written consent with majority LP approval for related-party transactions — that requirement exists independent of whether the fee is at market. Even a market-rate related-party transaction must go through the approval process so LPs can weigh in on the relationship, not just the pricing. The disclosure failure at close also remains unaddressed. LPs who committed capital without knowing about an affiliated manager would have a legitimate grievance regardless of the fee level.",
    },
    {
      label:
        "The 50 bps is immaterial — approve the management company informally and address the LPA process in the next advisory board meeting.",
      isBest: false,
      explanation:
        "Process matters as much as economics in LP relationships. 'Informal approval' of an LPA-governed related-party transaction creates liability for the fund manager (breach of fiduciary duty, potential LP remedy claim) and normalizes the idea that LPA requirements can be waived informally. The next advisory board meeting could be 3-6 months away — allowing an unauthorized affiliate to collect fees for months before formal approval is exactly the scenario LPA governance structures are designed to prevent.",
    },
    {
      label:
        "Raise it with the sponsor privately and accept whatever explanation is given — LP relationships are senior management's responsibility, not the associate's.",
      isBest: false,
      explanation:
        "Associates own what they know. If you have specific knowledge of a potential LPA breach or undisclosed conflict of interest, 'it's not my responsibility' is not a defensible position professionally or legally. The appropriate action is to escalate internally — flag to your senior team immediately with the specific facts. That puts the decision with the appropriate principal while creating a documented record that you identified the issue. Staying silent on a known governance issue is a career and legal risk.",
    },
  ],
  takeaway:
    "Related-party transactions in real estate PE are governed by LPA process requirements, not just pricing. The correct sequence: document the facts, escalate internally before responding externally, and trigger the LPA approval process before any fee is collected. The disclosure failure at close is typically the bigger issue than the fee delta — LPs who didn't know about an affiliated manager at the time of commitment had a right to that information. Associates should escalate what they know; staying silent on a known governance issue is professionally and legally untenable.",
  tips: [
    "LPA related-party provisions: look for who holds approval authority (advisory board, LP supermajority, independent committee) and whether it's prior or retroactive consent.",
    "Common related-party transactions in CRE funds: affiliated property management, affiliated construction management, affiliated brokerage commissions, affiliated debt financing, and affiliate fee-on-fee structures.",
    "SEC Regulation S-K and state securities laws may require affirmative disclosure of material conflicts of interest in fund offering documents — an undisclosed affiliate relationship can be a securities violation independent of LPA compliance.",
  ],
};
