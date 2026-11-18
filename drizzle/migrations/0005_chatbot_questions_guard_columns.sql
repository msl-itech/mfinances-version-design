ALTER TABLE public.chatbot_questions
  ADD COLUMN IF NOT EXISTS prompt_version text,
  ADD COLUMN IF NOT EXISTS guard_status text CHECK (guard_status IN ('ok', 'regenerated', 'fallback'));
CREATE INDEX IF NOT EXISTS chatbot_questions_prompt_version_idx ON public.chatbot_questions (prompt_version);