-- Avis Google synchronisés automatiquement depuis l'API Google Business Profile.
-- Alimenté chaque jour par la fonction `sync-google-reviews`, déclenchée par une tâche planifiée.
-- Lecture publique (le site affiche les avis) ; écriture réservée au service_role.

create table if not exists public.google_reviews (
  review_id      text primary key,            -- identifiant Google de l'avis
  reviewer_name  text not null,
  rating         smallint not null check (rating between 1 and 5),
  comment        text,                        -- verbatim Google, stocké sans aucune modification
  create_time    timestamptz,
  update_time    timestamptz,
  synced_at      timestamptz not null default now()
);

create table if not exists public.google_reviews_summary (
  id                  smallint primary key default 1 check (id = 1),
  average_rating      numeric(2,1),
  total_review_count  integer,
  location_name       text,                   -- fiche Google synchronisée (accounts/…/locations/…)
  last_synced_at      timestamptz,            -- dernière synchronisation RÉUSSIE
  last_attempt_at     timestamptz,            -- dernière tentative, réussie ou non
  last_error          text                    -- erreur de la dernière tentative (null si réussie)
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

-- Secret dédié à la synchronisation : généré aléatoirement ici, conservé dans Vault,
-- jamais écrit dans le code. La tâche planifiée l'envoie ; la fonction le vérifie.
do $$
begin
  if not exists (select 1 from vault.secrets where name = 'google_reviews_sync_secret') then
    perform vault.create_secret(
      replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
      'google_reviews_sync_secret',
      'Secret de déclenchement de la fonction sync-google-reviews'
    );
  end if;
end $$;

create or replace function public.verify_google_reviews_sync_secret(candidate text)
returns boolean
language sql
security definer
set search_path = ''
as $$
  select exists (
    select 1 from vault.decrypted_secrets
    where name = 'google_reviews_sync_secret'
      and candidate is not null
      and decrypted_secret = candidate
  );
$$;

revoke all on function public.verify_google_reviews_sync_secret(text) from public, anon, authenticated;
grant execute on function public.verify_google_reviews_sync_secret(text) to service_role;
