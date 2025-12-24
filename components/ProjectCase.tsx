"use client";

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import profile, { Project } from '../data/profile';

interface ProjectCaseProps {
  project: Project;
}

export default function ProjectCase({ project }: ProjectCaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="mx-auto max-w-[1120px] px-4 py-24 sm:px-6 lg:px-8"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <Link
          href="/#projects"
          className="link-underline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan transition-colors hover:text-neon-pink"
        >
          <span aria-hidden="true">←</span>
          {profile.ui.projectCase.backLabel}
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} className="grid gap-8">
        <div>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-white/70">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-neon-pink/40 bg-neon-pink/10 px-3 py-1 text-xs font-medium text-neon-pink">
              {project.role}
            </span>
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="mt-12 grid gap-8">
        <motion.section
          variants={itemVariants}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow"
        >
          <h2 className="text-2xl font-semibold text-white">
            {profile.ui.projectCase.problemTitle}
          </h2>
          <p className="mt-3 text-white/70">{project.problem || project.summary}</p>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow"
        >
          <h2 className="text-2xl font-semibold text-white">
            {profile.ui.projectCase.actionsTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {(project.actions || []).map((action) => (
              <li key={action} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-neon-cyan" />
                <span className="text-sm text-white/70">{action}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow"
        >
          <h2 className="text-2xl font-semibold text-white">
            {profile.ui.projectCase.resultsTitle}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {project.metrics.map((metric) => (
              <div
                key={metric}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-white/70"
              >
                {metric}
              </div>
            ))}
          </div>
          {project.results && project.results.length > 0 && (
            <div className="mt-4 space-y-2">
              {project.results.map((result) => (
                <p key={result} className="text-sm text-white/70">
                  {result}
                </p>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow"
        >
          <h2 className="text-2xl font-semibold text-white">
            {profile.ui.projectCase.linksTitle}
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan transition-colors hover:border-neon-pink hover:text-neon-pink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
