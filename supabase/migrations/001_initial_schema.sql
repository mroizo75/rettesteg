-- rettesteg.no — Initial Database Schema
-- Run this in Supabase SQL Editor

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
create type user_role as enum ('user', 'org_admin', 'admin');
create type user_tier as enum ('free', 'pro');
create type assessment_status as enum ('in_progress', 'completed');
create type assessment_type as enum ('riasec', 'big_five', 'values');
create type subscription_status as enum ('active', 'canceled', 'past_due', 'trialing');
create type org_type as enum ('school', 'municipality', 'other');

-- ============================================================
-- ORGANIZATIONS
-- ============================================================
create table public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type org_type not null default 'school',
  contact_email text not null,
  contact_name text,
  stripe_customer_id text unique,
  subscription_status subscription_status,
  max_users integer not null default 100,
  created_at timestamptz not null default now()
);

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  role user_role not null default 'user',
  tier user_tier not null default 'free',
  birth_year smallint,
  school text,
  organization_id uuid references public.organizations(id) on delete set null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ============================================================
-- SECURITY DEFINER HELPERS (avoids RLS recursion)
-- ============================================================
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.get_my_role()
returns user_role language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.get_my_tier()
returns user_tier language sql stable security definer set search_path = public as $$
  select tier from public.profiles where id = auth.uid();
$$;

-- ============================================================
-- CAREERS
-- ============================================================
create table public.careers (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title_no text not null,
  title_en text not null,
  description_no text not null,
  description_en text not null,
  riasec_primary char(1) not null check (riasec_primary in ('R','I','A','S','E','C')),
  riasec_secondary char(1) check (riasec_secondary in ('R','I','A','S','E','C')),
  riasec_codes text[] not null default '{}',
  education_level text not null,
  education_years smallint,
  sector text not null,
  salary_range text,
  growth_outlook text,
  created_at timestamptz not null default now()
);

create index careers_riasec_idx on public.careers using gin(riasec_codes);
create index careers_slug_idx on public.careers (slug);

-- ============================================================
-- EDUCATION PROGRAMS
-- ============================================================
create table public.education_programs (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title_no text not null,
  title_en text not null,
  description_no text not null,
  description_en text not null,
  level text not null,
  duration_years smallint not null,
  riasec_match text[] not null default '{}',
  institution_type text not null,
  subject_list text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index edu_programs_riasec_idx on public.education_programs using gin(riasec_match);

-- ============================================================
-- ASSESSMENT QUESTIONS
-- ============================================================
create table public.assessment_questions (
  id uuid primary key default uuid_generate_v4(),
  assessment_type assessment_type not null,
  question_no smallint not null,
  text_no text not null,
  text_en text not null,
  category text not null,
  weight numeric not null default 1.0,
  unique(assessment_type, question_no)
);

create index aq_type_idx on public.assessment_questions (assessment_type, question_no);

-- ============================================================
-- ASSESSMENTS
-- ============================================================
create table public.assessments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type assessment_type not null,
  status assessment_status not null default 'in_progress',
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index assessments_user_idx on public.assessments (user_id, type, status);

-- ============================================================
-- ASSESSMENT RESPONSES
-- ============================================================
create table public.assessment_responses (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  question_id uuid not null references public.assessment_questions(id),
  answer_value smallint not null check (answer_value between 1 and 5),
  created_at timestamptz not null default now(),
  unique(assessment_id, question_id)
);

create index ar_assessment_idx on public.assessment_responses (assessment_id);

-- ============================================================
-- ASSESSMENT RESULTS
-- ============================================================
create table public.assessment_results (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  riasec_scores jsonb,
  big_five_scores jsonb,
  values_scores jsonb,
  top_career_ids uuid[] not null default '{}',
  top_education_ids uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create index ar_user_idx on public.assessment_results (user_id);
create index ar_assessment_id_idx on public.assessment_results (assessment_id);

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  stripe_subscription_id text not null unique,
  stripe_customer_id text not null,
  tier user_tier not null default 'pro',
  status subscription_status not null,
  current_period_end timestamptz not null,
  created_at timestamptz not null default now(),
  check (user_id is not null or organization_id is not null)
);

-- ============================================================
-- BLOG POSTS
-- ============================================================
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title_no text not null,
  title_en text not null,
  excerpt_no text not null,
  excerpt_en text not null,
  content_no text not null,
  content_en text not null,
  published boolean not null default false,
  author text not null default 'rettesteg.no',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blog_slug_idx on public.blog_posts (slug);
create index blog_published_idx on public.blog_posts (published, created_at desc);

create trigger blog_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- profiles
alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_admin_all" on public.profiles for all using (public.is_admin());

-- organizations
alter table public.organizations enable row level security;
create policy "orgs_select_members" on public.organizations for select
  using (public.is_admin() or exists (select 1 from public.profiles where id = auth.uid() and organization_id = organizations.id));
create policy "orgs_admin_all" on public.organizations for all using (public.is_admin());

-- assessment_questions (public read)
alter table public.assessment_questions enable row level security;
create policy "aq_public_read" on public.assessment_questions for select using (true);
create policy "aq_admin_write" on public.assessment_questions for all using (public.is_admin());

-- careers (public read)
alter table public.careers enable row level security;
create policy "careers_public_read" on public.careers for select using (true);
create policy "careers_admin_write" on public.careers for all using (public.is_admin());

-- education_programs (public read)
alter table public.education_programs enable row level security;
create policy "edu_public_read" on public.education_programs for select using (true);
create policy "edu_admin_write" on public.education_programs for all using (public.is_admin());

-- assessments
alter table public.assessments enable row level security;
create policy "assessments_own" on public.assessments for all using (auth.uid() = user_id or public.is_admin());

-- assessment_responses
alter table public.assessment_responses enable row level security;
create policy "ar_own" on public.assessment_responses for all
  using (exists (select 1 from public.assessments a where a.id = assessment_id and a.user_id = auth.uid()) or public.is_admin());

-- assessment_results
alter table public.assessment_results enable row level security;
create policy "results_own" on public.assessment_results for all using (auth.uid() = user_id or public.is_admin());

-- subscriptions
alter table public.subscriptions enable row level security;
create policy "subs_own" on public.subscriptions for select using (auth.uid() = user_id or public.is_admin());
create policy "subs_admin_all" on public.subscriptions for all using (public.is_admin());

-- blog_posts (public read for published)
alter table public.blog_posts enable row level security;
create policy "blog_public_read" on public.blog_posts for select using (published = true or public.is_admin());
create policy "blog_admin_write" on public.blog_posts for all using (public.is_admin());
