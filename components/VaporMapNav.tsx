"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, type MouseEvent } from 'react';
import profile from '../data/profile';
import { useMapOverlay } from './MapOverlayProvider';

const nodePositions: Record<string, string> = {
  home: 'left-[12%] top-[22%] md:left-[18%] md:top-[24%]',
  skills: 'left-[55%] top-[18%] md:left-[60%] md:top-[20%]',
  projects: 'left-[68%] top-[48%] md:left-[70%] md:top-[46%]',
  experience: 'left-[26%] top-[55%] md:left-[30%] md:top-[58%]',
  contact: 'left-[50%] top-[72%] md:left-[52%] md:top-[76%]',
};

export default function VaporMapNav() {
  const { isOpen, skipMap } = useMapOverlay();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        skipMap();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, skipMap]);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: prefersReducedMotion ? { duration: 0 } : { staggerChildren: 0.12 },
      },
    }),
    [prefersReducedMotion],
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-vapor-night/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-label={profile.ui.map.title}
    >
      <div className="absolute inset-0 vapor-map-sky opacity-90" aria-hidden="true" />
      <div className="retro-grid grain-overlay absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-neon-pink/25 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-neon-purple/30 via-transparent to-transparent" />

      <div className="relative z-10 flex h-full w-full max-w-6xl flex-col px-6 py-12 md:px-12">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan/80">
              {profile.ui.siteTitle}
            </p>
            <h1 className="text-3xl font-semibold md:text-5xl">{profile.ui.map.title}</h1>
            <p className="text-sm text-white/70 md:text-base">{profile.ui.map.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={skipMap}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:border-neon-cyan/60 hover:text-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan"
          >
            {profile.ui.map.closeLabel}
          </button>
        </div>

        <motion.div
          className="relative mt-10 flex flex-1 items-center justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="absolute left-[15%] top-[35%] h-0.5 w-[55%] bg-gradient-to-r from-neon-pink/50 via-neon-cyan/60 to-neon-purple/40" />
          <div className="absolute left-[30%] top-[50%] h-[30%] w-0.5 bg-gradient-to-b from-neon-cyan/60 via-neon-pink/40 to-neon-purple/50" />

          {profile.mapNodes.map((node, index) => (
            <MapNode
              key={node.id}
              node={node}
              index={index}
              className={nodePositions[node.id]}
            />
          ))}
        </motion.div>

        <button
          type="button"
          onClick={skipMap}
          className="mt-6 self-start text-xs uppercase tracking-[0.3em] text-white/60 transition hover:text-neon-lime focus-visible:ring-2 focus-visible:ring-neon-lime"
        >
          {profile.ui.map.skipLabel}
        </button>
      </div>
    </div>
  );
}

interface MapNodeProps {
  node: (typeof profile.mapNodes)[number];
  index: number;
  className?: string;
}

function MapNode({ node, index, className }: MapNodeProps) {
  const { skipMap } = useMapOverlay();
  const prefersReducedMotion = useReducedMotion();
  const nodeRef = useRef<HTMLButtonElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const variants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.85, y: prefersReducedMotion ? 0 : 12 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.55, ease: 'easeOut', delay: index * 0.06 },
    },
  };

  const handleMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(() => {
      if (!nodeRef.current) return;
      nodeRef.current.style.setProperty('--magnet-x', `${offsetX}px`);
      nodeRef.current.style.setProperty('--magnet-y', `${offsetY}px`);
      frameRef.current = null;
    });
  };

  const handleLeave = () => {
    if (!nodeRef.current) return;
    nodeRef.current.style.setProperty('--magnet-x', '0px');
    nodeRef.current.style.setProperty('--magnet-y', '0px');
  };

  const handleSelect = () => {
    if (typeof document === 'undefined') return;
    skipMap();
    const target = document.querySelector(node.href);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <motion.div
      variants={variants}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              y: [0, -6, 0],
            }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.4,
            }
      }
      className={`absolute ${className}`}
    >
      <button
        ref={nodeRef}
        type="button"
        onClick={handleSelect}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onBlur={handleLeave}
        className="group relative rounded-full border border-white/20 bg-white/5 px-5 py-4 text-left shadow-glow transition hover:border-neon-cyan/80 hover:text-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan"
        style={{ transform: 'translate3d(var(--magnet-x, 0px), var(--magnet-y, 0px), 0)' }}
        aria-label={node.label}
      >
        <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
          <span className="text-neon-pink">{node.icon}</span>
          {node.badge}
        </span>
        <span className="mt-2 block text-lg font-semibold text-white">{node.label}</span>
        <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-4 w-56 -translate-x-1/2 rounded-2xl border border-white/10 bg-vapor-dusk/90 p-4 text-left text-xs text-white/80 opacity-0 shadow-glow transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <div className="mb-2 text-sm font-semibold text-neon-cyan">{node.badge}</div>
          <p>{node.description}</p>
        </div>
      </button>
    </motion.div>
  );
}
