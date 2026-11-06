import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  delay?: number;
  /** Use `mask` for big headings: children slide up from behind a mask. */
  variant?: 'fade' | 'mask' | 'none';
  children: ReactNode;
};

/** Scroll-triggered reveal. Pure CSS transitions, one shared observer. */
export function Reveal({ as, delay = 0, variant = 'fade', className = '', style, children, ...rest }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  const Tag = (as ?? 'div') as ElementType;
  const vars = { ...style, '--d': `${delay}ms` } as CSSProperties;

  if (variant === 'mask') {
    return (
      <Tag ref={ref} className={`mask-line ${className}`} style={vars} {...rest}>
        <span>{children}</span>
      </Tag>
    );
  }

  return (
    <Tag ref={ref} data-reveal={variant === 'fade' ? '' : undefined} className={className} style={vars} {...rest}>
      {children}
    </Tag>
  );
}
