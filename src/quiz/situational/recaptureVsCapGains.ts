import type { SituationalCase } from '../../types/situational';

export const recaptureVsCapGains: SituationalCase = {
  id: 'recapture-vs-cap-gains',
  title: 'Exit tax math: your depreciation bill is bigger than you think',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['acquisitions', 'assetManagement', 'portfolioMgmt'],
  scenario:
    'You are advising on the sale of a $15M office building held for 9 years. Original purchase price: $11M. Cumulative straight-line depreciation taken: $3.6M (39-yr commercial schedule). Net adjusted basis: $7.4M. Sale price: $15M. Federal recapture rate: 25%; federal LTCG rate: 20%. State income tax: 5% (applies to both components). Ignore NIIT for simplicity.',
  data: [
    { label: 'Original price', value: '$11M' },
    { label: 'Depreciation taken (9 yrs, 39-yr sched)', value: '$3.6M' },
    { label: 'Adjusted basis', value: '$7.4M ($11M − $3.6M)' },
    { label: 'Sale price', value: '$15M' },
    { label: 'Total gain', value: '$7.6M ($15M − $7.4M)' },
    { label: 'Recapture rate (federal)', value: '25%' },
    { label: 'LTCG rate (federal)', value: '20%' },
    { label: 'State rate (both)', value: '5%' },
  ],
  question: 'What is the correct after-tax net on this sale, and what does this imply for the 1031 decision?',
  options: [
    {
      label:
        'Total gain = $7.6M, split into $3.6M recapture @ 30% combined (25% federal + 5% state) = $1.08M, and $4.0M LTCG @ 25% combined (20% + 5%) = $1.0M. Total tax ≈ $2.08M; net proceeds ≈ $12.92M. A 1031 defers both components — it does not eliminate them.',
      isBest: true,
      explanation:
        'The gain splits at the depreciation line: every dollar of depreciation previously deducted is "recaptured" at the 25% federal Sec 1250 rate (not the 20% LTCG rate) on sale, plus state. The remaining appreciation above original cost is LTCG. On this deal, $3.6M of recapture @ 30% = $1.08M and $4.0M of appreciation @ 25% = $1.0M, totaling ~$2.08M in taxes. A 1031 exchange defers this entire $2.08M but does not eliminate it — the deferred gain carries into the replacement property\'s basis and is due when that property is eventually sold without exchange (or eliminated via estate step-up at death). For an owner with no estate-planning intent and a clean redeployment opportunity, the $2.08M deferral compounds for years of additional return.',
    },
    {
      label:
        'Recapture only applies if you took bonus depreciation — straight-line depreciation on commercial property is not subject to Sec 1250 recapture.',
      isBest: false,
      explanation:
        'Wrong. Sec 1250 recapture applies to all depreciation taken on real property, including straight-line. Bonus depreciation on shorter-life cost-segregated components would actually be recaptured at ordinary income rates (potentially higher than 25%) — the 25% Sec 1250 rate is the *floor* for recapture on regular real property depreciation.',
    },
    {
      label:
        'The entire $7.6M gain is taxed at the long-term cap-gains rate — recapture is an accounting distinction, not a separate tax rate.',
      isBest: false,
      explanation:
        'Materially wrong on the rate. Recapture is taxed at 25% federal; LTCG at 20%. On $3.6M of recapture, the difference is $180k in federal taxes alone ($3.6M × 5%). In a larger portfolio this adds up to real money and changes the economics of a 1031 exchange.',
    },
    {
      label:
        'A 1031 exchange permanently eliminates the recapture — you never owe the $1.08M.',
      isBest: false,
      explanation:
        '1031 defers recapture, it does not eliminate it. The deferred recapture reduces the replacement property\'s adjusted basis. It is eventually due when the replacement property is sold (without exchange) or eliminated via step-up in basis at death. Calling it permanent elimination is wrong unless the owner holds to death.',
    },
  ],
  takeaway:
    'At exit, gain splits at the depreciation line: recapture (previously deducted depreciation) is taxed at 25% federal — not the 20% LTCG rate. A 9-year hold on commercial real estate can produce a recapture bill that rivals the appreciation component. A 1031 defers both, but the tax doesn\'t disappear — it follows the basis into the replacement property. Know both the rate and the mechanics before advising a client to "just sell."',
  tips: [
    'Adjusted basis = cost − all depreciation taken. On a 39-yr commercial schedule, you lose ~2.56% of depreciable basis per year.',
    'Recapture rate = 25% federal (not 20%). On $3.6M of depreciation, that\'s $900k federal — not a rounding error.',
    '1031 defers; step-up at death eliminates. If the owner\'s horizon is multi-generational, deferral may be permanent in practice.',
  ],
};
