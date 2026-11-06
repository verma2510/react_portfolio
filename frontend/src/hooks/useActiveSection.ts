import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing the reading line
 * (~40% from the top of the viewport). Re-subscribes when `enabled` flips,
 * e.g. when navigating back to the home route.
 */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState<string>(ids[0]);

  useEffect(() => {
    if (!enabled) return;
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -59% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}
