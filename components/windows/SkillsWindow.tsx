import profile from '../../data/profile';

interface SkillsWindowProps {
  focusCategory?: string | null;
}

export default function SkillsWindow({ focusCategory }: SkillsWindowProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-semibold text-white">{profile.ui.sections.skillsTitle}</h3>
        <p className="mt-2 text-sm text-white/70">{profile.tagline}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {profile.skills.map((group) => (
          <div
            key={group.category}
            className={`rounded-2xl border bg-white/5 p-4 transition ${
              focusCategory && focusCategory !== group.category
                ? 'border-white/5 opacity-60'
                : 'border-white/10'
            } ${
              focusCategory === group.category
                ? 'border-neon-cyan/70 shadow-glow'
                : ''
            }`}
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              {group.category}
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.2em] transition ${
                    focusCategory === group.category
                      ? 'border-neon-cyan/60 bg-neon-cyan/10 text-neon-cyan'
                      : 'border-white/10 bg-white/5 text-white/70'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
