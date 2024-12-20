-- Drop existing policies
DROP POLICY IF EXISTS "blog_authors_policy" ON blog_posts;
DROP POLICY IF EXISTS "Authors can manage their own posts" ON blog_posts;

-- Update admin_users policies
DROP POLICY IF EXISTS "Admin users can read own profile" ON admin_users;
DROP POLICY IF EXISTS "Admin users can update own profile" ON admin_users;

-- Create new policies for admin_users
CREATE POLICY "Anyone can create admin users"
  ON admin_users
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Admins can read all users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'admin'
      AND admin_users.verified = true
    )
  );

CREATE POLICY "Admins can manage all users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'admin'
      AND admin_users.verified = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'admin'
      AND admin_users.verified = true
    )
  );

-- Create new policy for blog posts
CREATE POLICY "Blog post management"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND (
        (admin_users.role = 'admin' AND admin_users.verified = true)
        OR 
        (admin_users.role = 'author' AND admin_users.verified = true AND admin_users.id = author_id)
      )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND (
        (admin_users.role = 'admin' AND admin_users.verified = true)
        OR 
        (admin_users.role = 'author' AND admin_users.verified = true AND admin_users.id = author_id)
      )
    )
  );

-- Function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO admin_users (id, email, name, role, team_name, verified)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User'),
    COALESCE((NEW.raw_user_meta_data->>'role')::admin_role, 'author'),
    COALESCE(NEW.raw_user_meta_data->>'team_name', 'Ghana Report Team'),
    CASE 
      WHEN (NEW.raw_user_meta_data->>'role')::text = 'admin' THEN true
      ELSE false
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();