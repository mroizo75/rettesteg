import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, ArrowRight, Clock, CheckCircle2, Lock } from 'lucide-react';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const supabase = await createAdminClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/logg-inn');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, tier')
    .eq('id', user.id)
    .single();

  const { data: assessments } = await supabase
    .from('assessments')
    .select('id, type, status, started_at, completed_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const { data: results } = await supabase
    .from('assessment_results')
    .select('id, created_at, assessment_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const isPro = profile?.tier === 'pro';
  const firstName = profile?.full_name?.split(' ')[0] ?? 'der';

  const testTypes = [
    { type: 'riasec', label: 'RIASEC-interessetest', desc: '60 spørsmål · ca. 10 min', free: true },
    { type: 'big_five', label: 'Big Five personlighetstest', desc: '50 spørsmål · ca. 10 min', free: false },
    { type: 'values', label: 'Karriereverdier', desc: '20 spørsmål · ca. 5 min', free: false },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Hei, {firstName}! 👋</h1>
        <p className="text-muted-foreground mt-1">
          {assessments?.length === 0
            ? 'Start din første karrieretest for å få personlige anbefalinger.'
            : `Du har fullført ${assessments?.filter((a) => a.status === 'completed').length ?? 0} test(er).`}
        </p>
      </div>

      {/* Test cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {testTypes.map((test) => {
          const completed = assessments?.find(
            (a) => a.type === test.type && a.status === 'completed'
          );
          const inProgress = assessments?.find(
            (a) => a.type === test.type && a.status === 'in_progress'
          );
          const locked = !test.free && !isPro;

          return (
            <Card key={test.type} className={locked ? 'opacity-70' : ''}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <ClipboardList className="w-5 h-5 text-primary mt-0.5" />
                  {completed ? (
                    <Badge variant="secondary" className="text-chart-5 bg-chart-5/10">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Fullført
                    </Badge>
                  ) : inProgress ? (
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      Påbegynt
                    </Badge>
                  ) : locked ? (
                    <Badge variant="secondary" className="text-muted-foreground">
                      <Lock className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  ) : null}
                </div>
                <h3 className="font-semibold text-sm mb-1">{test.label}</h3>
                <p className="text-xs text-muted-foreground mb-4">{test.desc}</p>
                {locked ? (
                  <Link href="/priser">
                    <Button variant="outline" size="sm" className="w-full bg-transparent text-xs">
                      Oppgrader til Pro
                    </Button>
                  </Link>
                ) : completed ? (
                  <Link href={`/resultater/${results?.find((r) => {
                    const a = assessments?.find((a) => a.type === test.type && a.status === 'completed');
                    return a && r.assessment_id === a.id;
                  })?.id ?? ''}`}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent text-xs">
                      Se resultater
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/test?type=${test.type}`}>
                    <Button size="sm" className="w-full text-xs">
                      {inProgress ? 'Fortsett' : 'Start test'}
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent results */}
      {results && results.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Siste resultater</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.map((result) => {
                const a = assessments?.find((a) => a.id === result.assessment_id);
                const typeMap: Record<string, string> = { riasec: 'RIASEC', big_five: 'Big Five', values: 'Verdier' };
                const typeLabel = typeMap[a?.type ?? ''] ?? 'Test';
                return (
                  <div key={result.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium">{typeLabel}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(result.created_at).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <Link href={`/resultater/${result.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                        Se resultater <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {!isPro && (
        <Card className="mt-6 border-primary/30 bg-primary/5">
          <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Oppgrader til Pro</p>
              <p className="text-sm text-muted-foreground mt-0.5">Lås opp alle tester, full analyse, grafer og PDF-rapport.</p>
            </div>
            <Link href="/priser">
              <Button className="gap-1.5 whitespace-nowrap">
                Se Pro-priser <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
