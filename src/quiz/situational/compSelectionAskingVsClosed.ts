import type { SituationalCase } from '../../types/situational';

export const compSelectionAskingVsClosed: SituationalCase = {
  id: 'comp-selection-asking-vs-closed',
  title: 'Asking rent or achieved rent — which comps do you trust?',
  category: 'comp-selection',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'office',
  scenario:
    'You\'re building a rent comp set for a 40,000 SF office lease-up. A broker survey lists 6 "comparable" transactions, but on closer inspection 4 are asking rents pulled from active listings that haven\'t leased yet, and only 2 are executed leases with confirmed starting rent net of concessions. The 4 asking-rent comps average $32/SF; the 2 executed deals averaged $27/SF net of concessions.',
  data: [
    { label: 'Comp 1', value: 'Asking rent, active listing — $34/SF' },
    { label: 'Comp 2', value: 'Asking rent, active listing — $31/SF' },
    { label: 'Comp 3', value: 'Asking rent, active listing — $33/SF' },
    { label: 'Comp 4', value: 'Asking rent, active listing — $30/SF' },
    { label: 'Comp 5', value: 'Executed lease, 8 months ago — $28/SF net of concessions' },
    { label: 'Comp 6', value: 'Executed lease, 3 months ago — $26/SF net of concessions' },
  ],
  question: 'How should you weight these comps when setting your underwritten rent?',
  options: [
    {
      label:
        'Anchor the underwritten rent to Comps 5 and 6 (~$27/SF net effective), and use the asking-rent comps only as a directional ceiling — landlords routinely list above where deals actually close.',
      isBest: true,
      explanation:
        'Asking rent is a landlord\'s opening position, not a market clearing price — it hasn\'t been tested by a tenant\'s willingness to pay, and it excludes concessions that reduce a deal\'s effective economics. Executed leases (Comps 5, 6) reflect what tenants actually agreed to pay, net of the give-backs it took to get the deal done. The ~$27/SF net effective from the two executed comps is the defensible anchor; the $30-34/SF asking comps tell you where the market might be heading if leasing velocity is strong, but shouldn\'t drive the base case.',
    },
    {
      label: 'Average all 6 comps ($32 asking average blended with $27 executed average) since more data points reduce noise.',
      isBest: false,
      explanation:
        'Averaging apples (unexecuted asking prices) with oranges (executed, concession-adjusted rents) doesn\'t reduce noise — it produces a number that isn\'t achievable in either direction. More data points only help when they measure the same thing; asking and achieved rent measure different things.',
    },
    {
      label: 'Use only the asking rents since they represent current market conditions, and the executed leases are stale by comparison.',
      isBest: false,
      explanation:
        'Asking rents can indeed move faster than lease comps in a shifting market, which is a fair point — but "current" doesn\'t mean "achievable." An asking rent with zero executed transactions to support it is a landlord\'s aspiration, not evidence of what a tenant will actually pay. The 3-month-old executed comp (Comp 6) is recent enough to be highly relevant and shouldn\'t be discarded in favor of unexecuted listings.',
    },
    {
      label: 'Discard the asking-rent comps entirely — only executed leases have any value in a comp set.',
      isBest: false,
      explanation:
        'Too strict. Asking rents are useful as a leading indicator of where the market is trending, especially the most recent listings — they just shouldn\'t be the primary anchor for the underwritten rent. The right approach uses executed comps to anchor and asking comps as a secondary signal for momentum, not zero weight.',
    },
  ],
  takeaway:
    'Executed, concession-adjusted rents are the primary evidence for underwriting; asking rents are a landlord\'s opening position and a secondary, directional data point at best. Never let unexecuted comps set your base-case number.',
  tips: [
    'Always ask whether a "comp" is an asking price or an executed transaction before using it.',
    'Net effective rent (face rent minus amortized concessions) is the number that matters for executed comps.',
    'Asking-rent trend can flag momentum; it shouldn\'t set the anchor number.',
  ],
};
