import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Lora } from 'next/font/google';
import './globals.css';
import { SkipLink } from '@/components/accessibility/SkipLink';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Jornalista Inclusivo',
    default: 'Jornalista Inclusivo - Jornalismo sobre Equidade, Inclusão e Direitos',
  },
  description: 'Portal de jornalismo focado em inclusão, acessibilidade, direitos das pessoas com deficiência, paradesporto e diversidade no Brasil.',
  keywords: ['inclusão', 'acessibilidade', 'direitos pcd', 'paradesporto', 'jornalismo', 'brasil'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} ${lora.variable}`}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
