import type { SituationalCase } from '../../types/situational';

export const diagnosticVacancyTooLow: SituationalCase = {
  id: 'diagnostic-vacancy-too-low',
  title: 'Is a 5% stabilized vacancy realistic on this office asset?',
  category: 'diagnostic',
  difficulty: 'advanced',
  roles: ['acquisitions', 'mortgageUw'],
  assetClass: 'office',
  scenario:
    'A sponsor\'s offering memorandum models a 5% stabilized vacancy rate for a 10-year hold on a Class-B suburban office building. The building is currently 91% leased to two tenants: an 80,000 SF law firm (70% of rent, lease expiring in Year 4) and a 30,000 SF insurance company (30% of rent, lease expiring in Year 6). The submarket has reported 18% direct vacancy over the past 6 quarters, trending up from 12% two years ago.',
  data: [
    { label: 'Proforma stabilized vacancy', value: '5%' },
    { label: 'Tenant 1 (law firm)', value: '80k SF — 70% of rent — lease expires Year 4' },
    { label: 'Tenant 2 (insurance)', value: '30k SF — 30% of rent — lease expires Year 6' },
    { label: 'Submarket direct vacancy', value: '18% (trending up from 12% in 2 yrs)' },
    { label: 'Hold period', value: '10 years' },
  ],
  question: 'What are the problems with the 5% stabilized vacancy assumption?',
  options: [
    {
      label: 'Three compounding problems: (1) the submarket vacancy is 18% and rising — a 5% assumption is 13 points inside market; (2) the major tenant (70% of rent) rolls in Year 4 with no renewal confirmed; (3) if the law firm doesn\'t renew, re-leasing 70% of rent roll in a rising-vacancy submarket will require below-market rents, significant TI, and likely downtime. Re-underwrite with 15–20% economic vacancy and stressed re-leasing on the rollover.',
      isBest: true,
      explanation:
        'The 5% assumption fails on three independent grounds: (a) Market reality: 18% submarket vacancy means the *market* clears at 18% — the subject must outperform by 13 points to achieve 5%, with no stated reason why it would. (b) Lease-term risk: 70% of gross income rolls to market in Year 4. If the law firm contracts (as many are in the post-remote-work environment) or doesn\'t renew, the building is severely underoccupied at the critical mid-hold period. (c) Re-leasing economics: absorbing 80k SF in an 18%-vacant market means competing with many alternatives, accepting market rents below in-place, and bearing TI costs. Economic vacancy (effective rent lost) will exceed physical vacancy during the re-leasing period.',
    },
    {
      label: 'The 5% assumption is fine — the building is currently 91% leased.',
      isBest: false,
      explanation:
        'Current occupancy is not modeled stabilized vacancy. The 91% today becomes irrelevant when 70% of the rent roll expires in 4 years. The proforma vacancy assumption covers the *entire* 10-year hold, including the re-leasing of the major tenant in Year 4–6. The current occupancy is the starting condition, not the forecast.',
    },
    {
      label: 'Stress only the law firm rollover scenario — one tenant leaving doesn\'t make the vacancy assumption unreasonable.',
      isBest: false,
      explanation:
        'The law firm represents 70% of gross rent. If they don\'t renew, the building is essentially 30% leased for some period. That alone makes the 5% stabilized vacancy assumption indefensible. But it\'s not the only issue — the submarket baseline of 18% means even if the law firm renews at a lower rate or in a smaller footprint, the building faces competition in re-leasing any returned space.',
    },
    {
      label: 'The submarket vacancy is a lagging indicator — model to historical norms, not the current reading.',
      isBest: false,
      explanation:
        'Rising vacancy over 6 consecutive quarters in a structural (not cyclical) shift toward remote work is a leading indicator, not lagging. Office demand destruction from hybrid/remote work is widely documented and unlikely to reverse to historical occupancy norms in the 5-year horizon relevant to this deal. Anchoring to historical norms ignores the changed demand environment that is actively driving up vacancy.',
    },
  ],
  takeaway:
    'Stabilized vacancy assumptions must be anchored to submarket reality, not aspirations. When submarket vacancy is trending up and a major tenant has near-term rollover risk, a 5% vacancy assumption needs a specific, named, quantifiable counterargument or it\'s unsupported. Decompose into physical vacancy, downtime on rollover, and concession-driven economic vacancy.',
  tips: [
    'If submarket vacancy is X%, the subject at (X − 13%) requires explicit justification — quality, location, or demand-driver advantage.',
    'Model rollover risk as a separate line: downtime % × rent per year = downtime loss.',
    'Economic vacancy (including rent-free periods and partial TI) can exceed physical vacancy by 2–5 percentage points during active re-leasing.',
  ],
};
