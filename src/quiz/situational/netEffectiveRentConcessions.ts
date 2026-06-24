import type { SituationalCase } from '../../types/situational';

export const netEffectiveRentConcessions: SituationalCase = {
  id: 'net-effective-rent-concessions',
  title: 'Face rent is $52 — what is the deal actually worth?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A tenant signs a 7-year office lease at $52/SF face rent with 3% annual bumps. The deal includes 12 months of free rent in years 1–2 (6 months each) and a $75/SF tenant improvement allowance. Your in-place rents average $44/SF. The broker markets the deal as "12% above in-place rents at signing."',
  data: [
    { label: 'Face rent', value: '$52/SF, 3% annual bumps' },
    { label: 'Free rent', value: '12 months over first 2 years' },
    { label: 'TI allowance', value: '$75/SF' },
    { label: 'Lease term', value: '7 years' },
    { label: 'In-place average rent', value: '$44/SF' },
  ],
  question: 'How do you evaluate whether this is a good deal vs. the broker\'s "12% above in-place" framing?',
  options: [
    {
      label:
        'Calculate net effective rent (NER): total rent collected over the term minus TI cost, spread over the full term in SF. The NER will be materially below $52/SF and likely below in-place rents when TI is properly amortized.',
      isBest: true,
      explanation:
        'NER = (total scheduled rent − TI allowance) ÷ total SF-years. Total rent: $52 × (1.03^0 + 1.03^1 + ... 7 years) × 1 SF ≈ $52 × 7.66 ≈ $398/SF. Subtract 12 months of free rent (assume straight-line average over bumps ≈ $55/SF avg × 1yr lost = −$55/SF). Subtract TI allowance: −$75/SF. Net proceeds: $398 − $55 − $75 = $268/SF over 7 SF-years → NER ≈ $38.30/SF. This is BELOW the in-place average of $44/SF. The "12% above in-place" framing is face rent only — it ignores the full concession package. Any deal with meaningful free rent and a large TI should be evaluated on NER, not face rent.',
    },
    {
      label:
        'The broker is right — face rent above in-place is what drives NOI and therefore value. TI is a capex item, not a rent item.',
      isBest: false,
      explanation:
        'TI is a landlord outlay that reduces the effective economics of the lease. Separating it from "rent" is an accounting convenience, not economic reality. If the landlord spent $75/SF to sign a $52/SF lease, the actual yield on the lease is the $52/SF income stream net of the $75/SF investment plus the free-rent months lost. Presenting only face rent overstates the deal economics. Cap-rate buyers will haircut for concession packages on stabilized properties.',
    },
    {
      label:
        'Evaluate by IRR — discount the full cash flow stream (rent, free rent, TI payment) at the WACC to see if the deal is accretive.',
      isBest: false,
      explanation:
        'IRR is technically correct but operationally overkill for a single lease decision. The industry standard for lease comparison is NER: it\'s a quick, intuitive metric that normalizes face rents across different concession structures. IRR is used for fund-level return analysis; NER is the right metric for lease vs. lease comparison. If you\'re comparing a 7-yr lease with 12 months free + $75 TI vs. a 5-yr lease with 6 months free + $40 TI, NER makes the comparison clean.',
    },
    {
      label:
        'Accept the deal — any new lease above in-place rent improves NOI and cap-rate valuation.',
      isBest: false,
      explanation:
        'Face rent above in-place improves the rent roll optics, but if NER is below in-place, the deal destroys value relative to rolling at in-place rents with lower concessions. A buyer applying a cap rate to the new face rent will appear to gain value — but the TI was a use of capital that erodes actual returns. Track NER, not face rent, to make honest leasing decisions.',
    },
  ],
  takeaway:
    'Face rent and net effective rent (NER) diverge whenever concessions (free rent, TI, moving allowances) are present. NER is the only apples-to-apples comparison across leases with different structures. A $52/SF face rent deal with aggressive concessions can easily underperform a $44/SF renewal with no concessions. Always run the NER calculation before calling a lease a "win."',
  tips: [
    'NER formula: (total scheduled rent − TI − free rent value) ÷ lease term in years.',
    'A quick proxy: $1/SF TI ≈ $0.12/SF annual NER reduction on a 7-year lease.',
    '12 months of free rent on a 7-year term reduces NER by ~14% of face (1/7th of the scheduled income).',
  ],
};
