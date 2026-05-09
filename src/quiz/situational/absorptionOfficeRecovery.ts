import type { SituationalCase } from '../../types/situational';

export const absorptionOfficeRecovery: SituationalCase = {
  id: 'absorption-office-recovery',
  title: 'How long does it take a suburban office market to recover?',
  category: 'absorption',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    "A suburban office submarket has 2.5M SF of total inventory. Physical occupancy is 76%, leaving 600k SF directly vacant. On top of that, tenants are subletting another 150k SF they're not using — so-called shadow vacancy. Net absorption over the past 4 quarters has been +25k SF per quarter (100k SF/yr). You're evaluating a 5-year hold on a building currently 80% leased, with a thesis that the market recovers to 85% occupancy during the hold.",
  data: [
    { label: 'Total inventory', value: '2.5M SF' },
    { label: 'Physical occupancy', value: '76%' },
    { label: 'Physical vacancy', value: '600k SF' },
    { label: 'Shadow vacancy (sublease)', value: '150k SF' },
    { label: 'Net absorption', value: '+25k SF/quarter (100k SF/yr)' },
    { label: 'Target market occupancy', value: '85%' },
  ],
  question: "How long until the market reaches 85% occupied, and how does shadow vacancy affect the math?",
  options: [
    {
      label: "Shadow vacancy extends the timeline materially. Effective total vacancy is 750k SF (600k direct + 150k sublease). Absorbing to 85% on a 2.5M SF base requires clearing 375k SF of effective vacancy. At 100k SF/yr: ~3.75 years — not 2.25 years if you ignore sublease supply.",
      isBest: true,
      explanation:
        "At 85% occupancy on 2.5M SF, 2.125M SF must be leased. Currently 2.5M × 0.76 = 1.9M SF leased — a 225k SF direct gap. But sublease space is available to incoming tenants and absorbs before direct vacancy: tenants lease sublease supply first (typically 15–25% cheaper), which doesn't reduce direct vacancy until the sublease expires. Effective total demand needed: 225k SF direct + 150k SF sublease = 375k SF. At 100k SF/yr: 3.75 years. The 5-year hold barely clears the thesis horizon.",
    },
    {
      label: "About 2.25 years — the market needs 225k SF of net absorption (600k SF direct vacancy minus the 375k SF target) at 100k SF/yr.",
      isBest: false,
      explanation:
        "This ignores shadow vacancy. Sublease space is occupied by the prime tenant but available to subtenants, adding supply that incoming tenants lease first. Until the sublease overhang is consumed, direct vacancy isn't meaningfully reduced. True effective vacancy is 600k + 150k = 750k SF, not just 225k SF below the target.",
    },
    {
      label: "Impossible to project — office recovery depends on return-to-office rates, which are macro-driven and unpredictable.",
      isBest: false,
      explanation:
        "Macro trends drive demand, but absorption math doesn't require macro precision. You work from observed net absorption and project forward with a stated assumption. 'Impossible to project' is deflection. The correct approach: calculate the timeline using current data and flag macro uncertainty as a risk factor — not refuse to model.",
    },
    {
      label: "Never — this office market is structurally impaired and won't recover to 85%.",
      isBest: false,
      explanation:
        "Some office markets are structurally impaired; others recover on a normal cycle. Making a categorical structural judgment without submarket-specific data isn't analysis — it's a narrative. The right answer is to run the absorption math, test whether the hold period is sufficient, and separately assess whether the 85% target is realistic given demand drivers.",
    },
  ],
  takeaway:
    "Shadow vacancy (sublease space) is additive to physical vacancy for recovery math. Sublease supply competes with direct vacancy for the same demand pool and gets absorbed first (at lower rents), delaying direct vacancy recovery. Always compute: effective total vacancy = direct vacancy + sublease availability. Then divide by observed net absorption to get a realistic recovery timeline.",
  tips: [
    "Sublease rents trade 15–25% below direct — tenants lease sublease first if they'll accept shorter terms.",
    "Watch the sublease availability rate as a leading indicator: when it clears, direct rents accelerate.",
    "For market-recovery investment theses, calculate absorption timelines explicitly — don't rely on broker narratives.",
  ],
};
