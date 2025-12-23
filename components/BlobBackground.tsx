"use client";

import { motion, useReducedMotion } from 'framer-motion';

const blobs = [
  {
    className:
      'top-[-10%] left-[-5%] h-64 w-64 md:h-80 md:w-80 bg-gradient-to-br from-neon-cyan/60 via-neon-purple/40 to-neon-pink/50',
    duration: 14,
  },
  {
    className:
      'bottom-[-15%] right-[-10%] h-72 w-72 md:h-96 md:w-96 bg-gradient-to-br from-neon-pink/60 via-neon-purple/50 to-neon-cyan/50',
    duration: 18,
  },
  {
    className:
      'top-[20%] right-[15%] h-56 w-56 md:h-72 md:w-72 bg-gradient-to-br from-neon-lime/40 via-neon-cyan/40 to-neon-purple/40',
    duration: 16,
  },
];

export default function BlobBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {blobs.map((blob, index) => (
        <motion.div
          key={blob.className}
          className={`absolute ${blob.className} rounded-full blur-3xl opacity-50 mix-blend-screen dark:mix-blend-lighten`}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, 20, -10, 0],
                  y: [0, -20, 10, 0],
                  rotate: [0, 8, -6, 0],
                  scale: [1, 1.05, 0.98, 1],
                }
          }
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
