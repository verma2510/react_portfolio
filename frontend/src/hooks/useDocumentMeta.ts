import { useEffect } from 'react';

const DEFAULT_TITLE = 'Aman Verma — Software Development Engineer';

/** Sets the document title and meta description for the current route. */
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Aman Verma` : DEFAULT_TITLE;
    if (!description) return;
    const meta = document.querySelector('meta[name="description"]');
    const previous = meta?.getAttribute('content');
    meta?.setAttribute('content', description);
    return () => {
      if (previous) meta?.setAttribute('content', previous);
    };
  }, [title, description]);
}
