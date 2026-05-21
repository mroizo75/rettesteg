import type { Metadata } from 'next';
import { createAdminClient } from '@/lib/supabase/server';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbJsonLd } from '@/components/SeoJsonLd';
import { GraduationCap, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Utdanning | Rettesteg',
  description: 'Oversikt over norske utdanningsprogram — fra videregående til høyere utdanning. Finn utdanningen som matcher din RIASEC-profil.',
};

export default async function UtdanningPage() {
  const supabase = await createAdminClient();
  const { data: programs } = await supabase
    .from('education_programs')
    .select('*')
    .order('level, title_no');

  const grouped = (programs ?? []).reduce<Record<string, typeof programs>>(
    (acc, p) => {
      if (!acc[p!.level]) acc[p!.level] = [];
      acc[p!.level]!.push(p);
      return acc;
    },
    {}
  );

  return (
    <div className="pt-28 pb-20">
      <BreadcrumbJsonLd items={[
        { name: 'Hjem', url: 'https://rettesteg.no' },
        { name: 'Utdanning', url: 'https://rettesteg.no/utdanning' },
      ]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Utdanningsprogram</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Utforsk norske utdanningsprogram og finn veien som passer din karriereprofil.
          </p>
        </div>

        {Object.entries(grouped).map(([level, progs]) => (
          <section key={level} className="mb-12">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              {level}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(progs ?? []).map((prog) => (
                <Card key={prog!.id} className="hover:border-primary/40 hover:shadow-sm transition-all">
                  <CardContent className="p-5">
                    <h3 className="font-semibold mb-1">{prog!.title_no}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <Clock className="w-3 h-3" />
                      {prog!.duration_years} år · {prog!.institution_type}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{prog!.description_no}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {prog!.riasec_match.slice(0, 3).map((code: string) => (
                        <Badge key={code} variant="secondary" className="text-xs">{code}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
