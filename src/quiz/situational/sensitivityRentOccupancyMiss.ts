import type { SituationalCase } from '../../types/situational';

export const sensitivityRentOccupancyMiss: SituationalCase = {
  id: 'sensitivity-rent-occupancy-miss',
  title: "Rent AND occupancy both miss pro forma — how much value is lost?",
  category: 'sensitivity',
  difficulty: 'beginner',
  roles: ['acquisitions', 'assetManagement'],
  assetClass: 'multifamily',
  scenario:
    "You underwrite a 200-unit apartment building at $1,500/unit/month gross rent, 96% occupancy, and a 35% operating expense ratio. The trailing-12 actuals come in at $1,425/unit/month and 93% occupancy. Both misses are real: market rents softened and one building renovation is holding back lease-up. The going-in cap rate was 5.5%.",
  data: [
    { label: 'Unit count', value: '200 units' },
    { label: 'Pro forma rent', value: '$1,500/unit/month' },
    { label: 'Actual rent', value: '$1,425/unit/month (–5%)' },
    { label: 'Pro forma occupancy', value: '96%' },
    { label: 'Actual occupancy', value: '93%' },
    { label: 'OpEx ratio', value: '35% (unchanged)' },
    { label: 'Cap rate', value: '5.5%' },
  ],
  question:
    "How much does NOI fall, and what is the implied change in asset value at a 5.5% cap?",
  options: [
    {
      label:
        "Pro forma NOI = $2,246,400; actual NOI = $2,067,390 — a drop of ~$179k (–8%). At a 5.5% cap, that NOI miss translates to a value decline of ~$3.25M (from ~$40.8M to ~$37.6M). The rent miss alone accounts for ~$115k of the NOI decline; the occupancy miss adds another ~$64k. The two misses compound because lower rents and lower occupancy both reduce effective gross income before OpEx.",
      isBest: true,
      explanation:
        "Pro forma: GPR = 200 × $1,500 × 12 = $3.6M; EGI = $3.6M × 96% = $3.456M; NOI = $3.456M × 65% = $2,246,400; value = $2,246,400 / 5.5% = $40.85M. Actual: GPR = 200 × $1,425 × 12 = $3.42M; EGI = $3.42M × 93% = $3,180,600; NOI = $3,180,600 × 65% = $2,067,390; value = $2,067,390 / 5.5% = $37.59M. The NOI gap is $179k and the value gap is ~$3.25M. This is a straightforward two-variable sensitivity that every acquisitions analyst needs to be able to run quickly.",
    },
    {
      label:
        "NOI falls by ~5% (the rent miss only) — about $112k, worth ~$2M of lost value at 5.5%.",
      isBest: false,
      explanation:
        "Only accounts for the rent miss. The occupancy miss adds a separate layer: effective gross income is hurt both by lower revenue per occupied unit (rent) and fewer occupied units (vacancy). Running only the rent sensitivity underestimates the total NOI hit by ~37%.",
    },
    {
      label:
        "The two misses roughly offset each other — occupancy is only 3 points off and rent is only 5% off, so the combined effect is minimal.",
      isBest: false,
      explanation:
        "The misses don't offset — they compound. Both rent and occupancy are inputs into the same numerator (effective gross income), so lower rent AND lower occupancy together reduce NOI more than either alone. An 8% combined NOI decline on a $40M asset is a $3.25M value impact, which is far from minimal.",
    },
    {
      label:
        "You can't calculate NOI without knowing the detailed OpEx breakdown — the 35% ratio might not hold if property management or maintenance changes.",
      isBest: false,
      explanation:
        "The problem states OpEx ratio is unchanged at 35%, so the calculation is straightforward. In practice, OpEx can shift, but when you're given a ratio assumption, use it. The discipline is to run the sensitivity with the given inputs, note the assumption, and separately flag where OpEx might deviate.",
    },
  ],
  takeaway:
    "A two-variable NOI sensitivity (rent and occupancy) is one of the most common quick calculations in acquisitions. The formula is: NOI = (units × monthly rent × 12) × occupancy % × (1 − OpEx ratio). Run the pro forma and actual versions, take the difference, and divide by the cap rate for the implied value change. The key insight is that rent and occupancy misses compound — both reduce effective gross income simultaneously.",
  tips: [
    "Quick formula: NOI = GPR × occupancy × (1 − OpEx ratio), where GPR = units × monthly rent × 12.",
    "Every 1% of occupancy on a 200-unit/$1,425 asset = ~$34k of annual EGI = ~$22k of NOI = ~$400k of value at 5.5%.",
    "Every $25/unit/month of rent on this asset = ~$60k of annual NOI = ~$1.1M of value at 5.5%.",
  ],
};
