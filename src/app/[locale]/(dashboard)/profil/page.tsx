import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { createPortalSession } from '@/actions/stripe';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Crown, CreditCard, Settings } from 'lucide-react';

export const metadata: Metadata = { title: 'Min profil' };

export default async function ProfilPage() {
  const supabase = await createAdminClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/logg-inn');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('tier, status, current_period_end, stripe_customer_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  const initials = profile?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? 'U';

  const isPro = profile?.tier === 'pro';

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Min profil</h1>

      <Card>
        <CardContent className="p-6 flex items-center gap-5">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold">{profile?.full_name ?? 'Bruker'}</h2>
              <Badge variant={isPro ? 'default' : 'secondary'} className="text-xs">
                {isPro ? (
                  <><Crown className="w-3 h-3 mr-1" />Pro</>
                ) : 'Gratis'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Medlem siden {new Date(profile?.created_at ?? '').toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary" />
            Abonnement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isPro && subscription ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rettesteg Pro</p>
                  <p className="text-sm text-muted-foreground">
                    Aktiv til {new Date(subscription.current_period_end).toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <Badge className="bg-chart-5/10 text-chart-5 border-chart-5/20">Aktiv</Badge>
              </div>
              {subscription.stripe_customer_id && (
                <form action={createPortalSession}>
                  <Button variant="outline" type="submit" size="sm" className="gap-2 bg-transparent">
                    <Settings className="w-4 h-4" />
                    Administrer abonnement
                  </Button>
                </form>
              )}
            </>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-3">
                Du bruker gratisplanen. Oppgrader for full tilgang til alle tester og rapporter.
              </p>
              <a href="/priser">
                <Button size="sm" className="gap-2">
                  <Crown className="w-4 h-4" />
                  Oppgrader til Pro
                </Button>
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
