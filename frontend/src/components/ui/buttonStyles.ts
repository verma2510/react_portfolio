export type Variant = 'primary' | 'secondary' | 'ghost';
export type Size = 'sm' | 'md';

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-out-quart active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-bg hover:bg-accent hover:text-accent-ink shadow-[0_1px_0_rgb(255_255_255/0.15)_inset]',
  secondary: 'border border-line-strong bg-surface/60 text-ink hover:border-ink/40 backdrop-blur',
  ghost: 'text-ink-2 hover:text-ink hover:bg-surface-2',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3.5 text-[13px]',
  md: 'h-11 px-5 text-sm',
};

export const buttonClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') =>
  `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
