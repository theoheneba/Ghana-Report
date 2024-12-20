/*
  # Admin User Management and Blog Posts

  1. New Tables
    - No new tables, updating existing admin_users and blog_posts tables

  2. Security
    - Enable RLS on all tables
    - Add policies for admin user management
    - Add policies for blog post management
    - Add verification system for authors

  3. Changes
    - Update admin user management policies
    - Add blog post author verification
    - Add team management support
*/

-- Create type if not exists
DO $$ BEGIN
  CREATE TYPE admin_role AS ENUM ('admin', 'author');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Update admin_users table
ALTER TABLE admin_users
ADD COLUMN IF NOT EXISTS role admin_role DEFAULT 'author',
ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS team_name text DEFAULT 'Ghana Report Team';

-- Update blog_posts table
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS author_verified boolean GENERATED ALWAYS AS (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.id = author_id
    AND admin_users.verified = true
  )
) STORED;

-- Create function to verify authors
CREATE OR REPLACE FUNCTION verify_author(user_id uuid)
RETURNS void AS $$
BEGIN
  -- Check if caller is verified admin
  IF NOT EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid()
    AND role = 'admin'
    AND verified = true
  ) THEN
    RAISE EXCEPTION 'Only verified admins can verify authors';
  END IF;

  -- Update author verification
  UPDATE admin_users
  SET verified = true
  WHERE id = user_id
  AND role = 'author';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policies for admin_users
CREATE POLICY "admin_read_access"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "admin_insert_access"
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

CREATE POLICY "admin_update_access"
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

-- Create policies for blog_posts
CREATE POLICY "blog_post_read_access"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (
    published = true OR
    author_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND role = 'admin'
      AND verified = true
    )
  );

CREATE POLICY "blog_post_write_access"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND verified = true
      AND (role = 'admin' OR (role = 'author' AND id = auth.uid()))
    )
  );

CREATE POLICY "blog_post_update_access"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND verified = true
      AND (role = 'admin' OR (role = 'author' AND id = author_id))
    )
  );

CREATE POLICY "blog_post_delete_access"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid()
      AND verified = true
      AND (role = 'admin' OR (role = 'author' AND id = author_id))
    )
  );