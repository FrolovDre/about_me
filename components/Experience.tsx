import profile from '../data/profile';
import { Reveal, RevealGroup, RevealItem } from './Reveal';

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24">
      <Reveal className="mb-10">
        <h3 className="text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
          {profile.ui.sections.experienceTitle}
        </h3>
      </Reveal>
      <RevealGroup className="space-y-6">
        {profile.experience.map((exp) => (
          <RevealItem key={exp.company + exp.period}>
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/70">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {exp.position}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{exp.company}</p>
                  {exp.location && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{exp.location}</p>
                  )}
                </div>
                <div className="md:text-right">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {exp.period}
                  </span>
                  <p className="mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                    {exp.summary}
                  </p>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
