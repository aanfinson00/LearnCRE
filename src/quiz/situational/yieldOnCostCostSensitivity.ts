import type { SituationalCase } from '../../types/situational';

export const yieldOnCostCostSensitivity: SituationalCase = {
  id: 'yield-on-cost-cost-sensitivity',
  title: 'Construction bids came in 8% over — does the multifamily development still work?',
  category: 'sensitivity',
  difficulty: 'beginner',
  roles: ['development', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You are underwriting a 300-unit multifamily development. Total project cost is $90M ($300,000/unit). Stabilized NOI is $5,400,000, giving a 6.0% yield-on-cost. The development spread is 75 bps above the market cap rate of 5.25%. Construction bids just came in 8% above estimate, adding $7,200,000 to total project cost.',
  data: [
    { label: 'Units', value: '300' },
    { label: 'Original total cost', value: '$90,000,000 ($300k/unit)' },
    { label: 'Stabilized NOI', value: '$5,400,000' },
    { label: 'Original yield-on-cost', value: '6.0%' },
    { label: 'Market cap rate', value: '5.25%' },
    { label: 'Original development spread', value: '75 bps' },
    { label: 'Construction overrun', value: '+8% → +$7,200,000 → new total cost: $97,200,000' },
  ],
  question: 'What is the new yield-on-cost and development spread, and does the deal still pencil?',
  options: [
    {
      label:
        'New YOC: $5,400,000 ÷ $97,200,000 = 5.56%. New spread: 5.56% − 5.25% = 31 bps. Down from 75 bps. Most development underwriting targets a minimum spread of 100–150 bps to compensate for execution risk, lease-up risk, and exit cap uncertainty. At 31 bps, there is almost no cushion — a 25 bps exit cap widening or a 5% NOI miss would put the deal below a stabilized acquisition return. The deal likely fails the return hurdle as currently underwritten.',
      isBest: true,
      explanation:
        'YOC = Stabilized NOI ÷ Total Cost. When cost rises from $90M to $97.2M and NOI stays fixed, YOC falls from 6.0% to 5.56%. The development spread is YOC minus the market cap rate — that cushion compensates for the development risk premium (lease-up, construction execution, time). 31 bps is thin to the point where buying a stabilized asset at a 5.25% cap may offer a better risk-adjusted return than building at a 5.56% YOC. Re-underwrite with higher rents or lower cost before proceeding.',
    },
    {
      label:
        'The yield-on-cost stays at 6.0% — cost overruns do not affect YOC because NOI did not change.',
      isBest: false,
      explanation:
        'YOC = NOI ÷ Total Cost. If cost rises, YOC falls — even if NOI is unchanged. The denominator increased by $7.2M, so the ratio compresses. YOC does not "stay" at the original level when costs change.',
    },
    {
      label:
        'Raise rents by 5% to offset the cost increase and keep the yield-on-cost at 6.0%.',
      isBest: false,
      explanation:
        'That is a different assumption change — not a sensitivity on the original underwriting. To keep YOC at 6.0% on $97.2M of cost, you need $97.2M × 6.0% = $5,832,000 of NOI — an 8% NOI increase, roughly consistent with a 5% rent increase net of vacancy and expenses. But the question is whether current market rents support that level. You cannot simply assume higher rents; you must test whether the market will bear them.',
    },
    {
      label:
        'An 8% overrun is within the contingency range and does not require re-underwriting.',
      isBest: false,
      explanation:
        'That logic only works if the contingency was already built into the original $90M. If the $90M included a standard 5–10% contingency and bids came in 8% over that, the overrun is real and the total cost is genuinely $97.2M. Even if contingency partially absorbs it, any cost increase above contingency compresses YOC and the development spread. Always re-underwrite when costs exceed the original budget.',
    },
  ],
  takeaway:
    'Yield-on-cost is the core development return metric. Development spread = YOC − market cap rate. Most institutional sponsors require 100–150 bps minimum spread to compensate for construction and lease-up risk. An 8% cost overrun on a deal with a 75 bps initial spread is potentially deal-breaking. Run cost sensitivities at +5%, +10%, and +15% before IC and know the spread at each level.',
  tips: [
    'YOC = stabilized NOI ÷ total project cost. Development spread = YOC − market cap rate.',
    'Minimum development spread targets: core/core-plus markets 75–100 bps; value-add markets 125–175 bps.',
    'If the spread falls below ~75 bps, a stabilized acquisition at the market cap rate may offer a better risk-adjusted return.',
  ],
};
