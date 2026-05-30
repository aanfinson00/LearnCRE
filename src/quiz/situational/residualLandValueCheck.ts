import type { SituationalCase } from '../../types/situational';

export const residualLandValueCheck: SituationalCase = {
  id: 'residual-land-value-check',
  title: 'Does the land price make sense for this development?',
  category: 'diagnostic',
  difficulty: 'advanced',
  roles: ['development', 'acquisitions'],
  assetClass: 'mixed',
  scenario:
    'A developer is evaluating a land site for a 200,000 SF ground-up office development. The seller is asking $10M for the land. The developer\'s pro forma shows: stabilized NOI of $3.2M at a 6.5% market cap rate, hard and soft construction costs of $280/SF, a 7% developer profit on cost, and an 18-month construction period with a 12-month lease-up. The developer uses a 10% return on cost as the project hurdle.',
  data: [
    { label: 'Buildable area', value: '200,000 SF' },
    { label: 'Stabilized NOI', value: '$3,200,000' },
    { label: 'Market exit cap rate', value: '6.5%' },
    { label: 'Hard + soft construction costs', value: '$280/SF' },
    { label: 'Developer profit on cost', value: '7%' },
    { label: 'Return on cost hurdle', value: '10%' },
    { label: 'Land ask', value: '$10,000,000' },
  ],
  question: 'Does the land price make sense, and what is the residual land value implied by the pro forma?',
  options: [
    {
      label: 'The land is overpriced at $10M — the residual land value implied by the pro forma is approximately $5–6M. At $10M, the all-in cost exceeds what the development return on cost hurdle supports.',
      isBest: true,
      explanation:
        'Stabilized value: $3.2M NOI ÷ 6.5% cap = $49.2M. Developer profit at 7%: $49.2M × 7% = $3.4M. Construction costs: $280/SF × 200,000 = $56M. Residual land value = Stabilized value − Construction costs − Developer profit = $49.2M − $56M − $3.4M = negative. That means at the stabilized value and cost structure given, there is no room for land cost at all, let alone $10M. Alternatively using ROC: required stabilized NOI = $56M × 10% = $5.6M; actual NOI is $3.2M — the costs alone exceed what the hurdle supports. Land can only carry value if the NOI assumption is significantly higher or construction costs fall. At $10M land, total cost = $56M + $10M = $66M; ROC = $3.2M ÷ $66M = 4.8% — well below the 10% hurdle.',
    },
    {
      label: 'The land price is fine — $10M on a 200,000 SF project is only $50/SF of land cost, which is typical.',
      isBest: false,
      explanation:
        '$50/SF of land cost sounds reasonable in isolation, but the economics of the deal don\'t support it. The correct test is residual land value, not a $/SF benchmark. Residual land value = exit value − construction costs − developer profit; if that\'s less than the ask, the land is overpriced regardless of how the $/SF looks.',
    },
    {
      label: 'Accept the land at $10M and increase the rent assumption to close the gap.',
      isBest: false,
      explanation:
        'Backing into a required rent from a land price that already doesn\'t work is reverse engineering the pro forma. The correct discipline is to derive the residual land value from supportable rents and market cap rates, then negotiate the land price down to that figure. If the land can\'t be acquired at residual value, the deal doesn\'t work.',
    },
    {
      label: 'The return on cost of ~4.8% is only a little below 10% — negotiate a small concession.',
      isBest: false,
      explanation:
        'A 4.8% return on cost vs. a 10% hurdle is not "a little below" — it is less than half the hurdle. This indicates a fundamental economics mismatch, not a negotiation gap. A $5M land price reduction would bring ROC to: $3.2M ÷ $61M ≈ 5.2% — still well below the 10% hurdle. The deal requires either much lower construction costs, much higher NOI, or a land price of approximately $0.',
    },
  ],
  takeaway:
    'Residual land value = Stabilized exit value − Total hard/soft costs − Developer profit. If the residual is less than the ask, the land is overpriced from a development economics standpoint. Never anchor to $/SF land benchmarks without running the residual — the residual is the only number that tells you whether the project works.',
  tips: [
    'Residual land = (NOI ÷ exit cap) − hard/soft costs − developer profit.',
    'Return on cost = stabilized NOI ÷ total all-in cost (including land); hurdle typically 10–12%.',
    'If ROC < hurdle with $0 land, the construction cost or exit cap doesn\'t support the market.',
  ],
};
