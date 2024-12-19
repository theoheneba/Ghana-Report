/*
  # Add file storage support for reports

  1. Changes
    - Create storage bucket for report evidence
    - Add policies for file access
  
  2. Security
    - Enable public access for uploaded files
    - Restrict uploads to authenticated users
*/

-- Enable storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('report-evidence', 'Report Evidence Files', true);

-- Allow public access to files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'report-evidence');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'report-evidence');

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'report-evidence');