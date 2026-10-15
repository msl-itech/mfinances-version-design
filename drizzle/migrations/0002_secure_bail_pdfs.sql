DROP POLICY IF EXISTS "Anyone can download bail PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Anon users can upload bail PDFs" ON storage.objects;
CREATE POLICY "Site can upload PDF files to bail-pdfs" ON storage.objects
FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'bail-pdfs'
  AND name ~ '^(bail|quotite)-[a-z0-9-]{20,}\.pdf$'
);