"use client";

import { motion, useMotionValue, useSpring } from 'framer-motion';
import profile from '../data/profile';
import BlobBackground from './BlobBackground';

export default function Hero() {
  const highlight =
    profile.taglineHighlight && profile.tagline.includes(profile.taglineHighlight)
      ? profile.taglineHighlight
      : undefined;
  const parts = highlight ? profile.tagline.split(highlight) : [profile.tagline];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-start pt-24 pb-16 overflow-hidden"
      id="hero"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / 40;
        const y = (event.clientY - rect.top - rect.height / 2) / 40;
        mouseX.set(x);
        mouseY.set(y);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <BlobBackground />
      <motion.div style={{ x: springX, y: springY }} className="w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {profile.name}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6"
        >
          {profile.role}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl text-lg text-gray-700 dark:text-gray-300 mb-8"
        >
          {parts[0]}
          {highlight && (
            <span className="relative inline-flex mx-1">
              <span className="absolute inset-0 -skew-y-1 rounded-md bg-sky-400/30 dark:bg-sky-500/30" />
              <span className="relative font-semibold text-sky-900 dark:text-sky-100">
                {highlight}
              </span>
            </span>
          )}
          {parts[1] ?? ''}
        </motion.p>
        {profile.highlights && profile.highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {profile.highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/30 bg-white/70 px-3 py-1 text-sm text-gray-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60 dark:text-gray-200"
              >
                {item}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-4">
          <a
            href="/CV.pdf"
            className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-3 text-white font-semibold shadow-lg shadow-sky-500/30 transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Скачать резюме
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-sky-500/40 px-6 py-3 font-semibold text-sky-700 transition-all hover:bg-sky-500/10 dark:text-sky-200"
          >
            Связаться
          </a>
        </div>
      </motion.div>
    </section>
  );
}
