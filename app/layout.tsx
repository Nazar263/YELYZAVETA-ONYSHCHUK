import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brunetkaa Hair | Hair Treatments in London',
  description:
    'Explore hair-treatment prices by length category and message Yelyzaveta at Brunetkaa Hair in London E14.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
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
