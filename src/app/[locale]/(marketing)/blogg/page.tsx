import type { Metadata } from 'next';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/SeoJsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'no' ? 'Blogg | Rettesteg' : 'Blog | Rettesteg',
    description:
      locale === 'no'
        ? 'Artikler om karriereveiledning, utdanningsvalg, yrkesliv og personlighetspsykologi for norsk ungdom.'
        : 'Articles on career guidance, education choices, working life and personality psychology for Norwegian youth.',
  };
}

export default async function BloggPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isNo = locale !== 'en';

  const supabase = await createAdminClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title_no, title_en, excerpt_no, excerpt_en, tags, author, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  const heading = isNo ? 'Blogg' : 'Blog';
  const subheading = isNo
    ? 'Artikler om karriere, utdanning og personlighetspsykologi'
    : 'Articles on careers, education and personality psychology';
  const emptyText = isNo
    ? 'Nye artikler kommer snart. Registrer deg for å bli varslet!'
    : 'New articles coming soon. Sign up to be notified!';
  const readMore = isNo ? 'Les mer' : 'Read more';

  return (
    <div className="pt-28 pb-24 bg-background min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: 'Hjem', url: 'https://rettesteg.no' },
          { name: heading, url: 'https://rettesteg.no/blogg' },
        ]}
      />

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 border-primary/20">
          {heading}
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">{subheading}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {isNo
            ? 'Tips, innsikt og forskning for deg som vil gjøre smarte valg om fremtiden.'
            : 'Tips, insights and research for those who want to make smart choices about the future.'}
        </p>
      </div>

      {/* Posts grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {!posts || posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">{emptyText}</p>
            <Link
              href="/registrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              {isNo ? 'Registrer deg gratis' : 'Sign up for free'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => {
              const title = isNo ? post.title_no : post.title_en;
              const excerpt = isNo ? post.excerpt_no : post.excerpt_en;
              const date = new Date(post.created_at).toLocaleDateString(
                isNo ? 'nb-NO' : 'en-GB',
                { year: 'numeric', month: 'long', day: 'numeric' }
              );

              return (
                <Link
                  key={post.slug}
                  href={`/blogg/${post.slug}`}
                  className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-200"
                >
                  {/* Gradient banner */}
                  <div className="h-2 bg-gradient-to-r from-primary via-violet-400 to-lime-400" />
                  <div className="p-6 flex flex-col flex-1">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs font-medium text-primary bg-primary/8 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">R</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                        {readMore} <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground/60 mt-1">{date}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
