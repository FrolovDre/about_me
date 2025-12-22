import profile from '../data/profile';

export default function Experience() {
  return (
    <section id="experience" className="py-16">
      <h3 className="text-3xl font-semibold mb-8">Опыт</h3>
      <div className="space-y-8">
        {profile.experience.map((exp) => (
          <div key={exp.company + exp.period} className="flex flex-col md:flex-row md:justify-between">
            <div>
              <h4 className="text-xl font-semibold">{exp.position}</h4>
              <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
              {exp.location && (
                <p className="text-gray-500 dark:text-gray-500 text-sm">{exp.location}</p>
              )}
            </div>
            <div className="md:text-right">
              <span className="text-gray-500 dark:text-gray-400">{exp.period}</span>
              <p className="mt-2 max-w-xl text-gray-700 dark:text-gray-400">{exp.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}