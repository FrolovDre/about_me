"use client";

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const GLOW_SIZE = 760;

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const latestRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const updatePosition = () => {
      glow.style.transform = `translate3d(${latestRef.current.x - GLOW_SIZE / 2}px, ${
        latestRef.current.y - GLOW_SIZE / 2
      }px, 0)`;
      frameRef.current = null;
    };

    const setCenter = () => {
      latestRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      updatePosition();
    };

    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !supportsHover) {
      setCenter();
      return;
    }

    const handleMove = (event: MouseEvent) => {
      latestRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updatePosition);
      }
    };

    const handleResize = () => {
      setCenter();
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('resize', handleResize);
    setCenter();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', handleResize);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={glowRef}
      className="cursor-glow pointer-events-none fixed left-0 top-0 -z-10 h-[760px] w-[760px] rounded-full opacity-40 blur-[240px] transition-opacity duration-500 dark:opacity-30"
      aria-hidden="true"
    />
  );
}
