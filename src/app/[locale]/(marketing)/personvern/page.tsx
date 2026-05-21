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
    title: locale === 'no' ? 'Personvernerklæring | Rettesteg' : 'Privacy Policy | Rettesteg',
    description:
      locale === 'no'
        ? 'Les om hvordan Rettesteg behandler dine personopplysninger i tråd med GDPR og norsk personvernlovgivning.'
        : 'Learn how Rettesteg processes your personal data in accordance with GDPR and Norwegian privacy law.',
  };
}

const no = {
  badge: 'Juridisk',
  title: 'Personvernerklæring',
  updated: 'Sist oppdatert: 13. mai 2026',
  intro:
    'Kurs og Kompetansesystemer AS, org. nr. 925 897 019 («vi», «oss») er behandlingsansvarlig for personopplysningene du oppgir når du bruker rettesteg.no. Vi tar personvern på alvor og behandler data i tråd med Personopplysningsloven og EUs personvernforordning (GDPR).',
  sections: [
    {
      title: '1. Hva vi samler inn',
      content: [
        '**Kontoopplysninger:** Navn, e-postadresse og passord (kryptert) ved registrering.',
        '**Testdata:** Svarene du gir i RIASEC-, Big Five- og verditestvene, samt de beregnede resultatene.',
        '**Bruksdata:** IP-adresse, nettlesertype, enhetstype og hvilke sider du besøker, via Supabase (lagres i EU).',
        '**Betalingsdata:** Kortopplysninger håndteres utelukkende av Stripe Inc. Vi lagrer kun abonnementsstatus.',
      ],
    },
    {
      title: '2. Formål og rettslig grunnlag',
      content: [
        '**Levere tjenesten (avtale):** Vi bruker kontoopplysninger og testdata for å gi deg karriereanbefalinger. Grunnlag: art. 6(1)(b) GDPR — oppfyllelse av avtale.',
        '**Forbedre tjenesten (berettiget interesse):** Anonymiserte, aggregerte testresultater brukes til å forbedre anbefalingsalgoritmen. Grunnlag: art. 6(1)(f) GDPR.',
        '**Markedsføring via e-post (samtykke):** Kun dersom du eksplisitt har samtykket. Du kan trekke samtykket når som helst. Grunnlag: art. 6(1)(a) GDPR.',
        '**Lovpålagte forpliktelser:** Fakturaer og regnskapsdata oppbevares i 5 år. Grunnlag: art. 6(1)(c) GDPR.',
      ],
    },
    {
      title: '3. Deling med tredjeparter',
      content: [
        '**Supabase Inc.** — database og autentisering (databehandleravtale inngått, data lagres i EU).',
        '**Stripe Inc.** — betalingsbehandling (PCI DSS-sertifisert, egne vilkår).',
        '**Vercel Inc.** — hosting av nettstedet (databehandleravtale inngått).',
        'Vi selger aldri personopplysninger til tredjepart og deler ikke data med annonsører.',
      ],
    },
    {
      title: '4. Lagringstid',
      content: [
        'Kontoopplysninger og testresultater oppbevares så lenge kontoen er aktiv.',
        'Etter sletting av konto: data slettes innen 30 dager, unntatt lovpålagte regnskapsdata (5 år).',
        'Markedsføring via e-post: Avmelding behandles umiddelbart.',
      ],
    },
    {
      title: '5. Dine rettigheter (GDPR art. 15–22)',
      content: [
        '**Innsyn:** Be om kopi av alle opplysninger vi har om deg.',
        '**Retting:** Be om at feilaktige opplysninger korrigeres.',
        '**Sletting («retten til å bli glemt»):** Be om sletting av dine data.',
        '**Dataportabilitet:** Motta testresultatene dine i maskinlesbart format (JSON).',
        '**Innsigelse:** Protestere mot behandling basert på berettiget interesse.',
        '**Klage:** Du kan klage til Datatilsynet (datatilsynet.no) dersom du mener vi behandler data feil.',
      ],
    },
    {
      title: '6. Informasjonskapsler (cookies)',
      content: [
        'Vi bruker strengt nødvendige informasjonskapsler for innlogging og sesjonshåndtering.',
        'Vi bruker ingen tredjeparts sporings- eller reklamecookies.',
        'Analyseverktøy som brukes er konfigurert med anonymisert IP.',
      ],
    },
    {
      title: '7. Kontakt',
      content: [
        'Spørsmål om personvern rettes til: **hei@rettesteg.no**',
        'Behandlingsansvarlig: Rettesteg AS, Norge.',
        'Du kan også kontakte Datatilsynet direkte: **datatilsynet.no** · tlf. 22 39 69 00.',
      ],
    },
  ],
};

const en = {
  badge: 'Legal',
  title: 'Privacy Policy',
  updated: 'Last updated: 13 May 2026',
  intro:
    'Kurs og Kompetansesystemer AS, org. no. 925 897 019 ("we", "us") is the data controller for the personal data you provide when using rettesteg.no. We take privacy seriously and process data in accordance with the Norwegian Personal Data Act and the EU General Data Protection Regulation (GDPR).',
  sections: [
    {
      title: '1. What we collect',
      content: [
        '**Account data:** Name, email address and password (encrypted) upon registration.',
        '**Assessment data:** Your answers in the RIASEC, Big Five and values assessments, and the computed results.',
        '**Usage data:** IP address, browser type, device type and pages visited, via Supabase (stored in the EU).',
        '**Payment data:** Card details are handled exclusively by Stripe Inc. We only store subscription status.',
      ],
    },
    {
      title: '2. Purpose and legal basis',
      content: [
        '**Providing the service (contract):** We use account and assessment data to deliver career recommendations. Basis: Art. 6(1)(b) GDPR — performance of a contract.',
        '**Improving the service (legitimate interest):** Anonymous, aggregated results are used to improve our recommendation algorithm. Basis: Art. 6(1)(f) GDPR.',
        '**Marketing emails (consent):** Only if you have explicitly consented. You can withdraw at any time. Basis: Art. 6(1)(a) GDPR.',
        '**Legal obligations:** Invoices and accounting data are retained for 5 years. Basis: Art. 6(1)(c) GDPR.',
      ],
    },
    {
      title: '3. Third-party sharing',
      content: [
        '**Supabase Inc.** — database and authentication (data processing agreement in place, data stored in the EU).',
        '**Stripe Inc.** — payment processing (PCI DSS certified, their own terms apply).',
        '**Vercel Inc.** — website hosting (data processing agreement in place).',
        'We never sell personal data and do not share data with advertisers.',
      ],
    },
    {
      title: '4. Retention periods',
      content: [
        'Account data and test results are retained for as long as the account is active.',
        'Upon account deletion: data is deleted within 30 days, except legally required accounting data (5 years).',
        'Marketing emails: unsubscription requests are processed immediately.',
      ],
    },
    {
      title: '5. Your rights (GDPR Art. 15–22)',
      content: [
        '**Access:** Request a copy of all data we hold about you.',
        '**Rectification:** Request correction of inaccurate data.',
        '**Erasure ("right to be forgotten"):** Request deletion of your data.',
        '**Data portability:** Receive your assessment results in machine-readable format (JSON).',
        '**Objection:** Object to processing based on legitimate interest.',
        '**Complaint:** You may lodge a complaint with Datatilsynet (datatilsynet.no) if you believe we process data incorrectly.',
      ],
    },
    {
      title: '6. Cookies',
      content: [
        'We use strictly necessary cookies for authentication and session management.',
        'We do not use any third-party tracking or advertising cookies.',
        'Analytics tools used are configured with anonymised IP.',
      ],
    },
    {
      title: '7. Contact',
      content: [
        'Privacy enquiries: **hei@rettesteg.no**',
        'Data controller: Rettesteg AS, Norway.',
        'You may also contact the Norwegian Data Protection Authority directly: **datatilsynet.no** · +47 22 39 69 00.',
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

export default async function PersonvernPage({
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
          { name: t.title, url: `https://rettesteg.no/personvern` },
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
            ? 'Denne personvernerklæringen gjelder for rettesteg.no og alle tilhørende tjenester. For spørsmål, ta kontakt på hei@rettesteg.no.'
            : 'This privacy policy applies to rettesteg.no and all associated services. For questions, contact us at hei@rettesteg.no.'}
        </div>
      </div>
    </div>
  );
}
