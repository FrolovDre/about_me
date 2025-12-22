import Link from 'next/link';
import { motion } from 'framer-motion';
import profile from '../data/profile';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16">
      <h3 className="text-3xl font-semibold mb-8">Проекты</h3>
      <div className="grid gap-8 md:grid-cols-2">
        {profile.projects.map((project, idx) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg flex flex-col"
          >
            <img
              src={project.image}
              alt={project.title}
              className="rounded-md w-full h-40 object-cover mb-4"
            />
            <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
            <p className="text-gray-700 dark:text-gray-400 flex-grow">{project.summary}</p>
            <Link
              href={`/projects/${project.slug}`}
              className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
            >
              Подробнее →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}