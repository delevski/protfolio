import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Or Delevski - CTO / VP R&D & Technology Leader',
  description: 'Innovative technology leader with 15+ years of experience in R&D, product innovation, and scaling high-performance engineering teams.',
  keywords: 'CTO, VP R&D, Technology Leader, Software Development, AI, Mobile Development, Fintech',
  authors: [{ name: 'Or Delevski' }],
  openGraph: {
    title: 'Or Delevski - CTO / VP R&D & Technology Leader',
    description: 'Innovative technology leader with 15+ years of experience in R&D, product innovation, and scaling high-performance engineering teams.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <footer className="bg-gray-900 dark:bg-black text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              © 2024 Or Delevski. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}