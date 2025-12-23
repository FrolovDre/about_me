import profile from '../data/profile';
import { Reveal, RevealGroup, RevealItem } from './Reveal';

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <Reveal className="mb-10">
        <h3 className="text-3xl font-semibold text-white md:text-4xl">
          {profile.ui.sections.skillsTitle}
        </h3>
      </Reveal>
      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group) => (
          <RevealItem key={group.category}>
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/60">
              <h4 className="text-lg font-semibold text-white">{group.category}</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/60 transition hover:border-neon-lime/60 hover:text-neon-lime"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
