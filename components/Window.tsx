"use client";

import { motion, useReducedMotion } from 'framer-motion';
import {
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  type RefObject,
} from 'react';
import profile from '../data/profile';

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  isActive: boolean;
  isMobile: boolean;
  defaultPosition: { left: string; top: string };
  dragConstraints: RefObject<HTMLDivElement>;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  style?: CSSProperties;
}

export default function Window({
  id,
  title,
  children,
  isActive,
  isMobile,
  defaultPosition,
  dragConstraints,
  onFocus,
  onClose,
  onMinimize,
  style,
}: WindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = useId();
  const descriptionId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const baseStyle = isMobile ? {} : { left: defaultPosition.left, top: defaultPosition.top };

  const focusFirst = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      container.focus();
    }
  }, []);

  useEffect(() => {
    focusFirst();
  }, [focusFirst]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const container = containerRef.current;
    if (!container) return;

    const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));
    if (focusable.length === 0) {
      event.preventDefault();
      container.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (!activeElement || activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else if (activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      tabIndex={-1}
      className={`window-shell pointer-events-auto absolute w-[min(720px,92vw)] max-w-full rounded-3xl border border-white/15 bg-vapor-dusk/80 text-white shadow-glow backdrop-blur-xl focus:outline-none md:w-[min(760px,68vw)] ${
        isMobile ? 'inset-4' : ''
      } ${isActive ? 'ring-2 ring-neon-cyan/60' : 'ring-1 ring-white/10'}`}
      style={{ ...baseStyle, ...style }}
      drag={!isMobile}
      dragConstraints={dragConstraints}
      dragElastic={0.12}
      dragMomentum={false}
      onMouseDown={() => onFocus(id)}
      onFocusCapture={() => onFocus(id)}
      onKeyDown={handleKeyDown}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97, y: 10 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 12 }}
      transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-neon-pink" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-neon-purple" aria-hidden="true" />
          <h2 id={headingId} className="text-sm font-semibold uppercase tracking-[0.25em]">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onMinimize(id)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60 transition hover:border-neon-cyan/60 hover:text-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan"
            aria-label={profile.ui.map.windowLabels.minimize}
          >
            –
          </button>
          <button
            type="button"
            onClick={() => onClose(id)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60 transition hover:border-neon-pink/60 hover:text-neon-pink focus-visible:ring-2 focus-visible:ring-neon-pink"
            aria-label={profile.ui.map.windowLabels.close}
          >
            ×
          </button>
        </div>
      </div>
      <div id={descriptionId} className="sr-only">
        {profile.ui.map.windowLabels.description}
      </div>
      <div className="max-h-[70vh] space-y-6 overflow-y-auto px-5 py-6 md:max-h-[72vh]">
        {children}
      </div>
    </motion.div>
  );
}
