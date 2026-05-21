'use client';

import { useState, useCallback, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { startAssessment, saveResponse, completeAssessment } from '@/actions/assessment';
import { ChevronLeft, ChevronRight, Loader2, CheckCircle } from 'lucide-react';
import type { AssessmentQuestion, AssessmentType } from '@/lib/supabase/types';

interface Props {
  questions: AssessmentQuestion[];
  assessmentType: AssessmentType;
  existingAssessmentId: string | null;
  savedResponses: Record<string, number>;
}

const SCALE_LABELS: Record<number, string> = {
  1: 'Passer ikke',
  2: 'Passer litt',
  3: 'Nøytral',
  4: 'Passer godt',
  5: 'Passer svært godt',
};

const TYPE_TITLES: Record<AssessmentType, string> = {
  riasec: 'Interessetest — Holland RIASEC',
  big_five: 'Personlighetstest — Big Five',
  values: 'Karriereverdier',
};

export function AssessmentWizard({ questions, assessmentType, existingAssessmentId, savedResponses }: Props) {
  const [assessmentId, setAssessmentId] = useState<string | null>(existingAssessmentId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>(savedResponses);
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const currentAnswer = answers[currentQuestion.id];

  const ensureAssessmentStarted = useCallback(async (): Promise<string> => {
    if (assessmentId) return assessmentId;
    const id = await startAssessment(assessmentType);
    setAssessmentId(id);
    return id;
  }, [assessmentId, assessmentType]);

  const handleAnswer = useCallback(
    (value: number) => {
      startTransition(async () => {
        const id = await ensureAssessmentStarted();
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
        await saveResponse(id, currentQuestion.id, value);
      });
    },
    [currentQuestion.id, ensureAssessmentStarted]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalQuestions]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const id = await ensureAssessmentStarted();
    await completeAssessment(id);
  }, [isSubmitting, ensureAssessmentStarted]);

  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const allAnswered = answeredCount === totalQuestions;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-1">{TYPE_TITLES[assessmentType]}</h1>
        <p className="text-sm text-muted-foreground">
          Spørsmål {currentIndex + 1} av {totalQuestions}
        </p>
        <Progress value={progress} className="mt-3 h-2" />
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-8">
          <p className="text-lg font-medium text-foreground leading-relaxed mb-8">
            {currentQuestion.text_no}
          </p>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleAnswer(value)}
                disabled={isPending}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl border-2 text-left transition-all
                  ${currentAnswer === value
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-border hover:border-primary/40 hover:bg-muted/50 text-foreground'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${currentAnswer === value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {currentAnswer === value ? <CheckCircle className="w-4 h-4" /> : value}
                </span>
                <span className="text-sm">{SCALE_LABELS[value]}</span>
                {isPending && currentAnswer === value && (
                  <Loader2 className="w-4 h-4 animate-spin ml-auto" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Forrige
        </Button>

        <span className="text-sm text-muted-foreground">
          {answeredCount}/{totalQuestions} besvart
        </span>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Behandler...
              </>
            ) : (
              <>
                Se resultater
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="gap-2"
          >
            Neste
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
