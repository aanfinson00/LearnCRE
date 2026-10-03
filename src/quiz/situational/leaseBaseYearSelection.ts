import type { SituationalCase } from '../../types/situational';

export const leaseBaseYearSelection: SituationalCase = {
  id: 'lease-base-year-selection',
  title: 'Why does the base year matter?',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You are negotiating a full-service office lease. The tenant asks for a base year of the lease commencement year. Your building is 70% occupied now but will be 95% next year after other lease-ups, and operating expenses are expected to rise as occupancy rises (more utilities, janitorial, and so on). Real estate taxes are expected to rise from a pending reassessment.',
  data: [
    { label: 'Current occupancy', value: '70%' },
    { label: 'Expected occupancy next year', value: '95%' },
    { label: 'Pending tax reassessment', value: 'Yes, next year' },
  ],
  question: 'What should the landlord push for?',
  options: [
    {
      label: 'A gross-up provision that normalizes base-year expenses to ~95% occupancy, and consider a later base year given the pending reassessment.',
      isBest: true,
      explanation:
        'Without gross-up, base-year variable expenses are low because the building is only 70% occupied, so the tenant gets a low base and the landlord absorbs the increase as occupancy rises. A gross-up adjusts variable expenses to a standard occupancy. A base year set before the reassessment lets taxes flow through to the tenant as an increase over base.',
    },
    {
      label: 'Agree to the base year as requested; it\'s standard.',
      isBest: false,
      explanation:
        'Standard doesn\'t mean without risk. A low-occupancy base year with no gross-up shifts predictable cost growth to the landlord.',
    },
    {
      label: 'Demand a triple-net lease instead.',
      isBest: false,
      explanation:
        'A change in lease structure is a larger negotiation, and the tenant may not accept it. The specific problems here can be solved within the full-service structure.',
    },
    {
      label: 'Set the base year as the prior year to maximize pass-throughs.',
      isBest: false,
      explanation:
        'Landlord-friendly in theory, but a tenant\'s counsel will resist an arbitrary earlier year and the market is unlikely to accept it.',
    },
  ],
  takeaway:
    'In a full-service lease, the base year and gross-up determine who bears expense growth. Low-occupancy base years without gross-up hand the landlord a cost they can\'t recover.',
  tips: [
    'Gross-up applies only to variable expenses.',
    'Taxes are generally not grossed up but are affected by reassessment timing.',
    'Model recoveries under both base-year choices.',
  ],
};
