/*
  # Fix Admin User Management

  1. Changes
    - Simplify policies to prevent conflicts
    - Fix user creation flow
    - Add proper role handling
    - Fix infinite recursion in policies

  2. Security
    - Maintain proper access control
    - Prevent unauthorized access
    - Allow proper admin creation
*/

-- Drop all existing policies
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
    -- Allow admins to update any user
    EXISTS (
      SELECT 1 FROM admin_users a
      WHERE a.id = auth.uid()
      AND a.role = 'admin'
      AND a.verified = true
    )
    OR
    -- Allow users to update their own basic info
    (id = auth.uid() AND NOT (
      role IS DISTINCT FROM OLD.role OR
      verified IS DISTINCT FROM OLD.verified
    ))
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

-- Update handle_new_user function with better error handling
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