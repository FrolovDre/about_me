"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

interface MapOverlayContextValue {
  isOpen: boolean;
  openMap: () => void;
  closeMap: () => void;
  skipMap: () => void;
}

const MapOverlayContext = createContext<MapOverlayContextValue | undefined>(undefined);

const STORAGE_KEY = 'vaporwave-map-skip';

export function MapOverlayProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored === '1') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({
      isOpen,
      openMap: () => setIsOpen(true),
      closeMap: () => setIsOpen(false),
      skipMap: () => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, '1');
        }
        setIsOpen(false);
      },
    }),
    [isOpen],
  );

  return <MapOverlayContext.Provider value={value}>{children}</MapOverlayContext.Provider>;
}

export const useMapOverlay = () => {
  const context = useContext(MapOverlayContext);
  if (!context) {
    throw new Error('useMapOverlay must be used within MapOverlayProvider');
  }
  return context;
};
