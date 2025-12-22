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
          className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          <span aria-hidden="true">←</span>
          {profile.ui.projectCase.backLabel}
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200/70 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              {project.role}
            </span>
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <div className="mt-12 grid gap-8">
        <motion.section
          variants={itemVariants}
          className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
        >
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {profile.ui.projectCase.problemTitle}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{project.problem || project.summary}</p>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
        >
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {profile.ui.projectCase.actionsTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {(project.actions || []).map((action) => (
              <li key={action} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-slate-900 dark:bg-white" />
                <span className="text-sm text-slate-600 dark:text-slate-300">{action}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
        >
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {profile.ui.projectCase.resultsTitle}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {project.metrics.map((metric) => (
              <div
                key={metric}
                className="rounded-xl border border-slate-200/60 bg-slate-50 p-4 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                {metric}
              </div>
            ))}
          </div>
          {project.results && project.results.length > 0 && (
            <div className="mt-4 space-y-2">
              {project.results.map((result) => (
                <p key={result} className="text-sm text-slate-600 dark:text-slate-300">
                  {result}
                </p>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70"
        >
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {profile.ui.projectCase.linksTitle}
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
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
