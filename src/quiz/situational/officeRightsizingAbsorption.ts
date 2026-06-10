import type { SituationalCase } from '../../types/situational';

export const officeRightsizingAbsorption: SituationalCase = {
  id: 'office-rightsizing-absorption',
  title: 'Positive absorption but rising vacancy — is the office market recovering?',
  category: 'absorption',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'A CBD office submarket reports 200,000 SF of positive net absorption last quarter. At the same time, vacancy rose from 18.0% to 18.4% on total inventory of 25M SF. The market narrative from brokers is bullish: "tenants are coming back." You are evaluating a 250,000 SF Class-B office acquisition and need to assess the demand picture.',
  data: [
    { label: 'Total inventory', value: '25M SF' },
    { label: 'Net absorption (last quarter)', value: '+200,000 SF' },
    { label: 'Vacancy start of quarter', value: '18.0%' },
    { label: 'Vacancy end of quarter', value: '18.4%' },
    { label: 'Subject asset', value: 'Class-B, 250k SF' },
  ],
  question:
    'How do you reconcile positive net absorption with a rising vacancy rate?',
  options: [
    {
      label:
        'New supply delivered during the quarter exceeded the 200,000 SF absorbed — so tenants leased space, but more was added to market than was taken off. Positive absorption does not equal tightening if supply is simultaneously growing.',
      isBest: true,
      explanation:
        'Net absorption measures occupied SF change; vacancy measures the share of total inventory that is empty. If 300,000 SF delivered while 200,000 SF was absorbed, occupied SF grew but total inventory grew more — vacancy rises even as demand is positive. Calculate: vacancy rise of 0.4% × 25M SF = +100,000 SF of incremental empty space. Absorbed 200,000 SF but vacancy grew by 100,000 SF ⟹ roughly 300,000 SF of new supply delivered. The broker narrative is technically correct and misleading simultaneously.',
    },
    {
      label:
        'The data is contradictory — positive absorption and rising vacancy cannot coexist.',
      isBest: false,
      explanation:
        'They can and frequently do. Absorption measures the net change in occupied space; vacancy measures the ratio of empty space to total inventory. If inventory (total SF) grows faster than occupied space, vacancy rises even with positive absorption. This is a common scenario during active construction cycles.',
    },
    {
      label:
        'Rising vacancy means tenants are leaving; the positive absorption number must be an error.',
      isBest: false,
      explanation:
        "Vacancy rise doesn't require tenants to be leaving — it only requires the total inventory to grow faster than the occupied base. Absorption and vacancy move together only when supply is flat. In a submarket with active deliveries, they routinely diverge.",
    },
    {
      label:
        'Positive absorption is a leading indicator that vacancy will follow downward within a quarter or two.',
      isBest: false,
      explanation:
        'This is only true if supply is flat or declining. In an active delivery cycle, you can have quarters of positive absorption without any tightening of vacancy. Always check the pipeline (SF under construction, expected deliveries) alongside absorption pace before drawing conclusions about where vacancy is heading.',
    },
  ],
  takeaway:
    'Net absorption and vacancy rate are related but distinct. Absorption = change in occupied SF; vacancy = empty SF ÷ total inventory. New supply deliveries drive a wedge between them. When underwriting office, always pair the absorption figure with the supply pipeline — positive absorption in a heavy-delivery environment may reflect improving demand and worsening oversupply at the same time.',
  tips: [
    'Vacancy change = (new supply delivered − net absorption) ÷ total inventory.',
    'Class-B often absorbs differently than Class-A; split the data if the report allows.',
    'Trailing-twelve-month absorption smooths quarterly noise; check both.',
  ],
};
