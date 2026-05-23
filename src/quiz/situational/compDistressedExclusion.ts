import type { SituationalCase } from '../../types/situational';

export const compDistressedExclusion: SituationalCase = {
  id: 'comp-distressed-exclusion',
  title: 'One comp was a forced sale — does it belong in the set?',
  category: 'comp-selection',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'office',
  scenario:
    'You are pricing a Class-B office acquisition in a secondary market. The broker provides four comps. Three are arm\'s-length trades from the past eight months at 7.25–7.75% cap rates. The fourth — same submarket, traded four months ago — was a bank REO sale after the prior owner defaulted, transacting at an 8.75% cap. The broker recommends excluding the REO comp because it "distorts" the market picture.',
  data: [
    { label: 'Comp 1', value: 'Arm\'s length, 4 months ago — 7.25% cap' },
    { label: 'Comp 2', value: 'Arm\'s length, 6 months ago — 7.50% cap' },
    { label: 'Comp 3', value: 'Arm\'s length, 8 months ago — 7.75% cap' },
    { label: 'Comp 4', value: 'REO/bank sale, 4 months ago — 8.75% cap' },
    { label: 'Broker recommendation', value: 'Exclude Comp 4 as distressed' },
  ],
  question: 'How should you handle the REO comp in your pricing analysis?',
  options: [
    {
      label: 'Do not exclude it — document Comp 4 as a distressed sale, anchor your pricing to the 7.25–7.75% arm\'s-length range, and use the 100–150 bps spread over that range as a signal of market liquidity risk in a stress scenario.',
      isBest: true,
      explanation:
        'Excluding a recent same-submarket transaction because it is uncomfortable is motivated reasoning. The REO comp tells you three things: (a) there are distressed sellers in this market, (b) cap rates can clear at 8.75% under liquidity stress — a floor-stress data point, and (c) the spread between distressed and arm\'s-length pricing is roughly 100–150 bps, implying meaningful liquidity risk. A thorough IC memo labels each comp (arm\'s length vs. distressed), anchors pricing to the arm\'s-length set, and documents the distressed comp as a risk context data point. If the broker is pushing hard to exclude a recent transaction, that is a flag — their incentive is to support higher pricing.',
    },
    {
      label: 'Exclude the REO comp — distressed sales are not arm\'s-length transactions and standard appraisal methodology allows their exclusion.',
      isBest: false,
      explanation:
        'USPAP appraisal guidelines do permit exclusion of non-arm\'s-length trades from market-cap-rate analysis. But "allowed to exclude" does not mean "must exclude." From an underwriting perspective, the REO comp is a real transaction at a real price in your submarket four months ago. Ignoring it entirely leaves a gap in your market read and eliminates a useful risk signal. Label it, document it, and use it as context — do not silently remove it.',
    },
    {
      label: 'Average all four comps and use the result — 7.8% is a reasonable midpoint that naturally weights the distressed sale.',
      isBest: false,
      explanation:
        'Averaging non-comparable data without justification blends arm\'s-length and distressed pricing arbitrarily. The 7.8% average has no analytical basis — the REO comp and the arm\'s-length comps reflect fundamentally different seller motivations. A 7.8% anchor would need a specific documented rationale, not a mechanical average, to be defensible in IC.',
    },
    {
      label: 'Price at the wide end of arm\'s-length comps (7.75%) and ignore the REO comp entirely.',
      isBest: false,
      explanation:
        'Using the conservative end of the arm\'s-length range is reasonable pricing discipline, but "ignoring" the REO comp is incomplete analysis. You have set your anchor without acknowledging that a recent same-submarket transaction cleared at 8.75%. A complete IC memo would reference the REO comp, explain why it is excluded from the pricing anchor, and note the liquidity risk it implies for the hold period.',
    },
  ],
  takeaway:
    'Distressed sales should be labeled and noted — not silently excluded. A recent REO trade in your submarket is real market data: it reveals the distressed clearing price, the liquidity risk premium, and the distressed-seller universe. Use arm\'s-length comps to anchor pricing, but document the REO comp as a risk signal and address it explicitly in your IC materials. A broker arguing to exclude a recent trade is often protecting the seller\'s price.',
  tips: [
    'Label each comp: arm\'s length, distressed/REO, portfolio trade, related party. Exclusions require written documentation.',
    'The spread between REO and arm\'s-length cap rates is a market liquidity premium — it informs risk, not just pricing.',
    'Brokers\' comp sets are curated to support their price; check for missing comps (especially distressed ones) that would widen the range.',
  ],
};
