import profile from '../data/profile';
import { Reveal, RevealGroup, RevealItem } from './Reveal';

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <Reveal className="mb-10">
        <h3 className="text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
          {profile.ui.sections.skillsTitle}
        </h3>
      </Reveal>
      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <RevealItem key={group.category}>
            <div className="flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900/70">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{group.category}</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
