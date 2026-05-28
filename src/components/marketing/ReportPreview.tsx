'use client';

import { useState } from 'react';
import { CheckCircle, TrendingUp, GraduationCap, ChevronRight, AlertCircle, Lock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const RIASEC = [
  { key: 'R', label: 'Realistisk',     pct: 62, color: '#6366f1', emoji: '🔧' },
  { key: 'I', label: 'Undersøkende',   pct: 88, color: '#8b5cf6', emoji: '🔬' },
  { key: 'A', label: 'Kunstnerisk',    pct: 45, color: '#ec4899', emoji: '🎨' },
  { key: 'S', label: 'Sosial',         pct: 53, color: '#06b6d4', emoji: '🤝' },
  { key: 'E', label: 'Entreprenørisk', pct: 70, color: '#f59e0b', emoji: '🚀' },
  { key: 'C', label: 'Konvensjonell',  pct: 58, color: '#10b981', emoji: '📋' },
];

// Topp 2 karrierer med lønn og utdanningsvei — vises gratis
// Lønnsdata: SSB tabell 11418, heltidsansatte 2025
const FREE_CAREERS = [
  {
    rank: 1,
    title: 'IT-ingeniør / Dataingeniør',
    match: 94,
    icon: '💻',
    sector: 'Teknologi',
    salary: '720 000 – 900 000 kr/år',
    growth: '+22% vekst',
    growthPositive: true,
    description: 'Utvikler og drifter programvare, systemer og nettverk. Stor etterspørsel i privat og offentlig sektor.',
    edu: {
      level: 'bachelor',
      paths: [
        { label: 'Videregående – Studiespesialisering', note: 'Matte R1+R2 + Fysikk 1 anbefalt', done: false },
        { label: 'Bachelor i ingeniørfag – data (3 år)', note: 'NTNU, OsloMet, USN, UiT', goal: true },
      ],
      altPath: 'Alternativ: Fagbrev IKT-servicefag → Y-veien direkte til bachelor',
    },
  },
  {
    rank: 2,
    title: 'Systemutvikler',
    match: 91,
    icon: '⚙️',
    sector: 'Teknologi',
    salary: '750 000 – 870 000 kr/år',
    growth: '+20% vekst',
    growthPositive: true,
    description: 'Designer og bygger programvaresystemer. Jobber gjerne i produkt-team og kan kombinere teknisk og kreativt arbeid.',
    edu: {
      level: 'bachelor',
      paths: [
        { label: 'Videregående – Studiespesialisering', note: 'Realfag anbefalt', done: false },
        { label: 'Bachelor i informatikk / ingeniørfag (3 år)', note: 'Mange høgskoler og universiteter', goal: true },
      ],
      altPath: 'Alternativ: Forkurs ingeniør (1 år) åpner alle linjer',
    },
  },
];

const LOCKED_CAREERS = [
  { rank: 3, title: 'Webutvikler / Frontend', match: 87 },
  { rank: 4, title: 'Systemarkitekt',         match: 82 },
  { rank: 5, title: 'Produktsjef (IT)',        match: 77 },
];

const PATHS = [
  {
    id: 'studie', label: 'Via studiespesialisering',
    tag: 'Raskeste vei', tagColor: 'bg-primary/10 text-primary',
    total: '6 år totalt',
    steps: [
      { step: '1', title: 'Videregående — Studiespesialisering', duration: '3 år',  status: 'done',    note: 'Matte R1+R2 + Fysikk 1 anbefalt' },
      { step: '2', title: 'Bachelor i ingeniørfag – data',       duration: '3 år',  status: 'current', note: 'NTNU, OsloMet, USN, UiT — gir ingeniørtittelen', goal: true },
      { step: '3', title: 'Master i teknologi / sivilingeniør',  duration: '+ 2 år',status: 'future',  note: 'For spesialisering eller lederstilling', optional: true },
    ],
  },
  {
    id: 'yvei', label: 'Via fagbrev (Y-veien)',
    tag: 'Med praktisk erfaring', tagColor: 'bg-green-100 text-green-700',
    total: '~6 år + fagbrev',
    steps: [
      { step: '1', title: 'Yrkesfag — IKT-servicefag / Elektrofag', duration: '3 år inkl. fagprøve', status: 'done', note: 'Gir fagbrev — praktisk IT-kompetanse fra dag én' },
      { step: '2', title: 'Y-veien til bachelor i ingeniørfag',      duration: '3 år', status: 'current', note: 'Direkte inntak med relevant fagbrev', goal: true },
      { step: '3', title: 'Master i teknologi / sivilingeniør',       duration: '+ 2 år', status: 'future', note: 'Valgfritt videre', optional: true },
    ],
  },
  {
    id: 'forkurs', label: 'Via forkurs for ingeniør',
    tag: 'For alle VGS-linjer', tagColor: 'bg-orange-100 text-orange-700',
    total: '7–8 år',
    steps: [
      { step: '1', title: 'Videregående — valgfri linje',          duration: '3 år',  status: 'done',    note: 'Yrkesfag uten relevant fagbrev, eller studie uten realfag' },
      { step: '2', title: 'Forkurs for ingeniørutdanning',          duration: '1 år',  status: 'done',    note: 'NTNU, OsloMet, USN m.fl. — studiekompetanse + realfag' },
      { step: '3', title: 'Bachelor i ingeniørfag – data',          duration: '3 år',  status: 'current', note: 'Etter forkurs er du på lik linje med studiespesialisering', goal: true },
      { step: '4', title: 'Master i teknologi / sivilingeniør',     duration: '+ 2 år',status: 'future',  note: 'Valgfritt videre', optional: true },
    ],
  },
];

const TABS = [
  { id: 'riasec',    label: '📊 Karriereprofil',    shortLabel: 'Profil' },
  { id: 'careers',  label: '🎯 Yrker + utdanning',  shortLabel: 'Yrker' },
  { id: 'education',label: '🎓 Fullstendig vei',    shortLabel: 'Vei' },
];

type Step = { step: string; title: string; duration: string; status: string; note: string; goal?: boolean; optional?: boolean };

export function ReportPreview() {
  const [tab, setTab] = useState<'riasec' | 'careers' | 'education'>('riasec');
  const [activePath, setActivePath] = useState('studie');
  const [showRestart, setShowRestart] = useState(false);

  const currentPath = PATHS.find((p) => p.id === activePath) ?? PATHS[0]!;

  return (
    <div className="bg-white rounded-3xl border border-border shadow-2xl overflow-hidden">
      {/* Fake browser chrome */}
      <div className="flex items-center gap-2 px-5 py-3.5 bg-muted/50 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/60" />
          <div className="w-3 h-3 rounded-full bg-amber-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 mx-4 px-3 py-1 bg-background rounded-md text-xs text-muted-foreground text-center border border-border/60">
          rettesteg.no/resultater/stian-test-2025
        </div>
        <Badge variant="secondary" className="text-xs text-green-700 bg-green-50 border-green-200">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
          Ferdig analysert
        </Badge>
      </div>

      {/* Rapportheader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">🧑‍💻</div>
          <div>
            <p className="font-display font-bold">Stians karriererapport</p>
            <p className="text-xs text-muted-foreground">Fullført 13. mai 2025 · RIASEC + Big Five + Verdier</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
            <span className="text-sm font-bold text-primary">IT-profil</span>
          </div>
        </div>
      </div>

      {/* Faner */}
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

      {/* Innhold */}
      <div className="p-5 min-h-[380px]">

        {/* ---------- RIASEC-fane ---------- */}
        {tab === 'riasec' && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Din Holland RIASEC-profil</p>
              <p className="text-xs text-muted-foreground">
                Profil: <strong className="text-foreground">I-E-R</strong> — Undersøkende, Entreprenørisk, Realistisk.
                Passer godt til teknologiyrker med kreativ frihet.
              </p>
            </div>
            <div className="space-y-2.5">
              {RIASEC.map((item) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span>{item.emoji}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded-md" style={{ background: `${item.color}18`, color: item.color }}>
                        {item.key}
                      </span>
                    </div>
                    <span className="text-sm font-bold">{item.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/15">
              <p className="text-xs font-semibold text-primary mb-1">🎯 Hva dette betyr for deg</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Du trives best med analytiske utfordringer, liker å forstå hvordan ting fungerer, og har sterk
                indre motivasjon for ny kunnskap. Teknologi, ingeniørfag og forskning er ideelle felt.
              </p>
            </div>
          </div>
        )}

        {/* ---------- Yrker + utdanning-fane ---------- */}
        {tab === 'careers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">
                Topp 2 yrker med utdanningsvei
              </p>
              <span className="text-xs text-muted-foreground">2 av 10 (gratis)</span>
            </div>

            {FREE_CAREERS.map((c) => (
              <div
                key={c.rank}
                className={cn(
                  'rounded-2xl border p-4',
                  c.rank === 1 ? 'border-primary/30 bg-primary/3' : 'border-border'
                )}
              >
                {/* Karrierehode */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {c.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-semibold text-sm">{c.title}</span>
                      {c.rank === 1 && (
                        <Badge className="text-xs bg-primary/15 text-primary border-primary/25">Beste match</Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">{c.match}% match</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
                  </div>
                </div>

                {/* Lønn + vekst */}
                <div className="flex flex-wrap gap-3 mb-3 ml-10">
                  <span className="text-xs font-medium text-foreground">💰 {c.salary}</span>
                  <span className={cn('text-xs font-medium flex items-center gap-0.5', c.growthPositive ? 'text-green-700' : 'text-muted-foreground')}>
                    <TrendingUp className="w-3 h-3" />
                    {c.growth}
                  </span>
                </div>

                {/* Utdanningsvei */}
                <div className="ml-10 pt-3 border-t border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Utdanningsvei (utdanning.no)
                  </p>
                  <div className="relative pl-4">
                    <div className="absolute left-1.5 top-1.5 bottom-1.5 w-px bg-border" aria-hidden />
                    <div className="space-y-2">
                      {c.edu.paths.map((p, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className={cn(
                            'w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 -ml-4 z-10 mt-0.5',
                            p.goal ? 'bg-primary border-primary' : 'bg-background border-border'
                          )}>
                            {p.goal && <CheckCircle className="w-2 h-2 text-white" />}
                          </div>
                          <div>
                            <p className={cn('text-xs font-semibold', p.goal ? 'text-foreground' : 'text-muted-foreground')}>
                              {p.label}
                            </p>
                            <p className="text-xs text-muted-foreground">{p.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
                    <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    {c.edu.altPath}
                  </p>
                </div>
              </div>
            ))}

            {/* Låste yrker */}
            <div className="space-y-2">
              {LOCKED_CAREERS.map((lc) => (
                <div key={lc.rank} className="relative rounded-xl border border-border overflow-hidden">
                  <div className="p-3.5 blur-sm pointer-events-none">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {lc.rank}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{lc.title}</p>
                        <p className="text-xs text-muted-foreground">{lc.match}% match · 750 000 kr/år · Bachelor</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>

            {/* Upgrade CTA */}
            <div className="rounded-xl bg-gradient-to-br from-primary/8 to-violet-500/5 border border-primary/20 p-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-sm font-bold">Se alle 10 yrker + fullstendige utdanningsveier</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Lønn (SSB 2025) · Vekstutsikter · PDF-rapport
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary flex items-center gap-1 whitespace-nowrap">
                  Oppgrader til Pro <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ---------- Fullstendig utdanningsvei-fane (Pro-preview) ---------- */}
        {tab === 'education' && (
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Utdanningsveier → IT-ingeniør / Dataingeniør</p>
                <p className="text-xs text-muted-foreground mt-0.5">Velg veien som passer din situasjon</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{currentPath.total}</span>
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {PATHS.map((path) => (
                <button
                  key={path.id}
                  onClick={() => { setActivePath(path.id); setShowRestart(false); }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                    activePath === path.id && !showRestart
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-muted border-border text-muted-foreground hover:text-foreground'
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
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-muted border-border text-muted-foreground hover:text-orange-600 hover:border-orange-300'
                )}
              >
                🔄 Valgte feil?
              </button>
            </div>

            {!showRestart && (
              <div className="flex items-center gap-2">
                <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', currentPath.tagColor)}>
                  {currentPath.tag}
                </span>
                <span className="text-xs text-muted-foreground">{currentPath.total}</span>
              </div>
            )}

            {showRestart && (
              <div className="space-y-2.5 p-4 rounded-2xl bg-orange-50 border border-orange-200">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <p className="text-sm font-semibold text-orange-800">Du er ikke fastlåst — det finnes veier tilbake</p>
                </div>
                {[
                  { emoji: '📚', title: 'Privatist-eksamen i realfag', desc: 'Ta Matte R1/R2 og Fysikk 1 som privatist. Åpner for direkte opptak til ingeniørfag.' },
                  { emoji: '🛠️', title: 'Forkurs for ingeniørutdanning (1 år)', desc: 'NTNU, OsloMet, USN m.fl. Gir full studiekompetanse med realfag på ett år.' },
                  { emoji: '🔧', title: 'Relevant fagbrev → Y-veien', desc: 'Fagbrev i IKT-servicefag eller elektro? Søk direkte via Y-veien uten forkurs.' },
                  { emoji: '🎓', title: 'Realkompetanse (for voksne)', desc: '5+ år relevant arbeidserfaring? Universiteter vurderer realkompetanse for opptak.' },
                ].map((opt) => (
                  <div key={opt.title} className="flex gap-3">
                    <span className="text-base flex-shrink-0">{opt.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold text-orange-900">{opt.title}</p>
                      <p className="text-xs text-orange-700/80 mt-0.5 leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!showRestart && (
              <>
                <div className="relative pt-1">
                  <div className="absolute left-[18px] top-8 bottom-8 w-0.5 bg-border" aria-hidden />
                  <div className="space-y-3">
                    {currentPath.steps.map((step: Step) => (
                      <div key={step.step} className="flex items-start gap-4 relative">
                        <div className={cn(
                          'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 text-xs font-bold',
                          step.status === 'done'    && 'bg-primary border-primary text-white',
                          step.status === 'current' && 'bg-white border-primary text-primary',
                          step.status === 'future'  && 'bg-background border-border text-muted-foreground'
                        )}>
                          {step.status === 'done' ? <CheckCircle className="w-4 h-4" /> : step.step}
                        </div>
                        <div className={cn(
                          'flex-1 p-3.5 rounded-xl border',
                          step.status === 'done'    && 'bg-primary/5 border-primary/20',
                          step.status === 'current' && 'bg-amber-50 border-amber-200 ring-2 ring-amber-200/50',
                          step.status === 'future'  && 'bg-muted/30 border-border/60'
                        )}>
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <p className={cn('font-semibold text-sm', step.optional && 'text-muted-foreground')}>
                              {step.title}
                            </p>
                            <div className="flex gap-1.5">
                              {step.goal && (
                                <Badge className="text-xs bg-primary/15 text-primary border-primary/25">
                                  ✓ Kvalifisert IT-ingeniør
                                </Badge>
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

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/20">
                  <span className="text-xl">💼</span>
                  <div>
                    <p className="text-xs font-semibold">Ferdig bachelor = kvalifisert IT-ingeniør</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Startlønn ~720 000 kr/år · Erfaren ~900 000+ kr/år (SSB 2025)
                    </p>
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
