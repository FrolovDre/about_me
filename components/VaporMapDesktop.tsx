"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import profile from '../data/profile';
import Window from './Window';
import ContactWindow from './windows/ContactWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import IntroWindow from './windows/IntroWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';

const nodePositions: Record<string, string> = {
  home: 'md:left-[18%] md:top-[24%]',
  skills: 'md:left-[72%] md:top-[28%]',
  projects: 'md:left-1/2 md:top-[48%] md:-translate-x-1/2 md:-translate-y-1/2',
  experience: 'md:left-[16%] md:top-[64%]',
  contact: 'md:left-[82%] md:top-[70%]',
};

const windowPresets: Record<string, { left: string; top: string }> = {
  home: { left: '8%', top: '8%' },
  skills: { left: '52%', top: '12%' },
  projects: { left: '44%', top: '24%' },
  experience: { left: '10%', top: '30%' },
  contact: { left: '24%', top: '18%' },
};

export default function VaporMapDesktop() {
  const [openWindows, setOpenWindows] = useState<Record<string, { minimized: boolean }>>({});
  const [windowOrder, setWindowOrder] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const openerRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const windowConfigs = useMemo(
    () =>
      ({
        home: {
          title: profile.ui.sections.aboutTitle,
          content: <IntroWindow />,
        },
        skills: {
          title: profile.ui.sections.skillsTitle,
          content: <SkillsWindow />,
        },
        projects: {
          title: profile.ui.sections.projectsTitle,
          content: <ProjectsWindow />,
        },
        experience: {
          title: profile.ui.sections.experienceTitle,
          content: <ExperienceWindow />,
        },
        contact: {
          title: profile.ui.sections.contactTitle,
          content: <ContactWindow />,
        },
      }) as const,
    [],
  );

  const bringToFront = useCallback((id: string) => {
    setWindowOrder((prev) => {
      const next = prev.filter((item) => item !== id).concat(id);
      setActiveWindow(id);
      return next;
    });
  }, []);

  const openWindow = useCallback(
    (id: string, opener?: HTMLElement | null) => {
      if (opener) {
        openerRefs.current[id] = opener;
      }
      setOpenWindows((prev) => ({
        ...prev,
        [id]: { minimized: false },
      }));
      bringToFront(id);
    },
    [bringToFront],
  );

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setWindowOrder((prev) => {
      const next = prev.filter((item) => item !== id);
      const nextActive = next[next.length - 1] ?? '';
      setActiveWindow(nextActive);
      return next;
    });

    const opener = openerRefs.current[id];
    if (opener) {
      opener.focus();
    }
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { minimized: true },
    }));
    setActiveWindow((prev) => (prev === id ? '' : prev));
  }, []);

  const restoreWindow = useCallback(
    (id: string) => {
      setOpenWindows((prev) => ({
        ...prev,
        [id]: { minimized: false },
      }));
      bringToFront(id);
    },
    [bringToFront],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !activeWindow) return;
      closeWindow(activeWindow);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindow, closeWindow]);

  const minimizedWindows = windowOrder.filter(
    (id) => openWindows[id]?.minimized,
  ) as (keyof typeof windowConfigs)[];

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const routeSegments = [
    { id: 'intro-projects', from: 'home', to: 'projects', className: 'left-[26%] top-[34%] w-[30%] rotate-[10deg]' },
    { id: 'skills-projects', from: 'skills', to: 'projects', className: 'left-[56%] top-[36%] w-[24%] rotate-[-8deg]' },
    { id: 'projects-experience', from: 'projects', to: 'experience', className: 'left-[30%] top-[56%] w-[30%] rotate-[6deg]' },
    { id: 'projects-contact', from: 'projects', to: 'contact', className: 'left-[58%] top-[58%] w-[26%] rotate-[-6deg]' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 vapor-map-sky" aria-hidden="true" />
      <div className="retro-grid grain-overlay absolute inset-0 opacity-80" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-neon-pink/30 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-neon-purple/30 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col" ref={constraintsRef}>
        <header className="flex flex-wrap items-start justify-between gap-6 px-6 py-8 md:px-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-neon-cyan/80">
              {profile.ui.siteTitle}
            </p>
            <h1 className="text-3xl font-semibold md:text-5xl">{profile.ui.map.title}</h1>
            {profile.ui.map.subtitle && (
              <p className="text-sm text-white/70 md:text-base">{profile.ui.map.subtitle}</p>
            )}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs uppercase tracking-[0.25em] text-white/60">
            <p className="text-neon-cyan/80">{profile.ui.map.controls.title}</p>
            <ul className="mt-2 space-y-2">
              {profile.ui.map.controls.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </header>

        <div className="relative flex flex-1 items-center justify-center px-6 pb-10 md:px-12">
          {routeSegments.map((route) => {
            const isActive = hoveredNode === route.from || hoveredNode === route.to;
            return (
              <span
                key={route.id}
                className={`pointer-events-none absolute hidden h-0.5 origin-left rounded-full transition md:block ${route.className} ${
                  isActive
                    ? 'bg-gradient-to-r from-neon-pink/90 via-neon-cyan/90 to-neon-purple/90 shadow-glow'
                    : 'bg-gradient-to-r from-white/10 via-white/20 to-white/10'
                }`}
                aria-hidden="true"
              />
            );
          })}

          <div className="relative grid w-full max-w-5xl grid-cols-2 gap-6 md:block md:h-[520px]">
            {profile.mapNodes.map((node, index) => (
              <MapNode
                key={node.id}
                node={node}
                index={index}
                className={nodePositions[node.id]}
                isActive={Boolean(openWindows[node.id])}
                isMobile={isMobile}
                onHover={setHoveredNode}
                onSelect={(event) => {
                  const opener = event.currentTarget as HTMLElement;
                  if (openWindows[node.id]) {
                    if (openWindows[node.id]?.minimized) {
                      restoreWindow(node.id);
                    } else {
                      bringToFront(node.id);
                    }
                  } else {
                    openWindow(node.id, opener);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {minimizedWindows.length > 0 && (
          <div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs uppercase tracking-[0.25em] text-white/60">
            <p className="text-neon-lime/80">{profile.ui.map.windowLabels.minimized}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {minimizedWindows.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => restoreWindow(id)}
                  className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/70 transition hover:border-neon-cyan/60 hover:text-neon-cyan"
                  aria-label={profile.ui.map.windowLabels.restore}
                >
                  {windowConfigs[id].title}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {windowOrder
            .filter((id) => openWindows[id] && !openWindows[id]?.minimized)
            .map((id, index) => {
              const typedId = id as keyof typeof windowConfigs;
              const config = windowConfigs[typedId];
              return (
                <Window
                  key={id}
                  id={id}
                  title={config.title}
                  defaultPosition={windowPresets[id] ?? { left: '12%', top: '18%' }}
                  dragConstraints={constraintsRef}
                  isActive={activeWindow === id}
                  isMobile={isMobile}
                  onFocus={bringToFront}
                  onClose={closeWindow}
                  onMinimize={minimizeWindow}
                  style={{ zIndex: 30 + index }}
                >
                  {config.content}
                </Window>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface MapNodeProps {
  node: (typeof profile.mapNodes)[number];
  index: number;
  className?: string;
  isActive: boolean;
  isMobile: boolean;
  onHover: (id: string | null) => void;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
}

function MapNode({ node, index, className, isActive, isMobile, onHover, onSelect }: MapNodeProps) {
  const prefersReducedMotion = useReducedMotion();
  const variant =
    node.id === 'projects'
      ? 'main'
      : node.id === 'experience'
        ? 'runway'
        : node.id === 'skills'
          ? 'cluster'
          : node.id === 'contact'
            ? 'lighthouse'
            : 'base';

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      className={`group relative flex flex-col gap-2 rounded-[28px] border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/5 px-4 py-4 text-left shadow-glow transition focus-visible:ring-2 focus-visible:ring-neon-cyan md:absolute ${
        className ?? ''
      } ${
        isActive
          ? 'border-neon-cyan/80 text-neon-cyan shadow-glow-strong'
          : 'hover:border-neon-pink/70 hover:text-neon-pink'
      } ${
        variant === 'main'
          ? 'md:w-80 md:px-6 md:py-6'
          : variant === 'runway'
            ? 'md:w-96 md:flex-row md:items-center md:justify-between md:gap-4 md:py-4'
            : variant === 'cluster'
              ? 'md:w-60'
              : 'md:w-52'
      }`}
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9, y: 8 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1, scale: 1 }
          : {
              opacity: 1,
              scale: 1,
              y: [0, -6, 0],
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.2 }
          : {
              duration: 4 + index,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            }
      }
      aria-pressed={isActive}
      aria-describedby={!isMobile ? `${node.id}-tooltip` : undefined}
    >
      <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70">
        <span className="text-neon-pink">{node.icon}</span>
        {node.badge}
      </span>
      <span className="text-lg font-semibold text-white">{node.label}</span>
      <span className="text-xs text-white/60">{node.description}</span>

      <span
        className={`pointer-events-none absolute inset-0 -z-10 rounded-[32px] blur-2xl transition ${
          variant === 'main'
            ? 'bg-neon-pink/25'
            : variant === 'runway'
              ? 'bg-neon-cyan/20'
              : variant === 'cluster'
                ? 'bg-neon-purple/20'
                : 'bg-neon-pink/15'
        }`}
        aria-hidden="true"
      />

      {variant === 'main' && (
        <span
          className="pointer-events-none absolute -bottom-4 left-1/2 h-3 w-32 -translate-x-1/2 rounded-full bg-neon-pink/30 blur-md"
          aria-hidden="true"
        />
      )}

      {variant === 'runway' && (
        <>
          <span
            className="pointer-events-none absolute -bottom-4 left-6 right-6 h-3 rounded-full bg-neon-cyan/25 blur-md"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            aria-hidden="true"
          />
        </>
      )}

      {variant === 'cluster' && (
        <>
          <span className="pointer-events-none absolute -right-3 -top-2 h-6 w-6 rounded-full border border-white/20 bg-white/10 shadow-glow" aria-hidden="true" />
          <span className="pointer-events-none absolute -left-4 bottom-6 h-5 w-5 rounded-full border border-white/20 bg-white/10 shadow-glow" aria-hidden="true" />
          <span className="pointer-events-none absolute right-6 -bottom-4 h-4 w-4 rounded-full border border-white/20 bg-white/10 shadow-glow" aria-hidden="true" />
        </>
      )}

      {variant === 'lighthouse' && (
        <>
          <span
            className="pointer-events-none absolute -right-2 -top-8 h-10 w-3 rounded-full bg-gradient-to-b from-neon-cyan/80 via-neon-purple/70 to-transparent shadow-glow"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute -right-6 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-neon-cyan/60 bg-neon-cyan/10 shadow-glow"
            aria-hidden="true"
          />
        </>
      )}

      {!isMobile && (
        <span
          id={`${node.id}-tooltip`}
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-60 -translate-x-1/2 rounded-2xl border border-white/10 bg-vapor-dusk/90 p-3 text-xs text-white/80 opacity-0 shadow-glow transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <span className="block text-xs uppercase tracking-[0.25em] text-neon-cyan">
            {profile.ui.map.openLabel}
          </span>
          <span className="mt-2 block">{node.description}</span>
        </span>
      )}
    </motion.button>
  );
}
