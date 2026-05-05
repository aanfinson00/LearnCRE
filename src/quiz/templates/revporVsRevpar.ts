import { formatPct, formatUsd } from '../../math/rounding';
import type { QuestionTemplate, Solution } from '../../types/question';
import { nextId } from '../random';

function buildSolution(roomRev: number, roomsSold: number, expected: number): Solution {
  return {
    formula: 'RevPOR = Room Revenue / Rooms Sold',
    steps: [
      {
        label: 'RevPOR',
        expression: `${formatUsd(roomRev)} / ${roomsSold.toLocaleString()}`,
        result: formatUsd(expected),
      },
    ],
    answerDisplay: formatUsd(expected),
  };
}

export const revporVsRevparTemplate: QuestionTemplate<'revporVsRevpar'> = {
  kind: 'revporVsRevpar',
  label: 'Hotel: RevPOR (per occupied room)',
  description: 'Room revenue ÷ rooms sold → revenue per *occupied* room (not available room).',
  category: 'valuation',
  roles: ['acquisitions', 'assetManagement'],
  pattern: 'Room Rev / Rooms Sold',
  tips: [
    'RevPOR = ADR by definition (just expressed as RoomRev / RoomsSold). Distinct from RevPAR (= ADR × occupancy).',
    'TRevPOR (Total Revenue Per Occupied Room) includes F&B + ancillary — used by full-service hotels to track non-room income per stay.',
    'When occupancy drops, RevPAR drops but RevPOR can stay flat — the "yield-on-occupied-room" is intact even if demand is soft.',
    'Hotel revenue managers track RevPOR alongside RevPAR to separate pricing power (RevPOR) from demand (occupancy).',
  ],
  generate(rng, difficulty = 'intermediate', _assetClass = 'mixed') {
    void difficulty;
    const totalRooms = rng.pickFromSet([180, 220, 240, 280, 320, 360, 400] as const);
    const occ = rng.pickFromSet([0.60, 0.65, 0.70, 0.75, 0.80, 0.85] as const);
    const days = 365;
    const roomsSold = Math.round(totalRooms * occ * days);
    // ADR is the underlying value; rooms-sold * ADR is what gets shown to the
    // user. Use a wide ADR pool so the ÷ produces lots of distinct outputs.
    const adr = Math.round(rng.pickRange(140, 380) / 5) * 5;
    const roomRevenue = roomsSold * adr;
    const expected = roomRevenue / roomsSold; // = ADR

    return {
      id: nextId('revpor'),
      kind: 'revporVsRevpar',
      prompt: `A ${totalRooms}-room hotel ran ${formatPct(occ, 0)} occupancy across the year (${roomsSold.toLocaleString()} rooms sold). Room revenue was ${formatUsd(roomRevenue)}. What\'s the RevPOR?`,
      context: { roomsAvailable: totalRooms, roomsSold, totalRevenue: roomRevenue },
      expected,
      unit: 'usd',
      tolerance: { type: 'pct', band: 0.01 },
      solution: buildSolution(roomRevenue, roomsSold, expected),
    };
  },
};
