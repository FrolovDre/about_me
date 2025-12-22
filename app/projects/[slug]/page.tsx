import { notFound } from 'next/navigation';
import profile from '../../../data/profile';
import ProjectCase from '../../../components/ProjectCase';

interface Props {
  params: { slug: string };
}

export default function ProjectPage({ params }: Props) {
  const project = profile.projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  return <ProjectCase project={project} />;
}
