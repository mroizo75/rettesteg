/**
 * Stripe produksjonsoppsett for rettesteg.no
 * Kjøres EN gang med live-nøkler for å opprette produkter og priser.
 *
 * Bruk:
 *   STRIPE_SECRET_KEY=sk_live_... node scripts/setup-stripe.mjs
 */

import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;
if (!key || !key.startsWith('sk_live_')) {
  console.error('❌  Sett STRIPE_SECRET_KEY=sk_live_... før du kjører dette scriptet.');
  process.exit(1);
}

const stripe = new Stripe(key, { apiVersion: '2025-04-30' });

async function main() {
  console.log('🚀  Oppretter Stripe-produkter og priser...\n');

  // ── Produkt ──────────────────────────────────────────────────────────────
  const product = await stripe.products.create({
    name: 'Rettesteg Pro',
    description:
      'Komplett karriereveiledning: Big Five, verdikartlegging, detaljert PDF-rapport og prioritert support.',
    metadata: { app: 'rettesteg' },
    marketing_features: [
      { name: 'Alle tre karrieretester (RIASEC + Big Five + Verdier)' },
      { name: 'Detaljert PDF-rapport' },
      { name: 'Utdanningsveikart for 600+ yrker' },
      { name: 'Prioritert e-postsupport' },
    ],
  });
  console.log(`✅  Produkt opprettet: ${product.id}  (${product.name})`);

  // ── Månedspris ───────────────────────────────────────────────────────────
  const monthly = await stripe.prices.create({
    product: product.id,
    unit_amount: 9900,        // 99 kr
    currency: 'nok',
    recurring: { interval: 'month' },
    nickname: 'Pro månedlig',
    metadata: { billing: 'monthly' },
  });
  console.log(`✅  Månedspris: ${monthly.id}  (99 NOK/mnd)`);

  // ── Årspris ──────────────────────────────────────────────────────────────
  const yearly = await stripe.prices.create({
    product: product.id,
    unit_amount: 79900,       // 799 kr
    currency: 'nok',
    recurring: { interval: 'year' },
    nickname: 'Pro årlig',
    metadata: { billing: 'yearly' },
  });
  console.log(`✅  Årspris:   ${yearly.id}  (799 NOK/år)\n`);

  // ── Oppsummering ─────────────────────────────────────────────────────────
  console.log('─────────────────────────────────────────────────────────');
  console.log('Legg disse verdiene inn i Vercel-miljøvariablene:\n');
  console.log(`STRIPE_PRICE_PRO_MONTHLY=${monthly.id}`);
  console.log(`STRIPE_PRICE_PRO_YEARLY=${yearly.id}`);
  console.log('─────────────────────────────────────────────────────────');
  console.log('\nNeste steg: opprett webhook i Stripe Dashboard:');
  console.log('  URL:    https://rettesteg.no/api/webhooks/stripe');
  console.log('  Events: checkout.session.completed');
  console.log('           customer.subscription.updated');
  console.log('           customer.subscription.deleted');
}

main().catch((err) => {
  console.error('❌  Feil:', err.message);
  process.exit(1);
});
