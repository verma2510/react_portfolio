import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', toggleTheme: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

const THEME_COLOR: Record<Theme, string> = { dark: '#0a0a0b', light: '#f4f3ef' };

function readInitialTheme(fallback: Theme): Theme {
  // index.html applies the stored theme before paint; mirror it here.
  if (typeof document !== 'undefined') {
    const cl = document.documentElement.classList;
    if (cl.contains('light')) return 'light';
    if (cl.contains('dark')) return 'dark';
  }
  return fallback;
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: { children: ReactNode; defaultTheme?: Theme }) {
  const [theme, setTheme] = useState<Theme>(() => readInitialTheme(defaultTheme));

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable (private mode) — theme still applies for this session */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
