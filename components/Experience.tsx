"use client";

import { useMemo, useState } from 'react';
import profile from '../data/profile';
import ExperienceCard from './ExperienceCard';
import { Reveal, RevealGroup, RevealItem } from './Reveal';

export default function Experience() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredExperience = useMemo(() => {
    if (activeFilters.length === 0) return profile.experience;
    return profile.experience.filter((item) =>
      item.tags.some((tag) => activeFilters.includes(tag)),
    );
  }, [activeFilters]);

  return (
    <section id="experience" className="scroll-mt-24 py-24">
      <Reveal className="mb-10">
        <h3 className="text-3xl font-semibold text-white md:text-4xl">
          {profile.ui.sections.experienceTitle}
        </h3>
      </Reveal>
      <Reveal className="mb-6">
        <div className="flex flex-wrap gap-2">
          {profile.experienceFilters.map((filter) => {
            const isActive = activeFilters.includes(filter);
            return (
              <button
                key={filter}
                type="button"
                onClick={() =>
                  setActiveFilters((prev) =>
                    prev.includes(filter) ? prev.filter((item) => item !== filter) : [...prev, filter],
                  )
                }
                className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition ${
                  isActive
                    ? 'border-neon-pink/70 bg-neon-pink/10 text-neon-pink'
                    : 'border-white/10 bg-white/5 text-white/60 hover:border-neon-cyan/60 hover:text-neon-cyan'
                }`}
                aria-pressed={isActive}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </Reveal>
      <RevealGroup className="space-y-6">
        {filteredExperience.map((exp) => (
          <RevealItem key={exp.company + exp.period}>
            <ExperienceCard
              experience={exp}
              isHighlighted={
                activeFilters.length > 0 && exp.tags.some((tag) => activeFilters.includes(tag))
              }
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
