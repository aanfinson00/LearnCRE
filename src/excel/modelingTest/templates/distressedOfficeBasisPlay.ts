import type { ModelingTestTemplate } from '../../../types/modelingTest';
import type { SheetCell } from '../../types';

const TOTAL_SF = 200_000;
const ACQ_PRICE = 25_000_000;
const REPLACEMENT_PER_SF = 400;
const CURRENT_OCC = 0.50;
const IN_PLACE_RENT_PER_SF = 25;
const OPEX_PER_SF_TOTAL = 10;
const TARGET_OCC = 0.90;
const NEW_RENT_PER_SF = 30;
const TI_PER_SF = 40;
const FREE_RENT_MONTHS = 6;
const EXIT_CAP = 0.065;

const PRICE_PER_SF = ACQ_PRICE / TOTAL_SF;
const OCCUPIED_SF = TOTAL_SF * CURRENT_OCC;
const IN_PLACE_GPR = OCCUPIED_SF * IN_PLACE_RENT_PER_SF;
const TOTAL_OPEX = TOTAL_SF * OPEX_PER_SF_TOTAL;
const IN_PLACE_NOI = IN_PLACE_GPR - TOTAL_OPEX;
const NEW_SF = TOTAL_SF * (TARGET_OCC - CURRENT_OCC);
const TI_CAPEX = NEW_SF * TI_PER_SF;
const FREE_RENT_RESERVE = NEW_SF * NEW_RENT_PER_SF * (FREE_RENT_MONTHS / 12);
const ALL_IN_BASIS = ACQ_PRICE + TI_CAPEX + FREE_RENT_RESERVE;
const STAB_GPR = OCCUPIED_SF * IN_PLACE_RENT_PER_SF + NEW_SF * NEW_RENT_PER_SF;
const STAB_NOI = STAB_GPR - TOTAL_OPEX;
const STAB_VALUE = STAB_NOI / EXIT_CAP;
const YIELD_ON_BASIS = STAB_NOI / ALL_IN_BASIS;
const PROFIT_ON_BASIS = (STAB_VALUE - ALL_IN_BASIS) / ALL_IN_BASIS;

const cells: SheetCell[] = [
  { address: 'A1', role: 'header', text: 'Assumptions' },
  { address: 'A2', role: 'header', text: 'Total SF' },
  { address: 'B2', role: 'assumption', value: TOTAL_SF, format: 'number' },
  { address: 'A3', role: 'header', text: 'Acquisition price (distressed)' },
  { address: 'B3', role: 'assumption', value: ACQ_PRICE, format: 'usd' },
  { address: 'A4', role: 'header', text: 'Replacement cost / SF' },
  { address: 'B4', role: 'assumption', value: REPLACEMENT_PER_SF, format: 'usdPerSf' },
  { address: 'A5', role: 'header', text: 'Current occupancy' },
  { address: 'B5', role: 'assumption', value: CURRENT_OCC, format: 'pct' },
  { address: 'A6', role: 'header', text: 'In-place rent / SF (occupied)' },
  { address: 'B6', role: 'assumption', value: IN_PLACE_RENT_PER_SF, format: 'usdPerSf' },
  { address: 'A7', role: 'header', text: 'OpEx / SF (on total SF)' },
  { address: 'B7', role: 'assumption', value: OPEX_PER_SF_TOTAL, format: 'usdPerSf' },
  { address: 'A8', role: 'header', text: 'Target occupancy' },
  { address: 'B8', role: 'assumption', value: TARGET_OCC, format: 'pct' },
  { address: 'A9', role: 'header', text: 'New-lease rent / SF' },
  { address: 'B9', role: 'assumption', value: NEW_RENT_PER_SF, format: 'usdPerSf' },
  { address: 'A10', role: 'header', text: 'TI / SF (new leases)' },
  { address: 'B10', role: 'assumption', value: TI_PER_SF, format: 'usdPerSf' },
  { address: 'A11', role: 'header', text: 'Free rent (months)' },
  { address: 'B11', role: 'assumption', value: FREE_RENT_MONTHS, format: 'number' },
  { address: 'A12', role: 'header', text: 'Stabilized exit cap' },
  { address: 'B12', role: 'assumption', value: EXIT_CAP, format: 'pct' },

  { address: 'A14', role: 'header', text: 'Pre-acquisition basis' },
  { address: 'A15', role: 'header', text: 'Price per SF' },
  { address: 'B15', role: 'target', label: 'Price per SF', format: 'usdPerSf' },
  { address: 'A16', role: 'header', text: 'Discount to replacement' },
  { address: 'B16', role: 'target', label: 'Discount to replacement', format: 'pct' },
  { address: 'A17', role: 'header', text: 'Occupied SF (in-place)' },
  { address: 'B17', role: 'target', label: 'Occupied SF', format: 'number' },
  { address: 'A18', role: 'header', text: 'In-place GPR' },
  { address: 'B18', role: 'target', label: 'In-place GPR', format: 'usd' },
  { address: 'A19', role: 'header', text: 'Total OpEx' },
  { address: 'B19', role: 'target', label: 'Total OpEx', format: 'usd' },
  { address: 'A20', role: 'header', text: 'In-place NOI' },
  { address: 'B20', role: 'target', label: 'In-place NOI', format: 'usd' },

  { address: 'A22', role: 'header', text: 'Lease-up plan' },
  { address: 'A23', role: 'header', text: 'New SF leased to reach target' },
  { address: 'B23', role: 'target', label: 'New SF leased', format: 'number' },
  { address: 'A24', role: 'header', text: 'TI capex (new SF × TI/SF)' },
  { address: 'B24', role: 'target', label: 'TI capex', format: 'usd' },
  { address: 'A25', role: 'header', text: 'Free rent reserve (new SF × rent × months/12)' },
  { address: 'B25', role: 'target', label: 'Free rent reserve', format: 'usd' },

  { address: 'A27', role: 'header', text: 'All-in basis' },
  { address: 'A28', role: 'header', text: 'All-in basis (price + TI + free rent)' },
  { address: 'B28', role: 'target', label: 'All-in basis', format: 'usd' },

  { address: 'A30', role: 'header', text: 'Stabilized economics' },
  { address: 'A31', role: 'header', text: 'Stabilized occupied SF' },
  { address: 'B31', role: 'target', label: 'Stabilized occupied SF', format: 'number' },
  { address: 'A32', role: 'header', text: 'Stabilized GPR (in-place rent + new-lease rent)' },
  { address: 'B32', role: 'target', label: 'Stabilized GPR', format: 'usd' },
  { address: 'A33', role: 'header', text: 'Stabilized NOI' },
  { address: 'B33', role: 'target', label: 'Stabilized NOI', format: 'usd' },

  { address: 'A35', role: 'header', text: 'Stabilized value + returns' },
  { address: 'A36', role: 'header', text: 'Stabilized value (NOI ÷ exit cap)' },
  { address: 'B36', role: 'target', label: 'Stabilized value', format: 'usd' },
  { address: 'A37', role: 'header', text: 'Yield on basis (stab NOI ÷ all-in basis)' },
  { address: 'B37', role: 'target', label: 'Yield on basis', format: 'pct' },
  { address: 'A38', role: 'header', text: 'Profit on basis (($ profit) ÷ all-in basis)' },
  { address: 'B38', role: 'target', label: 'Profit on basis', format: 'pct' },
];

export const distressedOfficeBasisPlay: ModelingTestTemplate = {
  id: 'distressed-office-basis-play',
  title: 'Distressed Deal — Basis Play on Half-Vacant Office',
  scenario:
    'A 200k SF Class-B suburban office, half-vacant after a major tenant departure, selling at distress for $25M (well below replacement cost). Underwrite the basis play: lease-up plan, all-in basis, yield on basis, and profit on basis at stabilization.',
  brief: {
    paragraphs: [
      'Subject was originally bought at $50M / $32.5M senior debt and stabilized at 75% leased. Major tenant left; building is now 50% leased. Sponsor is in maturity default and lender is selling the asset at $25M to clear the loan — $125/SF, vs ~$400/SF replacement cost for ground-up office. The ~70% discount to replacement is the entire investment thesis.',
      'In-place rents at $25/SF for occupied space; vacant space leases at refreshed $30/SF given the leasing concessions you have to offer. OpEx runs $10/SF on total square footage (mostly fixed — taxes, insurance, base service contracts) and does NOT drop when occupancy drops. Lease-up plan: take the building from 50% to 90% leased. New leases need $40/SF in TI plus 6 months free rent.',
    ],
    bullets: [
      'Pre-acquisition basis: price per SF, discount to replacement cost, in-place NOI on the half-vacant building (will be very low — that is why the lender is selling).',
      'Lease-up plan: new SF to lease = (target − current occupancy) × total SF; TI capex = new SF × TI/SF; free rent reserve = new SF × new rent × free months / 12.',
      'All-in basis = acquisition price + TI capex + free rent reserve. This is your effective cost basis once the asset stabilizes.',
      'Stabilized economics: stab GPR = (occupied SF × in-place rent) + (new SF × new rent); stab NOI = stab GPR − total OpEx (OpEx unchanged).',
      'Returns: stab value = stab NOI ÷ exit cap. Yield on basis = stab NOI ÷ all-in basis. Profit on basis = (stab value − all-in basis) ÷ all-in basis.',
    ],
  },
  estimatedMinutes: 25,
  difficulty: 'advanced',
  layout: { rows: 39, cols: 3, cells },
  outputs: [
    {
      ref: 'B20',
      label: 'In-place NOI',
      format: 'usd',
      expected: IN_PLACE_NOI,
      tolerance: { rel: 0.01 },
      whenWrongTry:
        'In-place NOI = (occupied SF × in-place rent) − total OpEx. OpEx is on TOTAL SF, not occupied SF — vacant space still costs you taxes/insurance/base service. The number will be small ($500k on a $25M acquisition = 2% going-in cap), which is exactly why the lender is selling.',
    },
    {
      ref: 'B28',
      label: 'All-in basis',
      format: 'usd',
      expected: ALL_IN_BASIS,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        '=B3+B24+B25 — acquisition price + TI capex + free rent reserve. Free rent IS a cost — you are paying tenants in income for their lease-up period. Excluding it understates your real basis by ~4%.',
    },
    {
      ref: 'B33',
      label: 'Stabilized NOI',
      format: 'usd',
      expected: STAB_NOI,
      tolerance: { rel: 0.005 },
      whenWrongTry:
        '=B32-B19 — stab GPR minus the same OpEx as in-place. Stab GPR is in-place revenue ($25/SF on existing 100k SF) + new-lease revenue ($30/SF on 80k new SF) — a blended $4.9M.',
    },
    {
      ref: 'B37',
      label: 'Yield on basis',
      format: 'pct',
      expected: YIELD_ON_BASIS,
      tolerance: { abs: 0.0005 },
      whenWrongTry:
        '=B33/B28 — stab NOI ÷ all-in basis. ~10% yield on basis vs a 6.5% market cap means a 350 bps "development-style" spread — fat margin for execution risk on a basis play.',
    },
    {
      ref: 'B38',
      label: 'Profit on basis',
      format: 'pct',
      expected: PROFIT_ON_BASIS,
      tolerance: { abs: 0.005 },
      whenWrongTry:
        '=(B36-B28)/B28 — stab value minus all-in basis, all over all-in basis. The ~50% margin on basis is your cushion for things going wrong (longer lease-up, lower in-place rents at signing, opex creep).',
    },
  ],
  checkpoints: [
    {
      ref: 'B15',
      label: 'Price per SF',
      format: 'usdPerSf',
      expected: PRICE_PER_SF,
      tolerance: { abs: 1 },
      diagnostic:
        '=B3/B2 — acquisition price divided by total SF. Should land at $125/SF. Compare to $400/SF replacement cost: a ~70% discount is the entire reason this deal is interesting.',
      explains: ['B16'],
    },
    {
      ref: 'B24',
      label: 'TI capex',
      format: 'usd',
      expected: TI_CAPEX,
      tolerance: { rel: 0.005 },
      diagnostic:
        '=B23*B10 — new SF leased × TI/SF. New SF leased = (target − current occupancy) × total SF = 80k. If you used total SF here instead of NEW SF, you would over-budget TI by 2.5×.',
      explains: ['B28', 'B37', 'B38'],
    },
    {
      ref: 'B36',
      label: 'Stabilized value',
      format: 'usd',
      expected: STAB_VALUE,
      tolerance: { rel: 0.005 },
      diagnostic:
        '=B33/B12 — stab NOI ÷ exit cap. Drives the profit-on-basis output. If wrong, your headline return number is wrong.',
      explains: ['B38'],
    },
  ],
  rubric:
    'Distressed underwriting is a basis play. The deal pencils when (a) the discount to replacement cost is large enough that physical depreciation + lease-up cost still leaves you below replacement, and (b) the development-style spread (yield on basis − market cap) compensates for execution risk on a half-vacant building. The classic errors: scaling OpEx with occupancy (most office OpEx is fixed — vacant space still costs you taxes, insurance, and base service contracts), forgetting free rent in the all-in basis (it is a real cash cost), and using total SF for TI when only new leases need TIs. The 50% leased starting point drives in-place NOI to a token number — that is why the lender is selling, and that is why a buyer at $25M can lock in a basis below replacement and underwrite a ~50% profit on basis at stabilization. Going-in cap on in-place NOI looks ugly (~2%); yield on basis at stabilization (~10%) is the number that actually matters.',
};
