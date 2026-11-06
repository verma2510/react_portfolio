import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface CommandContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const CommandContext = createContext<CommandContextValue>({ open: false, setOpen: () => {}, toggle: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const useCommandMenu = () => useContext(CommandContext);

/** Owns the command-palette open state and the global ⌘K / Ctrl+K shortcut. */
export function CommandProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);
  return <CommandContext.Provider value={value}>{children}</CommandContext.Provider>;
}
