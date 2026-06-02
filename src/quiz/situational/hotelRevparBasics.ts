import type { SituationalCase } from '../../types/situational';

export const hotelRevparBasics: SituationalCase = {
  id: 'hotel-revpar-basics',
  title: "RevPAR: what it is, how to calculate it, and what it actually tells you",
  category: 'diagnostic',
  difficulty: 'beginner',
  roles: ['assetManagement'],
  assetClass: 'hotel',
  scenario:
    "You manage a 150-key select-service hotel. January results: 65% occupancy, $108 ADR (average daily rate). The STR report shows the comp set posted $75.00 RevPAR last January. Your manager is reporting January as 'a strong month — occupancy and ADR are both up year over year.'",
  data: [
    { label: 'Hotel keys', value: '150' },
    { label: 'January occupancy', value: '65%' },
    { label: 'January ADR', value: '$108' },
    { label: 'Comp set RevPAR (January)', value: '$75.00' },
    { label: "Manager's read", value: '"Strong month — OCC and ADR both up YoY"' },
  ],
  question:
    "What is your hotel's January RevPAR, and is the manager's characterization accurate?",
  options: [
    {
      label:
        "Your RevPAR = 65% × $108 = $70.20. The RevPAR Index vs the comp set = $70.20 / $75.00 = 93.6 — meaning you underperformed the market by 6.4% on a per-available-room basis. The manager is confusing absolute improvement (both metrics up YoY) with relative performance (you're trailing the market). A RevPAR Index below 100 means you're losing share. January is not 'strong' in the relative sense that matters for competitive positioning.",
      isBest: true,
      explanation:
        "RevPAR (Revenue Per Available Room) = Occupancy × ADR. It's the fundamental hotel revenue metric because it measures revenue efficiency across all available rooms, not just occupied rooms. 65% × $108 = $70.20. RevPAR Index = your RevPAR / comp set RevPAR × 100 = $70.20 / $75.00 × 100 = 93.6. Index below 100 = losing market share. The absolute trend (YoY improvement) and the relative trend (index vs comp set) are separate questions — good operators track both. 'Strong month' without context of the comp set is a meaningless benchmark.",
    },
    {
      label:
        "RevPAR = $108 per night — that's the revenue rate; occupancy just tells you utilization, not revenue.",
      isBest: false,
      explanation:
        "ADR ($108) is the average revenue per *occupied* room — it only counts rooms that were sold. RevPAR divides total room revenue by *all available* rooms, whether sold or not. RevPAR = ADR × Occupancy = $108 × 65% = $70.20. The distinction matters: a hotel with 100% occupancy at $70 and a hotel with 65% occupancy at $108 have almost the same RevPAR ($70 vs $70.20) but very different operational profiles.",
    },
    {
      label:
        "RevPAR = room count × occupancy = 150 × 65% = 97.5 occupied rooms.",
      isBest: false,
      explanation:
        "That calculation gives you occupied rooms, not RevPAR. RevPAR is a revenue metric (dollars per available room), not a room-count metric. RevPAR = ADR × Occupancy = $108 × 65% = $70.20/available room/night. Total monthly room revenue = $70.20 × 150 keys × 31 days = $326,430.",
    },
    {
      label:
        "You can't compare your RevPAR to the STR comp set without verifying that the comp set hotels have the same star rating and number of keys.",
      isBest: false,
      explanation:
        "STR comp sets are specifically curated to include competitive hotels of similar service level, size, and location — that's the point of subscribing to STR. If the comp set is well-defined (which it is in the scenario), comparing your RevPAR Index is both valid and essential. Refusing to make the comparison misses the entire purpose of the STR report.",
    },
  ],
  takeaway:
    "RevPAR = ADR × Occupancy. It's the primary hotel revenue metric because it captures both rate and occupancy in a single number, measuring how efficiently a hotel monetizes its total room inventory — not just the rooms it sold. RevPAR Index (your RevPAR / comp set RevPAR × 100) tells you whether you're gaining or losing market share. Always evaluate hotel performance on both the absolute trend (YoY) and the relative index — they can tell contradictory stories, and the index is the one that reveals competitive positioning.",
  tips: [
    "RevPAR = ADR × Occupancy = Total room revenue ÷ Available room-nights (keys × days).",
    "RevPAR Index > 100 = gaining share; < 100 = losing share; = 100 = tracking the market.",
    "ADR Index and Occupancy Index decompose RevPAR Index — useful for diagnosing whether you're losing on rate, volume, or both.",
  ],
};
