"use client";

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import profile, { Experience } from '../data/profile';

interface ExperienceCardProps {
  experience: Experience;
  isHighlighted: boolean;
}

export default function ExperienceCard({ experience, isHighlighted }: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow transition hover:-translate-y-1 hover:border-neon-cyan/60 ${
        isHighlighted ? 'ring-1 ring-neon-pink/40' : ''
      }`}
    >
      <div className="pointer-events-none absolute right-6 top-6 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-neon-cyan opacity-0 transition group-hover:opacity-100">
        {experience.highlight}
      </div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold text-white">{experience.position}</h4>
          <p className="text-sm text-white/70">{experience.company}</p>
          {experience.location && <p className="text-xs text-white/50">{experience.location}</p>}
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-white/60">{experience.period}</div>
      </div>

      {experience.summary && <p className="mt-4 text-sm text-white/70">{experience.summary}</p>}

      <div className="mt-4 space-y-2 text-sm text-white/70">
        {experience.achievements.map((item) => (
          <p key={item} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon-pink" />
            {item}
          </p>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {experience.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60 transition group-hover:border-neon-lime/50 group-hover:text-neon-lime"
          >
            {tool}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neon-cyan hover:text-neon-pink focus-visible:ring-2 focus-visible:ring-neon-cyan"
        aria-expanded={isOpen}
      >
        {isOpen ? profile.ui.accessibility.experienceCloseLabel : profile.ui.accessibility.experienceOpenLabel}
        <span aria-hidden="true">{isOpen ? '–' : '+'}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {experience.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
