/*
  # Add Author Role and Team Features

  1. Changes
    - Add role enum type for admin_users
    - Add team name and verification fields
    - Update existing policies for author role
    - Add automatic verification triggers
  
  2. Security
    - Role-based access control for authors
    - Verification status tracking
    - Team attribution
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Authors can manage their own posts" ON blog_posts;
DROP POLICY IF EXISTS "Authors can manage own posts" ON blog_posts;

-- Create role enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE admin_role AS ENUM ('admin', 'author');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Update admin_users table
ALTER TABLE admin_users
ADD COLUMN IF NOT EXISTS role admin_role DEFAULT 'admin',
ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS team_name text DEFAULT 'Ghana Report Team';

-- Update existing admin to be verified
UPDATE admin_users
SET verified = true, role = 'admin'
WHERE email = 'admin@company.com';

-- Add verified badge to blog_posts
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS author_verified boolean DEFAULT false;

-- Function to update blog post author verification
CREATE OR REPLACE FUNCTION update_blog_post_author()
RETURNS TRIGGER AS $$
BEGIN
  NEW.author_verified = (
    SELECT verified 
    FROM admin_users 
    WHERE id = NEW.author_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for blog post author verification
DROP TRIGGER IF EXISTS set_blog_post_author_verified ON blog_posts;
CREATE TRIGGER set_blog_post_author_verified
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_post_author();

-- Create new policy for blog authors
CREATE POLICY "blog_authors_policy"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND (
        admin_users.role = 'admin'
        OR (
          admin_users.role = 'author'
          AND admin_users.verified = true
          AND admin_users.id = author_id
        )
      )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND (
        admin_users.role = 'admin'
        OR (
          admin_users.role = 'author'
          AND admin_users.verified = true
          AND admin_users.id = author_id
        )
      )
    )
  );

-- Function to verify authors
CREATE OR REPLACE FUNCTION verify_author(author_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE admin_users
  SET verified = true
  WHERE id = author_id
  AND role = 'author';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION verify_author TO authenticated;