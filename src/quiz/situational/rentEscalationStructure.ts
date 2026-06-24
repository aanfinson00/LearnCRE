import type { SituationalCase } from '../../types/situational';

export const rentEscalationStructure: SituationalCase = {
  id: 'rent-escalation-structure',
  title: 'Fixed bumps vs. CPI — which is better for the landlord?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'You\'re negotiating a 10-year office lease renewal. The tenant proposes two alternatives: (A) 2.5% fixed annual rent bumps, or (B) CPI-indexed bumps capped at 4% and floored at 1%. You\'re underwriting the building in a macro environment where CPI has been running at 5–7% (currently settling toward 3–4%). Your lender underwrites at a fixed 2.5% rent growth assumption.',
  data: [
    { label: 'Option A', value: '2.5% fixed annual bumps' },
    { label: 'Option B', value: 'CPI bumps, floor 1%, cap 4%' },
    { label: 'Current CPI trajectory', value: '5–7% → settling to 3–4%' },
    { label: 'Lease term', value: '10 years' },
    { label: 'Lender underwriting', value: '2.5% rent growth assumed' },
  ],
  question: 'Which escalation structure better protects the landlord, and what is the key trade-off?',
  options: [
    {
      label:
        'CPI (Option B) is better when inflation is expected above 2.5% and the landlord wants inflation protection — the 4% cap limits upside but the floor prevents under-performance. But fixed bumps (A) are more valuable to a buyer applying a cap rate since they are predictable and defensible in underwriting.',
      isBest: true,
      explanation:
        'This is a rent escalation structure analysis, not a single "right answer." CPI with a 1–4% collar will outperform fixed 2.5% bumps when CPI runs 2.5–4%, and underperform only when CPI drops below 2.5%. In the described environment (settling to 3–4%), Option B likely outperforms. However, fixed bumps have a valuation advantage: buyers and appraisers apply cap rates to scheduled income that is easy to model. CPI leases require a CPI assumption that varies by underwriter, often introducing conservatism. The takeaway: fixed bumps trade better; CPI protects better. Institutional landlords with patient capital favor CPI; shorter-hold or leveraged deals favor the certainty of fixed bumps.',
    },
    {
      label:
        'Fixed 2.5% (Option A) is always better because it\'s predictable and lenders underwrite fixed growth at full value.',
      isBest: false,
      explanation:
        'Predictability has real value — lenders love fixed bump schedules — but "always better" ignores scenarios where actual inflation materially exceeds 2.5%. A 10-year lease in an environment where CPI averages 3.5% compounds: fixed bumps produce ~28% rent growth over 10 years, while CPI-linked at a 3.5% average produces ~41%. That 13% cumulative gap is meaningful on a large building. Lender underwriting at 2.5% doesn\'t make fixed bumps better in absolute terms; it just makes them easier to finance.',
    },
    {
      label:
        'CPI (Option B) is always better because it automatically adjusts to real-world inflation.',
      isBest: false,
      explanation:
        'Not always. In a sub-2.5% inflation environment (which markets spent much of 2010–2020), CPI bumps hit the 1% floor and underperform fixed 2.5% bumps in every year. And the 4% cap eliminates upside in high-inflation environments. CPI structures are better-than-fixed when actual CPI runs between 2.5% and 4%; outside that range, the comparison flips.',
    },
    {
      label:
        'The floor/cap collar makes Option B equivalent to fixed bumps, so the choice doesn\'t matter.',
      isBest: false,
      explanation:
        'The 1–4% collar is not equivalent to any fixed rate unless you know where CPI will land every year. If CPI runs at 3.5% for 10 years, Option B produces $1.035^10 = +41% cumulative growth vs Option A\'s $1.025^10 = +28%. The collar does narrow the distribution of outcomes, but the expected value differs meaningfully depending on the CPI path.',
    },
  ],
  takeaway:
    'Fixed bumps vs. CPI is a landlord risk/return trade-off. Fixed = predictability and lender-friendliness; CPI = inflation protection with upside capped by the collar. The right answer depends on the landlord\'s hold period, financing constraints, and macro view. For institutions holding long-duration, CPI structures preserve real purchasing power; for leveraged shorter-hold deals, fixed bumps reduce underwriting friction.',
  tips: [
    'Rule of thumb: CPI collar structures outperform fixed bumps when CPI > fixed bump rate; they underperform when CPI < floor.',
    'Buyers applying cap rates to CPI leases often haircut to a conservative CPI assumption — fixed bumps trade at higher implied values.',
    'In negotiations, offer the tenant their preferred structure in exchange for better terms on something else (TI, term, renewal options).',
  ],
};
