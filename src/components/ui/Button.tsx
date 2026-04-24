import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const styles: Record<Variant, string> = {
  primary:
    'bg-warm-black text-warm-white hover:bg-warm-ink focus:ring-copper disabled:bg-warm-mute',
  secondary:
    'bg-transparent text-warm-black border border-warm-line hover:border-warm-black hover:bg-warm-paper/40 focus:ring-copper',
  ghost:
    'text-warm-stone hover:text-warm-black hover:bg-warm-paper/60 focus:ring-copper',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'primary', className = '', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium tracking-tight transition-all duration-aa ease-aa focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-warm-white disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...rest}
    />
  );
});
