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
    -- Allow insert during signup
    auth.uid() = id
  );

CREATE POLICY "admin_update_policy"
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
    (id = auth.uid() AND NOT (
      NEW.role IS DISTINCT FROM OLD.role OR
      NEW.verified IS DISTINCT FROM OLD.verified
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
    WHEN v_role = 'admin' THEN false -- Always start as unverified
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
    v_name,
    v_role,
    v_team,
    v_verified,
    NOW(),
    NOW()
  );

  RETURN NEW;
EXCEPTION 
  WHEN unique_violation THEN
    -- Already exists, ignore
    RETURN NEW;
  WHEN others THEN
    RAISE WARNING 'Failed to create admin user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to verify users
CREATE OR REPLACE FUNCTION verify_user(user_id uuid)
RETURNS void AS $$
BEGIN
  -- Check if caller is a verified admin
  IF NOT EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid()
    AND role = 'admin'
    AND verified = true
  ) THEN
    RAISE EXCEPTION 'Unauthorized: Only verified admins can verify users';
  END IF;

  -- Update user verification status
  UPDATE admin_users
  SET 
    verified = true,
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;