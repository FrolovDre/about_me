import './globals.css';
import { ReactNode } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata = {
  title: 'Портфолио Андрея Фролова',
  description:
    'Персональный сайт‑портфолио Андрея Фролова: проекты, опыт работы, образование и достижения.',
  openGraph: {
    title: 'Портфолио Андрея Фролова',
    description:
      'Персональный сайт‑портфолио Андрея Фролова: проекты, опыт работы, образование и достижения.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ThemeProvider>
          <NavBar />
          <main className="max-w-5xl mx-auto px-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}