import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { logoutAction } from '@/actions/auth';
import {
  Compass, LayoutDashboard, ClipboardList,
  BarChart3, User, LogOut,
} from 'lucide-react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createAdminClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/logg-inn');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, tier, role')
    .eq('id', user.id)
    .single();

  const initials = profile?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? 'U';

  const nav = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Oversikt' },
    { href: '/test', icon: ClipboardList, label: 'Ta test' },
    { href: '/profil', icon: User, label: 'Profil' },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-muted/30">
      <aside className="w-full lg:w-64 bg-background border-b lg:border-b-0 lg:border-r border-border flex lg:flex-col">
        <div className="px-4 py-4 flex items-center gap-2 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Compass className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">Rettesteg</span>
          </Link>
        </div>

        <nav className="flex lg:flex-col gap-1 p-2 flex-1 overflow-x-auto lg:overflow-x-visible">
          {nav.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center justify-between px-4 py-4 border-t border-border mt-auto">
          <div className="flex items-center gap-2.5">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{profile?.full_name ?? 'Bruker'}</p>
              <p className="text-xs text-muted-foreground capitalize">{profile?.tier ?? 'free'}</p>
            </div>
          </div>
          <form action={logoutAction}>
            <Button variant="ghost" size="icon" type="submit" title="Logg ut">
              <LogOut className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
