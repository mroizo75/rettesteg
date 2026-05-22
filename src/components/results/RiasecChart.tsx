'use client';

import { useEffect, useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import type { RiasecScores } from '@/lib/supabase/types';
import { riasecDescriptions } from '@/lib/assessments/scoring';

interface ChartColors {
  foreground: string;
  mutedForeground: string;
  border: string;
  card: string;
  primary: string;
}

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function useChartColors(): ChartColors | null {
  const [colors, setColors] = useState<ChartColors | null>(null);

  useEffect(() => {
    setColors({
      foreground: `hsl(${getCssVar('--foreground')})`,
      mutedForeground: `hsl(${getCssVar('--muted-foreground')})`,
      border: `hsl(${getCssVar('--border')})`,
      card: `hsl(${getCssVar('--card')})`,
      primary: `hsl(${getCssVar('--primary')})`,
    });
  }, []);

  return colors;
}

export function RiasecChart({ scores }: { scores: RiasecScores }) {
  const colors = useChartColors();

  const data = (Object.keys(scores) as (keyof RiasecScores)[]).map((key) => ({
    subject: riasecDescriptions[key].label,
    value: scores[key],
    fullMark: 100,
    key,
  }));

  if (!colors) {
    return (
      <div className="w-full h-72 rounded-xl bg-muted/40 animate-pulse" />
    );
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid gridType="circle" stroke={colors.border} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 12, fill: colors.foreground, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: colors.mutedForeground }}
            tickCount={5}
            stroke={colors.border}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke={colors.primary}
            fill={colors.primary}
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value, _name, props) => [
              `${value ?? 0}%`,
              (props as { payload?: { subject?: string } })?.payload?.subject ?? '',
            ]}
            contentStyle={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              fontSize: '13px',
              color: colors.foreground,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
