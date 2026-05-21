/**
 * sync-careers.mjs
 *
 * Synkroniserer karrieredata fra to offentlige norske API-er:
 *   1. utdanning.no  — Drupal JSON:API (599 yrker, NLOD-lisens)
 *   2. SSB tabell 11418 — Lønnsstatistikk per STYRK-08 yrkeskode
 *
 * Kjøring:
 *   node scripts/sync-careers.mjs
 *
 * Miljøvariabler (fra .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

// ── Konfigurering ────────────────────────────────────────────────────────────

const UTDANNING_API = 'https://utdanning.no/jsonapi/node/yrke';
const SSB_WAGE_API  = 'https://data.ssb.no/api/v0/no/table/11418';
const PAGE_SIZE     = 50;

/**
 * Manuell mapping fra utdanning.no interest-kategorier til RIASEC.
 * utdanning.no bruker eget taksonomi — dette gir oss RIASEC-koder.
 */
const INTERESSE_TO_RIASEC = {
  'Teknologi og produksjon':                    'R',
  'Håndverk, industri og bygg':                 'R',
  'Natur, miljø og landbruk':                   'R',
  'Forskning og vitenskap':                     'I',
  'Data, IT og teknologi':                      'I',
  'Matematikk og statistikk':                   'I',
  'Medisin og helse':                           'I',
  'Kunst, kultur og design':                    'A',
  'Medier og kommunikasjon':                    'A',
  'Musikk og scene':                            'A',
  'Undervisning og pedagogikk':                 'S',
  'Helse og omsorg':                            'S',
  'Sosialt arbeid':                             'S',
  'Samfunn, utdanning, helse og beredskap':     'S',
  'Ledelse og administrasjon':                  'E',
  'Salg og markedsføring':                      'E',
  'Jus og økonomi':                             'E',
  'Økonomi og regnskap':                        'C',
  'Administrasjon og kontor':                   'C',
  'Logistikk og transport':                     'C',
};

// ── Hjelpe-funksjoner ─────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() ?? '';
}

function guessRiasec(interestArray) {
  const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  for (const interest of interestArray ?? []) {
    const top = interest.split('::')[0].trim();
    const mid = interest.split('::')[1]?.trim() ?? '';
    const fullPath = `${top}::${mid}`;

    for (const [key, code] of Object.entries(INTERESSE_TO_RIASEC)) {
      if (top.includes(key) || mid.includes(key) || fullPath.includes(key)) {
        counts[code]++;
      }
    }
  }

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .filter(([, v]) => v > 0)
    .map(([k]) => k);

  return {
    primary:   sorted[0] ?? 'I',
    secondary: sorted[1] ?? 'C',
    codes:     sorted.slice(0, 3),
  };
}

function guessEducationLevel(utdanningText) {
  const t = utdanningText?.toLowerCase() ?? '';
  if (t.includes('doktorgrad') || t.includes('phd'))          return 'Doktorgrad';
  if (t.includes('profesjonsstudium') || t.includes('6 år'))  return 'Profesjonsstudium';
  if (t.includes('master') || t.includes('5 år'))             return 'Master';
  if (t.includes('bachelor') || t.includes('3 år'))           return 'Bachelor';
  if (t.includes('fagbrev') || t.includes('fagopplæring'))    return 'Fagbrev';
  return 'Bachelor';
}

function guessEducationYears(level) {
  const map = {
    'Fagbrev':           4,
    'Bachelor':          3,
    'Master':            5,
    'Profesjonsstudium': 6,
    'Doktorgrad':        8,
    'Variert':           3,
  };
  return map[level] ?? 3;
}

// ── utdanning.no fetch ───────────────────────────────────────────────────────

async function fetchAllCareers() {
  const careers = [];
  let offset = 0;
  let total  = Infinity;

  console.log('📥  Henter yrker fra utdanning.no JSON:API …');

  while (offset < total) {
    const url = `${UTDANNING_API}?page[limit]=${PAGE_SIZE}&page[offset]=${offset}&fields[node--yrke]=title,body,field_sammenligning_id,field_interesse_2024,field_yrke_utdanning,field_yrke_utdanningsbetegnelse,field_lonn_fritekst,path,field_yrke_sist_kvalitetssikret`;
    const res = await fetch(url, {
      headers: { Accept: 'application/vnd.api+json' },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} from utdanning.no: ${url}`);

    const json = await res.json();
    total = json.meta?.count ?? 0;

    for (const node of json.data ?? []) {
      const attrs  = node.attributes;
      const slug   = attrs.field_sammenligning_id;
      if (!slug || !slug.startsWith('y_')) continue;

      const riasec   = guessRiasec(attrs.field_interesse_2024);
      const utdText  = stripHtml(attrs.field_yrke_utdanning?.processed);
      const level    = guessEducationLevel(utdText);
      const years    = guessEducationYears(level);
      const urlPath  = attrs.path?.alias ?? '';
      const fullUrl  = urlPath ? `https://utdanning.no${urlPath}` : null;

      careers.push({
        slug:                  slug.replace(/^y_/, ''),
        title_no:              attrs.title,
        title_en:              attrs.title,
        description_no:        stripHtml(attrs.body?.processed ?? attrs.body?.summary ?? ''),
        description_en:        stripHtml(attrs.body?.processed ?? attrs.body?.summary ?? ''),
        riasec_primary:        riasec.primary,
        riasec_secondary:      riasec.secondary,
        riasec_codes:          riasec.codes,
        education_level:       level,
        education_years:       years,
        sector:                'Privat/Offentlig',
        salary_range:          attrs.field_lonn_fritekst ?? null,
        growth_outlook:        'Stabil',
        utdanning_no_slug:     slug,
        utdanning_no_url:      fullUrl,
        synced_at:             new Date().toISOString(),
      });
    }

    offset += PAGE_SIZE;
    process.stdout.write(`  ${Math.min(offset, total)}/${total} yrker hentet\r`);
    await sleep(200); // respekter rate limit
  }

  console.log(`\n✅  ${careers.length} yrker hentet fra utdanning.no`);
  return careers;
}

// ── SSB lønn fetch ──────────────────────────────────────────────────────────

async function fetchSsbWages() {
  console.log('📥  Henter lønnsstatistikk fra SSB tabell 11418 …');

  // Riktige dimensjonskoder hentet fra GET https://data.ssb.no/api/v0/no/table/11418
  const query = {
    query: [
      { code: 'MaaleMetode',  selection: { filter: 'item', values: ['02'] } },     // Gjennomsnitt
      { code: 'Yrke',         selection: { filter: 'all',  values: ['*'] } },       // alle STYRK-08-koder
      { code: 'Sektor',       selection: { filter: 'item', values: ['ALLE'] } },    // sum alle sektorer
      { code: 'Kjonn',        selection: { filter: 'item', values: ['0'] } },       // begge kjønn
      { code: 'AvtaltVanlig', selection: { filter: 'item', values: ['5'] } },       // heltidsansatte
      { code: 'ContentsCode', selection: { filter: 'item', values: ['Manedslonn'] } }, // månedslønn (kr)
      { code: 'Tid',          selection: { filter: 'top',  values: ['1'] } },       // siste år
    ],
    response: { format: 'json-stat2' },
  };

  const res = await fetch(SSB_WAGE_API, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(query),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    console.warn(`⚠️  SSB API svarte ${res.status} — hopper over lønnsdata`);
    console.warn(`    ${txt.slice(0, 200)}`);
    return {};
  }

  const json = await res.json();
  const wages = {};

  // JSON-stat2: dimensions er i rekkefølge MaaleMetode, Yrke, Sektor, Kjonn, AvtaltVanlig, ContentsCode, Tid
  // Siden alle andre dim er fiksert til 1 verdi, er values en flat liste over Yrke
  const yrkeIdxMap  = json.dimension?.Yrke?.category?.index   ?? {};
  const yrkeLblMap  = json.dimension?.Yrke?.category?.label   ?? {};
  const vals        = json.value ?? [];

  for (const [styrk, idx] of Object.entries(yrkeIdxMap)) {
    const wage = vals[idx];
    if (wage != null) {
      wages[styrk] = {
        label:   yrkeLblMap[styrk] ?? styrk,
        monthly: Math.round(wage),
      };
    }
  }

  const year = Object.keys(json.dimension?.Tid?.category?.label ?? {})[0] ?? '';
  console.log(`✅  ${Object.keys(wages).length} STYRK-08-koder med lønnsdata fra SSB (${year})`);
  return { wages, year: parseInt(year, 10) || new Date().getFullYear() - 1 };
}

// ── Upsert til Supabase ──────────────────────────────────────────────────────

/**
 * Pre-steg: Eksisterende karriere-rader som mangler utdanning_no_slug
 * må oppdateres via slug-match FØRST, ellers kolliderer hoved-upserten
 * på careers_slug_key når den prøver å INSERT i stedet for UPDATE.
 */
async function prefillUtdanningNoSlug(careers) {
  console.log('\n🔗  Kobler eksisterende karrierer til utdanning.no-slugger …');

  // Hent alle eksisterende rader uten utdanning_no_slug
  const { data: existing } = await supabase
    .from('careers')
    .select('id, slug')
    .is('utdanning_no_slug', null);

  if (!existing?.length) {
    console.log('   Ingen rader å forhåndskoble.');
    return;
  }

  // Bygg oppslagstabell: slug → utdanning_no_slug
  const slugMap = Object.fromEntries(
    careers.map((c) => [c.slug, c.utdanning_no_slug])
  );

  let updated = 0;
  for (const row of existing) {
    const noSlug = slugMap[row.slug];
    if (!noSlug) continue;

    const { error } = await supabase
      .from('careers')
      .update({ utdanning_no_slug: noSlug })
      .eq('id', row.id);

    if (!error) updated++;
  }

  console.log(`   ${updated} rader forhåndskobler.`);
}

async function upsertCareers(careers) {
  console.log(`\n💾  Lagrer ${careers.length} yrker til Supabase …`);

  await prefillUtdanningNoSlug(careers);

  // Fjern duplikate utdanning_no_slug innen batchen (siste vinner)
  const deduped = Object.values(
    Object.fromEntries(careers.map((c) => [c.utdanning_no_slug, c]))
  );

  const BATCH = 50;
  let saved = 0;
  let errors = 0;

  for (let i = 0; i < deduped.length; i += BATCH) {
    const batch = deduped.slice(i, i + BATCH);

    const { error } = await supabase
      .from('careers')
      .upsert(batch, {
        onConflict:       'utdanning_no_slug',  // oppdater eksisterende rader via utdanning.no-slug
        ignoreDuplicates: false,
      });

    if (error) {
      console.error(`\n❌  Supabase-feil (batch ${i}):`, error.message);
      errors++;
    } else {
      saved += batch.length;
      process.stdout.write(`  ${saved}/${deduped.length} lagret\r`);
    }

    await sleep(100);
  }

  if (errors > 0) {
    console.log(`\n⚠️  ${errors} batches feilet, ${saved} yrker lagret`);
  } else {
    console.log(`\n✅  ${saved} yrker lagret`);
  }
}

// ── Hoved-entrypoint ─────────────────────────────────────────────────────────

async function main() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌  Mangler NEXT_PUBLIC_SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY i .env.local');
    process.exit(1);
  }

  console.log('🔄  Starter synkronisering av karrieredata\n');
  const start = Date.now();

  const [careers, ssbResult] = await Promise.all([
    fetchAllCareers(),
    fetchSsbWages(),
  ]);

  const { wages = {}, year: ssbYear = new Date().getFullYear() - 1 } = ssbResult;

  // Berik karrieredata med SSB-lønnsdata via STYRK-08 label-matching
  const enriched = careers.map((c) => {
    const titleParts = c.title_no?.toLowerCase().split(/[/,]/)[0].trim() ?? '';
    const match = Object.values(wages).find((w) => {
      const lbl = w.label?.toLowerCase() ?? '';
      return lbl.includes(titleParts) || titleParts.includes(lbl.split(' ')[0]);
    });
    return match
      ? { ...c, salary_monthly_avg: match.monthly, salary_source_year: ssbYear }
      : c;
  });

  const withSalary = enriched.filter((c) => c.salary_monthly_avg).length;
  console.log(`   ${withSalary}/${enriched.length} yrker beriket med SSB-lønnsdata`);

  await upsertCareers(enriched);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n🎉  Ferdig! Totalt: ${enriched.length} yrker synkronisert på ${elapsed}s`);
  console.log('   Kilde 1: https://utdanning.no (NLOD-lisens)');
  console.log('   Kilde 2: https://www.ssb.no/statbank/table/11418/');
}

main().catch((e) => {
  console.error('\n💥  Uventet feil:', e);
  process.exit(1);
});
