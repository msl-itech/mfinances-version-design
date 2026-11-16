CREATE TABLE public.chatbot_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  page_path text,
  question text NOT NULL,
  article_paths text[] NOT NULL DEFAULT '{}',
  has_article boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.chatbot_questions TO service_role;

ALTER TABLE public.chatbot_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages chatbot questions"
ON public.chatbot_questions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE INDEX idx_chatbot_questions_created_at ON public.chatbot_questions(created_at DESC);