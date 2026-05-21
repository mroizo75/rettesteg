'use client';

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import type { RiasecScores } from '@/lib/supabase/types';
import { riasecDescriptions } from '@/lib/assessments/scoring';

interface Props {
  scores: RiasecScores;
}

export function RiasecChart({ scores }: Props) {
  const data = (Object.keys(scores) as (keyof RiasecScores)[]).map((key) => ({
    subject: riasecDescriptions[key].label,
    value: scores[key],
    fullMark: 100,
    key,
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid gridType="circle" stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            tickCount={5}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value, _name, props) => [
              `${value ?? 0}%`,
              (props as { payload?: { subject?: string } })?.payload?.subject ?? '',
            ]}
            contentStyle={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '13px',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
