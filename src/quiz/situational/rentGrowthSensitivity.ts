import type { SituationalCase } from '../../types/situational';

export const rentGrowthSensitivity: SituationalCase = {
  id: 'rent-growth-sensitivity',
  title: 'The deal pencils at 3% rent growth — what if you\'re wrong?',
  category: 'sensitivity',
  difficulty: 'intermediate',
  roles: ['acquisitions'],
  assetClass: 'multifamily',
  scenario:
    'You\'re underwriting a multifamily acquisition at a 4.75% going-in cap and 12% levered IRR, assuming 3% annual rent growth over a 5-year hold. The exit cap is modeled at 5.25%. Interest rate on the floating-rate bridge loan is SOFR + 275 bps; SOFR is currently 4.5%. A senior partner asks you to stress the rent growth assumption before IC.',
  data: [
    { label: 'Going-in cap', value: '4.75%' },
    { label: 'Modeled IRR', value: '12% (levered)' },
    { label: 'Rent growth assumption', value: '3% annual' },
    { label: 'Exit cap', value: '5.25%' },
    { label: 'Loan rate', value: 'SOFR + 275 bps (4.5% SOFR = 7.25%)' },
  ],
  question: 'Which sensitivity is most critical to run, and what does it reveal about the deal\'s risk?',
  options: [
    {
      label:
        'Run rent growth at 1% and 0% — these reflect flat real rents, which is feasible in an oversupplied submarket. At 1% growth, exit NOI drops ~10%, and at the same exit cap the IRR likely falls to 7–8%, near or below the required return. This reveals the deal\'s thin margin of safety on rent.',
      isBest: true,
      explanation:
        'Rent growth drives both the numerator (Year 5 NOI) and denominator (exit value) of the levered return. On a 5-year hold, 3% vs 1% annual compounding produces ~10.9% more NOI in the base vs the stress. At a 5.25% exit cap: base exit NOI → value is 10.9% higher, which on a levered deal amplifies the equity return spread. The real risk isn\'t NOI × cap; it\'s the debt service coverage: with a 7.25% loan rate and compressed YOC, even flat rents may trigger cash trap covenants. The stress reveals whether the deal\'s return is primarily rent-growth-dependent (speculative) or income-supported (defensive). If the IRR drops below the hurdle at 1% rent growth, that\'s an IC-level red flag, not a fine print disclosure.',
    },
    {
      label:
        'Run the exit cap at +100 bps — exit cap risk is higher than rent growth risk in today\'s environment.',
      isBest: false,
      explanation:
        'Both sensitivities should be run, but the question asks which is MOST critical given the specific setup. When the going-in cap is 4.75% and the loan is at 7.25%, positive leverage is already thin or negative (cap rate < loan constant). In this environment, rent growth is what allows NOI to grow into the debt coverage — flat rents + high debt service create a DSCR problem before exit. The exit cap stress is also important but secondary if the deal can\'t service debt in the interim years under a rent-flat scenario.',
    },
    {
      label:
        'Run the loan rate at +200 bps — floating rate risk is the dominant sensitivity for a bridge deal.',
      isBest: false,
      explanation:
        'Loan rate sensitivity is important on a floating-rate loan but slightly misses the compounding issue. SOFR + 275 bps on a floating basis means loan rate sensitivity is already somewhat priced in. The rent growth sensitivity is the internally generated lever that management can partially influence (pricing, unit upgrades) vs. the loan rate which is fully external. More importantly: the interaction between low rent growth and high floating rates is the worst case — both together is the compound stress, not either alone.',
    },
    {
      label:
        'The 3% assumption is in line with historical multifamily rent growth — no stress is needed.',
      isBest: false,
      explanation:
        'Historical average rent growth for multifamily is roughly 2–3%, but averages hide volatility. Post-2021 normalization saw rent growth flip from +15% to negative in many markets within 18 months. Underwriting to the historical average with no stress scenario is exactly how deals get handed back to lenders. The senior partner\'s request is appropriate — every IC presentation should include a downside scenario, especially when the deal is already thin on going-in spread (4.75% cap vs. 7.25% debt cost).',
    },
  ],
  takeaway:
    'Rent growth sensitivity is the most impactful single variable for levered multifamily returns because it compounds over the hold period and affects both NOI and exit value simultaneously. On deals with negative or thin positive leverage (cap rate near or below debt cost), even modest rent growth shortfalls create DSCR and refi risk that must be modeled explicitly. Always present at least three rent growth scenarios: base (underwritten), downside (flat real rents), and stress (negative 1–2%).',
  tips: [
    'Rent growth compounds: 3% vs 1% over 5 years produces 10.9% more exit NOI — a meaningful IRR spread on any levered deal.',
    'When cap rate < loan constant, positive rent growth is necessary just to maintain DSCR, not to generate returns.',
    'Present rent sensitivities as an IRR table (rows = rent growth, columns = exit cap) — the 2D table is the clearest risk visualization.',
  ],
};
