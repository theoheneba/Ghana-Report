/*
  # Fix RLS policies for reports table

  1. Changes
    - Drop existing conflicting policies
    - Add new policy for anonymous report submissions
    - Add policy for admin access
  
  2. Security
    - Enable RLS
    - Allow anonymous users to create reports
    - Allow admins to read and update reports
*/

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Anyone can create reports" ON reports;
DROP POLICY IF EXISTS "Anyone can read reports using report_id" ON reports;
DROP POLICY IF EXISTS "Admins can view all reports" ON reports;
DROP POLICY IF EXISTS "Admins can update reports" ON reports;

-- Create new policies
CREATE POLICY "Enable anonymous report submissions"
ON reports FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow report lookup by report_id"
ON reports FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin full access"
ON reports FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = auth.uid()
  )
);

-- Ensure RLS is enabled
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;