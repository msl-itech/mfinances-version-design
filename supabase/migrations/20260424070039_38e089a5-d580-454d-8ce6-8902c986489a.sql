CREATE TABLE public.chatbot_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type text NOT NULL CHECK (event_type IN ('opened', 'message_sent', 'closed')),
  session_id text NOT NULL,
  page_path text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_chatbot_events_created_at ON public.chatbot_events(created_at DESC);
CREATE INDEX idx_chatbot_events_session ON public.chatbot_events(session_id);
CREATE INDEX idx_chatbot_events_type ON public.chatbot_events(event_type);

ALTER TABLE public.chatbot_events ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon visitors) can insert events
CREATE POLICY "Anyone can log chatbot events"
ON public.chatbot_events
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only service role can read
CREATE POLICY "Service role can read events"
ON public.chatbot_events
FOR SELECT
TO service_role
USING (true);