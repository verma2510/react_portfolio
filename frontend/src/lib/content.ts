/**
 * Derived, presentation-ready views over `portfolioData`.
 * Everything here is computed from existing content — nothing is invented.
 */
import { portfolioData, type ExperienceEntry, type Project, type Skill } from '../data/portfolioData';

/* ───────────────────────── Sections ───────────────────────── */

export const SECTIONS = [
  { id: 'index', label: 'Index' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'profile', label: 'Profile' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'off-clock', label: 'Off the clock' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const sectionNumber = (id: SectionId) =>
  String(SECTIONS.findIndex((s) => s.id === id)).padStart(2, '0');

/* ───────────────────────── Dates ───────────────────────── */

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/** Parses "Jul 2025" / "July 2024" / "Present" into a Date (month precision). */
export function parseMonth(value: string, now = new Date()): Date {
  if (/present/i.test(value)) return new Date(now.getFullYear(), now.getMonth(), 1);
  const [mon, year] = value.trim().split(/\s+/);
  const m = MONTHS.indexOf(mon.slice(0, 3).toLowerCase());
  return new Date(Number(year), Math.max(m, 0), 1);
}

const monthsBetween = (a: Date, b: Date) =>
  (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());

export interface TimelineRole {
  entry: ExperienceEntry;
  start: Date;
  end: Date;
  /** Inclusive month count */
  months: number;
  /** 0–1 offsets on the shared career axis */
  offset: number;
  span: number;
  current: boolean;
}

export function buildCareerTimeline(entries = portfolioData.experience) {
  const now = new Date();
  const roles = entries.map((entry) => {
    const start = parseMonth(entry.period.start, now);
    const end = parseMonth(entry.period.end, now);
    return { entry, start, end, months: monthsBetween(start, end) + 1, current: /present/i.test(entry.period.end) };
  });
  const axisStart = new Date(Math.min(...roles.map((r) => r.start.getTime())));
  const axisEnd = new Date(Math.max(...roles.map((r) => r.end.getTime())));
  const total = monthsBetween(axisStart, axisEnd) + 1;

  const years: number[] = [];
  for (let y = axisStart.getFullYear(); y <= axisEnd.getFullYear(); y++) years.push(y);

  return {
    axisStart,
    axisEnd,
    totalMonths: total,
    years: years.map((y) => ({
      year: y,
      offset: Math.max(0, monthsBetween(axisStart, new Date(y, 0, 1)) / total),
    })),
    roles: roles.map<TimelineRole>((r) => ({
      ...r,
      offset: monthsBetween(axisStart, r.start) / total,
      span: r.months / total,
    })),
  };
}

export const formatMonths = (months: number) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo`].filter(Boolean).join(' ');
};

/** Whole years since the first professional role, e.g. "2+". */
export function professionalYears(): string {
  const { axisStart } = buildCareerTimeline();
  const years = Math.floor(monthsBetween(axisStart, new Date()) / 12);
  return years >= 1 ? `${years}+` : '<1';
}

/* ───────────────────────── Technologies ───────────────────────── */

const ALIASES: Record<string, string> = {
  reactjs: 'react',
  nodejs: 'node',
  node: 'node',
  tailwindcss: 'tailwind',
  expressjs: 'express',
  'socketio': 'socketio',
  llama32: 'llama',
};

/** Canonical key so "React", "React.js" and "ReactJS" resolve to the same tech. */
export function techKey(name: string): string {
  const k = name.toLowerCase().replace(/[\s.\-_]/g, '');
  return ALIASES[k] ?? k;
}

export type Layer = 'client' | 'server' | 'data' | 'ai' | 'delivery' | 'design';

const LAYER_OF: Record<string, Layer> = {
  react: 'client', typescript: 'client', javascript: 'client', redux: 'client',
  reactrouter: 'client', tailwind: 'client', pixijs: 'client',
  node: 'server', express: 'server', fastapi: 'server', django: 'server',
  python: 'server', nodemailer: 'server', socketio: 'server',
  mongodb: 'data',
  llm: 'ai', llama: 'ai',
  vercel: 'delivery', render: 'delivery', railway: 'delivery', netlify: 'delivery',
  figma: 'design',
};

export const LAYER_META: Record<Layer, { label: string; caption: string }> = {
  client: { label: 'Client', caption: 'Interface & rendering' },
  server: { label: 'Server', caption: 'APIs & business logic' },
  data: { label: 'Data', caption: 'Persistence' },
  ai: { label: 'Intelligence', caption: 'Model layer' },
  delivery: { label: 'Delivery', caption: 'Hosting & deploys' },
  design: { label: 'Design', caption: 'Interface design' },
};

export const layerOf = (tech: string): Layer => LAYER_OF[techKey(tech)] ?? 'client';

/** Groups a project's stack into architecture layers (only non-empty layers). */
export function architectureOf(stack: string[]) {
  const order: Layer[] = ['client', 'server', 'ai', 'data', 'delivery', 'design'];
  return order
    .map((layer) => ({ layer, ...LAYER_META[layer], items: stack.filter((t) => layerOf(t) === layer) }))
    .filter((l) => l.items.length > 0);
}

/* ───────────────────────── Skills ───────────────────────── */

const allSkills: Skill[] = portfolioData.skills.flatMap((g) => g.skills);

export const findSkill = (tech: string): Skill | undefined =>
  allSkills.find((s) => techKey(s.name) === techKey(tech));

export interface SkillEvidence {
  projects: Project[];
  roles: ExperienceEntry[];
}

/** Where each skill shows up across projects and roles. */
export function skillEvidence(skill: Skill): SkillEvidence {
  const key = techKey(skill.name);
  return {
    projects: portfolioData.projects.filter((p) => p.stack.some((t) => techKey(t) === key)),
    roles: portfolioData.experience.filter((e) => e.stack.some((t) => techKey(t) === key)),
  };
}

export const skillCount = allSkills.length;

/* ───────────────────────── Projects ───────────────────────── */

export const projects = portfolioData.projects;
export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export const projectIndex = (slug: string) => projects.findIndex((p) => p.slug === slug);

export function projectNeighbours(slug: string) {
  const i = projectIndex(slug);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}

export const projectNumber = (p: Project) => String(projectIndex(p.slug) + 1).padStart(2, '0');

/* ───────────────────────── Contact ───────────────────────── */

const isPlaceholder = (url: string) => !url || /yourusername/i.test(url);

export function socialLinks() {
  const c = portfolioData.contact;
  return [
    { id: 'github', label: 'GitHub', href: c.github, handle: c.github.replace(/^https?:\/\/(www\.)?/, '') },
    { id: 'linkedin', label: 'LinkedIn', href: c.linkedin, handle: c.linkedin.replace(/^https?:\/\/(www\.)?/, '') },
    { id: 'twitter', label: 'Twitter', href: c.twitter, handle: c.twitter.replace(/^https?:\/\/(www\.)?/, '') },
  ].filter((l) => !isPlaceholder(l.href));
}

/* ───────────────────────── Headline metrics ───────────────────────── */

export function headlineMetrics() {
  const edu = portfolioData.education[0];
  return [
    { value: professionalYears(), unit: 'yrs', label: 'Professional engineering experience', source: `Since ${portfolioData.experience.at(-1)?.period.start}` },
    { value: '81', unit: '%', label: 'Search efficiency improved', source: portfolioData.experience[0].company },
    { value: String(projects.length).padStart(2, '0'), unit: '', label: 'Projects designed & built', source: `${featuredProjects.length} featured case studies` },
    { value: edu.grade.split('/')[0], unit: 'CGPA', label: 'B.E., Honors in AIML', source: edu.institution.split("'")[0] },
  ];
}

/** Stable DOM id for an experience entry, e.g. "role-accordo-ai". */
export const roleAnchor = (company: string) =>
  `role-${company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
