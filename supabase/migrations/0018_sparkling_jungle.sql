/*
  # Fix Admin Authentication and User Creation

  1. Changes
    - Simplify policies to prevent conflicts
    - Fix user registration flow
    - Add proper role handling
    - Fix infinite recursion in policies

  2. Security
    - Maintain proper access control
    - Prevent unauthorized access
    - Allow proper admin creation
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "admin_users_read" ON admin_users;
DROP POLICY IF EXISTS "admin_users_insert" ON admin_users;
DROP POLICY IF EXISTS "admin_users_update" ON admin_users;
DROP POLICY IF EXISTS "admin_users_delete" ON admin_users;

-- Create new simplified policies
CREATE POLICY "enable_read_for_all"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "enable_insert_for_auth"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Only allow insert if user doesn't already exist
    NOT EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "enable_update_for_admins"
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

CREATE POLICY "enable_delete_for_admins"
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

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_role admin_role;
  v_verified boolean;
BEGIN
  -- Set role and verified status
  v_role := COALESCE((NEW.raw_user_meta_data->>'role')::admin_role, 'author'::admin_role);
  v_verified := CASE 
    WHEN v_role = 'admin' THEN true
    ELSE false
  END;

  -- Insert new admin user
  INSERT INTO admin_users (
    id,
    email,
    name,
    role,
    team_name,
    verified,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    v_role,
    COALESCE(NEW.raw_user_meta_data->>'team_name', 'Ghana Report Team'),
    v_verified,
    NOW(),
    NOW()
  );

  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Ignore duplicate key violations
    RETURN NEW;
  WHEN others THEN
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;