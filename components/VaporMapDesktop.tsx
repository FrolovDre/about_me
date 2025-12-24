"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import profile from '../data/profile';
import Window from './Window';
import ContactWindow from './windows/ContactWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import IntroWindow from './windows/IntroWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';

const nodePlacements: Record<
  string,
  {
    left: string;
    top: string;
    width: string;
    emphasis?: boolean;
    order: string;
  }
> = {
  home: {
    left: '50%',
    top: '54%',
    width: 'clamp(200px, 18vw, 260px)',
    emphasis: true,
    order: 'order-1',
  },
  projects: {
    left: '56%',
    top: '62%',
    width: 'clamp(180px, 16vw, 230px)',
    order: 'order-2',
  },
  experience: {
    left: '30%',
    top: '70%',
    width: 'clamp(170px, 15vw, 220px)',
    order: 'order-3',
  },
  skills: {
    left: '72%',
    top: '70%',
    width: 'clamp(170px, 15vw, 220px)',
    order: 'order-4',
  },
  contact: {
    left: '86%',
    top: '72%',
    width: 'clamp(170px, 14vw, 210px)',
    order: 'order-5',
  },
};

const pyramidScene = [
  {
    id: 'pyramid-main',
    left: '42%',
    bottom: '36%',
    size: 'clamp(240px, 28vw, 420px)',
    depth: '120px',
    rotateY: '34deg',
    rotateX: '12deg',
    color: '#5b1f98',
    edge: '#d68cff',
    opacity: 0.95,
  },
  {
    id: 'pyramid-left',
    left: '18%',
    bottom: '34%',
    size: 'clamp(200px, 22vw, 340px)',
    depth: '100px',
    rotateY: '26deg',
    rotateX: '10deg',
    color: '#4a167e',
    edge: '#9b6bff',
    opacity: 0.8,
  },
  {
    id: 'pyramid-mid',
    left: '55%',
    bottom: '38%',
    size: 'clamp(180px, 20vw, 300px)',
    depth: '90px',
    rotateY: '30deg',
    rotateX: '11deg',
    color: '#6a2bb0',
    edge: '#c281ff',
    opacity: 0.85,
  },
  {
    id: 'pyramid-right',
    left: '74%',
    bottom: '36%',
    size: 'clamp(160px, 18vw, 260px)',
    depth: '80px',
    rotateY: '38deg',
    rotateX: '12deg',
    color: '#7a36c4',
    edge: '#ff78c8',
    opacity: 0.75,
  },
  {
    id: 'pyramid-right-small',
    left: '88%',
    bottom: '34%',
    size: 'clamp(140px, 16vw, 220px)',
    depth: '70px',
    rotateY: '42deg',
    rotateX: '10deg',
    color: '#8f45d8',
    edge: '#ff9de1',
    opacity: 0.7,
  },
];

const MotionButton = motion.button;

interface Pyramid3DProps {
  left: string;
  bottom: string;
  size: string;
  depth: string;
  rotateY: string;
  rotateX: string;
  color: string;
  edge: string;
  opacity: number;
}

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
      <div className="absolute inset-0 z-[5] outrun-scanlines" aria-hidden="true" />
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(2px 2px at 20% 25%, rgba(255,255,255,0.6) 0, transparent 60%), radial-gradient(1.5px 1.5px at 65% 18%, rgba(255,255,255,0.5) 0, transparent 60%), radial-gradient(1.8px 1.8px at 82% 35%, rgba(255,255,255,0.45) 0, transparent 60%), radial-gradient(1.4px 1.4px at 35% 12%, rgba(255,255,255,0.5) 0, transparent 60%), radial-gradient(1.6px 1.6px at 48% 30%, rgba(255,255,255,0.4) 0, transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-[18%] z-[6] h-[260px] w-[260px] -translate-x-1/2 rounded-full shadow-[0_0_90px_rgba(255,120,200,0.55)]">
        <div className="absolute inset-0 rounded-full outrun-sun" />
      </div>
      <div
        className="absolute inset-x-0 top-[48%] z-0 h-[120px] bg-gradient-to-b from-[#ff6aa6]/60 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="outrun-grid absolute inset-x-0 bottom-0 z-0 h-[45%] opacity-80 animate-grid-treadmill"
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
          <div className="absolute inset-0 z-10 pointer-events-none">
            {pyramidScene.map((pyramid) => (
              <Pyramid3D key={pyramid.id} {...pyramid} />
            ))}
          </div>

          <div className="relative z-30 grid w-full max-w-5xl grid-cols-2 gap-6 md:block md:h-[620px]">
            {profile.mapNodes.map((node, index) => {
              const placement = nodePlacements[node.id];
              if (!placement) return null;
              return (
                <div
                  key={node.id}
                  className={`relative flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:absolute md:min-h-0 md:border-0 md:bg-transparent ${placement.order}`}
                  style={
                    isMobile
                      ? undefined
                      : {
                          left: placement.left,
                          top: placement.top,
                          transform: 'translate(-50%, -50%)',
                        }
                  }
                >
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
                    className={`${
                      isMobile
                        ? 'relative'
                        : 'absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2'
                    } ${placement.emphasis ? 'md:scale-[1.06]' : ''}`}
                    style={
                      isMobile
                        ? undefined
                        : ({
                            width: placement.width,
                          } as CSSProperties)
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
  style?: CSSProperties;
}

function MapNode({
  node,
  index,
  isActive,
  isMobile,
  onSelect,
  className,
  style,
}: MapNodeProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleActivate = (event: MouseEvent<HTMLButtonElement>) => {
    onSelect(event.currentTarget);
  };

  return (
    <MotionButton
      type="button"
      onClick={handleActivate}
      style={style}
      className={`group ${className ?? ''} z-20 inline-flex min-w-[150px] flex-col items-center gap-1 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-center text-xs uppercase tracking-[0.25em] text-white/90 shadow-glow backdrop-blur-md transition-transform focus-visible:ring-2 focus-visible:ring-neon-cyan ${
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

function Pyramid3D({
  left,
  bottom,
  size,
  depth,
  rotateY,
  rotateX,
  color,
  edge,
  opacity,
}: Pyramid3DProps) {
  return (
    <div
      className="pyramid-3d"
      style={
        {
          left,
          bottom,
          '--pyramid-size': size,
          '--pyramid-depth': depth,
          '--pyramid-rotate-y': rotateY,
          '--pyramid-rotate-x': rotateX,
          '--pyramid-color': color,
          '--pyramid-edge': edge,
          opacity,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <span className="pyramid-face pyramid-face-front" />
      <span className="pyramid-face pyramid-face-left" />
      <span className="pyramid-face pyramid-face-right" />
      <span className="pyramid-face pyramid-face-back" />
      <span className="pyramid-rim" />
    </div>
  );
}
