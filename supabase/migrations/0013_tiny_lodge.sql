/*
  # Add Blog Author Role and Team Verification

  1. Changes
    - Add verified status to admin_users
    - Add default team name for verified users
    - Update blog_posts to include verified status
    - Add policies for blog authors

  2. Security
    - Restrict blog management to verified team members
    - Maintain existing admin privileges
*/

-- Add verified status and team name to admin_users
ALTER TABLE admin_users
ADD COLUMN verified boolean DEFAULT false,
ADD COLUMN team_name text DEFAULT 'Ghana Report Team';

-- Update existing admin to be verified
UPDATE admin_users
SET verified = true
WHERE email = 'admin@company.com';

-- Add verified badge to blog_posts
ALTER TABLE blog_posts
ADD COLUMN author_verified boolean DEFAULT false;

-- Update trigger to include verified status
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

CREATE TRIGGER set_blog_post_author_verified
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_post_author();

-- Update policies for blog authors
CREATE POLICY "Authors can manage their own posts"
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