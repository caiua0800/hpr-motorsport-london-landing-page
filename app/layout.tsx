import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Barlow_Condensed } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/src/context/language-context';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  title: 'HPR Motorsport — Premium Automotive Service London',
  description:
    'Expert vehicle repairs, MOT testing, tyre service, diagnostics & vehicles for sale. Brazilian master mechanics based in London. Book your appointment today.',
  keywords: 'MOT testing London, car repair London, tyre service, oil change, vehicle diagnostics, Brazilian mechanics London, cars for sale London',
  openGraph: {
    title: 'HPR Motorsport — Premium Automotive Service London',
    description: 'Expert repairs, MOT testing & quality vehicles for sale. Brazilian mechanics in London.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${barlowCondensed.variable} h-full`}
      style={{ overflowX: 'hidden' }}
    >
      <body
        className="min-h-full"
        style={{
          fontFamily: 'var(--font-geist), system-ui, sans-serif',
          overflowX: 'hidden',
          maxWidth: '100vw',
        }}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
