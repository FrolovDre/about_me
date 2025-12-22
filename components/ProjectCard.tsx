import Link from 'next/link';
import { Project } from '../data/profile';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const stats = project.metrics.slice(0, 2);

  return (
    <div className="group relative rounded-2xl bg-gradient-to-br from-transparent via-transparent to-transparent p-[1px] transition-all duration-300 hover:from-sky-500/30 hover:via-blue-500/20 hover:to-fuchsia-500/30">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/80 text-gray-900 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-gray-900/80 dark:text-gray-100">
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-white/10 via-transparent to-white/30" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-sky-700 dark:text-sky-300 mb-3">
            <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1">
              {project.role}
            </span>
            {project.stack.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200/60 dark:border-white/10 bg-gray-900/5 dark:bg-white/5 px-3 py-1 text-gray-600 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">{project.summary}</p>
          <div className="grid gap-3 sm:grid-cols-2 mb-4">
            {stats.map((metric) => (
              <div
                key={metric}
                className="rounded-xl bg-gray-900/5 dark:bg-white/5 p-3 text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                {metric}
              </div>
            ))}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-300"
          >
            Подробнее
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
