import type { SituationalCase } from '../../types/situational';

export const hotelGopMarginCompress: SituationalCase = {
  id: 'hotel-gop-margin-compress',
  title: 'Hotel: RevPAR up 10% but GOP margin is falling — what's wrong?',
  category: 'diagnostic',
  difficulty: 'advanced',
  roles: ['assetManagement'],
  assetClass: 'hotel',
  scenario:
    "You're 18 months into ownership of a 180-key select-service hotel. RevPAR is up 10% YoY (ADR up 8%, occupancy up 2 ppts) — a strong top-line story. But your management company's monthly P&L shows GOP margin has compressed from 38% to 34%. Total revenue is up $900k; GOP is up only $120k. The GM blames labor market tightness and recently renegotiated housekeeper wages.",
  data: [
    { label: 'RevPAR growth', value: '+10% YoY' },
    { label: 'ADR / occupancy change', value: 'ADR +8%, Occ +200 bps' },
    { label: 'Total revenue increase', value: '+$900k YoY' },
    { label: 'GOP increase', value: '+$120k YoY' },
    { label: 'GOP margin (prior yr / current)', value: '38% → 34%' },
    { label: "GM's explanation", value: 'Labor market tightness, higher housekeeper wages' },
  ],
  question:
    "Is labor cost the right primary explanation for the GOP margin compression, and what should you investigate first?",
  options: [
    {
      label:
        "Labor may be contributing, but the $780k gap ($900k revenue increase − $120k GOP increase) is too large to be explained by wage inflation alone on 180 keys. Pull the departmental P&L: the compression is most likely a mix of (a) rooms expense per occupied room up more than ADR, (b) F&B or ancillary revenue at low margins dragging the blended mix, or (c) fixed-cost base growing (management fee, insurance, property tax) that isn't captured in GOP flow-through. Request a line-item bridge from the management company before accepting the labor explanation.",
      isBest: true,
      explanation:
        "GOP flow-through is the right diagnostic metric: at 10% RevPAR growth, a well-run select-service hotel should convert 50–65% of incremental revenue to GOP. Here the flow-through is $120k / $900k = 13% — far below what's expected. That gap says something structural is wrong, not just that wages ticked up. The analysis steps: (1) compute rooms expense per occupied room night and compare to prior year; (2) look at RevPAR index decomposition (ADR vs occ) — occ-driven growth has lower margins than ADR-driven growth because housekeeping and amenity costs are variable per room night; (3) check if any fixed overhead expanded (management contracts, new insurance riders, reassessment); (4) ask whether comp packages changed beyond housekeepers. A wage increase that caused $780k of margin erosion on a 180-key asset implies $4,300 per key in incremental labor cost — implausibly high without a broader explanation.",
    },
    {
      label:
        "Accept the GM's explanation — labor is a known industry headwind and 400 bps of margin compression is within normal range for wage inflation in this cycle.",
      isBest: false,
      explanation:
        "400 bps of margin compression is not 'normal' for wage inflation alone on a select-service asset. Even in a high-inflation labor year, labor cost increases of 5–8% per employee translate to 100–200 bps of margin compression on a well-structured P&L. A 400 bps swing says either the labor explanation is incomplete or there's a revenue mix issue being overlooked. Accepting without analysis is the error.",
    },
    {
      label:
        "The RevPAR growth is occ-driven rather than ADR-driven, which explains the margin compression — more room nights = more housekeeping cost.",
      isBest: false,
      explanation:
        "Partially right — occ-driven RevPAR growth does carry higher variable cost than pure ADR growth, and that would explain some compression. But ADR here was up 8% (the dominant driver), not occ. And even full occ-driven RevPAR growth would typically only explain 150–250 bps of margin compression, not 400 bps. This answer identifies a real mechanism but undersizes the problem and misses the labor-bridge test.",
    },
    {
      label:
        "Replace the management company — any operator that loses 400 bps of margin in a strong RevPAR environment isn't managing costs correctly.",
      isBest: false,
      explanation:
        "Terminating management is a last resort after diagnosis, not a first response to a quarterly P&L. Management agreements typically have costly termination provisions (liquidated damages, performance-cure periods). More importantly, the compression might be driven by fixed-cost or revenue-mix factors the management company doesn't fully control. Diagnose before escalating.",
    },
  ],
  takeaway:
    "GOP flow-through rate is the first diagnostic when margin compresses during top-line growth. Select-service hotels should flow 50–65% of incremental revenue to GOP in strong RevPAR environments; anything below 30–40% signals a structural cost issue. Break the P&L into departments — rooms, labor, fixed overhead, ancillary — and trace the gap to its source before accepting a single-variable explanation from the operator.",
  tips: [
    'GOP flow-through = ΔGOP / ΔTotal Revenue. Select-service target: 50–65%. Below 30% in a growing market → cost leak.',
    'Occ-driven RevPAR growth has ~15% higher housekeeping cost per dollar of new revenue vs pure ADR growth.',
    "Request a 'bridge table' from the management company: prior GOP + revenue impact + cost impact = current GOP. Any unexplained residual should prompt a line-by-line review.",
  ],
};
