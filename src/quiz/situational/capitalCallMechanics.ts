import type { SituationalCase } from '../../types/situational';

export const capitalCallMechanics: SituationalCase = {
  id: 'capital-call-mechanics',
  title: 'Funding the close: how does the capital call flow?',
  category: 'deal-process',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement', 'portfolioMgmt'],
  scenario:
    'Your fund is closing on a $50M acquisition Friday. Equity check is $20M (after $30M of debt). Fund has $40M of unfunded LP commitments. The closing schedule needs cash wired Thursday by 2pm to the title company.',
  data: [
    { label: 'Purchase price', value: '$50M' },
    { label: 'Senior debt', value: '$30M' },
    { label: 'Equity needed', value: '$20M' },
    { label: 'LP commitments unfunded', value: '$40M' },
    { label: 'Wire deadline', value: 'Thursday 2pm' },
  ],
  question: 'What\'s the capital-call sequence to fund this close?',
  options: [
    {
      label:
        'Issue a capital call notice to LPs ~10 business days before close (per the LPA), wire the called amount from each LP into the fund\'s capital account, then wire from the fund account to title on the closing date.',
      isBest: true,
      explanation:
        'Capital calls are notice-driven. Standard LPAs require 10 business days notice; some allow 5. The notice triggers each LP to wire their pro-rata share into the fund\'s capital account. Once funds clear, the GP wires from the fund\'s capital account to title. Skipping the notice period is a breach; trying to call last-minute creates funding risk if any LP misses the wire window.',
    },
    {
      label: 'Wire directly from the LP\'s account to the title company on closing day to skip the intermediate step.',
      isBest: false,
      explanation:
        'LPs almost never wire directly to the title company. Funds flow through the fund vehicle so the LP\'s capital account is debited correctly, partnership accounting tracks contributions, and the GP retains control over the deal closing. Direct LP-to-title wires bypass the partnership structure and create accounting reconciliation problems.',
    },
    {
      label: 'Use a subscription line of credit to bridge — call capital from LPs after close to repay the line.',
      isBest: false,
      explanation:
        'Plausible (and common at larger funds), but not the *default* for a single $20M call. Sub lines have their own costs (commitment fee + draw rate) and add complexity. They\'re used to (a) smooth IRR by delaying capital calls, (b) handle close timing emergencies, (c) bridge between deals. For a clean closing schedule with 10 days of runway, the standard capital call works fine.',
    },
    {
      label: 'Wait for the equity to be funded after closing — title companies will accept a closing-day promise to fund within 30 days.',
      isBest: false,
      explanation:
        'Title companies wire funds at closing; nothing closes until they hold the cash. "Promise to fund" is not how real estate closings work — the seller doesn\'t transfer the deed without good funds. Misunderstanding this gets the deal blown up.',
    },
  ],
  takeaway:
    'Capital calls are LPA-governed: notice (typically 10 business days), wire deadline, fund account intermediary. Sequence is LP → fund capital account → title at closing. Defaults exist for slow-payers (default interest, dilution, forfeiture) but the discipline is to call early enough to give every LP time to fund.',
  tips: [
    'Standard call notice: 10 business days. Always check the LPA for the specific number.',
    'Sub lines bridge timing or smooth IRR; they\'re not a substitute for capital calls.',
    'Default mechanics in the LPA matter when an LP misses a wire — know them before they\'re needed.',
  ],
};
