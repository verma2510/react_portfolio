import { m, type HTMLMotionProps } from 'framer-motion';

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  /** Vertical travel in px */
  y?: number;
  as?: 'div' | 'li' | 'article' | 'section';
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades content up once as it enters the viewport. Honors reduced-motion via MotionConfig. */
export function Reveal({ delay = 0, y = 18, as = 'div', children, ...rest }: RevealProps) {
  const Component = m[as] as typeof m.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}
