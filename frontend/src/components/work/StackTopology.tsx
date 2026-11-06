import { topology } from '../../lib/derive';

/**
 * The project's stack drawn as an architecture: one row per layer,
 * ordered from interface down to delivery.
 */
export function StackTopology({ stack }: { stack: string[] }) {
  const layers = topology(stack);
  return (
    <div className="border border-fg">
      {layers.map(({ layer, items }, i) => (
        <div key={layer} className={`grid grid-cols-[8.25rem_1fr] ${i > 0 ? 'border-t border-line' : ''}`}>
          <div className="label flex items-center gap-2 border-r border-line px-2.5 py-2 text-mute">
            <span className="font-mono text-[10px] opacity-60">L{i + 1}</span>
            {layer}
          </div>
          <ul className="flex flex-wrap gap-1.5 p-2">
            {items.map((t) => (
              <li key={t} className="border border-fg/70 px-2 py-0.5 text-xs font-semibold">
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
