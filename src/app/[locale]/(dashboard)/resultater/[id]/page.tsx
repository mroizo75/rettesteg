import type { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RiasecChart } from '@/components/results/RiasecChart';
import { CareerMatchBar } from '@/components/results/CareerMatchBar';
import { riasecDescriptions, matchCareers } from '@/lib/assessments/scoring';
import type { RiasecScores, Career } from '@/lib/supabase/types';
import Link from 'next/link';
import { Lock, ArrowRight, GraduationCap, Briefcase, TrendingUp } from 'lucide-react';

export const metadata: Metadata = { title: 'Dine resultater' };

export default async function ResultaterPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createAdminClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/logg-inn');

  const { data: result } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!result) notFound();

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier, full_name')
    .eq('id', user.id)
    .single();

  const isPro = profile?.tier === 'pro';

  const riasecScores = result.riasec_scores as RiasecScores | null;

  let topCareers: Array<{ career: Career; score: number }> = [];
  if (riasecScores && result.top_career_ids?.length > 0) {
    const { data: careers } = await supabase
      .from('careers')
      .select('*')
      .in('id', result.top_career_ids);

    if (careers) {
      topCareers = matchCareers(riasecScores, careers).slice(0, isPro ? 10 : 3);
    }
  }

  const { data: topEducation } = result.top_education_ids?.length > 0
    ? await supabase.from('education_programs').select('*').in('id', result.top_education_ids)
    : { data: [] };

  const sortedRiasec = riasecScores
    ? (Object.entries(riasecScores) as [keyof RiasecScores, number][]).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold">Dine karriereresultater</h1>
          {isPro && <Badge className="bg-primary">Pro</Badge>}
        </div>
        <p className="text-muted-foreground">
          {new Date(result.created_at).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {riasecScores && (
        <>
          {/* RIASEC chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Din RIASEC-interesseprofil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RiasecChart scores={riasecScores} />
              <Separator className="my-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sortedRiasec.slice(0, 4).map(([key, score]) => {
                  const desc = riasecDescriptions[key];
                  return (
                    <div key={key} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{desc.label} ({key})</span>
                          {score >= 70 && <Badge variant="secondary" className="text-xs">Sterk</Badge>}
                        </div>
                        <span className="text-sm font-bold text-primary">{score}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-2 rounded-full bg-primary transition-all"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc.no}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Career matches */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Yrker som passer deg
                {!isPro && <Badge variant="secondary" className="text-xs ml-auto">Topp 3 (gratis)</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {topCareers.length > 0 ? (
                <>
                  <CareerMatchBar
                    matches={topCareers.map((m) => ({
                      title: m.career.title_no,
                      score: m.score,
                    }))}
                  />
                  <Separator className="my-6" />
                  <div className="space-y-4">
                    {topCareers.map(({ career, score }, idx) => (
                      <div key={career.id} className="flex gap-4">
                        <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">{career.title_no}</h3>
                            <Badge variant="secondary" className="text-xs">{score}% match</Badge>
                            <Badge variant="outline" className="text-xs">{career.sector}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{career.description_no}</p>
                          {isPro && (
                            <div className="flex flex-wrap gap-3 mt-2">
                              <span className="text-xs text-muted-foreground">🎓 {career.education_level}</span>
                              {career.salary_range && (
                                <span className="text-xs text-muted-foreground">💰 {career.salary_range}</span>
                              )}
                              {career.growth_outlook && (
                                <span className="text-xs text-muted-foreground">📈 {career.growth_outlook}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-sm">Ingen yrkesanbefalinger funnet.</p>
              )}

              {!isPro && (
                <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-4">
                  <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Lås opp topp 10 anbefalinger</p>
                    <p className="text-sm text-muted-foreground mt-1">Oppgrader til Pro for full rapport med alle yrker, utdanningsveier, detaljerte analyser og PDF-rapport.</p>
                    <Link href="/priser" className="mt-3 inline-block">
                      <Button size="sm" className="gap-1.5">
                        Oppgrader til Pro
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Education paths (Pro only) */}
          {isPro && topEducation && topEducation.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Anbefalte utdanningsveier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topEducation.map((edu) => (
                    <div key={edu.id} className="border border-border rounded-xl p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{edu.title_no}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {edu.level} · {edu.duration_years} år · {edu.institution_type}
                          </p>
                        </div>
                        <Badge variant="secondary">{edu.level}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{edu.description_no}</p>
                      {edu.subject_list.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {edu.subject_list.slice(0, 6).map((subject: string) => (
                            <span key={subject} className="text-xs bg-muted px-2 py-1 rounded-md">
                              {subject}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <div className="flex gap-3">
        <Link href="/test">
          <Button variant="outline" className="bg-transparent">Ta ny test</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost">Tilbake til dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
