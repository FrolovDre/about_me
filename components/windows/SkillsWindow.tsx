import profile from '../../data/profile';

export default function SkillsWindow() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-semibold text-white">{profile.ui.sections.skillsTitle}</h3>
        <p className="mt-2 text-sm text-white/70">{profile.tagline}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {profile.skills.map((group) => (
          <div key={group.category} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              {group.category}
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70"
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
