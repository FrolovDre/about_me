import profile from '../data/profile';
import { Reveal, RevealGroup, RevealItem } from './Reveal';

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <Reveal className="mb-10 space-y-3">
        <h3 className="text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
          {profile.ui.sections.contactTitle}
        </h3>
        <p className="text-base text-slate-600 dark:text-slate-300 md:text-lg">
          {profile.ui.sections.contactIntro}
        </p>
      </Reveal>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <RevealGroup className="space-y-4 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
          {profile.contact.location && (
            <RevealItem>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {profile.ui.contactLabels.location}
                </span>
                <span className="mt-1 block text-base text-slate-900 dark:text-white">
                  {profile.contact.location}
                </span>
              </p>
            </RevealItem>
          )}
          <RevealItem>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {profile.ui.contactLabels.email}
              </span>
              <a
                href={`mailto:${profile.contact.email}`}
                className="link-underline mt-1 block text-base text-slate-900 dark:text-white"
              >
                {profile.contact.email}
              </a>
            </p>
          </RevealItem>
          {profile.contact.phone && (
            <RevealItem>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {profile.ui.contactLabels.phone}
                </span>
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="link-underline mt-1 block text-base text-slate-900 dark:text-white"
                >
                  {profile.contact.phone}
                </a>
              </p>
            </RevealItem>
          )}
          <RevealItem>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {profile.ui.contactLabels.socials}
              </span>
              <ul className="mt-2 flex flex-wrap gap-3">
                {profile.contact.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-sm font-medium text-slate-700 dark:text-slate-200"
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
            className="grid gap-4 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
            action={`mailto:${profile.contact.email}`}
            method="POST"
            encType="text/plain"
          >
            {/* При использовании Formspree замените action на URL формы */}
            <label className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span>{profile.ui.contactForm.nameLabel}</span>
              <input
                type="text"
                name="name"
                className="rounded-xl border border-slate-200/70 bg-white/70 p-3 text-sm text-slate-900 shadow-sm transition focus:border-slate-300 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span>{profile.ui.contactForm.emailLabel}</span>
              <input
                type="email"
                name="email"
                className="rounded-xl border border-slate-200/70 bg-white/70 p-3 text-sm text-slate-900 shadow-sm transition focus:border-slate-300 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span>{profile.ui.contactForm.messageLabel}</span>
              <textarea
                name="message"
                rows={4}
                className="rounded-xl border border-slate-200/70 bg-white/70 p-3 text-sm text-slate-900 shadow-sm transition focus:border-slate-300 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white"
                required
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] dark:bg-white dark:text-slate-900"
            >
              {profile.ui.contactForm.submitLabel}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
