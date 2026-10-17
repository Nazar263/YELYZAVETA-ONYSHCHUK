import React from 'react';

export function HairSalonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': 'https://www.brunetkaahair.com/#organization',
    name: 'Brunetkaa Hair',
    url: 'https://www.brunetkaahair.com/',
    telephone: '+44 7988 884136',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 12 Skylines Village',
      addressLocality: 'London',
      addressRegion: 'London',
      postalCode: 'E14 9TS',
      addressCountry: 'GB',
    },
    sameAs: [
      'https://www.instagram.com/brunetkaa_hair/',
    ],
    image: {
      '@type': 'ImageObject',
      url: 'https://www.brunetkaahair.com/images/about-yelyzaveta.jpg',
      width: 853,
      height: 1280,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
