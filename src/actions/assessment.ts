'use server';

import { redirect } from 'next/navigation';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { scoreRiasec, scoreBigFive, scoreValues, matchCareers } from '@/lib/assessments/scoring';
import type { AssessmentType } from '@/lib/supabase/types';

export async function startAssessment(type: AssessmentType): Promise<string> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/logg-inn');

  const { data, error } = await supabase
    .from('assessments')
    .insert({ user_id: user.id, type, status: 'in_progress' })
    .select('id')
    .single();

  if (error || !data) throw new Error('Kunne ikke starte test');
  return data.id;
}

export async function saveResponse(
  assessmentId: string,
  questionId: string,
  answerValue: number
): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('assessment_responses').upsert({
    assessment_id: assessmentId,
    question_id: questionId,
    answer_value: answerValue,
  }, { onConflict: 'assessment_id,question_id' });
}

export async function completeAssessment(assessmentId: string): Promise<string> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/logg-inn');

  const { data: assessment } = await supabase
    .from('assessments')
    .select('type')
    .eq('id', assessmentId)
    .single();

  if (!assessment) throw new Error('Fant ikke testen');

  const { data: responses } = await supabase
    .from('assessment_responses')
    .select('*, assessment_questions(*)')
    .eq('assessment_id', assessmentId);

  if (!responses) throw new Error('Fant ikke svar');

  const enriched = responses.map((r) => ({
    ...(r.assessment_questions as object),
    answer_value: r.answer_value,
  })) as Parameters<typeof scoreRiasec>[0];

  let riasecScores = null;
  let bigFiveScores = null;
  let valuesScores = null;

  if (assessment.type === 'riasec') riasecScores = scoreRiasec(enriched);
  if (assessment.type === 'big_five') bigFiveScores = scoreBigFive(enriched);
  if (assessment.type === 'values') valuesScores = scoreValues(enriched);

  let topCareerIds: string[] = [];
  if (riasecScores) {
    const { data: careers } = await supabase.from('careers').select('*');
    if (careers) {
      topCareerIds = matchCareers(riasecScores, careers)
        .slice(0, 10)
        .map((m) => m.career.id);
    }
  }

  const { data: result, error } = await supabase
    .from('assessment_results')
    .insert({
      assessment_id: assessmentId,
      user_id: user.id,
      riasec_scores: riasecScores,
      big_five_scores: bigFiveScores,
      values_scores: valuesScores,
      top_career_ids: topCareerIds,
      top_education_ids: [],
    })
    .select('id')
    .single();

  if (error || !result) throw new Error('Kunne ikke lagre resultater');

  await supabase
    .from('assessments')
    .update({ status: 'completed', completed_at: new Date().toISOString() })
    .eq('id', assessmentId);

  redirect(`/resultater/${result.id}`);
}
