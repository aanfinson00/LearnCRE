import type { SituationalCase } from '../../types/situational';

export const waterfallClawbackMechanics: SituationalCase = {
  id: 'waterfall-clawback-mechanics',
  title: 'When does the GP have to give promote dollars back?',
  category: 'deal-process',
  difficulty: 'advanced',
  roles: ['portfolioMgmt', 'mortgageUw'],
  scenario:
    'Mid-life check on a $400M PE real estate fund using an American (deal-by-deal) waterfall. Year-3 status: Deals 1-3 closed and exited at outsized returns; GP collected $12M in promote across them. Deals 4-7 are still active, with two of them (Deals 5 and 6) trending toward losses. If those losses materialize at exit, the fund-level lookback would have shown LP failed to clear pref. The LPA includes a clawback provision triggered at fund liquidation.',
  data: [
    { label: 'Promote distributed (Years 1-3)', value: '$12M' },
    { label: 'Active deals trending negative', value: '2 of 4 remaining' },
    { label: 'Fund vehicle remaining', value: '~3 years' },
    { label: 'Clawback security', value: '50% GP escrow + GP guarantee' },
  ],
  question:
    'Under typical LPA clawback mechanics, which of these is true?',
  options: [
    {
      label:
        'At fund liquidation, GP must return promote dollars *only to the extent* aggregate fund-level performance failed to clear LP\'s pref + capital. The clawback is calculated as the *minimum of (a) promote distributed and (b) the LP\'s pref + capital shortfall, on an after-tax basis.* Recovery depends on the security: 50% escrow protects half; the GP guarantee covers the rest, subject to GP solvency.',
      isBest: true,
      explanation:
        'Standard clawback math: at fund liquidation (or other LPA-defined trigger), the trustee calculates what the LP *would have received* under a fund-level waterfall and what the LP *actually received*. The shortfall, capped at the promote already distributed, is the clawback amount. After-tax basis matters because the GP paid tax on the original promote — the LPA usually credits that tax amount against the clawback. Security mechanisms vary: an escrow holds promote in reserve until fund-end; a personal GP guarantee promises additional dollars but is only as good as the GP\'s solvency. Practical recovery rate on uncovered clawbacks is often <50% in real failure scenarios.',
    },
    {
      label:
        'Clawback is automatic and immediate — as soon as Deal 5 marks below cost, the GP must return $12M to LP escrow.',
      isBest: false,
      explanation:
        'Clawback is triggered at *fund liquidation* (or sometimes at LPA-defined interim points), not on individual deal markdowns. The fund-level shortfall must actually crystallize via realized exits, not just unrealized markdowns. Mid-life mark-to-market doesn\'t trigger return of promote.',
    },
    {
      label:
        'Once GP has been paid promote, it\'s permanent — that\'s the whole point of an American waterfall.',
      isBest: false,
      explanation:
        'American waterfalls accelerate promote distribution but do NOT eliminate clawback. The clawback obligation is the LP\'s protection in exchange for accepting deal-by-deal economics. Without clawback, the structure would be untenable for institutional LPs.',
    },
    {
      label:
        'GP must return all $12M of promote dollars regardless of fund-level outcome — clawbacks always equal the full distributed promote.',
      isBest: false,
      explanation:
        'Clawback returns *only the shortfall*, not the full promote. If the fund clears LP pref + capital at liquidation, no clawback is owed even if individual deals lost money.',
    },
  ],
  takeaway:
    'Clawback is the LP\'s rear-guard protection in American waterfalls: triggered at fund liquidation (not at individual deal markdowns), capped at distributed promote, calculated against the LP\'s actual received vs. fund-level-pref shortfall, and net of GP\'s tax on the original promote. The *security* mechanism (escrow, GP guarantee, key-person continuity) determines practical recoverability — a clawback obligation against an insolvent GP is worth less than the paper it\'s printed on.',
  tips: [
    'Clawback math: min(promote distributed, fund-level LP shortfall, after-tax basis).',
    'Practical recovery depends on security: escrow > escrow + guarantee > guarantee alone > unsecured.',
    'Clawback only triggers at fund liquidation (or LPA-defined interim measurement dates), not on mid-life markdowns.',
    'Always model promote *net of probable clawback exposure* on funds with negative-trending deals.',
  ],
};
