import type { ComponentType } from 'react';
import {
  SiReact, SiTypescript, SiTailwindcss, SiRedux, SiJavascript, SiNodedotjs, SiPython,
  SiMongodb, SiFastapi, SiGit, SiFigma, SiExpress, SiSocketdotio, SiDjango, SiVercel,
  SiNetlify, SiRender, SiRailway, SiReactrouter, SiMeta,
} from 'react-icons/si';
import { Binary, Box, Sparkles, Mail } from 'lucide-react';
import { techKey } from '../../lib/content';

type IconCmp = ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>;

const ICONS: Record<string, IconCmp> = {
  react: SiReact, typescript: SiTypescript, tailwind: SiTailwindcss, redux: SiRedux,
  javascript: SiJavascript, node: SiNodedotjs, python: SiPython, mongodb: SiMongodb,
  fastapi: SiFastapi, git: SiGit, figma: SiFigma, express: SiExpress, socketio: SiSocketdotio,
  socketdotio: SiSocketdotio, django: SiDjango, vercel: SiVercel, netlify: SiNetlify,
  render: SiRender, railway: SiRailway, reactrouter: SiReactrouter, llama: SiMeta,
  dsa: Binary, llm: Sparkles, nodemailer: Mail,
};

/** Brand mark for a technology, with a neutral fallback glyph. */
export function TechIcon({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  const Icon = ICONS[techKey(name)] ?? Box;
  return <Icon size={size} className={className} aria-hidden />;
}
