"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import ScrollProgress from './ScrollProgress';

const navItems = [
  { href: '#about', label: 'Обо мне' },
  { href: '#skills', label: 'Навыки' },
  { href: '#projects', label: 'Проекты' },
  { href: '#experience', label: 'Опыт' },
  { href: '#contact', label: 'Контакты' },
];

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
      className={`sticky top-0 inset-x-0 z-30 border-b border-white/10 dark:border-white/5 backdrop-blur bg-white/70 dark:bg-gray-900/70 transition-all ${
        scrolled ? 'py-2 shadow-sm' : 'py-4'
      }`}
    >
      <ScrollProgress />
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          Портфолио
        </Link>
        <div className="flex items-center space-x-4">
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="link-underline text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
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
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 shadow-sm transition-colors hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5 text-amber-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-slate-700" />
            )}
          </button>
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
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
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-2 border-b border-gray-200/60 dark:border-gray-800 text-gray-700 dark:text-gray-200"
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
