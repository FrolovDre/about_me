import ProjectsSection from '../../components/ProjectsSection';
import profile from '../../data/profile';

export const metadata = {
  title: profile.ui.sections.projectsTitle,
  description: profile.ui.sections.projectsIntro,
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
      <ProjectsSection />
    </div>
  );
}
