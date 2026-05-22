'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

interface MatchItem {
  title: string;
  score: number;
}

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

export function CareerMatchBar({ matches }: { matches: MatchItem[] }) {
  const colors = useChartColors();

  const data = matches.map((m) => ({
    name: m.title.length > 18 ? m.title.slice(0, 16) + '…' : m.title,
    score: m.score,
    fullTitle: m.title,
  }));

  if (!colors) {
    // Skjelett-placeholder mens farger lastes (unngår width:-1 flash)
    return (
      <div className="w-full h-64 rounded-xl bg-muted/40 animate-pulse" />
    );
  }

  // Primærfarge med gradert opacity per søyle
  const barColors = data.map((_, i) => {
    const opacity = Math.max(0.4, 1 - i * 0.08);
    return `${colors.primary}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  });

  return (
    <div className="w-full" style={{ height: Math.max(180, data.length * 44) }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 4, right: 28, top: 4, bottom: 4 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={colors.border}
            horizontal={false}
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: colors.mutedForeground }}
            tickFormatter={(v) => `${v}%`}
            axisLine={{ stroke: colors.border }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fontSize: 12, fill: colors.foreground }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value, _name, props) => [
              `${value ?? 0}% match`,
              (props as { payload?: { fullTitle?: string } })?.payload?.fullTitle ?? '',
            ]}
            contentStyle={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              fontSize: '13px',
              color: colors.foreground,
            }}
            cursor={{ fill: colors.border, opacity: 0.4 }}
          />
          <Bar dataKey="score" radius={[0, 6, 6, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
