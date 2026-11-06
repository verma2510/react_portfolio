import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { buttonClass, type Size, type Variant } from './buttonStyles';

interface Common {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

export function Button({ variant, size, className, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={buttonClass(variant, size, className)} {...rest} />;
}

/** External/asset link styled as a button. Adds safe rel for new tabs. */
export function ButtonA({ variant, size, className, target, rel, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={buttonClass(variant, size, className)}
      target={target}
      rel={target === '_blank' ? rel ?? 'noopener noreferrer' : rel}
      {...rest}
    />
  );
}

export function ButtonLink({ variant, size, className, ...rest }: Common & LinkProps) {
  return <Link className={buttonClass(variant, size, className)} {...rest} />;
}
