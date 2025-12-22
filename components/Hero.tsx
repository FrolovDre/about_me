"use client";

import { motion } from 'framer-motion';
import profile from '../data/profile';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-start pt-24" id="hero">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        {profile.name}
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6"
      >
        {profile.role}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-xl text-gray-700 dark:text-gray-400 mb-8"
      >
        {profile.tagline}
      </motion.p>
      <div className="flex space-x-4">
        <a
          href="/CV.pdf"
          className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Скачать резюме
        </a>
        <a
          href="#contact"
          className="px-5 py-3 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          Связаться
        </a>
      </div>
    </section>
  );
}
