import { useEffect } from 'react';
import { SiteChrome } from '../components/layout/SiteChrome';
import { Contact } from '../components/sections/Contact';
import { Credentials } from '../components/sections/Credentials';
import { Experience } from '../components/sections/Experience';
import { Hero } from '../components/sections/Hero';
import { OffHours } from '../components/sections/OffHours';
import { Profile } from '../components/sections/Profile';
import { Stack } from '../components/sections/Stack';
import { Work } from '../components/sections/Work';
import { OPEN_PROJECT_EVENT, scrollToId } from '../lib/sections';

/**
 * Narrative order: identity → proof (work) → track record → capability
 * → the person → credentials → off-hours → conversation.
 */
export function Home() {
  // Honour deep links (#projects, #project-vizintel …) once content has rendered.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    if (id.startsWith('project-')) {
      window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: id.slice('project-'.length) }));
    }
    const t = window.setTimeout(() => scrollToId(id), 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <SiteChrome>
      <main id="main" tabIndex={-1} className="outline-none lg:pl-14">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Profile />
        <Credentials />
        <OffHours />
        <Contact />
      </main>
    </SiteChrome>
  );
}
