import ProjectsSection from '../../components/ProjectsSection';

export const metadata = {
  title: 'Проекты',
  description: 'Список выполненных проектов',
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-6">Проекты</h1>
      <ProjectsSection />
    </div>
  );
}