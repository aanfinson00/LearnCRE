import type { SituationalCase } from '../../types/situational';

export const compLeaseUpVsStabilized: SituationalCase = {
  id: 'comp-leaseup-vs-stabilized',
  title: "Cap rates across different occupancy levels — which comps are usable?",
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    "You're pricing a 95%-leased multifamily asset. Three recent comps from the same submarket (past 8 months) are available: one at 95% occupancy trading at a 6.00% cap on in-place NOI; one at 88% occupancy recently stabilizing at a 5.75% cap on in-place NOI; and one at 78% occupancy mid-lease-up at a 5.50% cap on trailing income.",
  data: [
    { label: 'Subject', value: '95% occupied · stabilized' },
    { label: 'Comp 1', value: '95% occ · 6.00% cap on in-place NOI' },
    { label: 'Comp 2', value: '88% occ · 5.75% cap on in-place NOI' },
    { label: 'Comp 3', value: '78% occ · 5.50% cap on trailing NOI' },
    { label: 'Raw average', value: '5.75%' },
  ],
  question: "How do you use this comp set for pricing a stabilized asset?",
  options: [
    {
      label: "Use Comp 1 directly. Restate Comp 2 to a stabilized-equivalent cap (~6.20%) by grossing up its in-place NOI to 95% occupancy. Treat Comp 3 as a floor only — buyers priced it on forward NOI, making the in-place cap incomparable to a stabilized transaction.",
      isBest: true,
      explanation:
        "Comp 1 is a clean apples-to-apples at the same occupancy and cap basis. Comp 2 at 88% can be restated: if in-place NOI at 88% = X, stabilized NOI at 95% ≈ X × (95/88) = 1.08X. The buyer paid a 5.75% cap on X, implying a ~6.21% cap on stabilized NOI. Comp 3 at 78% was underwritten to future NOI — the buyer modeled a stabilized yield, not the trailing cap. Applying the in-place cap rate of 5.50% to a stabilized comp set overstates demand; Comp 3 should anchor a floor, not the average.",
    },
    {
      label: "Average all three — market clearing price is market clearing price regardless of occupancy at time of sale.",
      isBest: false,
      explanation:
        "Buyers pricing lease-up assets use forward NOI; buyers pricing stabilized assets use in-place NOI. These are different cap rate bases — averaging across them mixes the unit of measurement. The resulting 5.75% average is lower than a stabilized-equivalent comparison yields (~6.10–6.20%), systematically overstating demand for a stabilized asset.",
    },
    {
      label: "Discard Comps 2 and 3 — only same-occupancy comps are valid.",
      isBest: false,
      explanation:
        "Discarding comps with different occupancy is overly conservative when adjustment is straightforward. Restating Comp 2 to a stabilized NOI basis produces a usable data point. Comp 3 is harder to restate but still anchors a floor. A thin comp set (n=1) is riskier than a properly adjusted 3-comp set.",
    },
    {
      label: "These comps cannot be compared at all — different occupancy levels require completely different valuation methods.",
      isBest: false,
      explanation:
        "Different occupancy requires adjustment, not abandonment of the approach. Restating lease-up comps to a stabilized NOI equivalent is standard appraisal practice. If analysts required perfect comps before pricing any deal, nothing would transact. The job is to document the bridge from observed cap to subject cap — not refuse to cross it.",
    },
  ],
  takeaway:
    "Cap rates across different occupancy levels are not directly comparable — always restate to a common NOI basis before anchoring pricing. For partially-leased comps, gross up in-place NOI to the stabilized occupancy assumed by the buyer, then back-solve for the implied stabilized cap. Lease-up comps (sub-80% occupancy) are best used as floors, not primary anchors, because they embed a forward underwriting view that differs structurally from stabilized pricing.",
  tips: [
    "Restated stabilized cap ≈ in-place cap × (actual occupancy ÷ stabilized occupancy).",
    "Example: 5.75% at 88% occ → 5.75% × (88/95) ≈ 5.33% — wait, that goes the wrong way. Use: actual cap ÷ (actual occ / stabilized occ) = 5.75% ÷ (88/95) ≈ 6.21%.",
    "Lease-up comps priced on forward NOI embed an appreciation thesis — use them only for benchmarking upside.",
  ],
};
