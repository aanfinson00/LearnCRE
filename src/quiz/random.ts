import type { Rng } from '../types/question';

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createRng(seed?: number): Rng {
  const s = seed ?? (Math.floor(Math.random() * 2 ** 31) >>> 0);
  const rand = mulberry32(s);

  const next = () => rand();

  return {
    next,
    pickRange(min, max, opts) {
      const raw = min + next() * (max - min);
      if (opts?.step) {
        return Math.round(raw / opts.step) * opts.step;
      }
      return raw;
    },
    pickFromSet(values) {
      return values[Math.floor(next() * values.length)];
    },
    pickInt(min, max) {
      return Math.floor(min + next() * (max - min + 1));
    },
  };
}

let idCounter = 0;
export function nextId(prefix = 'q'): string {
  idCounter += 1;
  return `${prefix}_${Date.now().toString(36)}_${idCounter}`;
}
