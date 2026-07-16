
CREATE TABLE public.sequence_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  first_name text,
  sequence text NOT NULL CHECK (sequence IN ('A','B','C','D')),
  result_html text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','stopped','completed')),
  stop_reason text,
  current_step int NOT NULL DEFAULT 0,
  enrolled_at timestamptz NOT NULL DEFAULT now(),
  next_send_at timestamptz NOT NULL DEFAULT now(),
  last_sent_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX sequence_enrollments_unique_active
  ON public.sequence_enrollments (lower(email), sequence)
  WHERE status = 'active';

CREATE INDEX sequence_enrollments_due_idx
  ON public.sequence_enrollments (next_send_at)
  WHERE status = 'active';

GRANT ALL ON public.sequence_enrollments TO service_role;

ALTER TABLE public.sequence_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages sequence enrollments"
  ON public.sequence_enrollments
  FOR ALL
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_sequence_enrollments_updated_at
  BEFORE UPDATE ON public.sequence_enrollments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
