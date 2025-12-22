import profile from '../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <h3 className="text-3xl font-semibold mb-4">Контакты</h3>
      <div className="space-y-4 mb-8">
        {profile.contact.location && (
          <p>
            <strong>Локация:</strong> {profile.contact.location}
          </p>
        )}
        <p>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${profile.contact.email}`} className="hover:underline text-blue-600 dark:text-blue-400">
            {profile.contact.email}
          </a>
        </p>
        {profile.contact.phone && (
          <p>
            <strong>Телефон:</strong>{' '}
            <a href={`tel:${profile.contact.phone}`} className="hover:underline text-blue-600 dark:text-blue-400">
              {profile.contact.phone}
            </a>
          </p>
        )}
        <ul className="flex space-x-4 mt-2">
          {profile.contact.socials.map((social) => (
            <li key={social.label}>
              <a href={social.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 dark:text-blue-400">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <form
        className="grid gap-4 max-w-md"
        action={`mailto:${profile.contact.email}`}
        method="POST"
        encType="text/plain"
      >
        {/* При использовании Formspree замените action на URL формы */}
        <label className="flex flex-col">
          <span className="mb-1">Имя</span>
          <input
            type="text"
            name="name"
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Email</span>
          <input
            type="email"
            name="email"
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Сообщение</span>
          <textarea
            name="message"
            rows={4}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
            required
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Отправить
        </button>
      </form>
    </section>
  );
}