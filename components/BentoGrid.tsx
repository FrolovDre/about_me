import profile from '../data/profile';

const cardBase =
  'rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur p-6';

export default function BentoGrid() {
  return (
    <section className="py-16" id="about">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-semibold">Обо мне</h3>
        {profile.highlights && profile.highlights.length > 0 && (
          <div className="hidden md:flex gap-2 flex-wrap">
            {profile.highlights.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full text-sm bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-12">
        <article className={`${cardBase} md:col-span-6 lg:col-span-7`}>
          <h4 className="text-xl font-semibold mb-3">Кто я</h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {profile.about}
          </p>
        </article>
        <article className={`${cardBase} md:col-span-6 lg:col-span-5`}>
          <h4 className="text-xl font-semibold mb-3">Что ищу</h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {profile.whatILookFor}
          </p>
        </article>
        <article className={`${cardBase} md:col-span-6 lg:col-span-7`} id="skills">
          <h4 className="text-xl font-semibold mb-4">Навыки</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {profile.skills.map((group) => (
              <div key={group.category}>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-sm bg-gray-900/5 dark:bg-white/5 text-gray-700 dark:text-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className={`${cardBase} md:col-span-6 lg:col-span-5`}>
          <h4 className="text-xl font-semibold mb-4">Сильные стороны</h4>
          <div className="space-y-3">
            {(profile.highlights || []).map((highlight) => (
              <div key={highlight} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500" />
                <p className="text-gray-700 dark:text-gray-300">{highlight}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
