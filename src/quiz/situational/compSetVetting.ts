import type { SituationalCase } from '../../types/situational';

export const compSetVetting: SituationalCase = {
  id: 'comp-set-vetting',
  title: 'Which comps belong in this set?',
  category: 'comp-selection',
  difficulty: 'beginner',
  roles: ['acquisitions'],
  assetClass: 'industrial',
  scenario:
    'You\'re pricing a 200,000 SF Class-B industrial asset in a major distribution submarket. The broker provides 5 trade comps to support pricing. You need to vet each before averaging the cap rates.',
  data: [
    { label: 'Comp 1', value: 'Same submarket, traded 4 mos ago, similar size — 6.0% cap' },
    { label: 'Comp 2', value: 'Different submarket (50 mi away), traded 6 mos ago — 5.25% cap' },
    { label: 'Comp 3', value: 'Same submarket, traded 18 mos ago (pre-rate-hike) — 4.5% cap' },
    { label: 'Comp 4', value: 'Same submarket, traded 2 mos ago, smaller (75k SF) — 6.25% cap' },
    { label: 'Comp 5', value: 'Same submarket, traded 8 mos ago, similar size — 5.85% cap' },
  ],
  question: 'How should you treat the comp set?',
  options: [
    {
      label: 'Discard Comp 2 (different submarket) and Comp 3 (different rate environment); use Comps 1, 4, and 5 — average ~6.0% with a small adjustment for Comp 4\'s smaller size.',
      isBest: true,
      explanation:
        'Comp 2 is a different geography, so the cap reflects a different supply/demand profile. Comp 3 traded under materially different cost-of-capital — 18 months ago Treasuries were 200+ bps lower, so the 4.5% cap is irrelevant to today\'s pricing. Comps 1, 4, 5 are recent, same submarket, comparable product. Comp 4\'s smaller size warrants a small upward cap adjustment (smaller = thinner buyer pool = wider cap).',
    },
    {
      label: 'Average all 5 caps and use the result — that\'s why the broker provided 5.',
      isBest: false,
      explanation:
        'Averaging unfiltered comps gives 5.6%, ~40 bps tighter than the defensible answer. The off-submarket and stale comps drag the average artificially low. A bid built on this number would lose discipline; a bid built on 6.0% would either win at fair value or lose to someone underwriting cleanly.',
    },
    {
      label: 'Discard everything except Comp 1 — only one comp is truly "same vintage, same submarket, recent".',
      isBest: false,
      explanation:
        'A sample size of 1 is too thin to support pricing. Comps 4 and 5 are usable with minor adjustments (size, time). The principle isn\'t "perfect comps only" — it\'s "comps where you can defend the bridge from observed price to subject price". 3 reasonable comps beats 1 perfect comp.',
    },
    {
      label: 'Trust the broker\'s sourcing — they would have filtered out bad comps already.',
      isBest: false,
      explanation:
        'The broker\'s incentive is to support the highest defensible price. Comps that pull the cap tighter (like the 4.5% pre-rate-hike trade) are more likely to be included even when they shouldn\'t be. Vetting comps yourself is a core part of acquisition diligence, not a redundancy.',
    },
  ],
  takeaway:
    'Comp filtering protects the cap rate anchor. Any comp older than ~12 months in a moving rate environment, or any comp from a different submarket, deserves a discard or a documented adjustment. The remaining 3 should be enough; if not, you don\'t have enough data to support a tight pricing recommendation — which is itself a useful conclusion.',
  tips: [
    'Discard rule of thumb: >12 mos in a moving rate environment, or different submarket.',
    'Smaller assets generally trade at wider caps (thinner buyer pool).',
    'If you have <3 defensible comps, widen the pricing range and say so.',
  ],
};
