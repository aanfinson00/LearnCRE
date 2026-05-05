import type { SituationalCase } from '../../types/situational';

export const constructionChangeOrderPricing: SituationalCase = {
  id: 'construction-change-order-pricing',
  title: 'Change order pricing — who pays for the variance?',
  category: 'deal-process',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  documentExcerpt: {
    docType: 'construction',
    label: 'Article 7 — Change Orders',
    text: `(a) Definition. A "Change Order" is a written instrument modifying
    the scope, cost, or schedule of the Work, signed by Owner,
    Contractor, and (where required by the Loan Documents) Lender.

(b) Owner-Directed Changes. For changes directed by Owner: Contractor
    shall be entitled to its actual direct cost plus the Contract\'s
    stated overhead and profit markup of fifteen percent (15%).

(c) Field Conditions. For changes due to differing site conditions or
    code-required modifications: cost shall be split 50/50 between
    Owner and Contractor up to $250,000 per occurrence; thereafter
    100% Owner responsibility.

(d) Scope Errors. For changes due to errors or omissions in the
    Construction Documents: 100% Contractor responsibility, including
    delay damages.

(e) Lender Approval. Any single Change Order exceeding $500,000 or
    cumulative Change Orders exceeding $2,000,000 require Lender
    written approval.`,
  },
  scenario:
    'Your project is mid-build. Three Change Orders are on the table: (1) Owner asked for upgraded HVAC ($400k incremental cost). (2) Excavation hit unanticipated bedrock requiring $300k of additional shoring. (3) Architect omitted required fire-rated assemblies on Floor 4, requiring $180k of rework.',
  question:
    'Under the change-order language above, what does Owner actually pay across the three CO\'s?',
  options: [
    {
      label:
        'Owner pays $460k + $275k + $0 = $735k. CO 1 (HVAC upgrade): owner-directed, Owner pays 100% of cost + 15% markup = $400k × 1.15 = $460k. CO 2 (bedrock): field condition, 50/50 split up to $250k → Owner pays $125k of first $250k; remaining $50k is 100% Owner = $175k Owner share, plus 15% markup on Owner-paid portion = ~$201k... actually: split is 50/50 up to $250k (Owner pays $125k), then 100% Owner above (Owner pays $50k more) = $175k of cost; with 15% markup the Contractor charges = $175k × 1.15 = $201k... no — markup applies to Contractor\'s cost regardless of who pays. Total bedrock Owner pays = $175k + $26k markup share = ~$201-275k depending on markup interpretation. CO 3 (fire-rating omission): scope error → 100% Contractor responsibility, Owner pays $0.',
      isBest: true,
      explanation:
        'Change-order math is allocation arithmetic by cause: (1) **Owner-directed** = Owner pays all + markup. $400k × 1.15 = $460k. (2) **Field conditions** = 50/50 up to threshold. $300k > $250k threshold → Owner pays half of first $250k ($125k) + 100% of remaining $50k = $175k of cost. With 15% markup, the Contractor\'s billing to Owner is $175k × 1.15 ≈ $201k (markup applied to Owner\'s share only). (3) **Scope errors** in the Construction Documents = 100% Contractor; Owner pays nothing on the rework. **Approval check**: CO 1 ($460k) is under the $500k single-CO threshold, so no Lender approval needed. CO 2 ($201k Owner share) is under threshold. Cumulative is $660k — well under the $2M cumulative threshold. **The mistake people make**: not allocating bedrock cost properly between Owner and Contractor; or paying for fire-rating omissions out of Owner contingency.',
    },
    {
      label:
        'Owner pays the full $880k of CO costs because change orders flow downstream from the GC to Owner regardless of cause.',
      isBest: false,
      explanation:
        'Change-order language explicitly allocates cost by cause. Scope errors are 100% on the contractor; field conditions are split. Owner doesn\'t pay everything — that would defeat the point of the differentiated cost-share clauses.',
    },
    {
      label:
        'Owner pays $0 because contingency reserves exist to absorb all change orders.',
      isBest: false,
      explanation:
        'Contingency funds Owner\'s share of overruns; it doesn\'t exempt Owner from the allocation. Owner pays per the contract; contingency is the source of those funds. Owner-paid change orders draw down contingency; scope-error changes don\'t.',
    },
    {
      label:
        'CO 3 (fire-rating omission) requires Owner to pay because architects are Owner\'s consultants, not Contractor\'s.',
      isBest: false,
      explanation:
        'Section (d) explicitly puts errors in the Construction Documents on the Contractor — even when the architect is Owner\'s consultant — because the Contractor is responsible for executing per the Documents. The architect\'s liability is between Owner and architect (separate professional services contract); the Contractor\'s contractual obligation flows from this contract.',
    },
  ],
  takeaway:
    'Change orders are allocated by *cause*, not by *who notices the change*. Three buckets: (1) **Owner-directed** = Owner pays + markup. (2) **Field conditions** (bedrock, weather, soil) = often 50/50 with caps. (3) **Scope errors / omissions** = Contractor\'s responsibility (often with delay damages). Always verify the change-order cause before approving — Owner-paid change orders draw down contingency; Contractor-paid don\'t. Lender approval thresholds (typically $250k-$1M single, $1-3M cumulative) trip on big or repeated CO\'s.',
  tips: [
    'Always identify the *cause* of the change order before pricing. Owner-directed, field condition, or scope error?',
    '15% markup on owner-paid changes is industry standard; trade-line markups can be 20-25%.',
    'Field-condition splits typically have a per-occurrence cap (commonly $100k-$500k) before flipping to 100% Owner.',
    'Lender approval thresholds force visibility into project drift — sponsors want them high to avoid friction; lenders want them low to maintain control.',
  ],
};
