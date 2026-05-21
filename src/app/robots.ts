import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/test', '/resultater', '/profil', '/admin', '/api/'],
      },
    ],
    sitemap: 'https://rettesteg.no/sitemap.xml',
    host: 'https://rettesteg.no',
  };
}
