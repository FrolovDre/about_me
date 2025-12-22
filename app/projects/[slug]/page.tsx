import { notFound } from 'next/navigation';
import profile from '../../../data/profile';

interface Props {
  params: { slug: string };
}

export default function ProjectPage({ params }: Props) {
  const project = profile.projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  return (
    <div className="max-w-3xl mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-md mb-4" />
      <p className="mb-4 text-gray-700 dark:text-gray-400">{project.details}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Технологии</h2>
        <ul className="list-disc pl-5 space-y-1">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Результаты</h2>
        <ul className="list-disc pl-5 space-y-1">
          {project.metrics.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4">
        {project.links.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}