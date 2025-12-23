"use client";

import profile from '../data/profile';
import ProjectCard from './ProjectCard';
import { Reveal, RevealGroup, RevealItem } from './Reveal';

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 py-24">
      <Reveal className="mb-10">
        <div className="max-w-2xl space-y-3">
          <h3 className="text-3xl font-semibold text-white md:text-4xl">
            {profile.ui.sections.projectsTitle}
          </h3>
          <p className="text-base text-white/70 md:text-lg">
            {profile.ui.sections.projectsIntro}
          </p>
        </div>
      </Reveal>
      <RevealGroup className="grid gap-8 lg:grid-cols-2">
        {profile.projects.map((project) => (
          <RevealItem key={project.slug}>
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
