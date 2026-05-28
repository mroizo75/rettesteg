import Link from 'next/link';
import { Logo } from '@/components/Logo';

const links = {
  produkt: [
    { label: 'Slik fungerer det', href: '#slik-fungerer-det' },
    { label: 'Yrker', href: '/yrker' },
    { label: 'Utdanning', href: '/utdanning' },
    { label: 'Priser', href: '/priser' },
    { label: 'Blogg', href: '/blogg' },
  ],
  skoler: [
    { label: 'For skoler', href: '/for-skoler' },
    { label: 'For kommuner', href: '/for-skoler#kommuner' },
    { label: 'Priser for skoler', href: '/for-skoler#priser' },
    { label: 'Kontakt salg', href: '/for-skoler#kontakt' },
  ],
  selskap: [
    { label: 'Om oss', href: '/om-oss' },
    { label: 'Personvern', href: '/personvern' },
    { label: 'Vilkår', href: '/vilkar' },
    { label: 'hei@rettesteg.no', href: 'mailto:hei@rettesteg.no' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo light href="/" />
            </div>
            <p className="text-sm text-background/55 leading-relaxed mb-5">
              Ta det rette steget mot fremtiden din. Gratis karriereveiledning for norsk ungdom.
            </p>
            <div className="flex gap-3">
              {['nb', 'en'].map((lang) => (
                <Link
                  key={lang}
                  href={lang === 'en' ? '/en' : '/'}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-background/50 hover:text-background hover:bg-background/10 transition-colors"
                >
                  {lang === 'nb' ? '🇳🇴 Norsk' : '🇬🇧 English'}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold text-background/35 uppercase tracking-widest mb-4">Produkt</h3>
            <ul className="space-y-2.5">
              {links.produkt.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-background/35 uppercase tracking-widest mb-4">Skoler</h3>
            <ul className="space-y-2.5">
              {links.skoler.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-background/35 uppercase tracking-widest mb-4">Selskap</h3>
            <ul className="space-y-2.5">
              {links.selskap.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-background/60 hover:text-background transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-background/35">
            © {new Date().getFullYear()} Kurs og Kompetansesystemer AS (rettesteg.no). Alle rettigheter forbeholdt.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/8 border border-background/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-background/50 font-medium">Alle systemer operative</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
