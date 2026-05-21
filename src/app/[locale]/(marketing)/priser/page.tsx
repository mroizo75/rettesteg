import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Priser | Rettesteg',
  description: 'Start gratis. Oppgrader til Pro for full karriereanalyse med grafer, utdanningsveier og PDF-rapport.',
};

const tiers = [
  {
    name: 'Gratis',
    price: '0 kr',
    period: '',
    description: 'Kom i gang og utforsk',
    featured: false,
    features: [
      { text: 'RIASEC-interessetest (60 spørsmål)', included: true },
      { text: 'Topp 3 yrkesanbefalinger', included: true },
      { text: 'Enkel RIASEC-profil', included: true },
      { text: 'Gratis for alltid', included: true },
      { text: 'Big Five personlighetstest', included: false },
      { text: 'Karriereverdier-test', included: false },
      { text: 'Topp 10 anbefalinger', included: false },
      { text: 'Detaljerte grafer og analyse', included: false },
      { text: 'Utdanningsveier med fagkrav', included: false },
      { text: 'PDF-karriererapport', included: false },
    ],
    cta: 'Start gratis',
    href: '/registrer',
  },
  {
    name: 'Pro',
    price: '149 kr',
    period: '/mnd',
    priceYear: '1 190 kr/år',
    description: 'Full karriereanalyse',
    featured: true,
    features: [
      { text: 'RIASEC-interessetest (60 spørsmål)', included: true },
      { text: 'Topp 3 yrkesanbefalinger', included: true },
      { text: 'Enkel RIASEC-profil', included: true },
      { text: 'Gratis for alltid', included: false },
      { text: 'Big Five personlighetstest', included: true },
      { text: 'Karriereverdier-test', included: true },
      { text: 'Topp 10 anbefalinger', included: true },
      { text: 'Detaljerte grafer og analyse', included: true },
      { text: 'Utdanningsveier med fagkrav', included: true },
      { text: 'PDF-karriererapport', included: true },
    ],
    cta: 'Start Pro-prøveperiode',
    href: '/registrer?plan=pro',
  },
];

export default function PriserPage() {
  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-16 text-center bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">Priser</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Enkel, transparent prising
          </h1>
          <p className="text-xl text-muted-foreground">
            Start gratis. Oppgrader til Pro for full karriereanalyse.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col ${tier.featured ? 'border-primary shadow-xl shadow-primary/10' : 'border-border'}`}
              >
                {tier.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary px-4 py-1 text-sm">Mest populær</Badge>
                  </div>
                )}
                <CardContent className="p-8 flex flex-col flex-1">
                  <div className="mb-6">
                    <p className="font-semibold text-xl">{tier.name}</p>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                    </div>
                    {tier.priceYear && (
                      <p className="text-sm text-muted-foreground mt-1">eller {tier.priceYear} (spar 33%)</p>
                    )}
                    <p className="text-muted-foreground text-sm mt-2">{tier.description}</p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature.text} className="flex items-center gap-2.5 text-sm">
                        {feature.included ? (
                          <CheckCircle className="w-4 h-4 text-chart-5 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground/60'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href={tier.href}>
                    <Button
                      className="w-full gap-2"
                      variant={tier.featured ? 'default' : 'outline'}
                      size="lg"
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Er du skole eller kommune?{' '}
              <Link href="/for-skoler" className="text-primary font-medium hover:underline">
                Se organisasjonspriser →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">Vanlige spørsmål</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Kan jeg avbestille når som helst?',
                a: 'Ja, du kan avbestille abonnementet ditt når som helst. Du beholder Pro-tilgang til slutten av faktureringsperioden.',
              },
              {
                q: 'Hva skjer med dataene mine hvis jeg avslutter?',
                a: 'Alle testresultater og profiler lagres i 12 måneder etter avsluttet abonnement, deretter slettes de i henhold til vår personvernspolicy.',
              },
              {
                q: 'Kan jeg prøve Pro gratis?',
                a: 'Ja! Vi tilbyr 7 dagers gratis prøveperiode på Pro. Ingen kredittkort kreves for å starte.',
              },
              {
                q: 'Er det norsk support?',
                a: 'Ja, vi har norskspråklig support på e-post og chat. Svartid er normalt 1–2 virkedager.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-background rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
