import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { BreadcrumbJsonLd } from '@/components/SeoJsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'no' ? 'Vilkår for bruk | Rettesteg' : 'Terms of Service | Rettesteg',
    description:
      locale === 'no'
        ? 'Les vilkårene for bruk av Rettesteg — karriereveiledningsplattformen for norsk ungdom.'
        : 'Read the terms of service for using Rettesteg — the career guidance platform for Norwegian youth.',
  };
}

const no = {
  badge: 'Juridisk',
  title: 'Vilkår for bruk',
  updated: 'Sist oppdatert: 13. mai 2026',
  intro:
    'Disse vilkårene regulerer bruk av rettesteg.no («Tjenesten»), driftet av Kurs og Kompetansesystemer AS, org. nr. 925 897 019. Ved å opprette konto aksepterer du disse vilkårene.',
  sections: [
    {
      title: '1. Hvem kan bruke tjenesten',
      content: [
        'Du må være minst 13 år for å opprette konto. Brukere under 16 år bør ha samtykke fra foresatte.',
        'Skoler og kommuner som kjøper institusjonslisenser er ansvarlig for at brukerne på sin plattform er informert om vilkårene.',
        'Tjenesten er tilgjengelig for brukere i Norge og internasjonalt, men er optimalisert for norsk utdanningssystem og arbeidsmarked.',
      ],
    },
    {
      title: '2. Kontoansvar',
      content: [
        'Du er ansvarlig for å beskytte ditt passord og holde kontoinformasjonen oppdatert.',
        'Du er ansvarlig for all aktivitet som skjer via din konto.',
        'Varsle oss umiddelbart på hei@rettesteg.no dersom du mistenker uautorisert tilgang.',
        'Vi forbeholder oss retten til å suspendere kontoer som misbrukes.',
      ],
    },
    {
      title: '3. Akseptabel bruk',
      content: [
        'Tjenesten skal kun brukes til lovlige formål og i tråd med intensjonen: personlig karriereveiledning.',
        'Du må ikke forsøke å omgå tekniske beskyttelsesmekanismer eller misbruke APIet.',
        'Du må ikke laste opp innhold som er ulovlig, støtende eller krenkende.',
        'Automatisert innsamling av data («scraping») er ikke tillatt uten skriftlig avtale.',
      ],
    },
    {
      title: '4. Gratis og betalt tjeneste (Freemium)',
      content: [
        '**Gratis plan:** Inkluderer RIASEC-test, grunnleggende karriereanbefalinger og utdanningstips.',
        '**Pro-plan:** Inkluderer Big Five-test, verdikartlegging, detaljert rapport, PDF-eksport og prioritert support. Faktureres månedlig eller årlig via Stripe.',
        'Priser fremgår av prissiden og kan endres med 30 dagers varsel til eksisterende abonnenter.',
        'Abonnement fornyes automatisk. Du kan når som helst si opp via «Min konto» eller ved å kontakte oss.',
      ],
    },
    {
      title: '5. Angrerett og refusjon',
      content: [
        'Som forbruker i Norge har du 14 dagers angrerett på digitale tjenester, jf. angrerettloven § 22.',
        'Angreretten bortfaller dersom du eksplisitt har samtykket til at tjenesten igangsettes umiddelbart og du er informert om at angreretten dermed faller bort.',
        'Utover angrerettperioden tilbyr vi ikke refusjon for allerede betalte abonnementsperioder, men du kan avslutte abonnementet slik at det ikke fornyes.',
        'Ved tekniske feil fra vår side vil vi gjøre rimelige bestrebelser på å tilby kompensasjon eller forlengelse.',
      ],
    },
    {
      title: '6. Immaterielle rettigheter',
      content: [
        'Alt innhold på rettesteg.no — design, tekst, algoritmer og kode — er Rettesteg AS sin eiendom.',
        'Testresultater og rapporter som genereres for deg tilhører deg og kan eksporteres.',
        'Du gir Rettesteg AS rett til å bruke anonymiserte, aggregerte testdata for å forbedre tjenesten.',
      ],
    },
    {
      title: '7. Ansvarsfraskrivelse',
      content: [
        'Rettesteg gir karriereveiledning basert på anerkjente metoder, men garanterer ikke spesifikke karriereresultater.',
        'Vi er ikke ansvarlig for beslutninger du tar basert på karriereanbefalingene.',
        'Tjenesten tilbys «som den er». Vi fraskriver oss ansvar for midlertidige driftsavbrudd.',
        'Ansvarsbegrensningen gjelder ikke ved grov uaktsomhet eller forsett fra vår side.',
      ],
    },
    {
      title: '8. Endringer i vilkårene',
      content: [
        'Vi kan oppdatere disse vilkårene. Vesentlige endringer varsles via e-post minimum 14 dager i forveien.',
        'Fortsatt bruk av tjenesten etter ikrafttredelsesdatoen anses som aksept av de nye vilkårene.',
      ],
    },
    {
      title: '9. Gjeldende lov og verneting',
      content: [
        'Disse vilkårene er underlagt norsk rett.',
        'Tvister som ikke løses i minnelighet, behandles av Oslo tingrett som verneting.',
        'Forbrukere kan også bringe saken inn for Forbrukerrådet (forbrukerradet.no).',
      ],
    },
    {
      title: '10. Kontakt',
      content: [
        'Spørsmål om vilkårene: hei@rettesteg.no',
        'Kurs og Kompetansesystemer AS (rettesteg.no) · org. nr. 925 897 019 · Norge',
      ],
    },
  ],
};

const en = {
  badge: 'Legal',
  title: 'Terms of Service',
  updated: 'Last updated: 13 May 2026',
  intro:
    'These terms govern your use of rettesteg.no ("the Service"), operated by Rettesteg AS. By creating an account, you accept these terms.',
  sections: [
    {
      title: '1. Who may use the service',
      content: [
        'You must be at least 13 years old to create an account. Users under 16 should have parental consent.',
        'Schools and municipalities purchasing institutional licences are responsible for ensuring their users are informed of the terms.',
        'The service is available to users in Norway and internationally, but is optimised for the Norwegian education system and labour market.',
      ],
    },
    {
      title: '2. Account responsibility',
      content: [
        'You are responsible for keeping your password secure and your account information up to date.',
        'You are responsible for all activity that occurs through your account.',
        'Notify us immediately at hei@rettesteg.no if you suspect unauthorised access.',
        'We reserve the right to suspend accounts that are misused.',
      ],
    },
    {
      title: '3. Acceptable use',
      content: [
        'The service may only be used for lawful purposes and in line with its intent: personal career guidance.',
        'You must not attempt to circumvent technical security measures or abuse the API.',
        'You must not upload content that is illegal, offensive or harmful.',
        'Automated data collection ("scraping") is not permitted without a written agreement.',
      ],
    },
    {
      title: '4. Free and paid tiers (Freemium)',
      content: [
        '**Free plan:** Includes the RIASEC assessment, basic career recommendations and education tips.',
        '**Pro plan:** Includes Big Five, values assessment, detailed report, PDF export and priority support. Billed monthly or annually via Stripe.',
        'Prices are shown on the pricing page and may change with 30 days\' notice to existing subscribers.',
        'Subscriptions renew automatically. You may cancel at any time via "My account" or by contacting us.',
      ],
    },
    {
      title: '5. Right of withdrawal and refunds',
      content: [
        'As a consumer in Norway you have a 14-day right of withdrawal for digital services under the Norwegian Cancellation Act.',
        'The right of withdrawal lapses if you have explicitly consented to the service starting immediately and have been informed that the right of withdrawal is thereby forfeited.',
        'Beyond the withdrawal period, we do not offer refunds for already-paid subscription periods; however, you may cancel to prevent renewal.',
        'In the event of a technical failure on our part, we will make reasonable efforts to offer compensation or an extension.',
      ],
    },
    {
      title: '6. Intellectual property',
      content: [
        'All content on rettesteg.no — design, text, algorithms and code — is the property of Rettesteg AS.',
        'Test results and reports generated for you belong to you and may be exported.',
        'You grant Rettesteg AS the right to use anonymised, aggregated test data to improve the service.',
      ],
    },
    {
      title: '7. Disclaimer',
      content: [
        'Rettesteg provides career guidance based on recognised methods but does not guarantee specific career outcomes.',
        'We are not liable for decisions you make based on the career recommendations.',
        'The service is provided "as is". We disclaim liability for temporary service outages.',
        'This limitation does not apply in cases of gross negligence or wilful misconduct on our part.',
      ],
    },
    {
      title: '8. Changes to the terms',
      content: [
        'We may update these terms. Material changes will be notified by email at least 14 days in advance.',
        'Continued use of the service after the effective date constitutes acceptance of the new terms.',
      ],
    },
    {
      title: '9. Governing law and jurisdiction',
      content: [
        'These terms are governed by Norwegian law.',
        'Disputes that cannot be resolved amicably shall be brought before the Oslo District Court.',
        'Consumers may also bring disputes before the Norwegian Consumer Council (forbrukerradet.no).',
      ],
    },
    {
      title: '10. Contact',
      content: [
        'Questions about these terms: hei@rettesteg.no',
        'Kurs og Kompetansesystemer AS (rettesteg.no) · org. no. 925 897 019 · Norway',
      ],
    },
  ],
};

function renderContent(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
  );
}

export default async function VilkarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = locale === 'no' ? no : en;

  return (
    <div className="pt-28 pb-24 bg-background">
      <BreadcrumbJsonLd
        items={[
          { name: 'Hjem', url: 'https://rettesteg.no' },
          { name: t.title, url: 'https://rettesteg.no/vilkar' },
        ]}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 border-primary/20">
            {t.badge}
          </Badge>
          <h1 className="text-4xl font-display font-bold mb-3">{t.title}</h1>
          <p className="text-sm text-muted-foreground">{t.updated}</p>
          <p className="mt-6 text-muted-foreground leading-relaxed">{t.intro}</p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {t.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-display font-bold mb-4 pb-2 border-b border-border">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{renderContent(item)}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-14 p-5 rounded-2xl bg-muted/50 border border-border text-sm text-muted-foreground leading-relaxed">
          {locale === 'no'
            ? 'Disse vilkårene er gyldige fra 13. mai 2026. Eldre versjoner er tilgjengelig ved forespørsel.'
            : 'These terms are effective from 13 May 2026. Older versions are available upon request.'}
        </div>
      </div>
    </div>
  );
}
