import type { ExcelTemplate } from '../types';

// Year-1 $25/SF, three 3% bumps (yrs 2-4), then $0.50/SF flat bump in yr 5.
const startingRent = 25;
const pctBump = 0.03;
const numPctBumps = 3;
const flatBump = 0.5;
const expected = startingRent * Math.pow(1 + pctBump, numPctBumps) + flatBump;

export const rentBumpsWithSteps: ExcelTemplate = {
  id: 'rent-bumps-with-steps',
  title: 'Year-5 rent with mixed bump structure',
  category: 'arithmetic',
  difficulty: 'intermediate',
  roles: ['assetManagement', 'acquisitions'],
  scenario:
    'A 5-year office lease starts at $25/SF. The lease has 3% annual bumps in years 2, 3, and 4, then a $0.50/SF flat step in year 5. Compute the year-5 rent.',
  instruction:
    'In B5, compute the year-5 rent. Apply the three compounding bumps to the starting rent, then add the flat step. Use the ^ operator for the compounding piece.',
  targetCell: 'B5',
  expected,
  tolerancePct: 0.005,
  exampleFormula: '=B1*(1+B2)^B3+B4',
  layout: {
    rows: 5,
    cols: 2,
    cells: [
      { address: 'A1', role: 'header', text: 'Year-1 rent' },
      { address: 'B1', role: 'assumption', value: startingRent, format: 'usdPerSf' },
      { address: 'A2', role: 'header', text: 'Annual % bump' },
      { address: 'B2', role: 'assumption', value: pctBump, format: 'pct' },
      { address: 'A3', role: 'header', text: '# of % bumps' },
      { address: 'B3', role: 'assumption', value: numPctBumps, format: 'number' },
      { address: 'A4', role: 'header', text: 'Year-5 flat bump' },
      { address: 'B4', role: 'assumption', value: flatBump, format: 'usdPerSf' },
      { address: 'A5', role: 'header', text: 'Year-5 rent' },
      { address: 'B5', role: 'target', format: 'usdPerSf' },
    ],
  },
  takeaway:
    'Mixed bump structures show up constantly in real leases — % bumps for some years and flat $/SF steps for others. The clean formula is starting × (1 + %)^N + flat. Order matters when bumps are sequential vs. parallel; here they\'re sequential, so the flat step lands on top of the compounded base.',
  solution: `B1 × (1 + B2)^B3 + B4 = 25 × 1.03^3 + 0.50 = ${(startingRent * Math.pow(1.03, 3)).toFixed(4)} + 0.50 = $${expected.toFixed(2)}/SF.`,
};
