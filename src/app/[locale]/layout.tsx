import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Space_Grotesk, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { Toaster } from '@/components/ui/sonner';
import { WebSiteJsonLd, OrganizationJsonLd } from '@/components/SeoJsonLd';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return {
    title: {
      template: `%s | ${t('siteName')}`,
      default: `${t('siteName')} — ${t('tagline')}`,
    },
    description:
      locale === 'no'
        ? 'Gratis karriereveiledning for norsk ungdom. Finn yrket og utdanningen som passer deg basert på vitenskapelige tester.'
        : 'Free career guidance for Norwegian youth. Find the career and education that fits you based on scientific tests.',
    metadataBase: new URL('https://rettesteg.no'),
    openGraph: {
      siteName: 'Rettesteg',
      locale: locale === 'no' ? 'nb_NO' : 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
    alternates: {
      canonical: locale === 'no' ? '/' : '/en',
      languages: { 'nb-NO': '/', en: '/en' },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'no' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <WebSiteJsonLd
            url="https://rettesteg.no"
            name="Rettesteg"
            description="Gratis karriereveiledning for norsk ungdom. Finn yrket og utdanningen som passer deg."
          />
          <OrganizationJsonLd
            name="Rettesteg"
            url="https://rettesteg.no"
            description="Karriereveiledningsplattform for norsk ungdom basert på Holland RIASEC og Big Five."
          />
          {children}
          <Toaster richColors position="top-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
