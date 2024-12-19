/*
  # Add Comments and Activities Tables

  1. New Tables
    - `report_comments`
      - `id` (uuid, primary key)
      - `report_id` (uuid, references reports)
      - `user_id` (uuid, references admin_users)
      - `user_email` (text)
      - `content` (text)
      - `created_at` (timestamptz)
    
    - `report_activities`
      - `id` (uuid, primary key)
      - `report_id` (uuid, references reports)
      - `user_id` (uuid, references admin_users)
      - `user_email` (text)
      - `type` (text)
      - `description` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for admin access
*/

-- Create report_comments table
CREATE TABLE report_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  user_id uuid REFERENCES admin_users(id),
  user_email text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create report_activities table
CREATE TABLE report_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  user_id uuid REFERENCES admin_users(id),
  user_email text NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE report_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_activities ENABLE ROW LEVEL SECURITY;

-- Policies for report_comments
CREATE POLICY "Admins can manage comments"
  ON report_comments
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

-- Policies for report_activities
CREATE POLICY "Admins can manage activities"
  ON report_activities
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

-- Function to log activities
CREATE OR REPLACE FUNCTION log_report_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    INSERT INTO report_activities (
      report_id,
      user_id,
      user_email,
      type,
      description
    )
    VALUES (
      NEW.id,
      auth.uid(),
      (SELECT email FROM admin_users WHERE id = auth.uid()),
      'status_change',
      format('Status changed from %s to %s', OLD.status, NEW.status)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for status changes
CREATE TRIGGER log_report_status_change
  AFTER UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION log_report_activity();

-- Grant necessary permissions
GRANT SELECT, INSERT ON report_comments TO authenticated;
GRANT SELECT, INSERT ON report_activities TO authenticated;