import type { SituationalCase } from '../../types/situational';

export const renewalOptionPricing: SituationalCase = {
  id: 'renewal-option-pricing',
  title: 'Should you grant a renewal option at FMR or fixed-bump?',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'A 7-year office lease is coming up for renewal. You\'re negotiating the renewal option structure. The tenant wants a 5-year renewal option at Fair Market Rent (FMR), declared 9 months before expiration. Current in-place rent is $32/SF; you believe market rents will be $36–38/SF at the option declaration date based on submarket trends. An alternative is a fixed 10% bump (to $35.20/SF) instead of FMR.',
  data: [
    { label: 'Current in-place rent', value: '$32/SF' },
    { label: 'Projected FMR at renewal', value: '$36–38/SF' },
    { label: 'Fixed-bump alternative', value: '10% over in-place = $35.20/SF' },
    { label: 'Option notice period', value: '9 months prior to expiration' },
    { label: 'Renewal term', value: '5 years' },
  ],
  question: 'From the landlord\'s perspective, which renewal structure is preferable and why?',
  options: [
    {
      label: 'FMR is preferable for the landlord if rents are rising — at $36–38/SF projected, FMR delivers $0.80–$2.80/SF more than the fixed bump. But the landlord also carries the risk that FMR falls below $35.20/SF if the market softens.',
      isBest: true,
      explanation:
        'The renewal option creates an asymmetry: the TENANT will choose to exercise when FMR is below the fixed bump (protecting against rising rents), and will re-negotiate or walk if FMR is above the bump. The landlord benefits from FMR in a rising market (FMR > fixed bump → more rent captured) but loses in a softening market (FMR < fixed bump → tenant exercises at the lower FMR while leaving the landlord with sub-market rent). In the current scenario, with FMR projected at $36–38 vs. fixed $35.20, the landlord captures an extra $0.80–$2.80/SF under FMR — and on 5 years of a multi-thousand SF lease, that adds up materially. The risk: if the market weakens before declaration (9 months out), the tenant may renegotiate or the FMR determination may favor the tenant.',
    },
    {
      label: 'Fixed bump is always better for the landlord — it provides certainty and avoids appraisal disputes.',
      isBest: false,
      explanation:
        'Certainty has value, but only when it\'s higher than the alternative. If FMR is projected at $36–38 vs. the fixed bump at $35.20, the landlord is giving up $0.80–2.80/SF per year of rent in exchange for certainty. On a 5-year renewal, that\'s $4–14/SF of cumulative rent sacrificed. Fixed bumps are preferable in flat or declining markets — not rising ones.',
    },
    {
      label: 'FMR always benefits the tenant — they\'ll only exercise if the market has gone down.',
      isBest: false,
      explanation:
        'This is backwards. FMR benefits the tenant when market rents are BELOW the contractual rent (tenant exercises to get a lower rate). It benefits the landlord when market rents are ABOVE the fixed bump (landlord receives more than the bump). The direction of the benefit depends entirely on where FMR lands relative to the fixed alternative. Neither structure universally favors one party.',
    },
    {
      label: 'It doesn\'t matter — either way the tenant has the optionality, so the landlord can\'t do better than whichever the tenant prefers.',
      isBest: false,
      explanation:
        'The landlord can negotiate WHICH option to offer. If FMR is projected above the fixed bump, the landlord should prefer FMR and push back against a fixed bump. If FMR is projected below the fixed bump, the landlord prefers the fixed bump. The option structure is a negotiating lever, not a constraint.',
    },
  ],
  takeaway:
    'Renewal option structure is a negotiating lever with asymmetric economics. FMR options benefit the landlord in rising markets and the tenant in declining markets; fixed-bump options do the opposite. The party with the better rent forecast should push for the structure that matches their view. When projected FMR exceeds the fixed-bump equivalent (as here), the landlord should argue for FMR — and the tenant should argue for the fixed bump. Always model the NPV delta at your projected FMR before accepting or rejecting the tenant\'s proposed structure.',
  tips: [
    'FMR vs. fixed bump: the higher-rent party benefits from FMR; the lower-rent party benefits from fixed.',
    'Tenants with rising-market fear ask for FMR floors; landlords with rising-market conviction also want FMR.',
    'Always price the renewal option: NPV of (fixed bump rent) vs. NPV of (projected FMR). The delta is real money.',
  ],
};
