import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ReportPreview } from '@/components/marketing/ReportPreview';
import {
  ArrowRight,
  CheckCircle,
  BarChart3,
  Brain,
  Heart,
  Users,
  GraduationCap,
  Sparkles,
  Zap,
  TrendingUp,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gratis karriereveiledning for norsk ungdom | Rettesteg',
  description:
    'Finn yrket og utdanningen som passer deg — basert på vitenskapelige tester. Gratis for alle. Brukes av 150+ norske skoler.',
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center hero-bg overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, oklch(0.65 0.22 320), transparent 70%)' }} />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, oklch(0.88 0.22 130), transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, white, transparent 70%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-8 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[var(--lime)]" />
                Gratis karriereveiledning for norsk ungdom
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] mb-6">
                Finn yrket{' '}
                <span className="relative inline-block">
                  <span className="relative z-10" style={{ color: 'var(--lime)' }}>du er skapt</span>
                  <svg className="absolute -bottom-2 left-0 w-full opacity-60" viewBox="0 0 200 12" fill="none" aria-hidden>
                    <path d="M2 8 C50 2 150 2 198 8" stroke="var(--lime)" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                {' '}for
              </h1>

              <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-lg">
                Ta vitenskapelig anerkjente karrieretester og få konkrete anbefalinger for
                utdanning og yrke — tilpasset akkurat deg.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <Link href="/registrer">
                  <Button
                    size="lg"
                    className="gap-2 text-base px-8 font-semibold shadow-xl"
                    style={{
                      background: 'var(--lime)',
                      color: 'oklch(0.13 0.025 280)',
                      boxShadow: '0 20px 40px -8px oklch(0.88 0.22 130 / 0.4)',
                    }}
                  >
                    Start gratis test nå
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="#slik-fungerer-det">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 text-base px-8 border-white/30 bg-white/5 text-white hover:bg-white/15 hover:border-white/50 backdrop-blur-sm"
                  >
                    Se eksempel
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap gap-6">
                {[
                  { value: '10 000+', label: 'tester fullført' },
                  { value: '600+', label: 'yrker i databasen' },
                  { value: '150+', label: 'norske skoler' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/50 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: UI mockup */}
            <div className="hidden lg:flex justify-end">
              <div className="relative w-[380px]">
                {/* Main result card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-white/50 text-xs font-medium uppercase tracking-wide">Din karriereprofil</p>
                      <p className="text-white font-semibold mt-0.5">Stian, 17 år 🎯</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[var(--lime)]/20 border border-[var(--lime)]/40">
                      <span className="text-xs font-semibold" style={{ color: 'var(--lime)' }}>IT-profil</span>
                    </div>
                  </div>

                  {/* RIASEC bars */}
                  <div className="space-y-3 mb-5">
                    {[
                      { label: 'Undersøkende (I)', pct: 88, color: 'bg-[var(--lime)]' },
                      { label: 'Realistisk (R)', pct: 74, color: 'bg-purple-400' },
                      { label: 'Konvensjonell (C)', pct: 58, color: 'bg-blue-400' },
                    ].map((bar) => (
                      <div key={bar.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-white/80 font-medium">{bar.label}</span>
                          <span className="text-white/50">{bar.pct}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${bar.color} opacity-90`} style={{ width: `${bar.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wide mb-3">Topp anbefalinger</p>
                    <div className="space-y-2">
                      {[
                        { name: 'IT-ingeniør / Dataingeniør', match: '94%', emoji: '💻' },
                        { name: 'Systemutvikler', match: '90%', emoji: '⚙️' },
                        { name: 'Webutvikler', match: '85%', emoji: '🌐' },
                      ].map((rec, i) => (
                        <div key={rec.name} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                            {i + 1}
                          </div>
                          <span className="text-sm text-white font-medium flex-1">{rec.emoji} {rec.name}</span>
                          <span className="text-xs font-bold" style={{ color: 'var(--lime)' }}>{rec.match}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-semibold text-foreground">Vitenskapelig validert</span>
                  </div>
                </div>

                {/* Floating score */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-xl border border-border">
                  <p className="text-xs text-muted-foreground">Matchprosent</p>
                  <p className="text-2xl font-display font-bold text-primary">94%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none" style={{ height: 80 }}>
            <path d="M0 80 L0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 Z" fill="oklch(0.985 0.004 80)" />
          </svg>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF BAR ════════════════════════════════════════════ */}
      <section className="py-8 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
            <p className="text-sm text-muted-foreground font-medium">Brukes av ungdommer på:</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {['Videregående skoler', 'Ungdomsskoler', 'Nav karrieresentre', 'Kommuner'].map((org) => (
                <div key={org} className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {org}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ════════════════════════════════════════════════ */}
      <section id="slik-fungerer-det" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 border-primary/20">
              <Zap className="w-3 h-3 mr-1" />
              Slik fungerer det
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Tre steg til drømmejobben
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Det tar 15–25 minutter og er gratis. Ingen kredittkort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                emoji: '📝',
                title: 'Ta testene',
                desc: 'Svar på spørsmål om interesser, personlighet og verdier. Ingen gale svar — bare vær deg selv.',
                color: 'from-primary/10 to-primary/5',
                badge: '15–25 min',
              },
              {
                step: '02',
                emoji: '🧠',
                title: 'Få analysen',
                desc: 'Vi beregner RIASEC-profilen din og matcher deg mot 600+ norske yrker med AI-drevet scoring.',
                color: 'from-[var(--lime)]/15 to-[var(--lime)]/5',
                badge: 'Øyeblikkelig',
              },
              {
                step: '03',
                emoji: '🎯',
                title: 'Finn veien',
                desc: 'Se konkret hvilken utdanning du trenger, fagkrav, lønn og vekstmuligheter — alt på ett sted.',
                color: 'from-[var(--coral)]/15 to-[var(--coral)]/5',
                badge: 'Detaljert rapport',
              },
            ].map((item) => (
              <Card key={item.step} className={`relative overflow-hidden border-0 bg-gradient-to-br ${item.color} card-hover`}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-5xl">{item.emoji}</span>
                    <span className="text-xs font-bold text-muted-foreground/60 font-display">{item.step}</span>
                  </div>
                  <Badge variant="secondary" className="mb-3 text-xs">{item.badge}</Badge>
                  <h3 className="text-xl font-display font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/registrer">
              <Button size="lg" className="gap-2 font-semibold shadow-lg shadow-primary/25">
                Start din gratis test
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ REPORT PREVIEW ══════════════════════════════════════════════ */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left: copy */}
            <div className="lg:sticky lg:top-24">
              <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Se eksempelrapporten
              </Badge>
              <h2 className="text-4xl sm:text-5xl font-display font-bold mb-5 leading-tight">
                Dette er rapporten du får — konkret og visuell
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Ingen vage råd. Du får en personlig rapport med din eksakte RIASEC-profil,
                ranket liste over yrker du passer til, og en tydelig utdanningsvei fra der du er i dag til drømmejobben.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { emoji: '📊', title: 'Holland RIASEC-profil', desc: 'Seks dimensjoner som viser akkurat hva du brenner for' },
                  { emoji: '🎯', title: 'Topp yrkesanbefalinger', desc: 'Ranket liste med matchprosent, gjennomsnittslønn og vekstutsikter' },
                  { emoji: '🎓', title: 'Personlig utdanningsvei', desc: 'Steg-for-steg fra VGS til drømmejobben, med konkrete skoler' },
                  { emoji: '📄', title: 'Nedlastbar PDF-rapport', desc: 'Del med rådgiver, foreldre eller bruk i søknadsprosessen' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/registrer">
                <Button size="lg" className="gap-2 font-semibold shadow-lg shadow-primary/25">
                  Få din rapport gratis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-3">Ingen kredittkort. Gratis for alltid på gratisplanen.</p>
            </div>

            {/* Right: live interactive mockup */}
            <div>
              <ReportPreview />
              <p className="text-center text-xs text-muted-foreground mt-4">
                ☝️ Klikk på fanene for å se hele rapporten — dette er hva du faktisk får
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TOOLS / TESTS ═══════════════════════════════════════════════ */}
      <section className="py-24 mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 border-primary/20">
              <Star className="w-3 h-3 mr-1" />
              Vitenskapelig metode
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Tester brukt av psykologer verden over
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Kombinasjonen av disse tre testene gir deg en presis karriereprofil.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart3,
                name: 'Holland RIASEC',
                tag: 'Interessetest',
                tagColor: 'bg-primary/10 text-primary',
                desc: 'Verdens mest brukte karrieretest — kartlegger seks interesseprofiler og finner yrker som passer din type.',
                features: ['60 spørsmål', '6 interessetyper', 'Inkludert gratis'],
                emoji: '🎯',
                gradient: 'from-primary/10',
              },
              {
                icon: Brain,
                name: 'Big Five',
                tag: 'Personlighetstest',
                tagColor: 'bg-violet-100 text-violet-700',
                desc: 'Den mest validerte personlighetstesten i verden — gir innsikt i dine styrker og arbeidsstil.',
                features: ['50 spørsmål', '5 personlighetstrekk', 'Pro-funksjon'],
                emoji: '🧠',
                gradient: 'from-violet-100',
                pro: true,
              },
              {
                icon: Heart,
                name: 'Karriereverdier',
                tag: 'Verdier & motivasjon',
                tagColor: 'bg-[var(--coral)]/15 text-orange-700',
                desc: 'Hva driver deg? Finn ut hvilke verdier som betyr mest i en fremtidig jobb — autonomi, kreativitet, trygghet?',
                features: ['20 spørsmål', '8 verdidimensjoner', 'Pro-funksjon'],
                emoji: '❤️',
                gradient: 'from-orange-50',
                pro: true,
              },
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <Card key={tool.name} className={`relative overflow-hidden border border-border/60 bg-white shadow-sm card-hover`}>
                  <CardContent className="p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-3xl">{tool.emoji}</span>
                      </div>
                      {tool.pro && (
                        <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white border-0 text-xs">Pro</Badge>
                      )}
                    </div>
                    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${tool.tagColor}`}>
                      {tool.tag}
                    </span>
                    <h3 className="text-xl font-display font-bold mb-2">{tool.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{tool.desc}</p>
                    <ul className="space-y-1.5">
                      {tool.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ════════════════════════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-display font-bold mb-3">Hva sier ungdommene?</h2>
            <p className="text-muted-foreground text-lg">Ekte historier fra rettesteg-brukere</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Endelig skjønner jeg hvilken linje jeg skal velge på videregående! Rettesteg ga meg svaret på 20 minutter.',
                name: 'Emma, 15 år',
                school: 'Ungdomsskole, Oslo',
                stars: 5,
                emoji: '🏆',
              },
              {
                quote: 'Jeg visste alltid jeg likte teknologi, men testen viste meg at ingeniørfag passer perfekt. Nå er jeg på riktig vei!',
                name: 'Jonas, 17 år',
                school: 'Videregående, Bergen',
                stars: 5,
                emoji: '🚀',
              },
              {
                quote: 'Som rådgiver bruker jeg Rettesteg på alle elever. Det spart oss for timer med individuelle samtaler.',
                name: 'Tone Haugen',
                school: 'Karriererådgiver, Trondheim',
                stars: 5,
                emoji: '⭐',
              },
            ].map((t) => (
              <Card key={t.name} className="border-0 bg-muted/40 hover:bg-muted/60 transition-colors card-hover">
                <CardContent className="p-7">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                      {t.emoji}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.school}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOR SCHOOLS CTA ═════════════════════════════════════════════ */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-foreground p-10 md:p-16">
            {/* Decorative blobs on dark bg */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, var(--lime), transparent 70%)', transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, oklch(0.65 0.22 320), transparent 70%)', transform: 'translate(-30%, 30%)' }} />

            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-5">
                  <Users className="w-3.5 h-3.5" />
                  For skoler og kommuner
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                  Gi alle elever en god start på livet
                </h2>
                <p className="text-white/60 text-lg leading-relaxed">
                  Rettesteg hjelper rådgivere og lærere med å gi elevene profesjonell
                  karriereveiledning — med data, rapporter og kohortoversikter.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: '📊', text: 'Kohortoversikt for rådgiver' },
                  { icon: '📄', text: 'PDF-karriererapporter per elev' },
                  { icon: '🔒', text: 'GDPR-sikkert, norsk datalagring' },
                  { icon: '🎓', text: 'Opplæring og support inkludert' },
                ].map((feat) => (
                  <div key={feat.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg flex-shrink-0">
                      {feat.icon}
                    </div>
                    <span className="text-white/80 font-medium">{feat.text}</span>
                  </div>
                ))}
                <div className="pt-4">
                  <Link href="/for-skoler">
                    <Button
                      size="lg"
                      className="gap-2 font-semibold"
                      style={{ background: 'var(--lime)', color: 'oklch(0.13 0.025 280)' }}
                    >
                      Se løsningen for skoler
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═════════════════════════════════════════════════════ */}
      <section id="priser" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 border-primary/20">Priser</Badge>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Start gratis. Gå pro når du er klar.
            </h2>
            <p className="text-xl text-muted-foreground">Ingen binding, ingen kredittkort for gratis-planen.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                name: 'Gratis',
                price: '0 kr',
                emoji: '🆓',
                desc: 'Kom i gang i dag',
                features: ['RIASEC-interessetest', 'Topp 3 yrkesanbefalinger', 'Grunnleggende RIASEC-profil'],
                cta: 'Start gratis',
                href: '/registrer',
                featured: false,
              },
              {
                name: 'Pro',
                price: '149 kr',
                period: '/mnd',
                emoji: '⚡',
                desc: 'Full karriereanalyse',
                features: [
                  'Alle tre tester',
                  'Topp 10 anbefalinger',
                  'Detaljerte grafer',
                  'Utdanningsveier',
                  'PDF-rapport',
                ],
                cta: 'Start 7 dager gratis',
                href: '/registrer?plan=pro',
                featured: true,
              },
              {
                name: 'Skole',
                price: 'Fra 4 900 kr',
                period: '/år',
                emoji: '🏫',
                desc: 'For skoler og kommuner',
                features: [
                  'Pro per elev',
                  'Rådgiver-dashboard',
                  'Aggregerte rapporter',
                  'Onboarding + support',
                ],
                cta: 'Ta kontakt',
                href: '/for-skoler#kontakt',
                featured: false,
              },
            ].map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col ${
                  tier.featured
                    ? 'border-primary shadow-2xl shadow-primary/15 scale-[1.02]'
                    : 'border-border shadow-sm'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                    <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white border-0 shadow-lg px-4 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Mest populær
                    </Badge>
                  </div>
                )}
                <CardContent className="flex flex-col flex-1 p-7 pt-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{tier.emoji}</span>
                      <p className="font-display font-bold text-lg">{tier.name}</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-display font-bold">{tier.price}</span>
                      {(tier as { period?: string }).period && (
                        <span className="text-muted-foreground text-sm">{(tier as { period?: string }).period}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{tier.desc}</p>
                  </div>

                  <ul className="space-y-2.5 flex-1 mb-7">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          tier.featured ? 'bg-primary/15' : 'bg-muted'
                        }`}>
                          <CheckCircle className={`w-3 h-3 ${tier.featured ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link href={tier.href}>
                    <Button
                      className={`w-full font-semibold ${tier.featured ? 'shadow-lg shadow-primary/25' : ''}`}
                      variant={tier.featured ? 'default' : 'outline'}
                      size="lg"
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══════════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, oklch(0.52 0.26 280), oklch(0.45 0.28 320))' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-5">
            Klar til å ta det rette steget?
          </h2>
          <p className="text-xl text-white/70 mb-10 leading-relaxed">
            Bli med over 10 000 norsk ungdom som allerede har funnet sin vei med Rettesteg. 
            Det er gratis og tar under 25 minutter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/registrer">
              <Button
                size="lg"
                className="gap-2 text-base px-10 font-semibold shadow-xl"
                style={{
                  background: 'var(--lime)',
                  color: 'oklch(0.13 0.025 280)',
                  boxShadow: '0 20px 40px -8px oklch(0.88 0.22 130 / 0.5)',
                }}
              >
                <GraduationCap className="w-5 h-5" />
                Start gratis i dag
              </Button>
            </Link>
            <Link href="/for-skoler">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-10 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50"
              >
                For skoler →
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/40">Ingen kredittkort. Gratis for alltid på gratisplanen.</p>
        </div>
      </section>
    </div>
  );
}
