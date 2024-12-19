/*
  # Add admin access policies

  1. Security Changes
    - Add policy for authenticated admin users to read all reports
    - Add policy for admin users to update report status
*/

-- Policy for admin users to read all reports
CREATE POLICY "Admin users can read all reports" ON reports
  FOR SELECT
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      SELECT email FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Policy for admin users to update report status
CREATE POLICY "Admin users can update report status" ON reports
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'email' IN (
      SELECT email FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  )
  WITH CHECK (
    auth.jwt() ->> 'email' IN (
      SELECT email FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );