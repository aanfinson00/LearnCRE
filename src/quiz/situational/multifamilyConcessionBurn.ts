import type { SituationalCase } from '../../types/situational';

export const multifamilyConcessionBurn: SituationalCase = {
  id: 'multifamily-concession-burn',
  title: 'When do concessions burn off — and what happens to NOI?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'A 200-unit multifamily property is 95% occupied. The current rent roll shows average face rent of $1,800/unit/month, but the operator has been offering 4 weeks free rent on all new leases for the past 8 months. The leases are 12 months. The asset manager is projecting NOI for the next 12 months. The property\'s expenses run $700/unit/month.',
  data: [
    { label: 'Total units', value: '200' },
    { label: 'Occupancy', value: '95% (190 occupied)' },
    { label: 'Face rent', value: '$1,800/unit/month' },
    { label: 'Free rent concession', value: '4 weeks on all new leases (past 8 months)' },
    { label: 'Lease term', value: '12 months' },
    { label: 'Operating expenses', value: '$700/unit/month' },
  ],
  question: 'What is the correct NOI for the forward 12-month period, and how do concessions affect the projection?',
  options: [
    {
      label: 'Use net effective rent (~$1,523/unit/month) as the economic basis — the 4-week free rent reduces actual collected rent by ~15%. As leases burn off the concession cohort, NOI should grow materially if the operator stops offering concessions on renewals.',
      isBest: true,
      explanation:
        '4 weeks free rent on a 12-month lease = 1/13 rent collected. NER = $1,800 × (12/13) ≈ $1,523/unit/month. At 190 occupied units: monthly collected rent ≈ $289,385 vs. face rent of $342,000 — a ~$52K/mo gap. Over 12 months: ~$624K of "invisible" concession cost. As leases signed 8 months ago renew without concessions, collected rent should step up toward face rent. NOI at NER: ($1,523 − $700) × 190 × 12 ≈ $1.875M. NOI at face rent (no concessions): ($1,800 − $700) × 190 × 12 ≈ $2.508M — a $633K gap that burns off over the cohort renewal cycle.',
    },
    {
      label: 'Use face rent of $1,800 — free rent is a timing issue, not an economic one.',
      isBest: false,
      explanation:
        'Free rent is a real economic concession — rent is not collected during the free period. Using face rent in the NOI model overstates actual cash collections by ~$52K/month until the free-rent cohort renews. Lenders and buyers underwrite NER, not face rent, for exactly this reason. Projecting with face rent would overstate NOI by ~$624K over 12 months on this building.',
    },
    {
      label: 'Ignore the concession — it only affects new leases, and 95% of the building is already occupied.',
      isBest: false,
      explanation:
        'The concession was offered for 8 months, meaning a significant fraction of the 190 occupied units are still in their free-rent window. The concession cohort (units leased in the past 8 months) includes up to ~57 units if turnover was 30%/yr. Those leases carry free rent still outstanding; ignoring it understates the cash impact during the projection period.',
    },
    {
      label: 'Increase the concession to burn occupancy up to 97–98% before removing it.',
      isBest: false,
      explanation:
        'Adding more concession to chase a higher occupancy % is a trap if the units already leased are generating below-NER economics. The right question is: will the market support face rent on renewals without a concession? If yes, begin burning the program. Occupancy at 95% is already healthy; concession discipline should take priority over occupancy optimization past 95%.',
    },
  ],
  takeaway:
    'Free rent concessions reduce cash NOI immediately — always model NER, not face rent, for assets with active concession programs. Concession burn-off creates a built-in NOI growth catalyst as leases renew at face rent, but only if market conditions support it. Track the concession cohort separately to forecast the step-up timeline.',
  tips: [
    'NER = face rent × (paid months / total months); for 4 wks free on 12-mo: NER = face × 12/13.',
    'Concession burn-off is only real growth if renewals hold face rent without concessions.',
    'Lenders and appraisers use NER for stabilized NOI — don\'t present a face-rent NOI without flagging it.',
  ],
};
