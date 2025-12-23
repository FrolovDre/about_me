"use client";

import { motion, useReducedMotion } from 'framer-motion';
import profile from '../data/profile';
import BlobBackground from './BlobBackground';

export default function Hero() {
  const highlight =
    profile.taglineHighlight && profile.tagline.includes(profile.taglineHighlight)
      ? profile.taglineHighlight
      : undefined;
  const parts = highlight ? profile.tagline.split(highlight) : [profile.tagline];
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.6 };
  const entryOffset = prefersReducedMotion ? 0 : 20;

  return (
    <section
      className="relative flex min-h-[85vh] flex-col justify-center gap-12 overflow-hidden py-24"
      id="about"
    >
      <BlobBackground />
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: entryOffset }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-neon-cyan/80">
            {profile.ui.sections.aboutTitle}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {profile.name}
          </h1>
          <h2 className="text-lg text-white/70 md:text-2xl">{profile.role}</h2>
          <p className="text-lg leading-relaxed text-white/80">
            {parts[0]}
            {highlight && (
              <span className="relative inline-flex mx-1">
                <span className="absolute inset-0 -skew-y-2 rounded-md bg-neon-pink/30" />
                <span className="relative font-semibold text-neon-pink">{highlight}</span>
              </span>
            )}
            {parts[1] ?? ''}
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-white/60">{profile.about}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: entryOffset }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.15 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur"
        >
          <h3 className="text-lg font-semibold text-white">{profile.ui.valueCardTitle}</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            {profile.valueProps.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-neon-cyan shadow-neon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-neon-lime/80">
            {profile.ui.valueCardNote}
          </p>
          <p className="mt-2 text-xs text-white/60">{profile.whatILookFor}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center justify-center rounded-full bg-neon-pink px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-vapor-night shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-glow-strong active:scale-[0.98]"
            >
              {profile.ui.heroCta.primaryLabel}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-neon-cyan/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan transition-all hover:-translate-y-0.5 hover:bg-neon-cyan/10 active:scale-[0.98]"
            >
              {profile.ui.heroCta.secondaryLabel}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: entryOffset }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.25 }}
        className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-xs uppercase tracking-[0.25em] text-white/70 shadow-glow md:grid-cols-4"
      >
        {profile.quickFacts.map((fact) => (
          <div key={fact.label} className="space-y-2">
            <p className="text-neon-cyan/70">{fact.label}</p>
            <p className="text-sm font-semibold tracking-normal text-white">{fact.value}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
