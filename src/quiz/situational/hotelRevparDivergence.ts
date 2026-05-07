import type { SituationalCase } from '../../types/situational';

export const hotelRevparDivergence: SituationalCase = {
  id: 'hotel-revpar-divergence',
  title: 'Hotel: your RevPAR index is below 100 and falling — what now?',
  category: 'diagnostic',
  difficulty: 'intermediate',
  roles: ['assetManagement'],
  assetClass: 'hotel',
  scenario:
    "You manage a 220-key full-service hotel in a primary market. STR data shows your trailing-12 RevPAR is up 8% YoY (good in absolute terms) but the comp set is up 14%. RevPAR Index has slipped from 102 to 94 over four quarters. ADR Index is at 97 (basically flat); occupancy index is at 96 (sliding). The brand flag relationship-manager just flagged the trend in your QBR.",
  data: [
    { label: 'Asset RevPAR Δ', value: '+8% YoY' },
    { label: 'Comp set RevPAR Δ', value: '+14% YoY' },
    { label: 'RevPAR Index', value: '94 (was 102)' },
    { label: 'ADR Index', value: '97' },
    { label: 'Occupancy Index', value: '96' },
    { label: 'Trend', value: '4 consecutive quarters declining' },
  ],
  question: 'What\'s the most likely diagnosis, and what\'s your first move as the asset manager?',
  options: [
    {
      label:
        'Both ADR and Occ indices are below 100 with Occ sliding faster — the comp set is selling more rooms at a similar rate. Investigate channel-mix + sales pace before discounting; the comp set may have added a corporate account or shifted distribution. First move: pull your sales-mix breakdown by segment (group / transient / corporate / OTA) vs. last year + competitor BAR rates, then call the brand revenue manager for a 30-day pricing audit.',
      isBest: true,
      explanation:
        "Right approach. RevPAR = ADR × Occ; both indices are < 100 means the comp set is winning on both rate and occupancy, but the *shape* of the gap matters. ADR Index at 97 vs Occ Index at 96 sliding faster says the binding issue is room-night demand, not pricing. Cutting rate without diagnosing distribution would just compress ADR further without solving the demand-mix problem. Channel + segment audit is the right first move — it'll surface whether the issue is corporate account loss, OTA rank slippage, or comp set capacity expansion.",
    },
    {
      label:
        'RevPAR Index is below 100 — drop ADR by 5% across the board to stop the bleeding and recover share.',
      isBest: false,
      explanation:
        "Wrong tool. ADR Index is at 97 — only 300 bps off comp set — so the rate isn't the binding issue. Cutting ADR 5% would strand 200-300 bps of RevPAR without recovering occupancy, since the occupancy gap is demand/distribution-driven (otherwise ADR would have collapsed too). Rate cuts on a flag-quality asset also damage long-term ADR perception with tour operators and groups.",
    },
    {
      label:
        "RevPAR is up 8% in absolute terms, which is healthy — the index slip is a comp-set composition artifact. No action needed; you're growing, just not as fast as the market.",
      isBest: false,
      explanation:
        "Index slippage when absolute RevPAR is rising is a real signal, not noise. STR comp sets are slow to add/remove participants, so 4 quarters of decline at this magnitude isn't composition. The comp set is taking share from you in a rising tide — that's the market telling you something competitors are doing better. Ignoring it concedes pricing power for the next cycle.",
    },
    {
      label:
        "It's an FF&E reserve issue — the asset is showing wear and guests are choosing newer comp set hotels. Accelerate the renovation budget by 12 months.",
      isBest: false,
      explanation:
        "Possible but not the first hypothesis to test. Capex / renovation issues usually surface in TripAdvisor / GSS scores months before they hit RevPAR Index, and they affect ADR Index as much as Occ Index — here ADR is only 300 bps off. Rule out distribution + sales-mix first; if those check out, *then* look at GSS scores + capex condition.",
    },
  ],
  takeaway:
    "Hotel RevPAR Index diagnoses break down into ADR vs Occ component analysis. Both < 100 means losing on both axes; if ADR is closer to 100 than Occ, the binding issue is demand mix or distribution (segment / channel / corporate accounts), not rate. Don't reach for a rate cut as the default response — pull the segment + channel audit first. Capex condition is a real driver but usually shows up in guest-satisfaction scores before it shows in the RevPAR Index.",
  tips: [
    'RevPAR Index = (your RevPAR / comp-set RevPAR) × 100. 100 = you\'re tracking the market; <100 = losing share.',
    'Decompose Index into ADR Index + Occupancy Index — they tell you whether to look at pricing or demand.',
    'STR Smith Travel Research is the source of truth for hotel comp-set data; full-service hotels review weekly, limited-service monthly.',
  ],
};
