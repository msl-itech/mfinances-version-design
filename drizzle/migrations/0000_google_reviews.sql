-- Avis Google synchronisés automatiquement depuis l'API Google Business Profile.
-- Alimenté chaque jour par la fonction `sync-google-reviews`, déclenchée par une tâche planifiée.
-- Lecture publique (le site affiche les avis) ; écriture réservée au service_role.

create table if not exists public.google_reviews (
  review_id      text primary key,
  reviewer_name  text not null,
  rating         smallint not null check (rating between 1 and 5),
  comment        text,
  create_time    timestamptz,
  update_time    timestamptz,
  synced_at      timestamptz not null default now()
);

create table if not exists public.google_reviews_summary (
  id                  smallint primary key default 1 check (id = 1),
  average_rating      numeric(2,1),
  total_review_count  integer,
  location_name       text,
  last_synced_at      timestamptz,
  last_attempt_at     timestamptz,
  last_error          text
);

alter table public.google_reviews enable row level security;
alter table public.google_reviews_summary enable row level security;

drop policy if exists "Lecture publique des avis Google" on public.google_reviews;
create policy "Lecture publique des avis Google"
  on public.google_reviews for select to anon, authenticated using (true);

drop policy if exists "Lecture publique du résumé des avis Google" on public.google_reviews_summary;
create policy "Lecture publique du résumé des avis Google"
  on public.google_reviews_summary for select to anon, authenticated using (true);

grant select on public.google_reviews, public.google_reviews_summary to anon, authenticated;
grant all on public.google_reviews, public.google_reviews_summary to service_role;