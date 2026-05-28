import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { createAdminClient } from '@/lib/supabase/server';
import { CareerReportPdf } from '@/lib/pdf/CareerReportPdf';
import { matchCareers } from '@/lib/assessments/scoring';
import type { RiasecScores, Career } from '@/lib/supabase/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createAdminClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 });
  }

  const { data: result, error } = await supabase
    .from('assessment_results')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !result) {
    return NextResponse.json({ error: 'Resultat ikke funnet' }, { status: 404 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier, full_name')
    .eq('id', user.id)
    .single();

  const isPro = profile?.tier === 'pro';
  const riasecScores = result.riasec_scores as RiasecScores | null;

  if (!riasecScores) {
    return NextResponse.json({ error: 'Ingen RIASEC-data' }, { status: 400 });
  }

  // Hent yrker
  let topCareers: Array<{ career: Career; score: number }> = [];
  if (result.top_career_ids?.length > 0) {
    const { data: careers } = await supabase
      .from('careers')
      .select('*')
      .in('id', result.top_career_ids);
    if (careers) {
      topCareers = matchCareers(riasecScores, careers).slice(0, isPro ? 10 : 3);
    }
  }

  // Hent utdanning (kun Pro)
  const topEducation: Array<{
    id: string; title_no: string; level: string;
    duration_years: number; institution_type: string;
    description_no: string; subject_list: string[];
  }> = [];

  if (isPro && result.top_education_ids?.length > 0) {
    const { data: eduData } = await supabase
      .from('education_programs')
      .select('id,title_no,level,duration_years,institution_type,description_no,subject_list')
      .in('id', result.top_education_ids);
    if (eduData) topEducation.push(...eduData);
  }

  const dateFormatted = new Date(result.created_at).toLocaleDateString('nb-NO', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const pdfBuffer = await renderToBuffer(
    <CareerReportPdf
      userName={profile?.full_name ?? 'Bruker'}
      date={dateFormatted}
      riasecScores={riasecScores}
      topCareers={topCareers}
      topEducation={topEducation}
      isPro={isPro}
    />
  );

  const safeName = (profile?.full_name ?? 'rapport')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="rettesteg-karriererapport-${safeName}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}
