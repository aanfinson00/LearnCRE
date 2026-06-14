import type { SituationalCase } from '../../types/situational';

export const compSizeAdjustment: SituationalCase = {
  id: 'comp-size-adjustment',
  title: 'The comps are half the size — do you adjust the cap rate up or down?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You\'re pricing a 450,000 SF Class-A distribution center in a primary industrial submarket. The three best recent comps are smaller single-tenant logistics buildings: Comp 1 at 165k SF (6.0% cap), Comp 2 at 200k SF (5.85% cap), and Comp 3 at 185k SF (6.10% cap). All three comps are in the same submarket, traded within 9 months. The broker proposes using the raw cap-rate average (~6.0%) to price the 450k SF subject.',
  data: [
    { label: 'Subject', value: '450,000 SF · Class-A distribution' },
    { label: 'Comp 1', value: '165k SF · 6.00% cap' },
    { label: 'Comp 2', value: '200k SF · 5.85% cap' },
    { label: 'Comp 3', value: '185k SF · 6.10% cap' },
    { label: 'Raw comp avg', value: '~6.0%' },
  ],
  question: 'What\'s the correct size adjustment on the subject?',
  options: [
    {
      label: 'Apply a 10–25 bps cap tightening on the subject — larger single-tenant logistics attracts deeper institutional demand (REITs, pension funds, sovereigns), which means a thicker buyer pool and a lower required yield. Price the subject at 5.75–5.90%, not 6.0%.',
      isBest: true,
      explanation:
        'In institutional industrial markets, size adjustments run in the direction of more institutional demand = tighter cap. Large-format logistics (300k–500k+ SF) is among the most sought-after product by institutional allocators. Smaller assets (<200k SF) trade at wider caps because the buyer pool thins out — fewer institutions write checks for $15M assets vs. $75M assets. The subject at 450k SF competes in a deeper market than the 165–200k SF comps, so the size adjustment tightens the cap, not widens it.',
    },
    {
      label: 'Use the raw comp average (6.0%) — size adjustments are too subjective to reliably defend.',
      isBest: false,
      explanation:
        'Size premiums in industrial cap-rate pricing are well-documented and routinely confirmed by appraisers, lenders, and research shops. Calling them subjective understates a market-tested adjustment. Presenting an unadjusted 6.0% would be challenged by any IC participant who actively buys large-format logistics.',
    },
    {
      label: 'Apply a +25 bps widening — larger assets are less liquid and have fewer potential buyers.',
      isBest: false,
      explanation:
        'In residential real estate, larger properties can be less liquid. In institutional industrial, the opposite is true: larger assets attract more institutional capital allocators, not fewer. The liquidity premium is reversed from residential intuition.',
    },
    {
      label: 'Use the smallest comp (Comp 1 at 165k SF) as the floor and add 50 bps for the size gap.',
      isBest: false,
      explanation:
        'Adding 50 bps pushes the subject cap to ~6.5% — the wrong direction. Comp 1 at 165k SF is the thinnest-buyer-pool asset in the set. The 450k SF subject trades in a deeper institutional market and should price tighter, not wider.',
    },
  ],
  takeaway:
    'Industrial size adjustments are directional: larger format = deeper institutional buyer pool = tighter cap. This is the reverse of the common residential-market intuition about large-asset liquidity risk. Class-A logistics assets above 300k SF are among the most institutionally demanded assets in CRE. When comps are materially smaller than the subject, the correct adjustment tightens the cap by 10–25 bps, documented by the buyer-pool depth argument.',
  tips: [
    'Industrial size tiers (rough): <100k SF (local), 100–250k SF (regional), 250k+ SF (institutional). Each tier step → ~10-25 bps tighter cap.',
    'This dynamic is specific to large-format logistics — don\'t apply it to multifamily, office, or retail.',
    'Buyer-pool depth is the mechanism: more potential buyers compete the cap tighter, not wider.',
  ],
};
