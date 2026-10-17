import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date('2026-10-17');
  const base = 'https://www.brunetkaahair.com';
  return [
    {
      url: base,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/privacy`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
