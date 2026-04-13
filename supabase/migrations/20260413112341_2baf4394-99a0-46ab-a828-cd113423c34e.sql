INSERT INTO storage.buckets (id, name, public) VALUES ('bail-pdfs', 'bail-pdfs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can download bail PDFs"
ON storage.objects
FOR SELECT
USING (bucket_id = 'bail-pdfs');

CREATE POLICY "Anon users can upload bail PDFs"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'bail-pdfs');