import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import { AssessmentWizard } from './AssessmentWizard';
import type { AssessmentType } from '@/lib/supabase/types';

export const metadata: Metadata = { title: 'Ta karrieretest' };

export default async function TestPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; resume?: string }>;
}) {
  const { type, resume } = await searchParams;
  const supabase = await createAdminClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/logg-inn');

  const assessmentType = (type ?? 'riasec') as AssessmentType;

  const { data: profile } = await supabase
    .from('profiles')
    .select('tier')
    .eq('id', user.id)
    .single();

  if (assessmentType !== 'riasec' && profile?.tier !== 'pro') {
    redirect('/priser');
  }

  const { data: questions } = await supabase
    .from('assessment_questions')
    .select('*')
    .eq('assessment_type', assessmentType)
    .order('question_no');

  if (!questions || questions.length === 0) {
    redirect('/dashboard');
  }

  let existingAssessmentId: string | null = null;
  let savedResponses: Record<string, number> = {};

  if (resume) {
    const { data: assessment } = await supabase
      .from('assessments')
      .select('id, status')
      .eq('id', resume)
      .eq('user_id', user.id)
      .single();

    if (assessment?.status === 'in_progress') {
      existingAssessmentId = assessment.id;
      const { data: responses } = await supabase
        .from('assessment_responses')
        .select('question_id, answer_value')
        .eq('assessment_id', assessment.id);

      if (responses) {
        savedResponses = Object.fromEntries(
          responses.map((r) => [r.question_id, r.answer_value])
        );
      }
    }
  }

  return (
    <AssessmentWizard
      questions={questions}
      assessmentType={assessmentType}
      existingAssessmentId={existingAssessmentId}
      savedResponses={savedResponses}
    />
  );
}
