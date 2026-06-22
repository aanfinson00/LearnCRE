import type { SituationalCase } from '../../types/situational';

export const compFlexVsBulk: SituationalCase = {
  id: 'comp-flex-vs-bulk',
  title: 'Why are these industrial comps pulling your cap rate too tight?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You are bidding on a 350,000 SF bulk distribution center — one tenant, 36 ft clear height, 50 dock doors, in a major logistics submarket. The offering memorandum cites 4 comps to support a 5.25% going-in cap. You pull the details and notice something off.',
  data: [
    { label: 'Subject', value: '350k SF bulk distribution, NNN, 36 ft clear, single-tenant' },
    { label: 'Comp 1', value: '45k SF flex/R&D, 18 ft clear, 2 tenants — 5.40% cap' },
    { label: 'Comp 2', value: '60k SF flex/industrial, 22 ft clear, 3 tenants — 5.30% cap' },
    { label: 'Comp 3', value: '280k SF bulk warehouse, 32 ft clear, NNN — 5.60% cap' },
    { label: 'Comp 4', value: '400k SF bulk distribution, 36 ft clear, NNN — 5.55% cap' },
  ],
  question: 'How should you treat this comp set?',
  options: [
    {
      label:
        'Discard Comps 1 and 2 (flex/R&D at 18–22 ft clear). Use Comps 3 and 4 (bulk NNN, 32–36 ft), which imply a 5.58% cap — apply a modest 5–10 bps tightener for the subject\'s newer vintage, landing at ~5.50%.',
      isBest: true,
      explanation:
        'Flex industrial trades at tighter caps than bulk distribution because the tenant base is different (smaller multi-tenant, often higher credit per SF, office/industrial hybrid use). Bulk logistics trades on NOI predictability and replication cost — a very different buyer pool. Mixing them inflates perceived demand and forces the cap tighter than the actual bulk market warrants. Comps 3 and 4 are the correct anchor at 5.55–5.60%.',
    },
    {
      label:
        'Average all 4 comps — they\'re all industrial, same submarket — and use 5.46% as the going-in cap.',
      isBest: false,
      explanation:
        'Submarket proximity is necessary but not sufficient for a defensible comp. Flex/R&D at 18 ft clear attracts a different buyer pool than bulk logistics at 36 ft. Cap rate pools can diverge 25–75 bps within the same submarket. An unfiltered average produces a number that doesn\'t represent either product type cleanly.',
    },
    {
      label:
        'Use all 4 comps but weight Comps 3 and 4 more heavily — 70% weight — to anchor toward bulk trades.',
      isBest: false,
      explanation:
        'Weighting is a valid technique, but the better discipline is to exclude obviously non-comparable product types first, then weight within the defensible set. Including flex comps at any weight in a bulk deal requires documenting why they belong — and in most IC processes, that explanation will invite more scrutiny than it\'s worth.',
    },
    {
      label:
        'Push back on the broker, ask for 2 more comps, and don\'t price until the comp set is cleaner.',
      isBest: false,
      explanation:
        'Waiting for a "perfect" comp set is a luxury sellers don\'t grant. You already have 2 clean bulk comps — that\'s enough to support a cap range with an adjustment note. Pricing discipline requires acting on available data, not abstaining until conditions are ideal.',
    },
  ],
  takeaway:
    'Industrial is not a monolith. Flex/R&D, last-mile, and bulk distribution all trade at different caps, attract different buyers, and have different operating profiles. Always label each comp by clear height, dock door count, and single- vs. multi-tenancy before including it in a cap rate pool.',
  tips: [
    'Bulk distribution (>32 ft clear, dock-heavy): 5.0–6.0% cap range in most major markets.',
    'Flex/R&D (<24 ft clear, grade-level loading): can trade 25–75 bps tighter per SF because of multi-tenant diversification.',
    'Clear height is the single fastest filter for industrial comp quality — if it differs by more than 4 ft, document the adjustment.',
  ],
};
