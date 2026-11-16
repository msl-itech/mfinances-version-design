ALTER TABLE public.chatbot_events DROP CONSTRAINT chatbot_events_event_type_check;
ALTER TABLE public.chatbot_events ADD CONSTRAINT chatbot_events_event_type_check CHECK (event_type IN (
  'opened', 'message_sent', 'closed',
  'article_click', 'booking_click', 'diagnostic_click', 'guide_click', 'contact_click', 'lead_submitted'
));