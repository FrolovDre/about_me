import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import ProjectsSection from '../components/ProjectsSection';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <Experience />
      <Contact />
    </>
  );
}