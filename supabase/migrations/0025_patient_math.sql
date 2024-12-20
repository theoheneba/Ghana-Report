/*
  # Verify Author Account

  1. Changes
    - Verify the newly created author
    - Update verification status
    - Set proper timestamps
*/

-- Verify the author
UPDATE admin_users
SET 
  verified = true,
  updated_at = NOW()
WHERE 
  email = 'author@mail.com' 
  AND role = 'author';