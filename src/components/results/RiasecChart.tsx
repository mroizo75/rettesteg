'use client';

import type { RiasecScores } from '@/lib/supabase/types';
import { riasecDescriptions } from '@/lib/assessments/scoring';

export function RiasecChart({ scores }: { scores: RiasecScores }) {
  const sorted = (Object.keys(scores) as (keyof RiasecScores)[])
    .map((key) => ({ key, score: scores[key], ...riasecDescriptions[key] }))
    .sort((a, b) => b.score - a.score);

  const max = Math.max(...sorted.map((d) => d.score), 1);

  return (
    <div className="space-y-3">
      {sorted.map(({ key, score, label, color, no }, idx) => (
        <div key={key} className="group">
          {/* Topprad: navn + score */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              {/* Rangering */}
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{ background: color }}
              >
                {idx + 1}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {label}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                ({key})
              </span>
              {idx === 0 && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                  style={{ background: color }}
                >
                  Sterkest
                </span>
              )}
            </div>
            <span className="text-sm font-bold tabular-nums" style={{ color }}>
              {score}%
            </span>
          </div>

          {/* Søyle */}
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(score / max) * 100}%`,
                background: color,
                opacity: 0.85 + idx * 0.02 > 1 ? 1 : 0.85 - idx * 0.1,
              }}
            />
          </div>

          {/* Beskrivelse (kollapset som standard, vises ved hover/fokus) */}
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed hidden group-hover:block">
            {no}
          </p>
        </div>
      ))}
    </div>
  );
}
