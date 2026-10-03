-- Planifie la synchronisation des avis Google chaque jour à 5 h (UTC).
-- Le secret de synchronisation est lu dans Vault au moment de chaque exécution :
-- il n'est jamais écrit dans ce script ni dans la tâche planifiée.
select cron.schedule(
  'sync-google-reviews-daily',
  '0 5 * * *',
  $$
  select net.http_post(
    url := 'https://dzyiutcbelljuddzduom.supabase.co/functions/v1/sync-google-reviews',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6eWl1dGNiZWxsanVkZHpkdW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTgwMTgsImV4cCI6MjA5MjU5NDAxOH0.g-wHce3RVL_DzTt9JqG14SXu4R1gr2K1yRG_F3gbIfI',
      'x-sync-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'google_reviews_sync_secret')
    ),
    body := '{}'::jsonb
  );
  $$
);

-- Vérifier que la tâche existe :
--   select jobname, schedule from cron.job where jobname = 'sync-google-reviews-daily';
-- L'annuler :
--   select cron.unschedule('sync-google-reviews-daily');
