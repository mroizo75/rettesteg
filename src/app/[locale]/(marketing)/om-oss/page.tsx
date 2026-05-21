import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Compass, Target, Heart, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Om oss | Rettesteg',
  description: 'Rettesteg hjelper norsk ungdom å ta det rette steget mot fremtiden — basert på vitenskapelig anerkjente karriereveiledningsmetoder.',
};

export default function OmOssPage() {
  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Om oss</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Vi hjelper norsk ungdom å finne sin vei
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Rettesteg ble startet fordi vi vet at valg av utdanning og yrke er et av de viktigste 
            valgene man tar i livet — og for mange ungdommer skjer dette valget uten god nok hjelp.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Vår misjon</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vi tror at alle unge nordmenn fortjener tilgang til profesjonell karriereveiledning — 
                ikke bare de som er heldige nok til å ha en god rådgiver på skolen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ved å kombinere vitenskapelig anerkjente testmetoder (Holland RIASEC, Big Five) 
                med norske utdannings- og arbeidsmarkedsdata, gir vi ungdom et solid grunnlag 
                for å ta informerte valg om sin fremtid.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, title: 'Presisjon', desc: 'Basert på validerte, vitenskapelige metoder' },
                { icon: Heart, title: 'Tilgjengelighet', desc: 'Gratis grunnversjon for alle' },
                { icon: Globe, title: 'Norsk fokus', desc: 'Tilpasset norsk utdanning og arbeidsliv' },
                { icon: Compass, title: 'Veiledning', desc: 'Fra test til konkret utdanningsvei' },
              ].map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="bg-muted/50 rounded-xl p-5">
                    <Icon className="w-6 h-6 text-primary mb-3" />
                    <h3 className="font-semibold mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
