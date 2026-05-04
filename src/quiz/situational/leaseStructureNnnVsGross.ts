import type { SituationalCase } from '../../types/situational';

export const leaseStructureNnnVsGross: SituationalCase = {
  id: 'lease-structure-nnn-vs-gross',
  title: 'NNN vs Gross — who actually bears the OpEx risk?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'retail',
  scenario:
    'You own a single-tenant retail asset on a 10-year NNN lease at $25/SF base rent. Property taxes have risen 8%/yr for the past 3 years (vs 3% expected). The tenant is now pushing to renew on a *gross* basis at a higher face rent ($32/SF) to "make their costs predictable." The new gross rent is, on paper, higher than the NNN base.',
  data: [
    { label: 'Current lease', value: 'NNN, $25/SF base' },
    { label: 'Renewal proposal', value: 'Gross, $32/SF' },
    { label: 'Recent tax growth', value: '8%/yr (vs 3% expected)' },
    { label: 'Term', value: '10-yr renewal' },
    { label: 'Asset', value: 'Single-tenant retail' },
  ],
  question: 'How do you analyze the NNN-to-gross conversion?',
  options: [
    {
      label:
        'Gross at $32/SF means YOU bear the OpEx growth risk (taxes, insurance, repairs) for 10 years. The 7%-rent-bump only covers today\'s OpEx ratio; if costs keep growing 8%/yr, your NER erodes year over year. Counter-propose a gross-with-expense-stop or NNN-with-cap.',
      isBest: true,
      explanation:
        'NNN vs gross is fundamentally a risk-allocation question, not a rent-level question. Under NNN, the tenant pays OpEx; rising costs hit them. Under gross, the landlord eats OpEx growth above whatever\'s baked into the rent. The tenant\'s ask "make our costs predictable" = "make YOUR costs UN-predictable." On a 10-year term with 8%/yr OpEx growth, the gap compounds dramatically. Counter-structures: (a) gross with an expense stop (landlord pays first $X of OpEx; tenant pays the rest) or (b) NNN with a cap on the tenant\'s annual reimbursement growth (limits the tenant\'s downside while preserving most of the landlord\'s protection).',
    },
    {
      label: 'Take the gross deal — $32 > $25, so face rent is higher and the lease is more valuable in the cap-rate math.',
      isBest: false,
      explanation:
        'Cap rates apply to NOI, not face rent, and NOI under gross is `face rent − all OpEx`. The $7/SF "uplift" gets eaten by the OpEx the landlord now bears. If you\'re running 30% OpEx ratio, the effective NOI per SF on gross at $32 is $22.40, vs NNN at $25 = $25 NOI per SF. The gross deal is *worse* by $2.60/SF.',
    },
    {
      label: 'Stay NNN and refuse the conversion — the tenant should manage their own OpEx.',
      isBest: false,
      explanation:
        'Doctrinal but not pragmatic. The tenant is signaling cost stress; if they walk because of it you have a vacant building. Counter-structures (expense stop, NNN cap) keep the lease attractive to the tenant while preserving most of your landlord protection. "Refuse" is an option of last resort, not an opening position.',
    },
    {
      label: 'Convert to gross at the proposed $32/SF — the rent uplift makes up for OpEx growth, and the predictability for the tenant reduces re-leasing risk.',
      isBest: false,
      explanation:
        'Misjudges the math. The $7/SF rent uplift is a *one-time* increase; OpEx grows EVERY year. By year 5, OpEx has compounded ~47% above today\'s level, eating well past the rent bump. Gross conversions need to price in OpEx growth across the full term, not a one-time uplift.',
    },
  ],
  takeaway:
    'Lease structure (NNN, gross, modified gross) is a risk-allocation tool. NNN puts OpEx growth risk on the tenant; gross puts it on the landlord. The face-rent comparison is misleading because it ignores who bears 10 years of cost inflation. When a tenant requests a structure change, run the full-term math at *expected* OpEx growth, not today\'s OpEx ratio. Hybrid structures (expense stops, recovery caps) are the usual landing zone.',
  tips: [
    'Quick check: under NNN at NER X, equivalent gross is X + (current OpEx/SF) × inflation factor.',
    'Tenants ask for gross when their costs are rising and they want to push the risk over. Always negotiate.',
    'Expense stops set a floor on the landlord\'s OpEx burden; recovery caps set a ceiling on the tenant\'s.',
  ],
};
