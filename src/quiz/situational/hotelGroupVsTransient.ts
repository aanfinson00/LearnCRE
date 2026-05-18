import type { SituationalCase } from '../../types/situational';

export const hotelGroupVsTransient: SituationalCase = {
  id: 'hotel-group-vs-transient',
  title: 'Hotel: group pace is up 40% but ADR trails the comp set — what\'s the right mix?',
  category: 'diagnostic',
  difficulty: 'advanced',
  roles: ['assetManagement'],
  assetClass: 'hotel',
  scenario:
    "You asset-manage a 250-key full-service hotel in a major convention market. YTD group pace (bookings on the books) is 40% ahead of prior year — corporate group and weddings are strong. But ADR is 300bps below the comp set, while occupancy is tracking 2 points ahead. RevPAR Index sits at 97 — slightly below 100. Your revenue manager wants to max group base load to protect occupancy; your sales director wants to hold rate and push transient. The brand is neutral. You have 22 compression nights per year (ADR >20% above your average) where you're consistently full.",
  data: [
    { label: 'Property', value: '250-key full-service, convention market' },
    { label: 'Group pace vs PY', value: '+40%' },
    { label: 'ADR vs comp set', value: '-300bps' },
    { label: 'Occupancy vs comp set', value: '+200bps' },
    { label: 'RevPAR Index', value: '97 (slightly below market)' },
    { label: 'Compression nights', value: '22 per year (ADR >20% above avg)' },
  ],
  question: "Who's right — revenue manager or sales director — and how do you frame the group/transient mix decision?",
  options: [
    {
      label:
        "Neither is fully right. Group is displacing high-rate transient specifically on compression nights, which drives the ADR gap. Run a displacement analysis: on the 22 compression nights, what revenue is lost when group blocks fill rooms that would have sold at $220+ transient vs. group rate at $165? If displaced transient revenue exceeds the group base on those nights, implement group rate floors by day-of-week — accept group at full rates midweek and wedding weekends; protect compression nights for transient at rack rate.",
      isBest: true,
      explanation:
        "Right framework. Group and transient serve different demand patterns — group fills troughs, transient captures peaks. The RevPAR gap (ADR -300bps, OCC +200bps) tells you group is winning occupancy at a rate discount on compression nights. The displacement analysis quantifies the exact trade-off: compare (group rooms × group ADR) vs. (those same rooms × projected transient ADR) on compression nights. Rate floors by day-of-week implement the answer. Neither 'max group' nor 'max transient' is right — segmentation and selective rate floors are the answer.",
    },
    {
      label:
        "The revenue manager is right — group base load reduces OTA commission costs and revenue volatility. Maximize group pace and accept the ADR gap as the price of certainty.",
      isBest: false,
      explanation:
        "Partially correct about group's benefits (predictability, lower OTA commissions) but wrong about accepting the ADR gap. Group at below-market rates on compression nights destroys RevPAR — those 22 nights would sell at 20%+ transient premium. RevPAR Index of 97 means the hotel is leaving money on the table. Group base load is valuable in troughs; on peak nights it's harmful.",
    },
    {
      label:
        "The sales director is right — cut group bookings aggressively and let transient take the building to close the ADR gap.",
      isBest: false,
      explanation:
        "Too binary. Cutting group eliminates the midweek base load (corporate group fills Mon-Thu when transient demand is soft), drives up OTA dependency in shoulder periods, and reduces F&B revenue. Group isn't the problem — group at the wrong rate on compression nights is the problem. Eliminating group entirely trades one problem for several others.",
    },
    {
      label:
        "Apply a blanket 5% rate increase across all channels to close the ADR gap with the comp set.",
      isBest: false,
      explanation:
        "Rate increases without displacement analysis can backfire. If you raise group rates above market, groups book competing hotels. If you raise transient on non-compression nights beyond comp-set pricing, occupancy falls without a net ADR gain. Blunt rate increases ignore the night-specific nature of the problem — the ADR gap is concentrated on compression nights, not systematic across all demand.",
    },
  ],
  takeaway:
    "Hotel revenue management is a segmentation problem, not a group-vs-transient binary. Group builds base load and reduces OTA dependency; transient captures compression-night premium. The correct framework is displacement analysis: calculate the revenue lost by filling a compression night with group vs. selling at transient rack. Implement group rate floors and booking restrictions by day-of-week rather than setting a blanket mix target. RevPAR Index decomposition (ADR Index vs. OCC Index) tells you which axis is the source of underperformance.",
  tips: [
    "Compression nights: nights where market OCC exceeds 85-90% and transient ADR spikes 20%+. Group blocks that fill on these nights destroy RevPAR per available room.",
    "Displacement formula: (group rooms × group ADR) vs. (those rooms × projected transient ADR on that date). If transient ADR > group ADR on that date, the group booking is value-destructive.",
    "Group cost burden: group revenue includes F&B, AV, and concession costs the P&L absorbs. Contribution margin on group is typically 15-20% lower than equivalent transient ADR — factor this into the displacement math.",
  ],
};
