import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { SiteShell } from './components/layout/SiteShell';
import { ActiveSectionProvider } from './providers/ActiveSectionProvider';
import { CommandProvider } from './providers/CommandProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import HomePage from './pages/HomePage';

// Case studies are a secondary route — split them out of the initial bundle.
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));

function Page({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  // Key by "page", not full URL, so hash changes on home don't remount it
  const pageKey = location.pathname.startsWith('/work/') ? location.pathname : '/';

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={pageKey}>
        <Route path="/" element={<Page><HomePage /></Page>} />
        <Route
          path="/work/:slug"
          element={
            <Page>
              <Suspense fallback={<div className="min-h-dvh" />}>
                <CaseStudyPage />
              </Suspense>
            </Page>
          }
        />
        {/* Unknown routes fall back to the home page (preserves previous behaviour) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CommandProvider>
          <ActiveSectionProvider>
            <SiteShell>
              <AnimatedRoutes />
            </SiteShell>
          </ActiveSectionProvider>
        </CommandProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
