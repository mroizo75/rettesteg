'use client';

import { useActionState } from 'react';
import { registerAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';

export function RegisterForm() {
  const [state, action, isPending] = useActionState(registerAction, { error: '' });

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <form action={action} className="space-y-4">
          {state.error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-md px-3 py-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {state.error}
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Fullt navn</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              placeholder="Ola Nordmann"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="navn@eksempel.no"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Passord</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Minst 8 tegn"
              minLength={8}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Oppretter konto...
              </>
            ) : (
              'Opprett gratis konto'
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Ved å registrere deg godtar du våre{' '}
            <a href="/vilkar" className="text-primary hover:underline">vilkår</a>{' '}
            og{' '}
            <a href="/personvern" className="text-primary hover:underline">personvernregler</a>.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
