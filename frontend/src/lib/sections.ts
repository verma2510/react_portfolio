/**
 * Single source of truth for page sections. IDs are kept identical to
 * the previous version so existing deep links (#projects, #about …)
 * keep working.
 */
export const SECTIONS = [
  { id: 'home', no: '00', label: 'Index' },
  { id: 'projects', no: '01', label: 'Work' },
  { id: 'experience', no: '02', label: 'Experience' },
  { id: 'skills', no: '03', label: 'Stack' },
  { id: 'about', no: '04', label: 'Profile' },
  { id: 'education', no: '05', label: 'Credentials' },
  { id: 'hobbies', no: '06', label: 'Off-hours' },
  { id: 'contact', no: '07', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const SECTION_IDS: readonly string[] = SECTIONS.map((s) => s.id);

export const sectionById = (id: string) => SECTIONS.find((s) => s.id === id) ?? SECTIONS[0];

export const OPEN_PROJECT_EVENT = 'portfolio:open-project';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth-scrolls to an element and records it in the URL hash for sharing. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  const url = id === 'home' ? window.location.pathname : `#${id}`;
  window.history.replaceState(null, '', url);
}

/** Opens a project case file in the index (if collapsed) and scrolls to it. */
export function openProject(slug: string) {
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: slug }));
  requestAnimationFrame(() => scrollToId(`project-${slug}`));
}
