import './globals.css';
import { ReactNode } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata = {
  title: 'Портфолио <<МОЁ_ИМЯ>>',
  description: 'Персональный сайт‑портфолио для демонстрации проектов и опыта.',
  openGraph: {
    title: 'Портфолио <<МОЁ_ИМЯ>>',
    description: 'Персональный сайт‑портфолио для демонстрации проектов и опыта.',
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