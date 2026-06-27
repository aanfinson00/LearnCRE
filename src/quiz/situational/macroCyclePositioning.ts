import type { SituationalCase } from '../../types/situational';

export const macroCyclePositioning: SituationalCase = {
  id: 'macro-cycle-positioning',
  title: 'Macro: reading the cycle — expansion, plateau, or contraction?',
  category: 'investment-thesis',
  difficulty: 'advanced',
  roles: ['acquisitions', 'portfolioMgmt'],
  scenario:
    "You're presenting to your IC on a proposed $85M multifamily acquisition in a Sun Belt MSA. The senior partner asks you to 'tell me where we are in the cycle and how that affects the underwriting.' Trailing 12-month data: vacancy in the submarket dropped from 6.8% to 4.2% over 3 years, rent growth was +8% YoY last year but has decelerated to +2.5% this year, 4,200 units are under construction in the MSA (7% of existing stock), and cap rates have compressed 75 bps from 18 months ago and appear flat now.",
  data: [
    { label: 'Submarket vacancy (3-yr trend)', value: '6.8% → 4.2%' },
    { label: 'Rent growth (prior year)', value: '+8% YoY' },
    { label: 'Rent growth (current year)', value: '+2.5% YoY' },
    { label: 'Units under construction', value: '4,200 (7% of stock)' },
    { label: 'Cap rate trend', value: '-75 bps over 18 months, now flat' },
    { label: 'Acquisition price', value: '$85M at 4.9% going-in cap' },
  ],
  question:
    "What stage of the cycle does this data pattern indicate, and how does it change your underwriting posture?",
  options: [
    {
      label:
        "The data pattern is consistent with late expansion / early plateau: supply is catching up (7% of stock under construction is elevated — Sun Belt can absorb 3-4% annually), rent growth deceleration from 8% to 2.5% signals the demand/supply gap is narrowing, and cap-rate compression flattening suggests pricing has found equilibrium. The underwriting posture: be conservative on rent growth (0-2% vs. the in-place 2.5% trend, not 8%), underwrite concessions returning as the supply wave delivers, stress-test occupancy to 6% (back toward normalized vacancy), and size the hold period to clear the supply wave (years 3-5).",
      isBest: true,
      explanation:
        "Right diagnosis. The four signals are classic late-expansion tells: (1) vacancy has moved from high to low — most of the tightening benefit is already in the NOI; (2) rent growth deceleration signals you're at or near the market peak for rents; (3) 7% supply pipeline is above sustainable absorption for most Sun Belt markets; (4) cap-rate compression has stalled — no more tailwind from repricing. The correct posture is to underwrite through the supply delivery window with conservative assumptions, not to extrapolate the 8% rent growth forward.",
    },
    {
      label:
        "Vacancy is still at 4.2% and rent growth is positive — the market is in the middle of an expansion phase. Underwrite 6-8% rent growth over the hold period to capture the remaining upside.",
      isBest: false,
      explanation:
        "The deceleration from 8% to 2.5% is the key signal — that's not 'mid-expansion' behavior; it's the inflection point. Mid-expansion is when you're still accelerating, not when growth is slowing toward flat. Underwriting 6-8% forward growth when the current trajectory is 2.5% and falling, with a 7% supply pipeline, would require a demand shock (job growth surge, population influx) that isn't in the base case. IC will call it out.",
    },
    {
      label:
        "Cap rates have compressed 75 bps and are now flat, which signals contraction has begun — the market is past its peak and you should wait for a better entry point at higher cap rates.",
      isBest: false,
      explanation:
        "Cap-rate compression flattening ≠ contraction. Contraction is characterized by rising vacancy, rent declines, and widening cap rates. The current data shows stable-to-tight vacancy and positive (if decelerating) rent growth — that's still expansion/plateau territory, not contraction. Waiting for a 'better' entry is a timing call with real costs (opportunity cost, inflation eroding purchasing power). The right move is to underwrite conservatively for the supply wave, not to sit out.",
    },
    {
      label:
        "The supply pipeline at 7% of stock is the only relevant signal — this is a contraction setup. Pull out of the deal until deliveries clear.",
      isBest: false,
      explanation:
        "Supply alone doesn't define cycle stage — it needs to be weighed against demand. Sun Belt MSAs with strong in-migration can absorb 5-6% annual supply additions. 7% is elevated but not necessarily a crash trigger if job growth is strong. The fuller picture — rent growth, vacancy trend, cap-rate direction — is needed for the diagnosis. Pulling from every deal with an elevated supply pipeline would have meant missing 2015-2019 Sun Belt entirely.",
    },
  ],
  takeaway:
    "Cycle positioning uses four concurrent signals: vacancy trend (direction and level), rent growth trend (acceleration vs. deceleration), supply pipeline vs. absorption capacity, and cap-rate direction. Late expansion / early plateau is the most common IC trap — markets still look healthy in the trailing data, but the forward supply and slowing rent growth are the leading indicators. The underwriting posture is: conservative rent growth (in-line with or below current trend, not peak), stress-test occupancy to normalized vacancy, and hold-period timing that clears the supply wave.",
  tips: [
    "Market phases: recovery (vacancy falling, rents flat) → expansion (vacancy tight, rents rising) → plateau (rent growth decelerating, supply rising) → contraction (vacancy rising, rents declining). Most deals close in expansion or plateau.",
    "Sun Belt absorption benchmark: 3-5% of stock per year for high-growth MSAs. >6% supply pipeline starts to pressure absorption.",
    "Cap-rate compression stalling is a leading indicator that pricing has found equilibrium — it often precedes contraction by 6-18 months.",
  ],
};
