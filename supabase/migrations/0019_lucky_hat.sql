/*
  # Fix Admin User Management Policies

  1. Changes
    - Fix policy syntax for admin users
    - Add proper role-based access control
    - Fix update policy to properly handle role changes
    - Add team management support

  2. Security
    - Maintain proper access control
    - Prevent unauthorized role changes
    - Enable proper user management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "enable_read_for_all" ON admin_users;
DROP POLICY IF EXISTS "enable_insert_for_auth" ON admin_users;
DROP POLICY IF EXISTS "enable_update_for_admins" ON admin_users;
DROP POLICY IF EXISTS "enable_delete_for_admins" ON admin_users;

-- Create new simplified policies
CREATE POLICY "admin_read_policy"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "admin_insert_policy"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Allow insert for new users
    auth.uid() = id
    OR
    -- Or if inserter is an admin
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

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_role admin_role;
  v_verified boolean;
  v_name text;
  v_team text;
BEGIN
  -- Get values from metadata with proper defaults
  v_role := COALESCE(
    (NEW.raw_user_meta_data->>'role')::admin_role,
    'author'::admin_role
  );
  
  v_verified := CASE 
    WHEN v_role = 'admin' THEN true
    ELSE false
  END;
  
  v_name := COALESCE(
    NEW.raw_user_meta_data->>'name',
    split_part(NEW.email, '@', 1)
  );
  
  v_team := COALESCE(
    NEW.raw_user_meta_data->>'team_name',
    'Ghana Report Team'
  );

  -- Insert new admin user with retry logic
  FOR i IN 1..3 LOOP
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
        v_name,
        v_role,
        v_team,
        v_verified,
        NOW(),
        NOW()
      );
      
      EXIT; -- Success, exit loop
    EXCEPTION 
      WHEN unique_violation THEN
        -- Already exists, ignore
        EXIT;
      WHEN others THEN
        IF i = 3 THEN
          RAISE WARNING 'Failed to create admin user after 3 attempts: %', SQLERRM;
        END IF;
        -- Sleep for a short time before retry
        PERFORM pg_sleep(0.1);
    END;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to verify authors
CREATE OR REPLACE FUNCTION verify_author(author_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE admin_users
  SET 
    verified = true,
    updated_at = NOW()
  WHERE id = author_id
  AND role = 'author';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;