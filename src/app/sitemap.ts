import type { MetadataRoute } from 'next';
import { createAdminClient } from '@/lib/supabase/server';

const BASE_URL = 'https://rettesteg.no';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/en`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/om-oss`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/for-skoler`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/priser`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/yrker`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/utdanning`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/blogg`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/personvern`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${BASE_URL}/vilkar`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${BASE_URL}/registrer`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/logg-inn`, priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  try {
    const supabase = await createAdminClient();

    const [{ data: careers }, { data: eduPrograms }, { data: blogPosts }] = await Promise.all([
      supabase.from('careers').select('slug, created_at'),
      supabase.from('education_programs').select('slug, created_at'),
      supabase.from('blog_posts').select('slug, updated_at').eq('published', true),
    ]);

    const careerPages = (careers ?? []).map((c) => ({
      url: `${BASE_URL}/yrker/${c.slug}`,
      lastModified: new Date(c.created_at),
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }));

    const eduPages = (eduPrograms ?? []).map((e) => ({
      url: `${BASE_URL}/utdanning/${e.slug}`,
      lastModified: new Date(e.created_at),
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }));

    const blogPages = (blogPosts ?? []).map((b) => ({
      url: `${BASE_URL}/blogg/${b.slug}`,
      lastModified: new Date(b.updated_at),
      priority: 0.7,
      changeFrequency: 'weekly' as const,
    }));

    return [...staticPages, ...careerPages, ...eduPages, ...blogPages];
  } catch {
    return staticPages;
  }
}
