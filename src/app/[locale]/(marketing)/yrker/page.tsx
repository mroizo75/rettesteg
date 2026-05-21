import type { Metadata } from 'next';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { riasecDescriptions } from '@/lib/assessments/scoring';
import type { RiasecScores } from '@/lib/supabase/types';
import { BreadcrumbJsonLd } from '@/components/SeoJsonLd';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Yrker | Rettesteg',
  description: 'Utforsk hundrevis av norske yrker med RIASEC-koder, utdanningskrav og lønnsnivå. Finn yrket som passer din personlighet.',
};

export default async function YrkerPage() {
  const supabase = await createAdminClient();
  const { data: careers } = await supabase
    .from('careers')
    .select('*')
    .order('title_no');

  const grouped = (careers ?? []).reduce<Record<string, typeof careers>>(
    (acc, career) => {
      const key = career!.riasec_primary;
      if (!acc[key]) acc[key] = [];
      acc[key]!.push(career);
      return acc;
    },
    {}
  );

  return (
    <div className="pt-28 pb-20">
      <BreadcrumbJsonLd items={[
        { name: 'Hjem', url: 'https://rettesteg.no' },
        { name: 'Yrker', url: 'https://rettesteg.no/yrker' },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Utforsk yrker</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-4">
            Alle yrker er koblet til RIASEC-interessetyper. Finn yrker innen din sterkeste kategori.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-border text-sm text-muted-foreground">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Yrkesdataene er kvalitetssikret av{' '}
            <a
              href="https://utdanning.no"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              utdanning.no
            </a>
            {' '}— driftet av HKDir (statlig)
          </div>
        </div>

        {(Object.keys(riasecDescriptions) as (keyof RiasecScores)[]).map((key) => {
          const desc = riasecDescriptions[key];
          const careers = grouped[key] ?? [];
          if (careers.length === 0) return null;
          return (
            <section key={key} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">{key}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">{desc.label}</h2>
                  <p className="text-sm text-muted-foreground">Holland-type {key}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {careers.map((career) => (
                  <div key={career!.id} className="relative group">
                    <Link href={`/yrker/${career!.slug}`}>
                      <Card className="hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer h-full">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-sm">{career!.title_no}</h3>
                            <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{career!.description_no}</p>
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="secondary" className="text-xs">{career!.sector}</Badge>
                            <Badge variant="outline" className="text-xs">{career!.education_level}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    {typeof (career as { utdanning_no_url?: string }).utdanning_no_url === 'string' && (
                      <a
                        href={(career as { utdanning_no_url: string }).utdanning_no_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 px-2 py-1 rounded-md bg-background border border-border text-xs text-muted-foreground hover:text-primary hover:border-primary/40 shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        utdanning.no ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
