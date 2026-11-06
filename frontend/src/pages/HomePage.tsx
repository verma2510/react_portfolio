import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SECTIONS, type SectionId } from '../lib/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useActiveSectionState } from '../providers/ActiveSectionProvider';
import { Hero } from '../sections/Hero';
import { Work } from '../sections/Work';
import { Experience } from '../sections/Experience';
import { Stack } from '../sections/Stack';
import { Profile } from '../sections/Profile';
import { Credentials } from '../sections/Credentials';
import { OffClock } from '../sections/OffClock';
import { Contact } from '../sections/Contact';

const SECTION_IDS = SECTIONS.map((s) => s.id);

/**
 * Narrative order: who → proof (work) → track record → capabilities →
 * person → credentials → life outside work → conversation.
 */
export default function HomePage() {
  useDocumentMeta();
  const location = useLocation();
  const active = useActiveSection(SECTION_IDS) as SectionId;
  const { setActive } = useActiveSectionState();

  useEffect(() => {
    setActive(active);
  }, [active, setActive]);

  // Arriving from another route (or a deep link) with a target section
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo ?? location.hash.slice(1);
    if (target) {
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: 'instant', block: 'start' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // run once per arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Stack />
      <Profile />
      <Credentials />
      <OffClock />
      <Contact />
    </>
  );
}
