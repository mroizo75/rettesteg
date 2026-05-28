import type { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RiasecChart } from '@/components/results/RiasecChart';
import { PdfDownloadButton } from '@/components/results/PdfDownloadButton';
import { matchCareers } from '@/lib/assessments/scoring';
import type { RiasecScores, Career, EducationProgram } from '@/lib/supabase/types';
import Link from 'next/link';
import {
  Lock, ArrowRight, GraduationCap, Briefcase,
  TrendingUp, CheckCircle, ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = { title: 'Dine resultater' };

// ---------- Utdanningsvei-tegning (mini-tidslinje) ----------
function EduPath({ program, career }: { program: EducationProgram; career: Career }) {
  const level = (program.level ?? '').toLowerCase();

  const needsVgs =
    level === 'bachelor' || level === 'master' || level === 'høgskole';

  const steps: Array<{ label: string; note: string; isGoal?: boolean }> = [];

  if (needsVgs) {
    steps.push({
      label: 'Videregående skole',
      note:
        level === 'bachelor' && career.riasec_primary === 'R'
          ? 'Studiespesialisering m/ realfag anbefalt'
          : 'Studiespesialisering',
    });
  }

  steps.push({
    label: program.title_no,
    note: `${program.duration_years} år · ${program.institution_type}`,
    isGoal: true,
  });

  return (
    <div className="mt-4 pt-4 border-t border-border/60">
      <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
        <GraduationCap className="w-3.5 h-3.5" />
        Utdanningsvei
      </p>
      <div className="relative pl-5">
        {/* Vertical line */}
        <div className="absolute left-2 top-2 bottom-2 w-px bg-border" aria-hidden />
        <div className="space-y-2.5">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2.5 relative">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 -ml-5 z-10 ${
                  step.isGoal
                    ? 'bg-primary border-primary'
                    : 'bg-background border-border'
                }`}
              >
                {step.isGoal && <CheckCircle className="w-2.5 h-2.5 text-white" />}
              </div>
              <div>
                <p className={`text-xs font-semibold ${step.isGoal ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Locked preview card ----------
function LockedCareerCard({ rank }: { rank: number }) {
  return (
    <div className="relative rounded-xl border border-border overflow-hidden select-none">
      <div className="p-4 blur-sm pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-muted text-muted-foreground text-sm font-bold flex items-center justify-center">
            {rank}
          </div>
          <div className="flex-1">
            <div className="h-4 bg-muted rounded w-40 mb-1.5" />
            <div className="h-3 bg-muted/70 rounded w-60" />
          </div>
          <div className="text-right">
            <div className="h-5 bg-muted rounded w-12 mb-1" />
            <div className="h-3 bg-muted/70 rounded w-16" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border/40">
          <div className="h-3 bg-muted/60 rounded w-full mb-1.5" />
          <div className="h-3 bg-muted/60 rounded w-3/4" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
        <Lock className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}

// ---------- Page ----------
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

  // Yrker — gratis viser 2, Pro viser 10
  let allCareers: Array<{ career: Career; score: number }> = [];
  if (riasecScores && result.top_career_ids?.length > 0) {
    const { data: careers } = await supabase
      .from('careers')
      .select('*')
      .in('id', result.top_career_ids);
    if (careers) {
      allCareers = matchCareers(riasecScores, careers).slice(0, isPro ? 10 : 2);
    }
  }

  // Utdanningsprogrammer — gratis viser 2 (én per karriere), Pro viser alle
  const eduLimit = isPro ? 20 : 2;
  const { data: educationPrograms } = result.top_education_ids?.length > 0
    ? await supabase
        .from('education_programs')
        .select('*')
        .in('id', result.top_education_ids)
        .limit(eduLimit)
    : { data: [] as EducationProgram[] };

  const dateFormatted = new Date(result.created_at).toLocaleDateString('nb-NO', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="space-y-8">
      {/* Synlig kun ved utskrift/PDF */}
      <div className="pdf-header hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="font-bold text-lg">rettesteg.no</span>
        </div>
        <div className="text-right text-sm text-gray-500">
          <p>Karriererapport</p>
          <p>{dateFormatted}</p>
        </div>
      </div>

      {/* Topprad */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold">Dine karriereresultater</h1>
            {isPro && <Badge className="bg-primary">Pro</Badge>}
          </div>
          <p className="text-muted-foreground text-sm">{dateFormatted}</p>
        </div>
        <PdfDownloadButton resultId={id} />
      </div>

      {riasecScores && (
        <>
          {/* RIASEC-profil */}
          <section>
            <h2 className="text-base font-semibold flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              Din RIASEC-interesseprofil
            </h2>
            <RiasecChart scores={riasecScores} />
          </section>

          <Separator />

          {/* Yrker + utdanningsveier */}
          <section>
            <div className="flex items-center justify-between gap-2 mb-5">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Yrker som passer deg
              </h2>
              {!isPro && (
                <span className="text-xs text-muted-foreground">
                  Viser 2 av 10 anbefalte
                </span>
              )}
            </div>

            <div className="space-y-4">
              {allCareers.map(({ career, score }, idx) => {
                const matchedEdu = educationPrograms?.[idx] ?? null;

                return (
                  <div
                    key={career.id}
                    className={`rounded-2xl border p-5 ${
                      idx === 0
                        ? 'border-primary/30 bg-primary/3 ring-1 ring-primary/10'
                        : 'border-border bg-card'
                    }`}
                  >
                    {/* Karrierehode */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-base">{career.title_no}</h3>
                          {idx === 0 && (
                            <Badge className="text-xs bg-primary/15 text-primary border-primary/25">
                              Beste match
                            </Badge>
                          )}
                          <Badge variant="secondary" className="text-xs">{score}% match</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {career.description_no}
                        </p>

                        {/* Lønn + utdanning + vekst — vises for alle */}
                        <div className="flex flex-wrap gap-4 mt-3">
                          {career.salary_range && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm">💰</span>
                              <div>
                                <p className="text-xs text-muted-foreground">Lønn (SSB 2025)</p>
                                <p className="text-sm font-semibold">{career.salary_range}</p>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">🎓</span>
                            <div>
                              <p className="text-xs text-muted-foreground">Utdanningsnivå</p>
                              <p className="text-sm font-semibold capitalize">{career.education_level}</p>
                            </div>
                          </div>
                          {career.growth_outlook && (
                            <div className="flex items-center gap-1.5">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <div>
                                <p className="text-xs text-muted-foreground">Vekst</p>
                                <p className="text-sm font-semibold text-green-700">{career.growth_outlook}</p>
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">🏢</span>
                            <div>
                              <p className="text-xs text-muted-foreground">Sektor</p>
                              <p className="text-sm font-semibold">{career.sector}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Utdanningsvei fra utdanning.no */}
                    {matchedEdu ? (
                      <EduPath program={matchedEdu} career={career} />
                    ) : (
                      <div className="mt-4 pt-4 border-t border-border/60">
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5" />
                          Utdanningsvei: krever {career.education_years ?? '3'}+ år etter VGS
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Låst seksjon for gratis-brukere */}
              {!isPro && (
                <div className="space-y-3">
                  {[3, 4, 5].map((rank) => (
                    <LockedCareerCard key={rank} rank={rank} />
                  ))}

                  <div className="no-print rounded-2xl bg-gradient-to-br from-primary/8 to-violet-500/5 border border-primary/25 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Lock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base mb-1">
                          Lås opp din fulle karriererapport
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          Oppgrader til Pro og få tilgang til alle{' '}
                          <strong className="text-foreground">10 yrkesanbefalinger</strong> matchet
                          mot 600+ yrker i databasen, komplette{' '}
                          <strong className="text-foreground">utdanningsveier fra utdanning.no</strong>{' '}
                          for hvert yrke, lønnsstatistikk fra{' '}
                          <strong className="text-foreground">SSB</strong>, og en nedlastbar
                          PDF-rapport.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4 text-xs">
                          {[
                            '✅ 10 yrker matchet mot din profil',
                            '✅ Fullstendige utdanningsveier',
                            '✅ Lønn fra SSB 2025',
                            '✅ Vekstutsikter per yrke',
                            '✅ Nedlastbar PDF-rapport',
                          ].map((item) => (
                            <span
                              key={item}
                              className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <Link href="/priser">
                          <Button size="sm" className="gap-2 font-semibold shadow-sm">
                            Oppgrader til Pro
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pro: vis alle utdanningsprogrammer samlet */}
              {isPro && educationPrograms && educationPrograms.length > 0 && (
                <div className="space-y-3 mt-2">
                  <h2 className="text-base font-semibold flex items-center gap-2 pt-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Anbefalte utdanningsprogrammer
                  </h2>
                  {educationPrograms.map((edu) => (
                    <div key={edu.id} className="border border-border rounded-xl p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{edu.title_no}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {edu.level} · {edu.duration_years} år · {edu.institution_type}
                          </p>
                        </div>
                        <Badge variant="secondary" className="capitalize">{edu.level}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {edu.description_no}
                      </p>
                      {edu.subject_list.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {edu.subject_list.slice(0, 6).map((subject: string) => (
                            <span key={subject} className="text-xs bg-muted px-2 py-1 rounded-md">
                              {subject}
                            </span>
                          ))}
                          {edu.subject_list.length > 6 && (
                            <span className="text-xs text-muted-foreground px-2 py-1">
                              +{edu.subject_list.length - 6} fler
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <div className="no-print flex gap-3 pt-2">
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
