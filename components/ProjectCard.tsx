import Link from 'next/link';
import profile, { Project } from '../data/profile';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const stats = project.metrics.slice(0, 2);

  return (
    <div className="group rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/70">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-tr from-white/10 via-transparent to-white/30" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <span className="rounded-full border border-slate-200/70 bg-slate-50 px-3 py-1 font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            {project.role}
          </span>
          {project.stack.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h4>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {project.summary}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((metric) => (
            <div
              key={metric}
              className="rounded-xl border border-slate-200/60 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              {metric}
            </div>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
        >
          {profile.ui.projectLinkLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
