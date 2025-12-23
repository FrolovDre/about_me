"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import profile from '../data/profile';
import MapRoutes from './MapRoutes';
import Window from './Window';
import ContactWindow from './windows/ContactWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import IntroWindow from './windows/IntroWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';

const nodePositions: Record<string, string> = {
  home:
    'order-2 md:left-[18%] md:top-[34%] md:w-[360px] md:h-[180px]',
  projects:
    'order-1 col-span-2 md:left-[52%] md:top-[54%] md:-translate-x-1/2 md:-translate-y-1/2 md:w-[520px] md:h-[240px]',
  experience:
    'order-4 md:left-[18%] md:top-[78%] md:w-[640px] md:h-[120px]',
  skills:
    'order-3 md:left-[78%] md:top-[30%] md:w-[420px] md:h-[190px]',
  contact:
    'order-5 md:left-[82%] md:top-[74%] md:w-[360px] md:h-[190px]',
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
  const [skillsFocus, setSkillsFocus] = useState<string | null>(null);
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
          content: <SkillsWindow focusCategory={skillsFocus} />,
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

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 z-0 vapor-map-sky" aria-hidden="true" />
      <div className="retro-grid grain-overlay absolute inset-0 z-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 z-0 h-52 bg-gradient-to-b from-neon-pink/30 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-0 h-56 bg-gradient-to-t from-neon-purple/30 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-1/2 top-[55%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255, 168, 120, 0.18), transparent 70%)',
          }}
        />
        <div
          className="absolute left-[18%] top-[70%] h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, rgba(120, 210, 255, 0.14), transparent 70%)',
          }}
        />
        <div
          className="absolute left-[82%] top-[35%] h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, rgba(200, 130, 255, 0.12), transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-20 flex min-h-screen flex-col" ref={constraintsRef}>
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
          <div className="absolute inset-0 z-20 hidden md:block">
            <MapRoutes hoveredNode={hoveredNode} />
          </div>

          <div className="relative z-30 grid w-full max-w-5xl grid-cols-2 gap-6 md:block md:h-[520px]">
            {profile.mapNodes.map((node, index) => (
              <MapNode
                key={node.id}
                node={node}
                index={index}
                className={nodePositions[node.id]}
                isActive={Boolean(openWindows[node.id])}
                isMobile={isMobile}
                onHover={setHoveredNode}
                onSelect={(opener) => {
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
                onSkillChipSelect={(category, opener) => {
                  setSkillsFocus(category);
                  if (openWindows.skills) {
                    bringToFront('skills');
                  } else {
                    openWindow('skills', opener);
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
                  style={{ zIndex: 40 + index }}
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
  onSelect: (opener: HTMLElement) => void;
  onSkillChipSelect?: (category: string, opener: HTMLElement) => void;
}

function MapNode({
  node,
  index,
  className,
  isActive,
  isMobile,
  onHover,
  onSelect,
  onSkillChipSelect,
}: MapNodeProps) {
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

  const handleActivate = (event: MouseEvent<HTMLDivElement>) => {
    onSelect(event.currentTarget);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(event.currentTarget);
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(node.id)}
      onBlur={() => onHover(null)}
      className={`group relative flex min-h-[140px] w-full flex-col gap-2 rounded-[28px] border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/5 px-4 py-4 text-left shadow-glow transition-transform focus-visible:ring-2 focus-visible:ring-neon-cyan md:absolute ${
        className ?? ''
      } ${
        isActive
          ? 'border-neon-cyan/80 text-neon-cyan shadow-glow-strong'
          : 'hover:border-neon-pink/70 hover:text-neon-pink'
      } ${
        variant === 'main'
          ? 'md:border-2 md:border-neon-pink/60 md:px-8 md:py-6 md:shadow-glow-strong'
          : variant === 'runway'
            ? 'md:flex-row md:items-center md:justify-between md:gap-4 md:rounded-full md:py-4'
            : variant === 'cluster'
              ? 'md:px-6'
              : 'md:px-5'
      } hover:scale-[1.02] focus-visible:scale-[1.02]`}
      initial={false}
      animate={prefersReducedMotion ? { y: 0 } : { y: [0, -4, 0] }}
      transition={
        prefersReducedMotion
          ? { duration: 0.2 }
          : {
              duration: 6 + index,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            }
      }
      aria-pressed={isActive}
      aria-label={`${profile.ui.map.openLabel}: ${node.label}`}
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
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSkillChipSelect?.('Продукт', event.currentTarget);
            }}
            className="absolute -right-[18px] -top-[18px] hidden rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 shadow-glow transition hover:border-neon-cyan/60 hover:text-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan md:inline-flex"
          >
            Продукт
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSkillChipSelect?.('Технологии', event.currentTarget);
            }}
            className="absolute left-[22px] top-[-22px] hidden rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 shadow-glow transition hover:border-neon-cyan/60 hover:text-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan md:inline-flex"
          >
            Технологии
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSkillChipSelect?.('Аналитика', event.currentTarget);
            }}
            className="absolute -left-[22px] bottom-[46px] hidden rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 shadow-glow transition hover:border-neon-cyan/60 hover:text-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan md:inline-flex"
          >
            Аналитика
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onSkillChipSelect?.('Менеджмент', event.currentTarget);
            }}
            className="absolute bottom-[-18px] right-[24px] hidden rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 shadow-glow transition hover:border-neon-cyan/60 hover:text-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan md:inline-flex"
          >
            Менеджмент
          </button>
        </>
      )}

      {variant === 'lighthouse' && (
        <>
          <span
            className={`pointer-events-none absolute -right-2 -top-8 h-[120px] w-[8px] rounded-full bg-gradient-to-b from-neon-cyan/80 via-neon-purple/70 to-transparent shadow-glow ${
              prefersReducedMotion ? '' : 'animate-pulse'
            }`}
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
    </motion.div>
  );
}
