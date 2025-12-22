"use client";

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-sky-400 via-blue-500 to-fuchsia-500"
      style={{ scaleX }}
    />
  );
}
