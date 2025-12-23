import './globals.css';
import { ReactNode } from 'react';
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
      <body className="relative min-h-screen overflow-hidden">
        <CursorGlow />
        <ThemeProvider>
          <main className="relative z-10 min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
