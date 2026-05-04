import type { SituationalCase } from '../../types/situational';

export const balanceSheetRefiImpact: SituationalCase = {
  id: 'balance-sheet-refi-impact',
  title: 'How does a cash-out refi flow through the balance sheet?',
  category: 'deal-process',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'portfolioMgmt'],
  scenario:
    'You\'re refinancing a stabilized asset. Before refi: book value of asset = $40M, debt = $20M, equity = $20M. The new loan is $32M (60% LTV against current value of $53M). Net cash to the LPs after refi closing costs is $11M. Walk through the balance sheet impact.',
  data: [
    { label: 'Pre-refi book value', value: '$40M' },
    { label: 'Pre-refi debt', value: '$20M' },
    { label: 'Pre-refi equity', value: '$20M' },
    { label: 'New loan', value: '$32M' },
    { label: 'Net cash distributable to LPs', value: '$11M' },
  ],
  question: 'What does the balance sheet show post-refi?',
  options: [
    {
      label:
        'Asset value unchanged at book ($40M; book accounting doesn\'t mark to market). Debt jumps from $20M to $32M (+$12M loan). $20M of the new loan repays the old loan; the remaining $12M minus $1M of refi costs = $11M distributed to LPs as a return-of-capital. Equity drops from $20M to $9M ($20M − $11M distribution). Identity holds: $40M asset = $32M debt + $9M equity − $1M closing-cost expense.',
      isBest: true,
      explanation:
        'Refi mechanics on the balance sheet: (1) **Asset** doesn\'t change — book value stays at $40M (no mark-to-market in standard CRE accounting; market value of $53M only matters to the lender for sizing). (2) **Debt** jumps from $20M to $32M — old loan retired, new loan booked. (3) **Cash distributed** = (New loan − Old loan) − refi closing costs = $12M − $1M = $11M. (4) **Equity** drops by $11M (the distribution) to $9M. The remaining $1M of refi costs is expensed (or amortized as deferred financing costs in some treatments). The accounting identity holds throughout.',
    },
    {
      label: 'Asset value steps up to current value ($53M); debt $32M; equity $21M (the $12M refi proceeds add to equity).',
      isBest: false,
      explanation:
        'No mark-to-market in the regular CRE balance sheet. Book value stays at historical cost less depreciation. Stepping up to current market value is an unusual treatment (only applies in specific fair-value reporting frameworks). And refi proceeds don\'t add to equity — they\'re distributed to LPs (return-of-capital), reducing equity.',
    },
    {
      label: 'Asset $40M, debt $32M, equity $20M unchanged — the $11M distribution comes from operating cash, not equity.',
      isBest: false,
      explanation:
        'Distribution-of-refi-proceeds reduces equity. Operating cash distributions also reduce equity (or run through retained earnings, depending on entity type). Either way, you can\'t take $11M out of the partnership without reducing the equity line.',
    },
    {
      label: 'The refi is balance-sheet-neutral until the next operating period — debt and equity stay the same, only cash moves.',
      isBest: false,
      explanation:
        'Materially wrong. Debt clearly changes (old loan off, new loan on). Equity changes via the distribution. Cash also changes (the difference flows out to LPs). The refi is one of the most balance-sheet-active events in a deal\'s lifecycle.',
    },
  ],
  takeaway:
    'A cash-out refi on the balance sheet: asset unchanged (book), debt up by the new-old delta, equity down by the cash distributed to LPs (net of closing costs). The market-value-to-book gap doesn\'t enter the accounting; it only sized the loan. Refi proceeds are return-of-capital to LPs, not a P&L item — but the closing costs are expensed (or amortized).',
  tips: [
    'Book accounting: historical cost less accumulated depreciation. No mark-to-market on regular financials.',
    'Refi proceeds = (new loan − old loan) − closing costs. The cash-out is what flows to LPs.',
    'Closing costs (~1-2% of loan) are typically deferred financing costs, amortized over loan life.',
  ],
};
