import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Users, BarChart3, FileText, Shield, CheckCircle,
  ArrowRight, School, Building2, Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rettesteg for skoler og kommuner',
  description: 'Gi alle elever tilgang til profesjonell karriereveiledning. Rettesteg tilbyr organisasjonslisenser for skoler, rådgivere og kommuner.',
};

const features = [
  {
    icon: Users,
    title: 'Kohortoversikt',
    description: 'Rådgivere ser alle elevers karriereprofiler og testresultater i én samlet oversikt.',
  },
  {
    icon: BarChart3,
    title: 'Aggregerte rapporter',
    description: 'Anonymiserte trendrapporter for klassen — se hva klassen som helhet er interessert i.',
  },
  {
    icon: FileText,
    title: 'PDF-rapporter per elev',
    description: 'Generer profesjonelle karriererapporter til elev-samtaler og foreldremøter.',
  },
  {
    icon: Shield,
    title: 'Personvern og GDPR',
    description: 'Alle data lagres i Norge. Fullt samsvar med GDPR og Datatilsynets retningslinjer.',
  },
];

const stats = [
  { value: '150+', label: 'Norske skoler' },
  { value: '12 000+', label: 'Elever bruker Rettesteg' },
  { value: '4.8/5', label: 'Score fra rådgivere' },
];

export default function ForSkolerPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/5 to-chart-2/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              <School className="w-3.5 h-3.5 mr-1.5" />
              For skoler og kommuner
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Gi alle elever en{' '}
              <span className="text-primary">faglig fundert</span>{' '}
              karriereveiledning
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Rettesteg gir rådgivere, lærere og karriereveiledere et kraftig digitalt verktøy for å 
              hjelpe elever å ta de riktige valgene — med data, ikke gjetning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#kontakt">
                <Button size="lg" className="gap-2">
                  Kontakt oss for prisavtale
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/registrer">
                <Button size="lg" variant="outline" className="bg-transparent">
                  Prøv gratis
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Alt rådgiveren trenger</h2>
            <p className="text-muted-foreground text-lg">Verktøy designet for norske skoler og utdanningsinstitusjoner</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-0 shadow-sm">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING TABLE */}
      <section id="kommuner" className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Organisasjonspriser</h2>
            <p className="text-muted-foreground">Fleksible avtaler for alle størrelser</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Skole',
                icon: School,
                price: 'Fra 4 900 kr/år',
                size: 'Opptil 100 elever',
                features: ['Full Pro-tilgang per elev', 'Rådgiver-dashboard', 'PDF-rapporter', 'E-postsupport'],
              },
              {
                name: 'Stor skole',
                icon: School,
                price: 'Fra 9 900 kr/år',
                size: '101–500 elever',
                features: ['Full Pro-tilgang per elev', 'Rådgiver-dashboard', 'Aggregerte rapporter', 'Prioritert support', 'Onboarding-hjelp'],
                featured: true,
              },
              {
                name: 'Kommune',
                icon: Building2,
                price: 'Kontakt oss',
                size: 'Ubegrenset',
                features: ['Full Pro per elev', 'Multi-skole-oversikt', 'Egendefinerte rapporter', 'Dedikert kontakt', 'SLA-avtale'],
              },
            ].map((tier) => {
              const Icon = tier.icon;
              return (
                <Card
                  key={tier.name}
                  className={`relative ${(tier as { featured?: boolean }).featured ? 'border-primary shadow-md' : 'border-border'}`}
                >
                  {(tier as { featured?: boolean }).featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary">
                        <Star className="w-3 h-3 mr-1" />
                        Mest populær
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-semibold">{tier.name}</span>
                    </div>
                    <p className="text-2xl font-bold mb-1">{tier.price}</p>
                    <p className="text-sm text-muted-foreground mb-6">{tier.size}</p>
                    <ul className="space-y-2 mb-6">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-chart-5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href="#kontakt">
                      <Button className="w-full" variant={(tier as { featured?: boolean }).featured ? 'default' : 'outline'}>
                        Kom i gang
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="kontakt" className="py-24 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ta kontakt</h2>
            <p className="text-muted-foreground">Vi setter opp en gratis demo og lager en tilpasset avtale for din skole eller kommune.</p>
          </div>
          <Card className="shadow-sm">
            <CardContent className="p-8">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="contactName">Navn</Label>
                    <Input id="contactName" placeholder="Ola Nordmann" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contactEmail">E-post</Label>
                    <Input id="contactEmail" type="email" placeholder="ola@skolen.no" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="orgName">Skole / kommune</Label>
                  <Input id="orgName" placeholder="Eksempel videregående skole" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="studentCount">Antall elever</Label>
                  <Input id="studentCount" type="number" placeholder="ca. 200" />
                </div>
                <Button type="submit" className="w-full">
                  Send henvendelse
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
