import { portfolioData } from '../../data/portfolioData';
import { useContactForm } from '../../hooks/useContactForm';
import { isPlaceholderUrl, prettyUrl } from '../../lib/derive';
import { scrollToId } from '../../lib/sections';
import { Reveal } from '../ui/Reveal';

const fieldClass =
  'w-full rounded-none border-0 border-b-2 border-fg/40 bg-transparent px-0 py-3 text-xl font-semibold tracking-tight text-fg outline-none transition-colors placeholder:text-mute/60 focus:border-accent focus-visible:outline-none';

function ContactForm() {
  const { values, status, onChange, onSubmit } = useContactForm();
  const busy = status === 'loading' || status === 'success';

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" aria-describedby="form-status" noValidate={false}>
      <div>
        <label htmlFor="name" className="label text-mute">
          (a) Your name
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" value={values.name} onChange={onChange} className={fieldClass} placeholder="Jane Doe" />
      </div>
      <div>
        <label htmlFor="email" className="label text-mute">
          (b) Email address
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" value={values.email} onChange={onChange} className={fieldClass} placeholder="jane@company.com" />
      </div>
      <div>
        <label htmlFor="message" className="label text-mute">
          (c) Message
        </label>
        <textarea id="message" name="message" required rows={4} value={values.message} onChange={onChange} className={`${fieldClass} resize-none`} placeholder="Tell me about the project or role…" />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="group flex items-center justify-between bg-accent px-6 py-5 text-lg font-black tracking-tight text-onaccent uppercase transition-colors hover:bg-fg hover:text-bg disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{status === 'loading' ? 'Transmitting…' : status === 'success' ? 'Message sent' : 'Send message'}</span>
        <span aria-hidden="true" className={`text-2xl transition-transform ${status === 'loading' ? 'animate-pulse' : 'group-hover:translate-x-1'}`}>
          {status === 'success' ? '✓' : '→'}
        </span>
      </button>

      <p id="form-status" role="status" aria-live="polite" className="min-h-6 text-sm">
        {status === 'success' && (
          <span className="flex items-center gap-2">
            <span className="block h-2 w-2 bg-accent" aria-hidden="true" /> Message sent — I'll be in touch shortly.
          </span>
        )}
        {status === 'error' && (
          <span className="flex items-center gap-2 font-semibold">
            <span aria-hidden="true">⚠</span> Transmission failed. Please try again or use direct email.
          </span>
        )}
      </p>
    </form>
  );
}

/** 07 — Contact, set on an inverted surface; closes with the colophon. */
export function Contact() {
  const { contact, hero } = portfolioData;
  const channels = [
    { label: 'GitHub', href: contact.github },
    { label: 'LinkedIn', href: contact.linkedin },
    { label: 'Twitter', href: contact.twitter },
  ].filter((c) => !isPlaceholderUrl(c.href));

  return (
    <section id="contact" aria-labelledby="contact-title" className="inverse pt-24 md:pt-36">
      <div className="wrap">
        <div className="grid grid-cols-12 gap-x-4 border-t-2 border-fg pt-4 md:pt-5">
          <span className="label col-span-12 mb-6 md:col-span-1 md:mb-0" aria-hidden="true">
            (07)
          </span>
          <h2 id="contact-title" className="col-span-12 text-[clamp(3.5rem,12vw,13rem)] leading-[0.8] font-black tracking-[-0.06em] md:col-span-11">
            <Reveal as="span" variant="mask">
              Let's build
            </Reveal>
            <Reveal as="span" variant="mask" delay={120}>
              together<span className="ml-[0.04em] inline-block h-[0.16em] w-[0.16em] bg-accent" aria-hidden="true" />
            </Reveal>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-16 md:mt-24">
          <Reveal className="col-span-12 lg:col-span-6">
            <p className="max-w-xl text-xl leading-snug font-semibold tracking-tight md:text-2xl">{contact.message}</p>

            <p className="label mt-12 mb-2 text-mute">Direct line</p>
            <a
              href={`mailto:${contact.email}`}
              className="inline-block max-w-full text-[clamp(1.35rem,3vw,2.75rem)] leading-tight font-black tracking-[-0.04em] [overflow-wrap:anywhere] underline decoration-accent decoration-[3px] underline-offset-[6px] transition-colors hover:text-accent"
            >
              {contact.email}
            </a>

            <ul className="mt-12 border-t border-line">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-line">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent"
                  >
                    <span className="text-2xl font-black tracking-[-0.03em]">{c.label}</span>
                    <span className="label truncate text-mute group-hover:text-accent">
                      {prettyUrl(c.href)} <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <a href={hero.resumeUrl} download className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent">
                  <span className="text-2xl font-black tracking-[-0.03em]">Résumé</span>
                  <span className="label text-mute group-hover:text-accent">
                    PDF <span aria-hidden="true">↓</span>
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120} className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="label mb-8 text-mute">Or send a message</p>
            <ContactForm />
          </Reveal>
        </div>
      </div>

      {/* Colophon */}
      <footer className="mt-24 border-t border-line md:mt-36">
        <div className="wrap label grid grid-cols-2 gap-x-4 gap-y-3 py-6 text-mute md:grid-cols-12">
          <p className="col-span-2 md:col-span-4">
            © {new Date().getFullYear()} {hero.name}. All rights reserved.
          </p>
          <p className="md:col-span-3">Crafted with intent.</p>
          <p className="hidden md:col-span-3 md:block">Set in Inter Tight &amp; JetBrains Mono</p>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('home');
            }}
            className="text-right text-fg hover:text-accent md:col-span-2"
          >
            Back to top ↑
          </a>
        </div>
        <div className="overflow-hidden" aria-hidden="true">
          <p className="display -mb-[0.1em] text-center text-[17vw] whitespace-nowrap text-fg/10 lg:text-[15.5vw]">{hero.name}</p>
        </div>
      </footer>
    </section>
  );
}
