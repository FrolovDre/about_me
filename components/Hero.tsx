"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import profile from '../data/profile';
import BlobBackground from './BlobBackground';

export default function Hero() {
  const highlight =
    profile.taglineHighlight && profile.tagline.includes(profile.taglineHighlight)
      ? profile.taglineHighlight
      : undefined;
  const parts = highlight ? profile.tagline.split(highlight) : [profile.tagline];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.6 };
  const entryOffset = prefersReducedMotion ? 0 : 20;

  return (
    <section
      className="relative flex min-h-[80vh] flex-col justify-center gap-10 overflow-hidden py-28"
      id="hero"
      onMouseMove={(event) => {
        if (prefersReducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / 40;
        const y = (event.clientY - rect.top - rect.height / 2) / 40;
        mouseX.set(x);
        mouseY.set(y);
      }}
      onMouseLeave={() => {
        if (prefersReducedMotion) return;
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <BlobBackground />
      <motion.div style={{ x: springX, y: springY }} className="w-full max-w-3xl space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: entryOffset }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-6xl"
        >
          {profile.name}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: entryOffset }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.15 }}
          className="text-xl text-slate-600 dark:text-slate-300 md:text-2xl"
        >
          {profile.role}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: entryOffset }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.3 }}
          className="text-lg leading-relaxed text-slate-600 dark:text-slate-300"
        >
          {parts[0]}
          {highlight && (
            <span className="relative inline-flex mx-1">
              <span className="absolute inset-0 -skew-y-1 rounded-md bg-sky-400/30 dark:bg-sky-500/30" />
              <span className="relative font-semibold text-sky-900 dark:text-sky-100">
                {highlight}
              </span>
            </span>
          )}
          {parts[1] ?? ''}
        </motion.p>
        {profile.highlights && profile.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={profile.resumeUrl}
            className="group inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] dark:bg-white dark:text-slate-900"
          >
            {profile.ui.heroCta.primaryLabel}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-slate-200/80 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white/70 hover:shadow-sm active:scale-[0.98] dark:border-white/10 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-slate-900/60"
          >
            {profile.ui.heroCta.secondaryLabel}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
