import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { AlertCircle, ArrowDownToLine, ArrowUpRight, Check, Copy, Loader2, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { socialLinks } from '../lib/content';
import { copyText, isMac } from '../lib/platform';
import { useContactForm } from '../hooks/useContactForm';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';

const { contact, hero } = portfolioData;

export function Contact() {
  const { values, status, onChange, onSubmit } = useContactForm();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (await copyText(contact.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const channels = [
    ...socialLinks().map((l) => ({ label: l.label, value: l.handle, href: l.href, external: true })),
    { label: 'Résumé', value: 'PDF download', href: hero.resumeUrl, external: false, download: true },
  ];

  const row = 'grid grid-cols-[72px_1fr] items-center gap-3 border-b border-line px-5 sm:grid-cols-[88px_1fr]';
  const input = 'h-12 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-faint';

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 md:py-24">
      <Container>
        <SectionHeader section="contact" eyebrow="Contact" title="Let's build" accent="together." />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Channels */}
          <Reveal className="lg:col-span-5">
            <p className="text-[clamp(1.2rem,2vw,1.5rem)] leading-snug tracking-[-0.015em] text-ink-2">{contact.message}</p>

            <div className="mt-10 border-t border-line-strong">
              <div className="flex items-center justify-between gap-3 border-b border-line py-4">
                <div className="min-w-0">
                  <span className="label text-[10px]">Email</span>
                  <a href={`mailto:${contact.email}`} className="link-u mt-0.5 block truncate text-[16px] font-medium text-ink">
                    {contact.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-ink"
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={13} className="text-ok" /> : <Copy size={13} />}
                  <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: true })}
                  className="group flex items-center justify-between gap-3 border-b border-line py-4"
                >
                  <div className="min-w-0">
                    <span className="label text-[10px]">{c.label}</span>
                    <span className="mt-0.5 block truncate text-[15px] text-ink-2 transition-colors group-hover:text-ink">{c.value}</span>
                  </div>
                  {c.external ? (
                    <ArrowUpRight size={17} className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  ) : (
                    <ArrowDownToLine size={17} className="shrink-0 text-muted transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-accent" />
                  )}
                </a>
              ))}
            </div>
          </Reveal>

          {/* Compose window */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                  e.preventDefault();
                  e.currentTarget.requestSubmit(); // runs native validation first
                }
              }}
              className="panel relative overflow-hidden"
              aria-describedby="compose-hint"
            >
              <div className="flex items-center justify-between border-b border-line bg-surface-2/50 px-5 py-3">
                <span className="flex items-center gap-2">
                  <span className="flex gap-1" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                  </span>
                  <span className="label ml-2">New message</span>
                </span>
                <span className="font-mono text-[11px] text-faint">POST /api/contact</span>
              </div>

              <div className={row}>
                <span className="label">To</span>
                <span className="flex h-12 items-center gap-2 truncate text-[15px] text-ink-2">
                  <span className="rounded-md bg-accent-soft px-2 py-0.5 text-[13px] text-accent-text">{hero.name}</span>
                </span>
              </div>
              <div className={row}>
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" maxLength={120} placeholder="Your name" value={values.name} onChange={onChange} className={input} />
              </div>
              <div className={row}>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" maxLength={200} placeholder="you@company.com" value={values.email} onChange={onChange} className={input} />
              </div>
              <div className="px-5 pt-4">
                <label htmlFor="message" className="label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={7}
                  maxLength={5000}
                  placeholder="Tell me about the role, the product, or the problem you're solving…"
                  value={values.message}
                  onChange={onChange}
                  className="mt-2 w-full resize-none bg-transparent text-[15px] leading-relaxed text-ink outline-none placeholder:text-faint"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
                <span id="compose-hint" className="font-mono text-[11px] text-faint">
                  {values.message.length}/5000 · {isMac ? '⌘' : 'Ctrl'}+↵ to send
                </span>
                <Button type="submit" disabled={status === 'loading' || status === 'success'}>
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={15} className="animate-spin" aria-hidden /> Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send size={15} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden />
                    </>
                  )}
                </Button>
              </div>

              <div role="status" aria-live="polite" className="sr-only">
                {status === 'success' && 'Message sent. I will be in touch shortly.'}
                {status === 'error' && 'Message failed to send. Please try again or email directly.'}
              </div>

              <AnimatePresence>
                {status === 'success' && (
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface/95 backdrop-blur-sm"
                  >
                    <m.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-ok/15 text-ok"
                    >
                      <Check size={26} />
                    </m.span>
                    <p className="mt-5 text-2xl font-semibold tracking-tight text-ink">Message sent</p>
                    <p className="mt-1 text-muted">I'll be in touch shortly.</p>
                  </m.div>
                )}
                {status === 'error' && (
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute inset-x-4 bottom-20 z-10 flex items-start gap-3 rounded-lg border border-red-500/30 bg-surface p-4 shadow-lg"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
                    <p className="text-[14px] text-ink-2">
                      Transmission failed. Please try again or{' '}
                      <a href={`mailto:${contact.email}`} className="font-medium text-ink underline underline-offset-2">
                        email directly
                      </a>
                      .
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
