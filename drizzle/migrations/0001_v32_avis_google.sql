-- V3.2 — partie 1 : suivi des absences des avis Google.
alter table public.google_reviews add column if not exists last_seen_at timestamptz not null default now();
alter table public.google_reviews add column if not exists missing_sync_count integer not null default 0;

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