import './globals.css';
import { ReactNode } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { ThemeProvider } from '../components/ThemeProvider';
import CursorGlow from '../components/CursorGlow';
import profile from '../data/profile';

export const metadata = {
  title: profile.ui.metaTitle,
  description: profile.ui.metaDescription,
  openGraph: {
    title: profile.ui.metaTitle,
    description: profile.ui.metaDescription,
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="relative overflow-x-hidden">
        <CursorGlow />
        <ThemeProvider>
          <NavBar />
          <main className="relative z-10 mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
