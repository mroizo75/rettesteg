-- Migration 003: utdanning.no integration
-- Adds authoritative source columns and sync metadata to careers and education_programs tables

-- ── careers ─────────────────────────────────────────────────────────────
alter table public.careers
  add column if not exists utdanning_no_slug       text unique,
  add column if not exists utdanning_no_url        text,
  add column if not exists ssb_styrk08_code        text,
  add column if not exists salary_monthly_avg      integer,   -- kr/mnd fra SSB tabell 11418
  add column if not exists salary_source_year      smallint,
  add column if not exists synced_at               timestamptz;

comment on column public.careers.utdanning_no_slug  is 'field_sammenligning_id frå utdanning.no, t.d. y_dataingenior';
comment on column public.careers.utdanning_no_url   is 'Kanonisk URL til yrket på utdanning.no';
comment on column public.careers.ssb_styrk08_code   is 'STYRK-08 yrkeskode fra SSB for lønnsoppslag';
comment on column public.careers.salary_monthly_avg is 'Gjennomsnittlig månedslønn (kr) fra SSB tabell 11418';
comment on column public.careers.salary_source_year is 'Årstall for lønnsdata, t.d. 2024';
comment on column public.careers.synced_at         is 'Sist synkronisert mot utdanning.no/SSB';

-- ── education_programs ──────────────────────────────────────────────────
alter table public.education_programs
  add column if not exists utdanning_no_slug       text unique,
  add column if not exists utdanning_no_url        text,
  add column if not exists synced_at               timestamptz;

comment on column public.education_programs.utdanning_no_slug is 'Slug fra utdanning.no, t.d. u_data_ntnu';
comment on column public.education_programs.utdanning_no_url  is 'Kanonisk URL til utdanningen på utdanning.no';

-- ── update existing seed rows with known slugs ───────────────────────────
update public.careers set
  utdanning_no_slug = 'y_dataingenior',
  utdanning_no_url  = 'https://utdanning.no/yrker/beskrivelse/dataingeniør'
where slug = 'dataingeniør';

update public.careers set
  utdanning_no_slug = 'y_elektriker',
  utdanning_no_url  = 'https://utdanning.no/yrker/beskrivelse/elektriker'
where slug = 'elektriker';

update public.careers set
  utdanning_no_slug = 'y_lege',
  utdanning_no_url  = 'https://utdanning.no/yrker/beskrivelse/lege'
where slug = 'lege';

update public.careers set
  utdanning_no_slug = 'y_sykepleier',
  utdanning_no_url  = 'https://utdanning.no/yrker/beskrivelse/sykepleier'
where slug = 'sykepleier';

update public.careers set
  utdanning_no_slug = 'y_advokat',
  utdanning_no_url  = 'https://utdanning.no/yrker/beskrivelse/advokat'
where slug = 'advokat';

update public.careers set
  utdanning_no_slug = 'y_arkitekt',
  utdanning_no_url  = 'https://utdanning.no/yrker/beskrivelse/arkitekt'
where slug = 'arkitekt';

update public.careers set
  utdanning_no_slug = 'y_grunnskolelarer',
  utdanning_no_url  = 'https://utdanning.no/yrker/beskrivelse/grunnskolerer'
where slug = 'laerer';

update public.careers set
  utdanning_no_slug = 'y_psykolog',
  utdanning_no_url  = 'https://utdanning.no/yrker/beskrivelse/psykolog'
where slug = 'psykolog';

update public.careers set
  utdanning_no_slug = 'y_bioteknolog',
  utdanning_no_url  = 'https://utdanning.no/yrker/beskrivelse/bioteknolog'
where slug = 'bioteknolog';

update public.education_programs set
  utdanning_no_slug = 'u_data_ntnu',
  utdanning_no_url  = 'https://utdanning.no/utdanning/ntnu.no/bachelor_dataingeniorfag'
where slug = 'ingeniorfag-data';
