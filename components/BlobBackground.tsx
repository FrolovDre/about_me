"use client";

import { motion } from 'framer-motion';

const blobs = [
  {
    className:
      'top-[-10%] left-[-5%] h-64 w-64 md:h-80 md:w-80 bg-gradient-to-br from-sky-400/70 via-cyan-300/60 to-blue-500/70',
    duration: 14,
  },
  {
    className:
      'bottom-[-15%] right-[-10%] h-72 w-72 md:h-96 md:w-96 bg-gradient-to-br from-fuchsia-400/60 via-purple-400/50 to-indigo-500/70',
    duration: 18,
  },
  {
    className:
      'top-[20%] right-[15%] h-56 w-56 md:h-72 md:w-72 bg-gradient-to-br from-emerald-300/60 via-teal-300/60 to-cyan-400/70',
    duration: 16,
  },
];

export default function BlobBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {blobs.map((blob, index) => (
        <motion.div
          key={blob.className}
          className={`absolute ${blob.className} rounded-full blur-3xl opacity-70 mix-blend-screen dark:mix-blend-lighten`}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -20, 10, 0],
            rotate: [0, 8, -6, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.4,
          }}
        />
      ))}
    </div>
  );
}
