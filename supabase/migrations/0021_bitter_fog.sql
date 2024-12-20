-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS admin_users_email_idx ON admin_users(email);
CREATE INDEX IF NOT EXISTS admin_users_verified_idx ON admin_users(verified);
CREATE INDEX IF NOT EXISTS admin_users_role_idx ON admin_users(role);

-- Update admin_users table constraints
ALTER TABLE admin_users
ALTER COLUMN verified SET DEFAULT false,
ALTER COLUMN role SET DEFAULT 'author'::admin_role;

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

-- Function to handle admin verification
CREATE OR REPLACE FUNCTION verify_admin_user(admin_id uuid)
RETURNS void AS $$
BEGIN
  IF NOT is_verified_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Unauthorized: Only verified admins can verify other users';
  END IF;

  UPDATE admin_users
  SET 
    verified = true,
    updated_at = NOW()
  WHERE id = admin_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update policies for better security
DROP POLICY IF EXISTS "admin_read_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_insert_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_update_policy" ON admin_users;
DROP POLICY IF EXISTS "admin_delete_policy" ON admin_users;

CREATE POLICY "admin_read_policy"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "admin_insert_policy"
  ON admin_users FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id OR
    is_verified_admin(auth.uid())
  );

CREATE POLICY "admin_update_policy"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (
    is_verified_admin(auth.uid()) OR
    (id = auth.uid() AND NOT NEW.verified)
  );

CREATE POLICY "admin_delete_policy"
  ON admin_users FOR DELETE
  TO authenticated
  USING (is_verified_admin(auth.uid()));