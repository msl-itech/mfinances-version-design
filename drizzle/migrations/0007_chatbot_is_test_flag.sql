ALTER TABLE public.chatbot_events ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;
ALTER TABLE public.chatbot_questions ADD COLUMN IF NOT EXISTS is_test boolean NOT NULL DEFAULT false;

UPDATE public.chatbot_questions SET is_test = true WHERE session_id LIKE 'test-%';
UPDATE public.chatbot_events SET is_test = true
WHERE session_id IN ('1795017926717-pcylm9p3', '1795018295031-itm2idrr', '1795019533170-37ta4xiv');

CREATE INDEX IF NOT EXISTS chatbot_events_created_not_test_idx ON public.chatbot_events (created_at) WHERE NOT is_test;
CREATE INDEX IF NOT EXISTS chatbot_questions_created_not_test_idx ON public.chatbot_questions (created_at) WHERE NOT is_test;