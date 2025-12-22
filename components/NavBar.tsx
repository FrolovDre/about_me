"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import ScrollProgress from './ScrollProgress';
import profile from '../data/profile';

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
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
      className={`sticky top-0 inset-x-0 z-30 border-b border-slate-200/70 dark:border-white/5 backdrop-blur bg-white/80 dark:bg-slate-950/70 transition-all ${
        scrolled ? 'py-2 shadow-[0_12px_24px_rgba(15,23,42,0.05)]' : 'py-4'
      }`}
    >
      <ScrollProgress />
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-slate-900 dark:text-white">
          {profile.ui.siteTitle}
        </Link>
        <div className="flex items-center space-x-4">
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6">
            {profile.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="link-underline text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Theme toggle */}
          <button
            aria-label="Сменить тему"
            onClick={toggleTheme}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 shadow-sm transition-colors hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5 text-amber-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-slate-700" />
            )}
          </button>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Меню"
            onClick={() => setOpen(!open)}
          >
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden space-y-2 px-4 pb-4">
          {profile.navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-2 border-b border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-200"
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
