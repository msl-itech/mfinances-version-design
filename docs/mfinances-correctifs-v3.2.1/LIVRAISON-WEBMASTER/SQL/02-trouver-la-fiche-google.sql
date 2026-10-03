-- Demande à la fonction la liste des fiches Google du compte de Mika (n'écrit rien en base).
-- Le résultat se lit ensuite avec le script 03, une trentaine de secondes plus tard.
select net.http_post(
  url := 'https://dzyiutcbelljuddzduom.supabase.co/functions/v1/sync-google-reviews',
  headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6eWl1dGNiZWxsanVkZHpkdW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTgwMTgsImV4cCI6MjA5MjU5NDAxOH0.g-wHce3RVL_DzTt9JqG14SXu4R1gr2K1yRG_F3gbIfI',
      'x-sync-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'google_reviews_sync_secret')
    ),
  body := '{"discover": true}'::jsonb
) as request_id;
