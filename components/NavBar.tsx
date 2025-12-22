"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

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
  return (
    <nav className="fixed top-0 inset-x-0 z-30 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          Портфолио
        </Link>
        <div className="flex items-center space-x-4">
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Theme toggle */}
          <button
            aria-label="Сменить тему"
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
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
                className="block py-2 border-b border-gray-200 dark:border-gray-800"
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