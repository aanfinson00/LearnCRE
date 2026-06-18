import type { SituationalCase } from '../../types/situational';

export const freeRentEquivalence: SituationalCase = {
  id: 'free-rent-equivalence',
  title: 'Which deal is actually cheaper — free rent or a lower face rate?',
  category: 'lease-econ',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  assetClass: 'office',
  scenario:
    'You\'re comparing two competing lease proposals for the same 5,000 SF office space. Proposal A offers $40/SF face rent with 6 months of free rent and $50/SF TI on a 5-year term. Proposal B offers $35/SF face rent with no free rent and $30/SF TI on the same 5-year term. The tenant is asking you to confirm which proposal is better for the landlord, net of economics.',
  data: [
    { label: 'Space size', value: '5,000 SF' },
    { label: 'Term', value: '5 years' },
    { label: 'Proposal A face rent', value: '$40/SF/yr, 6 months free, $50/SF TI' },
    { label: 'Proposal B face rent', value: '$35/SF/yr, 0 free rent, $30/SF TI' },
    { label: 'Discount rate', value: '7%' },
  ],
  question: 'Which proposal produces higher landlord NER, and by roughly how much?',
  options: [
    {
      label: 'Proposal A produces higher NER. Simple NER A ≈ $28/SF ($40 face − $50 TI/5 − 6 months free÷5 = $40 − $10 − $4 = $26/SF). NER B ≈ $29/SF ($35 − $30/5 = $35 − $6 = $29). Proposal B is marginally better — about $3/SF higher NER.',
      isBest: true,
      explanation:
        'Simple NER formula: face rent − TI/term − free rent/term. A: $40 − ($50/5) − ($40×0.5/5) = $40 − $10 − $4 = $26. B: $35 − ($30/5) − $0 = $35 − $6 = $29. Proposal B is ~$3/SF better in simple NER despite a $5/SF lower face rent. The lesson: face rent optics ($40 vs $35) invert when concessions are stripped out. Always quote NER in lease comparisons — face rent is a negotiating anchor, not an economic truth.',
    },
    {
      label: 'Proposal A is better — $40/SF face rent is 14% higher than $35/SF and face rent drives the comp set.',
      isBest: false,
      explanation:
        'Face rent drives the nominal comp set but not the economics. Buyers and appraisers who underwrite NER will see through $40 face with deep concessions. A lease signed at $40/$50TI/6MoFree will show up in rent comps as $40, but savvy buyers will adjust for the concession load. Building a comp set on inflated face rents gives you false pricing confidence.',
    },
    {
      label: 'They\'re economically equivalent — you need time-value-adjusted NER to distinguish them.',
      isBest: false,
      explanation:
        'Time-value-adjusted NER would narrow the gap slightly (front-loaded free rent in Proposal A has a PV cost that is modestly higher than the simple arithmetic suggests), but the simple NER calculation already shows Proposal B is better. The two proposals are not equivalent — B is meaningfully cheaper in concession load per dollar of face rent.',
    },
    {
      label: 'It depends on the tenant\'s credit — higher-credit tenants justify bigger TIs and free rent.',
      isBest: false,
      explanation:
        'Tenant credit affects the pricing of the risk, but not the NER calculation. The question asks which deal is economically better for the landlord net of economics — NER is the answer. Credit risk is a separate factor that affects how much concession you\'re willing to give, not how you compare two specific proposals.',
    },
  ],
  takeaway:
    'Free rent and TI are interchangeable forms of concession — both reduce NER below face rent. A lease with a lower face rent but fewer concessions can be economically better than a higher face rate with a heavy giveaway. Always reduce proposals to NER before comparing; face rent alone is a trap.',
  tips: [
    'Simple NER = face rent − (TI/term) − (free rent × face rate / term).',
    'Time-value NER is more precise but simple NER is correct for quick comparisons.',
    'Free rent in year 1 costs more (PV) than the same months in year 5 — discount it if precision matters.',
  ],
};
