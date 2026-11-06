/**
 * Pure helpers that derive presentation data from `portfolioData`.
 * Nothing here invents content — it only normalises, groups and
 * measures what the data file already states.
 */
import { portfolioData } from '../data/portfolioData';

export type Project = (typeof portfolioData.projects)[number];
export type Experience = (typeof portfolioData.experience)[number];
export type Education = (typeof portfolioData.education)[number];
export type Certification = (typeof portfolioData.certifications)[number];
export type Hobby = (typeof portfolioData.hobbies)[number] & { zoom?: number };
export type SkillGroup = (typeof portfolioData.skills.solarSystem)[number];

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const pad2 = (n: number) => String(n).padStart(2, '0');

/* ── Dates ─────────────────────────────────────────────────────── */

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const isPresent = (label: string) => /present/i.test(label);

/** "Jul 2025" → Date(2025, 6, 1). "Present" → the current month. */
export function parseMonth(label: string, now: Date = new Date()): Date {
  if (isPresent(label)) return new Date(now.getFullYear(), now.getMonth(), 1);
  const [m = '', y = ''] = label.trim().split(/\s+/);
  const idx = MONTHS.indexOf(m.slice(0, 3).toLowerCase());
  return new Date(Number(y), Math.max(idx, 0), 1);
}

export const monthIndex = (d: Date) => d.getFullYear() * 12 + d.getMonth();

/** Inclusive month count, matching the data file ("Mar–Jun" = 4 months). */
export function inclusiveMonths(start: string, end: string) {
  return monthIndex(parseMonth(end)) - monthIndex(parseMonth(start)) + 1;
}

export function formatMonths(total: number) {
  const y = Math.floor(total / 12);
  const m = total % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ') || '< 1 mo';
}

/** Uses the data's own duration, computing it only for ongoing roles. */
export function roleDuration(exp: Experience) {
  return isPresent(exp.period.end)
    ? formatMonths(inclusiveMonths(exp.period.start, exp.period.end))
    : exp.duration;
}

export function careerStats() {
  const roles = portfolioData.experience;
  const months = roles.reduce((sum, r) => sum + inclusiveMonths(r.period.start, r.period.end), 0);
  const starts = roles.map((r) => parseMonth(r.period.start));
  const first = starts.reduce((a, b) => (a < b ? a : b));
  return {
    months,
    years: Math.floor(months / 12),
    since: first,
    sinceLabel: `${MONTHS[first.getMonth()].replace(/^./, (c) => c.toUpperCase())} ${first.getFullYear()}`,
    roles: roles.length,
  };
}

/** Company name trimmed to its first word for tight spaces. */
export const shortCompany = (company: string) => company.split(' ')[0];

/** "9.02/10 CGPA" → { value: "9.02", unit: "/10 CGPA" } */
export function splitGrade(grade: string) {
  const m = grade.match(/^([\d.]+)(.*)$/);
  return m ? { value: m[1], unit: m[2].trim() } : { value: grade, unit: '' };
}

/* ── Stack ─────────────────────────────────────────────────────── */

const ALIASES: Record<string, string> = {
  'React.js': 'React',
  Nodejs: 'Node.js',
};

export const normalizeTech = (t: string) => ALIASES[t] ?? t;

export type Layer = 'Design' | 'Interface' | 'Service' | 'Intelligence' | 'Data' | 'Delivery';

export const LAYER_ORDER: Layer[] = ['Design', 'Interface', 'Service', 'Intelligence', 'Data', 'Delivery'];

const LAYER_OF: Record<string, Layer> = {
  Figma: 'Design',
  React: 'Interface',
  TypeScript: 'Interface',
  JavaScript: 'Interface',
  PixiJS: 'Interface',
  Redux: 'Interface',
  'React Router': 'Interface',
  'Tailwind CSS': 'Interface',
  'Node.js': 'Service',
  Express: 'Service',
  Nodemailer: 'Service',
  FastAPI: 'Service',
  Django: 'Service',
  Python: 'Service',
  'Socket.io': 'Service',
  LLM: 'Intelligence',
  'Llama 3.2': 'Intelligence',
  MongoDB: 'Data',
  Render: 'Delivery',
  Vercel: 'Delivery',
  Railway: 'Delivery',
  Netlify: 'Delivery',
  Git: 'Delivery',
};

/** Groups a stack into ordered architectural layers. */
export function topology(stack: string[]) {
  const groups = new Map<Layer, string[]>();
  for (const raw of stack) {
    const tech = normalizeTech(raw);
    const layer = LAYER_OF[tech] ?? 'Service';
    groups.set(layer, [...(groups.get(layer) ?? []), raw]);
  }
  return LAYER_ORDER.filter((l) => groups.has(l)).map((layer) => ({ layer, items: groups.get(layer)! }));
}

/**
 * Technology × (project | role) usage matrix, built from the stacks
 * listed on each project and each role.
 */
export function usageMatrix(minUses = 2) {
  const columns = [
    ...portfolioData.projects.map((p) => ({ key: `p-${slugify(p.title)}`, label: p.title, kind: 'project' as const, stack: p.stack })),
    ...portfolioData.experience.map((e) => ({ key: `r-${slugify(e.company)}`, label: shortCompany(e.company), kind: 'role' as const, stack: e.stack })),
  ].map((c) => ({ ...c, set: new Set(c.stack.map(normalizeTech)) }));

  const counts = new Map<string, number>();
  columns.forEach((c) => c.set.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)));

  const rows = [...counts.entries()]
    .filter(([, n]) => n >= minUses)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tech, total]) => ({ tech, total, cells: columns.map((c) => c.set.has(tech)) }));

  return { columns, rows };
}

/* ── Links ─────────────────────────────────────────────────────── */

/** True for template links that were never filled in (e.g. twitter.com/yourusername). */
export const isPlaceholderUrl = (url?: string) => !url || /yourusername/i.test(url);

/** "/hobbies/chess.jpg" → "/opt/chess.webp" (optimised copy generated at build-time). */
export const optimisedSrc = (src: string) => src.replace(/^.*\/([^/]+)\.(jpe?g|png)$/i, '/opt/$1.webp');

export const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
