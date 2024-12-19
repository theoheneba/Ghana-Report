/*
  # Add Initial Admin User

  1. Changes
    - Create initial admin user with secure credentials
    - Add admin user profile
  
  2. Security
    - Password is hashed
    - Email is verified by default
*/

-- Create admin user if it doesn't exist
DO $$
DECLARE
  user_id uuid;
BEGIN
  -- Insert into auth.users if email doesn't exist
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) 
  SELECT
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@company.com',
    crypt('Admin123!@#', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Admin User"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@company.com'
  )
  RETURNING id INTO user_id;

  -- If user was created, add to admin_users
  IF user_id IS NOT NULL THEN
    INSERT INTO admin_users (id, email, name)
    VALUES (user_id, 'admin@company.com', 'Admin User');
  END IF;
END $$;