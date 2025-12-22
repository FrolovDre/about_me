import profile from '../data/profile';

export default function Skills() {
  return (
    <section id="skills" className="py-16">
      <h3 className="text-3xl font-semibold mb-8">Навыки</h3>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {profile.skills.map((group) => (
          <div key={group.category} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="text-xl font-semibold mb-4">{group.category}</h4>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="mr-2 h-2 w-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}