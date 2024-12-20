/*
  # Create Author Account

  1. Changes
    - Create a new author user if not exists
    - Set up proper role and verification status
    - Add to admin_users table
*/

DO $$ 
DECLARE 
  new_user_id uuid;
BEGIN
  -- Only insert if email doesn't exist
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'author@mail.com') THEN
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
    RETURNING id INTO new_user_id;

    -- Create admin_users record if needed
    IF new_user_id IS NOT NULL THEN
      INSERT INTO admin_users (id, email, name, role)
      VALUES (new_user_id, 'author@mail.com', 'Test Author', 'author');
    END IF;
  END IF;
END $$;