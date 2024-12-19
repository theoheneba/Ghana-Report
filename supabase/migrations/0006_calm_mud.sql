/*
  # Fix Admin Access Permissions

  1. Changes
    - Update policies for reports table
    - Ensure proper admin access
  
  2. Security
    - Use admin_users table for verification
    - Maintain RLS security
*/

-- Drop existing policies that might conflict
DROP POLICY IF EXISTS "Admins can view all reports" ON reports;
DROP POLICY IF EXISTS "Admins can update reports" ON reports;
DROP POLICY IF EXISTS "Admin users can read all reports" ON reports;
DROP POLICY IF EXISTS "Admin users can update report status" ON reports;

-- Create new policies using admin_users table
CREATE POLICY "Admins can view all reports"
  ON reports FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update reports"
  ON reports FOR UPDATE
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

-- Grant necessary permissions
GRANT SELECT, UPDATE ON reports TO authenticated;