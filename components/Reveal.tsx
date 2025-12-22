"use client";

import { PropsWithChildren } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  viewportAmount?: number;
}>;

type RevealGroupProps = PropsWithChildren<{
  className?: string;
  stagger?: number;
  viewportAmount?: number;
}>;

export function Reveal({ children, className, delay = 0, viewportAmount = 0.25 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: 'easeOut', delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  viewportAmount = 0.2,
}: RevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : { staggerChildren: stagger },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: PropsWithChildren<{ className?: string }>) {
  const prefersReducedMotion = useReducedMotion();
  const variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
