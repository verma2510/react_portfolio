import { useEffect, useRef } from 'react';

/**
 * Adds `.is-in` to an element the first time it enters the viewport.
 * A single IntersectionObserver is shared by every revealed element.
 */
const callbacks = new WeakMap<Element, () => void>();
let shared: IntersectionObserver | null = null;

function observer() {
  if (!shared) {
    shared = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.();
          callbacks.delete(entry.target);
          shared?.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
    );
  }
  return shared;
}

export function useReveal<T extends Element = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return;
    }
    const obs = observer();
    callbacks.set(el, () => el.classList.add('is-in'));
    obs.observe(el);
    return () => {
      callbacks.delete(el);
      obs.unobserve(el);
    };
  }, []);

  return ref;
}
