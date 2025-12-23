import profile from '../../data/profile';
import ProjectCard from '../ProjectCard';

export default function ProjectsWindow() {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-semibold text-white">{profile.ui.sections.projectsTitle}</h3>
        <p className="mt-2 text-sm text-white/70">{profile.ui.sections.projectsIntro}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {profile.projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
