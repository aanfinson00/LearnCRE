import type { HTMLAttributes } from 'react';

export function Card({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl border border-warm-line bg-warm-white/70 backdrop-blur-sm p-6 shadow-aa transition-all duration-aa ease-aa ${className}`}
      {...rest}
    />
  );
}
