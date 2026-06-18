import type { SituationalCase } from '../../types/situational';

export const rentGrowthSensitivity: SituationalCase = {
  id: 'rent-growth-sensitivity',
  title: 'How much does rent growth drive your IRR?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'Your 5-year multifamily model shows a 13% levered IRR assuming 3% annual rent growth. A senior reviewer asks you to show what happens at 1.5% rent growth. You re-run and get 9.5% IRR. You\'re asked to present the sensitivity and explain what it means for the investment thesis.',
  data: [
    { label: 'Hold period', value: '5 years' },
    { label: 'Levered IRR (3% rent growth)', value: '13%' },
    { label: 'Levered IRR (1.5% rent growth)', value: '9.5%' },
    { label: 'IRR delta', value: '−3.5%' },
    { label: 'Rent growth delta', value: '−1.5 ppts/year' },
  ],
  question: 'What does a 3.5% IRR drop from a 1.5 ppt rent growth cut tell you about the deal?',
  options: [
    {
      label: 'The deal is highly levered to rent growth — a ~2.3% IRR reduction per 1% of lost annual rent growth suggests rental income is the dominant return driver, not basis or exit cap compression. If 1.5% rent growth is plausible, the return is borderline on a 14% hurdle.',
      isBest: true,
      explanation:
        'IRR sensitivity of ~2.3% per 1% of rent growth change (3.5 ÷ 1.5) is a meaningful exposure. For perspective: deals where rent growth accounts for <30% of returns usually show <1% IRR sensitivity per 1% rent change. This deal\'s sensitivity means it needs above-trend rent growth to hit hurdle — that\'s a risk, not a flaw, but it needs to be named. The underwriting thesis should explain *why* 3% rent growth is more likely than 1.5% in this specific submarket and asset type.',
    },
    {
      label: 'The deal is fine — a 9.5% IRR is still a positive return and the 13% base case is strong.',
      isBest: false,
      explanation:
        'If the firm\'s hurdle is 12–14% (typical for multifamily with leverage), 9.5% misses it. A positive return doesn\'t equal a fund-acceptable return. Sensitivity analysis exists specifically to stress the base case, and a result 350 bps below hurdle on a 1.5% rent growth reduction is a material disclosure for the IC.',
    },
    {
      label: 'Cut the rent growth assumption to 1.5% and re-underwrite — conservative is always better.',
      isBest: false,
      explanation:
        'Conservatism should be calibrated, not applied as a blanket override. Cutting to 1.5% when the market has consistently delivered 3%+ is just as distorted as modeling 3% in a flat market. The task is to understand *what rent growth the market realistically supports* — then model that, with sensitivities around it.',
    },
    {
      label: 'A 3.5% delta is small — IRR is inherently imprecise, so this is within the margin of error.',
      isBest: false,
      explanation:
        '350 bps of IRR difference on a 13% base case is ~27% of the return. That is not within margin of error — it is a structural sensitivity that determines whether the deal clears the hurdle. IRR has limitations as a metric, but precision within the model (holding other inputs constant) is not one of them.',
    },
  ],
  takeaway:
    'Rent growth sensitivity quantifies how much of the return depends on a market outcome you can\'t control. High sensitivity (>2% IRR per 1% rent growth) means the deal needs an above-trend thesis, not just a base case. Present the sensitivity alongside the specific market argument for why your rent growth assumption is achievable.',
  tips: [
    'Rule of thumb: >2% IRR sensitivity per 1% rent growth change = "rent-dependent deal."',
    'Separate rent growth sensitivity from exit cap sensitivity — they\'re correlated but not identical.',
    'If the stressed case misses hurdle, name it explicitly in the IC memo — don\'t bury it.',
  ],
};
