import profile from '../data/profile';
import { Reveal } from './Reveal';

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <Reveal className="space-y-6">
        <h3 className="text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
          {profile.ui.sections.aboutTitle}
        </h3>
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg whitespace-pre-line">
          {profile.about}
        </p>
        <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">
          {profile.whatILookFor}
        </p>
      </Reveal>
    </section>
  );
}
