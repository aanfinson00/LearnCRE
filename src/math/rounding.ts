export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step;
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const usdSignedFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  signDisplay: 'always',
});

export function formatUsd(value: number): string {
  return usdFormatter.format(Math.round(value));
}

export function formatUsdSigned(value: number): string {
  return usdSignedFormatter.format(Math.round(value));
}

export function formatPct(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatPctChange(value: number, decimals = 1): string {
  const pct = value * 100;
  const sign = pct > 0 ? '+' : '';
  return `${sign}${pct.toFixed(decimals)}%`;
}

export function formatBps(value: number): string {
  return `${Math.round(value * 10_000)} bps`;
}

export function formatMultiple(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}x`;
}

export function formatYears(years: number): string {
  return `${years} ${years === 1 ? 'year' : 'years'}`;
}

export function formatUsdPerSf(value: number, decimals = 2): string {
  const sign = value < 0 ? '-' : '';
  return `${sign}$${Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}/SF`;
}

export function formatSf(value: number): string {
  return `${Math.round(value).toLocaleString('en-US')} SF`;
}
