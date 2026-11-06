import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface RailContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggle: () => void;
}

const RailContext = createContext<RailContextValue>({ collapsed: false, setCollapsed: () => {}, toggle: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const useRail = () => useContext(RailContext);

const STORAGE_KEY = 'rail-collapsed';

function readStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

/** Desktop side-rail visibility: persisted per visitor, toggled with Ctrl/⌘+B. */
export function RailProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(readStored);
  const toggle = useCallback(() => setCollapsed((c) => !c), []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
    } catch {
      /* storage unavailable — state still applies for this session */
    }
  }, [collapsed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);

  const value = useMemo(() => ({ collapsed, setCollapsed, toggle }), [collapsed, toggle]);
  return <RailContext.Provider value={value}>{children}</RailContext.Provider>;
}
