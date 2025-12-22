"use client";

import { motion } from 'framer-motion';
import profile from '../data/profile';
import ProjectCard from './ProjectCard';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="text-3xl font-semibold mb-2">Проекты</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            От коротких исследований до архитектурных проектов — каждый кейс подсвечивает продуктовую ценность.
          </p>
        </div>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-8 lg:grid-cols-2"
      >
        {profile.projects.map((project) => (
          <motion.div key={project.slug} variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
