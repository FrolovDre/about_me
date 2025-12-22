import profile from '../data/profile';

export default function About() {
  return (
    <section id="about" className="py-16">
      <h3 className="text-3xl font-semibold mb-4">Обо мне</h3>
      <p className="text-gray-700 dark:text-gray-400 leading-relaxed whitespace-pre-line">
        {profile.about}
      </p>
    </section>
  );
}