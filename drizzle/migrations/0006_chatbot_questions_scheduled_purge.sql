CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE OR REPLACE FUNCTION public.purge_old_chatbot_questions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.chatbot_questions WHERE created_at < now() - interval '13 months';
$$;

REVOKE ALL ON FUNCTION public.purge_old_chatbot_questions() FROM PUBLIC, anon, authenticated;

DO $$
BEGIN
  PERFORM cron.unschedule('chatbot-questions-purge')
  WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'chatbot-questions-purge');
END $$;

SELECT cron.schedule('chatbot-questions-purge', '17 3 * * *', $$SELECT public.purge_old_chatbot_questions();$$);