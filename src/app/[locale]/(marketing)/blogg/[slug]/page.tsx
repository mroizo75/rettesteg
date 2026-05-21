import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { BreadcrumbJsonLd } from '@/components/SeoJsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const supabase = await createAdminClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title_no, title_en, excerpt_no, excerpt_en')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!post) return {};

  const isNo = locale !== 'en';
  return {
    title: `${isNo ? post.title_no : post.title_en} | Rettesteg`,
    description: isNo ? post.excerpt_no : post.excerpt_en,
  };
}

export async function generateStaticParams() {
  // Use cookie-free client — cookies() is not available at build time
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true);

  return (posts ?? []).flatMap(({ slug }: { slug: string }) => [
    { locale: 'no', slug },
    { locale: 'en', slug },
  ]);
}

export default async function BloggPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isNo = locale !== 'en';

  const supabase = await createAdminClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!post) notFound();

  const title = isNo ? post.title_no : post.title_en;
  const content = isNo ? post.content_no : post.content_en;
  const date = new Date(post.created_at).toLocaleDateString(
    isNo ? 'nb-NO' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="pt-28 pb-24 bg-background">
      <BreadcrumbJsonLd
        items={[
          { name: 'Hjem', url: 'https://rettesteg.no' },
          { name: isNo ? 'Blogg' : 'Blog', url: 'https://rettesteg.no/blogg' },
          { name: title, url: `https://rettesteg.no/blogg/${slug}` },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blogg"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {isNo ? 'Tilbake til bloggen' : 'Back to blog'}
        </Link>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-primary bg-primary/8 border-primary/20 text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4 leading-tight">{title}</h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {date}
          </span>
        </div>

        {/* Content */}
        <article
          className="
            text-foreground/90 leading-relaxed space-y-4
            [&_h2]:text-2xl [&_h2]:font-display [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-display [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:text-base [&_p]:text-muted-foreground [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:text-muted-foreground
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:text-muted-foreground
            [&_strong]:text-foreground [&_strong]:font-semibold
            [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
            [&_hr]:border-border [&_hr]:my-8
          "
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* CTA */}
        <div className="mt-16 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/5 border border-primary/20 text-center">
          <p className="font-display font-bold text-lg mb-2">
            {isNo ? 'Klar til å finne din retning?' : 'Ready to find your direction?'}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            {isNo
              ? 'Ta vår gratis RIASEC-test og få konkrete karriereanbefalinger tilpasset deg.'
              : 'Take our free RIASEC assessment and get personalised career recommendations.'}
          </p>
          <Link
            href="/registrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            {isNo ? 'Start gratis' : 'Start for free'}
          </Link>
        </div>
      </div>
    </div>
  );
}
