import type { SituationalCase } from '../../types/situational';

export const treasuryCapRateSpread: SituationalCase = {
  id: 'treasury-cap-rate-spread',
  title: '10Y Treasury at 4.5%, MF trading at 5.2% — is 70bps spread enough?',
  category: 'pricing',
  difficulty: 'intermediate',
  roles: ['acquisitions', 'portfolioMgmt'],
  assetClass: 'multifamily',
  scenario:
    'You are pricing a 200-unit stabilized suburban multifamily acquisition in a Sun Belt market. In-place NOI supports a 5.2% going-in cap rate at the ask price. The 10-year Treasury is at 4.5%. Your IC asks: "At 70bps spread to Treasuries, are you getting paid enough for the illiquidity and leverage risk of this investment?"',
  data: [
    { label: '10Y Treasury yield', value: '4.5%' },
    { label: 'Going-in cap rate', value: '5.2%' },
    { label: 'Cap-rate spread to T10', value: '70bps' },
    { label: 'Historical MF premium to T10', value: '~150–200bps (2010–2019 avg)' },
    { label: 'Asset type', value: '200-unit stabilized, Sun Belt suburban' },
  ],
  question: 'Is 70bps spread to the 10-year Treasury sufficient compensation for this investment?',
  options: [
    {
      label:
        'Probably not on a historical risk-premium basis — the long-run MF-to-T10 spread has averaged 150–200bps. At 70bps you are pricing in near-perfect rent growth and a stable exit multiple. Any negative surprise reprices cap rates wider and destroys equity.',
      isBest: true,
      explanation:
        'The spread between cap rates and the 10-year Treasury is the real estate risk premium — compensation for illiquidity, leverage, and operational complexity. Historically, stabilized MF has priced at 150–200bps over T10s. At 70bps, you are near the thinnest risk premium on record (similar to 2021–2022 peaks). That does not automatically make the deal wrong — Sun Belt rent growth, mark-to-market upside, and supply/demand fundamentals can justify a compressed spread. But it means your entire return thesis is dependent on NOI growth and a stable exit multiple. Stress test: if T10 stays at 4.5% and spreads normalize to 150bps, exit cap moves from 5.2% to 6.0% — quantify that exit-cap move\'s impact on IRR before deciding.',
    },
    {
      label:
        'The spread only matters for REIT investors who mark to market quarterly — for long-hold private investors it is irrelevant.',
      isBest: false,
      explanation:
        'Wrong. The T10 spread matters for private real estate because: (1) future buyers price off the prevailing risk-free rate, so your exit cap assumption implicitly embeds a future spread assumption; and (2) as rates move, lender constraints (DSCR thresholds, debt yield minimums) adjust in parallel. A thin spread today creates latent refi and exit-cap risk that is very much a private investor problem.',
    },
    {
      label:
        'Cap rates are sticky and do not reprice with Treasuries in the short run, so the spread is a theoretical concern, not a real one.',
      isBest: false,
      explanation:
        'Cap rates lag rate moves but they are not independent. The 2022–2023 repricing demonstrated clear cap-rate widening in response to Fed hikes, with MF cap rates expanding 100–150bps in many markets over 18 months. Stickiness is temporary; extended high-rate environments force cap-rate normalization as deal volume thins and buyers underwrite to current financing costs.',
    },
    {
      label:
        'Buy at any spread — Sun Belt demand fundamentals override the risk-premium math.',
      isBest: false,
      explanation:
        'Sun Belt demand improves the probability of rent growth, which helps IRR, but it does not make valuation discipline irrelevant. If you overpay at a thin spread and cap rates widen 100bps, even strong NOI growth may not offset the exit deterioration. Sun Belt demand is a reason to underwrite rent growth aggressively — not a reason to skip the spread analysis.',
    },
  ],
  takeaway:
    'Cap-rate spread to Treasuries is the real estate risk premium. At 70bps, you are near historical minimums — not a hard stop, but a signal that your return is almost entirely a bet on NOI growth and a stable exit multiple. Stress a +75–100bps cap-rate expansion at exit and decide whether the growth story survives. "Cheap Treasuries made real estate expensive" — that is the summary of the 2021 vintage risk.',
  tips: [
    'Historical MF cap-rate spread to T10: ~150–200bps over 2010–2019. Under 100bps = thin; under 75bps = pricing in near-perfection.',
    'Stress your exit cap: if T10s stay at 4.5% and spreads normalize to 150bps, exit cap moves from 5.2% to 6.0%. Run that scenario before IC.',
    'Thin spread + stabilized yield = returns are almost entirely in the residual. That is speculative, not core.',
  ],
};
