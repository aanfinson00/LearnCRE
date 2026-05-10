import type { SituationalCase } from '../../types/situational';

export const officeNerCompNormalization: SituationalCase = {
  id: 'office-ner-comp-normalization',
  title: 'Gross vs. NNN lease comps — how do you compare them?',
  category: 'comp-selection',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    'You are benchmarking rents for a 50,000 SF Class-B office building to underwrite a new lease for a 10,000 SF tenant. Three recent lease comps are available in the submarket, but they are structured differently. Operating expenses for your building run $14/SF. You need to determine a net effective rent (NER) that is apples-to-apples for underwriting.',
  data: [
    { label: 'Comp 1', value: 'Full-service gross, $38/SF face rent, $2/SF free rent (month 1–6), $0 TI' },
    { label: 'Comp 2', value: 'Modified gross (landlord pays base-year expenses of $13/SF), $28/SF face, $0 free rent, $40/SF TI over 10-yr term' },
    { label: 'Comp 3', value: 'NNN (tenant pays all expenses), $22/SF face, $0 free, $30/SF TI over 5-yr term' },
    { label: 'Your building OpEx', value: '$14/SF/year (full-service equivalent)' },
    { label: 'Market TI amortization rate', value: '7% over lease term' },
  ],
  question:
    'Which comp best approximates a true NER on a full-service gross basis, and how do you normalize them to compare?',
  options: [
    {
      label: 'Convert all comps to NER on a full-service gross basis: subtract expense loads, amortize TI, and haircut free rent. Comp 1 ≈ $35/SF NER; Comp 2 ≈ $27/SF NER (gross-up for $1/SF expense gap); Comp 3 needs $14/SF expense gross-up → NER ≈ $30/SF. Use all three with documented adjustments; range $27–$35 FSG equivalent.',
      isBest: true,
      explanation:
        'NER normalization requires three steps: (1) gross-up NNN/MG rents by adding the landlord expense load to get to full-service equivalent; (2) subtract amortized TI from face rent (TI/term × amortization rate reduces effective landlord yield); (3) haircut free rent on a time-value basis. Comp 1: free rent haircut = $2/SF × 6/12 ÷ 10yr ≈ $0.10/yr drag → NER ≈ $37.9/SF FSG. Comp 2: $28 + ($14−$13) gross-up − $40 TI amortized at 7% ÷ 10yr = $28 + $1 − $2.8 = $26.2/SF FSG. Comp 3: $22 + $14 − $30 × 7% ÷ 5yr = $22 + $14 − $4.2 = $31.8/SF FSG. Even approximate normalization is better than comparing gross vs. NNN face rents directly.',
    },
    {
      label: 'Use Comp 1 only — it is already full-service gross like your building, so no adjustments are needed.',
      isBest: false,
      explanation:
        'Comp 1 still has free rent that must be amortized to get to NER. More importantly, using a single comp is analytically weak. Comps 2 and 3 carry useful market signal once normalized — ignoring them because their lease structure differs is comp-avoidance, not comp discipline.',
    },
    {
      label: 'Face rent is the right comparison metric — TI and free rent are negotiating tactics, not value indicators.',
      isBest: false,
      explanation:
        'TI and free rent are real economics that reduce landlord yield and effective rent. A $38/SF lease with 18 months free rent and $80/SF TI has substantially lower NER than a $32/SF lease with no concessions. Ignoring them systematically overstates market rent.',
    },
    {
      label: 'Convert everything to NNN — it is the cleanest comparison because it removes expense variability.',
      isBest: false,
      explanation:
        'Converting to NNN is also valid, but requires knowing the expense load for each comp\'s building, which often differs from your own. Converting to full-service gross using your building\'s known OpEx is equally clean and produces a number directly usable for your NOI underwriting. Either method works; what matters is consistency and documentation.',
    },
  ],
  takeaway:
    'Office lease comps are only comparable after normalizing for lease structure, expense load, TI, and free rent. NER (net effective rent) on a consistent basis — either all-in FSG or all-in NNN — is the correct metric. Face rent comparisons across mixed lease structures mislead underwriting.',
  tips: [
    'NER formula (simplified): Face Rent − (TI ÷ lease term × amortization rate) − (Free Rent ÷ lease term). Adjust for expense structure separately.',
    'In soft markets, TI and free rent concessions rise before face rent falls — NER diverges from face rent most in down cycles.',
    'Always document your expense assumption: if you gross-up a NNN comp, note what OpEx rate you used and confirm it against your building.',
  ],
};
