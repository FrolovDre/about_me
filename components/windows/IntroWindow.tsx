import profile from '../../data/profile';

export default function IntroWindow() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan/70">
          {profile.ui.siteTitle}
        </p>
        <h3 className="text-3xl font-semibold text-white md:text-4xl">{profile.name}</h3>
        <p className="text-base text-white/70 md:text-lg">
          {profile.role} · {profile.tagline}
        </p>
      </div>

      <p className="text-sm text-white/70 md:text-base">{profile.about}</p>

      {profile.highlights && profile.highlights.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {profile.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-neon-pink/40 bg-neon-pink/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-neon-pink"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            {profile.ui.valueCardTitle}
          </h4>
          <ul className="mt-3 space-y-3 text-sm text-white/70">
            {profile.valueProps.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-white/50">{profile.ui.valueCardNote}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            {profile.ui.sections.aboutTitle}
          </h4>
          <div className="mt-3 space-y-3">
            {profile.quickFacts.map((fact) => (
              <div key={fact.label} className="flex items-start justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.25em] text-white/50">
                  {fact.label}
                </span>
                <span className="text-sm text-white/70">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
          {profile.ui.map.introPrompt}
        </h4>
        <p className="mt-2">{profile.whatILookFor}</p>
      </div>
    </div>
  );
}
