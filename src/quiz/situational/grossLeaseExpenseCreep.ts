import type { SituationalCase } from '../../types/situational';

export const grossLeaseExpenseCreep: SituationalCase = {
  id: 'gross-lease-expense-creep',
  title: 'Gross lease signed 5 years ago — expenses have eaten the NOI',
  category: 'lease-econ',
  difficulty: 'advanced',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You are reviewing a 10,000 SF office tenant on a full-service gross lease signed 5 years ago at $40/SF all-in. At signing, operating expenses were $12/SF, giving an effective net income of $28/SF. Operating expenses have since risen to $19/SF due to insurance, property tax reassessments, and utility cost inflation. The lease has 3 years remaining with no expense escalation clause.',
  data: [
    { label: 'Tenant SF', value: '10,000 SF' },
    { label: 'Gross lease face rent', value: '$40/SF/year' },
    { label: 'OpEx at signing (Year 1)', value: '$12/SF' },
    { label: 'Effective net at signing', value: '$28/SF' },
    { label: 'Current OpEx (Year 5)', value: '$19/SF' },
    { label: 'Current effective net', value: '$21/SF' },
    { label: 'Remaining lease term', value: '3 years, no expense stop or escalation' },
    { label: 'Market gross rent today', value: '$44/SF full-service gross' },
  ],
  question:
    'What has happened to landlord economics on this lease, and what are your options when the lease rolls?',
  options: [
    {
      label: 'The effective net has compressed from $28 to $21/SF — a 25% yield erosion — because the gross lease locks rent while expenses float up. At rollover, the landlord can recapture this by converting to a modified gross or NNN structure, or by resetting face rent to market ($44/SF) with an expense stop.',
      isBest: true,
      explanation:
        'Gross lease expense creep is a silent yield killer: face rent appears stable while net income erodes as expenses rise. Here: $40 − $19 = $21/SF net today vs. $28/SF at signing — 25% compression over 5 years. At rollover, the landlord has leverage to restructure: (1) Market gross lease at $44/SF still carries full expense risk; (2) Modified gross with a $19/SF base-year stop transfers future increases to tenant; (3) NNN at ~$25/SF (market less expenses) eliminates all expense risk. Converting to a structure with expense pass-throughs is the key lever to prevent a repeat.',
    },
    {
      label: 'The lease is performing fine — $40/SF is still being collected and the property is stabilized.',
      isBest: false,
      explanation:
        'This conflates gross rent with net operating income. Expense creep is real economic erosion. If you underwrote a cap rate on $28/SF net and the net is now $21/SF, the asset\'s NOI (and therefore its value) has declined even though face rent is unchanged. Acquirers who miss this on due diligence overpay.',
    },
    {
      label: 'Increase face rent on renewal to $47/SF gross to maintain the original $28/SF net, and keep the full-service gross structure.',
      isBest: false,
      explanation:
        'Raising face rent to compensate for expenses maintains net economics temporarily, but if expenses continue to rise, the same problem recurs at the next renewal. More importantly, $47/SF gross may be above market ($44/SF), making it harder to retain the tenant. Restructuring the lease type (adding expense stops or pass-throughs) is more durable than simply inflating face rent.',
    },
    {
      label: 'This cannot be avoided — gross leases always carry expense risk and there is nothing you can do about it.',
      isBest: false,
      explanation:
        'Expense risk is manageable at rollover. Structures that limit landlord exposure include: modified gross leases with base-year expense stops, NNN leases, or gross leases with CPI or fixed-percentage escalation clauses. The original signing was the structural error; the rollover is the correction opportunity.',
    },
  ],
  takeaway:
    'Gross lease expense creep is a slow, invisible yield compression. Always track effective net rent (gross rent minus actual OpEx) on a per-year basis. At rollover, convert to a structure with expense pass-throughs or rebalance face rent to include an expense stop that protects against future inflation.',
  tips: [
    'Effective net rent = gross face rent − actual operating expenses per SF. Monitor it annually, not just at lease signing.',
    'At rollover, ask: what structure eliminates my exposure to the next 5 years of expense inflation? Then price accordingly.',
    'When acquiring an asset with existing gross leases, check each lease\'s in-place expenses vs. current OpEx — hidden yield compression often shows up here.',
  ],
};
