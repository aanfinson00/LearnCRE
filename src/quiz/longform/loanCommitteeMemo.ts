import type { LongformCase } from '../../types/longform';

export const loanCommitteeMemo: LongformCase = {
  id: 'loan-committee-memo',
  title: 'Loan committee: defend a $30M permanent on a stressed-market office',
  difficulty: 'advanced',
  roles: ['mortgageUw', 'acquisitions'],
  assetClass: 'office',
  scenario:
    "You're underwriting a $30M permanent loan on a $50M Class B office in a market that's been under stress: submarket vacancy is 18%, sublease availability +200 bps in the past year, and three Fortune-500 tenants downsized in the trade area in Q3. The loan is 60% LTV, 1.30x DSCR at a 6.5% rate / 30-yr amort. The asset is 90% leased on a WALT of 5.2 years; the largest tenant (28% of NOI) has 7 years remaining at +6% to market with two 5-year options. The borrower is a top-quartile sponsor with a 20-year track record; recourse is non-recourse with standard bad-boy carveouts. Your committee chair opens with: 'why are we lending in this market, and what's our view if the largest tenant doesn't renew?'",
  data: [
    { label: 'Loan / asset', value: '$30M / $50M (60% LTV)' },
    { label: 'DSCR', value: '1.30x' },
    { label: 'Rate / amort', value: '6.5% / 30-yr' },
    { label: 'Submarket vacancy', value: '18% (+200 bps sublease)' },
    { label: 'Asset occupancy', value: '90%' },
    { label: 'WALT', value: '5.2 years' },
    { label: 'Largest tenant', value: '28% NOI · 7 yrs remaining · +6% to market' },
    { label: 'Sponsor', value: 'Top-quartile, 20-yr track record' },
    { label: 'Recourse', value: 'Non-recourse + bad-boy carveouts' },
  ],
  question:
    "Write a 5-7 sentence credit memo defending the lend. Address the chair's market concern directly. What's your refi-risk view, what triggers the cash-trap, what would change your stance?",
  modelAnswer: `The market concern is real but the asset-level credit is sound: 60% LTV gives us 40% of equity below us, the 1.30x DSCR holds even with a 75 bps rate stress at refi, and the largest tenant is in-place at +6% to market on 7 years of remaining term with options — that tenant is structurally sticky and the rent is below comp despite the soft market. Refi-risk view: at a stressed 7.5% exit cap and 75 bps higher rate, our 5-yr-out loan balance is ~$28.5M (10% paydown from amort) against a $42M stressed value, leaving 68% LTV at refi — workable, not pristine. The cash-trap should trigger at 1.15x DSCR or 75% LTV-stressed, locking excess cash flow until either ratio cures; that's earlier than the loan-default trip but late enough not to fight the borrower over normal volatility. The scenario that flips this lend is the largest tenant signaling non-renewal at year 5: 28% of NOI rolling at <50% renewal probability in this market with 12-18 months of downtime would push DSCR below 1.10x and force a workout — at that point we'd want either a tenant-improvement reserve carve-out or a partial paydown trigger. What would change my stance today: occupancy below 85% (concession overhang signal), or the largest tenant publicly listing space for sublease — both visible early warning signs we'd see before the loan is in real trouble. The lend is the right call because the sponsor's equity, the in-place tenant credit, and the early-trigger cash-trap together absorb the market stress without us getting cute on rate.`,
  rubric: [
    {
      id: 'engages-market-concern',
      dimension: "Engages the chair's market framing without dismissing it",
      weight: 1.5,
    },
    {
      id: 'refi-stress-quantified',
      dimension: 'Runs an explicit refi stress (cap + rate) and quantifies LTV at refi',
      weight: 2,
    },
    {
      id: 'cash-trap-mechanics',
      dimension: 'Names a specific cash-trap trigger (DSCR or LTV-stressed) and defends the threshold',
      weight: 2,
    },
    {
      id: 'tenant-non-renewal-scenario',
      dimension: 'Walks through the largest-tenant non-renewal scenario quantitatively',
      weight: 1.5,
    },
    {
      id: 'early-warning-signals',
      dimension: 'Names early-warning signals visible *before* default (occupancy drop, sublease listing)',
      weight: 1.5,
    },
  ],
  takeaway:
    "Defending a lend in a stressed market is rarely about rate — it's about (1) sizing the equity cushion conservatively, (2) running an explicit refi stress that survives a meaningful exit-cap + rate move, (3) building cash-trap triggers that fire well before loan default so the lender has time to react, and (4) naming the asset-specific scenario that would flip the call (largest tenant non-renewal, occupancy cliff). 'Sponsor is strong' is necessary but not sufficient — the structure has to absorb the named risk.",
  tips: [
    'Cash-trap triggers should fire at the *first* sign of stress, not at default. 1.15x DSCR or 75% stressed-LTV are common.',
    'In stressed markets, watch for sublease listings in your asset class as the early-warning signal — vacancy lags by 6-12 months.',
    'A "what changes my stance" line in a credit memo is the difference between a credit person and a yes-man.',
  ],
};
