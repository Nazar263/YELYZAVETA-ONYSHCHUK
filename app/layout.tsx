import './globals.css';
import type { Metadata } from 'next';
import { HairSalonJsonLd } from './components/seo/hair-salon-jsonld';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.brunetkaahair.com/'),
  title: {
    default: 'Keratin & Hair Botox in London E14 | Brunetkaa Hair',
    template: '%s | Brunetkaa Hair',
  },
  description:
    'Keratin straightening, Hair Botox, nanoplasty and personalised cold hair reconstruction in London E14. Explore prices and book with Yelyzaveta on WhatsApp.',
  alternates: {
    canonical: 'https://www.brunetkaahair.com/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Brunetkaa Hair',
    title: 'Keratin & Hair Botox in London E14 | Brunetkaa Hair',
    description:
      'Keratin straightening, Hair Botox, nanoplasty and personalised cold hair reconstruction in London E14. Explore prices and book with Yelyzaveta on WhatsApp.',
    url: 'https://www.brunetkaahair.com/',
    images: [
      {
        url: 'https://www.brunetkaahair.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brunetkaa Hair — portrait of Yelyzaveta, hair specialist in London E14',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keratin & Hair Botox in London E14 | Brunetkaa Hair',
    description:
      'Keratin straightening, Hair Botox, nanoplasty and personalised cold hair reconstruction in London E14. Explore prices and book with Yelyzaveta on WhatsApp.',
    images: ['https://www.brunetkaahair.com/images/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  other: {
    'apple-mobile-web-app-title': 'Brunetkaa Hair',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <head>
        <HairSalonJsonLd />
      </head>
      <body className="bg-bg text-text antialiased selection:bg-gold/40 selection:text-text">
        <div className="min-h-screen">
          <div className="site-bg" aria-hidden="true">
            <span className="site-bg-blob site-bg-blob-a" />
            <span className="site-bg-blob site-bg-blob-b" />
            <span className="site-bg-blob site-bg-blob-c" />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
