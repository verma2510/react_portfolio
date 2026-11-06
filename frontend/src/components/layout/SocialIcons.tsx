import { Mail } from 'lucide-react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import { portfolioData } from '../../data/portfolioData';
import { socialLinks } from '../../lib/content';

const ICON = { github: SiGithub, linkedin: SiLinkedin, twitter: SiX } as const;

export function SocialIcons({ className = '' }: { className?: string }) {
  const links = socialLinks();
  const item =
    'inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink';
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {links.map((l) => {
        const Icon = ICON[l.id as keyof typeof ICON];
        return (
          <li key={l.id}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label} className={item}>
              <Icon size={15} aria-hidden />
            </a>
          </li>
        );
      })}
      <li>
        <a href={`mailto:${portfolioData.contact.email}`} aria-label="Email" title="Email" className={item}>
          <Mail size={16} aria-hidden />
        </a>
      </li>
    </ul>
  );
}
