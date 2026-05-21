'use client';

import { useState } from 'react';
import { CheckCircle, TrendingUp, GraduationCap, ChevronRight, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const RIASEC = [
  { key: 'R', label: 'Realistisk', pct: 62, color: '#6366f1', emoji: '🔧' },
  { key: 'I', label: 'Undersøkende', pct: 88, color: '#8b5cf6', emoji: '🔬' },
  { key: 'A', label: 'Kunstnerisk', pct: 45, color: '#ec4899', emoji: '🎨' },
  { key: 'S', label: 'Sosial', pct: 53, color: '#06b6d4', emoji: '🤝' },
  { key: 'E', label: 'Entreprenørisk', pct: 70, color: '#f59e0b', emoji: '🚀' },
  { key: 'C', label: 'Konvensjonell', pct: 58, color: '#10b981', emoji: '📋' },
];

// Lønnsdata basert på SSB tabell 11418, heltidsansatte, alle sektorer, 2025
const CAREERS = [
  { title: 'IT-ingeniør / Dataingeniør', match: 94, salary: '800 000', growth: '+22%', icon: '💻', field: 'Teknologi · Bachelor ingeniørfag – data' },
  { title: 'Systemutvikler', match: 91, salary: '820 000', growth: '+20%', icon: '⚙️', field: 'Teknologi · Bachelor ingeniørfag' },
  { title: 'Webutvikler / Frontendutvikler', match: 87, salary: '710 000', growth: '+18%', icon: '🌐', field: 'Teknologi · Bachelor' },
  { title: 'Systemarkitekt', match: 82, salary: '950 000', growth: '+15%', icon: '🏗️', field: 'Teknologi · Master (anbefalt)' },
  { title: 'Produktsjef (IT)', match: 77, salary: '860 000', growth: '+19%', icon: '📊', field: 'Ledelse · Erfaring / videreutd.' },
];

type Step = {
  step: string;
  title: string;
  duration: string;
  status: 'done' | 'current' | 'future';
  note: string;
  goal?: boolean;
  optional?: boolean;
};

type Path = {
  id: string;
  label: string;
  tag: string;
  tagColor: string;
  total: string;
  steps: Step[];
  restart?: boolean;
};

const PATHS: Path[] = [
  {
    id: 'studie',
    label: 'Via studiespesialisering',
    tag: 'Raskeste vei',
    tagColor: 'bg-primary/10 text-primary',
    total: '6 år totalt',
    steps: [
      {
        step: '1',
        title: 'Videregående — Studiespesialisering',
        duration: '3 år',
        status: 'done',
        note: 'Matte R1+R2 + Fysikk 1 anbefalt',
      },
      {
        step: '2',
        title: 'Bachelor i ingeniørfag – data',
        duration: '3 år',
        status: 'current',
        note: 'NTNU, OsloMet, USN, UiT — gir ingeniørtittelen',
        goal: true,
      },
      {
        step: '3',
        title: 'Master i teknologi / sivilingeniør',
        duration: '+ 2 år',
        status: 'future',
        note: 'For spesialisering, forskning eller lederstilling',
        optional: true,
      },
    ],
  },
  {
    id: 'yvei',
    label: 'Via fagbrev (Y-veien)',
    tag: 'Med praktisk erfaring',
    tagColor: 'bg-green-100 text-green-700',
    total: '~6 år + fagbrev',
    steps: [
      {
        step: '1',
        title: 'Yrkesfag — IKT-servicefag / Elektrofag',
        duration: '3 år inkl. fagprøve',
        status: 'done',
        note: 'Gir fagbrev — praktisk IT-kompetanse fra dag én',
      },
      {
        step: '2',
        title: 'Y-veien til bachelor i ingeniørfag',
        duration: '3 år',
        status: 'current',
        note: 'Direkte inntak med relevant fagbrev — ingen forkurs',
        goal: true,
      },
      {
        step: '3',
        title: 'Master i teknologi / sivilingeniør',
        duration: '+ 2 år',
        status: 'future',
        note: 'Valgfritt videre',
        optional: true,
      },
    ],
  },
  {
    id: 'forkurs',
    label: 'Via forkurs for ingeniør',
    tag: 'For alle VGS-linjer',
    tagColor: 'bg-orange-100 text-orange-700',
    total: '7–8 år',
    steps: [
      {
        step: '1',
        title: 'Videregående — valgfri linje',
        duration: '3 år',
        status: 'done',
        note: 'Yrkesfag uten relevant fagbrev, eller studie uten realfag',
      },
      {
        step: '2',
        title: 'Forkurs for ingeniørutdanning',
        duration: '1 år',
        status: 'done',
        note: 'Tilbys ved NTNU, OsloMet, USN m.fl. — gir studiekompetanse + realfag',
      },
      {
        step: '3',
        title: 'Bachelor i ingeniørfag – data',
        duration: '3 år',
        status: 'current',
        note: 'Etter forkurs er du på lik linje med studiespesialisering',
        goal: true,
      },
      {
        step: '4',
        title: 'Master i teknologi / sivilingeniør',
        duration: '+ 2 år',
        status: 'future',
        note: 'Valgfritt videre',
        optional: true,
      },
    ],
  },
];

const TABS = [
  { id: 'riasec', label: '📊 Karriereprofil', shortLabel: 'Profil' },
  { id: 'careers', label: '🎯 Yrkesanbefalinger', shortLabel: 'Yrker' },
  { id: 'education', label: '🎓 Utdanningsvei', shortLabel: 'Utdanning' },
];

export function ReportPreview() {
  const [tab, setTab] = useState<'riasec' | 'careers' | 'education'>('riasec');
  const [activePath, setActivePath] = useState('studie');
  const [showRestart, setShowRestart] = useState(false);

  const currentPath = PATHS.find((p) => p.id === activePath) ?? PATHS[0]!;

  return (
    <div className="bg-white rounded-3xl border border-border shadow-2xl overflow-hidden">
      {/* Top bar — fake browser chrome */}
      <div className="flex items-center gap-2 px-5 py-3.5 bg-muted/50 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/60" />
          <div className="w-3 h-3 rounded-full bg-amber-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 mx-4 px-3 py-1 bg-background rounded-md text-xs text-muted-foreground text-center border border-border/60">
          rettesteg.no/resultater/stian-test-2024
        </div>
        <Badge variant="secondary" className="text-xs text-green-700 bg-green-50 border-green-200">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
          Ferdig analysert
        </Badge>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
            🧑‍💻
          </div>
          <div>
            <p className="font-display font-bold text-lg">Stians karriererapport</p>
            <p className="text-sm text-muted-foreground">Fullført 13. mai 2024 · RIASEC + Big Five + Verdier</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
            <span className="text-sm font-bold text-primary">IT-profil</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-muted border border-border text-sm text-muted-foreground">
            PDF ↓
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-0.5 px-4 pt-3 border-b border-border/50 bg-muted/20">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap',
              tab === t.id
                ? 'bg-white border border-b-white border-border text-foreground -mb-px'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            )}
          >
            <span className="hidden sm:inline">{t.label}</span>
            <span className="sm:hidden">{t.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6 min-h-[340px]">
        {tab === 'riasec' && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Din Holland RIASEC-profil</p>
              <p className="text-xs text-muted-foreground">
                Din profil er <strong className="text-foreground">I-E-R</strong> — Undersøkende, Entreprenørisk, Realistisk.
                Passer godt til teknologiyrker med kreativ frihet.
              </p>
            </div>

            <div className="space-y-3">
              {RIASEC.map((item) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.emoji}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                      <span
                        className="text-xs font-bold px-1.5 py-0.5 rounded-md"
                        style={{ background: `${item.color}18`, color: item.color }}
                      >
                        {item.key}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{item.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.pct}%`, background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15">
              <p className="text-xs font-semibold text-primary mb-1.5">🎯 Hva dette betyr for deg</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Du trives best med analytiske utfordringer og problemløsning, liker å forstå hvordan ting fungerer,
                og har en sterk indre motivasjon for å oppdage ny kunnskap. Teknologi, forskning og ingeniørfag er ideelle felt.
              </p>
            </div>
          </div>
        )}

        {tab === 'careers' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-muted-foreground">Topp 5 yrkesanbefalinger for deg</p>
              <span className="text-xs text-muted-foreground">Matchet mot 600+ yrker</span>
            </div>
            {CAREERS.map((c, i) => (
              <div
                key={c.title}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border transition-colors',
                  i === 0 ? 'border-primary/30 bg-primary/5' : 'border-border hover:bg-muted/40'
                )}
              >
                <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-lg flex-shrink-0">
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm truncate">{c.title}</p>
                    {i === 0 && <Badge className="text-xs bg-primary/15 text-primary border-primary/20 font-semibold">Beste match</Badge>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{c.field}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">⚡ {c.salary} kr/år</span>
                    <span className="text-xs text-green-600 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      {c.growth}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div
                    className="text-lg font-display font-bold"
                    style={{ color: i === 0 ? 'oklch(0.52 0.26 280)' : undefined }}
                  >
                    {c.match}%
                  </div>
                  <div className="w-16 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${c.match}%`, opacity: 0.7 + i * 0.06 - i * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center pt-1">
              <p className="text-xs text-muted-foreground">
                🔒 <strong>+45 yrker</strong> tilgjengelig med Pro
              </p>
            </div>
          </div>
        )}

        {tab === 'education' && (
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Utdanningsveier → IT-ingeniør / Dataingeniør</p>
                <p className="text-xs text-muted-foreground mt-0.5">Velg veien som passer din situasjon</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{currentPath.total}</span>
            </div>

            {/* Path selector */}
            <div className="flex gap-1.5 flex-wrap">
              {PATHS.map((path) => (
                <button
                  key={path.id}
                  onClick={() => { setActivePath(path.id); setShowRestart(false); }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                    activePath === path.id && !showRestart
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-muted border-border text-muted-foreground hover:text-foreground hover:border-border/80'
                  )}
                >
                  {path.label}
                </button>
              ))}
              <button
                onClick={() => { setShowRestart(true); setActivePath(''); }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                  showRestart
                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                    : 'bg-muted border-border text-muted-foreground hover:text-orange-600 hover:border-orange-300'
                )}
              >
                🔄 Valgte feil?
              </button>
            </div>

            {/* Active path tag */}
            {!showRestart && (
              <div className="flex items-center gap-2">
                <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', currentPath.tagColor)}>
                  {currentPath.tag}
                </span>
                <span className="text-xs text-muted-foreground">{currentPath.total}</span>
              </div>
            )}

            {/* "Valgte feil"-panel */}
            {showRestart && (
              <div className="space-y-2.5 p-4 rounded-2xl bg-orange-50 border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <p className="text-sm font-semibold text-orange-800">Du er ikke fastlåst — det finnes veier tilbake</p>
                </div>
                {[
                  {
                    emoji: '📚',
                    title: 'Privatist-eksamen i realfag',
                    desc: 'Ta Matte R1/R2 og Fysikk 1 som privatist. Kan kombineres med jobb. Åpner for direkte opptak til ingeniørfag.',
                  },
                  {
                    emoji: '🛠️',
                    title: 'Forkurs for ingeniørutdanning (1 år)',
                    desc: 'Tilbys ved NTNU, OsloMet, USN m.fl. Gir full studiekompetanse med realfag på ett år — for alle med VGS.',
                  },
                  {
                    emoji: '🔧',
                    title: 'Relevant fagbrev → Y-veien',
                    desc: 'Har du fagbrev i IKT-servicefag, elektro eller data- og elektronikk? Da kan du søke direkte via Y-veien — uten forkurs.',
                  },
                  {
                    emoji: '🎓',
                    title: 'Realkompetanse (for voksne)',
                    desc: 'Har du 5+ år relevant arbeidserfaring? Universiteter kan vurdere realkompetanse for opptak, selv uten formell VGS.',
                  },
                ].map((opt) => (
                  <div key={opt.title} className="flex gap-3">
                    <span className="text-base flex-shrink-0">{opt.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold text-orange-900">{opt.title}</p>
                      <p className="text-xs text-orange-700/80 mt-0.5 leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-orange-600 mt-1 pt-2 border-t border-orange-200">
                  💡 Rettesteg viser deg hvilken vei som passer best for <strong>din</strong> situasjon i den fulle rapporten.
                </p>
              </div>
            )}

            {/* Steps timeline */}
            {!showRestart && (
              <>
                <div className="relative pt-1">
                  <div className="absolute left-[18px] top-8 bottom-8 w-0.5 bg-border" aria-hidden />
                  <div className="space-y-3">
                    {currentPath.steps.map((step) => (
                      <div key={step.step} className="flex items-start gap-4 relative">
                        <div
                          className={cn(
                            'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 text-xs font-bold',
                            step.status === 'done'    && 'bg-primary border-primary text-white',
                            step.status === 'current' && 'bg-white border-primary text-primary',
                            step.status === 'future'  && 'bg-background border-border text-muted-foreground'
                          )}
                        >
                          {step.status === 'done' ? <CheckCircle className="w-4 h-4" /> : step.step}
                        </div>
                        <div
                          className={cn(
                            'flex-1 p-3.5 rounded-xl border',
                            step.status === 'done'    && 'bg-primary/5 border-primary/20',
                            step.status === 'current' && 'bg-amber-50 border-amber-200 ring-2 ring-amber-200/50',
                            step.status === 'future'  && 'bg-muted/30 border-border/60'
                          )}
                        >
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <p className={cn('font-semibold text-sm', step.optional && 'text-muted-foreground')}>
                              {step.title}
                            </p>
                            <div className="flex gap-1.5">
                              {step.status === 'current' && !step.goal && (
                                <Badge className="text-xs bg-amber-100 text-amber-700 border-amber-200">Du er her →</Badge>
                              )}
                              {step.goal && (
                                <Badge className="text-xs bg-primary/15 text-primary border-primary/25">✓ Kvalifisert IT-ingeniør</Badge>
                              )}
                              {step.optional && (
                                <Badge variant="secondary" className="text-xs text-muted-foreground">Valgfritt</Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <GraduationCap className="w-3 h-3" />
                              {step.duration}
                            </span>
                            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                            <span className="text-xs text-muted-foreground">{step.note}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Salary info */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/20">
                  <span className="text-xl">💼</span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Ferdig bachelor = kvalifisert IT-ingeniør</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Startlønn ~720 000 kr/år · Erfaren ~800 000+ kr/år (SSB 2025)</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
