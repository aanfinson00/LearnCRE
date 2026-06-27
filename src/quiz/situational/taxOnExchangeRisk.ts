import type { SituationalCase } from '../../types/situational';

export const taxOnExchangeRisk: SituationalCase = {
  id: 'tax-on-exchange-risk',
  title: '1031 exchange: the 45-day ID window is closing and you only have one replacement property',
  category: 'deal-process',
  difficulty: 'advanced',
  roles: ['acquisitions'],
  scenario:
    "Your client sold a multifamily property for $8.2M with a $3.1M tax gain (blended federal + state rate of 28% = $868k in deferred tax). They want to complete a 1031 exchange. You're 38 days into the 45-day identification window. You've identified one replacement property — a $7.5M NNN retail asset — but the LOI was just rejected. You have a list of 6 other potential replacement properties but none have been formally identified in writing to the QI (Qualified Intermediary). The 1031 exchange rules allow you to identify up to 3 properties under the '3-property rule,' or any number of properties whose aggregate value doesn't exceed 200% of the relinquished property under the '200% rule.'",
  data: [
    { label: 'Sale price (relinquished property)', value: '$8.2M' },
    { label: 'Deferred tax liability', value: '$868k' },
    { label: 'Days elapsed in ID window', value: '38 of 45' },
    { label: 'Current ID submitted', value: '1 property ($7.5M NNN retail — LOI rejected)' },
    { label: 'Remaining ID capacity (3-property rule)', value: '2 more properties' },
    { label: '200% rule aggregate limit', value: '$16.4M (200% of $8.2M)' },
    { label: 'Available to identify', value: '6 candidates on list' },
    { label: 'Exchange window to close', value: '180 days from sale' },
  ],
  question:
    "With 7 days left in the ID window and your primary candidate rejected, what are your identification strategy options, and what is the risk if you fail to close any identified replacement property?",
  options: [
    {
      label:
        "Two identification strategies are available with 7 days left: (1) Under the 3-property rule, add 2 more properties to your identification list for a total of 3. Choose the 2 most actionable candidates from your 6-item list — defined as having the highest probability of closing within the 180-day exchange window. (2) Alternatively, use the 200% rule to identify all 6 remaining candidates if their aggregate value stays below $16.4M. The strategic risk: under IRS §1031, you must close on at least one identified property within 180 days — failure to close on any identified property does not restart the exchange; the deferred gain becomes immediately taxable. With 7 days, the priority is to identify 2 more strong candidates now and run parallel negotiations, not to wait for a perfect candidate.",
      isBest: true,
      explanation:
        "Right strategy. The 45-day ID window is a hard deadline — missing it forfeits the exchange entirely. With 7 days left, the optionality of adding 2 more identified properties under the 3-property rule (or using the 200% rule for broader coverage) is free and maximizes your chances of closing at least one within 180 days. Choosing based on 'most likely to close in 180 days' is the right filter — 1031 exchange failures typically come from identifying properties that can't close in time, not from identifying too many. The $868k deferred tax liability makes the cost of failure extremely concrete.",
    },
    {
      label:
        "Wait to identify additional properties until the primary candidate is confirmed dead — you don't want to over-identify and complicate negotiations.",
      isBest: false,
      explanation:
        "Waiting 5-7 more days risks forfeiting the exchange entirely. The 45-day window doesn't pause for negotiation delays. 'Over-identifying' (adding properties to the list) has no legal cost — the IRS doesn't penalize you for identifying 3 properties and only closing 1; you simply can't close on a property not on the list. The risk of under-identifying with 7 days left is total (forfeit the exchange); the risk of over-identifying is zero.",
    },
    {
      label:
        "Start the 180-day clock over by finding a new QI and documenting a new exchange — the failed LOI effectively resets the timeline.",
      isBest: false,
      explanation:
        "Legally impossible. The 180-day exchange period and 45-day identification window begin on the date of the relinquished property closing — they are fixed statutory deadlines under §1031. A QI change or LOI rejection doesn't reset either clock. The only thing that resets the exchange is completing it (closing on a replacement property) or failing it (paying the deferred tax). There's no legal mechanism to 'restart' a 1031 exchange once the relinquished property has closed.",
    },
    {
      label:
        "Use the 200% rule to identify all 6 remaining candidates — more identified properties means more optionality.",
      isBest: false,
      explanation:
        "Partially right but ignores the 200% aggregate cap. The 200% rule allows identifying any number of properties as long as their combined value doesn't exceed 200% of the relinquished property ($16.4M). You need to verify whether all 6 candidates fit within the $16.4M aggregate. If their combined value exceeds $16.4M, the identification is invalid for any excess properties. The 3-property rule (add 2 more, no value limit) is simpler and more certain unless the 6 candidates are all below $2.7M average. Know which rule you're using and whether the math works before submitting.",
    },
  ],
  takeaway:
    "The 1031 exchange has two hard deadlines: 45 days to identify replacement properties and 180 days to close — missing either forfeits the exchange and triggers the deferred tax. Adding properties to the ID list with days remaining has zero legal cost (you just can't close on anything not on the list). The strategic error is waiting for certainty before adding candidates — with 7 days left, identify the 2-3 most closeable candidates immediately and run parallel negotiations. The deferred tax liability is the quantified cost of failure.",
  tips: [
    "3-property rule: identify up to 3 replacement properties, no aggregate value limit. Most common rule used.",
    "200% rule: identify any number of properties as long as combined FMV ≤ 200% of relinquished property value. Useful when you need more than 3 candidates.",
    "Boot: any cash or non-like-kind property received in the exchange is 'boot' — it's taxable in the year received, even if the rest of the exchange qualifies. Common sources: mortgage payoff difference, cash received at close.",
  ],
};
