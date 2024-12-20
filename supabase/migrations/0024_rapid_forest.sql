/*
  # Create Author User
  
  1. Changes
    - Create new author user with proper role and verification status
    - Add to admin_users table with appropriate defaults
*/

DO $$ 
DECLARE 
  new_user_id uuid;
BEGIN
  -- Only insert if email doesn't exist
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'author@mail.com') THEN
    -- Create auth user
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
      jsonb_build_object(
        'name', 'Test Author',
        'role', 'author',
        'team_name', 'Ghana Report Team'
      ),
      NOW(),
      NOW()
    )
    RETURNING id INTO new_user_id;

    -- Wait for trigger to create admin user
    PERFORM pg_sleep(0.1);

    -- Verify the author
    UPDATE admin_users
    SET 
      verified = true,
      updated_at = NOW()
    WHERE 
      id = new_user_id;
  END IF;
END $$;