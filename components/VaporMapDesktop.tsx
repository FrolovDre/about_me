"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent } from 'react';
import profile from '../data/profile';
import MapRoutes from './MapRoutes';
import Window from './Window';
import ContactWindow from './windows/ContactWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import IntroWindow from './windows/IntroWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';

const pyramidLayout: Record<
  string,
  {
    left: string;
    bottom: string;
    width: number;
    height: number;
    tone: string;
    glow: string;
  }
> = {
  home: {
    left: '52%',
    bottom: '22%',
    width: 420,
    height: 260,
    tone: 'linear-gradient(180deg, #4f1a8f 0%, #1b0838 55%, #0c0618 100%)',
    glow: 'bg-[#ff4fa3]/30',
  },
  experience: {
    left: '26%',
    bottom: '16%',
    width: 280,
    height: 170,
    tone: 'linear-gradient(180deg, #7a2fe0 0%, #2c0d58 55%, #140629 100%)',
    glow: 'bg-[#8a45ff]/25',
  },
  projects: {
    left: '8%',
    bottom: '18%',
    width: 220,
    height: 150,
    tone: 'linear-gradient(180deg, #6a2fd4 0%, #2a0b52 55%, #120621 100%)',
    glow: 'bg-[#7b39ff]/25',
  },
  skills: {
    left: '76%',
    bottom: '20%',
    width: 300,
    height: 190,
    tone: 'linear-gradient(180deg, #8b3be6 0%, #2f0f5f 55%, #16072b 100%)',
    glow: 'bg-[#9a5bff]/25',
  },
  contact: {
    left: '88%',
    bottom: '18%',
    width: 220,
    height: 150,
    tone: 'linear-gradient(180deg, #a24bed 0%, #2d0f5c 55%, #15072c 100%)',
    glow: 'bg-[#7df9ff]/25',
  },
};

const MotionButton = motion.button;

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
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape' || !activeWindow) return;
      closeWindow(activeWindow);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindow, closeWindow]);

  const minimizedWindows = windowOrder.filter(
    (id) => openWindows[id]?.minimized,
  ) as (keyof typeof windowConfigs)[];

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, #130725 0%, #2a0d4a 35%, #5a1a6e 55%, #ff4d8c 68%, #2c1244 72%, #12081f 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(2px 2px at 20% 25%, rgba(255,255,255,0.6) 0, transparent 60%), radial-gradient(1.5px 1.5px at 65% 18%, rgba(255,255,255,0.5) 0, transparent 60%), radial-gradient(1.8px 1.8px at 82% 35%, rgba(255,255,255,0.45) 0, transparent 60%), radial-gradient(1.4px 1.4px at 35% 12%, rgba(255,255,255,0.5) 0, transparent 60%), radial-gradient(1.6px 1.6px at 48% 30%, rgba(255,255,255,0.4) 0, transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-[18%] z-0 h-[240px] w-[240px] -translate-x-1/2 rounded-full shadow-[0_0_90px_rgba(255,120,200,0.55)]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'linear-gradient(180deg, #ff3fae 0%, #ff7f50 55%, #ffd166 100%)',
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(10,4,30,0) 0px, rgba(10,4,30,0) 18px, rgba(10,4,30,0.45) 20px, rgba(10,4,30,0.45) 28px)',
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-[48%] z-0 h-[120px] bg-gradient-to-b from-[#ff6aa6]/60 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="retro-grid absolute inset-x-0 bottom-0 z-0 h-[45%] opacity-70 animate-grid-treadmill"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-0 h-[40%] bg-gradient-to-t from-[#0b0618] via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-20 flex min-h-screen flex-col" ref={constraintsRef}>
        <header className="sr-only">
          <p>{profile.ui.siteTitle}</p>
          <h1>{profile.ui.map.title}</h1>
        </header>

        <div className="relative flex flex-1 items-center justify-center px-6 pb-10 md:px-12">
          <div className="relative z-30 grid w-full max-w-5xl grid-cols-2 gap-6 md:block md:h-[560px]">
            {profile.mapNodes.map((node, index) => {
              const layout = pyramidLayout[node.id];
              if (!layout) return null;

              return (
                <div
                  key={node.id}
                  className="relative flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:absolute md:min-h-0 md:border-0 md:bg-transparent"
                  style={
                    isMobile
                      ? undefined
                      : {
                          left: layout.left,
                          bottom: layout.bottom,
                          width: `${layout.width}px`,
                          height: `${layout.height}px`,
                          transform: 'translateX(-50%)',
                        }
                  }
                >
                  <div className="absolute inset-0 hidden md:block" aria-hidden="true">
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 100%, 0 100%)',
                        backgroundImage: layout.tone,
                        filter: 'drop-shadow(0 20px 28px rgba(6, 3, 18, 0.65))',
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: 'polygon(50% 0%, 0 100%, 50% 100%)',
                        backgroundImage:
                          'linear-gradient(200deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 55%, rgba(12,6,28,0.4) 100%)',
                        transform: 'translateX(-10%) skewX(-8deg)',
                        transformOrigin: 'bottom left',
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: 'polygon(50% 0%, 50% 100%, 100% 100%)',
                        backgroundImage:
                          'linear-gradient(330deg, rgba(10,5,30,0.85) 0%, rgba(10,5,30,0.35) 60%, rgba(255,255,255,0.06) 100%)',
                        transform: 'translateX(8%) skewX(6deg)',
                        transformOrigin: 'bottom right',
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: 'polygon(50% 4%, 90% 90%, 10% 90%)',
                        background:
                          'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)',
                        opacity: 0.8,
                      }}
                    />
                  </div>
                  <div
                    className={`absolute -bottom-3 left-1/2 hidden h-4 w-[70%] -translate-x-1/2 rounded-full blur-md md:block ${layout.glow}`}
                    aria-hidden="true"
                  />
                  <MapNode
                    node={node}
                    index={index}
                    isActive={Boolean(openWindows[node.id])}
                    isMobile={isMobile}
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
                    className={
                      isMobile
                        ? 'relative'
                        : 'absolute left-[40%] top-1/2 z-20 -translate-x-1/2 -translate-y-1/2'
                    }
                  />
                </div>
              );
            })}
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
  isActive: boolean;
  isMobile: boolean;
  onSelect: (opener: HTMLElement) => void;
  className?: string;
}

function MapNode({
  node,
  index,
  isActive,
  isMobile,
  onSelect,
  className,
}: MapNodeProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleActivate = (event: MouseEvent<HTMLButtonElement>) => {
    onSelect(event.currentTarget);
  };

  return (
    <MotionButton
      type="button"
      onClick={handleActivate}
      className={`group ${className ?? ''} z-20 inline-flex min-w-[150px] flex-col items-center gap-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-center text-xs uppercase tracking-[0.25em] text-white/80 shadow-glow transition-transform focus-visible:ring-2 focus-visible:ring-neon-cyan md:min-w-0 md:max-w-[72%] md:px-3 md:py-2 md:text-[11px] md:leading-snug md:tracking-[0.2em] md:whitespace-normal ${
        isActive
          ? 'border-neon-cyan/80 text-neon-cyan shadow-glow-strong'
          : 'hover:border-neon-pink/70 hover:text-neon-pink'
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
      <span className="text-[10px] text-white/60">{node.badge}</span>
      <span className="text-sm font-semibold text-white">{node.label}</span>

      {!isMobile && (
        <span
          id={`${node.id}-tooltip`}
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-52 -translate-x-1/2 rounded-2xl border border-white/10 bg-vapor-dusk/90 p-3 text-xs text-white/80 opacity-0 shadow-glow transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <span className="block text-xs uppercase tracking-[0.25em] text-neon-cyan">
            {profile.ui.map.openLabel}
          </span>
          <span className="mt-2 block">{node.description}</span>
        </span>
      )}
    </MotionButton>
  );
}
