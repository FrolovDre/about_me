"use client";

import { useMemo, useState } from 'react';
import profile from '../../data/profile';
import ExperienceCard from '../ExperienceCard';

export default function ExperienceWindow() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredExperience = useMemo(() => {
    if (activeFilters.length === 0) return profile.experience;
    return profile.experience.filter((item) =>
      item.tags.some((tag) => activeFilters.includes(tag)),
    );
  }, [activeFilters]);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-semibold text-white">{profile.ui.sections.experienceTitle}</h3>
        <p className="mt-2 text-sm text-white/70">{profile.ui.sections.experienceIntro}</p>
      </div>
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
      <div className="space-y-5">
        {filteredExperience.map((exp) => (
          <ExperienceCard
            key={exp.company + exp.period}
            experience={exp}
            isHighlighted={
              activeFilters.length > 0 && exp.tags.some((tag) => activeFilters.includes(tag))
            }
          />
        ))}
      </div>
    </div>
  );
}
