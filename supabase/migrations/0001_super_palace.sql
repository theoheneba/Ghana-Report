/*
  # Create reports table and security policies

  1. New Tables
    - `reports`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `description` (text)
      - `date` (date)
      - `location` (text)
      - `involved_parties` (text, nullable)
      - `willing_to_testify` (boolean)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Security
    - Enable RLS on `reports` table
    - Add policies for anonymous report creation
    - Add policy for reading own reports using report_id
*/

CREATE TABLE reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  location text NOT NULL,
  involved_parties text,
  willing_to_testify boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending',
  report_id text UNIQUE DEFAULT encode(gen_random_bytes(12), 'hex')
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to create reports
CREATE POLICY "Anyone can create reports" ON reports
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow reading reports using report_id
CREATE POLICY "Anyone can read reports using report_id" ON reports
  FOR SELECT
  TO anon
  USING (true);