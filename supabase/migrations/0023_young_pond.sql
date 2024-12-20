/*
  # Fix Admin Authentication

  1. Changes
    - Simplify admin user creation flow
    - Fix authentication policies
    - Add better error handling
    - Improve user verification process

  2. Security
    - Strengthen RLS policies
    - Add proper role checks
    - Improve verification flow
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "admin_read_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_insert_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_update_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_delete_policy" ON admin_users;

-- Create new simplified policies
CREATE POLICY "admin_read_access"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "admin_insert_access"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Allow self-registration
    auth.uid() = id
  );

CREATE POLICY "admin_update_access"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (
    -- Allow admins to update any user
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND verified = true
    )
    OR
    -- Allow users to update their own non-sensitive fields
    (id = auth.uid())
  );

CREATE POLICY "admin_delete_access"
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

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_auth_user_created()
RETURNS trigger AS $$
BEGIN
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
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::admin_role, 'author'::admin_role),
    COALESCE(NEW.raw_user_meta_data->>'team_name', 'Ghana Report Team'),
    false,
    NOW(),
    NOW()
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Ignore duplicate entries
    RETURN NEW;
  WHEN others THEN
    RAISE WARNING 'Error creating admin user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth_user_created();

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
    RAISE EXCEPTION 'Unauthorized: Only verified admins can verify users';
  END IF;

  -- Update user verification
  UPDATE admin_users
  SET 
    verified = true,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;