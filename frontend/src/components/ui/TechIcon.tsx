import { createElement, type ComponentType } from 'react';
import {
  SiReact, SiTypescript, SiTailwindcss, SiRedux, SiJavascript, SiNodedotjs, SiPython,
  SiMongodb, SiFastapi, SiGit, SiFigma, SiExpress, SiSocketdotio, SiDjango, SiVercel,
  SiNetlify, SiRender, SiRailway, SiReactrouter, SiMeta,
  SiJest, SiPostgresql, SiGraphql, SiAmazonwebservices, SiDocker, SiApachekafka, SiN8N,
  SiRabbitmq, SiNginx, SiRedis, SiKubernetes
} from 'react-icons/si';
import {
  AppWindow, Binary, Box, Cloud, Database, FileSearch, Mail, PenTool, Server, Sparkles, Wrench,
} from 'lucide-react';
import { knownLayer, techKey, type Layer } from '../../lib/content';

type IconCmp = ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>;

/**
 * Brand marks, keyed by `techKey()` output (lowercase, no spaces/dots/dashes).
 * To add one: import `Si<Name>` from react-icons/si (browse https://react-icons.github.io/react-icons/icons/si/)
 * and map it here. Each icon adds ~1–2 KB, so only map techs that appear in portfolioData.
 */
const ICONS: Record<string, IconCmp> = {
  react: SiReact, typescript: SiTypescript, tailwind: SiTailwindcss, redux: SiRedux,
  javascript: SiJavascript, node: SiNodedotjs, python: SiPython, mongodb: SiMongodb,
  fastapi: SiFastapi, git: SiGit, figma: SiFigma, express: SiExpress, socketio: SiSocketdotio,
  socketdotio: SiSocketdotio, django: SiDjango, vercel: SiVercel, netlify: SiNetlify,
  render: SiRender, railway: SiRailway, reactrouter: SiReactrouter, llama: SiMeta,
  jest: SiJest, postgresql: SiPostgresql, graphql: SiGraphql, aws: SiAmazonwebservices,
  docker: SiDocker, kafka: SiApachekafka, n8n: SiN8N, rabbitmq: SiRabbitmq, redis: SiRedis,
  nginx: SiNginx, kubernetes: SiKubernetes,

  // Concepts without a brand mark
  dsa: Binary, llm: Sparkles, rag: FileSearch, nodemailer: Mail,
};

/** Generic glyph per architecture layer, for known techs without a brand mark (e.g. PixiJS). */
const LAYER_ICONS: Record<Layer, IconCmp> = {
  client: AppWindow, server: Server, data: Database, ai: Sparkles, delivery: Cloud, design: PenTool,
};

/** Generic glyph for a skill category, matched loosely so renamed categories still resolve. */
const CATEGORY_ICONS: [RegExp, IconCmp][] = [
  [/front|client|ui|web/i, AppWindow],
  [/back|server|api/i, Server],
  [/data|db|storage/i, Database],
  [/\bai\b|ml|intelligen|llm/i, Sparkles],
  [/devops|cloud|infra|deploy/i, Cloud],
  [/tool/i, Wrench],
  [/design/i, PenTool],
];

function resolveIcon(name: string, category?: string): IconCmp {
  const key = techKey(name);
  const brand = ICONS[key];
  if (brand) return brand;
  const layer = knownLayer(key);
  if (layer) return LAYER_ICONS[layer];
  if (category) {
    const hit = CATEGORY_ICONS.find(([re]) => re.test(category));
    if (hit) return hit[1];
  }
  return Box;
}

/**
 * Brand mark for a technology. Unknown names fall back to a glyph for the
 * tech's architecture layer, then for the given `category`, then a neutral box.
 */
export function TechIcon({
  name, size = 16, className, category,
}: { name: string; size?: number; className?: string; category?: string }) {
  // Lookup of a static, module-level component (not created per render).
  return createElement(resolveIcon(name, category), { size, className, 'aria-hidden': true });
}
