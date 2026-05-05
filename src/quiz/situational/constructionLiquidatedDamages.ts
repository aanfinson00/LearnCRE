import type { SituationalCase } from '../../types/situational';

export const constructionLiquidatedDamages: SituationalCase = {
  id: 'construction-liquidated-damages',
  title: 'Construction LDs — does this clause actually cover the owner\'s losses?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  documentExcerpt: {
    docType: 'construction',
    label: 'Article 12 — Time of Performance / Liquidated Damages',
    text: `12.1 Substantial Completion Date. Contractor shall achieve
    Substantial Completion of the Work no later than the Substantial
    Completion Date set forth in the Contract Schedule (the "SC
    Date"). Time is of the essence.

12.2 Liquidated Damages. If Contractor fails to achieve Substantial
    Completion by the SC Date, Contractor shall pay Owner, as
    liquidated damages and not as a penalty, the sum of $5,000 per
    calendar day for each day Substantial Completion is delayed past
    the SC Date, up to a maximum aggregate of $500,000 (the
    "Liquidated Damages Cap"). Contractor and Owner agree this
    amount represents a reasonable forecast of just compensation for
    the harm that would be caused by such delay and is not a penalty.

12.3 Excused Delays. The SC Date shall be extended day-for-day for
    delays caused by: (a) Force Majeure; (b) acts or omissions of
    Owner or Owner\'s agents; (c) changes in the Work approved by
    Owner; (d) abnormal adverse weather conditions reasonably
    documented by Contractor.

12.4 Sole Remedy. Liquidated Damages under this Article 12 shall be
    Owner\'s sole and exclusive remedy for delay; Owner waives any
    right to recover actual damages, consequential damages, or
    incidental damages arising from delay in Substantial Completion.`,
  },
  scenario:
    'Your $50M development project is now 90 days past the contractual Substantial Completion Date. Of the 90 days: 30 are weather-related (well-documented but arguable as "abnormal"); 20 are the result of an Owner-approved change order that pushed the SC Date by exactly 20 days; 40 are unexcused contractor delay. Owner\'s actual damages from the delay (lost rent, extension fees on construction loan, opportunity cost) come to $1.2M.',
  question:
    'Under the LD clause above, what\'s the Owner\'s recovery?',
  options: [
    {
      label:
        'Owner recovers the LD cap of $500,000. Of the 90-day delay: 20 days excused by Owner change order (12.3(c)), 30 days potentially excused by weather *if* documented as "abnormal" (12.3(d)). Best case for Owner: 90 − 20 = 70 days of unexcused delay × $5,000 = $350,000. Worst case: 90 − 50 = 40 unexcused × $5,000 = $200,000. Either way, well under the $500k cap. The $1.2M of actual damages is *waived* under 12.4 — LDs are the sole remedy. Owner is out ~$700k-$1M of actual losses.',
      isBest: true,
      explanation:
        'Reading the clause systematically: (1) **Excused day count**: Owner-approved change order pushes the SC Date *day-for-day* per 12.3(c), so those 20 days don\'t count against Contractor; abnormal weather under 12.3(d) requires Contractor\'s documentation but is a fact question (likely partially excused). (2) **LD math**: $5,000 per unexcused day. Best case 70 unexcused days = $350k; conservative case 40 days = $200k. Both far under the $500k cap. (3) **Cap as ceiling**: $500k cap is the binding constraint regardless of how bad the delay gets. (4) **Sole remedy**: 12.4 expressly waives consequential, actual, and incidental damages — so the $1.2M of real losses (lost rent, extension fees, etc.) is unrecoverable beyond the LDs. **Practical impact**: Owner negotiated a sub-market LD rate and a low cap, leaving them under-compensated. This is why commercial owners push for higher LD rates ($10-25k/day on a $50M deal isn\'t unusual) and either no cap or much higher caps (e.g. 5% of contract value = $2.5M on a $50M deal).',
    },
    {
      label:
        'Owner can recover full $1.2M of actual damages by characterizing the LD clause as a "penalty" and getting it struck.',
      isBest: false,
      explanation:
        'Hard to win — Section 12.2 has classic anti-penalty language ("reasonable forecast of just compensation, not a penalty"). Courts uphold these clauses unless the LD amount is wildly disproportionate to anticipated damages. $5k/day is on the low side but not "shockingly low."',
    },
    {
      label:
        'Owner gets $0 — weather and change orders excuse the entire delay.',
      isBest: false,
      explanation:
        'Even maximally crediting both, only 50 days are excused; 40 remain unexcused at $5k/day = $200k of LDs. Weather requires *documentation* that it\'s "abnormal," which is a fact question.',
    },
    {
      label:
        'Owner recovers $500k cap *plus* actual damages above the cap, since LDs and actual damages can stack.',
      isBest: false,
      explanation:
        'Misreads 12.4. "Sole and exclusive remedy" means LDs *replace* — not stack on top of — actual damages. Owner waived the right to actual damages by signing this clause. Stacking is what owners *want* but rarely get in negotiated GMP/cost-plus contracts.',
    },
  ],
  takeaway:
    'Liquidated damages are negotiated *floors and ceilings* on delay recovery. The owner gives up actual damages (which would otherwise be hard to prove) in exchange for a fixed daily rate × actual delay days, capped. Contractor gives up "I can\'t calculate damages" defenses in exchange for the cap. Critical drafting moves: (1) push the daily rate to reflect real lost-rent + carry costs; (2) push the cap higher (5-10% of contract value is the modern norm); (3) carefully limit "excused delays" — broad force-majeure clauses gut LDs; (4) preserve actual-damages claims for *catastrophic* delays (6+ months) by carving them out of the "sole remedy" language.',
  tips: [
    'LD daily rate should reflect: lost rent + lender extension fees + insurance carry + opportunity cost. Calculate before signing.',
    'LD caps: 3-5% of contract value is sponsor-friendly; 8-10% is balanced; 15%+ is owner-friendly.',
    '"Sole remedy" language is the contractor\'s biggest win in negotiation. Push to carve out: gross negligence, willful default, abandonment.',
    '"Abnormal weather" is contractor-favorable when used loosely. Define it in the contract: e.g. "weather more severe than the 10-year historical 90th percentile per NOAA records."',
    'Always model the LD recovery against actual damages at multiple delay severities. If 90 days of delay only recovers $500k against $1M+ of actual damages, you under-negotiated.',
  ],
};
