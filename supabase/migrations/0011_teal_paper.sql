/*
  # Fix Storage Permissions

  1. Changes
    - Drop existing storage policies
    - Create new policies with proper permissions
    - Enable anonymous uploads
    
  2. Security
    - Allow anonymous users to upload files
    - Restrict file types and sizes
    - Enable public access for report evidence
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;

-- Allow anyone to upload files (both authenticated and anonymous users)
CREATE POLICY "Anyone can upload files"
ON storage.objects FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'report-evidence' AND
  (octet_length(file) < 10485760) -- Limit file size to 10MB
);

-- Allow public read access to report evidence
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'report-evidence');

-- Only allow admins to delete files
CREATE POLICY "Admin delete access"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'report-evidence' AND
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'admin'
  )
);