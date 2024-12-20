/*
  # Blog System Setup

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text)
      - `slug` (text, unique)
      - `author_id` (uuid, references admin_users)
      - `published` (boolean)
      - `tags` (text[])
      - `cover_image` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on blog_posts
    - Add policies for authors and admins
*/

-- Create blog_posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  slug text UNIQUE NOT NULL,
  author_id uuid REFERENCES admin_users(id) ON DELETE CASCADE,
  published boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  cover_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Add author role to admin_users
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS role text DEFAULT 'admin' CHECK (role IN ('admin', 'author'));

-- Create function to check if user is author or admin
CREATE OR REPLACE FUNCTION can_manage_blog_post(post_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid()
    AND (
      role = 'admin' 
      OR (role = 'author' AND id = (SELECT author_id FROM blog_posts WHERE id = post_id))
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for blog_posts
CREATE POLICY "Anyone can read published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authors can manage own posts"
  ON blog_posts
  USING (can_manage_blog_post(id))
  WITH CHECK (can_manage_blog_post(id));

-- Add updated_at trigger
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();