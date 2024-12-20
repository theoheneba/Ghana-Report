/*
  # Admin User Management Update

  1. Security
    - Update policies for admin user management
    - Add verification system
    - Add role-based access control

  2. Changes
    - Simplify policy structure
    - Add better error handling
    - Improve user verification flow
*/

-- Drop existing policies
DROP POLICY IF EXISTS "admin_read_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_insert_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_update_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_delete_policy" ON admin_users;

-- Create new simplified policies
CREATE POLICY "admin_read_policy"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "admin_insert_policy"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id OR
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND verified = true
    )
  );

CREATE POLICY "admin_update_policy"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND verified = true
    )
  );

CREATE POLICY "admin_delete_policy"
  ON admin_users FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND verified = true
    )
  );

-- Function to verify users
CREATE OR REPLACE FUNCTION verify_user(user_id uuid)
RETURNS void AS $$
BEGIN
  -- Check if caller is verified admin
  IF NOT EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid()
    AND role = 'admin'
    AND verified = true
  ) THEN
    RAISE EXCEPTION 'Only verified admins can verify users';
  END IF;

  -- Update user verification
  UPDATE admin_users
  SET 
    verified = true,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to safely check admin status
CREATE OR REPLACE FUNCTION is_verified_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = user_id
    AND role = 'admin'
    AND verified = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;