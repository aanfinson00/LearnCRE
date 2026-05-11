import type { SituationalCase } from '../../types/situational';

export const depreciationRecaptureOnSale: SituationalCase = {
  id: 'depreciation-recapture-on-sale',
  title: 'Depreciation recapture: what does the tax bill actually look like?',
  category: 'investment-thesis',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'mixed',
  scenario:
    "Your fund is selling a stabilized office building owned for 8 years. The acquisition price was $20M; depreciable basis was $18M (the remaining $2M is non-depreciable land). Using a 39-year straight-line schedule, you've accumulated $3.7M in depreciation ($18M ÷ 39 × 8 years ≈ $3.7M). Net sale price is $25M. Your LPs are high-net-worth individuals subject to a 25% depreciation recapture rate and a 20% long-term capital gains rate. The fund GP is preparing the investor distribution memo and wants to communicate the after-tax return accurately.",
  data: [
    { label: 'Purchase price', value: '$20M' },
    { label: 'Depreciable basis', value: '$18M (39-yr SL; $2M land)' },
    { label: 'Accumulated depreciation (8 yrs)', value: '~$3.7M' },
    { label: 'Adjusted basis', value: '$20M − $3.7M = $16.3M' },
    { label: 'Net sale price', value: '$25M' },
    { label: 'Total gain', value: '$8.7M ($25M − $16.3M)' },
    { label: 'Recapture rate', value: '25%' },
    { label: 'LTCG rate', value: '20%' },
  ],
  question:
    'How much of the $8.7M gain is taxed at the 25% recapture rate vs. the 20% LTCG rate, and what is the approximate total tax bill?',
  options: [
    {
      label:
        'The $3.7M of accumulated depreciation is recaptured at 25% ($925K); the remaining $5M of gain is taxed at 20% LTCG ($1M). Total tax: ~$1.925M — a blended effective rate of ~22.1% on the total gain.',
      isBest: true,
      explanation:
        'Section 1250 unrecaptured depreciation (for commercial real estate) is taxed at a maximum 25% rate, not the standard LTCG rate. The recaptured amount is capped at actual accumulated depreciation ($3.7M here). Any gain above the accumulated depreciation — called "Section 1231 gain" ($8.7M − $3.7M = $5M) — is taxed at the standard LTCG rate (20% for most HNW taxpayers). The blended rate of ~22.1% is meaningfully higher than the 20% headline LTCG rate. This is why after-tax IRR can be materially lower than before-tax IRR when significant depreciation has been taken.',
    },
    {
      label: 'The entire $8.7M gain is taxed at the 25% recapture rate. Total tax: ~$2.175M.',
      isBest: false,
      explanation:
        'Incorrect. The 25% recapture rate applies only to the portion of gain equal to accumulated depreciation ($3.7M), not the entire gain. Gain above the depreciation taken is Section 1231 gain taxed at LTCG rates. Applying 25% across the full gain overstates the tax bill by ~$250K in this scenario.',
    },
    {
      label:
        'The entire $8.7M gain is taxed at the 20% LTCG rate because the building was held more than 1 year. Total tax: $1.74M.',
      isBest: false,
      explanation:
        'Incorrect. Long holding period qualifies the gain for LTCG rates, but Section 1250 recapture rules carve out the accumulated depreciation portion and tax it at up to 25%. This is a common error made by buyers who model after-tax returns without separating the recapture tranche — they consistently overstate LP distributions on sale.',
    },
    {
      label:
        'No tax is owed on the gain because the basis was stepped up to market value when the fund acquired the property.',
      isBest: false,
      explanation:
        'Incorrect in this context. Basis step-up occurs at death (for inherited assets under §1014) or in certain partnership transactions — not for standard arm\'s-length acquisitions. The fund bought at $20M; that is the cost basis, reduced each year by the depreciation deduction. There is no automatic step-up on a commercial real estate acquisition.',
    },
  ],
  takeaway:
    "On commercial real estate dispositions, gain is split into two buckets: (1) unrecaptured Section 1250 depreciation — taxed at up to 25% — and (2) Section 1231 gain above the depreciation taken — taxed at the LTCG rate (0/15/20% depending on income). After-tax return models must separate these two tranches or they will overstate LP distributions. The recapture portion is unavoidable unless the exit is structured as a 1031 exchange.",
  tips: [
    'Formula: recapture amount = accumulated depreciation; LTCG amount = total gain − accumulated depreciation.',
    'Commercial real estate uses 39-year straight-line; residential uses 27.5-year — the shorter schedule accelerates the recapture exposure.',
    'A 1031 exchange defers both the recapture and the LTCG — neither is eliminated, just deferred to the replacement property.',
  ],
};
