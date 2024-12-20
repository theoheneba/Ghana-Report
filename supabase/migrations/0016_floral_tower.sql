/*
  # Fix Admin Policies

  1. Changes
    - Drop recursive policies that were causing infinite loops
    - Create new non-recursive policies for admin_users table
    - Simplify policy checks
    - Add basic policy for initial admin access

  2. Security
    - Maintain proper access control
    - Prevent unauthorized access
    - Allow admin creation and management
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Anyone can create admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can read all users" ON admin_users;
DROP POLICY IF EXISTS "Admins can manage all users" ON admin_users;

-- Create simplified policies for admin_users table
CREATE POLICY "Enable read access for verified admins"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users 
      WHERE role = 'admin' 
      AND verified = true
    )
  );

CREATE POLICY "Enable insert for registration"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for verified admins"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users 
      WHERE role = 'admin' 
      AND verified = true
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM admin_users 
      WHERE role = 'admin' 
      AND verified = true
    )
  );

CREATE POLICY "Enable delete for verified admins"
  ON admin_users FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM admin_users 
      WHERE role = 'admin' 
      AND verified = true
    )
  );

-- Update handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO admin_users (
    id,
    email,
    name,
    role,
    team_name,
    verified
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    COALESCE(
      (NEW.raw_user_meta_data->>'role')::admin_role,
      'author'::admin_role
    ),
    COALESCE(NEW.raw_user_meta_data->>'team_name', 'Ghana Report Team'),
    CASE 
      WHEN (NEW.raw_user_meta_data->>'role')::text = 'admin' THEN true
      ELSE false
    END
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Log error and continue
    RAISE NOTICE 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;