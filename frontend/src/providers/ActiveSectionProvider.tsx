import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { SectionId } from '../lib/content';

interface ActiveSectionValue {
  active: SectionId;
  setActive: (id: SectionId) => void;
}

const ActiveSectionContext = createContext<ActiveSectionValue>({ active: 'index', setActive: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const useActiveSectionState = () => useContext(ActiveSectionContext);

/** Pages publish which section is "current"; navigation chrome subscribes. */
export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SectionId>('index');
  const value = useMemo(() => ({ active, setActive }), [active]);
  return <ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>;
}
