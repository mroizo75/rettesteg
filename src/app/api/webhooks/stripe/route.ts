import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe/client';
import { createAdminClient } from '@/lib/supabase/server';

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? '';

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }

  const supabase = await createAdminClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode !== 'subscription' || !session.subscription) break;

      const userId = session.metadata?.user_id;
      if (!userId) break;

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string) as Stripe.Subscription & { current_period_end?: number };
      const periodEnd = subscription.current_period_end ?? (subscription as unknown as { items?: { data?: Array<{ current_period_end?: number }> } }).items?.data?.[0]?.current_period_end ?? Math.floor(Date.now() / 1000) + 2592000;

      await supabase.from('subscriptions').upsert({
        user_id: userId,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: session.customer as string,
        tier: 'pro',
        status: subscription.status as 'active',
        current_period_end: new Date(periodEnd * 1000).toISOString(),
      }, { onConflict: 'stripe_subscription_id' });

      await supabase
        .from('profiles')
        .update({ tier: 'pro' })
        .eq('id', userId);
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription & { current_period_end?: number };
      const userId = subscription.metadata?.user_id;
      const updatedPeriodEnd = subscription.current_period_end ?? Math.floor(Date.now() / 1000) + 2592000;

      await supabase
        .from('subscriptions')
        .update({
          status: subscription.status as 'active' | 'canceled' | 'past_due' | 'trialing',
          current_period_end: new Date(updatedPeriodEnd * 1000).toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id);

      if (userId && subscription.status !== 'active' && subscription.status !== 'trialing') {
        await supabase.from('profiles').update({ tier: 'free' }).eq('id', userId);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.user_id;

      await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('stripe_subscription_id', subscription.id);

      if (userId) {
        await supabase.from('profiles').update({ tier: 'free' }).eq('id', userId);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
