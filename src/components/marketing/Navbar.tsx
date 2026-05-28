'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

export function Navbar() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: t('nav.howItWorks'), href: '#slik-fungerer-det' },
    { label: t('nav.careers'), href: '/yrker' },
    { label: t('nav.education'), href: '/utdanning' },
    { label: t('nav.forSchools'), href: '/for-skoler' },
    { label: t('nav.pricing'), href: '/priser' },
  ];

  // Only use transparent/white-text mode on the homepage (/ or /en)
  const isHomepage = pathname === '/' || /^\/[a-z]{2}$/.test(pathname);
  const isLight = isHomepage && !scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo light={isLight} />

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                isLight
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/logg-inn">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'font-medium',
                isLight ? 'text-white/90 hover:text-white hover:bg-white/10' : ''
              )}
            >
              {t('cta.login')}
            </Button>
          </Link>
          <Link href="/registrer">
            <Button
              size="sm"
              className={cn(
                'gap-1.5 font-semibold shadow-md',
                isLight
                  ? 'bg-[var(--lime)] text-[oklch(0.13_0.025_280)] hover:bg-[var(--lime)]/90 shadow-[var(--lime)]/25'
                  : 'shadow-primary/25'
              )}
            >
              {t('cta.start')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu — SheetTrigger with plain div child to avoid nested buttons */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden">
            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer',
                isLight ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
              )}
            >
              <Menu className="w-5 h-5" />
            </div>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <div className="p-5 border-b border-border">
              <Logo />
            </div>
            <nav className="p-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 mt-auto border-t border-border flex flex-col gap-2">
              <Link href="/logg-inn" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full bg-transparent">
                  {t('cta.login')}
                </Button>
              </Link>
              <Link href="/registrer" onClick={() => setOpen(false)}>
                <Button className="w-full gap-1.5 font-semibold">
                  {t('cta.start')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
