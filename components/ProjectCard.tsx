"use client";

import Link from 'next/link';
import { useEffect, useRef, type MouseEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import profile, { Project } from '../data/profile';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const stats = project.metrics.slice(0, 2);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const supportsHoverRef = useRef(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    supportsHoverRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !supportsHoverRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const tiltX = ((y / rect.height) * 10 - 5) * -1;
    const tiltY = (x / rect.width) * 10 - 5;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      cardRef.current.style.setProperty('--spotlight-x', `${x}px`);
      cardRef.current.style.setProperty('--spotlight-y', `${y}px`);
      cardRef.current.style.setProperty('--tilt-x', `${tiltX}deg`);
      cardRef.current.style.setProperty('--tilt-y', `${tiltY}deg`);
      frameRef.current = null;
    });
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--tilt-x', '0deg');
    cardRef.current.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative rounded-3xl border border-white/10 bg-white/5 shadow-glow transition-all duration-300 hover:border-neon-cyan/60 hover:shadow-glow-strong"
      style={{
        transform: 'perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))',
      }}
    >
      <div className="project-spotlight pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={project.image}
          alt={project.title}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-neon-pink/30 via-transparent to-neon-cyan/40" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70">
          <span className="rounded-full border border-neon-pink/40 bg-neon-pink/10 px-3 py-1 font-medium text-neon-pink">
            {project.role}
          </span>
          {project.stack.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-semibold text-white">{project.title}</h4>
          <p className="text-sm leading-relaxed text-white/70">{project.summary}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((metric) => (
            <div
              key={metric}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/70"
            >
              {metric}
            </div>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="link-underline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan transition-colors hover:text-neon-pink"
        >
          {profile.ui.projectLinkLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
