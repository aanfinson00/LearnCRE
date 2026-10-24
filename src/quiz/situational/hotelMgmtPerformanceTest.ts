import type { SituationalCase } from '../../types/situational';

export const hotelMgmtPerformanceTest: SituationalCase = {
  id: 'hotel-mgmt-performance-test',
  title: 'Can you fire the hotel manager?',
  category: 'document-literacy',
  difficulty: 'advanced',
  roles: ['assetManagement'],
  assetClass: 'hotel',
  scenario:
    'Your third-party hotel manager has run the property at an 85% RevPAR index against its competitive set for two years. You want to terminate. The management agreement has a performance test, and you have received a termination quote that includes unamortized key money.',
  data: [
    { label: 'RevPAR index (2 yrs)', value: '85%' },
    { label: 'Test threshold', value: '90% for 2 consecutive years' },
    { label: 'Cure right', value: 'Manager may pay shortfall' },
    { label: 'Unamortized key money', value: '$1.2M' },
    { label: 'Termination fee', value: '12 months of fees' },
  ],
  question: 'What is the best first step?',
  options: [
    {
      label: 'Recompute the test exactly as the agreement defines it — comp set, calculation period, adjustments — and check the cure right before sending any notice.',
      isBest: true,
      explanation:
        'Performance tests are precise: who sets the comp set, whether renovation displacement is excluded, whether the manager can cure by funding the shortfall. A defective notice can waive the right or hand the manager a cure. The $1.2M key money and fee change the economics of terminating even a valid failure.',
    },
    {
      label: 'Send a termination notice now — two years below 90% is clearly a failure.',
      isBest: false,
      explanation:
        'The headline index failing does not mean the contractual test fails. Adjustments or a cure payment can neutralise it, and an invalid notice may be treated as wrongful termination.',
    },
    {
      label: 'Wait one more year to be safe, then terminate for convenience.',
      isBest: false,
      explanation:
        'Termination for convenience usually costs the most. Waiting also lets the manager argue course of dealing.',
    },
    {
      label: 'Ask the brand to replace the manager, since the franchise agreement controls operations.',
      isBest: false,
      explanation:
        'The franchisor does not control the management agreement. Your remedies run through that contract.',
    },
  ],
  takeaway:
    'Operator termination rights live in contractual definitions, not in your read of the numbers. Test the exact calculation and cure mechanics before acting.',
  tips: [
    'Check who controls comp-set selection.',
    'Model termination fees and key money repayment before choosing the exit path.',
    'Preserve the right to terminate by sending notices on time and strictly by the agreement.',
  ],
};
