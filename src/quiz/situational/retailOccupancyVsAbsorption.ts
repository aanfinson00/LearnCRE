import type { SituationalCase } from '../../types/situational';

export const retailOccupancyVsAbsorption: SituationalCase = {
  id: 'retail-occupancy-vs-absorption',
  title: 'The center is 91% leased but tenants keep failing — what\'s the real story?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'retail',
  scenario:
    'A regional power center reports 91% occupancy on 400,000 SF total. Over the trailing 12 months, 3 tenants totaling 22,000 SF opened and closed (move-in then go dark), while 18,000 SF of new tenants signed and took occupancy. The remaining 9% dark space (36,000 SF) consists of two former anchor boxes vacant for over 2 years.',
  data: [
    { label: 'Total SF', value: '400,000' },
    { label: 'Reported occupancy', value: '91% (364,000 SF on lease)' },
    { label: 'Gross new signings (12 mo)', value: '18,000 SF' },
    { label: 'Tenant failures (12 mo)', value: '22,000 SF opened and closed' },
    { label: 'Long-term dark space', value: '36,000 SF (two anchor boxes, 2+ yrs vacant)' },
  ],
  question: 'How do you interpret the occupancy figure when underwriting this center?',
  options: [
    {
      label:
        'Reported occupancy overstates health: net effective leasing is −4,000 SF (tenants failing faster than new ones open), and the anchor vacancies may trigger co-tenancy clauses that let inline tenants reduce rent or exit. Underwrite at 85–87% economic occupancy after adjusting for likely co-tenancy relief.',
      isBest: true,
      explanation:
        'Two problems compound here. First, the gross leasing velocity (18k SF) is below the failure rate (22k SF), meaning net absorption is negative inside the center even at 91% reported occupancy. Second, long-term anchor boxes frequently trigger co-tenancy clauses in inline leases — common retail lease language allows inline tenants to pay percentage-rent-only or terminate if a named anchor goes dark for 6–12 months. Underwriting at reported occupancy ignores both the churn signal and the co-tenancy exposure. Adjust economic occupancy down and model the inline rent relief.',
    },
    {
      label:
        '91% is 91% — the leases are signed and rent is contractually due regardless of tenant performance.',
      isBest: false,
      explanation:
        "Leases are contracts but tenants can go bankrupt, go dark while paying (zombie stores), or trigger co-tenancy clauses. A 91% leased center with tenants systematically failing is functionally weaker than the occupancy figure implies. Economic occupancy (rent actually collected and space actually generating sales) is what buyers and lenders underwrite, not the signed-lease rate.",
    },
    {
      label:
        'Strip the anchor boxes from the denominator since anchors are always vacant and irrelevant to inline performance — the inline rate is effectively 95%.',
      isBest: false,
      explanation:
        "Anchor vacancies are not irrelevant — they are typically the primary co-tenancy trigger. Removing them from the denominator creates an artificially healthy inline rate and obscures the main risk driver. Anchor boxes that have been dark 2+ years represent structural demand impairment, not a routine temporary gap.",
    },
    {
      label:
        'High turnover is normal in retail; model flat occupancy going forward since the center will backfill naturally.',
      isBest: false,
      explanation:
        "Flat-occupancy assumptions require a positive or neutral net absorption trend. Here, net absorption is negative (failures > new signings). Assuming natural backfill ignores the evidence in front of you. Project forward occupancy as a function of observed leasing velocity and failure rate, not as a mean-reversion to a headline figure.",
    },
  ],
  takeaway:
    'Reported occupancy in retail is a signed-lease rate, not a health indicator. Check net absorption inside the center (new signings minus terminations/failures), the age and character of dark space, and the co-tenancy clause exposure in inline leases. A center that is simultaneously 91% leased and posting negative internal absorption has structural demand problems that go far beyond a headline number.',
  tips: [
    'Request the trailing 12-month tenant-move-out report alongside the rent roll — failures hide in occupancy data.',
    'Co-tenancy clauses name the anchor; confirm which anchors are named before sizing the exposure.',
    'A center losing inline tenants 18 months after an anchor vacancy is a lagging indicator — the damage started earlier.',
  ],
};
