import type { LongformCase } from '../../types/longform';

export const walkMeThroughWaterfall: LongformCase = {
  id: 'walk-me-through-waterfall',
  title: 'Walk me through a 3-tier American waterfall',
  difficulty: 'intermediate',
  roles: ['portfolioMgmt', 'acquisitions'],
  scenario:
    'You\'re in a final-round interview at a real-estate PE shop. The senior partner says: "I want to make sure you actually understand fund economics. Walk me through how a 3-tier American waterfall works for a single deal. Pick your own numbers — small enough to do mental math, real enough to ground the explanation. Tell me what each tier does, why it exists, and where the GP\'s economics come from."',
  question:
    'In 4-6 sentences, walk through the three tiers of an American waterfall on a deal you make up. Address: (1) what each tier does; (2) the order they pay in; (3) why the catch-up tier exists and how it scales; (4) where the GP\'s economic incentive lives — i.e. what dollars are "promote" vs "pro-rata return".',
  modelAnswer: `Take a deal where LP put in $9M and GP put in $1M alongside, 5-year hold, 8% compound pref, 100% catch-up to a 20% promote target, then 80/20 above. Sale generates $20M of cash to distribute. Tier 1 — pref to LP only — pays the LP $9M × ((1.08)^5 − 1) ≈ $4.2M; this is the LP\'s "interest" on capital, calculated and paid first because LPs put up most of the capital and want a baseline yield before the GP earns anything beyond capital return. Tier 2 — return of capital — pays $9M back to LP and $1M back to GP pro-rata; that takes the cash down to $20M − $4.2M − $10M = $5.8M of residual. Tier 3 has two sub-tiers: first, GP catch-up — until GP has 20% of (pref + cat-up), so $4.2M × 0.20/0.80 ≈ $1.05M to GP; second, the above-split residual ($5.8M − $1.05M = $4.75M) goes 80/20, putting another $0.95M to GP. Total GP take = $1M cap + $1.05M cat-up + $0.95M above = $3.0M; pro-rata at 10% co-invest would have been $1M cap + 10% × ($20M − $10M total profit) = $2M. The $1M delta — *dollars beyond pro-rata of profit* — is the promote, and that\'s where the GP\'s real economics come from.`,
  rubric: [
    {
      id: 'three-tiers-named',
      dimension: 'Names all three tiers in the right order (pref → ROC → cat-up + above-split)',
      weight: 1.5,
    },
    {
      id: 'numerical-grounding',
      dimension: 'Picks specific numbers and runs them through; not just abstract description',
      weight: 1.5,
    },
    {
      id: 'catchup-explained',
      dimension: 'Explains why the catch-up tier exists and how the GP target % scales it',
    },
    {
      id: 'promote-vs-prorata',
      dimension: 'Distinguishes "promote dollars" from "pro-rata of profit" cleanly',
      weight: 1.5,
    },
    {
      id: 'pref-as-interest',
      dimension: 'Frames pref as the LP\'s baseline yield (not just as a number)',
    },
    {
      id: 'fluency',
      dimension: 'Comes across as someone who\'s actually computed waterfalls — not memorized definitions',
    },
  ],
  takeaway:
    'The "walk me through a waterfall" question is a fluency test. Senior partners care less about whether you know the tier order and more about whether you can ground it in concrete numbers, distinguish the GP\'s pro-rata cap return from their incentive promote, and articulate *why* each tier exists. Memorized answers without numbers signal you haven\'t done it; sloppy numbers signal you\'ve done it once. Clean numbers + tier-by-tier explanation signals operating fluency.',
  tips: [
    'Always pick your own small numbers ($9M LP / $1M GP / $20M dist) — real-world numbers ground the explanation.',
    'Distinguish "GP capital returned" (pro-rata, every deal) from "GP promote" (incentive, only when deal clears pref). Senior partners listen for this.',
    'The catch-up tier is the GP\'s acceleration to promote economics. Frame it as "100% to GP until they have 20% of (pref + cat-up)" — that phrasing is unambiguous.',
  ],
};
