"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useMapOverlay } from './MapOverlayProvider';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import ScrollProgress from './ScrollProgress';
import profile from '../data/profile';

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const { openMap } = useMapOverlay();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav
      className={`sticky top-0 inset-x-0 z-30 border-b border-white/5 backdrop-blur bg-vapor-night/80 transition-all ${
        scrolled ? 'py-2 shadow-[0_12px_24px_rgba(5,1,16,0.4)]' : 'py-4'
      }`}
    >
      <ScrollProgress />
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-white">
          {profile.ui.siteTitle}
        </Link>
        <div className="flex items-center space-x-4">
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6">
            {profile.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="link-underline text-xs font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-neon-cyan"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openMap}
            className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:border-neon-cyan/70 hover:text-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan md:inline-flex"
          >
            {profile.ui.map.openLabel}
          </button>
          {/* Theme toggle */}
          <button
            aria-label={profile.ui.accessibility.themeToggleLabel}
            onClick={toggleTheme}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-sm transition-colors hover:border-neon-pink/60 hover:text-neon-pink"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5 text-neon-lime" />
            ) : (
              <MoonIcon className="h-5 w-5 text-white/80" />
            )}
          </button>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md border border-white/10 text-white/80 hover:border-neon-cyan/60 hover:text-neon-cyan"
            aria-label={profile.ui.accessibility.menuLabel}
            onClick={() => setOpen(!open)}
          >
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden space-y-2 px-4 pb-4">
          <li>
            <button
              type="button"
              onClick={() => {
                openMap();
                setOpen(false);
              }}
              className="block w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-xs uppercase tracking-[0.25em] text-white/70"
            >
              {profile.ui.map.openLabel}
            </button>
          </li>
          {profile.navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-2 border-b border-white/10 text-white/80"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
