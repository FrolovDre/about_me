import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import ProjectsSection from '../components/ProjectsSection';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <ProjectsSection />
      <Experience />
      <Contact />
    </>
  );
}
