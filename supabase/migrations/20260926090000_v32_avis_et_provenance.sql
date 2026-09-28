-- V3.2 — à appliquer APRÈS 20260925080000_google_reviews.sql.
-- Script rejouable : chaque instruction peut être exécutée plusieurs fois sans effet de bord.

-- 1. Avis Google : suivi des absences.
--    last_seen_at        : dernière synchronisation où Google a renvoyé l'avis (information).
--    missing_sync_count  : nombre de synchronisations complètes et réussies CONSÉCUTIVES où l'avis est absent.
alter table public.google_reviews add column if not exists last_seen_at timestamptz not null default now();
alter table public.google_reviews add column if not exists missing_sync_count integer not null default 0;

-- Appelée par la fonction sync-google-reviews après une récupération complète et réussie :
-- +1 pour chaque avis absent de la liste renvoyée par Google, puis suppression des avis
-- absents lors d'au moins 3 synchronisations réussies consécutives. Un avis présent a déjà
-- été remis à 0 par la fonction juste avant cet appel.
create or replace function public.mark_missing_google_reviews(present_ids text[])
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  removed integer;
begin
  update public.google_reviews
     set missing_sync_count = missing_sync_count + 1
   where not (review_id = any(present_ids));

  delete from public.google_reviews
   where missing_sync_count >= 3;

  get diagnostics removed = row_count;
  return removed;
end;
$$;

revoke all on function public.mark_missing_google_reviews(text[]) from public, anon, authenticated;
grant execute on function public.mark_missing_google_reviews(text[]) to service_role;

-- 2. Provenance des leads : page d'entrée, page de conversion et site d'origine.
alter table public.lead_sources add column if not exists landing_page text;
alter table public.lead_sources add column if not exists conversion_page text;
alter table public.lead_sources add column if not exists referrer text;
