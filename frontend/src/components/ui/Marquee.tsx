import type { CSSProperties } from 'react';

interface MarqueeProps {
  items: { name: string; proficiency?: number }[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

/** Infinite ticker band. CSS-only; duplicated track is hidden from AT. */
export function Marquee({ items, direction = 'left', speed = 40, className = '' }: MarqueeProps) {
  const style = { '--speed': `${speed}s`, '--dir': direction === 'right' ? 'reverse' : 'normal' } as CSSProperties;

  // Each track holds the list twice so it is always wider than the viewport.
  const track = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[...items, ...items].map((item, i) => (
        <li key={i} className="flex items-center whitespace-nowrap" aria-hidden={i >= items.length || undefined}>
          <span className="px-5 text-[clamp(1.25rem,2.4vw,2rem)] font-extrabold tracking-[-0.03em]">{item.name}</span>
          {item.proficiency !== undefined && (
            <sup className="label -ml-3 mr-2 text-mute">{item.proficiency}</sup>
          )}
          <span className="block h-2 w-2 bg-accent" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee-host overflow-hidden ${className}`}>
      <div className="marquee" style={style}>
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
