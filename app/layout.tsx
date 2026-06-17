import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/context';
import { Analytics } from '@vercel/analytics/next';
import LanguageToggle from '@/components/nav/LanguageToggle';
import FloatingNav from '@/components/nav/FloatingNav';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nikodemlesiecki.pl'),
  title: 'Nikodem Lesiecki — AI Builder & Creative Technologist',
  description: 'Portfolio of Nikodem (Nico) Lesiecki, a 22-year-old Polish creative technologist, frontend developer, and AI agent builder (vibe coding).',
  openGraph: {
    type: 'website',
    url: 'https://nikodemlesiecki.pl',
    title: 'Nikodem Lesiecki — AI Builder & Creative Technologist',
    description: 'Portfolio of Nikodem (Nico) Lesiecki, a 22-year-old Polish creative technologist, frontend developer, and AI agent builder (vibe coding).',
    siteName: 'Nikodem Lesiecki',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nikodem Lesiecki Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikodem Lesiecki — AI Builder & Creative Technologist',
    description: 'Portfolio of Nikodem (Nico) Lesiecki, a 22-year-old Polish creative technologist.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <meta name="theme-color" content="#090909" />
      </head>
      <body className="bg-navy-base text-text-primary antialiased">
        <LanguageProvider>
          <LanguageToggle />
          <main className="relative flex min-h-screen flex-col overflow-hidden">
            {children}
          </main>
          <FloatingNav />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
