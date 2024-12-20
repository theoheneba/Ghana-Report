/*
  # Create Author Account

  1. Changes
    - Create a new author user
    - Set up proper role and verification status
    - Add to admin_users table

  2. Security
    - Author starts unverified
    - Proper role assignment
*/

-- Create new author user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) 
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'author@mail.com',
  crypt('Author123!@#', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Test Author","role":"author","team_name":"Ghana Report Team"}',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING
RETURNING id;

-- Note: The handle_auth_user_created trigger will automatically create the admin_users record