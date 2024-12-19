/*
  # Admin Authentication Setup

  1. New Tables
    - Creates admin_profiles table to store additional admin information
    - Adds metadata for admin users

  2. Security
    - Enables RLS on admin_profiles
    - Creates policies for admin access
    - Sets up admin role checks
*/

-- Create admin_profiles table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policy for admin profiles
CREATE POLICY "Admin users can read admin profiles"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Policy for admin profiles management
CREATE POLICY "Admin users can manage admin profiles"
  ON admin_profiles FOR ALL
  TO authenticated
  USING (is_admin());

-- Add policy to allow admins to update report status
CREATE POLICY "Admins can update reports"
  ON reports FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Add policy to allow admins to view all reports
CREATE POLICY "Admins can view all reports"
  ON reports FOR SELECT
  TO authenticated
  USING (is_admin());