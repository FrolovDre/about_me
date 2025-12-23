import profile from '../data/profile';
import { Reveal, RevealGroup, RevealItem } from './Reveal';

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <Reveal className="mb-10 space-y-3">
        <h3 className="text-3xl font-semibold text-white md:text-4xl">
          {profile.ui.sections.contactTitle}
        </h3>
        <p className="text-base text-white/70 md:text-lg">
          {profile.ui.sections.contactIntro}
        </p>
      </Reveal>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <RevealGroup className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow">
          {profile.contact.location && (
            <RevealItem>
              <p className="text-sm text-white/70">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  {profile.ui.contactLabels.location}
                </span>
                <span className="mt-1 block text-base text-white">
                  {profile.contact.location}
                </span>
              </p>
            </RevealItem>
          )}
          <RevealItem>
            <p className="text-sm text-white/70">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                {profile.ui.contactLabels.email}
              </span>
              <a
                href={`mailto:${profile.contact.email}`}
                className="link-underline mt-1 block text-base text-white"
              >
                {profile.contact.email}
              </a>
            </p>
          </RevealItem>
          {profile.contact.phone && (
            <RevealItem>
              <p className="text-sm text-white/70">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  {profile.ui.contactLabels.phone}
                </span>
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="link-underline mt-1 block text-base text-white"
                >
                  {profile.contact.phone}
                </a>
              </p>
            </RevealItem>
          )}
          <RevealItem>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                {profile.ui.contactLabels.socials}
              </span>
              <ul className="mt-2 flex flex-wrap gap-3">
                {profile.contact.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-sm font-medium text-white/70 hover:text-neon-cyan"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </RevealGroup>
        <Reveal>
          <form
            className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow"
            action={`mailto:${profile.contact.email}`}
            method="POST"
            encType="text/plain"
          >
            {/* При использовании Formspree замените action на URL формы */}
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>{profile.ui.contactForm.nameLabel}</span>
              <input
                type="text"
                name="name"
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white shadow-sm transition focus:border-neon-cyan"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>{profile.ui.contactForm.emailLabel}</span>
              <input
                type="email"
                name="email"
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white shadow-sm transition focus:border-neon-cyan"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>{profile.ui.contactForm.messageLabel}</span>
              <textarea
                name="message"
                rows={4}
                className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white shadow-sm transition focus:border-neon-cyan"
                required
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-neon-pink px-5 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-vapor-night shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-glow-strong active:scale-[0.98]"
            >
              {profile.ui.contactForm.submitLabel}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
