import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Navigates to a home-page section from anywhere in the app.
 * On the home route it scrolls in place; elsewhere it routes home and
 * hands the target id to the home page via router state.
 */
export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: string) => {
      if (pathname === '/') {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', id === 'index' ? '/' : `#${id}`);
        }
        return;
      }
      navigate(id === 'index' ? '/' : `/#${id}`, { state: { scrollTo: id } });
    },
    [navigate, pathname],
  );
}
