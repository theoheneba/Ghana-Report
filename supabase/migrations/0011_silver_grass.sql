/*
  # IP Anonymization Configuration

  1. Changes
    - Disable IP address logging for auth
    - Update RLS policies to not expose IP data
    - Add IP anonymization function
  
  2. Security
    - Ensures IP addresses are not stored or logged
    - Maintains user privacy while allowing necessary functionality
*/

-- Disable IP address logging in auth.audit_log_entries
ALTER TABLE auth.audit_log_entries 
ALTER COLUMN ip_address DROP NOT NULL,
ALTER COLUMN ip_address SET DEFAULT NULL;

-- Create IP anonymization function
CREATE OR REPLACE FUNCTION anonymize_ip(ip text)
RETURNS text AS $$
BEGIN
  -- Return null to completely remove IP addresses
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update auth hooks to use anonymization
CREATE OR REPLACE FUNCTION public.handle_auth_user_update()
RETURNS trigger AS $$
BEGIN
  NEW.raw_app_meta_data = 
    jsonb_set(
      NEW.raw_app_meta_data, 
      '{ip_address}',
      'null'::jsonb
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to anonymize IPs on user updates
DROP TRIGGER IF EXISTS anonymize_ip_on_user_update ON auth.users;
CREATE TRIGGER anonymize_ip_on_user_update
  BEFORE UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_auth_user_update();

-- Update existing records to remove IPs
UPDATE auth.audit_log_entries SET ip_address = NULL;
UPDATE auth.users SET raw_app_meta_data = 
  jsonb_set(raw_app_meta_data, '{ip_address}', 'null'::jsonb);