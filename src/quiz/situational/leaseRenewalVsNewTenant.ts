import type { SituationalCase } from '../../types/situational';

export const leaseRenewalVsNewTenant: SituationalCase = {
  id: 'lease-renewal-vs-new-tenant',
  title: 'Renew at a discount or hold out?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'A tenant\'s lease expires in 6 months. They offer a 5-year renewal at $30/SF with $10/SF TI. Marketing the space to a new tenant could get $33/SF with $45/SF TI, a 6% leasing commission on total rent, and an expected 9 months of downtime. Compare both over the 5 years after expiry.',
  data: [
    { label: 'Renewal', value: '$30/SF · $10 TI · no downtime' },
    { label: 'New tenant', value: '$33/SF · $45 TI · 6% commission' },
    { label: 'Downtime (new)', value: '9 months' },
    { label: 'Horizon', value: '5 years after expiry' },
  ],
  question: 'Which path looks better over the 5-year horizon?',
  options: [
    {
      label: 'Renewal — about $140/SF net vs about $85/SF for the new tenant, despite the lower face rent.',
      isBest: true,
      explanation:
        'Renewal: 30 × 5 = 150, less 10 TI = 140. New tenant: 9 months of downtime leaves 4.25 years of rent: 33 × 4.25 ≈ 140, less 45 TI and ~$10 commission (6% × 165) ≈ 85. The new-tenant rent premium of $3/SF (~$15 over 5 years) is far smaller than the downtime, TI and commission costs.',
    },
    {
      label: 'New tenant — $33 rent beats $30.',
      isBest: false,
      explanation:
        'A $3/SF premium is dwarfed by $60+/SF of downtime, TI and commission costs.',
    },
    {
      label: 'They are equivalent once you adjust for risk.',
      isBest: false,
      explanation:
        'The gap is too large for risk adjustment to close; the renewal wins even before considering tenant credit.',
    },
    {
      label: 'Neither; leave it vacant and wait for a better market.',
      isBest: false,
      explanation:
        'Waiting adds downtime cost with no evidence of better economics.',
    },
  ],
  takeaway:
    'Renewals usually beat re-tenanting on economics because downtime, TI and commissions are avoided. Compare total net cash over the same horizon.',
  tips: [
    'Put downtime and carry costs on the new-tenant side.',
    'Hold-out leverage works only if there is a credible alternative.',
    'Re-leasing costs scale with term and TI/SF.',
  ],
};
