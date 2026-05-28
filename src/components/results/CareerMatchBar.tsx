'use client';

interface MatchItem {
  title: string;
  score: number;
}

export function CareerMatchBar({ matches }: { matches: MatchItem[] }) {
  const max = Math.max(...matches.map((m) => m.score), 1);

  // Fargegradient basert på rangering
  const colors = [
    '#7c3aed', // 1. plass — violet
    '#8b5cf6',
    '#a78bfa',
    '#c4b5fd',
    '#ddd6fe',
    '#ede9fe',
    '#f5f3ff',
    '#7c3aed88',
    '#8b5cf688',
    '#a78bfa88',
  ];

  return (
    <div className="space-y-2.5">
      {matches.map((m, idx) => (
        <div key={m.title} className="group">
          {/* Tittel + prosent på toppen */}
          <div className="flex items-center justify-between mb-1 gap-2">
            <span className="text-sm font-semibold text-foreground leading-tight flex-1 min-w-0">
              <span
                className="inline-block w-5 h-5 rounded-full text-center text-[10px] font-bold text-white mr-2 leading-5 flex-shrink-0"
                style={{ background: colors[idx] ?? colors[colors.length - 1] }}
              >
                {idx + 1}
              </span>
              {m.title}
            </span>
            <span
              className="text-sm font-bold tabular-nums flex-shrink-0"
              style={{ color: colors[idx] ?? '#7c3aed' }}
            >
              {m.score}%
            </span>
          </div>

          {/* Bar */}
          <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(m.score / max) * 100}%`,
                background: colors[idx] ?? '#7c3aed',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
