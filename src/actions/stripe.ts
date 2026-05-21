'use server';

import { redirect } from 'next/navigation';
import { stripe, STRIPE_PRICES } from '@/lib/stripe/client';
import { createAdminClient } from '@/lib/supabase/server';

export async function createCheckoutSession(
  priceId: string,
  billing: 'monthly' | 'yearly' = 'monthly'
): Promise<void> {
  const supabase = await createAdminClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/logg-inn');

  const { data: profile } = await supabase
    .from('profiles')
    .select('email, full_name')
    .eq('id', user.id)
    .single();

  const selectedPrice = billing === 'yearly'
    ? STRIPE_PRICES.PRO_YEARLY
    : STRIPE_PRICES.PRO_MONTHLY;

  const finalPrice = priceId || selectedPrice;
  if (!finalPrice) redirect('/priser');

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: profile?.email ?? user.email,
    line_items: [{ price: finalPrice, quantity: 1 }],
    metadata: { user_id: user.id },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/priser?canceled=1`,
    locale: 'nb',
    allow_promotion_codes: true,
    subscription_data: {
      metadata: { user_id: user.id },
    },
  });

  if (!session.url) throw new Error('Ingen checkout URL');
  redirect(session.url);
}

export async function createPortalSession(): Promise<void> {
  const supabase = await createAdminClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/logg-inn');

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!subscription?.stripe_customer_id) {
    redirect('/priser');
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profil`,
  });

  redirect(session.url);
}
