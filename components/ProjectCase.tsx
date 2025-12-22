"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '../data/profile';

interface ProjectCaseProps {
  project: Project;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectCase({ project }: ProjectCaseProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-5xl mx-auto py-24 px-4"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <Link
          href="/#projects"
          className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-300"
        >
          <span aria-hidden="true">←</span>
          К проектам
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-sm text-sky-700 dark:text-sky-300">
              {project.role}
            </span>
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200/60 dark:border-white/10 bg-gray-900/5 dark:bg-white/5 px-3 py-1 text-sm text-gray-700 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/70 shadow-[0_20px_50px_rgba(15,23,42,0.15)]">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <div className="mt-12 grid gap-8">
        <motion.section variants={itemVariants} className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 p-6">
          <h2 className="text-2xl font-semibold mb-3">Problem</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {project.problem || project.summary}
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 p-6">
          <h2 className="text-2xl font-semibold mb-4">What I did</h2>
          <ul className="space-y-3">
            {(project.actions || []).map((action) => (
              <li key={action} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500" />
                <span className="text-gray-700 dark:text-gray-300">{action}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section variants={itemVariants} className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 p-6">
          <h2 className="text-2xl font-semibold mb-4">Result</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.metrics.map((metric) => (
              <div
                key={metric}
                className="rounded-xl bg-gray-900/5 dark:bg-white/5 p-4 text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                {metric}
              </div>
            ))}
          </div>
          {project.results && project.results.length > 0 && (
            <div className="mt-4 space-y-2">
              {project.results.map((result) => (
                <p key={result} className="text-gray-700 dark:text-gray-300">
                  {result}
                </p>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section variants={itemVariants} className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 p-6">
          <h2 className="text-2xl font-semibold mb-4">Links</h2>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-500/20 dark:text-sky-200"
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
