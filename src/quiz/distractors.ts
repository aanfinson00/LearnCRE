import type { Question, Rng } from '../types/question';

function dedupeRound(values: number[], unit: Question['unit']): number[] {
  const keyOf = (v: number) => {
    switch (unit) {
      case 'bps':
        return Math.round(v).toString();
      case 'multiple':
        return v.toFixed(2);
      case 'pct':
      case 'pctChange':
        return (Math.round(v * 10000) / 10000).toString();
      case 'usdPerSf':
        return v.toFixed(2);
      default:
        return Math.round(v).toString();
    }
  };
  const seen = new Set<string>();
  const out: number[] = [];
  for (const v of values) {
    const k = keyOf(v);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(v);
    }
  }
  return out;
}

export function buildChoices(q: Question, rng: Rng): number[] {
  const e = q.expected;
  const abs = Math.abs(e) || 1;

  const candidates: number[] = [e];

  switch (q.unit) {
    case 'bps':
      candidates.push(Math.round(e + 25), Math.round(e - 25), Math.round(e + 50));
      candidates.push(Math.round(e * 1.2));
      candidates.push(Math.round(e * 0.8));
      break;
    case 'multiple':
      candidates.push(+(e * 1.2).toFixed(2), +(e * 0.83).toFixed(2), +(e + 0.3).toFixed(2));
      candidates.push(+(1 / e).toFixed(2));
      break;
    case 'pct':
    case 'pctChange':
      candidates.push(e * 1.25, e * 0.75, -e);
      candidates.push(e + 0.01, e - 0.01);
      break;
    case 'usd':
    case 'usdChange':
      candidates.push(e * 1.2, e * 0.83, -e);
      candidates.push(e + abs * 0.15);
      break;
    case 'usdPerSf':
      candidates.push(+(e * 1.2).toFixed(2), +(e * 0.83).toFixed(2), +(e + 25).toFixed(2));
      candidates.push(+(e - 25).toFixed(2));
      break;
  }

  const unique = dedupeRound(candidates, q.unit).filter((v) => !Object.is(v, NaN));
  const pool = unique.slice(1);
  const picked: number[] = [];
  while (picked.length < 3 && pool.length > 0) {
    const idx = Math.floor(rng.next() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  while (picked.length < 3) {
    const noise = (rng.next() - 0.5) * abs * 0.5;
    picked.push(e + noise);
  }

  const all = [e, ...picked];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all;
}
